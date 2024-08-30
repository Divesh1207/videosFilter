

import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

export const checkUserExists = async (req, res) => {
    const { googleId } = req.body;

    try {
        const user = await User.findOne({ googleId });
        console.log("User exist ,verifies checusers exist controller ", user)
        if (user) {
            return res.status(200).json({ exists: true, message: 'User exists' });
        } else {
            return res.status(404).json({ exists: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export const googleLogin = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/youtube.readonly'], // YouTube scope
    });
    res.redirect(url);
};

export const googleCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const youtube = google.youtube('v3');
        const response = await youtube.channels.list({
            auth: oauth2Client,
            part: 'snippet',
            mine: true,
        });

        if (response.data.items.length === 0) {
            throw new Error('No YouTube channel found for the authenticated user.');
        }

        const channelData = response.data.items[0].snippet;
        const googleId = response.data.items[0].id;

        let user = await User.findOne({ googleId });

        if (user) {
            user.accessToken = tokens.access_token;
            user.refreshToken = tokens.refresh_token;
        } else {
            user = new User({
                googleId,

                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                youtubeChannel: channelData,
            });
        }

        const likedVideosResponse = await youtube.videos.list({
            auth: oauth2Client,
            part: 'snippet,contentDetails,statistics',
            myRating: 'like',
            maxResults: 100,
        });

        const likedVideos = likedVideosResponse.data.items.map(video => ({
            videoId: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnails: video.snippet.thumbnails,
            publishedAt: video.snippet.publishedAt,
            statistics: video.statistics,
        }));

        user.likedVideos = likedVideos;
        console.log('user.likedVideos', user.likedVideos)

        try {
            await user.save();
        } catch (error) {
            console.error('Error saving user:', error);
            return res.status(500).json({ error: 'Failed to save user' });
        }
        console.log('JWT_SECRET authcontoller m:', process.env.JWT_SECRET);

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Short-lived access token
        });

        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d', // Long-lived refresh token
        });

        // Store the refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();


        res.redirect(`https://videos-filter.vercel.app/homePage?token=${refreshToken}`);
    } catch (error) {
        console.error('Error during YouTube authentication:', error);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
};

// New endpoint to handle token refreshing
export const refreshToken = async (req, res) => {
    const { token: refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d', // New short-lived access token
        });

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Error verifying refresh token:', error);
        res.status(403).json({ error: 'Failed to refresh token' });
    }
};


// import { google } from 'googleapis';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import dotenv from 'dotenv';
// dotenv.config();

// // Initialize OAuth2 client
// const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URI
// );

// // Generate Google login URL
// export const googleLogin = (req, res) => {
//     const url = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: [
//             'https://www.googleapis.com/auth/youtube.readonly',

//         ],
//     });
//     res.redirect(url);
// };

// // Google callback handler
// export const googleCallback = async (req, res) => {
//     const { code } = req.query;

//     try {
//         // Exchange authorization code for tokens
//         const { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);

//         // Retrieve user profile information including email
//         const oauth2 = google.oauth2('v2');
//         const userInfoResponse = await oauth2.userinfo.get({
//             auth: oauth2Client,
//         });

//         const { email, id: googleId } = userInfoResponse.data;

//         // Retrieve YouTube channel data
//         const youtube = google.youtube('v3');
//         const response = await youtube.channels.list({
//             auth: oauth2Client,
//             part: 'snippet',
//             mine: true,
//         });

//         if (response.data.items.length === 0) {
//             throw new Error('No YouTube channel found for the authenticated user.');
//         }

//         const channelData = response.data.items[0].snippet;

//         // Find or create the user
//         let user = await User.findOne({ googleId });

//         if (user) {
//             user.accessToken = tokens.access_token;
//             user.refreshToken = tokens.refresh_token;
//         } else {
//             user = new User({
//                 googleId,

//                 accessToken: tokens.access_token,
//                 refreshToken: tokens.refresh_token,
//                 youtubeChannel: channelData,
//             });
//         }

//         // Retrieve liked videos
//         const likedVideosResponse = await youtube.videos.list({
//             auth: oauth2Client,
//             part: 'snippet,contentDetails,statistics',
//             myRating: 'like',
//             maxResults: 100,
//         });

//         const likedVideos = likedVideosResponse.data.items.map(video => ({
//             videoId: video.id,
//             title: video.snippet.title,
//             description: video.snippet.description,
//             thumbnails: video.snippet.thumbnails,
//             publishedAt: video.snippet.publishedAt,
//             statistics: video.statistics,
//         }));

//         user.likedVideos = likedVideos;

//         // Save user to database
//         try {
//             await user.save();
//         } catch (error) {
//             console.error('Error saving user:', error);
//             return res.status(500).json({ error: 'Failed to save user' });
//         }

//         // Create JWT tokens
//         const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: '7d',
//         });

//         const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
//             expiresIn: '7d',
//         });

//         user.refreshToken = refreshToken;
//         await user.save();

//         res.redirect(`http://localhost:5173/homePage?token=${refreshToken}`);
//     } catch (error) {
//         console.error('Error during YouTube authentication:', error);
//         res.status(500).json({ error: 'Failed to authenticate user' });
//     }
// };

// // New endpoint to handle token refreshing
// export const refreshToken = async (req, res) => {
//     const { token: refreshToken } = req.body;

//     if (!refreshToken) {
//         return res.status(401).json({ error: 'Refresh token required' });
//     }

//     try {
//         const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//         const user = await User.findById(decoded.id);

//         if (!user || user.refreshToken !== refreshToken) {
//             return res.status(403).json({ error: 'Invalid refresh token' });
//         }

//         const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: '7d',
//         });

//         res.json({ accessToken: newAccessToken });
//     } catch (error) {
//         console.error('Error verifying refresh token:', error);
//         res.status(403).json({ error: 'Failed to refresh token' });
//     }
// };

