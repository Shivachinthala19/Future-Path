import { KnowledgeGraphService } from '../services/knowledgeGraphService.js';
import { AIService } from '../services/aiService.js';
import { RecommendationEngine } from '../services/recommendationEngine.js';
import { CareerTwin } from '../models/CareerTwin.js';
import { Roadmap } from '../models/Roadmap.js';
import { DailyMission } from '../models/DailyMission.js';
import { JobRole } from '../models/JobRole.js';
import { Career } from '../models/Career.js';
import { EligibilityService } from '../services/eligibilityService.js';

/**
 * Signature Feature: AI Future Path Analysis
 * Endpoint: POST /api/career/analyze (or POST /api/education/analyze)
 */
export const analyzeFuturePath = async (req, res, next) => {
  try {
    const { study, status = 'completed', country = 'India', targetGoal, interests } = req.body;

    if (!study || typeof study !== 'string' || study.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid study or education title (e.g. B.Com, B.Tech CSE, ITI Electrician, MBBS).',
      });
    }

    // 1. Identify education in verified MongoDB database
    const education = await KnowledgeGraphService.identifyEducation(study);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: `We couldn't identify that study exactly in our verified registry.`,
        suggestions: [
          'B.Com (Bachelor of Commerce)',
          'B.Tech CSE (Computer Science)',
          'ITI Electrician',
          'MBBS',
          '12th Science',
          '12th Commerce',
          'Diploma Mechanical Engineering',
          'MBA Finance',
          'BA Psychology',
          'LLB',
          'B.Ed',
          'PhD Physics'
        ]
      });
    }

    // 2. Retrieve connected knowledge graph (never hardcoded in React)
    const knowledgeContext = await KnowledgeGraphService.getConnectedKnowledgeGraph(education._id);

    // 3. AI Service analyzes and personalizes pathway (strictly grounded in knowledge graph)
    const aiAnalysis = await AIService.generateFuturePath({
      education,
      knowledgeContext,
      userGoal: targetGoal,
      status,
      country
    });

    // 4. If user is authenticated, update CareerTwin
    if (req.user) {
      try {
        await CareerTwin.findOneAndUpdate(
          { user: req.user._id },
          {
            $set: {
              'education.degreeName': education.name,
              'education.level': education.level,
              'education.stream': education.stream,
              'education.status': status
            },
            $push: {
              recentActivity: {
                action: 'AI Future Path Generated',
                detail: `Mapped ${aiAnalysis.counts.jobRoles} jobs and ${aiAnalysis.counts.studyPathways} study pathways for ${education.name}`
              }
            }
          },
          { upsert: true }
        );
      } catch (twinErr) {
        console.warn('[CareerController] Non-blocking career twin update error:', twinErr.message);
      }
    }

    // 5. Return complete structured response with dynamic counts
    res.json({
      success: true,
      data: {
        currentEducation: aiAnalysis.currentEducation,
        counts: aiAnalysis.counts,
        summary: aiAnalysis.summary,
        studyOptions: aiAnalysis.studyOptions,
        careerFields: aiAnalysis.careerFields,
        jobOptions: aiAnalysis.jobOptions,
        skills: aiAnalysis.skills,
        certifications: aiAnalysis.certifications,
        eligibility: aiAnalysis.eligibility,
        careerPaths: aiAnalysis.careerPaths,
        skillGaps: aiAnalysis.skillGaps,
        nextActions: aiAnalysis.nextActions,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Single Future Path Endpoint
 * Endpoint: GET /api/future-path?education=...
 */
export const getFuturePath = async (req, res, next) => {
  try {
    const studyQuery = req.query.education || req.user?.educationName || req.user?.currentEducation?.name || 'B.Com';
    const targetJobQuery = req.query.targetJob || req.query.job || req.user?.targetJob?.targetJobName;

    const education = await KnowledgeGraphService.identifyEducation(studyQuery);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: `Education '${studyQuery}' not found in registry.`
      });
    }

    const eduId = education._id ? (education._id.toString().match(/^[0-9a-fA-F]{24}$/) ? education._id : null) : null;
    const knowledgeContext = eduId ? await KnowledgeGraphService.getConnectedKnowledgeGraph(eduId) : null;

    let aiAnalysis = null;
    try {
      aiAnalysis = await AIService.generateFuturePath({
        education,
        knowledgeContext,
        status: req.query.status || 'completed',
        country: 'India'
      });
    } catch (e) {
      // Safe fallback
    }

    // Evaluate target job if provided
    let targetJobEvaluation = null;
    if (targetJobQuery && targetJobQuery.trim().length > 0) {
      try {
        const evalResult = await EligibilityService.evaluateEligibility({
          educationQuery: education.name,
          jobQuery: targetJobQuery.trim()
        });
        targetJobEvaluation = {
          targetJob: evalResult.targetJob,
          skillsBreakdown: evalResult.skillsBreakdown,
          roadmap: evalResult.roadmap,
          projects: evalResult.projects,
          interviewPreparation: evalResult.interviewPreparation,
          howToApply: evalResult.howToApply,
          pathType: evalResult.targetJob.pathType,
          isCareerSwitch: evalResult.targetJob.isCareerSwitch
        };
      } catch (err) {
        console.warn('[getFuturePath] Target job evaluation error:', err.message);
      }
    }

    res.json({
      success: true,
      data: {
        // Section 37 Standardized Future Path Shape
        currentEducation: {
          id: education._id,
          name: education.name,
          level: education.level,
          qualification: education.qualification || education.level,
          stream: education.stream,
          status: req.query.status || 'completed'
        },
        target: targetJobEvaluation?.targetJob || (targetJobQuery ? { title: targetJobQuery } : null),
        eligibility: targetJobEvaluation?.targetJob ? {
          status: targetJobEvaluation.targetJob.eligibilityStatus || 'POTENTIALLY_ELIGIBLE',
          relevance: targetJobEvaluation.targetJob.relevance || 'RELATED',
          pathType: targetJobEvaluation.pathType,
          explanation: targetJobEvaluation.targetJob.relevanceExplanation || targetJobEvaluation.targetJob.educationRelevance,
          disclaimer: "Your current profile matches listed requirements based on available data. Actual hiring/admission depends on official recruitment process."
        } : null,
        studyOptions: aiAnalysis?.studyOptions || [],
        careerOptions: aiAnalysis?.careerFields || [],
        jobOptions: aiAnalysis?.jobOptions || [],
        skillGap: targetJobEvaluation?.skillsBreakdown?.skillsYouNeed || [],
        studyPath: targetJobEvaluation?.targetJob?.studyPath || [],
        roadmap: targetJobEvaluation?.roadmap?.steps || targetJobEvaluation?.roadmap || [],
        higherStudies: targetJobEvaluation?.targetJob?.higherStudies || aiAnalysis?.higherStudies || [],
        careerGrowth: targetJobEvaluation?.targetJob?.careerGrowth || [],

        // Backwards-compatible fields for existing components
        education: {
          id: education._id,
          name: education.name,
          level: education.level,
          qualification: education.qualification || education.level,
          stream: education.stream,
        },
        hasTargetJob: Boolean(targetJobEvaluation),
        targetJobEvaluation,
        studyNext: aiAnalysis?.studyOptions || [],
        careers: aiAnalysis?.careerFields || [],
        jobs: aiAnalysis?.jobOptions || [],
        skills: aiAnalysis?.skills || [],
        careerPaths: aiAnalysis?.careerPaths || [],
        counts: aiAnalysis?.counts || {},
        summary: aiAnalysis?.summary || ''
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Skill Gap Analysis
 * Endpoint: POST /api/skill-gap
 */
export const getSkillGap = async (req, res, next) => {
  try {
    const { targetRoleOrCareer, currentSkills, education } = req.body;
    const result = await RecommendationEngine.computeSkillGap({
      targetRoleOrCareer,
      currentSkills: currentSkills || [],
      education
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generate Personalized Roadmap
 * Endpoint: POST /api/roadmap/generate
 */
export const generateRoadmap = async (req, res, next) => {
  try {
    const { startingEducation, targetCareer, targetJobRole, durationMonths } = req.body;
    const userId = req.user ? req.user._id : null;

    const roadmap = await RecommendationEngine.generateRoadmap({
      userId,
      startingEducation,
      targetCareer,
      targetJobRole,
      durationMonths: durationMonths || 6,
    });

    if (userId) {
      await CareerTwin.updateOne(
        { user: userId },
        {
          $set: {
            currentGpsProgress: roadmap.overallProgressPercentage,
          },
          $push: {
            recentActivity: { action: 'Roadmap Generated', detail: `Created ${durationMonths}-month plan for ${targetCareer}` }
          }
        }
      );
    }

    res.json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Roadmap for current user or default
 * Endpoint: GET /api/roadmap
 */
export const getRoadmap = async (req, res, next) => {
  try {
    let roadmap = null;
    if (req.user) {
      roadmap = await Roadmap.findOne({ user: req.user._id }).sort({ updatedAt: -1 });
    }

    if (!roadmap) {
      // Default demo roadmap
      roadmap = await RecommendationEngine.generateRoadmap({
        userId: null,
        startingEducation: 'B.Com',
        targetCareer: 'Corporate Financial Analyst',
        targetJobRole: 'Junior Financial Analyst',
        durationMonths: 6,
      });
    }

    res.json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle roadmap task completion
 * Endpoint: PUT /api/roadmap/tasks/:taskId
 */
export const updateRoadmapTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { completed } = req.body;

    const roadmap = await Roadmap.findOne({ 'tasks._id': taskId });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap task not found.' });
    }

    const task = roadmap.tasks.id(taskId);
    if (task) {
      task.completed = completed;
      task.completedAt = completed ? new Date() : null;
    }

    const completedCount = roadmap.tasks.filter(t => t.completed).length;
    roadmap.overallProgressPercentage = Math.round((completedCount / (roadmap.tasks.length || 1)) * 100);
    await roadmap.save();

    if (req.user) {
      await CareerTwin.updateOne(
        { user: req.user._id },
        {
          $set: { currentGpsProgress: roadmap.overallProgressPercentage },
          $inc: { completedRoadmapTasksCount: completed ? 1 : -1 }
        }
      );
    }

    res.json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Daily Missions
 * Endpoint: GET /api/daily-mission
 */
export const getDailyMissions = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    const missions = await RecommendationEngine.getDailyMissions(userId);

    res.json({
      success: true,
      data: missions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark Daily Mission Completed
 * Endpoint: POST /api/daily-mission/:id/complete
 */
export const completeDailyMission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mission = await DailyMission.findById(id);

    if (mission) {
      mission.completed = true;
      mission.completedAt = new Date();
      await mission.save();

      if (req.user) {
        await CareerTwin.updateOne(
          { user: req.user._id },
          {
            $inc: { twinScore: 5 },
            $push: { recentActivity: { action: 'Completed Daily Mission', detail: mission.title } }
          }
        );
      }
    }

    res.json({
      success: true,
      message: 'Mission completed!',
      data: mission,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Recalculate Career Future Path with what-if scenario
 * Endpoint: POST /api/career/recalculate
 */
export const recalculateFuturePath = async (req, res, next) => {
  try {
    const { study, addedSkills = [], targetShift } = req.body;
    const education = await KnowledgeGraphService.identifyEducation(study);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }

    const knowledgeContext = await KnowledgeGraphService.getConnectedKnowledgeGraph(education._id);
    const analysis = await AIService.generateFuturePath({
      education,
      knowledgeContext,
      userGoal: targetShift,
      status: 'completed'
    });

    res.json({
      success: true,
      scenario: {
        study,
        addedSkills,
        targetShift
      },
      data: analysis
    });
  } catch (error) {
    next(error);
  }
};


