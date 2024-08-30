import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnails: {
        default: {
            url: { type: String, required: false },
            width: { type: Number, required: false },
            height: { type: Number, required: false },
        },
        medium: {
            url: { type: String, required: false },
            width: { type: Number, required: false },
            height: { type: Number, required: false },
        },
        high: {
            url: { type: String, required: false },
            width: { type: Number, required: false },
            height: { type: Number, required: false },
        },
    },
    nlpFeatures: {
        sentiment: {
            type: String,
            required: false,
        },
        keywords: [
            {
                type: String,
                required: false,
            },
        ],
    },
});

const Video = mongoose.model('Video', VideoSchema);

export default Video;
