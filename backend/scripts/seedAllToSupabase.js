/**
 * ==============================================================================
 * FUTURE PATH — ALL DATA TO SUPABASE MASTER SEEDER
 * ==============================================================================
 * Populates all 14 tables in Supabase with production-grade educational datasets:
 * 1. Profiles & Users (Shiva, Priya Sharma, Admin)
 * 2. Education Levels (10th, 12th Streams, UG, PG, Doctorate, Diplomas)
 * 3. Studies & Programs (Engineering, Management, Commerce, Medicine, Sciences, Arts)
 * 4. Study Paths (Progression graph between educations)
 * 5. Careers & Strategic Domains
 * 6. Jobs (Private tech & core industry, Government gazetted, Public sector)
 * 7. Skills & Competencies (Technical, Analytical, Tools)
 * 8. Competitive & Entrance Exams (UPSC, GATE, CAT, JEE, CUET, NEET, SSC CGL)
 * 9. Industry Certifications (AWS, Azure, Google Cloud, CFA, PMP, ACCA)
 * 10. Roadmaps & Roadmap Steps (SDE, Data Analyst, Financial Analyst, Cloud Architect)
 * 11. Learning Resources (High-ROI courses, guides, and documentations)
 * 12. Statutory & Official Registry Sources (UGC, AICTE, NTA, UPSC, SSC, NMC, BCI)
 * 13. User Roadmaps & User Skills
 * ==============================================================================
 */

import bcrypt from 'bcryptjs';
import { getSupabaseAdminClient, isSupabaseConfigured } from '../src/config/supabase.js';

// Curated Master Datasets
import { structuredStudies } from '../src/seed/studies.js';
import { structuredJobs } from '../src/seed/jobs.js';
import { structuredCareers } from '../src/seed/careers.js';
import { structuredExams } from '../src/seed/exams.js';
import { structuredCertifications } from '../src/seed/certifications.js';
import { structuredSkills } from '../src/seed/skills.js';
import {
  seedCareerFields,
  seedSkills,
  seedCertifications,
  seedStudyPrograms,
  seedEducations,
  seedSampleJobs,
  seedSampleOpportunities
} from '../src/seeds/seedData.js';

const safeStr = (val, maxLen = 250) => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'object') {
    try {
      return JSON.stringify(val).slice(0, maxLen);
    } catch (_) {
      return String(val).slice(0, maxLen);
    }
  }
  return String(val).slice(0, maxLen);
};

const slugify = (text) => {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 95) || `item-${Date.now()}`;
};

async function chunkUpsert(supabase, table, rows, conflictCol) {
  const chunkSize = 20;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await supabase.from(table).upsert(chunk, { onConflict: conflictCol });
    if (error) {
      console.error(`   ⚠️ [${table}] chunk error (${i}..${i + chunk.length}):`, error.message);
    }
  }
}

async function seedAll() {
  console.log('\n====================================================================');
  console.log('🚀 FUTURE PATH — SEEDING ALL PROJECT DATA TO SUPABASE');
  console.log('====================================================================\n');

  if (!isSupabaseConfigured()) {
    console.error('❌ Error: Supabase credentials not configured in backend/.env.');
    process.exit(1);
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    console.error('❌ Error: Could not instantiate Supabase admin client.');
    process.exit(1);
  }

  // --------------------------------------------------------------------------
  // 1. PROFILES & USERS
  // --------------------------------------------------------------------------
  console.log('📦 [1/13] Seeding Profiles & User Accounts...');
  const defaultPasswordHash = await bcrypt.hash('FuturePath2026!', 10);

  const initialProfiles = [
    {
      name: 'Shiva',
      email: 'shiva@example.com',
      role: 'user',
      headline: 'Active Learner & Future Path Explorer',
      current_education: 'B.Tech Computer Science',
      education_level: 'Undergraduate',
      education_status: 'currently_studying',
      specialization: 'Artificial Intelligence & Distributed Systems',
      target_job: 'Software Development Engineer (SDE)',
      target_career: 'Computer Science, Software & AI Systems',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'System Design'],
      location: { country: 'India', city: 'Bengaluru' },
      preferences: {
        password_hash: defaultPasswordHash,
        learningMode: 'hybrid',
        willingToRelocate: true,
        weeklyStudyHours: 20
      }
    },
    {
      name: 'Priya Sharma',
      email: 'demo@careercompass.ai',
      role: 'user',
      headline: 'B.Com Graduate | Aspiring Financial & Business Analyst',
      current_education: 'B.Com',
      education_level: 'Undergraduate',
      education_status: 'completed',
      specialization: 'Accounting & Corporate Finance',
      target_job: 'Corporate Financial Analyst',
      target_career: 'Accounting, Banking & Corporate Finance',
      skills: ['Financial Modeling', 'Advanced Excel', 'Power BI', 'Corporate Accounting', 'Tally Prime'],
      location: { country: 'India', city: 'Mumbai' },
      preferences: {
        password_hash: defaultPasswordHash,
        learningMode: 'online',
        weeklyStudyHours: 15
      }
    },
    {
      name: 'System Administrator',
      email: 'admin@careercompass.ai',
      role: 'admin',
      headline: 'Platform Content Director & Education Analyst',
      current_education: 'M.Tech Computer Science',
      education_level: 'Postgraduate',
      education_status: 'completed',
      specialization: 'Information Security & Cloud Infrastructure',
      target_job: 'Chief Technology Officer',
      target_career: 'Computer Science, Software & AI Systems',
      skills: ['System Design', 'Cloud Architecture', 'PostgreSQL', 'Microservices', 'Kubernetes'],
      location: { country: 'India', city: 'Bengaluru' },
      preferences: {
        password_hash: defaultPasswordHash,
        adminRole: 'super_admin'
      }
    }
  ];

  await chunkUpsert(supabase, 'profiles', initialProfiles, 'email');
  console.log(`   ✅ Seeded ${initialProfiles.length} User Profiles.`);

  // Fetch Shiva profile for relational links
  const { data: shivaProfile } = await supabase.from('profiles').select('id').eq('email', 'shiva@example.com').single();

  // --------------------------------------------------------------------------
  // 2. EDUCATION LEVELS
  // --------------------------------------------------------------------------
  console.log('📦 [2/13] Seeding Education Levels...');
  const eduRows = (seedEducations || []).map((e, idx) => ({
    name: safeStr(e.name || e.title, 95),
    code: safeStr(e.code || `EDU_${idx + 1}`, 45),
    tier_order: idx + 1,
    description: safeStr(e.description || e.eligibility || '', 500)
  }));
  if (eduRows.length > 0) {
    await chunkUpsert(supabase, 'education_levels', eduRows, 'name');
    console.log(`   ✅ Seeded ${eduRows.length} Education Levels.`);
  }

  // --------------------------------------------------------------------------
  // 3. STUDIES & PROGRAMS
  // --------------------------------------------------------------------------
  console.log('📦 [3/13] Seeding Studies & Degree Programs...');
  const combinedStudies = [...(structuredStudies || []), ...(seedStudyPrograms || [])];
  const studyMap = new Map();
  combinedStudies.forEach(s => {
    const key = (s.name || s.title || '').trim().toLowerCase();
    if (key && !studyMap.has(key)) studyMap.set(key, s);
  });
  const studyRows = Array.from(studyMap.values()).map(s => {
    const name = safeStr(s.name || s.title || 'Course', 240);
    const durationStr = safeStr(s.duration || (s.durationYears ? `${s.durationYears} Years` : '3 Years'), 45);
    return {
      slug: slugify(s.slug || name),
      name: name,
      short_name: safeStr(s.shortName || name, 95),
      category: safeStr(s.category || s.level || s.degree || 'General', 95),
      education_level: safeStr(s.educationLevel || s.level || 'Undergraduate', 95),
      duration: durationStr,
      description: s.description || s.overview || '',
      overview: s.overview || s.description || '',
      career_options: Array.isArray(s.jobRoles || s.careerOpportunities) ? (s.jobRoles || s.careerOpportunities) : [],
      higher_studies: Array.isArray(s.higherEducationOptions || s.higherEducation) ? (s.higherEducationOptions || s.higherEducation) : [],
      verified: true
    };
  });
  if (studyRows.length > 0) {
    await chunkUpsert(supabase, 'studies', studyRows, 'slug');
    console.log(`   ✅ Seeded ${studyRows.length} Study Degree Programs.`);
  }

  // --------------------------------------------------------------------------
  // 4. STUDY PATHWAYS
  // --------------------------------------------------------------------------
  console.log('📦 [4/13] Seeding Study Progression Pathways...');
  const samplePaths = [
    // --- AFTER 10TH PATHWAYS ---
    { from: '10th', to: '11th & 12th (Science PCM)', type: 'DIRECT', duration: 2.0, note: 'Foundation for Engineering, Architecture, Defence, Pure Sciences, and Computer Applications.' },
    { from: '10th', to: '11th & 12th (Science PCB)', type: 'DIRECT', duration: 2.0, note: 'Foundation for Medicine (MBBS), Dentistry, Nursing, Pharmacy, Physiotherapy, and Life Sciences.' },
    { from: '10th', to: '11th & 12th (Commerce)', type: 'DIRECT', duration: 2.0, note: 'Standard commerce pathway exploring Accountancy, Economics, Business Studies, and Taxation.' },
    { from: '10th', to: '11th & 12th (Arts / Humanities)', type: 'DIRECT', duration: 2.0, note: 'Humanities stream exploring Economics, Psychology, Political Science, History, and Law.' },
    { from: '10th', to: 'Polytechnic Engineering Diploma', type: 'DIRECT', duration: 3.0, note: '3-year technical vocational engineering diploma with direct lateral entry into B.Tech.' },
    { from: '10th', to: 'Industrial Training Institute (ITI)', type: 'DIRECT', duration: 2.0, note: 'Direct practical vocational trades (Electrician, Fitter, Machinist).' },

    // --- AFTER 12TH SCIENCE PCM PATHWAYS ---
    { from: '12th Science PCM', to: 'Bachelor of Technology (B.Tech CSE)', type: 'DIRECT', duration: 4.0, note: 'Admission via JEE Main, JEE Advanced, BITSAT, or State CETs.' },
    { from: '12th Science PCM', to: 'B.Tech in Artificial Intelligence & Data Science', type: 'DIRECT', duration: 4.0, note: 'Specialized 4-year engineering program in AI, neural networks, and machine learning.' },
    { from: '12th Science PCM', to: 'B.Tech in Mechanical Engineering', type: 'DIRECT', duration: 4.0, note: 'Core engineering degree in automotive, robotics, CAD/FEA, and thermodynamics.' },
    { from: '12th Science PCM', to: 'B.Tech in Civil Engineering', type: 'DIRECT', duration: 4.0, note: 'Infrastructure, structural analysis, and smart city construction engineering.' },
    { from: '12th Science PCM', to: 'B.Tech in Electrical & Electronics Engineering', type: 'DIRECT', duration: 4.0, note: 'Power grids, EV powertrains, renewable energy, and microelectronics.' },
    { from: '12th Science PCM', to: 'Bachelor of Architecture (B.Arch)', type: 'DIRECT', duration: 5.0, note: 'Admission via NATA or JEE Main Paper 2 for 5-year Council of Architecture degree.' },
    { from: '12th Science PCM', to: 'Bachelor of Design (B.Des)', type: 'DIRECT', duration: 4.0, note: 'Admission via UCEED / NID DAT for UI/UX, product, and industrial design.' },
    { from: '12th Science PCM', to: 'B.Sc in Data Science & Artificial Intelligence', type: 'DIRECT', duration: 3.0, note: 'Modern mathematical and computational degree in predictive analytics.' },
    { from: '12th Science PCM', to: 'National Defence Academy (NDA & NA - Officer Cadre)', type: 'DIRECT', duration: 3.0, note: 'UPSC NDA exam entry for Air Force, Navy, and Army Officer commissioning.' },
    { from: '12th Science PCM', to: 'Bachelor of Computer Applications (BCA)', type: 'DIRECT', duration: 3.0, note: 'Fast-track practical software programming and database degree.' },

    // --- AFTER 12TH SCIENCE PCB PATHWAYS ---
    { from: '12th Science PCB', to: 'Bachelor of Medicine & Surgery (MBBS)', type: 'LICENSE_REQUIRED', duration: 5.5, note: 'Mandatory NEET-UG qualification; 4.5-year degree + 1-year compulsory internship.' },
    { from: '12th Science PCB', to: 'Bachelor of Dental Surgery (BDS)', type: 'LICENSE_REQUIRED', duration: 5.0, note: 'Admission via NEET-UG for Dental Council of India (DCI) recognized surgery.' },
    { from: '12th Science PCB', to: 'B.Sc Nursing', type: 'DIRECT', duration: 4.0, note: 'INC-approved clinical degree with universal global hospital demand.' },
    { from: '12th Science PCB', to: 'Bachelor of Pharmacy (B.Pharm)', type: 'DIRECT', duration: 4.0, note: 'Pharmacy Council of India accredited degree for pharmaceutical formulations.' },
    { from: '12th Science PCB', to: 'Bachelor of Physiotherapy (BPT)', type: 'DIRECT', duration: 4.5, note: '4 years academic + 6 months internship in rehabilitation and musculoskeletal care.' },
    { from: '12th Science PCB', to: 'B.Sc Agriculture (Honours)', type: 'DIRECT', duration: 4.0, note: 'ICAR-accredited degree in precision farming, agronomy, and soil science.' },

    // --- AFTER 12TH COMMERCE PATHWAYS ---
    { from: '12th Commerce', to: 'Bachelor of Commerce (B.Com)', type: 'DIRECT', duration: 3.0, note: 'Standard 3-4 year commerce graduation under NEP 2020 framework.' },
    { from: '12th Commerce', to: 'Bachelor of Business Administration (BBA)', type: 'DIRECT', duration: 3.0, note: 'Management undergraduate program with specialization in Finance, Marketing, HR.' },
    { from: '12th Commerce', to: 'ICAI Chartered Accountancy (CA Foundation)', type: 'DIRECT', duration: 4.0, note: 'Statutory accounting charter comprising Foundation, Inter, Articleship, and Final.' },
    { from: '12th Commerce', to: 'ICSI Company Secretary (CSEET)', type: 'DIRECT', duration: 3.0, note: 'Corporate governance and mercantile law statutory credential.' },
    { from: '12th Commerce', to: 'Integrated BBA LLB / B.Com LLB (Hons)', type: 'DIRECT', duration: 5.0, note: 'Admission via CLAT for 5-year corporate law and governance degree.' },
    { from: '12th Commerce', to: 'Bachelor of Hotel Management (BHM)', type: 'DIRECT', duration: 3.0, note: 'Admission via NCHMCT JEE for luxury hospitality and tourism leadership.' },

    // --- AFTER 12TH ARTS / HUMANITIES PATHWAYS ---
    { from: '12th Arts / Humanities', to: 'BA in Economics (Honours)', type: 'DIRECT', duration: 3.0, note: 'Rigorous quantitative economics, econometrics, and public policy degree.' },
    { from: '12th Arts / Humanities', to: 'BA in Psychology & Behavioral Sciences', type: 'DIRECT', duration: 3.0, note: 'Clinical psychology, counseling, psychometrics, and human behavior study.' },
    { from: '12th Arts / Humanities', to: 'Integrated BA LLB (Hons)', type: 'DIRECT', duration: 5.0, note: '5-year integrated law degree at premier National Law Universities (NLUs).' },
    { from: '12th Arts / Humanities', to: 'Bachelor of Journalism & Mass Communication (BJMC)', type: 'DIRECT', duration: 3.0, note: 'Media, investigative journalism, digital broadcasting, and public relations.' },

    // --- UNDERGRADUATE TO POSTGRADUATE & CAREER DESTINATIONS ---
    { from: 'B.Com', to: 'Master of Business Administration (MBA)', type: 'DIRECT', duration: 2.0, note: 'Entry via CAT / XAT / GMAT for managerial finance and corporate strategy.' },
    { from: 'B.Com', to: 'Chartered Financial Analyst (CFA Global)', type: 'RELATED', duration: 2.5, note: 'Global investment and portfolio valuation credential.' },
    { from: 'B.Com', to: 'Bank Probationary Officer (IBPS / SBI PO)', type: 'DIRECT', duration: 1.0, note: 'Entry into Scale-I managerial officer cadre in nationalized commercial banks.' },
    { from: 'B.Com', to: 'Central Government Inspector (SSC CGL)', type: 'DIRECT', duration: 1.0, note: 'Income Tax Inspector, GST Inspector, and CAG Auditor via SSC CGL.' },

    { from: 'B.Tech Computer Science', to: 'Master of Technology (M.Tech CSE)', type: 'DIRECT', duration: 2.0, note: 'Via GATE for advanced research in distributed AI and computer systems.' },
    { from: 'B.Tech Computer Science', to: 'Software Development Engineer (SDE)', type: 'DIRECT', duration: 0.5, note: 'Direct campus placement or portfolio transition into top tier tech.' },
    { from: 'B.Tech Computer Science', to: 'Master of Business Administration (MBA)', type: 'POSSIBLE_WITH_SKILLS', duration: 2.0, note: 'Tech management, product management, and venture capital leadership.' },

    { from: 'B.Tech Mechanical', to: 'Mechanical Design & Robotics Engineer', type: 'DIRECT', duration: 0.5, note: 'CAD/FEA modeling in automotive, aerospace, and robotics.' },
    { from: 'B.Tech Mechanical', to: 'PSU Executive Engineer (via GATE)', type: 'DIRECT', duration: 1.0, note: 'Direct recruitment in IOCL, ONGC, NTPC, BHEL, ISRO, and DRDO.' },

    { from: 'B.Tech Civil', to: 'Civil & Structural Infrastructure Engineer', type: 'DIRECT', duration: 0.5, note: 'High-speed rail, expressways, smart cities, and high-rise structural design.' },
    { from: 'B.Tech Civil', to: 'UPSC Engineering Services (ESE / IES)', type: 'DIRECT', duration: 1.0, note: 'Class 1 Gazetted Civil Engineer in CPWD, Indian Railways, and Border Roads.' },

    { from: 'MBBS', to: 'Doctor of Medicine (MD) / Master of Surgery (MS)', type: 'LICENSE_REQUIRED', duration: 3.0, note: 'Admission via NEET-PG or INI-CET for clinical specialist residency.' },
    { from: 'MBBS', to: 'Resident Medical Officer (RMO)', type: 'DIRECT', duration: 0.0, note: 'Immediate hospital practice post-NMC registration.' },

    { from: 'BA LLB', to: 'Corporate Legal Counsel & M&A Lawyer', type: 'DIRECT', duration: 0.5, note: 'High-earning commercial law firms, M&A due diligence, and corporate advisory.' },
    { from: 'BA LLB', to: 'Judicial Magistrate (State Judicial Services)', type: 'DIRECT', duration: 1.0, note: 'Civil Judge Junior Division appointment via State Judicial Services Exam.' },

    { from: 'Any Bachelor Degree', to: 'UPSC Civil Services (IAS / IPS / IFS)', type: 'DIRECT', duration: 1.5, note: 'Sovereign public policy, district administration, and police leadership.' },
    { from: 'Any Bachelor Degree', to: 'UPSC Combined Defence Services (CDS)', type: 'DIRECT', duration: 1.0, note: 'Commissioned Officer in Indian Military Academy (IMA) or OTA Chennai.' },

    { from: 'Polytechnic Engineering Diploma', to: 'Bachelor of Technology (B.Tech)', type: 'LATERAL', duration: 3.0, note: 'Direct lateral entry into 2nd year of B.Tech via State Lateral CET.' }
  ];

  const pathRows = samplePaths.map(p => ({
    from_education_name: p.from,
    to_education_name: p.to,
    relationship_type: p.type,
    duration_years: p.duration,
    eligibility_note: p.note
  }));

  // Clean insert of paths
  await supabase.from('study_paths').delete().neq('from_education_name', '___dummy___');
  await supabase.from('study_paths').insert(pathRows);
  console.log(`   ✅ Seeded ${pathRows.length} Verified Study Pathways.`);

  // --------------------------------------------------------------------------
  // 5. CAREER DOMAINS
  // --------------------------------------------------------------------------
  console.log('📦 [5/13] Seeding Career Domains...');
  const combinedCareers = [...(structuredCareers || []), ...(seedCareerFields || [])];
  const careerMap = new Map();
  combinedCareers.forEach(cr => {
    const key = (cr.name || cr.title || '').trim().toLowerCase();
    if (key && !careerMap.has(key)) careerMap.set(key, cr);
  });
  const careerRows = Array.from(careerMap.values()).map(cr => {
    const name = safeStr(cr.name || cr.title || 'Career Domain', 240);
    return {
      slug: slugify(cr.slug || name),
      name: name,
      category: safeStr(cr.category || 'General', 95),
      sector: safeStr(cr.sector || 'Industry & Enterprise', 95),
      overview: cr.overview || cr.description || '',
      description: cr.description || '',
      demand_score: Number(cr.highDemandScore || cr.demand_score) || 88,
      growth_outlook: safeStr(cr.growthOutlook || 'Steady Growth', 95),
      typical_roles: Array.isArray(cr.typical_roles || cr.topIndustries) ? (cr.typical_roles || cr.topIndustries) : [],
      required_skills: Array.isArray(cr.required_skills) ? cr.required_skills : [],
      top_hirers: Array.isArray(cr.topIndustries) ? cr.topIndustries : []
    };
  });
  if (careerRows.length > 0) {
    await chunkUpsert(supabase, 'careers', careerRows, 'slug');
    console.log(`   ✅ Seeded ${careerRows.length} Career Domains.`);
  }

  // --------------------------------------------------------------------------
  // 6. JOBS (PRIVATE & GOVERNMENT)
  // --------------------------------------------------------------------------
  console.log('📦 [6/13] Seeding Jobs & Professional Roles...');
  const combinedJobs = [...(structuredJobs || []), ...(seedSampleJobs || [])];
  const jobMap = new Map();
  combinedJobs.forEach(j => {
    const key = (j.title || j.name || '').trim().toLowerCase();
    if (key && !jobMap.has(key)) jobMap.set(key, j);
  });
  const jobRows = Array.from(jobMap.values()).map(j => {
    const title = safeStr(j.title || j.name || 'Job Role', 240);
    return {
      slug: slugify(j.slug || title),
      title: title,
      category: safeStr(j.category || j.type || (j.sector === 'Government' ? 'Government' : 'Private'), 95),
      job_type: safeStr(j.category === 'Government' ? 'GOVERNMENT_JOB' : 'JOB', 45),
      sector: safeStr(j.sector || j.domain || 'Technology & Industry', 95),
      description: j.description || j.overview || '',
      overview: j.overview || j.description || '',
      eligibility_note: safeStr(j.eligibility || j.minimumEducation || 'Graduation / Relevant qualification', 1000),
      minimum_education: safeStr(j.minimumEducation || j.eligibility || 'Graduation', 240),
      required_skills: Array.isArray(j.requiredSkills || j.skills || j.tools) ? (j.requiredSkills || j.skills || j.tools) : [],
      tools: Array.isArray(j.tools) ? j.tools : [],
      top_companies: Array.isArray(j.topCompanies) ? j.topCompanies : (j.company ? [j.company] : ['Leading Enterprises'])
    };
  });
  if (jobRows.length > 0) {
    await chunkUpsert(supabase, 'jobs', jobRows, 'slug');
    console.log(`   ✅ Seeded ${jobRows.length} Private & Government Jobs.`);
  }

  // --------------------------------------------------------------------------
  // 7. SKILLS
  // --------------------------------------------------------------------------
  console.log('📦 [7/13] Seeding Skills & Competencies...');
  const combinedSkills = [...(structuredSkills || []), ...(seedSkills || [])];
  const skillUniqMap = new Map();
  combinedSkills.forEach(sk => {
    const key = (sk.name || sk.title || '').trim().toLowerCase();
    if (key && !skillUniqMap.has(key)) skillUniqMap.set(key, sk);
  });
  const skillRows = Array.from(skillUniqMap.values()).map(sk => {
    const name = safeStr(sk.name || sk.title || 'Skill', 240);
    return {
      slug: slugify(sk.slug || name),
      name: name,
      category: safeStr(sk.category || sk.type || 'Technical', 95),
      demand_level: safeStr(sk.demand_level || 'High', 45),
      description: sk.description || `Mastery of ${name} for career advancement.`
    };
  });
  if (skillRows.length > 0) {
    await chunkUpsert(supabase, 'skills', skillRows, 'name');
    console.log(`   ✅ Seeded ${skillRows.length} Skills.`);
  }

  // --------------------------------------------------------------------------
  // 8. EXAMS
  // --------------------------------------------------------------------------
  console.log('📦 [8/13] Seeding Competitive & Entrance Exams...');
  const examRows = (structuredExams || []).map(e => {
    const name = safeStr(e.name || e.title || 'Exam', 240);
    return {
      slug: slugify(e.slug || name),
      name: name,
      short_name: safeStr(e.shortName || name, 95),
      category: safeStr(e.category || 'Competitive & Entrance', 95),
      qualification: safeStr(e.eligibility || 'Any Graduation / 12th Pass', 240),
      organization: safeStr(e.conductingBody || e.authority || 'National Testing Agency / Respective Board', 240),
      description: e.description || '',
      overview: e.overview || e.description || '',
      notification_url: safeStr(e.website || e.officialWebsite || e.portalUrl || 'https://nta.ac.in', 500)
    };
  });
  if (examRows.length > 0) {
    await chunkUpsert(supabase, 'exams', examRows, 'slug');
    console.log(`   ✅ Seeded ${examRows.length} Competitive & Entrance Exams.`);
  }

  // --------------------------------------------------------------------------
  // 9. CERTIFICATIONS
  // --------------------------------------------------------------------------
  console.log('📦 [9/13] Seeding Industry Certifications...');
  const combinedCerts = [...(structuredCertifications || []), ...(seedCertifications || [])];
  const certMap = new Map();
  combinedCerts.forEach(c => {
    const key = (c.name || c.title || '').trim().toLowerCase();
    if (key && !certMap.has(key)) certMap.set(key, c);
  });
  const certRows = Array.from(certMap.values()).map(c => {
    const title = safeStr(c.name || c.title || 'Certification', 240);
    return {
      slug: slugify(c.slug || title),
      title: title,
      issuer: safeStr(c.provider || c.issuingBody || 'Industry Standard Body', 240),
      category: safeStr(c.domain || c.category || 'General', 95),
      difficulty: safeStr(c.level || 'Intermediate', 45),
      skills: Array.isArray(c.skillsCovered || c.skills) ? (c.skillsCovered || c.skills) : [],
      official_url: safeStr(c.url || c.link || '', 500),
      description: c.description || `Industry recognized credential in ${title}.`
    };
  });
  if (certRows.length > 0) {
    await chunkUpsert(supabase, 'certifications', certRows, 'slug');
    console.log(`   ✅ Seeded ${certRows.length} Industry Certifications.`);
  }

  // --------------------------------------------------------------------------
  // 10. ROADMAPS & ROADMAP STEPS
  // --------------------------------------------------------------------------
  console.log('📦 [10/13] Seeding Roadmaps & Roadmap Milestones...');
  const curatedRoadmaps = [
    {
      slug: 'software-development-engineer',
      title: 'Software Development Engineer (SDE) Pathway',
      starting_education: 'B.Tech Computer Science',
      target_role: 'Software Development Engineer (SDE)',
      target_career: 'Computer Science, Software & AI Systems',
      estimated_months: 6,
      difficulty: 'Intermediate',
      overview: 'Comprehensive zero-to-offer engineering roadmap covering modern full-stack development, data structures, and system design.',
      steps: [
        {
          step_number: 1,
          title: 'Master Modern JavaScript & TypeScript Foundations',
          type: 'FOUNDATION',
          description: 'Deep dive into asynchronous programming, ES6+ semantics, type systems, and event loop architecture.',
          estimated_hours: 40,
          skills: ['JavaScript', 'TypeScript', 'Node.js', 'Async/Await']
        },
        {
          step_number: 2,
          title: 'Data Structures & Algorithmic Problem Solving',
          type: 'SKILL',
          description: 'Practice high-frequency interview patterns: 2-pointers, sliding window, binary search trees, and dynamic programming.',
          estimated_hours: 60,
          skills: ['Data Structures', 'Algorithms', 'LeetCode Patterns', 'Time Complexity']
        },
        {
          step_number: 3,
          title: 'Full Stack Web Architecture & RESTful Microservices',
          type: 'PROJECT',
          description: 'Build and deploy a scalable microservices architecture with React, Express, Supabase PostgreSQL, and JWT auth.',
          estimated_hours: 50,
          skills: ['React', 'PostgreSQL', 'REST APIs', 'Supabase', 'Tailwind CSS']
        },
        {
          step_number: 4,
          title: 'System Design, Caching & Cloud Deployment',
          type: 'PROJECT',
          description: 'Learn load balancing, horizontal scaling, Redis caching, Docker containerization, and AWS hosting.',
          estimated_hours: 45,
          skills: ['System Design', 'Docker', 'AWS', 'Redis', 'CI/CD']
        },
        {
          step_number: 5,
          title: 'Portfolio Polish & Technical Mock Interviews',
          type: 'MILESTONE',
          description: 'Refine GitHub portfolio, build live interactive demos, write clean technical documentation, and practice mock rounds.',
          estimated_hours: 30,
          skills: ['Resume Optimization', 'Mock Interviews', 'Git & GitHub', 'Technical Writing']
        }
      ]
    },
    {
      slug: 'data-analyst-bi-specialist',
      title: 'Data Analyst & Business Intelligence Pathway',
      starting_education: 'B.Com / Any Graduate',
      target_role: 'Data Analyst / BI Specialist',
      target_career: 'Accounting, Banking & Corporate Finance',
      estimated_months: 5,
      difficulty: 'Beginner to Intermediate',
      overview: 'End-to-end data pathway mastering SQL queries, Power BI dashboards, advanced statistical Excel, and Python data manipulation.',
      steps: [
        {
          step_number: 1,
          title: 'Advanced Business Analytics with Microsoft Excel',
          type: 'FOUNDATION',
          description: 'Master XLOOKUP, Pivot tables, Power Query ETL, financial formulas, and interactive dynamic charting.',
          estimated_hours: 35,
          skills: ['Advanced Excel', 'Power Query', 'Data Cleaning', 'Financial Modeling']
        },
        {
          step_number: 2,
          title: 'Relational Database Querying with SQL',
          type: 'SKILL',
          description: 'Write complex joins, window functions, CTEs, aggregation rollups, and performance indexes.',
          estimated_hours: 45,
          skills: ['SQL', 'PostgreSQL', 'Window Functions', 'Query Optimization']
        },
        {
          step_number: 3,
          title: 'Business Intelligence & Executive Dashboards (Power BI / Tableau)',
          type: 'PROJECT',
          description: 'Build end-to-end interactive enterprise dashboards using DAX measures and dimensional data modeling.',
          estimated_hours: 40,
          skills: ['Power BI', 'DAX', 'Data Visualization', 'Tableau']
        },
        {
          step_number: 4,
          title: 'Exploratory Data Analysis with Python (Pandas & Seaborn)',
          type: 'PROJECT',
          description: 'Clean messy real-world datasets, perform hypothesis testing, and generate automated visual insights.',
          estimated_hours: 40,
          skills: ['Python', 'Pandas', 'NumPy', 'Seaborn']
        }
      ]
    },
    {
      slug: 'civil-services-ias-officer',
      title: 'Civil Services (IAS / IPS) Officer Pathway',
      starting_education: 'Any Graduation / Bachelor’s Degree',
      target_role: 'IAS Officer (Indian Administrative Service)',
      target_career: 'Public Governance, Civil Services & Public Policy',
      estimated_months: 18,
      difficulty: 'Advanced / High-Stakes',
      overview: 'Comprehensive sovereign roadmap for clearing the UPSC Civil Services Examination covering Prelims, Mains, Optional specialization, and Personality Interview.',
      steps: [
        {
          step_number: 1,
          title: 'Foundation in NCERTs, Indian Constitution & Polity',
          type: 'FOUNDATION',
          description: 'Thoroughly master NCERT Class 6-12 basics and Indian Polity (M. Laxmikanth): preamble, fundamental rights, parliament, and judiciary.',
          estimated_hours: 80,
          skills: ['Indian Polity', 'Constitutional Law', 'Governance', 'Current Affairs']
        },
        {
          step_number: 2,
          title: 'Prelims Mastery (General Studies Paper-I & CSAT)',
          type: 'SKILL',
          description: 'Rigorous preparation for Prelims: Modern History, Geography, Environment & Ecology, Economy, and CSAT quantitative aptitude.',
          estimated_hours: 120,
          skills: ['Prelims MCQs', 'CSAT Aptitude', 'Economic Survey', 'Environmental Ecology']
        },
        {
          step_number: 3,
          title: 'Mains Analytical Answer Writing & Ethics (GS 1 to 4)',
          type: 'PROJECT',
          description: 'Daily answer writing practice covering Indian Society, International Relations, Internal Security, Disaster Management, and Ethics Case Studies (GS 4).',
          estimated_hours: 140,
          skills: ['Mains Answer Writing', 'Ethics Case Studies', 'International Relations', 'Internal Security']
        },
        {
          step_number: 4,
          title: 'Optional Subject In-Depth Specialization',
          type: 'SKILL',
          description: 'Deep dive into optional subject (Sociology, PSIR, Geography, History, or Public Administration) across 2 detailed papers (500 marks).',
          estimated_hours: 160,
          skills: ['Optional Subject Mastery', 'Scholarly Perspectives', 'Critical Analysis']
        },
        {
          step_number: 5,
          title: 'Essay Paper Polish & Personality Mock Interviews',
          type: 'MILESTONE',
          description: 'Write multi-dimensional philosophical essays, review Detailed Application Form (DAF), and face former ambassador / civil servant mock panels.',
          estimated_hours: 60,
          skills: ['Philosophical Essay Writing', 'DAF Preparation', 'Personality & Spoken Polish', 'Crisis Leadership']
        }
      ]
    },
    {
      slug: 'medical-doctor-mbbs-residency',
      title: 'Medical Doctor & Specialist Residency Pathway',
      starting_education: '12th Science (PCB)',
      target_role: 'Physician / Resident Medical Officer (MBBS / MD)',
      target_career: 'Healthcare, Medicine & Clinical Sciences',
      estimated_months: 66,
      difficulty: 'Rigorous Clinical',
      overview: 'Complete healthcare pathway from NEET-UG qualification, pre-clinical anatomy, clinical postings, 1-year hospital internship to MD/MS residency.',
      steps: [
        {
          step_number: 1,
          title: 'NEET-UG Qualification & Pre-Clinical Foundations',
          type: 'FOUNDATION',
          description: 'Master NEET-UG biology/chemistry/physics to secure MBBS seat, followed by Year 1 Anatomy dissection, Physiology, and Biochemistry.',
          estimated_hours: 200,
          skills: ['Human Gross Anatomy', 'Physiological Systems', 'Medical Biochemistry']
        },
        {
          step_number: 2,
          title: 'Para-Clinical Pharmacology, Pathology & Microbiology',
          type: 'SKILL',
          description: 'Understand disease mechanisms, bacterial/viral infections, histopathology, forensic medicine, and systemic pharmacology.',
          estimated_hours: 180,
          skills: ['Pharmacology', 'General Pathology', 'Microbiology', 'Forensic Medicine']
        },
        {
          step_number: 3,
          title: 'Clinical Rotations (Medicine, Surgery, OBGYN, Pediatrics)',
          type: 'PROJECT',
          description: 'Hands-on ward postings taking patient clinical histories, observing major surgical procedures, and diagnosing inpatient conditions.',
          estimated_hours: 220,
          skills: ['Clinical Examination', 'Emergency Medicine', 'Pediatrics', 'Surgical Assisting']
        },
        {
          step_number: 4,
          title: 'Compulsory Rotating Medical Internship (CRMI)',
          type: 'MILESTONE',
          description: '12 months of high-intensity rotating internship managing ER trauma, IV lines, labor room deliveries, and community health centers.',
          estimated_hours: 300,
          skills: ['ACLS/BLS Resuscitation', 'Inpatient Ward Management', 'Trauma Triage', 'NMC Licensing']
        },
        {
          step_number: 5,
          title: 'NEET-PG / INI-CET Clinical Specialist Residency',
          type: 'MILESTONE',
          description: 'Qualify NEET-PG or INI-CET to secure 3-year MD/MS residency in General Medicine, Pediatrics, Surgery, or Radiology.',
          estimated_hours: 150,
          skills: ['Specialist Medical Practice', 'Clinical Research', 'Super-Specialty Sub-Residency']
        }
      ]
    },
    {
      slug: 'chartered-accountant-icai',
      title: 'Chartered Accountant (ICAI CA) Professional Pathway',
      starting_education: '12th Commerce / B.Com',
      target_role: 'Chartered Accountant (CA) & Statutory Auditor',
      target_career: 'Accounting, Banking & Corporate Finance',
      estimated_months: 48,
      difficulty: 'Advanced Professional',
      overview: 'Statutory qualification pathway governed by ICAI covering CA Foundation, Intermediate Groups, 2-year practical articleship, and CA Final.',
      steps: [
        {
          step_number: 1,
          title: 'CA Foundation Examination Mastery',
          type: 'FOUNDATION',
          description: 'Clear the 4 Foundation papers: Principles of Accounting, Business Laws, Quantitative Aptitude, and Business Economics.',
          estimated_hours: 80,
          skills: ['Double Entry Bookkeeping', 'Mercantile Law', 'Business Mathematics', 'Microeconomics']
        },
        {
          step_number: 2,
          title: 'CA Intermediate (Group 1 & Group 2)',
          type: 'SKILL',
          description: 'Master Corporate Accounting, Cost Management, Taxation (Direct & GST), Auditing & Ethics, and Financial Management.',
          estimated_hours: 180,
          skills: ['Advanced Accounting', 'GST & Income Tax Computation', 'Auditing Standards', 'Financial Management']
        },
        {
          step_number: 3,
          title: 'Mandatory 2-Year Practical Articleship Training',
          type: 'PROJECT',
          description: 'Complete hands-on articleship in an accredited CA audit firm conducting statutory audits, tax returns, and client advisory.',
          estimated_hours: 400,
          skills: ['Statutory Audit Execution', 'Tax Filing Portals', 'Ind AS / IFRS Application', 'Client Interaction']
        },
        {
          step_number: 4,
          title: 'CA Final Examination & ICAI Membership',
          type: 'MILESTONE',
          description: 'Clear CA Final (Financial Reporting, Advanced Financial Management, Advanced Auditing, Direct/Indirect Tax Laws) to earn the CA charter.',
          estimated_hours: 200,
          skills: ['IFRS Consolidation', 'Strategic Financial Management', 'Forensic Audit', 'Corporate Advisory']
        }
      ]
    },
    {
      slug: 'ui-ux-product-designer',
      title: 'UI/UX Product Designer Pathway',
      starting_education: 'Any Graduation / B.Des / B.Tech',
      target_role: 'UI/UX Product Designer',
      target_career: 'Digital Product Design, UI/UX & Creative Media',
      estimated_months: 6,
      difficulty: 'Beginner to Intermediate',
      overview: 'Project-driven design pathway mastering Figma, UX research methods, design systems, interactive prototyping, and case study presentation.',
      steps: [
        {
          step_number: 1,
          title: 'Figma Mastery & Visual Design Foundations',
          type: 'FOUNDATION',
          description: 'Master auto-layout, components, variants, design tokens, typography scales, and 8pt grid layouts in Figma.',
          estimated_hours: 40,
          skills: ['Figma', 'Auto-Layout', 'Typography', 'Color Theory', 'Grid Systems']
        },
        {
          step_number: 2,
          title: 'User Research & Information Architecture',
          type: 'SKILL',
          description: 'Conduct user interviews, synthesize personas, journey maps, card sorting, and define intuitive site maps.',
          estimated_hours: 45,
          skills: ['User Research', 'Empathy Mapping', 'Information Architecture', 'User Flows']
        },
        {
          step_number: 3,
          title: 'Wireframing & Scalable Design Systems',
          type: 'PROJECT',
          description: 'Build low-fidelity wireframes followed by a complete scalable UI component library adhering to accessibility standards (WCAG).',
          estimated_hours: 50,
          skills: ['Wireframing', 'Design Systems', 'WCAG Accessibility', 'UI Components']
        },
        {
          step_number: 4,
          title: 'Interactive Prototyping & Usability Testing',
          type: 'PROJECT',
          description: 'Create advanced interactive prototypes with smart animate micro-interactions and conduct moderated usability tests.',
          estimated_hours: 45,
          skills: ['Smart Animate', 'Micro-interactions', 'Usability Testing', 'Heuristic Evaluation']
        },
        {
          step_number: 5,
          title: 'Portfolio Case Studies & Design Interview Prep',
          type: 'MILESTONE',
          description: 'Publish 2 in-depth case studies on personal website/Behance and practice whiteboard design challenges and app critiques.',
          estimated_hours: 35,
          skills: ['Case Study Writing', 'Whiteboard Challenge', 'App Critique', 'Portfolio Presentation']
        }
      ]
    }
  ];

  for (const r of curatedRoadmaps) {
    const { steps, ...roadmapData } = r;
    const { data: upsertedRoadmap, error: rError } = await supabase
      .from('roadmaps')
      .upsert(roadmapData, { onConflict: 'slug' })
      .select('id')
      .single();

    if (!rError && upsertedRoadmap && steps && steps.length > 0) {
      await supabase.from('roadmap_steps').delete().eq('roadmap_id', upsertedRoadmap.id);
      const stepRows = steps.map(st => ({
        ...st,
        roadmap_id: upsertedRoadmap.id
      }));
      await supabase.from('roadmap_steps').insert(stepRows);
    }
  }
  console.log(`   ✅ Seeded ${curatedRoadmaps.length} Curated Career Roadmaps with complete step milestones.`);

  // --------------------------------------------------------------------------
  // 11. LEARNING RESOURCES
  // --------------------------------------------------------------------------
  console.log('📦 [11/13] Seeding Verified Learning Resources...');
  const resources = [
    { title: 'Full Stack Open — Deep Dive to Modern Web Development', skill_name: 'React', url: 'https://fullstackopen.com/en/', provider: 'University of Helsinki', type: 'COURSE', is_free: true },
    { title: 'SQL for Data Analysis & Business Intelligence', skill_name: 'SQL', url: 'https://mode.com/sql-tutorial/', provider: 'Mode Analytics', type: 'DOCUMENTATION', is_free: true },
    { title: 'Python for Everybody Specialization', skill_name: 'Python', url: 'https://www.py4e.com/', provider: 'Dr. Chuck / University of Michigan', type: 'COURSE', is_free: true },
    { title: 'System Design Primer & Architectural Patterns', skill_name: 'System Design', url: 'https://github.com/donnemartin/system-design-primer', provider: 'GitHub Open Source', type: 'DOCUMENTATION', is_free: true },
    { title: 'Microsoft Power BI Official Guided Learning', skill_name: 'Power BI', url: 'https://learn.microsoft.com/en-us/power-bi/', provider: 'Microsoft Learn', type: 'OFFICIAL', is_free: true },
    { title: 'Corporate Finance Institute (CFI) Free Modeling Courses', skill_name: 'Financial Modeling', url: 'https://corporatefinanceinstitute.com/', provider: 'CFI', type: 'COURSE', is_free: true }
  ];

  await supabase.from('learning_resources').delete().neq('title', '___dummy___');
  await supabase.from('learning_resources').insert(resources);
  console.log(`   ✅ Seeded ${resources.length} Verified Learning Resources.`);

  // --------------------------------------------------------------------------
  // 12. OFFICIAL STATUTORY SOURCES
  // --------------------------------------------------------------------------
  console.log('📦 [12/13] Seeding Statutory & Educational Registry Sources...');
  const statutorySources = [
    { name: 'University Grants Commission (UGC)', organization: 'Ministry of Education, Govt. of India', url: 'https://www.ugc.gov.in', type: 'GOVERNMENT', description: 'Statutory body coordinating, determining and maintaining standards of university education in India.' },
    { name: 'All India Council for Technical Education (AICTE)', organization: 'Govt. of India', url: 'https://www.aicte-india.org', type: 'GOVERNMENT', description: 'National level apex advisory body conducting survey on the facilities available for technical education.' },
    { name: 'National Testing Agency (NTA)', organization: 'Autonomous Testing Organization', url: 'https://nta.ac.in', type: 'GOVERNMENT', description: 'Conducts premier national entrance examinations including CUET, JEE Main, and NEET.' },
    { name: 'Union Public Service Commission (UPSC)', organization: 'Constitutional Body', url: 'https://upsc.gov.in', type: 'GOVERNMENT', description: 'Premier recruiting agency conducting civil services and central defence officer examinations.' },
    { name: 'Staff Selection Commission (SSC)', organization: 'Department of Personnel and Training', url: 'https://ssc.gov.in', type: 'GOVERNMENT', description: 'Recruiting agency for Group B & C technical and administrative government vacancies.' }
  ];

  await supabase.from('sources').delete().neq('name', '___dummy___');
  await supabase.from('sources').insert(statutorySources);
  console.log(`   ✅ Seeded ${statutorySources.length} Statutory & Official Sources.`);

  // --------------------------------------------------------------------------
  // 13. USER PROGRESS & SKILLS
  // --------------------------------------------------------------------------
  console.log('📦 [13/13] Linking Active User Roadmap & Skills...');
  if (shivaProfile?.id) {
    const userSkillsToInsert = [
      { profile_id: shivaProfile.id, skill_name: 'JavaScript', proficiency: 'Advanced', verified: true },
      { profile_id: shivaProfile.id, skill_name: 'React', proficiency: 'Intermediate', verified: true },
      { profile_id: shivaProfile.id, skill_name: 'Node.js', proficiency: 'Intermediate', verified: true },
      { profile_id: shivaProfile.id, skill_name: 'SQL', proficiency: 'Intermediate', verified: true },
      { profile_id: shivaProfile.id, skill_name: 'Python', proficiency: 'Intermediate', verified: false }
    ];

    await supabase.from('user_skills').delete().eq('profile_id', shivaProfile.id);
    await supabase.from('user_skills').insert(userSkillsToInsert);

    const { data: sdeRoadmap } = await supabase.from('roadmaps').select('id').eq('slug', 'software-development-engineer').single();

    if (sdeRoadmap?.id) {
      await supabase.from('user_roadmaps').delete().eq('profile_id', shivaProfile.id);
      await supabase.from('user_roadmaps').insert({
        profile_id: shivaProfile.id,
        roadmap_id: sdeRoadmap.id,
        target_job: 'Software Development Engineer (SDE)',
        starting_education: 'B.Tech Computer Science',
        completed_step_ids: [1],
        progress_percentage: 20,
        is_active: true
      });
    }
    console.log(`   ✅ Linked Active Roadmap & ${userSkillsToInsert.length} Skills for User Shiva.`);
  }

  // --------------------------------------------------------------------------
  // FINAL VERIFICATION
  // --------------------------------------------------------------------------
  console.log('\n====================================================================');
  console.log('📊 SUPABASE TABLES — FINAL POPULATION AUDIT');
  console.log('====================================================================');

  const tables = [
    'profiles',
    'education_levels',
    'studies',
    'study_paths',
    'careers',
    'jobs',
    'skills',
    'exams',
    'certifications',
    'roadmaps',
    'roadmap_steps',
    'learning_resources',
    'sources',
    'user_roadmaps',
    'user_skills'
  ];

  for (const t of tables) {
    const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`   ❌ ${t.padEnd(20)} ERROR: ${error.message}`);
    } else {
      console.log(`   ✨ ${t.padEnd(20)} ${String(count).padStart(4)} records`);
    }
  }

  console.log('\n====================================================================');
  console.log('🎉 ALL DATA FOR FUTURE PATH IS NOW PERMANENTLY STORED IN SUPABASE!');
  console.log('====================================================================\n');
}

seedAll().catch(err => {
  console.error('Fatal seeder error:', err);
  process.exit(1);
});
