import express from 'express';
import { getLikedVideos, getVideoDetails, searchLikedVideos } from '../controllers/videoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/liked-videos', authMiddleware, getLikedVideos);

// Route to search liked videos and find similar ones based on user input
router.post('/search-liked-videos', authMiddleware, searchLikedVideos);

// Route to get detailed information about a specific video
router.post('/video-details', authMiddleware, getVideoDetails);


export default router;
