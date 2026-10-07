import express from 'express';
import { getAllExams, getExamById } from '../controllers/examController.js';

const router = express.Router();

router.get('/', getAllExams);
router.get('/search', getAllExams);
router.get('/:id', getExamById);

export default router;
