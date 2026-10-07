import express from 'express';
import { getAllSkills, getSkillById } from '../controllers/skillController.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/search', getAllSkills);
router.get('/:id', getSkillById);

export default router;
