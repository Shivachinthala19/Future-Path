import express from 'express';
import {
  getAllStudyOptions,
  getStudyOptionById,
  getHigherStudiesForStudy,
  getCareersForStudy,
  getJobsForStudy
} from '../controllers/studyController.js';

const router = express.Router();

router.get('/search', getAllStudyOptions);
router.get('/', getAllStudyOptions);
router.get('/:id', getStudyOptionById);
router.get('/:id/path', getStudyOptionById);
router.get('/:id/higher-studies', getHigherStudiesForStudy);
router.get('/:id/careers', getCareersForStudy);
router.get('/:id/jobs', getJobsForStudy);

export default router;
