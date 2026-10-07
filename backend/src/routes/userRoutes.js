import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updateUserEducation,
  updateUserTargetJob,
  getUserRoadmap,
  saveUserRoadmap,
  updateUserRoadmapTask
} from '../controllers/userController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', optionalAuth, getUserProfile);
router.put('/profile', optionalAuth, updateUserProfile);
router.put('/education', optionalAuth, updateUserEducation);
router.put('/target-job', optionalAuth, updateUserTargetJob);

router.get('/roadmap', optionalAuth, getUserRoadmap);
router.post('/roadmap', optionalAuth, saveUserRoadmap);
router.put('/roadmap/:id', optionalAuth, updateUserRoadmapTask);

export default router;
