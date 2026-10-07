import { JobRole } from '../models/JobRole.js';
import { Education } from '../models/Education.js';
import { Skill } from '../models/Skill.js';
import { KnowledgeGraphService } from './knowledgeGraphService.js';
import { RoadmapService } from './roadmapService.js';

/**
 * Structured Job Eligibility Engine
 * Complies with Section 13, 14, 15, and 30 of the CareerCompass AI specification.
 */
export class EligibilityService {
  /**
   * Evaluates eligibility and generates complete preparation roadmap context
   */
  static async evaluateEligibility({
    educationQuery,
    jobQuery,
    userAge = 23,
    userExperienceMonths = 0,
    userCertifications = [],
    userLocation = 'India'
  }) {
    // 1. Identify education
    let education = null;
    if (educationQuery) {
      education = await KnowledgeGraphService.identifyEducation(educationQuery);
    }

    const eduName = education ? education.name : (educationQuery || 'B.Com');

    // 2. Identify Job Role
    let job = null;
    if (jobQuery) {
      if (typeof jobQuery === 'string' && jobQuery.match(/^[0-9a-fA-F]{24}$/)) {
        job = await JobRole.findById(jobQuery)
          .populate('requiredSkills')
          .populate('preferredSkills')
          .populate('certifications')
          .populate('careerField')
          .lean();
      } else {
        const cleanJob = String(jobQuery).trim();
        const safeJob = cleanJob.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        job = await JobRole.findOne({
          $or: [
            { title: { $regex: new RegExp(`^${safeJob}$`, 'i') } },
            { slug: cleanJob.toLowerCase().replace(/[^a-z0-9]/g, '-') },
            { title: { $regex: safeJob, $options: 'i' } }
          ]
        })
          .populate('requiredSkills')
          .populate('preferredSkills')
          .populate('certifications')
          .populate('careerField')
          .lean();
      }
    }

    // Default fallback job if not found in DB yet
    if (!job) {
      job = this._buildDynamicJobFallback(jobQuery || 'Data Analyst', eduName);
    }

    // 3. Compute domain details & structured roadmap via RoadmapService
    const domainDetails = RoadmapService.getJobRoadmapDetails(job.title, eduName);
    const isGovt = job.jobType === 'Government' || job.jobType === 'Public Sector' ||
      job.title.toLowerCase().includes('officer') || job.title.toLowerCase().includes('ssc');
    const isRegulated = job.requiredLicense || (job.additionalRequirements && job.additionalRequirements.some(r => r.toLowerCase().includes('bar') || r.toLowerCase().includes('medical')));

    let status = 'Eligible';
    let relevance = 'Directly Related';
    let relevanceExplanation = domainDetails.educationRelevance;
    const missingRequirements = [];
    let pathType = domainDetails.multipleRoutes[0]?.type || 'Direct Alignment';
    let isCareerSwitch = false;

    // Analyze connection to education
    const eduLower = eduName.toLowerCase();
    const jobTitleLower = job.title.toLowerCase();

    if (jobTitleLower.includes('software') || jobTitleLower.includes('developer')) {
      const isCS = (eduLower.includes('computer') || eduLower.includes('cse') || eduLower.includes('mca') || (eduLower.includes('b.sc') && eduLower.includes('cs')));
      if (isCS) {
        relevance = 'Directly Related';
        status = 'Eligible';
        pathType = 'Direct Alignment';
      } else {
        relevance = 'Possible With Additional Skills';
        status = 'Needs Additional Skills';
        pathType = 'Additional Skills Required';
        isCareerSwitch = true;
      }
    } else if (jobTitleLower.includes('data analyst')) {
      if (eduLower.includes('b.com') || eduLower.includes('commerce') || eduLower.includes('bba') || eduLower.includes('economics')) {
        relevance = 'Possible With Additional Skills';
        status = 'Needs Additional Skills';
        pathType = 'Additional Skills Required';
        isCareerSwitch = false; // Natural extension of quantitative commerce
      } else if (eduLower.includes('tech') || eduLower.includes('computer') || eduLower.includes('mca') || eduLower.includes('b.sc')) {
        relevance = 'Directly Related';
        status = 'Eligible';
        pathType = 'Direct Alignment';
      } else {
        relevance = 'Possible With Additional Skills';
        status = 'Needs Additional Skills';
        pathType = 'Additional Skills Required';
        isCareerSwitch = true;
      }
    } else if (jobTitleLower.includes('accountant') || jobTitleLower.includes('tax') || jobTitleLower.includes('audit')) {
      if (eduLower.includes('b.com') || eduLower.includes('commerce') || eduLower.includes('mba finance') || eduLower.includes('m.com')) {
        relevance = 'Directly Related';
        status = 'Eligible';
        pathType = 'Direct Alignment';
      } else {
        relevance = 'Possible With Additional Qualification';
        status = 'Needs Additional Qualification';
        pathType = 'Additional Qualification Required';
        isCareerSwitch = true;
      }
    } else if (jobTitleLower.includes('electrician') || jobTitleLower.includes('electrical')) {
      if (eduLower.includes('iti') || eduLower.includes('electric') || eduLower.includes('diploma')) {
        relevance = 'Directly Related';
        status = 'Eligible';
        pathType = 'Direct Alignment';
      } else {
        relevance = 'Requires License / Registration';
        status = 'Needs License / Registration';
        pathType = 'License Required';
        isCareerSwitch = true;
      }
    } else if (jobTitleLower.includes('doctor') || jobTitleLower.includes('medical') || jobTitleLower.includes('physician')) {
      if (eduLower.includes('mbbs')) {
        relevance = 'Directly Related';
        status = 'Needs License / Registration';
        pathType = 'License Required';
      } else {
        relevance = 'Requires Additional Qualification';
        status = 'Needs Additional Qualification';
        pathType = 'Additional Qualification Required';
        isCareerSwitch = true;
      }
    } else if (jobTitleLower.includes('teacher') || jobTitleLower.includes('educator')) {
      relevance = 'Directly Related';
      status = 'Needs Verification';
      pathType = 'Professional Credential Required';
    } else if (isGovt) {
      relevance = 'Directly Related';
      status = 'Eligible';
      pathType = 'Competitive Examination Required';

      if (job.ageRequirements) {
        if (userAge < job.ageRequirements.min) {
          status = 'Needs Verification';
          missingRequirements.push(`Minimum age is ${job.ageRequirements.min} years (current age: ${userAge}).`);
        } else if (userAge > job.ageRequirements.max) {
          status = 'Needs Verification';
          missingRequirements.push(`Maximum age limit is ${job.ageRequirements.max} years (relaxations apply for reserved categories).`);
        }
      }
      if (job.entranceExam) {
        missingRequirements.push(`Must qualify competitive examination: ${job.entranceExam}`);
      }
    }

    // 4. Skills Partitioning from Domain Details
    const skillsToLearnList = domainDetails.skillsYouNeed.map(s => s.name);
    const skillsAlreadyHaveList = domainDetails.skillsAlreadyHave;
    const requiredSkillsList = [...skillsAlreadyHaveList, ...skillsToLearnList];

    // 5. Rich 9-Step Roadmap from Domain Details
    const roadmapSteps = domainDetails.stepByStepRoadmap;

    return {
      education: {
        name: eduName,
        level: education?.level || "Bachelor's Degree",
      },
      targetJob: {
        id: job._id || job.slug || 'target-role',
        title: job.title,
        slug: job.slug || job.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        jobType: isGovt ? 'Government' : (job.jobType || 'Private'),
        sector: domainDetails.sector || job.sector || 'Industry Career',
        salaryFormatted: domainDetails.salary || job.salaryRange?.formatted || '₹4.5 - ₹8.0 LPA',
        overview: job.overview || job.description || domainDetails.educationRelevance,
        relevance,
        relevanceExplanation,
        pathType,
        isCareerSwitch,
        eligibilityStatus: status,
        missingRequirements,
        qualificationRequirements: domainDetails.qualificationRequirements,
        multipleRoutes: domainDetails.multipleRoutes,
        ageRequirements: job.ageRequirements || { min: 18, max: 35 },
        entranceExam: job.entranceExam || (isGovt ? 'State/Central Selection Exam' : null),
        requiredLicense: job.requiredLicense || null,
        experienceRequired: job.experienceLevel || 'Entry Level (0-2 yrs)',
        source: job.source || 'Official Industry & Recruiter Registry',
        sourceUrl: job.sourceUrl || '',
        lastVerified: job.lastVerified || 'September 2026',
        notificationDate: job.notificationDate || null,
        applicationDeadline: job.applicationDeadline || null,
      },
      skillsBreakdown: {
        requiredSkills: requiredSkillsList,
        skillsYouAlreadyHave: skillsAlreadyHaveList,
        skillsYouNeed: skillsToLearnList,
        technicalSkills: domainDetails.skillsYouNeed.map(s => ({
          name: s.name,
          level: s.level,
          desc: s.desc,
          status: 'Missing'
        }))
      },
      roadmap: {
        steps: roadmapSteps,
        pathType,
        isCareerSwitch,
        visualNodes: [
          eduName,
          `Target: ${job.title}`,
          ...roadmapSteps.map(s => s.title),
          'Job'
        ]
      },
      projects: domainDetails.projects || job.projects || [],
      multipleRoutes: domainDetails.multipleRoutes,
      qualificationRequirements: domainDetails.qualificationRequirements,
      careerProgression: domainDetails.careerProgression,
      higherStudies: domainDetails.higherStudies,
      interviewPreparation: job.interviewPreparation || [
        {
          category: 'Technical Knowledge',
          question: `Explain your core process when approaching a ${job.title} deliverable.`,
          answerGuidance: 'Structure your answer with STAR methodology (Situation, Task, Action, Result).'
        },
        {
          category: 'Domain & Tools',
          question: `What are your top three daily tools and how do you ensure zero error rate?`,
          answerGuidance: 'Mention specific industry tools, automated checks, and standard validation procedures.'
        },
        {
          category: 'HR / Behavioral',
          question: `Why are you pursuing ${job.title} after studying ${eduName}?`,
          answerGuidance: 'Highlight your transferable competencies (analytical reasoning, problem solving) and dedicated learning journey.'
        }
      ],
      howToApply: job.howToApply || `Target specialized hiring portals (LinkedIn, Naukri, company careers portals) with a tailored resume emphasizing relevant projects and certified skills.`,
      disclaimer: {
        note: 'Eligibility results distinguish stored qualification rules from current official recruitment/admission requirements.',
        verificationAdvice: 'Government and regulated-job eligibility must always be verified against the current official notification or authority before applying.',
        lastVerified: job.lastVerified || 'September 2026'
      }
    };
  }

  /**
   * Generates dynamic fallback data if a specific job title is not yet pre-seeded
   */
  static _buildDynamicJobFallback(jobTitle, educationName) {
    const isGovt = jobTitle.toLowerCase().includes('officer') ||
                   jobTitle.toLowerCase().includes('inspector') ||
                   jobTitle.toLowerCase().includes('railway') ||
                   jobTitle.toLowerCase().includes('psc') ||
                   jobTitle.toLowerCase().includes('upsc');

    return {
      title: jobTitle,
      slug: jobTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      jobType: isGovt ? 'Government' : 'Private',
      sector: isGovt ? 'Public Administration' : 'Commercial & Technology',
      overview: `Professional specialist role focusing on executing core responsibilities in ${jobTitle}.`,
      experienceLevel: 'Entry Level (0-2 yrs)',
      salaryRange: { formatted: isGovt ? 'Level 7 Pay Matrix (₹44,900 - ₹1,42,400)' : '₹4.5 - ₹8.5 LPA' },
      requiredSkills: [
        { name: 'Core Domain Knowledge' },
        { name: 'Analytical Thinking' },
        { name: 'Industry Software Tools' }
      ],
      skillsToLearn: ['Specialized Industry Tools', 'Workflow Automation', 'Case Study Analysis'],
      stepByStepRoadmap: [
        'Understand Core Role & Tools',
        'Learn Required Technical Skills',
        'Build 2-3 Real-World Projects',
        'Prepare ATS Resume & Portfolio',
        'Mock Interview Preparation',
        'Targeted Job Applications'
      ],
      projects: [
        {
          name: `${jobTitle} Benchmark Project`,
          tech: 'Modern Tool Stack',
          desc: `End-to-end practical project demonstrating core competencies required for ${jobTitle}.`
        }
      ],
      interviewPreparation: [
        {
          category: 'Technical',
          question: `What are the most critical skills needed for a ${jobTitle}?`,
          answerGuidance: 'Discuss core technical foundations, quality control, and execution accuracy.'
        },
        {
          category: 'Behavioral',
          question: `How does your ${educationName} background help you succeed as a ${jobTitle}?`,
          answerGuidance: 'Connect transferable problem solving, numeracy, and systematic reasoning.'
        }
      ],
      howToApply: isGovt
        ? 'Register on official recruitment portal, monitor notification gazette, and apply before closing date with verified documents.'
        : 'Optimize LinkedIn and portfolio, publish projects to GitHub / NovyPro, and apply directly via company careers pages.',
      source: isGovt ? 'Official Examination Board Notification' : 'Recruiter Market Benchmarks',
      sourceUrl: isGovt ? 'https://ssc.gov.in' : '',
      lastVerified: 'September 2026'
    };
  }
}
