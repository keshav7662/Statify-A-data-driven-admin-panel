import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizeAdmin } from '../middlewares/adminMiddleware.js'
import { fetchAllSubscriptions, subscribeToPro, unsubscribeToPro } from '../controllers/subscriptionController.js';

const router = express.Router();

router.put('/unsubscribe/:id', authenticate, authorizeAdmin, unsubscribeToPro);
router.get('/', authenticate, authorizeAdmin, fetchAllSubscriptions)
router.post('/', authenticate, subscribeToPro);


export default router;