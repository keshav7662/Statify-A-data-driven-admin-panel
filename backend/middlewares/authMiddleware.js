import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';

const { jwtSecret } = environment;

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Access Denied. No token provided.',
            });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.user = decoded;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: 'Your session has expired. Please log in again.',
                });
            }
            throw error; // Re-throw other JWT errors
        }
    } catch (error) {
        next({
            message: 'An error occurred during authentication.',
            statusCode: StatusCodes.FORBIDDEN,
            error: error.message,
        });
    }
};
