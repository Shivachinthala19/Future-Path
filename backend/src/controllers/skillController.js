import { Skill } from '../models/Skill.js';
import { Entity } from '../models/Entity.js';

export const getAllSkills = async (req, res, next) => {
  try {
    const { category, level, search, q } = req.query;
    const searchQuery = search || q;

    const filter = {};
    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }
    if (level && level !== 'All') {
      filter.level = level;
    }
    if (searchQuery && searchQuery.trim()) {
      const reg = new RegExp(searchQuery.trim(), 'i');
      filter.$or = [
        { name: reg },
        { aliases: reg },
        { category: reg },
        { description: reg }
      ];
    }

    let skills = await Skill.find(filter).lean();

    if (skills.length === 0) {
      const entityFilter = { type: 'SKILL' };
      if (searchQuery && searchQuery.trim()) {
        const reg = new RegExp(searchQuery.trim(), 'i');
        entityFilter.$or = [
          { name: reg },
          { aliases: reg },
          { category: reg }
        ];
      }
      skills = await Entity.find(entityFilter).lean();
    }

    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

export const getSkillById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim();

    let skill = await Skill.findOne({
      $or: [
        { id: cleanId.toLowerCase() },
        { slug: cleanId.toLowerCase() },
        { name: { $regex: new RegExp(`^${cleanId}$`, 'i') } },
        { aliases: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
      ]
    }).lean();

    if (!skill) {
      skill = await Entity.findOne({
        type: 'SKILL',
        $or: [
          { id: cleanId.toLowerCase() },
          { name: { $regex: new RegExp(`^${cleanId}$`, 'i') } },
          { aliases: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
        ]
      }).lean();
    }

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: `Skill not found with identifier: ${id}`
      });
    }

    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};
