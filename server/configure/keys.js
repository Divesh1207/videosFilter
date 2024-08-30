// config/keys.js
import dotenv from 'dotenv';

dotenv.config();

export const googleOAuth = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
};

export const youtubeAPIKey = process.env.YOUTUBE_API_KEY;
