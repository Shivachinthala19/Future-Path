import express from 'express';
import { EligibilityService } from '../services/eligibilityService.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/check', optionalAuth, async (req, res, next) => {
  try {
    const { education, targetJob, userAge = 23, qualifications = [], certifications = [], experienceMonths = 0, location = 'India' } = req.body;

    const evaluation = await EligibilityService.evaluateEligibility({
      educationQuery: education || req.user?.educationName || req.user?.currentEducation?.name || 'B.Com',
      jobQuery: targetJob || req.user?.targetJob?.targetJobName || 'Data Analyst',
      userAge,
      userCertifications: certifications,
      userExperienceMonths: experienceMonths,
      userLocation: location
    });

    res.json({
      success: true,
      data: evaluation
    });
  } catch (error) {
    next(error);
  }
});

export default router;
