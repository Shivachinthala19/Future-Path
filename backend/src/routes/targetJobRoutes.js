import express from 'express';
import {
  getTargetJob,
  updateUserTargetJob,
  analyzeTargetJob,
  getJobRoadmap
} from '../controllers/targetJobController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl.includes('job-roadmap')) {
    return getJobRoadmap(req, res, next);
  }
  return getTargetJob(req, res, next);
});

router.put('/', optionalAuth, updateUserTargetJob);
router.post('/analyze', optionalAuth, analyzeTargetJob);
router.get('/roadmap', optionalAuth, getJobRoadmap);
router.post('/generate', optionalAuth, (req, res, next) => {
  return analyzeTargetJob(req, res, next);
});

export default router;
