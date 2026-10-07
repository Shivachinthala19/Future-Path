import { Entity } from '../models/Entity.js';
import { Education } from '../models/Education.js';
import { StudyProgram } from '../models/StudyProgram.js';
import { StudyPathway } from '../models/StudyPathway.js';
import { JobRole } from '../models/JobRole.js';
import { CareerField } from '../models/CareerField.js';
import { Career } from '../models/Career.js';
import { Skill } from '../models/Skill.js';
import { Certification } from '../models/Certification.js';
import { KnowledgeGraphService } from '../services/knowledgeGraphService.js';
import { EligibilityService } from '../services/eligibilityService.js';

export function googleSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

/**
 * Universal Search Controller (Section 1, 2, 12, 13)
 * Supports natural language intent queries and cross-entity searching across
 * Studies, Jobs, Careers, Exams, Certifications, Skills, Government & Private Jobs.
 */
export const universalSearch = async (req, res, next) => {
  try {
    const { q, category, type } = req.query;

    if (!q || !q.trim()) {
      return res.json({
        success: true,
        query: '',
        count: 0,
        results: [],
        directCard: null
      });
    }

    const cleanQ = q.trim();
    const lowerQ = cleanQ.toLowerCase();

    let directCard = null;

    // =========================================================================
    // 1. Natural Language Intent Parsing (Section 13)
    // =========================================================================

    // Intent A: "jobs after <X>" / "courses after <X>" / "what can I study after <X>" / "careers after <X>"
    const jobsAfterMatch = lowerQ.match(/(?:jobs|career|careers|what can i do|study options|courses|study)\s+(?:after|for|with)\s+(.+)/i);
    const govtJobsAfterMatch = lowerQ.match(/(?:government jobs|govt jobs|sarkari naukri)\s+(?:after|for|with)\s+(.+)/i);

    if (govtJobsAfterMatch && govtJobsAfterMatch[1]) {
      const eduQuery = govtJobsAfterMatch[1].trim();
      const govtEntities = await Entity.find({
        type: 'GOVERNMENT_JOB'
      }).limit(6).lean();

      directCard = {
        type: 'GOVERNMENT_JOB_GUIDANCE',
        title: `Government Jobs After ${eduQuery.toUpperCase()}`,
        education: eduQuery,
        disclaimer: 'Official Information: Recruitment rules, vacancies, age limits, and deadlines can change. Please verify the latest details with the official notification.',
        lastVerified: 'September 2026',
        webSearchUrl: googleSearchUrl(`government jobs after ${eduQuery} official notification eligibility`),
        overview: `Key Central and State Government recruitment pathways open to candidates having completed ${eduQuery}.`,
        governmentJobs: govtEntities.map(g => ({
          id: g.id || g._id,
          title: g.name,
          organization: g.organization || 'Central / State Commission',
          qualification: g.qualification || `Minimum qualification as specified in notification`,
          ageLimit: g.ageLimit || 'Refer to official advertisement',
          exams: g.exams || ['Competitive Examination'],
          officialSource: g.officialSource || 'Official Recruitment Board',
          notificationUrl: g.notificationUrl || g.sources?.[0]?.url || 'https://ssc.gov.in',
          webSearchUrl: googleSearchUrl(`${g.name} official recruitment notification eligibility`)
        }))
      };
    } else if (jobsAfterMatch && jobsAfterMatch[1]) {
      const eduQuery = jobsAfterMatch[1].trim();
      const education = await KnowledgeGraphService.identifyEducation(eduQuery);
      const eduName = education ? education.name : eduQuery.toUpperCase();

      // Look up entity or related studies
      const relatedStudies = await Entity.find({
        type: 'STUDY',
        $or: [
          { 'eligibility.qualification': { $regex: eduQuery, $options: 'i' } },
          { 'educationRoutes.degrees': { $regex: eduQuery, $options: 'i' } },
          { aliases: { $regex: eduQuery, $options: 'i' } },
          { name: { $regex: eduQuery, $options: 'i' } }
        ]
      }).limit(5).lean();

      const relatedJobs = await Entity.find({
        type: { $in: ['JOB', 'PRIVATE_JOB'] },
        $or: [
          { 'educationRoutes.degrees': { $regex: eduQuery, $options: 'i' } },
          { category: { $regex: eduQuery, $options: 'i' } }
        ]
      }).limit(5).lean();

      const govtJobs = await Entity.find({
        type: 'GOVERNMENT_JOB'
      }).limit(3).lean();

      directCard = {
        type: 'EDUCATION_NEXT_PATH',
        title: `Paths After Studying ${eduName}`,
        education: eduName,
        overview: `Comprehensive future path breakdown: higher study options, career fields, and private vs government job opportunities connected to ${eduName}.`,
        webSearchUrl: googleSearchUrl(`courses and career options after ${eduName} eligibility roadmap`),
        studyNext: relatedStudies.length > 0 ? relatedStudies.map(s => ({
          id: s.id || s._id,
          name: s.name,
          duration: s.duration || '2-3 Years',
          degreeLevel: s.educationLevel || 'Postgraduate',
          eligibility: s.eligibility?.minimumRequirements?.[0] || 'Graduation in relevant discipline',
          webSearchUrl: googleSearchUrl(`${s.name} course eligibility admission`)
        })) : [
          { name: 'Master of Commerce (M.Com)', duration: '2 Years', degreeLevel: 'Postgraduate' },
          { name: 'MBA Finance / Corporate Strategy', duration: '2 Years', degreeLevel: 'Postgraduate' },
          { name: 'Chartered Accountancy (CA Intermediate)', duration: '3-4 Years', degreeLevel: 'Professional Qualification' },
          { name: 'Data & Business Analytics Program', duration: '1 Year', degreeLevel: 'Certificate / PG Diploma' }
        ],
        privateJobs: relatedJobs.length > 0 ? relatedJobs.map(j => ({
          id: j.id || j._id,
          title: j.name,
          salary: j.salaryRange?.formatted || '₹5.0 - ₹9.5 LPA',
          overview: j.description,
          webSearchUrl: googleSearchUrl(`${j.name} job eligibility skills career`)
        })) : [
          { title: 'Financial Analyst', salary: '₹4.5 - ₹8.5 LPA' },
          { title: 'Data Analyst', salary: '₹4.5 - ₹9.5 LPA' },
          { title: 'Accountant', salary: '₹3.5 - ₹6.0 LPA' }
        ],
        governmentJobs: govtJobs.map(g => ({
          id: g.id || g._id,
          title: g.name,
          organization: g.organization || 'Government Recruitment Board',
          officialSource: g.officialSource || 'Official Commission',
          notificationUrl: g.notificationUrl || g.sources?.[0]?.url || 'https://ssc.gov.in',
          webSearchUrl: googleSearchUrl(`${g.name} official notification`)
        }))
      };
    }

    // Intent B: "how to become a <X>" / "how to get a job as <X>" / "<X> roadmap"
    const howToBecomeMatch = lowerQ.match(/(?:how\s+(?:to\s+become|can\s+i\s+become|to\s+get\s+a\s+job\s+as)\s+(?:a|an)?\s+(.+)|(.+)\s+roadmap)/i);
    if (!directCard && howToBecomeMatch) {
      const jobQuery = (howToBecomeMatch[1] || howToBecomeMatch[2]).trim();

      // Look up in Entity first
      let entityJob = await Entity.findOne({
        type: { $in: ['JOB', 'PRIVATE_JOB', 'GOVERNMENT_JOB'] },
        $or: [
          { id: jobQuery.toLowerCase().replace(/[^a-z0-9]/g, '-') },
          { name: { $regex: new RegExp(`^${jobQuery}$`, 'i') } },
          { aliases: { $regex: new RegExp(`^${jobQuery}$`, 'i') } },
          { name: { $regex: jobQuery, $options: 'i' } }
        ]
      }).lean();

      if (entityJob) {
        directCard = {
          type: 'JOB_HOW_TO',
          id: entityJob.id,
          title: `How to Become a ${entityJob.name}`,
          jobTitle: entityJob.name,
          category: entityJob.category,
          salaryFormatted: entityJob.salaryRange?.formatted || '₹5.0 - ₹12.0 LPA',
          overview: entityJob.description || `Complete step-by-step roadmap, required skill stacks, and educational pathways to enter ${entityJob.name}.`,
          webSearchUrl: googleSearchUrl(`${entityJob.name} eligibility skills career roadmap`),
          educationRoutes: entityJob.educationRoutes && entityJob.educationRoutes.length > 0
            ? entityJob.educationRoutes
            : [
                {
                  routeName: 'Route 1: Direct Degree',
                  degrees: ['Relevant Undergraduate Degree'],
                  skills: entityJob.requiredSkills?.slice(0, 3) || ['Domain Fundamentals'],
                  timeline: 'Direct Entry / 3-6 Months'
                }
              ],
          requiredSkills: entityJob.requiredSkills || entityJob.skills || [],
          preferredSkills: entityJob.preferredSkills || [],
          certifications: entityJob.certifications || [],
          roadmap: entityJob.roadmap || [],
          projects: entityJob.projects || [],
          interviewPreparation: entityJob.interviewPreparation || [],
          careerGrowth: entityJob.careerGrowth || [],
          sources: entityJob.sources || []
        };
      }
    }

    // Intent C: Direct Single Entity Match (e.g. "B.Com", "MBA", "MBBS", "Data Analyst", "SSC CHSL", "ITI Electrician")
    if (!directCard) {
      const singleMatch = await Entity.findOne({
        $or: [
          { id: lowerQ.replace(/[^a-z0-9]/g, '-') },
          { name: { $regex: new RegExp(`^${cleanQ}$`, 'i') } },
          { shortName: { $regex: new RegExp(`^${cleanQ}$`, 'i') } },
          { aliases: { $regex: new RegExp(`^${cleanQ}$`, 'i') } }
        ]
      }).lean();

      if (singleMatch) {
        if (singleMatch.type === 'STUDY') {
          directCard = {
            type: 'STUDY_PROGRAM_PATH',
            id: singleMatch.id,
            title: singleMatch.name,
            shortName: singleMatch.shortName,
            degreeLevel: singleMatch.educationLevel || 'Undergraduate',
            duration: singleMatch.duration || '3-4 Years',
            category: singleMatch.category,
            overview: singleMatch.overview || singleMatch.description,
            eligibility: singleMatch.eligibility?.minimumRequirements?.[0] || 'Pass in qualifying board examination',
            admissionRequirements: singleMatch.admissionRequirements || ['Merit / Entrance score'],
            entranceExams: singleMatch.entranceExams || [],
            subjects: singleMatch.subjects || [],
            specializations: singleMatch.specializations || [],
            skills: singleMatch.skills || [],
            educationRoutes: singleMatch.educationRoutes || [],
            careerFields: singleMatch.careerFields || [],
            relatedJobs: singleMatch.relatedJobs || [],
            jobRoles: singleMatch.jobRoles || [],
            seniorRoles: singleMatch.seniorRoles || [],
            higherStudies: singleMatch.higherStudies || [],
            sources: singleMatch.sources || [],
            officialSources: singleMatch.officialSources || [],
            webSearchUrl: googleSearchUrl(`${singleMatch.name} course eligibility admission syllabus`),
            lastVerified: singleMatch.lastVerified || 'September 2026'
          };
        } else if (singleMatch.type === 'JOB' || singleMatch.type === 'PRIVATE_JOB') {
          directCard = {
            type: 'JOB_HOW_TO',
            id: singleMatch.id,
            title: `How to Become a ${singleMatch.name}`,
            jobTitle: singleMatch.name,
            category: singleMatch.category,
            salaryFormatted: singleMatch.salaryRange?.formatted || 'Competitive Industry Standard',
            overview: singleMatch.overview || singleMatch.description,
            educationRoutes: singleMatch.educationRoutes || [],
            requiredSkills: singleMatch.requiredSkills || singleMatch.skills || [],
            preferredSkills: singleMatch.preferredSkills || [],
            certifications: singleMatch.certifications || [],
            roadmap: singleMatch.roadmap || [],
            projects: singleMatch.projects || [],
            interviewPreparation: singleMatch.interviewPreparation || [],
            careerGrowth: singleMatch.careerGrowth || [],
            higherStudies: singleMatch.higherStudies || [],
            sources: singleMatch.sources || [],
            webSearchUrl: googleSearchUrl(`${singleMatch.name} eligibility skills career roadmap`),
            lastVerified: singleMatch.lastVerified || 'September 2026'
          };
        } else if (singleMatch.type === 'GOVERNMENT_JOB' || singleMatch.type === 'EXAM') {
          directCard = {
            type: 'GOVERNMENT_RECRUITMENT_CARD',
            id: singleMatch.id,
            title: singleMatch.name,
            organization: singleMatch.organization || 'Official Recruitment Commission',
            qualification: singleMatch.qualification || 'As per current official notification',
            ageLimit: singleMatch.ageLimit || 'Please refer to official advertisement',
            exams: singleMatch.exams || singleMatch.entranceExams || [],
            posts: singleMatch.posts || [],
            overview: singleMatch.overview || singleMatch.description,
            officialSource: singleMatch.officialSource || singleMatch.sources?.[0]?.title || 'Official Commission Portal',
            notificationUrl: singleMatch.notificationUrl || singleMatch.sources?.[0]?.url || 'https://ssc.gov.in',
            webSearchUrl: googleSearchUrl(`${singleMatch.name} official notification recruitment syllabus`),
            lastVerified: singleMatch.lastVerified || 'September 2026',
            disclaimer: 'Official Information: Eligibility, vacancies, age limits, and deadlines can change. Please verify the latest details with the official source.'
          };
        }
      }
    }

    // =========================================================================
    // 2. Universal Categorized Multi-Entity Search (Section 12)
    // =========================================================================

    const regex = new RegExp(cleanQ, 'i');
    const tokenWords = cleanQ.split(/\s+/).filter(w => w.length > 2);
    const tokenRegexes = tokenWords.map(w => new RegExp(w, 'i'));

    const searchFilter = {
      $or: [
        { name: regex },
        { shortName: regex },
        { aliases: regex },
        { category: regex },
        { description: regex },
        { skills: regex },
        { requiredSkills: regex },
        ...(tokenRegexes.length > 0 ? tokenRegexes.map(tr => ({ name: tr })) : [])
      ]
    };

    if (type && type !== 'ALL') {
      searchFilter.type = type;
    }
    if (category && category !== 'ALL') {
      searchFilter.category = category;
    }

    // Fetch from universal Entity collection
    const entities = await Entity.find(searchFilter).limit(20).lean();

    const results = [];
    const seenIds = new Set();

    for (const ent of entities) {
      if (seenIds.has(ent.id)) continue;
      seenIds.add(ent.id);

      let targetUrl = `/study/${ent.id}`;
      let action = 'navigate';
      let payload = {};

      if (ent.type === 'STUDY') {
        targetUrl = `/study/${ent.id}`;
        action = 'set_education';
        payload = { educationName: ent.name };
      } else if (ent.type.includes('JOB')) {
        targetUrl = `/job/${ent.id}`;
        action = 'set_target_job';
        payload = { targetJobName: ent.name };
      } else if (ent.type === 'CAREER') {
        targetUrl = `/careers/${ent.id}`;
      } else if (ent.type === 'EXAM' || ent.type === 'CERTIFICATION' || ent.type === 'SKILL') {
        targetUrl = `/learn`;
      }

      results.push({
        id: ent.id || ent._id,
        name: ent.name,
        shortName: ent.shortName,
        type: ent.type,
        category: ent.category,
        categoryLabel: ent.type.replace(/_/g, ' '),
        badge: ent.educationLevel || ent.organization || ent.category,
        hierarchy: `${ent.category} • ${ent.type.replace(/_/g, ' ')}${ent.duration ? ` • ${ent.duration}` : ''}`,
        description: ent.description || ent.overview || `Structured entity in Future Path database.`,
        duration: ent.duration,
        level: ent.educationLevel,
        salary: ent.salaryRange?.formatted,
        officialSource: ent.officialSource || ent.sources?.[0]?.title,
        officialUrl: ent.notificationUrl || ent.sources?.[0]?.url,
        webSearchUrl: googleSearchUrl(`${ent.name} ${ent.type === 'STUDY' ? 'course eligibility' : 'skills career'}`),
        targetUrl,
        action,
        payload
      });
    }

    // Fallback search in Education / JobRole / StudyProgram if Entity collection is sparse
    if (results.length < 5) {
      const legacyEducations = await Education.find({
        $or: [{ name: regex }, { aliases: regex }, { branch: regex }, { stream: regex }]
      }).limit(3).lean();

      for (const edu of legacyEducations) {
        if (!seenIds.has(edu.name.toLowerCase())) {
          seenIds.add(edu.name.toLowerCase());
          results.push({
            id: edu.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: edu.name,
            type: 'STUDY',
            category: edu.stream || 'General',
            categoryLabel: 'Study Qualification',
            badge: edu.level || 'Degree',
            hierarchy: `${edu.level || 'Degree'} • ${edu.stream || 'General'}`,
            description: edu.description || `Recognized academic qualification in ${edu.stream}.`,
            targetUrl: `/study/${encodeURIComponent(edu.name.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`,
            action: 'set_education',
            payload: { educationName: edu.name }
          });
        }
      }

      const legacyJobs = await JobRole.find({
        $or: [{ title: regex }, { sector: regex }, { jobFamily: regex }]
      }).limit(4).lean();

      for (const j of legacyJobs) {
        if (!seenIds.has(j.title.toLowerCase())) {
          seenIds.add(j.title.toLowerCase());
          const isGovt = j.jobType === 'Government' || j.jobType === 'Public Sector';
          results.push({
            id: j.slug || j.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: j.title,
            type: isGovt ? 'GOVERNMENT_JOB' : 'JOB',
            category: j.sector || 'Industry',
            categoryLabel: isGovt ? 'Government Job' : 'Private Job',
            badge: isGovt ? 'Government Sector' : 'Private Sector',
            hierarchy: `${j.sector || 'Industry'} • ${j.salaryRange?.formatted || 'Competitive'}`,
            description: j.overview || j.description || `Professional role operating within ${j.sector}.`,
            targetUrl: `/job/${encodeURIComponent(j.slug || j.title.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`,
            action: 'set_target_job',
            payload: { targetJobName: j.title }
          });
        }
      }
    }

    return res.json({
      success: true,
      query: cleanQ,
      count: results.length,
      directCard,
      results
    });
  } catch (error) {
    next(error);
  }
};
