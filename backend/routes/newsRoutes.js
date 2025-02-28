import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizeAdmin } from '../middlewares/adminMiddleware.js';
import { loadNews } from '../controllers/newsController.js';

const router = express.Router();

router.get('/',authenticate,  loadNews);

export default router;
