import express from 'express'
import { getWeatherData } from '../controllers/weatherController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getWeatherData);

export default router;