import express from 'express'
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizeAdmin } from '../middlewares/adminMiddleware.js';
import { getUserGrowth, getVisitorGrowth } from '../controllers/growthController.js';

const router = express.Router();

router.get('/user', authenticate, authorizeAdmin, getUserGrowth)
router.get('/visitor', authenticate, authorizeAdmin, getVisitorGrowth)

export default router;