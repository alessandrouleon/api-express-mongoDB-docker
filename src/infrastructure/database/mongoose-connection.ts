import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const MongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        // console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

