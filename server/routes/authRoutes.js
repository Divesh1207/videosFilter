import express from 'express';
import { googleLogin, googleCallback } from '../controllers/authController.js';

const router = express.Router();

router.get('/google', googleLogin);
router.get('/callback', googleCallback);


export default router;
