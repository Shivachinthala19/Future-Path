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

    // Query Supabase exams first
    const { SupabaseService } = await import('../services/supabase/supabaseService.js');
    const supabaseExams = await SupabaseService.getExams({ category });

    let exams = [];
    if (supabaseExams && supabaseExams.length > 0) {
      exams = supabaseExams.map(e => ({
        id: e.slug || e.id,
        _id: e.slug || e.id,
        name: e.name,
        shortName: e.short_name || e.name,
        organization: e.organization,
        category: e.category,
        qualification: e.qualification,
        overview: e.overview || e.description,
        description: e.description || e.overview,
        notificationUrl: e.notification_url
      }));

      if (searchQuery && searchQuery.trim()) {
        const s = searchQuery.toLowerCase();
        exams = exams.filter(e => e.name.toLowerCase().includes(s) || (e.shortName && e.shortName.toLowerCase().includes(s)));
      }
    } else {
      exams = await Exam.find(filter).lean().catch(() => []);
    }
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
