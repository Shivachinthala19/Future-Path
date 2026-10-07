import express from 'express';
import {
  getRelatedJobs,
  getEligibleJobs,
  getJobById,
  getJobEducationRoutes,
  getJobSkills,
  getJobRoadmap,
  getJobCareerGrowth,
  getAllCareers,
  getCareerById
} from '../controllers/jobController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', optionalAuth, getRelatedJobs);
router.get('/eligible', optionalAuth, getEligibleJobs);
router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl.includes('careers')) {
    return getAllCareers(req, res, next);
  }
  return getRelatedJobs(req, res, next);
});

router.get('/related', optionalAuth, getRelatedJobs);
router.get('/careers', optionalAuth, getAllCareers);
router.get('/careers/:id', optionalAuth, getCareerById);

router.get('/:id/education-routes', optionalAuth, getJobEducationRoutes);
router.get('/:id/skills', optionalAuth, getJobSkills);
router.get('/:id/study-path', optionalAuth, getJobEducationRoutes);
router.get('/:id/roadmap', optionalAuth, getJobRoadmap);
router.get('/:id/career-growth', optionalAuth, getJobCareerGrowth);

router.get('/:id/studies', optionalAuth, (req, res, next) => {
  return getCareerById(req, res, next);
});
router.get('/:id/jobs', optionalAuth, (req, res, next) => {
  return getCareerById(req, res, next);
});

router.get('/:id', optionalAuth, (req, res, next) => {
  if (req.baseUrl.includes('careers')) {
    return getCareerById(req, res, next);
  }
  return getJobById(req, res, next);
});

export default router;
