import express from 'express'
import { authenticate } from '../middlewares/authMiddleware.js'
import { authorizeAdmin } from '../middlewares/adminMiddleware.js'
import { loadStocks } from '../controllers/stockController.js';

const router = express.Router();
router.get('/',authenticate,  loadStocks)

export default router;