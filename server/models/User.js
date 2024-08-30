import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },


    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    likedVideos: [
        {
            videoId: String,
            title: String,
            description: String,
            thumbnails: Object,  // Adjust as needed
            publishedAt: String,
            statistics: Object,  // Adjust as needed
        },
    ],
});

// const User = mongoose.model('User', UserSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
