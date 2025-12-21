import express from 'express';
import { getUserProfile, updateUserProfile, getUserOrders } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/orders', protect, getUserOrders);

export default router;
