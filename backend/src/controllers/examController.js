import { Exam } from '../models/Exam.js';
import { Entity } from '../models/Entity.js';

export const getAllExams = async (req, res, next) => {
  try {
    const { category, type, search, q } = req.query;
    const searchQuery = search || q;

    const filter = {};
    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }
    if (type && type !== 'All') {
      filter.type = type;
    }
    if (searchQuery && searchQuery.trim()) {
      const reg = new RegExp(searchQuery.trim(), 'i');
      filter.$or = [
        { name: reg },
        { shortName: reg },
        { aliases: reg },
        { organization: reg },
        { description: reg }
      ];
    }

    let exams = await Exam.find(filter).lean();

    if (exams.length === 0) {
      // Fallback to Entity model
      const entityFilter = { type: { $in: ['EXAM', 'GOVERNMENT_JOB'] } };
      if (searchQuery && searchQuery.trim()) {
        const reg = new RegExp(searchQuery.trim(), 'i');
        entityFilter.$or = [
          { name: reg },
          { shortName: reg },
          { aliases: reg },
          { organization: reg }
        ];
      }
      exams = await Entity.find(entityFilter).lean();
    }

    res.json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    next(error);
  }
};

export const getExamById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim();

    let exam = await Exam.findOne({
      $or: [
        { id: cleanId.toLowerCase() },
        { id: cleanId.toLowerCase().replace(/[^a-z0-9]/g, '-') },
        { name: { $regex: new RegExp(`^${cleanId}$`, 'i') } },
        { shortName: { $regex: new RegExp(`^${cleanId}$`, 'i') } },
        { aliases: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
      ]
    }).lean();

    if (!exam) {
      exam = await Entity.findOne({
        type: { $in: ['EXAM', 'GOVERNMENT_JOB'] },
        $or: [
          { id: cleanId.toLowerCase() },
          { id: cleanId.toLowerCase().replace(/[^a-z0-9]/g, '-') },
          { name: { $regex: new RegExp(`^${cleanId}$`, 'i') } },
          { aliases: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
        ]
      }).lean();
    }

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: `Exam not found with identifier: ${id}`
      });
    }

    res.json({
      success: true,
      data: exam
    });
  } catch (error) {
    next(error);
  }
};
