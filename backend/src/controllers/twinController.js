import { CareerTwin } from '../models/CareerTwin.js';
import { User } from '../models/User.js';

export const getMyTwin = async (req, res, next) => {
  try {
    let twin = await CareerTwin.findOne({ user: req.user._id });
    if (!twin) {
      twin = await CareerTwin.create({
        user: req.user._id,
        education: { degreeName: req.user.currentEducation?.name || '' },
        passportSlug: `${req.user.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${req.user._id.toString().slice(-4)}`
      });
    }

    res.json({
      success: true,
      data: twin,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTwin = async (req, res, next) => {
  try {
    const { skills, interests, targetCareers, targetJobs } = req.body;
    const twin = await CareerTwin.findOne({ user: req.user._id });

    if (!twin) {
      return res.status(404).json({ success: false, message: 'Career twin not found.' });
    }

    if (skills) twin.skills = skills;
    if (interests) twin.interests = interests;
    if (targetCareers) twin.targetCareers = targetCareers;
    if (targetJobs) twin.targetJobs = targetJobs;

    twin.twinScore = Math.min(40 + (twin.skills.length * 5) + (twin.targetCareers.length * 5), 100);
    twin.recentActivity.push({
      action: 'Updated Profile & Skills',
      detail: `Current skill count: ${twin.skills.length}`
    });

    await twin.save();

    res.json({
      success: true,
      message: 'Career Twin profile updated.',
      data: twin,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicPassport = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const twin = await CareerTwin.findOne({ passportSlug: slug, isPassportPublic: true })
      .populate('user', 'name headline location avatar');

    if (!twin) {
      return res.status(404).json({ success: false, message: 'Public Career Passport not found or set to private.' });
    }

    res.json({
      success: true,
      data: twin,
    });
  } catch (error) {
    next(error);
  }
};
