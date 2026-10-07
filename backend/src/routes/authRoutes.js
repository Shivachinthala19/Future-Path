import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validateRequest, registerSchema, loginSchema } from '../validators/schemas.js';

const router = express.Router();

router.post('/register', authLimiter, validateRequest(registerSchema), register);
router.post('/login', authLimiter, validateRequest(loginSchema), login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
