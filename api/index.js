import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import locationRoutes from "./routes/location.route.js";  // Add this line
import deviceRoutes from "./routes/device.route.js";  // Add this line
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/data';
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
}

mongoose.connect(mongodbUri)
    .then(() => {
        console.log("Succeeded to connect to MongoDB 🚀");
    })
    .catch((err) => console.log('MongoDB connection error:', err));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);  // Add this line
app.use('/api/device', deviceRoutes);  // Add this line

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`Error: ${message}, Status Code: ${statusCode}`);
    console.error(err.stack);
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT http://localhost:${PORT}`);
});
