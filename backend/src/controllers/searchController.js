import mongoose from 'mongoose';
import { Entity } from '../models/Entity.js';
import { Education } from '../models/Education.js';
import { JobRole } from '../models/JobRole.js';
import { KnowledgeGraphService } from '../services/knowledgeGraphService.js';
import { getSupabaseClient, isSupabaseConfigured } from '../config/supabase.js';

export function googleSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

/**
 * Universal Search Controller
 * Powered by Supabase PostgreSQL (Primary) + MongoDB Knowledge Graph (Fallback)
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
    const isSupabaseReady = isSupabaseConfigured();
    const supabase = isSupabaseReady ? getSupabaseClient() : null;

    let directCard = null;

    // =========================================================================
    // 1. Natural Language Intent Parsing
    // =========================================================================

    // Intent A: "jobs after <X>" / "courses after <X>" / "what can I study after <X>" / "careers after <X>"
    const jobsAfterMatch = lowerQ.match(/(?:jobs|career|careers|what can i do|study options|courses|study)\s+(?:after|for|with)\s+(.+)/i);
    const govtJobsAfterMatch = lowerQ.match(/(?:government jobs|govt jobs|sarkari naukri)\s+(?:after|for|with)\s+(.+)/i);

    if (govtJobsAfterMatch && govtJobsAfterMatch[1]) {
      const eduQuery = govtJobsAfterMatch[1].trim();
      let govtJobsList = [];

      if (supabase) {
        const { data: sbGovt } = await supabase
          .from('jobs')
          .select('*')
          .or(`category.eq.Government,job_type.eq.GOVERNMENT_JOB`)
          .limit(8);
        if (sbGovt && sbGovt.length > 0) {
          govtJobsList = sbGovt.map(g => ({
            id: g.slug || g.id,
            title: g.title,
            organization: g.sector || 'Central / State Commission',
            qualification: g.minimum_education || g.eligibility_note || `Minimum qualification as specified in notification`,
            ageLimit: 'Refer to official advertisement (18-32 years)',
            exams: ['Competitive Examination'],
            officialSource: 'Official Recruitment Board',
            notificationUrl: 'https://ssc.gov.in',
            webSearchUrl: googleSearchUrl(`${g.title} official recruitment notification eligibility`)
          }));
        }
      }

      if (govtJobsList.length === 0 && mongoose.connection.readyState === 1) {
        const govtEntities = await Entity.find({ type: 'GOVERNMENT_JOB' }).limit(6).lean().catch(() => []);
        govtJobsList = (govtEntities || []).map(g => ({
          id: g.id || g._id,
          title: g.name,
          organization: g.organization || 'Central / State Commission',
          qualification: g.qualification || `Minimum qualification as specified in notification`,
          ageLimit: g.ageLimit || 'Refer to official advertisement',
          exams: g.exams || ['Competitive Examination'],
          officialSource: g.officialSource || 'Official Recruitment Board',
          notificationUrl: g.notificationUrl || g.sources?.[0]?.url || 'https://ssc.gov.in',
          webSearchUrl: googleSearchUrl(`${g.name} official recruitment notification eligibility`)
        }));
      }

      directCard = {
        type: 'GOVERNMENT_JOB_GUIDANCE',
        title: `Government Jobs After ${eduQuery.toUpperCase()}`,
        education: eduQuery,
        disclaimer: 'Official Information: Recruitment rules, vacancies, age limits, and deadlines can change. Please verify the latest details with the official notification.',
        lastVerified: 'September 2026',
        webSearchUrl: googleSearchUrl(`government jobs after ${eduQuery} official notification eligibility`),
        overview: `Key Central and State Government recruitment pathways open to candidates having completed ${eduQuery}.`,
        governmentJobs: govtJobsList
      };
    } else if (jobsAfterMatch && jobsAfterMatch[1]) {
      const eduQuery = jobsAfterMatch[1].trim();
      let relatedStudiesList = [];
      let relatedJobsList = [];
      let relatedGovtJobsList = [];

      if (supabase) {
        // Query study paths from Supabase
        const { data: paths } = await supabase
          .from('study_paths')
          .select('*')
          .ilike('from_education_name', `%${eduQuery}%`)
          .limit(6);

        if (paths && paths.length > 0) {
          relatedStudiesList = paths.map(p => ({
            id: p.to_education_name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: p.to_education_name,
            duration: `${p.duration_years || 2} Years`,
            degreeLevel: p.relationship_type || 'Degree Pathway',
            eligibility: p.eligibility_note || 'Qualifying grade in previous degree',
            webSearchUrl: googleSearchUrl(`${p.to_education_name} course eligibility admission`)
          }));
        }

        // Query jobs
        const { data: sbJobs } = await supabase
          .from('jobs')
          .select('*')
          .ilike('minimum_education', `%${eduQuery}%`)
          .limit(6);

        if (sbJobs && sbJobs.length > 0) {
          relatedJobsList = sbJobs.filter(j => j.category !== 'Government').map(j => ({
            id: j.slug || j.id,
            title: j.title,
            salary: '₹5.0 - ₹14.0 LPA',
            overview: j.overview || j.description,
            webSearchUrl: googleSearchUrl(`${j.title} job eligibility skills career`)
          }));
          relatedGovtJobsList = sbJobs.filter(j => j.category === 'Government').map(j => ({
            id: j.slug || j.id,
            title: j.title,
            organization: j.sector || 'Government Commission',
            officialSource: 'Official Commission Portal',
            notificationUrl: 'https://ssc.gov.in',
            webSearchUrl: googleSearchUrl(`${j.title} official notification`)
          }));
        }
      }

      if (relatedStudiesList.length === 0 && mongoose.connection.readyState === 1) {
        const relatedStudies = await Entity.find({
          type: 'STUDY',
          $or: [
            { 'eligibility.qualification': { $regex: eduQuery, $options: 'i' } },
            { name: { $regex: eduQuery, $options: 'i' } }
          ]
        }).limit(5).lean().catch(() => []);

        relatedStudiesList = (relatedStudies || []).map(s => ({
          id: s.id || s._id,
          name: s.name,
          duration: s.duration || '2-3 Years',
          degreeLevel: s.educationLevel || 'Postgraduate',
          eligibility: s.eligibility?.minimumRequirements?.[0] || 'Graduation in relevant discipline',
          webSearchUrl: googleSearchUrl(`${s.name} course eligibility admission`)
        }));
      }

      directCard = {
        type: 'EDUCATION_NEXT_PATH',
        title: `Paths After Studying ${eduQuery.toUpperCase()}`,
        education: eduQuery.toUpperCase(),
        overview: `Comprehensive future path breakdown: higher study options, career fields, and private vs government job opportunities connected to ${eduQuery}.`,
        webSearchUrl: googleSearchUrl(`courses and career options after ${eduQuery} eligibility roadmap`),
        studyNext: relatedStudiesList.length > 0 ? relatedStudiesList : [
          { name: `Advanced Studies in ${eduQuery}`, duration: '2 Years', degreeLevel: 'Postgraduate' },
          { name: 'Master of Business Administration (MBA)', duration: '2 Years', degreeLevel: 'Postgraduate' },
          { name: 'Professional Certification / Industry Specialization', duration: '1 Year', degreeLevel: 'Specialization' }
        ],
        privateJobs: relatedJobsList.length > 0 ? relatedJobsList : [
          { title: `${eduQuery} Associate Specialist`, salary: '₹4.5 - ₹8.5 LPA' },
          { title: 'Data & Business Analyst', salary: '₹4.5 - ₹9.5 LPA' }
        ],
        governmentJobs: relatedGovtJobsList.length > 0 ? relatedGovtJobsList : [
          { title: 'SSC Combined Graduate Level (CGL)', organization: 'Staff Selection Commission', notificationUrl: 'https://ssc.gov.in', webSearchUrl: googleSearchUrl('SSC CGL recruitment') },
          { title: 'Banking Probationary Officer (IBPS PO)', organization: 'Public Sector Banks', notificationUrl: 'https://ibps.in', webSearchUrl: googleSearchUrl('IBPS PO recruitment') }
        ]
      };
    }

    // Intent B: "how to become a <X>" / "how to get a job as <X>" / "<X> roadmap"
    const howToBecomeMatch = lowerQ.match(/(?:how\s+(?:to\s+become|can\s+i\s+become|to\s+get\s+a\s+job\s+as)\s+(?:a|an)?\s+(.+)|(.+)\s+roadmap)/i);
    const targetJobLookup = howToBecomeMatch ? (howToBecomeMatch[1] || howToBecomeMatch[2]).trim() : null;

    if (!directCard && targetJobLookup) {
      if (supabase) {
        const { data: jobMatch } = await supabase
          .from('jobs')
          .select('*')
          .or(`title.ilike.%${targetJobLookup}%,slug.ilike.%${targetJobLookup.replace(/[^a-z0-9]/g, '-')}%`)
          .limit(1)
          .maybeSingle();

        if (jobMatch) {
          // Fetch roadmap steps if available
          const { data: roadmapData } = await supabase
            .from('roadmaps')
            .select('*, roadmap_steps(*)')
            .ilike('target_role', `%${jobMatch.title}%`)
            .maybeSingle();

          const steps = roadmapData?.roadmap_steps?.sort((a, b) => a.step_number - b.step_number) || [];

          directCard = {
            type: 'JOB_HOW_TO',
            id: jobMatch.slug || jobMatch.id,
            title: `How to Become a ${jobMatch.title}`,
            jobTitle: jobMatch.title,
            category: jobMatch.category || jobMatch.sector,
            salaryFormatted: 'Competitive Industry Package (₹6.0 - ₹24.0 LPA)',
            overview: jobMatch.overview || jobMatch.description || `Complete step-by-step roadmap and skill stacks to enter ${jobMatch.title}.`,
            webSearchUrl: googleSearchUrl(`${jobMatch.title} eligibility skills career roadmap`),
            educationRoutes: [
              {
                routeName: 'Recommended Qualification Route',
                degrees: [jobMatch.minimum_education || 'Relevant Degree / Graduation'],
                skills: (jobMatch.required_skills || []).slice(0, 4),
                timeline: 'Direct Entry / Structured Learning Path',
                description: jobMatch.eligibility_note || `Passionate mastery of foundational tools and portfolio execution.`
              }
            ],
            requiredSkills: jobMatch.required_skills || [],
            preferredSkills: jobMatch.tools || [],
            roadmap: steps.map(st => ({
              step: st.step_number,
              title: st.title,
              type: st.type,
              description: st.description,
              whatToLearn: (st.skills || []).join(', ')
            }))
          };
        }
      }
    }

    // Intent C: Direct Single Entity Match (e.g. "NEET", "UPSC", "B.Com", "Data Analyst", "CA", "GATE", "MBBS")
    if (!directCard && supabase) {
      // 1. Check Exams
      const { data: examMatch } = await supabase
        .from('exams')
        .select('*')
        .or(`short_name.ilike.${cleanQ},name.ilike.%${cleanQ}%,slug.eq.${lowerQ.replace(/[^a-z0-9]/g, '-')}`)
        .limit(1)
        .maybeSingle();

      if (examMatch) {
        directCard = {
          type: 'GOVERNMENT_RECRUITMENT_CARD',
          id: examMatch.slug || examMatch.id,
          title: examMatch.name,
          organization: examMatch.organization || 'National Examination Authority',
          qualification: examMatch.qualification || 'As specified in official notification',
          ageLimit: 'Refer to official advertisement',
          exams: [examMatch.short_name || examMatch.name],
          overview: examMatch.overview || examMatch.description,
          officialSource: examMatch.organization,
          notificationUrl: examMatch.notification_url || 'https://nta.ac.in',
          webSearchUrl: googleSearchUrl(`${examMatch.name} official notification syllabus eligibility`),
          lastVerified: 'September 2026',
          disclaimer: 'Official Information: Eligibility, dates, and syllabus can change. Please verify the latest details with the official source.'
        };
      }

      // 2. Check Studies
      if (!directCard) {
        const { data: studyMatch } = await supabase
          .from('studies')
          .select('*')
          .or(`short_name.ilike.${cleanQ},name.ilike.%${cleanQ}%,slug.eq.${lowerQ.replace(/[^a-z0-9]/g, '-')}`)
          .limit(1)
          .maybeSingle();

        if (studyMatch) {
          directCard = {
            type: 'STUDY_PROGRAM_PATH',
            id: studyMatch.slug || studyMatch.id,
            title: studyMatch.name,
            shortName: studyMatch.short_name || studyMatch.name,
            degreeLevel: studyMatch.education_level || 'Undergraduate',
            duration: studyMatch.duration || '3-4 Years',
            category: studyMatch.category,
            overview: studyMatch.overview || studyMatch.description,
            eligibility: studyMatch.description || 'Pass in qualifying board examination',
            admissionRequirements: ['Merit / Entrance exam qualification'],
            entranceExams: ['National / State Level Entrance'],
            careerFields: [studyMatch.category],
            jobRoles: Array.isArray(studyMatch.career_options) ? studyMatch.career_options : [],
            higherStudies: Array.isArray(studyMatch.higher_studies) ? studyMatch.higher_studies : [],
            officialSources: [{ title: 'UGC / Statutory Regulatory Body', url: 'https://ugc.gov.in' }],
            webSearchUrl: googleSearchUrl(`${studyMatch.name} course eligibility admission syllabus`),
            lastVerified: 'September 2026'
          };
        }
      }

      // 3. Check Jobs
      if (!directCard) {
        const { data: jobDirect } = await supabase
          .from('jobs')
          .select('*')
          .or(`title.ilike.%${cleanQ}%,slug.eq.${lowerQ.replace(/[^a-z0-9]/g, '-')}`)
          .limit(1)
          .maybeSingle();

        if (jobDirect) {
          directCard = {
            type: 'JOB_HOW_TO',
            id: jobDirect.slug || jobDirect.id,
            title: `How to Become a ${jobDirect.title}`,
            jobTitle: jobDirect.title,
            category: jobDirect.category || jobDirect.sector,
            salaryFormatted: 'Competitive Industry Standard',
            overview: jobDirect.overview || jobDirect.description,
            educationRoutes: [
              {
                routeName: 'Academic Qualification Route',
                degrees: [jobDirect.minimum_education || 'Bachelor Degree in Relevant Discipline'],
                skills: (jobDirect.required_skills || []).slice(0, 4),
                timeline: 'Direct Entry / Skill Development'
              }
            ],
            requiredSkills: jobDirect.required_skills || [],
            preferredSkills: jobDirect.tools || [],
            sources: [{ title: 'Official Industry Standards', url: 'https://nasscom.in' }],
            webSearchUrl: googleSearchUrl(`${jobDirect.title} eligibility skills career roadmap`),
            lastVerified: 'September 2026'
          };
        }
      }
    }

    // =========================================================================
    // 2. Universal Multi-Entity Search across all Supabase tables
    // =========================================================================

    const isBroadStudy = /^(study|studies|course|courses|degree|degrees|masters|master|higher study|higher studies)$/i.test(lowerQ);
    const isBroadJob = /^(job|jobs|career|careers|placement|placements|work|role|roles|salary|salaries)$/i.test(lowerQ);
    const isBroadExam = /^(exam|exams|govt|government|sarkari|upsc|ssc|gate)$/i.test(lowerQ);

    const results = [];
    const seenSlugs = new Set();

    if (supabase) {
      // 1. Studies
      if (!type || type === 'ALL' || type === 'STUDY' || isBroadStudy) {
        let studyQuery = supabase.from('studies').select('*').limit(10);
        if (!isBroadStudy) {
          studyQuery = studyQuery.or(`name.ilike.%${cleanQ}%,short_name.ilike.%${cleanQ}%,category.ilike.%${cleanQ}%,description.ilike.%${cleanQ}%`);
        }
        const { data: studies } = await studyQuery;

        (studies || []).forEach(st => {
          const key = st.slug || st.name.toLowerCase();
          if (!seenSlugs.has(key)) {
            seenSlugs.add(key);
            results.push({
              id: st.slug || st.id,
              name: st.name,
              shortName: st.short_name || st.name,
              type: 'STUDY',
              category: st.category || 'Higher Education',
              categoryLabel: 'Studies & Degrees',
              badge: st.education_level || 'Degree',
              hierarchy: `${st.category || 'Education'} • Study Degree • ${st.duration || '3-4 Years'}`,
              description: st.overview || st.description || `Accredited degree program in ${st.name}.`,
              duration: st.duration,
              level: st.education_level,
              officialSource: 'UGC / AICTE / Statutory Body',
              officialUrl: 'https://ugc.gov.in',
              webSearchUrl: googleSearchUrl(`${st.name} course admission syllabus`),
              targetUrl: `/study/${st.slug || st.id}`,
              action: 'set_education',
              payload: { educationName: st.name }
            });
          }
        });
      }

      // 2. Jobs
      if (!type || type === 'ALL' || type === 'JOB' || type === 'GOVERNMENT_JOB' || isBroadJob) {
        let jobQuery = supabase.from('jobs').select('*').limit(12);

        if (!isBroadJob) {
          jobQuery = jobQuery.or(`title.ilike.%${cleanQ}%,sector.ilike.%${cleanQ}%,category.ilike.%${cleanQ}%,description.ilike.%${cleanQ}%`);
        }

        if (type === 'GOVERNMENT_JOB' || isBroadExam) {
          jobQuery = jobQuery.or('category.eq.Government,job_type.eq.GOVERNMENT_JOB');
        } else if (type === 'JOB') {
          jobQuery = jobQuery.neq('category', 'Government');
        }

        const { data: jobs } = await jobQuery;

        (jobs || []).forEach(j => {
          const key = j.slug || j.title.toLowerCase();
          if (!seenSlugs.has(key)) {
            seenSlugs.add(key);
            const isGovt = j.category === 'Government' || j.job_type === 'GOVERNMENT_JOB';
            results.push({
              id: j.slug || j.id,
              name: j.title,
              shortName: j.title,
              type: isGovt ? 'GOVERNMENT_JOB' : 'JOB',
              category: j.sector || j.category || 'Industry',
              categoryLabel: isGovt ? 'Govt Job / Service' : 'Private Job Role',
              badge: isGovt ? 'Public Administration' : 'Private Sector',
              hierarchy: `${j.sector || 'Industry'} • ${isGovt ? 'Government Service' : 'Private Role'}`,
              description: j.overview || j.description || `Professional career opportunity in ${j.title}.`,
              salary: 'Industry Standard Package',
              officialSource: isGovt ? 'Union / State Commission' : (j.top_companies?.[0] || 'Leading Enterprises'),
              officialUrl: isGovt ? 'https://ssc.gov.in' : googleSearchUrl(`${j.title} job postings`),
              webSearchUrl: googleSearchUrl(`${j.title} eligibility skills career`),
              targetUrl: `/job/${j.slug || j.id}`,
              action: 'set_target_job',
              payload: { targetJobName: j.title }
            });
          }
        });
      }

      // 3. Competitive & Entrance Exams
      if (!type || type === 'ALL' || type === 'EXAM' || type === 'GOVERNMENT_JOB' || isBroadExam) {
        let examQuery = supabase.from('exams').select('*').limit(8);
        if (!isBroadExam) {
          examQuery = examQuery.or(`name.ilike.%${cleanQ}%,short_name.ilike.%${cleanQ}%,category.ilike.%${cleanQ}%,organization.ilike.%${cleanQ}%,description.ilike.%${cleanQ}%`);
        }
        const { data: exams } = await examQuery;

        (exams || []).forEach(e => {
          const key = e.slug || e.name.toLowerCase();
          if (!seenSlugs.has(key)) {
            seenSlugs.add(key);
            results.push({
              id: e.slug || e.id,
              name: e.name,
              shortName: e.short_name || e.name,
              type: 'EXAM',
              category: e.category || 'Entrance & Competitive Exam',
              categoryLabel: 'Entrance & Competitive Exams',
              badge: e.category,
              hierarchy: `${e.category} • National Examination`,
              description: e.overview || e.description || `National competitive examination conducted by ${e.organization}.`,
              officialSource: e.organization,
              officialUrl: e.notification_url || 'https://nta.ac.in',
              webSearchUrl: googleSearchUrl(`${e.name} official notification syllabus eligibility`),
              targetUrl: `/learn`,
              action: 'navigate',
              payload: { examName: e.name }
            });
          }
        });
      }

      // 4. Career Domains
      if (!type || type === 'ALL' || type === 'CAREER') {
        const { data: careers } = await supabase
          .from('careers')
          .select('*')
          .or(`name.ilike.%${cleanQ}%,category.ilike.%${cleanQ}%,sector.ilike.%${cleanQ}%,overview.ilike.%${cleanQ}%`)
          .limit(4);

        (careers || []).forEach(cr => {
          const key = cr.slug || cr.name.toLowerCase();
          if (!seenSlugs.has(key)) {
            seenSlugs.add(key);
            results.push({
              id: cr.slug || cr.id,
              name: cr.name,
              shortName: cr.name,
              type: 'CAREER',
              category: cr.category || cr.sector || 'Industry Field',
              categoryLabel: 'Career Domain',
              badge: `${cr.demand_score || 90}% High Demand`,
              hierarchy: `${cr.sector || 'Industry'} • Strategic Domain`,
              description: cr.overview || cr.description || `Comprehensive career field covering high-growth professional roles.`,
              webSearchUrl: googleSearchUrl(`${cr.name} career roadmap jobs demand`),
              targetUrl: `/careers/${cr.slug || cr.id}`,
              action: 'navigate',
              payload: { careerName: cr.name }
            });
          }
        });
      }

      // 5. Industry Certifications
      if (!type || type === 'ALL' || type === 'CERTIFICATION') {
        const { data: certs } = await supabase
          .from('certifications')
          .select('*')
          .or(`title.ilike.%${cleanQ}%,issuer.ilike.%${cleanQ}%,category.ilike.%${cleanQ}%,description.ilike.%${cleanQ}%`)
          .limit(4);

        (certs || []).forEach(c => {
          const key = c.slug || c.title.toLowerCase();
          if (!seenSlugs.has(key)) {
            seenSlugs.add(key);
            results.push({
              id: c.slug || c.id,
              name: c.title,
              shortName: c.title,
              type: 'CERTIFICATION',
              category: c.category || 'Professional Credential',
              categoryLabel: 'Certification',
              badge: c.issuer,
              hierarchy: `${c.issuer} • ${c.difficulty || 'Professional'}`,
              description: c.description || `Industry recognized certification in ${c.title}.`,
              officialSource: c.issuer,
              officialUrl: c.official_url,
              webSearchUrl: googleSearchUrl(`${c.title} certification syllabus fee exam`),
              targetUrl: `/learn`,
              action: 'navigate',
              payload: { certTitle: c.title }
            });
          }
        });
      }
    }

    // =========================================================================
    // 3. MongoDB Fallback if results are still sparse (< 3)
    // =========================================================================
    if (results.length < 3 && mongoose.connection.readyState === 1) {
      try {
        const regex = new RegExp(cleanQ, 'i');
        const legacyEntities = await Entity.find({
          $or: [{ name: regex }, { shortName: regex }, { category: regex }, { description: regex }]
        }).limit(10).lean();

        for (const ent of legacyEntities) {
          const key = ent.id || ent.name.toLowerCase();
          if (!seenSlugs.has(key)) {
            seenSlugs.add(key);
            results.push({
              id: ent.id || ent._id,
              name: ent.name,
              shortName: ent.shortName || ent.name,
              type: ent.type || 'STUDY',
              category: ent.category || 'General',
              categoryLabel: (ent.type || 'STUDY').replace(/_/g, ' '),
              badge: ent.educationLevel || ent.organization || ent.category,
              hierarchy: `${ent.category} • ${(ent.type || 'STUDY').replace(/_/g, ' ')}`,
              description: ent.description || ent.overview || `Entity in Future Path database.`,
              targetUrl: ent.type === 'STUDY' ? `/study/${ent.id}` : `/job/${ent.id}`,
              action: ent.type === 'STUDY' ? 'set_education' : 'set_target_job',
              payload: ent.type === 'STUDY' ? { educationName: ent.name } : { targetJobName: ent.name }
            });
          }
        }
      } catch (err) {
        console.warn('[searchController] MongoDB fallback warning:', err.message);
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
