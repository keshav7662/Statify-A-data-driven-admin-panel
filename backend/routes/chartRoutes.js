import express from 'express';
import { getDashboardData } from '../controllers/chartController.js';
import { authenticate } from '../middlewares/authMiddleware.js'
import { authorizeAdmin } from '../middlewares/adminMiddleware.js'

const router = express.Router();

router.get('/chart-data', authenticate, authorizeAdmin, getDashboardData);

export default router;
