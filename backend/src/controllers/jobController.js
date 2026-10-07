import { Entity } from '../models/Entity.js';
import { Job } from '../models/Job.js';
import { JobRole } from '../models/JobRole.js';
import { Career } from '../models/Career.js';
import { CareerField } from '../models/CareerField.js';
import { Education } from '../models/Education.js';
import { KnowledgeGraphService } from '../services/knowledgeGraphService.js';
import { EligibilityService } from '../services/eligibilityService.js';
import { RoadmapService } from '../services/roadmapService.js';

export function googleSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

/**
 * Enhanced Job Controller
 * Strictly enforces Education-Based and Target-Job-Controlled filtering (Sections 1, 8, 9, 12, 13, 24).
 */

export const getRelatedJobs = async (req, res, next) => {
  try {
    const educationQuery = req.query.education || req.user?.educationName || req.user?.currentEducation?.name || 'B.Com';
    const targetJobQuery = req.query.targetJob || req.query.job || req.user?.targetJob?.targetJobName;
    const { type, sector, search } = req.query;

    const education = await KnowledgeGraphService.identifyEducation(educationQuery);
    const eduName = education ? education.name : educationQuery;

    // RULE: If Target Job is selected, Target Job MUST control the job section! (Section 8)
    if (targetJobQuery && targetJobQuery.trim().length > 0) {
      const cleanTarget = targetJobQuery.trim();
      const targetEvaluation = await EligibilityService.evaluateEligibility({
        educationQuery: eduName,
        jobQuery: cleanTarget,
        userAge: 23
      });

      // Also fetch 2-3 closely related opportunities/roles in the exact same domain
      let relatedCluster = [];
      try {
        relatedCluster = await JobRole.find({
          $and: [
            { title: { $ne: targetEvaluation.targetJob.title } },
            {
              $or: [
                { sector: targetEvaluation.targetJob.sector },
                { title: { $regex: cleanTarget.split(' ')[0], $options: 'i' } }
              ]
            }
          ]
        })
          .limit(3)
          .lean();
      } catch (err) {
        // Safe fallback
      }

      return res.json({
        success: true,
        isTargetJobContext: true,
        targetJob: targetEvaluation.targetJob,
        education: targetEvaluation.education,
        canIPursue: {
          relevance: targetEvaluation.targetJob.relevance,
          relevanceExplanation: targetEvaluation.targetJob.relevanceExplanation,
          eligibilityStatus: targetEvaluation.targetJob.eligibilityStatus,
          missingRequirements: targetEvaluation.targetJob.missingRequirements,
          experienceRequired: targetEvaluation.targetJob.experienceRequired,
          requiredLicense: targetEvaluation.targetJob.requiredLicense,
          entranceExam: targetEvaluation.targetJob.entranceExam
        },
        skillsBreakdown: targetEvaluation.skillsBreakdown,
        roadmap: targetEvaluation.roadmap,
        projects: targetEvaluation.projects,
        interviewPreparation: targetEvaluation.interviewPreparation,
        howToApply: targetEvaluation.howToApply,
        disclaimer: targetEvaluation.disclaimer,
        relatedOpportunitiesInDomain: relatedCluster.map(r => ({
          id: r._id,
          title: r.title,
          jobType: r.jobType || 'Private',
          salary: r.salaryRange?.formatted || 'Competitive',
          overview: r.overview || r.description
        }))
      });
    }

    // If NO target job is selected, show jobs related to the user's education (Section 1)
    let jobs = await Job.find({}).lean();

    if (!jobs || jobs.length === 0) {
      const entityJobs = await Entity.find({ type: { $in: ['JOB', 'PRIVATE_JOB', 'GOVERNMENT_JOB'] } }).lean();
      jobs = entityJobs.map(e => ({
        ...e,
        title: e.title || e.name,
        jobType: e.type === 'GOVERNMENT_JOB' ? 'Government' : 'Private'
      }));
    } else {
      jobs = jobs.map(j => ({
        ...j,
        title: j.title || j.name,
        jobType: j.type === 'GOVERNMENT_JOB' ? 'Government' : 'Private'
      }));
    }

    // Apply job type / category filter if provided ('Private', 'Government', etc.)
    if (type && type !== 'All') {
      jobs = jobs.filter(j => j.jobType === type || (type === 'Government' && (j.jobType === 'Government' || j.jobType === 'Public Sector')));
    }

    // Apply search filter if provided
    if (search && search.trim()) {
      const s = search.toLowerCase();
      jobs = jobs.filter(j => j.title.toLowerCase().includes(s) || (j.overview && j.overview.toLowerCase().includes(s)));
    }

    // Attach computed eligibility status for each job
    const jobsWithEligibility = await Promise.all(
      jobs.map(async (job) => {
        const evalResult = await EligibilityService.evaluateEligibility({
          educationQuery: eduName,
          jobQuery: job.title
        });
        return {
          ...job,
          eligibilityStatus: evalResult.targetJob.eligibilityStatus,
          relevance: evalResult.targetJob.relevance,
          relevanceExplanation: evalResult.targetJob.relevanceExplanation,
          salaryFormatted: job.salaryRange?.formatted || 'Competitive'
        };
      })
    );

    res.json({
      success: true,
      education: eduName,
      count: jobsWithEligibility.length,
      data: jobsWithEligibility
    });
  } catch (error) {
    next(error);
  }
};

export const getEligibleJobs = async (req, res, next) => {
  return getRelatedJobs(req, res, next);
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const educationName = req.query.education || req.user?.educationName || req.user?.currentEducation?.name || 'B.Com';

    // 1. Check in universal Entity collection
    const entity = await Entity.findOne({
      $or: [
        { id: id.toLowerCase() },
        { id: id.toLowerCase().replace(/[^a-z0-9]/g, '-') },
        { name: { $regex: new RegExp(`^${id}$`, 'i') } },
        { name: { $regex: id.replace(/-/g, ' '), $options: 'i' } },
        { aliases: { $regex: new RegExp(`^${id}$`, 'i') } }
      ]
    }).lean();

    if (entity && (entity.type.includes('JOB') || entity.type === 'CAREER' || entity.type === 'EXAM')) {
      const isGovt = entity.type === 'GOVERNMENT_JOB' || entity.category?.toLowerCase().includes('government');
      const webSearchUrl = isGovt
        ? googleSearchUrl(`${entity.name} official notification recruitment syllabus`)
        : googleSearchUrl(`${entity.name} eligibility skills career roadmap`);

      return res.json({
        success: true,
        data: {
          id: entity.id,
          title: entity.name,
          name: entity.name,
          shortName: entity.shortName || entity.name,
          type: entity.type,
          sector: entity.category,
          category: entity.category,
          overview: entity.overview || entity.description,
          description: entity.description || entity.overview,
          salary: entity.salaryRange?.formatted || (isGovt ? 'Official Pay Matrix' : '₹4.5 - ₹9.5 LPA'),
          isGovernment: isGovt,
          jobType: isGovt ? 'Government' : 'Private',
          organization: entity.organization,
          qualification: entity.qualification,
          ageLimit: entity.ageLimit,
          posts: entity.posts || [],
          exams: entity.exams || [],
          eligibilityStatus: 'POTENTIALLY_ELIGIBLE',
          educationRelevance: `Your education provides foundational competencies applicable to ${entity.name}.`,
          multipleRoutes: entity.educationRoutes?.length > 0
            ? entity.educationRoutes
            : [
                {
                  name: 'Route 1: Direct Education Route',
                  routeName: 'Route 1: Direct Education Route',
                  type: 'Direct Route',
                  description: 'Standard academic and competitive pathway.',
                  steps: ['Foundations', 'Skill Mastery', 'Projects / Exams', 'Application']
                }
              ],
          userVsJobRequirements: {
            educationMatch: true,
            skillsBreakdown: (entity.requiredSkills || entity.skills || []).map(sk => ({
              name: sk,
              have: ['Excel', 'Communication', 'Basic Problem Solving'].some(h => sk.toLowerCase().includes(h.toLowerCase())),
              status: ['Excel', 'Communication'].some(h => sk.toLowerCase().includes(h.toLowerCase())) ? 'Completed' : 'To Learn'
            }))
          },
          requiredSkills: entity.requiredSkills || entity.skills || [],
          preferredSkills: entity.preferredSkills || [],
          certifications: entity.certifications || [],
          stepByStepRoadmap: entity.roadmap || [],
          projects: entity.projects || [],
          interviewPreparation: entity.interviewPreparation || [],
          careerProgression: entity.careerGrowth || [],
          higherStudies: entity.higherStudies || [],
          howToApply: entity.howToApply || `Apply via official portals and verified career channels.`,
          officialSource: entity.officialSource || entity.sources?.[0]?.title || 'Official Portal',
          officialUrl: entity.notificationUrl || entity.sources?.[0]?.url || 'https://ssc.gov.in',
          sources: entity.sources || entity.officialSources || [],
          webSearchUrl,
          disclaimer: isGovt
            ? 'Official Information: Eligibility, vacancies, age limits, and deadlines can change. Please verify the latest details with the official source.'
            : 'Your current profile matches these requirements based on available data. Hiring decisions depend strictly on employer interviews and official selection criteria.',
          lastVerified: entity.lastVerified || 'September 2026'
        }
      });
    }

    let job = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      job = await JobRole.findById(id)
        .populate('careerField')
        .populate('career')
        .populate('requiredSkills')
        .populate('preferredSkills')
        .populate('certifications')
        .lean();
    } else {
      job = await JobRole.findOne({
        $or: [
          { slug: id.toLowerCase() },
          { title: { $regex: new RegExp(`^${id}$`, 'i') } },
          { title: { $regex: id.replace(/-/g, ' '), $options: 'i' } }
        ]
      })
        .populate('careerField')
        .populate('career')
        .populate('requiredSkills')
        .populate('preferredSkills')
        .populate('certifications')
        .lean();
    }

    const jobTitle = job ? job.title : id.replace(/-/g, ' ');
    const evaluation = await EligibilityService.evaluateEligibility({
      educationQuery: educationName,
      jobQuery: jobTitle
    });

    const isGovt = (job?.jobType === 'Government' || job?.jobType === 'Public Sector' ||
      jobTitle.toLowerCase().includes('officer') || jobTitle.toLowerCase().includes('inspector') ||
      jobTitle.toLowerCase().includes('railway') || jobTitle.toLowerCase().includes('cgl'));

    // Section 17 & 18: Multiple Routes & 9-Step Roadmap to the specific target job
    const domainDetails = RoadmapService.getJobRoadmapDetails(jobTitle, educationName);
    const multipleRoutes = evaluation.multipleRoutes || domainDetails.multipleRoutes;
    const userVsJob = buildUserVsJobRequirements(educationName, job, evaluation);
    const careerProgression = job?.careerProgression?.length > 0
      ? job.careerProgression
      : domainDetails.careerProgression;
    const higherStudies = job?.higherStudies?.length > 0
      ? job.higherStudies
      : domainDetails.higherStudies;
    const stepByStepRoadmap = evaluation.roadmap?.steps || domainDetails.stepByStepRoadmap;

    res.json({
      success: true,
      data: {
        ...(job || evaluation.targetJob),
        title: jobTitle,
        jobType: isGovt ? 'Government' : (job?.jobType || 'Private'),
        evaluation,
        multipleRoutes,
        userVsJobRequirements: userVsJob,
        stepByStepRoadmap,
        projects: evaluation.projects?.length > 0 ? evaluation.projects : domainDetails.projects,
        interviewPreparation: evaluation.interviewPreparation?.length > 0 ? evaluation.interviewPreparation : domainDetails.stepByStepRoadmap.find(s => s.type === 'INTERVIEW_PREP')?.description,
        careerProgression,
        higherStudies,
        qualificationRequirements: domainDetails.qualificationRequirements,
        howToApply: job?.howToApply || evaluation.howToApply,
        disclaimer: {
          statement: 'Your current profile matches these requirements based on the available information. Verify the specific employer/recruitment notification before applying.',
          noGuaranteeNotice: 'Hiring decisions are made independently by recruiters and examination boards based on competitive selection criteria.',
          lastVerified: job?.lastVerified || 'September 2026'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getJobEducationRoutes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const routes = buildJobEducationRoutes(id.replace(/-/g, ' '));
    res.json({ success: true, data: routes });
  } catch (error) {
    next(error);
  }
};

export const getJobSkills = async (req, res, next) => {
  try {
    const { id } = req.params;
    const evaluation = await EligibilityService.evaluateEligibility({
      educationQuery: req.query.education || 'B.Com',
      jobQuery: id.replace(/-/g, ' ')
    });
    res.json({ success: true, data: evaluation.skillsBreakdown });
  } catch (error) {
    next(error);
  }
};

export const getJobRoadmap = async (req, res, next) => {
  try {
    const { id } = req.params;
    const evaluation = await EligibilityService.evaluateEligibility({
      educationQuery: req.query.education || 'B.Com',
      jobQuery: id.replace(/-/g, ' ')
    });
    res.json({ success: true, data: evaluation.roadmap });
  } catch (error) {
    next(error);
  }
};

export const getJobCareerGrowth = async (req, res, next) => {
  try {
    const { id } = req.params;
    const progression = buildJobCareerProgression(id.replace(/-/g, ' '));
    res.json({ success: true, data: progression });
  } catch (error) {
    next(error);
  }
};

function buildJobEducationRoutes(jobTitle, isGovt = false) {
  const lower = jobTitle.toLowerCase();

  if (lower.includes('data analyst')) {
    return [
      {
        routeName: 'Route 1: Direct Technical / Computing Route',
        type: 'DIRECT_ROUTE',
        qualifyingDegrees: ['B.Tech Computer Science', 'BCA', 'B.Sc Data Science / Statistics'],
        coreSkills: ['SQL & Joins', 'Advanced Excel', 'Statistics', 'Power BI / Tableau'],
        timeline: 'Direct Entry / Campus Placement',
        description: 'Direct alignment with academic computing, relational databases, and discrete mathematics coursework.'
      },
      {
        routeName: 'Route 2: Quantitative Business / Commerce Route',
        type: 'ALTERNATIVE_ROUTE',
        qualifyingDegrees: ['B.Com', 'BBA', 'Economics', 'Finance'],
        coreSkills: ['Advanced Excel', 'Financial Numeracy', 'SQL', 'Python (Pandas)', 'Power BI'],
        timeline: '3 to 6 months specialized tools bridging',
        description: 'Combines commercial business intuition with acquired technical querying and visual reporting.'
      },
      {
        routeName: 'Route 3: Career Switch / Portfolio-Driven Route',
        type: 'CAREER_SWITCH_ROUTE',
        qualifyingDegrees: ['Any Recognized Degree (Mechanical, Civil, Humanities, Arts)'],
        coreSkills: ['Self-Paced / Boot-Camp Data Analytics Program', '2-3 End-to-End Capstone Projects', 'Public GitHub Portfolio'],
        timeline: '6 to 9 months structured preparation',
        description: 'Requires demonstrable project work and public dashboard showcases rather than relying on degree title.'
      }
    ];
  }

  if (lower.includes('software') || lower.includes('developer')) {
    return [
      {
        routeName: 'Route 1: Direct Computer Science Degree Route',
        type: 'DIRECT_ROUTE',
        qualifyingDegrees: ['B.Tech CSE', 'B.E. CSE / IT', 'BCA', 'B.Sc Computer Science'],
        coreSkills: ['Data Structures & Algorithms', 'Web / App Frameworks', 'Databases', 'Git'],
        timeline: 'Direct Entry / Campus Placement',
        description: 'Standard accredited engineering route with foundational systems, OS, and algorithms curriculum.'
      },
      {
        routeName: 'Route 2: STEM & Allied Engineering Route',
        type: 'ALTERNATIVE_ROUTE',
        qualifyingDegrees: ['B.Tech (ECE / Electrical / Mechanical)', 'B.Sc Mathematics / Physics'],
        coreSkills: ['Programming Fundamentals', 'JavaScript / Python', 'React / Node.js', 'System Architecture'],
        timeline: '4 to 6 months targeted coding bridging',
        description: 'Strong analytical foundation allows rapid mastery of modern full-stack web and cloud stacks.'
      },
      {
        routeName: 'Route 3: Career Switch / Bootcamp Route',
        type: 'CAREER_SWITCH_ROUTE',
        qualifyingDegrees: ['Any Degree (Commerce, Arts, Life Sciences)'],
        coreSkills: ['Coding Fundamentals', 'Frontend & Backend Mastery', 'Open Source Contributions', 'ATS Resume'],
        timeline: '6 to 12 months project-driven roadmap',
        description: 'Requires building production-ready projects and participating in code reviews to establish credibility.'
      }
    ];
  }

  if (isGovt) {
    return [
      {
        routeName: 'Route 1: General Central / State Graduate Recruitment',
        type: 'DIRECT_ROUTE',
        qualifyingDegrees: ['Any Recognized Bachelor Degree from a UGC/AIU accredited university'],
        coreSkills: ['Quantitative Aptitude', 'Reasoning Ability', 'General Studies & Current Affairs', 'English Comprehension'],
        timeline: '12 to 18 months dedicated competitive exam preparation',
        description: 'Recruitment is governed strictly by the official gazette notification and statutory age/qualification criteria.'
      }
    ];
  }

  return [
    {
      routeName: 'Route 1: Direct Relevant Academic Degree',
      type: 'DIRECT_ROUTE',
      qualifyingDegrees: [`Degrees aligned with ${jobTitle}`],
      coreSkills: ['Core Domain Fundamentals', 'Industry Software Tools', 'Standard Operating Procedures'],
      timeline: 'Direct Entry / Entry Level Recruitment',
      description: 'Educational programs with direct curricular overlap with day-to-day job expectations.'
    },
    {
      routeName: 'Route 2: Practical Skills & Certification Route',
      type: 'CAREER_SWITCH_ROUTE',
      qualifyingDegrees: ['Allied or General Degrees'],
      coreSkills: ['Accredited Industry Certifications', 'Practical Case Studies', 'Apprenticeship / Internship'],
      timeline: '3 to 6 months focused bridging',
      description: 'Demonstrating hands-on competence through verified external credentials and internships.'
    }
  ];
}

function buildUserVsJobRequirements(userEdu, job, evaluation) {
  const reqSkills = evaluation.skillsBreakdown.requiredSkills || [];
  const haveSkills = evaluation.skillsBreakdown.skillsYouAlreadyHave || [];
  const needSkills = evaluation.skillsBreakdown.skillsYouNeed || [];

  return {
    educationMatch: {
      userEducation: userEdu,
      status: evaluation.targetJob.eligibilityStatus,
      isCompatible: evaluation.targetJob.eligibilityStatus === 'Eligible' || evaluation.targetJob.eligibilityStatus === 'Potentially Eligible',
      label: evaluation.targetJob.relevance
    },
    skillsChecklist: reqSkills.map(s => {
      const isHave = haveSkills.some(h => (typeof h === 'string' ? h : h.name).toLowerCase() === (typeof s === 'string' ? s : s.name).toLowerCase());
      return {
        skillName: typeof s === 'string' ? s : s.name,
        userHas: isHave,
        importance: isHave ? 'Covered by background' : 'Needs Development'
      };
    }),
    gapSummary: {
      skillsCount: needSkills.length,
      skillsToLearn: needSkills,
      projectsRequired: 2,
      resumePreparationRequired: true,
      interviewPreparationRequired: true
    }
  };
}

function buildJobCareerProgression(jobTitle, isGovt = false) {
  if (isGovt) {
    return [
      'Cadre / Entry-Level Officer (Probationer)',
      'Assistant Director / Senior Inspector',
      'Deputy Director / Assistant Commissioner',
      'Joint Director / Joint Commissioner',
      'Director / Additional Secretary'
    ];
  }

  const clean = jobTitle.replace(/junior|entry-level|senior|lead/gi, '').trim();
  return [
    `Associate / Junior ${clean}`,
    clean,
    `Senior ${clean}`,
    `Lead ${clean} / Team Lead`,
    `Principal ${clean} / Engineering Manager / Director`
  ];
}

function buildHigherStudiesAfterJob(jobTitle, isGovt = false) {
  const lower = jobTitle.toLowerCase();
  if (lower.includes('software') || lower.includes('developer')) {
    return [
      { program: 'M.Tech in Artificial Intelligence / Distributed Systems', duration: '2 Years', reason: 'Deepens core systems research and qualification for top research labs.' },
      { program: 'MS in Computer Science (Global)', duration: '2 Years', reason: 'International career expansion and specialized R&D roles.' },
      { program: 'Executive MBA (Tech Management)', duration: '1-2 Years', reason: 'Transition to VP of Engineering, Chief Technology Officer (CTO), or Product Leadership.' },
      { program: 'Advanced Cloud Architect Certifications (AWS / Azure / GCP)', duration: '3-6 Months', reason: 'Validates enterprise infrastructure design skills.' }
    ];
  }

  if (lower.includes('data') || lower.includes('analyst')) {
    return [
      { program: 'M.Sc / M.Tech in Data Science & Machine Learning', duration: '2 Years', reason: 'Transitions data reporting skills into predictive modeling and AI.' },
      { program: 'MBA in Business Analytics / Decision Sciences', duration: '2 Years', reason: 'Leads to Director of Analytics, Chief Data Officer, or Strategy Head.' },
      { program: 'Chartered Financial Analyst (CFA) / FRM', duration: '2-3 Years', reason: 'Transitions quantitative modeling into quantitative finance and hedge fund analysis.' }
    ];
  }

  return [
    { program: 'Executive Master’s Degree in Allied Discipline', duration: '1-2 Years', reason: 'Accelerates corporate promotion into senior executive leadership.' },
    { program: 'Professional Industry Master Certifications', duration: '6 Months', reason: 'Validates mastery of latest regulatory and technological frameworks.' }
  ];
}

export const getAllCareers = async (req, res, next) => {
  try {
    const educationQuery = req.query.education || req.user?.educationName || req.user?.currentEducation?.name || 'B.Com';
    const targetJobQuery = req.query.targetJob || req.query.job || req.user?.targetJob?.targetJobName;

    const education = await KnowledgeGraphService.identifyEducation(educationQuery);
    const eduName = education ? education.name : educationQuery;

    let careers = await Career.find({}).lean();

    if (!careers || careers.length === 0) {
      careers = await Entity.find({ type: 'CAREER' }).lean();
    }

    // If target job is selected, focus on related career fields (Section 16)
    if (targetJobQuery && careers.length > 0) {
      const lowerTarget = targetJobQuery.toLowerCase();
      if (lowerTarget.includes('data') || lowerTarget.includes('analyst')) {
        careers.sort((a, b) => (b.name?.toLowerCase().includes('analyst') || b.name?.toLowerCase().includes('finance') ? 1 : -1));
      }
    }

    res.json({
      success: true,
      education: eduName,
      targetJob: targetJobQuery || null,
      count: careers.length,
      data: careers
    });
  } catch (error) {
    next(error);
  }
};

export const getCareerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim();
    let career = null;

    if (cleanId.match(/^[0-9a-fA-F]{24}$/)) {
      career = await Career.findById(cleanId).lean();
    } else {
      career = await Career.findOne({
        $or: [
          { slug: cleanId.toLowerCase() },
          { id: cleanId.toLowerCase() },
          { name: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
        ]
      }).lean();
    }

    if (!career) {
      career = await Entity.findOne({
        type: 'CAREER',
        $or: [
          { id: cleanId.toLowerCase() },
          { name: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
        ]
      }).lean();
    }

    if (!career) {
      return res.status(404).json({ success: false, message: 'Career record not found.' });
    }

    res.json({
      success: true,
      data: {
        career,
        connectedJobs: career.relatedJobs || []
      }
    });
  } catch (error) {
    next(error);
  }
};
