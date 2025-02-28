import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';
const { jwtSecret } = environment;

export const generateToken =  async (userId, role) => {
    return jwt.sign({id: userId, role}, jwtSecret, { expiresIn: '1h' });
};
