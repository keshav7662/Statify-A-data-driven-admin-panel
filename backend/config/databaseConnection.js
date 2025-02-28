import mongoose from 'mongoose';
import environment from './environment.js';
import { StatusCodes } from 'http-status-codes';
const {dbUrl} = environment;

export const connectDb = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('Database connected successfully!');
    } catch (error) {
        ("Database connection failed:", error);  
        process.exit(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
