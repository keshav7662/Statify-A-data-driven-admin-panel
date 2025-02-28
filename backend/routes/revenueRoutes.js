import express from 'express'
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizeAdmin } from '../middlewares/adminMiddleware.js';
import {
    getRevenueBySource,
    getRevenueByTimePeriod
} from '../controllers/revenueController.js';

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, getRevenueByTimePeriod);
router.get('/source', getRevenueBySource);


export default router;