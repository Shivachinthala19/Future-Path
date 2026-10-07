import { User } from '../models/User.js';
import { Education } from '../models/Education.js';
import { StudyProgram } from '../models/StudyProgram.js';
import { StudyPathway } from '../models/StudyPathway.js';
import { CareerField } from '../models/CareerField.js';
import { Career } from '../models/Career.js';
import { JobRole } from '../models/JobRole.js';
import { Skill } from '../models/Skill.js';
import { Certification } from '../models/Certification.js';
import { JobOpportunity } from '../models/JobOpportunity.js';

export const getAdminStats = async (req, res, next) => {
  try {
    const [
      usersCount,
      educationsCount,
      studyProgramsCount,
      pathwaysCount,
      careerFieldsCount,
      careersCount,
      jobsCount,
      skillsCount,
      certificationsCount,
      opportunitiesCount
    ] = await Promise.all([
      User.countDocuments(),
      Education.countDocuments(),
      StudyProgram.countDocuments(),
      StudyPathway.countDocuments(),
      CareerField.countDocuments(),
      Career.countDocuments(),
      JobRole.countDocuments(),
      Skill.countDocuments(),
      Certification.countDocuments(),
      JobOpportunity.countDocuments(),
    ]);

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email role createdAt');
    const recentEducations = await Education.find().sort({ updatedAt: -1 }).limit(5).select('name level stream verificationStatus');

    res.json({
      success: true,
      stats: {
        users: usersCount,
        educations: educationsCount,
        studyPrograms: studyProgramsCount,
        studyPathways: pathwaysCount,
        careerFields: careerFieldsCount,
        careers: careersCount,
        jobs: jobsCount,
        skills: skillsCount,
        certifications: certificationsCount,
        opportunities: opportunitiesCount
      },
      recentUsers,
      recentEducations
    });
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req, res, next) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json({ success: true, data: edu });
  } catch (error) {
    next(error);
  }
};

export const createJobRole = async (req, res, next) => {
  try {
    const job = await JobRole.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};
