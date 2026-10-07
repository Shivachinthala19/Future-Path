import express from 'express';
import { getAllEducations, searchEducations, getEducationById } from '../controllers/educationController.js';
import { analyzeFuturePath } from '../controllers/careerController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { validateRequest, analyzeEducationSchema } from '../validators/schemas.js';

const router = express.Router();

router.get('/', getAllEducations);
router.get('/search', searchEducations);
router.post('/analyze', aiLimiter, optionalAuth, validateRequest(analyzeEducationSchema), analyzeFuturePath);
router.get('/:id', getEducationById);

export default router;
