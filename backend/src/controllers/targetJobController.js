import { User } from '../models/User.js';
import { JobRole } from '../models/JobRole.js';
import { EligibilityService } from '../services/eligibilityService.js';
import { KnowledgeGraphService } from '../services/knowledgeGraphService.js';
import { getSupabaseClient, isSupabaseConfigured } from '../config/supabase.js';

/**
 * Target Job Controller
 * Handles /api/target-job, /api/user/target-job, /api/target-job/analyze, /api/job-roadmap
 */

export const getTargetJob = async (req, res, next) => {
  try {
    const user = req.user;
    const educationName = req.query.education || user?.educationName || user?.currentEducation?.name || 'B.Com';
    const targetJobQuery = req.query.job || user?.targetJob?.targetJobName || 'Data Analyst';

    const evaluation = await EligibilityService.evaluateEligibility({
      educationQuery: educationName,
      jobQuery: targetJobQuery,
      userAge: 23,
    });

    // Check compatibility
    const eduLower = educationName.toLowerCase();
    const jobLower = (evaluation.targetJob?.title || '').toLowerCase();
    let isCompatible = true;
    let warningMessage = null;

    if (
      (jobLower.includes('doctor') && !eduLower.includes('mbbs')) ||
      (jobLower.includes('nurse') && !eduLower.includes('nursing')) ||
      (jobLower.includes('electrician') && !eduLower.includes('iti') && !eduLower.includes('electric') && !eduLower.includes('diploma'))
    ) {
      isCompatible = false;
      warningMessage = `Your target job (${evaluation.targetJob.title}) requires specific licensing or qualifications that may not match your education (${educationName}).`;
    }

    res.json({
      success: true,
      data: {
        ...evaluation,
        isCompatible,
        warningMessage
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserTargetJob = async (req, res, next) => {
  try {
    const { targetJobId, targetJobName, category = 'Private' } = req.body;

    if (!targetJobName && !targetJobId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide targetJobName or targetJobId'
      });
    }

    let resolvedJob = null;
    if (targetJobId && targetJobId.match(/^[0-9a-fA-F]{24}$/)) {
      resolvedJob = await JobRole.findById(targetJobId);
    }
    if (!resolvedJob && targetJobName) {
      resolvedJob = await JobRole.findOne({
        title: { $regex: new RegExp(`^${targetJobName.trim()}$`, 'i') }
      });
    }

    const jobTitle = resolvedJob ? resolvedJob.title : targetJobName.trim();
    const jobId = resolvedJob ? resolvedJob._id.toString() : (targetJobId || '');
    const jobCategory = resolvedJob?.jobType || category;

    if (req.user) {
      const uid = req.user._id || req.user.id;
      if (isSupabaseConfigured()) {
        try {
          const client = getSupabaseClient();
          if (client) {
            await client.from('profiles').update({
              target_job: jobTitle,
              target_career: jobTitle,
              updated_at: new Date().toISOString()
            }).eq('id', uid);
          }
        } catch (_) {}
      }
      await User.findByIdAndUpdate(uid, {
        $set: {
          'targetJob.targetJobId': jobId,
          'targetJob.targetJobName': jobTitle,
          'targetJob.category': jobCategory,
          'targetJob.setAt': new Date()
        }
      }).catch(() => null);
    }

    const educationName = req.user?.educationName || req.user?.currentEducation?.name || 'B.Com';
    const analysis = await EligibilityService.evaluateEligibility({
      educationQuery: educationName,
      jobQuery: jobTitle
    });

    res.json({
      success: true,
      message: `Target job updated to ${jobTitle}.`,
      data: {
        targetJob: {
          targetJobId: jobId,
          targetJobName: jobTitle,
          category: jobCategory
        },
        analysis
      }
    });
  } catch (error) {
    next(error);
  }
};

export const analyzeTargetJob = async (req, res, next) => {
  try {
    const { education, targetJob, userAge = 23, experienceMonths = 0 } = req.body;

    if (!targetJob) {
      return res.status(400).json({
        success: false,
        message: 'Please provide targetJob to analyze'
      });
    }

    const result = await EligibilityService.evaluateEligibility({
      educationQuery: education || 'B.Com',
      jobQuery: targetJob,
      userAge,
      userExperienceMonths: experienceMonths
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getJobRoadmap = async (req, res, next) => {
  try {
    const educationName = req.query.education || req.user?.educationName || req.user?.currentEducation?.name || 'B.Com';
    const targetJobQuery = req.query.job || req.user?.targetJob?.targetJobName || 'Data Analyst';

    const evaluation = await EligibilityService.evaluateEligibility({
      educationQuery: educationName,
      jobQuery: targetJobQuery
    });

    res.json({
      success: true,
      data: {
        education: evaluation.education,
        targetJob: evaluation.targetJob,
        canIPursue: {
          relevance: evaluation.targetJob.relevance,
          relevanceExplanation: evaluation.targetJob.relevanceExplanation,
          eligibilityStatus: evaluation.targetJob.eligibilityStatus,
          missingRequirements: evaluation.targetJob.missingRequirements,
          experienceRequired: evaluation.targetJob.experienceRequired,
          requiredLicense: evaluation.targetJob.requiredLicense,
          entranceExam: evaluation.targetJob.entranceExam
        },
        howToCrack: {
          step1_understandRole: {
            title: `What does a ${evaluation.targetJob.title} do?`,
            overview: evaluation.targetJob.overview,
            responsibilities: evaluation.targetJob.responsibilities || []
          },
          step2_learnRequiredSkills: evaluation.skillsBreakdown.skillsYouNeed,
          step3_buildProjects: evaluation.projects,
          step4_buildResume: {
            targetRole: evaluation.targetJob.title,
            keywords: [...evaluation.skillsBreakdown.requiredSkills, ...evaluation.skillsBreakdown.skillsYouNeed],
            bulletFormulas: [
              'Action Verb + Task Executed + Tool Utilized + Quantified Result'
            ]
          },
          step5_prepareForInterview: evaluation.interviewPreparation,
          step6_apply: evaluation.howToApply,
          step7_interviewPractice: evaluation.interviewPreparation
        },
        roadmap: evaluation.roadmap,
        disclaimer: evaluation.disclaimer
      }
    });
  } catch (error) {
    next(error);
  }
};
