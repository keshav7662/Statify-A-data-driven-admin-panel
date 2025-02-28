import express from 'express'
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizeAdmin } from '../middlewares/adminMiddleware.js';
import { fetchUserProfile, findAllUser, getAdminDashboardStats, manageAdminRoles } from '../controllers/adminController.js';

const router = express.Router();

router.get('/all-users', authenticate, authorizeAdmin, findAllUser)
router.get('/profile', authenticate, fetchUserProfile)
router.get('/dashboard-stats', authenticate, authorizeAdmin, getAdminDashboardStats)
router.put('/manage-roles/:id', authenticate, authorizeAdmin, manageAdminRoles)

export default router