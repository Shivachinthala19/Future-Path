import { Education } from '../models/Education.js';
import { StudyPathway } from '../models/StudyPathway.js';
import { KnowledgeGraphService } from '../services/knowledgeGraphService.js';

export const getAllEducations = async (req, res, next) => {
  try {
    const { stream, level, search } = req.query;
    const filter = {};

    if (stream && stream !== 'All') {
      filter.stream = stream;
    }
    if (level && level !== 'All') {
      filter.level = level;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { aliases: { $regex: search, $options: 'i' } },
        { branch: { $regex: search, $options: 'i' } }
      ];
    }

    const educations = await Education.find(filter).sort({ name: 1 });
    res.json({
      success: true,
      count: educations.length,
      data: educations,
    });
  } catch (error) {
    next(error);
  }
};

export const searchEducations = async (req, res, next) => {
  try {
    const { q } = req.query;

    const mapHierarchy = (edu) => {
      const level = edu.level || 'Undergraduate';
      const qualification = edu.qualification || (level.includes('(') ? level.split('(')[0].trim() : level);
      const stream = edu.stream || 'General';
      const specialization = edu.branch || edu.specialization || edu.name;
      const hierarchy = `${level} → ${qualification} → ${stream} → ${edu.name}`;

      return {
        id: edu._id,
        name: edu.name,
        slug: edu.slug,
        level,
        qualification,
        stream,
        branch: edu.branch || '',
        specialization: edu.specialization || '',
        aliases: edu.aliases || [],
        hierarchy,
        hierarchyChain: [level, qualification, stream, specialization, edu.name],
        typicalSubjects: edu.typicalSubjects || []
      };
    };

    if (!q || q.trim().length === 0) {
      const popular = await Education.find()
        .limit(20)
        .select('name slug level qualification stream branch specialization aliases typicalSubjects')
        .lean();
      return res.json({
        success: true,
        count: popular.length,
        data: popular.map(mapHierarchy)
      });
    }

    const cleanQ = q.trim();
    const regex = new RegExp(cleanQ, 'i');
    const matches = await Education.find({
      $or: [
        { name: regex },
        { aliases: regex },
        { branch: regex },
        { stream: regex },
        { qualification: regex },
        { specialization: regex },
        { level: regex }
      ]
    })
      .limit(15)
      .select('name slug level qualification stream branch specialization aliases typicalSubjects')
      .lean();

    // Sort to prioritize exact/prefix matches
    matches.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const queryLower = cleanQ.toLowerCase();

      if (aName === queryLower) return -1;
      if (bName === queryLower) return 1;
      if (aName.startsWith(queryLower) && !bName.startsWith(queryLower)) return -1;
      if (bName.startsWith(queryLower) && !aName.startsWith(queryLower)) return 1;
      return 0;
    });

    res.json({
      success: true,
      query: cleanQ,
      count: matches.length,
      data: matches.map(mapHierarchy),
    });
  } catch (error) {
    next(error);
  }
};

export const getEducationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let education = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      education = await Education.findById(id);
    } else {
      education = await Education.findOne({ slug: id });
    }

    if (!education) {
      return res.status(404).json({ success: false, message: 'Education record not found.' });
    }

    const pathways = await StudyPathway.find({ fromEducation: education._id }).populate('toStudy');

    res.json({
      success: true,
      data: {
        education,
        pathways,
      }
    });
  } catch (error) {
    next(error);
  }
};
