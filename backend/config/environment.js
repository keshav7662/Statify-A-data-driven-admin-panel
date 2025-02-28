import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 5000,
    dbUrl: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET
};
