import mongoose from 'mongoose';
import { Education } from '../models/Education.js';
import { StudyPathway } from '../models/StudyPathway.js';
import { KnowledgeGraphService } from '../services/knowledgeGraphService.js';
import { SupabaseService } from '../services/supabase/supabaseService.js';
import { isSupabaseConfigured } from '../config/supabase.js';

export const getAllEducations = async (req, res, next) => {
  try {
    const { stream, level, search } = req.query;

    // Prioritize Supabase primary database
    if (isSupabaseConfigured()) {
      const levels = await SupabaseService.getEducationLevels();
      if (levels && levels.length > 0) {
        let mapped = levels.map(l => ({
          _id: l.id,
          id: l.code || l.id,
          name: l.name,
          slug: (l.code || l.name).toLowerCase().replace(/[^a-z0-9]/g, '-'),
          level: l.name,
          stream: 'General',
          description: l.description,
          branch: ''
        }));
        if (search) {
          const s = search.toLowerCase();
          mapped = mapped.filter(m => m.name.toLowerCase().includes(s) || m.slug.includes(s));
        }
        return res.json({
          success: true,
          count: mapped.length,
          data: mapped,
        });
      }
    }

    if (mongoose.connection.readyState === 1) {
      const filter = {};
      if (stream && stream !== 'All') filter.stream = stream;
      if (level && level !== 'All') filter.level = level;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { aliases: { $regex: search, $options: 'i' } },
          { branch: { $regex: search, $options: 'i' } }
        ];
      }
      const educations = await Education.find(filter).sort({ name: 1 }).catch(() => []);
      if (educations.length > 0) {
        return res.json({
          success: true,
          count: educations.length,
          data: educations,
        });
      }
    }

    res.json({
      success: true,
      count: 0,
      data: [],
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

    let matches = [];

    if (mongoose.connection.readyState === 1) {
      if (!q || q.trim().length === 0) {
        const popular = await Education.find()
          .limit(20)
          .select('name slug level qualification stream branch specialization aliases typicalSubjects')
          .lean()
          .catch(() => []);
        if (popular.length > 0) {
          return res.json({
            success: true,
            count: popular.length,
            data: popular.map(mapHierarchy)
          });
        }
      } else {
        const cleanQ = q.trim();
        const regex = new RegExp(cleanQ, 'i');
        matches = await Education.find({
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
          .lean()
          .catch(() => []);
      }
    }

    if (matches.length === 0 && isSupabaseConfigured()) {
      const levels = await SupabaseService.getEducationLevels();
      const cleanQ = (q || '').trim().toLowerCase();
      let filtered = levels;
      if (cleanQ) {
        filtered = levels.filter(l => l.name.toLowerCase().includes(cleanQ) || (l.description && l.description.toLowerCase().includes(cleanQ)));
      }
      matches = filtered.map(l => ({
        _id: l.id,
        name: l.name,
        slug: (l.code || l.name).toLowerCase().replace(/[^a-z0-9]/g, '-'),
        level: l.name,
        qualification: l.name,
        stream: 'General',
        branch: '',
        specialization: '',
        aliases: [],
        typicalSubjects: []
      }));
    }

    const cleanQ = (q || '').trim();

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

    if (mongoose.connection.readyState === 1) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        education = await Education.findById(id).catch(() => null);
      } else {
        education = await Education.findOne({ slug: id }).catch(() => null);
      }
    }

    if (!education && isSupabaseConfigured()) {
      const levels = await SupabaseService.getEducationLevels();
      const match = levels.find(l => (l.code || l.name).toLowerCase().replace(/[^a-z0-9]/g, '-') === id.toLowerCase() || l.id === id);
      if (match) {
        education = {
          _id: match.id,
          name: match.name,
          slug: (match.code || match.name).toLowerCase().replace(/[^a-z0-9]/g, '-'),
          level: match.name,
          description: match.description
        };
      }
    }

    if (!education) {
      return res.status(404).json({ success: false, message: 'Education record not found.' });
    }

    let pathways = [];
    if (mongoose.connection.readyState === 1 && education._id) {
      pathways = await StudyPathway.find({ fromEducation: education._id }).populate('toStudy').catch(() => []);
    }

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
