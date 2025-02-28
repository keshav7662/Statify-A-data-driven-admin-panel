import express from 'express'
import { trackVisitors } from '../controllers/visitorController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizeAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.post('/track', authenticate, trackVisitors)


export default router;