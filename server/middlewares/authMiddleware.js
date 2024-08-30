
import jwt from 'jsonwebtoken';

// Middleware to protect routes
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader); // Debugging statement

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token in authmiddleware m:', token); // Debugging statement
    // console.log('JWT_SECRET authmiddleware m :', process.env.JWT_SECRET);

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            console.error('Token Verification Error:', err.message); // Debugging statement
            return res.status(403).json({ msg: 'Token is not valid' });
        }
        req.user = user; // Attach user data to request object
        next();
    });
};
