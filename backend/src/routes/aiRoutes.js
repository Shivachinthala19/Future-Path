import express from 'express';
import { chatWithAI } from '../controllers/aiController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { validateRequest, aiChatSchema } from '../validators/schemas.js';

const router = express.Router();

router.post('/chat', aiLimiter, optionalAuth, validateRequest(aiChatSchema), chatWithAI);

export default router;
