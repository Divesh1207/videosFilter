// import { google } from 'googleapis';
// import User from '../models/User.js';
// import { processTextWithNLP } from '../services/nlpService.js';
// import dotenv from 'dotenv';
// import similarity from 'string-similarity';
// import Fuse from 'fuse.js';
// import natural from 'natural';
// import stopword from 'stopword';
// dotenv.config();

// const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URL
// );

// const fetchLikedVideosFromYouTube = async (googleId) => {
//     try {
//         if (!googleId || googleId === 'undefined') {
//             throw new Error('Invalid googleId');
//         }

//         const user = await User.findOne({ googleId });
//         if (!user) throw new Error('User not found');

//         oauth2Client.setCredentials({
//             access_token: user.accessToken,
//             refresh_token: user.refreshToken,
//         });

//         const { token } = await oauth2Client.getAccessToken();
//         if (token !== user.accessToken) {
//             user.accessToken = token;
//             await user.save();
//         }

//         const youtube = google.youtube('v3');
//         let allVideos = [];
//         let nextPageToken = '';

//         do {
//             const response = await youtube.videos.list({
//                 auth: oauth2Client,
//                 part: 'snippet,contentDetails,statistics',
//                 myRating: 'like',
//                 maxResults: 50,
//                 pageToken: nextPageToken,
//             });

//             allVideos = allVideos.concat(response.data.items);
//             nextPageToken = response.data.nextPageToken;
//             console.log(`Fetched ${allVideos.length} liked videos so far`);
//         } while (nextPageToken);

//         console.log(`Total liked videos fetched: ${allVideos.length}`);

//         return allVideos.map(video => ({
//             videoId: video.id,
//             title: video.snippet.title,
//             description: video.snippet.description,
//             thumbnails: video.snippet.thumbnails,
//             publishedAt: video.snippet.publishedAt,
//             statistics: video.statistics,
//             channelTitle: video.snippet.channelTitle,
//         }));
//     } catch (error) {
//         console.error('Error fetching liked videos from YouTube:', error.message);
//         throw new Error('Failed to fetch liked videos');
//     }
// };


// const tokenizer = new natural.WordTokenizer();
// const stemmer = natural.PorterStemmer;




// const TfIdf = natural.TfIdf;


// const preprocessText = (text) => {
//     const tokens = tokenizer.tokenize(text.toLowerCase());
//     const withoutStopwords = stopword.removeStopwords(tokens);
//     return withoutStopwords.map(word => stemmer.stem(word));
// };

// const calculateSimilarity = (text1, text2) => {
//     const set1 = new Set(text1);
//     const set2 = new Set(text2);
//     const intersection = new Set([...set1].filter(x => set2.has(x)));
//     return intersection.size / Math.sqrt(set1.size * set2.size);
// };

// export const searchLikedVideos = async (req, res) => {
//     try {
//         const { googleId, prompt, page = 1, pageSize = 10 } = req.body;

//         if (!googleId || !prompt) {
//             return res.status(400).json({ error: 'googleId and prompt are required' });
//         }

//         const likedVideos = await fetchLikedVideosFromYouTube(googleId);

//         console.log(`Total liked videos fetched: ${likedVideos.length}`);

//         const preprocessedPrompt = preprocessText(prompt);
//         console.log(`Preprocessed Search Prompt: ${preprocessedPrompt.join(' ')}`);

//         const scoredVideos = likedVideos.map(video => {
//             const preprocessedTitle = preprocessText(video.title);
//             const preprocessedDescription = preprocessText(video.description);
//             const preprocessedChannelTitle = preprocessText(video.channelTitle);

//             const titleSimilarity = calculateSimilarity(preprocessedPrompt, preprocessedTitle);
//             const descriptionSimilarity = calculateSimilarity(preprocessedPrompt, preprocessedDescription);
//             const channelSimilarity = calculateSimilarity(preprocessedPrompt, preprocessedChannelTitle);

//             const exactChannelMatch = video.channelTitle.toLowerCase().includes(prompt.toLowerCase()) ? 1 : 0;

//             const combinedScore = (titleSimilarity * 0.3) + (descriptionSimilarity * 0.2) + (channelSimilarity * 0.3) + (exactChannelMatch * 0.2);

//             return { ...video, score: combinedScore };
//         });

//         const sortedVideos = scoredVideos.sort((a, b) => b.score - a.score);
//         const filteredVideos = sortedVideos.filter(video => video.score > 0.1);

//         const startIndex = (page - 1) * pageSize;
//         const endIndex = startIndex + pageSize;
//         const paginatedVideos = filteredVideos.slice(startIndex, endIndex);

//         if (filteredVideos.length === 0) {
//             console.log('No matching videos found.');
//         } else {
//             console.log(`${filteredVideos.length} matching videos found.`);
//         }

//         res.status(200).json({
//             likedVideos: paginatedVideos,
//             totalPages: Math.ceil(filteredVideos.length / pageSize),
//             totalResults: filteredVideos.length
//         });
//     } catch (error) {
//         console.error('Error in searchLikedVideos:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
// export const getLikedVideos = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).populate('likedVideos');
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.status(200).json(user.likedVideos);
//     } catch (error) {
//         console.error('Error retrieving liked videos:', {
//             message: error.message,
//             stack: error.stack,
//         });
//         res.status(500).json({ error: 'Failed to retrieve liked videos' });
//     }
// };

// export const getVideoDetails = async (req, res) => {
//     const { videoId } = req.body;

//     if (!videoId) {
//         return res.status(400).json({ error: 'Video ID is required' });
//     }

//     try {
//         const youtube = google.youtube('v3');
//         const response = await youtube.videos.list({
//             part: 'snippet,contentDetails,statistics',
//             id: videoId,
//         });

//         if (!response.data.items || response.data.items.length === 0) {
//             return res.status(404).json({ error: 'Video not found' });
//         }

//         const videoDetails = response.data.items[0];
//         const videoDescription = videoDetails.snippet.description;

//         const nlpResponse = await processTextWithNLP(videoDescription);
//         const summary = nlpResponse.generated_text;

//         res.status(200).json({
//             videoDetails,
//             summary,
//         });
//     } catch (error) {
//         console.error('Error fetching video details:', {
//             message: error.message,
//             stack: error.stack,
//         });
//         res.status(500).json({ error: 'Failed to fetch video details' });
//     }
// };

import { google } from 'googleapis';
import User from '../models/User.js';
import dotenv from 'dotenv';
import Fuse from 'fuse.js';
import NodeCache from 'node-cache'; // For caching
import { processTextWithNLP } from '../services/nlpService.js'; // Optional, for NLP

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

const cache = new NodeCache({ stdTTL: 3600 }); // Cache TTL of 1 hour

// Fetch all liked videos from YouTube using pagination
const fetchAllLikedVideos = async (googleId) => {
    const cacheKey = `likedVideos_${googleId}`;
    const cachedVideos = cache.get(cacheKey);

    if (cachedVideos) {
        return cachedVideos;
    }

    try {
        if (!googleId || googleId === 'undefined') {
            throw new Error('Invalid googleId');
        }

        const user = await User.findOne({ googleId });
        if (!user) throw new Error('User not found');

        oauth2Client.setCredentials({
            access_token: user.accessToken,
            refresh_token: user.refreshToken,
        });

        const { token } = await oauth2Client.getAccessToken();
        if (token !== user.accessToken) {
            user.accessToken = token;
            await user.save();
        }

        const youtube = google.youtube('v3');
        let allVideos = [];
        let nextPageToken = '';

        do {
            const response = await youtube.videos.list({
                auth: oauth2Client,
                part: 'snippet,contentDetails,statistics',
                myRating: 'like',
                maxResults: 50,
                pageToken: nextPageToken,
            });

            allVideos = allVideos.concat(response.data.items.map(video => ({
                videoId: video.id,
                title: video.snippet.title,
                description: video.snippet.description,
                thumbnails: video.snippet.thumbnails,
                publishedAt: video.snippet.publishedAt,
                statistics: video.statistics,
                channelTitle: video.snippet.channelTitle,
            })));

            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);

        cache.set(cacheKey, allVideos);
        return allVideos;
    } catch (error) {
        console.error('Error fetching liked videos from YouTube:', error.message);
        throw new Error('Failed to fetch liked videos');
    }
};

// Fuse.js options for fuzzy searching
const fuseOptions = {
    includeScore: true,
    threshold: 0.3, // Lower threshold for more exact matches
    distance: 100, // Distance can be adjusted based on preference
    minMatchCharLength: 2,
    keys: ['title', 'description', 'channelTitle'],
};

// Search through liked videos using Fuse.js
export const searchLikedVideos = async (req, res) => {
    try {
        const { googleId, prompt, page = 1, pageSize = 10 } = req.body;

        if (!googleId || !prompt) {
            return res.status(400).json({ error: 'googleId and prompt are required' });
        }

        // Fetch all liked videos
        const likedVideos = await fetchAllLikedVideos(googleId);

        // Use Fuse.js to perform fuzzy search
        const fuse = new Fuse(likedVideos, fuseOptions);
        const results = fuse.search(prompt);

        // Log the number of videos found
        console.log(`Number of videos found for prompt "${prompt}": ${results.length}`);

        // Sort results by relevance score and filter for meaningful matches
        const sortedVideos = results
            .filter(result => result.score <= 0.5) // Adjust score filtering as needed
            .map(result => ({
                ...result.item,
                score: result.score,
            }))
            .sort((a, b) => a.score - b.score);

        // Paginate results
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedVideos = sortedVideos.slice(startIndex, endIndex);

        res.status(200).json({
            likedVideos: paginatedVideos,
            totalPages: Math.ceil(sortedVideos.length / pageSize),
            totalResults: sortedVideos.length,
        });
    } catch (error) {
        console.error('Error in searchLikedVideos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get video details and process description with NLP (optional)
export const getVideoDetails = async (req, res) => {
    const { videoId } = req.body;

    if (!videoId) {
        return res.status(400).json({ error: 'Video ID is required' });
    }

    try {
        const youtube = google.youtube('v3');
        const response = await youtube.videos.list({
            part: 'snippet,contentDetails,statistics',
            id: videoId,
        });

        if (!response.data.items || response.data.items.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const videoDetails = response.data.items[0];
        const videoDescription = videoDetails.snippet.description;

        // Optional: Process description with NLP for summary
        const nlpResponse = await processTextWithNLP(videoDescription);
        const summary = nlpResponse ? nlpResponse.generated_text : 'Summary not available';

        res.status(200).json({
            videoDetails,
            summary,
        });
    } catch (error) {
        console.error('Error fetching video details:', {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({ error: 'Failed to fetch video details' });
    }
};


export const getLikedVideos = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('likedVideos');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user.likedVideos);
    } catch (error) {
        console.error('Error retrieving liked videos:', {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({ error: 'Failed to retrieve liked videos' });
    }
};



// import { google } from 'googleapis';
// import User from '../models/User.js';
// import { processTextWithNLP } from '../services/nlpService.js';
// import dotenv from 'dotenv';
// import Fuse from 'fuse.js';
// import NodeCache from 'node-cache'; // For caching

// dotenv.config();

// const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URL
// );

// const cache = new NodeCache({ stdTTL: 3600 }); // Cache TTL of 1 hour

// const fetchLikedVideosFromYouTube = async (googleId) => {
//     const cacheKey = `likedVideos_${googleId}`;
//     const cachedVideos = cache.get(cacheKey);

//     if (cachedVideos) {
//         console.log('Fetching liked videos from cache');
//         return cachedVideos;
//     }

//     try {
//         if (!googleId || googleId === 'undefined') {
//             throw new Error('Invalid googleId');
//         }

//         const user = await User.findOne({ googleId });
//         if (!user) throw new Error('User not found');

//         oauth2Client.setCredentials({
//             access_token: user.accessToken,
//             refresh_token: user.refreshToken,
//         });

//         const { token } = await oauth2Client.getAccessToken();
//         if (token !== user.accessToken) {
//             user.accessToken = token;
//             await user.save();
//         }

//         const youtube = google.youtube('v3');
//         let allVideos = [];
//         let nextPageToken = '';

//         // Using async/await with promise.all for parallel requests
//         const fetchPage = async (pageToken) => {
//             const response = await youtube.videos.list({
//                 auth: oauth2Client,
//                 part: 'snippet,contentDetails,statistics',
//                 myRating: 'like',
//                 maxResults: 50,
//                 pageToken: pageToken,
//             });
//             return response.data;
//         };

//         const pageResults = [];
//         do {
//             console.log('Fetching liked videos from YouTube');
//             const data = await fetchPage(nextPageToken);
//             allVideos = allVideos.concat(data.items);
//             nextPageToken = data.nextPageToken;
//             pageResults.push(data);
//         } while (nextPageToken);

//         cache.set(cacheKey, allVideos);
//         console.log(`Total liked videos fetched: ${allVideos.length}`);
//         return allVideos.map(video => ({
//             videoId: video.id,
//             title: video.snippet.title,
//             description: video.snippet.description,
//             thumbnails: video.snippet.thumbnails,
//             publishedAt: video.snippet.publishedAt,
//             statistics: video.statistics,
//             channelTitle: video.snippet.channelTitle,
//         }));
//     } catch (error) {
//         console.error('Error fetching liked videos from YouTube:', error.message);
//         throw new Error('Failed to fetch liked videos');
//     }
// };

// const fuseOptions = {
//     includeScore: true,
//     keys: ['title', 'description', 'channelTitle'],
// };

// export const searchLikedVideos = async (req, res) => {
//     try {
//         const { googleId, prompt, page = 1, pageSize = 10 } = req.body;

//         if (!googleId || !prompt) {
//             return res.status(400).json({ error: 'googleId and prompt are required' });
//         }

//         const likedVideos = await fetchLikedVideosFromYouTube(googleId);

//         console.log(`Running Fuse.js search for prompt: ${prompt}`);
//         const fuse = new Fuse(likedVideos, fuseOptions);
//         const results = fuse.search(prompt);

//         const sortedVideos = results.map(result => ({
//             ...result.item,
//             score: result.score,
//         }));

//         const totalResults = sortedVideos.length;
//         const totalPages = Math.ceil(totalResults / pageSize);
//         const startIndex = (page - 1) * pageSize;
//         const endIndex = startIndex + pageSize;
//         const paginatedVideos = sortedVideos.slice(startIndex, endIndex);

//         console.log(`Total matching videos: ${totalResults}, Returning page ${page}`);
//         res.status(200).json({
//             likedVideos: paginatedVideos,
//             totalPages: totalPages,
//             currentPage: page,
//             totalResults: totalResults,
//         });
//     } catch (error) {
//         console.error('Error in searchLikedVideos:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// export const getLikedVideos = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).populate('likedVideos');
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.status(200).json(user.likedVideos);
//     } catch (error) {
//         console.error('Error retrieving liked videos:', {
//             message: error.message,
//             stack: error.stack,
//         });
//         res.status(500).json({ error: 'Failed to retrieve liked videos' });
//     }
// };

// export const getVideoDetails = async (req, res) => {
//     const { videoId } = req.body;

//     if (!videoId) {
//         return res.status(400).json({ error: 'Video ID is required' });
//     }

//     try {
//         const youtube = google.youtube('v3');
//         const response = await youtube.videos.list({
//             part: 'snippet,contentDetails,statistics',
//             id: videoId,
//         });

//         if (!response.data.items || response.data.items.length === 0) {
//             return res.status(404).json({ error: 'Video not found' });
//         }

//         const videoDetails = response.data.items[0];
//         const videoDescription = videoDetails.snippet.description;

//         const nlpResponse = await processTextWithNLP(videoDescription);
//         const summary = nlpResponse.generated_text;

//         res.status(200).json({
//             videoDetails,
//             summary,
//         });
//     } catch (error) {
//         console.error('Error fetching video details:', {
//             message: error.message,
//             stack: error.stack,
//         });
//         res.status(500).json({ error: 'Failed to fetch video details' });
//     }
// };
