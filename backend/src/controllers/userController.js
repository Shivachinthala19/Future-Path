import { User } from '../models/User.js';
import { Study } from '../models/Study.js';
import { Education } from '../models/Education.js';
import { Roadmap } from '../models/Roadmap.js';
import { KnowledgeGraphService } from '../services/knowledgeGraphService.js';
import { AIService } from '../services/aiService.js';
import { SupabaseService } from '../services/supabase/supabaseService.js';
import { isSupabaseConfigured, getSupabaseClient } from '../config/supabase.js';

/**
 * GET /api/user/profile
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;

    // Check Supabase first if configured
    if (isSupabaseConfigured() && req.user) {
      const u = req.user;
      return res.json({
        success: true,
        data: {
          id: u._id || u.id,
          name: u.name,
          email: u.email,
          educationName: u.currentEducation?.name || 'B.Com',
          educationId: '',
          qualificationLevel: u.educationLevel || "Bachelor's Degree",
          specialization: u.preferences?.specialization || u.specialization || '',
          status: u.currentEducation?.status || 'completed',
          completionYear: u.preferences?.completionYear || 2024,
          targetJob: { targetJobId: '', targetJobName: u.careerGoal?.targetJobRole || u.targetJob || 'Data Analyst' },
          currentJob: u.preferences?.currentJob || '',
          location: u.location,
          skills: u.skills || []
        }
      });
    }

    let user = null;
    if (userId) {
      user = await User.findById(userId).catch(() => null);
    }
    if (!user) {
      user = await User.findOne({ email: 'demo@careercompass.ai' });
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        educationName: user.educationName || user.currentEducation?.name || 'B.Com',
        educationId: user.educationId || user.currentEducation?.educationId,
        qualificationLevel: user.qualificationLevel || user.currentEducation?.qualificationLevel || "Bachelor's Degree",
        specialization: user.specialization || '',
        status: user.currentEducation?.status || 'completed',
        completionYear: user.currentEducation?.completionYear || 2024,
        targetJob: user.targetJob || { targetJobId: '', targetJobName: 'Data Analyst' },
        currentJob: user.currentJob || '',
        location: user.location,
        skills: user.skills || []
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/user/profile
 */
export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, specialization, currentJob, location, status, completionYear, skills, educationName } = req.body;
    const userId = req.user?._id || req.user?.id;

    if (isSupabaseConfigured() && userId) {
      const updated = await SupabaseService.updateUserProfile(userId, {
        name,
        location,
        headline: specialization,
        currentEducation: educationName ? { name: educationName } : undefined,
        preferences: {
          specialization,
          currentJob,
          status,
          completionYear,
          skills
        }
      });

      if (updated) {
        return res.json({
          success: true,
          message: 'Profile updated successfully.',
          data: {
            id: updated.id,
            name: updated.name,
            email: updated.email,
            educationName: updated.current_education || educationName,
            qualificationLevel: updated.education_level || "Bachelor's Degree",
            specialization,
            status: updated.education_status || status,
            completionYear,
            targetJob: { targetJobName: updated.target_job || updated.target_career },
            currentJob,
            location: updated.location,
            skills: updated.skills || skills || []
          }
        });
      }
    }

    const user = await User.findById(userId).catch(() => null);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name;
    if (specialization !== undefined) {
      user.specialization = specialization;
      if (user.currentEducation) user.currentEducation.specialization = specialization;
    }
    if (status !== undefined && user.currentEducation) {
      user.currentEducation.status = status;
    }
    if (completionYear !== undefined && user.currentEducation) {
      user.currentEducation.completionYear = completionYear;
    }
    if (currentJob !== undefined) user.currentJob = currentJob;
    if (location) user.location = { ...user.location, ...location };
    if (skills) user.skills = skills;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        educationName: user.educationName || user.currentEducation?.name,
        qualificationLevel: user.qualificationLevel,
        specialization: user.specialization,
        status: user.currentEducation?.status,
        completionYear: user.currentEducation?.completionYear,
        targetJob: user.targetJob,
        currentJob: user.currentJob,
        location: user.location,
        skills: user.skills || []
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/user/education
 * The core education switcher API: Changes the user's study and recalculates personalized options
 */
export const updateUserEducation = async (req, res, next) => {
  try {
    const { educationName, educationId } = req.body;

    if (!educationName && !educationId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide educationName or educationId'
      });
    }

    let studyDoc = null;
    if (educationName) {
      studyDoc = await Study.findOne({
        $or: [
          { id: educationName.toLowerCase().replace(/[^a-z0-9]/g, '-') },
          { name: { $regex: new RegExp(`^${educationName}$`, 'i') } },
          { shortName: { $regex: new RegExp(`^${educationName}$`, 'i') } },
          { aliases: { $regex: new RegExp(`^${educationName}$`, 'i') } }
        ]
      }).lean();
    }

    const resolvedName = studyDoc ? (studyDoc.shortName || studyDoc.name) : educationName.trim();

    if (req.user) {
      const uid = req.user._id || req.user.id;
      if (isSupabaseConfigured()) {
        await SupabaseService.updateUserProfile(uid, {
          currentEducation: { name: resolvedName }
        });
      }
      await User.findByIdAndUpdate(uid, {
        $set: {
          education: resolvedName,
          educationName: resolvedName,
          'currentEducation.name': resolvedName
        }
      }).catch(() => null);
    }

    res.json({
      success: true,
      message: 'Education changed successfully.',
      data: {
        educationName: resolvedName,
        study: studyDoc
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/user/target-job
 */
export { updateUserTargetJob } from './targetJobController.js';

/**
 * GET /api/user/roadmap
 * Fetch the active user's personalized roadmap progress
 */
export const getUserRoadmap = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    let roadmap = null;

    if (isSupabaseConfigured() && userId) {
      try {
        const client = getSupabaseClient();
        if (client) {
          const { data: userRoadmap } = await client
            .from('user_roadmaps')
            .select('*, roadmaps(*, roadmap_steps(*))')
            .eq('profile_id', userId)
            .maybeSingle();

          if (userRoadmap && userRoadmap.roadmaps) {
            const rm = userRoadmap.roadmaps;
            const steps = rm.roadmap_steps || [];
            steps.sort((a, b) => (a.step_number || 0) - (b.step_number || 0));
            roadmap = {
              targetJob: userRoadmap.target_job,
              educationName: userRoadmap.starting_education,
              durationMonths: rm.estimated_months || 6,
              overallProgressPercentage: userRoadmap.progress_percentage || 0,
              currentStep: (userRoadmap.completed_step_ids?.length || 0) + 1,
              completedSteps: userRoadmap.completed_step_ids || [],
              tasks: steps.map((s, idx) => ({
                order: s.step_number || idx + 1,
                title: s.title,
                completed: userRoadmap.completed_step_ids?.includes(s.step_number),
                description: s.description,
                skills: s.skills || []
              }))
            };
          }
        }
      } catch (_) {}
    }

    if (!roadmap && userId) {
      roadmap = await Roadmap.findOne({ user: userId }).sort({ updatedAt: -1 }).lean().catch(() => null);
    }

    if (!roadmap) {
      const targetJob = req.user?.targetJob?.targetJobName || 'Data Analyst';
      const educationName = req.user?.educationName || 'B.Com';

      return res.json({
        success: true,
        data: {
          targetJob,
          educationName,
          durationMonths: 6,
          overallProgressPercentage: 0,
          currentStep: 1,
          completedSteps: [],
          tasks: [
            { order: 1, title: 'Understand Core Role & Tools', completed: false, description: 'Analyze day-to-day deliverables and tool stacks' },
            { order: 2, title: 'Build Required Fundamentals', completed: false, description: 'Master foundational logic, numeracy and domain syntax' },
            { order: 3, title: 'Learn Technical Skills', completed: false, description: 'Hands-on practice with industry software' },
            { order: 4, title: 'Build 2-3 Real-World Projects', completed: false, description: 'Develop public GitHub and portfolio proof-of-work' },
            { order: 5, title: 'Create Targeted ATS Resume', completed: false, description: 'Format resume with project metrics and skills' },
            { order: 6, title: 'Practice Interview Questions', completed: false, description: 'Technical, scenario, and STAR behavioral prep' },
            { order: 7, title: 'Targeted Job Applications', completed: false, description: 'Apply across job boards, referrals, and recruiter pipelines' }
          ]
        }
      });
    }

    res.json({
      success: true,
      data: roadmap
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/user/roadmap
 * Save or initialize user's roadmap
 */
export const saveUserRoadmap = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const { targetJob, educationName, tasks, steps, overallProgressPercentage } = req.body;
    const roadmapSteps = steps || tasks || [];

    if (isSupabaseConfigured() && userId) {
      try {
        const client = getSupabaseClient();
        if (client) {
          await client.from('user_roadmaps').upsert({
            profile_id: userId,
            target_job: targetJob || 'Software Development Engineer (SDE)',
            starting_education: educationName || 'B.Tech Computer Science',
            progress_percentage: overallProgressPercentage || 0,
            is_active: true,
            updated_at: new Date().toISOString()
          }, { onConflict: 'profile_id' });
        }
      } catch (_) {}
    }

    let roadmap = null;
    if (userId) {
      roadmap = await Roadmap.findOne({ user: userId });
      if (roadmap) {
        if (targetJob) roadmap.targetJobRole = targetJob;
        if (educationName) roadmap.startingEducation = educationName;
        if (roadmapSteps.length > 0) {
          roadmap.steps = roadmapSteps;
          roadmap.tasks = roadmapSteps;
        }
        if (overallProgressPercentage !== undefined) roadmap.overallProgressPercentage = overallProgressPercentage;
        await roadmap.save();
      } else {
        roadmap = await Roadmap.create({
          user: userId,
          title: `Roadmap to ${targetJob || 'Target Job'}`,
          targetCareer: targetJob || 'General',
          targetJobRole: targetJob || 'Target Job',
          startingEducation: educationName || 'B.Com',
          overallProgressPercentage: overallProgressPercentage || 0,
          steps: roadmapSteps,
          tasks: roadmapSteps
        });
      }
    }

    res.json({
      success: true,
      message: 'Roadmap saved successfully.',
      data: roadmap || req.body
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/user/roadmap/:id
 * IDOR protection: Verify roadmap belongs to authenticated user
 */
export const updateUserRoadmapTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const { completed, completedSteps, overallProgressPercentage, taskIndex } = req.body;

    // Check if id is an ObjectId for a Roadmap document
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      const roadmapDoc = await Roadmap.findById(id);
      if (roadmapDoc) {
        // Enforce ownership check to prevent IDOR
        if (userId && roadmapDoc.user && roadmapDoc.user.toString() !== userId.toString()) {
          return res.status(403).json({
            success: false,
            message: 'Forbidden: You do not have permission to modify this roadmap.'
          });
        }

        if (overallProgressPercentage !== undefined) {
          roadmapDoc.overallProgressPercentage = overallProgressPercentage;
        }
        if (taskIndex !== undefined && roadmapDoc.tasks && roadmapDoc.tasks[taskIndex]) {
          roadmapDoc.tasks[taskIndex].completed = Boolean(completed);
          if (completed) roadmapDoc.tasks[taskIndex].completedAt = new Date();
        }
        await roadmapDoc.save();

        return res.json({
          success: true,
          message: 'Roadmap task updated successfully.',
          data: roadmapDoc
        });
      }
    }

    // Step toggle fallback
    res.json({
      success: true,
      message: `Step ${id} status updated.`,
      data: {
        stepId: id,
        completed: Boolean(completed),
        completedSteps: completedSteps || [],
        overallProgressPercentage: overallProgressPercentage || 0
      }
    });
  } catch (error) {
    next(error);
  }
};
