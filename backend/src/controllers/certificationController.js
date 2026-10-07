import { Certification } from '../models/Certification.js';
import { Entity } from '../models/Entity.js';

export const getAllCertifications = async (req, res, next) => {
  try {
    const { category, costTier, difficulty, search, q } = req.query;
    const searchQuery = search || q;

    const filter = {};
    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }
    if (costTier && costTier !== 'All') {
      filter.costTier = costTier;
    }
    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty;
    }
    if (searchQuery && searchQuery.trim()) {
      const reg = new RegExp(searchQuery.trim(), 'i');
      filter.$or = [
        { title: reg },
        { name: reg },
        { provider: reg },
        { issuer: reg },
        { description: reg }
      ];
    }

    let certs = await Certification.find(filter).lean();

    if (certs.length === 0) {
      const entityFilter = { type: 'CERTIFICATION' };
      if (searchQuery && searchQuery.trim()) {
        const reg = new RegExp(searchQuery.trim(), 'i');
        entityFilter.$or = [
          { name: reg },
          { description: reg },
          { organization: reg }
        ];
      }
      certs = await Entity.find(entityFilter).lean();
    }

    res.json({
      success: true,
      count: certs.length,
      data: certs
    });
  } catch (error) {
    next(error);
  }
};

export const getCertificationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim();

    let cert = await Certification.findOne({
      $or: [
        { id: cleanId.toLowerCase() },
        { slug: cleanId.toLowerCase() },
        { title: { $regex: new RegExp(`^${cleanId}$`, 'i') } },
        { name: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
      ]
    }).lean();

    if (!cert) {
      cert = await Entity.findOne({
        type: 'CERTIFICATION',
        $or: [
          { id: cleanId.toLowerCase() },
          { name: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
        ]
      }).lean();
    }

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: `Certification not found with identifier: ${id}`
      });
    }

    res.json({
      success: true,
      data: cert
    });
  } catch (error) {
    next(error);
  }
};
