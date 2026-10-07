import { JobOpportunity } from '../models/JobOpportunity.js';

export const getOpportunities = async (req, res, next) => {
  try {
    const { category, search, location } = req.query;
    const filter = { isActive: true };

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (location && location !== 'All') {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (search) {
      filter.$or = [
        { role: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }

    const opportunities = await JobOpportunity.find(filter).sort({ postedDate: -1 });

    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities,
    });
  } catch (error) {
    next(error);
  }
};
