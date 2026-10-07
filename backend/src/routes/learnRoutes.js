import express from 'express';
import { getLearnSkills } from '../controllers/learnController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getLearnSkills);
router.get('/:jobId', optionalAuth, getLearnSkills);

export default router;
