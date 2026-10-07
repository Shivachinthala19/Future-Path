import express from 'express';
import {
  analyzeFuturePath,
  getFuturePath,
  getSkillGap,
  generateRoadmap,
  getRoadmap,
  updateRoadmapTask,
  getDailyMissions,
  completeDailyMission,
  recalculateFuturePath
} from '../controllers/careerController.js';
import { analyzeResume } from '../controllers/resumeController.js';
import { startInterview, submitAnswer } from '../controllers/interviewController.js';
import { optionalAuth, protect } from '../middleware/authMiddleware.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import {
  validateRequest,
  analyzeEducationSchema,
  skillGapSchema,
  roadmapGenerateSchema,
  resumeAnalyzeSchema,
  interviewAnswerSchema
} from '../validators/schemas.js';

const router = express.Router();

// Signature AI Future Path Analysis & Single Future Path Endpoint
router.get('/future-path', optionalAuth, getFuturePath);
router.post('/analyze', aiLimiter, optionalAuth, validateRequest(analyzeEducationSchema), analyzeFuturePath);
router.post('/recalculate', aiLimiter, optionalAuth, recalculateFuturePath);

// Roadmap routes & aliases
router.post('/roadmap/generate', optionalAuth, validateRequest(roadmapGenerateSchema), generateRoadmap);
router.get('/roadmap', optionalAuth, getRoadmap);
router.put('/roadmap/tasks/:taskId', optionalAuth, updateRoadmapTask);
router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl.includes('future-path') || req.query.education) {
    return getFuturePath(req, res, next);
  }
  return getRoadmap(req, res, next);
});

// Skill Gap & Skill Analyze aliases
router.post('/skill-gap', optionalAuth, validateRequest(skillGapSchema), getSkillGap);
router.post('/skills/analyze', optionalAuth, validateRequest(skillGapSchema), getSkillGap);

// Projects alias
router.post('/projects/generate', optionalAuth, generateRoadmap);

// Resume Analysis & Interview Coach
router.post('/resume/analyze', optionalAuth, validateRequest(resumeAnalyzeSchema), analyzeResume);
router.post('/interview/start', optionalAuth, startInterview);
router.post('/interview/answer', optionalAuth, validateRequest(interviewAnswerSchema), submitAnswer);

export default router;
