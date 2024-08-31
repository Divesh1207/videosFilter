import express from 'express';
import cors from 'cors'; // Importing CORS package
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

import connectDB from './configure/db.js';


const app = express();
connectDB()

// CORS Middleware with specific frontend URL
app.use(cors({
    origin: 'https://videos-filter.vercel.app', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true // If you need to allow cookies or authentication headers
}));


// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
