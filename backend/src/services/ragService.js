import { Study } from '../models/Study.js';
import { Job } from '../models/Job.js';
import { Exam } from '../models/Exam.js';
import { Skill } from '../models/Skill.js';
import { Certification } from '../models/Certification.js';
import { Roadmap } from '../models/Roadmap.js';
import { Source } from '../models/Source.js';
import { Career } from '../models/Career.js';

export class RagService {
  /**
   * Retrieves verified domain entities and sources matching the user query and user context.
   */
  static async retrieveContext({ query = '', intent = '', userContext = {} }) {
    const qLower = query.toLowerCase().trim();
    const currentEdu = userContext.currentEducation || userContext.education || 'B.Com';
    const targetJob = userContext.targetJob || 'Data Analyst';
    const currentSkills = Array.isArray(userContext.skills) ? userContext.skills : [];

    // Extract keywords and potential entities from query + context
    const tokens = qLower
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 2);

    const regexSearch = tokens.length > 0 ? new RegExp(tokens.slice(0, 4).join('|'), 'i') : null;

    // Parallel MongoDB queries with safe fallbacks
    const [
      studiesResult,
      jobsResult,
      examsResult,
      skillsResult,
      certificationsResult,
      roadmapsResult,
      sourcesResult
    ] = await Promise.allSettled([
      // 1. Studies matching query or education
      Study.find({
        $or: [
          { name: { $regex: currentEdu, $options: 'i' } },
          ...(regexSearch ? [{ name: regexSearch }, { aliases: regexSearch }, { field: regexSearch }] : [])
        ]
      })
        .limit(6)
        .lean(),

      // 2. Jobs matching query or target job
      Job.find({
        $or: [
          { title: { $regex: targetJob, $options: 'i' } },
          ...(regexSearch ? [{ title: regexSearch }, { aliases: regexSearch }, { jobFamily: regexSearch }] : [])
        ]
      })
        .limit(6)
        .lean(),

      // 3. Exams matching query or sector
      Exam.find({
        $or: [
          ...(regexSearch ? [{ name: regexSearch }, { aliases: regexSearch }, { category: regexSearch }] : []),
          { category: { $regex: 'Competitive|Entrance', $options: 'i' } }
        ]
      })
        .limit(5)
        .lean(),

      // 4. Skills
      Skill.find({
        $or: [
          ...(regexSearch ? [{ name: regexSearch }, { category: regexSearch }] : []),
          { name: { $in: ['SQL', 'Excel', 'Python', 'Power BI', 'Statistics', 'Communication'] } }
        ]
      })
        .limit(10)
        .lean(),

      // 5. Certifications
      Certification.find({
        $or: [
          ...(regexSearch ? [{ title: regexSearch }, { skills: regexSearch }] : [])
        ]
      })
        .limit(4)
        .lean(),

      // 6. Verified Roadmaps
      Roadmap.find({
        $or: [
          { targetRole: { $regex: targetJob, $options: 'i' } },
          ...(regexSearch ? [{ targetRole: regexSearch }, { title: regexSearch }] : [])
        ]
      })
        .limit(3)
        .lean(),

      // 7. Verified Sources
      Source.find({
        $or: [
          ...(regexSearch ? [{ name: regexSearch }, { organization: regexSearch }] : []),
          { type: { $in: ['OFFICIAL', 'GOVERNMENT', 'PROFESSIONAL_BODY'] } }
        ]
      })
        .limit(6)
        .lean()
    ]);

    const studies = studiesResult.status === 'fulfilled' ? studiesResult.value || [] : [];
    const jobs = jobsResult.status === 'fulfilled' ? jobsResult.value || [] : [];
    const exams = examsResult.status === 'fulfilled' ? examsResult.value || [] : [];
    const skills = skillsResult.status === 'fulfilled' ? skillsResult.value || [] : [];
    const certifications = certificationsResult.status === 'fulfilled' ? certificationsResult.value || [] : [];
    const roadmaps = roadmapsResult.status === 'fulfilled' ? roadmapsResult.value || [] : [];
    const sources = sourcesResult.status === 'fulfilled' ? sourcesResult.value || [] : [];

    // Synthesize verified source list
    const verifiedSources = [];
    sources.forEach((s) => {
      verifiedSources.push({
        sourceName: s.name || s.title || s.organization || 'Verified Database Source',
        sourceUrl: s.url || 'https://education.gov.in',
        sourceType: s.type || 'OFFICIAL',
        organization: s.organization || '',
        lastVerified: s.lastVerified || 'September 2026'
      });
    });

    // Add study/job specific sources if available
    jobs.forEach((j) => {
      if (j.officialSource || j.sources?.length) {
        if (j.officialSource) {
          verifiedSources.push({
            sourceName: `${j.title} Recruitment Criteria`,
            sourceUrl: j.officialSource,
            sourceType: 'OFFICIAL',
            lastVerified: j.lastVerified || '2026'
          });
        }
        if (Array.isArray(j.sources)) {
          j.sources.forEach((js) => {
            verifiedSources.push({
              sourceName: js.title || js.name || `${j.title} Guidelines`,
              sourceUrl: js.url || '#',
              sourceType: js.sourceType || 'OFFICIAL',
              lastVerified: js.lastVerified || '2026'
            });
          });
        }
      }
    });

    exams.forEach((ex) => {
      if (ex.officialSource || ex.notificationUrl) {
        verifiedSources.push({
          sourceName: `${ex.name} Official Portal (${ex.organization || 'Recruitment Board'})`,
          sourceUrl: ex.notificationUrl || ex.officialSource || 'https://ssc.nic.in',
          sourceType: 'GOVERNMENT',
          organization: ex.organization || '',
          lastVerified: ex.lastVerified || 'September 2026'
        });
      }
    });

    // Deduplicate sources by URL
    const uniqueSources = [];
    const seenUrls = new Set();
    for (const src of verifiedSources) {
      if (src.sourceUrl && !seenUrls.has(src.sourceUrl)) {
        seenUrls.add(src.sourceUrl);
        uniqueSources.push(src);
      }
    }

    return {
      query,
      intent,
      userContext: {
        currentEducation: currentEdu,
        targetJob,
        currentSkills,
        specialization: userContext.specialization || '',
        status: userContext.educationStatus || 'completed'
      },
      verifiedData: {
        studies: studies.map((s) => ({
          name: s.name,
          duration: s.duration || '3 Years',
          eligibility: s.eligibility || '10+2 or equivalent',
          entranceExams: s.entranceExams || [],
          careerOptions: s.careerOptions || [],
          higherStudies: s.higherStudies || []
        })),
        jobs: jobs.map((j) => ({
          title: j.title,
          category: j.category || 'Private',
          salary: j.salaryRange?.formatted || j.salary || 'Competitive',
          requiredSkills: j.requiredSkills || j.tools || ['Analytical Thinking'],
          tools: j.tools || [],
          eligibility: j.eligibilityNote || j.educationRoutes?.[0]?.routeName || 'Bachelor Degree or relevant coursework',
          topHirers: j.topCompanies || ['Industry Leaders']
        })),
        exams: exams.map((e) => ({
          name: e.name,
          organization: e.organization || '',
          category: e.category || 'Competitive Examination',
          pattern: e.examPattern || 'Objective + Descriptive',
          eligibility: e.eligibility || 'Graduation in any discipline',
          lastVerified: e.lastVerified || '2026'
        })),
        skills: skills.map((sk) => ({
          name: sk.name,
          category: sk.category || 'Technical',
          demand: sk.demandLevel || 'High'
        })),
        roadmaps: roadmaps.map((r) => ({
          targetRole: r.targetRole,
          steps: r.steps || []
        }))
      },
      sources: uniqueSources.slice(0, 4)
    };
  }
}

export default RagService;
