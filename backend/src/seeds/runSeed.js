import mongoose from 'mongoose';
import { connectDB, closeDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Education } from '../models/Education.js';
import { StudyProgram } from '../models/StudyProgram.js';
import { StudyPathway } from '../models/StudyPathway.js';
import { CareerField } from '../models/CareerField.js';
import { Career } from '../models/Career.js';
import { JobRole } from '../models/JobRole.js';
import { Skill } from '../models/Skill.js';
import { Certification } from '../models/Certification.js';
import { EligibilityRule } from '../models/EligibilityRule.js';
import { JobOpportunity } from '../models/JobOpportunity.js';
import { Project } from '../models/Project.js';
import { CareerTwin } from '../models/CareerTwin.js';

import { Entity } from '../models/Entity.js';
import { structuredStudies } from '../seed/studies.js';
import { structuredJobs } from '../seed/jobs.js';
import { structuredCareers } from '../seed/careers.js';
import { structuredExams } from '../seed/exams.js';
import { structuredCertifications } from '../seed/certifications.js';
import { structuredSkills } from '../seed/skills.js';

import {
  seedCareerFields,
  seedSkills,
  seedCertifications,
  seedStudyPrograms,
  seedEducations,
  seedSampleJobs,
  seedSampleOpportunities
} from './seedData.js';

export const runSeed = async () => {
  try {
    console.log('[Seed] Starting database seeding (Development / Sample Data)...');
    await connectDB();

    // 1. Clear existing collections
    await Entity.deleteMany({});
    await User.deleteMany({});
    await Education.deleteMany({});
    await StudyProgram.deleteMany({});
    await StudyPathway.deleteMany({});
    await CareerField.deleteMany({});
    await Career.deleteMany({});
    await JobRole.deleteMany({});
    await Skill.deleteMany({});
    await Certification.deleteMany({});
    await EligibilityRule.deleteMany({});
    await JobOpportunity.deleteMany({});
    await Project.deleteMany({});
    await CareerTwin.deleteMany({});

    console.log('[Seed] Cleared existing data.');

    // Seed Universal Entity Model
    const allEntities = [
      ...structuredStudies,
      ...structuredJobs,
      ...structuredCareers,
      ...structuredExams,
      ...structuredCertifications,
      ...structuredSkills
    ];
    await Entity.insertMany(allEntities);
    console.log(`[Seed] Seeded ${allEntities.length} universal entities (Studies, Jobs, Careers, Exams, Certs, Skills).`);

    // 2. Insert Users (Admin and Demo)
    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@careercompass.ai',
      password: 'AdminPassword123!',
      role: 'admin',
      headline: 'Platform Content Director & Education Analyst',
      location: { country: 'India', city: 'Bengaluru' }
    });

    const demoUser = await User.create({
      name: 'Priya Sharma',
      email: 'demo@careercompass.ai',
      password: 'DemoPassword123!',
      role: 'user',
      headline: 'B.Com Graduate | Aspiring Financial & Business Analyst',
      location: { country: 'India', city: 'Mumbai' },
      currentEducation: {
        name: 'B.Com',
        status: 'completed',
        completionYear: 2024
      },
      careerGoal: {
        targetCareer: 'Corporate Finance & Analytics',
        targetJobRole: 'Junior Financial Analyst',
        targetTimelineMonths: 6
      }
    });

    console.log('[Seed] Users created: admin@careercompass.ai and demo@careercompass.ai');

    // 3. Insert Career Fields
    const createdFields = await CareerField.insertMany(seedCareerFields);
    const fieldMap = new Map();
    createdFields.forEach(f => fieldMap.set(f.slug, f));

    // 4. Insert Skills
    const createdSkills = await Skill.insertMany(seedSkills);
    const skillMap = new Map();
    createdSkills.forEach(s => skillMap.set(s.slug, s));

    // 5. Insert Certifications
    const createdCerts = await Certification.insertMany(
      seedCertifications.map(c => ({
        ...c,
        careerField: createdFields[0]._id
      }))
    );
    const certMap = new Map();
    createdCerts.forEach(c => certMap.set(c.slug, c));

    // 6. Insert Study Programs
    const createdPrograms = await StudyProgram.insertMany(seedStudyPrograms);
    const programMap = new Map();
    createdPrograms.forEach(p => programMap.set(p.slug, p));

    // 7. Insert Educations (14 items)
    const createdEducations = await Education.insertMany(seedEducations);
    const eduMap = new Map();
    createdEducations.forEach(e => eduMap.set(e.slug, e));

    console.log(`[Seed] Seeded ${createdEducations.length} primary Educations across diverse streams.`);

    // 8. Build Study Pathways with strict relationship types
    const pathwaysToInsert = [];

    // Helper to safely add pathway
    const addPathway = (fromSlug, toSlug, relType, minMarks, rationale) => {
      const from = eduMap.get(fromSlug);
      const to = programMap.get(toSlug);
      if (from && to) {
        pathwaysToInsert.push({
          fromEducation: from._id,
          toStudy: to._id,
          relationshipType: relType,
          eligibilityCriteria: {
            minimumMarksPercentage: minMarks,
            requiredSubjects: from.typicalSubjects?.slice(0, 2) || []
          },
          rationale,
          verificationStatus: 'VERIFIED'
        });
      }
    };

    // 10th Pathways
    addPathway('10th', '11th-12th-science', 'DIRECT', 60, 'Requires strong foundation in 10th science & math.');
    addPathway('10th', '11th-12th-commerce', 'DIRECT', 50, 'Standard commerce pathway open to all 10th pass students.');
    addPathway('10th', '11th-12th-arts', 'DIRECT', 45, 'Humanities stream exploring social sciences and languages.');
    addPathway('10th', 'polytechnic-diploma', 'DIRECT', 50, '3-year technical vocational engineering diploma.');
    addPathway('10th', 'iti-trade-program', 'DIRECT', 45, 'Direct technical skill development in electricians, fitters, etc.');

    // 12th Science Pathways
    addPathway('12th-science', 'btech-cse-program', 'DIRECT', 60, 'Admission via JEE / state engineering CET entrance exams.');
    addPathway('12th-science', 'mbbs-program', 'LICENSE_REQUIRED', 50, 'Mandatory NEET qualification; subject to Medical Commission norms.');
    addPathway('12th-science', 'bpharm-program', 'DIRECT', 50, 'PCM/PCB eligibility for 4-year pharmacy degree.');
    addPathway('12th-science', 'bsc-physics-program', 'DIRECT', 55, 'Pure science university degree in Physics & Math.');

    // 12th Commerce Pathways
    addPathway('12th-commerce', 'bcom-program', 'DIRECT', 50, 'Standard 3-year commerce graduation.');
    addPathway('12th-commerce', 'bba-program', 'DIRECT', 50, 'Management undergraduate program.');
    addPathway('12th-commerce', 'integrated-llb-program', 'DIRECT', 45, '5-year integrated B.Com LLB law program.');

    // B.Com Pathways
    addPathway('b-com', 'mcom-program', 'DIRECT', 50, 'Advanced postgraduate study in corporate finance & accounting.');
    addPathway('b-com', 'mba-program', 'DIRECT', 50, 'Entry via CAT / GMAT for managerial finance specializations.');
    addPathway('b-com', 'integrated-llb-program', 'RELATED', 50, '3-year LLB post graduation for legal tax and corporate advisory.');

    // B.Tech CSE Pathways
    addPathway('b-tech-cse', 'mtech-cse-program', 'DIRECT', 60, 'Via GATE exam for advanced research and distributed systems.');
    addPathway('b-tech-cse', 'mba-program', 'POSSIBLE_WITH_SKILLS', 50, 'Tech management, product management, or venture capital.');

    // ITI Electrician Pathways
    addPathway('iti-electrician', 'polytechnic-diploma', 'DIRECT', 50, 'Lateral entry into 2nd year of Electrical Polytechnic Diploma.');

    // Diploma Mechanical Pathways
    addPathway('diploma-mechanical', 'btech-cse-program', 'POSSIBLE_WITH_QUALIFICATION', 60, 'Lateral entry into B.Tech degree programs via state lateral CET.');

    // MBBS Pathways
    addPathway('mbbs', 'md-ms-program', 'LICENSE_REQUIRED', 50, 'Requires clearing NEET-PG / NEXT for clinical super-specialty.');

    // B.Pharm Pathways
    addPathway('b-pharm', 'mpharm-program', 'DIRECT', 55, 'GPAT score for specialization in Pharmaceutics or Pharmacology.');

    // BA Psychology Pathways
    addPathway('ba-psychology', 'ma-psychology-program', 'DIRECT', 50, 'Mandatory step toward M.Phil/Psy.D and RCI licensing.');

    // LLB Pathways
    addPathway('llb', 'llm-program', 'DIRECT', 50, 'Specialized corporate law, constitutional law, or intellectual property.');

    // B.Ed Pathways
    addPathway('b-ed', 'med-program', 'DIRECT', 55, 'Higher educational administration, curriculum design, and pedagogy research.');

    // PhD Physics Pathways
    addPathway('phd-physics', 'postdoc-physics-program', 'DIRECT', 65, 'International research fellowships in quantum, materials, or astrophysics.');

    await StudyPathway.insertMany(pathwaysToInsert);
    console.log(`[Seed] Seeded ${pathwaysToInsert.length} Study Pathways with verified relationships.`);

    // 9. Careers Setup
    const careersToInsert = [
      {
        name: 'Corporate Financial Analyst',
        slug: 'corporate-financial-analyst',
        careerField: fieldMap.get('accounting-finance')._id,
        description: 'Evaluates investment opportunities, builds financial forecasts, and advises executive leadership.',
        relatedEducation: [{ education: eduMap.get('b-com')._id, relationshipType: 'DIRECT' }],
        skills: [skillMap.get('financial-modeling')._id, skillMap.get('advanced-excel')._id, skillMap.get('power-bi-tableau')._id],
        certifications: [certMap.get('cfa-level-1')._id, certMap.get('ca-cpa')._id],
        responsibilities: ['Build DCF models', 'Present quarterly variance to CFO', 'Review debt structures'],
        progression: [
          { stage: 'Entry', role: 'Junior Financial Analyst', years: '0-2 yrs' },
          { stage: 'Mid', role: 'Senior Financial Analyst', years: '2-5 yrs' },
          { stage: 'Lead', role: 'Finance Manager / VP Finance', years: '5+ yrs' }
        ]
      },
      {
        name: 'Full Stack Software Engineer',
        slug: 'full-stack-software-engineer',
        careerField: fieldMap.get('computer-science-software')._id,
        description: 'Architects and deploys scalable web applications, REST APIs, and microservices.',
        relatedEducation: [
          { education: eduMap.get('b-tech-cse')._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('b-com')._id, relationshipType: 'POSSIBLE_WITH_SKILLS' }
        ],
        skills: [skillMap.get('full-stack-web')._id, skillMap.get('sql-db-optimization')._id, skillMap.get('rest-apis-system-design')._id],
        certifications: [certMap.get('aws-solutions-architect')._id, certMap.get('full-stack-open')._id],
        responsibilities: ['Build secure web apps', 'Optimize backend throughput', 'Maintain CI/CD pipelines'],
        progression: [
          { stage: 'Entry', role: 'Software Engineer 1', years: '0-2 yrs' },
          { stage: 'Mid', role: 'Senior Software Engineer', years: '2-5 yrs' },
          { stage: 'Lead', role: 'Staff Engineer / Tech Lead', years: '6+ yrs' }
        ]
      },
      {
        name: 'Clinical Physician / Medical Doctor',
        slug: 'clinical-physician',
        careerField: fieldMap.get('healthcare-medicine')._id,
        description: 'Examines patients, performs diagnostic assessments, orders treatment plans, and saves lives.',
        relatedEducation: [{ education: eduMap.get('mbbs')._id, relationshipType: 'LICENSE_REQUIRED' }],
        skills: [skillMap.get('clinical-diagnosis')._id, skillMap.get('emergency-triage')._id, skillMap.get('patient-empathy')._id],
        certifications: [certMap.get('usmle-next')._id],
        responsibilities: ['Patient diagnosis', 'Emergency intervention', 'Clinical medication management'],
        progression: [
          { stage: 'Entry', role: 'Resident Medical Officer', years: '0-2 yrs' },
          { stage: 'Specialist', role: 'Attending Physician (post-MD)', years: '3-6 yrs' },
          { stage: 'Lead', role: 'Chief Medical Officer / Consultant', years: '8+ yrs' }
        ]
      },
      {
        name: 'Industrial Electrical Specialist',
        slug: 'industrial-electrical-specialist',
        careerField: fieldMap.get('electrical-trades')._id,
        description: 'Maintains heavy commercial power grids, motor systems, and industrial electrical panels.',
        relatedEducation: [{ education: eduMap.get('iti-electrician')._id, relationshipType: 'DIRECT' }],
        skills: [skillMap.get('industrial-wiring')._id, skillMap.get('electrical-safety')._id, skillMap.get('plc-scada-basics')._id],
        certifications: [certMap.get('grade-a-electrician-license')._id],
        responsibilities: ['Preventive circuit checks', 'Switchgear maintenance', 'High voltage safety'],
        progression: [
          { stage: 'Entry', role: 'Apprentice Electrician', years: '0-1 yr' },
          { stage: 'Mid', role: 'Licensed Industrial Electrician', years: '2-5 yrs' },
          { stage: 'Lead', role: 'Master Electrician / Plant Supervisor', years: '5+ yrs' }
        ]
      },
      {
        name: 'Commercial Litigation & Corporate Advocate',
        slug: 'litigation-corporate-advocate',
        careerField: fieldMap.get('law-compliance')._id,
        description: 'Represents clients in judicial courts and drafts high-stakes corporate contracts.',
        relatedEducation: [{ education: eduMap.get('llb')._id, relationshipType: 'LICENSE_REQUIRED' }],
        skills: [skillMap.get('legal-drafting')._id, skillMap.get('courtroom-advocacy')._id, skillMap.get('commercial-law')._id],
        certifications: [certMap.get('aibe-license')._id],
        responsibilities: ['Draft petitions and legal notices', 'Argue cases in court', 'Review compliance audits'],
        progression: [
          { stage: 'Entry', role: 'Junior Advocate', years: '0-3 yrs' },
          { stage: 'Mid', role: 'Senior Associate / Independent Counsel', years: '3-7 yrs' },
          { stage: 'Lead', role: 'Partner / Senior Counsel', years: '8+ yrs' }
        ]
      },
      {
        name: 'Psychologist & Wellness Consultant',
        slug: 'psychologist-wellness-consultant',
        careerField: fieldMap.get('psychology-mental-health')._id,
        description: 'Helps individuals navigate anxiety, behavioral challenges, and emotional wellness.',
        relatedEducation: [{ education: eduMap.get('ba-psychology')._id, relationshipType: 'POSSIBLE_WITH_QUALIFICATION' }],
        skills: [skillMap.get('psychological-assessment')._id, skillMap.get('active-listening-ethics')._id, skillMap.get('cbt-frameworks')._id],
        certifications: [certMap.get('rci-psychologist-license')._id],
        responsibilities: ['Screening evaluations', 'Conducting group therapy sessions', 'Designing wellness programs'],
        progression: [
          { stage: 'Entry', role: 'Assistant Counselor', years: '0-2 yrs' },
          { stage: 'Mid', role: 'Licensed Clinical Psychologist (post-MA)', years: '2-5 yrs' },
          { stage: 'Lead', role: 'Clinical Director', years: '6+ yrs' }
        ]
      },
      {
        name: 'Academic Teacher & Educator',
        slug: 'academic-teacher-educator',
        careerField: fieldMap.get('education-teaching')._id,
        description: 'Inspires and educates young minds with structured pedagogical techniques.',
        relatedEducation: [{ education: eduMap.get('b-ed')._id, relationshipType: 'DIRECT' }],
        skills: [skillMap.get('lesson-planning')._id, skillMap.get('classroom-management')._id, skillMap.get('edtech-tools')._id],
        certifications: [certMap.get('ctet-certification')._id],
        responsibilities: ['Deliver daily syllabus', 'Assess student mastery', 'Organize co-curricular events'],
        progression: [
          { stage: 'Entry', role: 'Trained Graduate Teacher (TGT)', years: '0-3 yrs' },
          { stage: 'Mid', role: 'Post Graduate Teacher (PGT)', years: '3-7 yrs' },
          { stage: 'Lead', role: 'Head of Department / Principal', years: '8+ yrs' }
        ]
      },
      {
        name: 'Theoretical & Computational Physicist',
        slug: 'computational-physicist',
        careerField: fieldMap.get('physics-scientific-research')._id,
        description: 'Develops mathematical models and computer simulations to investigate fundamental laws of nature.',
        relatedEducation: [{ education: eduMap.get('phd-physics')._id, relationshipType: 'DIRECT' }],
        skills: [skillMap.get('computational-physics')._id, skillMap.get('quantum-modeling')._id, skillMap.get('scientific-publishing')._id],
        certifications: [certMap.get('csir-net-physics')._id],
        responsibilities: ['Formulate quantum simulations', 'Publish research papers', 'Direct lab experiments'],
        progression: [
          { stage: 'Entry', role: 'Postdoctoral Fellow', years: '0-3 yrs' },
          { stage: 'Mid', role: 'Assistant Professor / Senior Scientist', years: '3-8 yrs' },
          { stage: 'Lead', role: 'Principal Investigator / Professor', years: '8+ yrs' }
        ]
      }
    ];

    const createdCareers = await Career.insertMany(careersToInsert);
    const careerMap = new Map();
    createdCareers.forEach(c => careerMap.set(c.slug, c));

    // 10. Job Roles Setup
    const jobsWithRelations = seedSampleJobs.map(job => {
      let careerRef = createdCareers[0]._id;
      let fieldRef = createdFields[0]._id;
      let eduLinks = [];
      let reqSkills = [];
      let prefSkills = [];
      let certLinks = [];

      if (job.slug === 'data-analyst') {
        careerRef = careerMap.get('corporate-financial-analyst')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('computer-science-software')?._id || fieldMap.get('accounting-finance')._id;
        eduLinks = [
          { education: eduMap.get('b-com')?._id, relationshipType: 'POSSIBLE_WITH_SKILLS' },
          { education: eduMap.get('b-tech-cse')?._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('b-sc')?._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('bba')?._id, relationshipType: 'POSSIBLE_WITH_SKILLS' },
          { education: eduMap.get('mca')?._id, relationshipType: 'DIRECT' }
        ].filter(e => e.education);
        reqSkills = [skillMap.get('advanced-excel')?._id, skillMap.get('sql-db-optimization')?._id].filter(Boolean);
        prefSkills = [skillMap.get('power-bi-tableau')?._id].filter(Boolean);
      } else if (job.slug === 'ssc-cgl-auditor-inspector' || job.slug === 'bank-probationary-officer') {
        careerRef = createdCareers[0]._id;
        fieldRef = fieldMap.get('accounting-finance')?._id || createdFields[0]._id;
        eduLinks = [
          { education: eduMap.get('b-com')?._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('b-tech-cse')?._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('b-sc')?._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('b-a')?._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('bba')?._id, relationshipType: 'DIRECT' }
        ].filter(e => e.education);
        reqSkills = [skillMap.get('advanced-excel')?._id].filter(Boolean);
      } else if (job.slug === 'railway-alp-technician') {
        careerRef = careerMap.get('industrial-electrical-specialist')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('electrical-trades')?._id || createdFields[0]._id;
        eduLinks = [
          { education: eduMap.get('iti-electrician')?._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('diploma-mechanical')?._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('b-tech-mechanical')?._id, relationshipType: 'DIRECT' }
        ].filter(e => e.education);
        reqSkills = [skillMap.get('industrial-wiring')?._id, skillMap.get('electrical-safety')?._id].filter(Boolean);
      } else if (job.slug.includes('accountant') || job.slug.includes('financial')) {
        careerRef = careerMap.get('corporate-financial-analyst')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('accounting-finance')._id;
        eduLinks = [
          { education: eduMap.get('b-com')._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('12th-commerce')._id, relationshipType: 'POSSIBLE_WITH_SKILLS' },
          { education: eduMap.get('mba-finance')._id, relationshipType: 'DIRECT' }
        ];
        reqSkills = [skillMap.get('advanced-excel')._id, skillMap.get('financial-modeling')._id];
        prefSkills = [skillMap.get('power-bi-tableau')._id];
        certLinks = [certMap.get('ca-cpa')._id];
      } else if (job.slug.includes('software') || job.slug.includes('backend')) {
        careerRef = careerMap.get('full-stack-software-engineer')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('computer-science-software')._id;
        eduLinks = [
          { education: eduMap.get('b-tech-cse')._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('b-com')._id, relationshipType: 'POSSIBLE_WITH_SKILLS' }
        ];
        reqSkills = [skillMap.get('full-stack-web')._id, skillMap.get('sql-db-optimization')._id];
        prefSkills = [skillMap.get('cloud-devops')._id];
        certLinks = [certMap.get('aws-solutions-architect')._id];
      } else if (job.slug.includes('medical')) {
        careerRef = careerMap.get('clinical-physician')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('healthcare-medicine')._id;
        eduLinks = [{ education: eduMap.get('mbbs')._id, relationshipType: 'LICENSE_REQUIRED' }];
        reqSkills = [skillMap.get('clinical-diagnosis')._id, skillMap.get('emergency-triage')._id];
        prefSkills = [skillMap.get('patient-empathy')._id];
        certLinks = [certMap.get('usmle-next')._id];
      } else if (job.slug.includes('electric')) {
        careerRef = careerMap.get('industrial-electrical-specialist')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('electrical-trades')._id;
        eduLinks = [{ education: eduMap.get('iti-electrician')._id, relationshipType: 'DIRECT' }];
        reqSkills = [skillMap.get('industrial-wiring')._id, skillMap.get('electrical-safety')._id];
        prefSkills = [skillMap.get('plc-scada-basics')._id];
        certLinks = [certMap.get('grade-a-electrician-license')._id];
      } else if (job.slug.includes('mechanical')) {
        careerRef = createdCareers[0]._id;
        fieldRef = fieldMap.get('mechanical-manufacturing')._id;
        eduLinks = [{ education: eduMap.get('diploma-mechanical')._id, relationshipType: 'DIRECT' }];
        reqSkills = [skillMap.get('autocad-solidworks')._id, skillMap.get('thermodynamics-fluids')._id];
        prefSkills = [skillMap.get('cnc-programming')._id];
        certLinks = [certMap.get('cswa-solidworks')._id];
      } else if (job.slug.includes('chemist')) {
        careerRef = createdCareers[0]._id;
        fieldRef = fieldMap.get('pharmaceutical-sciences')._id;
        eduLinks = [{ education: eduMap.get('b-pharm')._id, relationshipType: 'DIRECT' }];
        reqSkills = [skillMap.get('drug-formulation')._id, skillMap.get('gmp-compliance')._id];
        prefSkills = [skillMap.get('hplc-chromatography')._id];
        certLinks = [certMap.get('pharmacy-council-registration')._id];
      } else if (job.slug.includes('counseling')) {
        careerRef = careerMap.get('psychologist-wellness-consultant')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('psychology-mental-health')._id;
        eduLinks = [{ education: eduMap.get('ba-psychology')._id, relationshipType: 'POSSIBLE_WITH_QUALIFICATION' }];
        reqSkills = [skillMap.get('psychological-assessment')._id, skillMap.get('active-listening-ethics')._id];
        prefSkills = [skillMap.get('cbt-frameworks')._id];
        certLinks = [certMap.get('rci-psychologist-license')._id];
      } else if (job.slug.includes('legal')) {
        careerRef = careerMap.get('litigation-corporate-advocate')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('law-compliance')._id;
        eduLinks = [{ education: eduMap.get('llb')._id, relationshipType: 'LICENSE_REQUIRED' }];
        reqSkills = [skillMap.get('legal-drafting')._id, skillMap.get('courtroom-advocacy')._id];
        prefSkills = [skillMap.get('commercial-law')._id];
        certLinks = [certMap.get('aibe-license')._id];
      } else if (job.slug.includes('educator')) {
        careerRef = careerMap.get('academic-teacher-educator')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('education-teaching')._id;
        eduLinks = [{ education: eduMap.get('b-ed')._id, relationshipType: 'DIRECT' }];
        reqSkills = [skillMap.get('lesson-planning')._id, skillMap.get('classroom-management')._id];
        prefSkills = [skillMap.get('edtech-tools')._id];
        certLinks = [certMap.get('ctet-certification')._id];
      } else if (job.slug.includes('physicist')) {
        careerRef = careerMap.get('computational-physicist')?._id || createdCareers[0]._id;
        fieldRef = fieldMap.get('physics-scientific-research')._id;
        eduLinks = [{ education: eduMap.get('phd-physics')._id, relationshipType: 'DIRECT' }];
        reqSkills = [skillMap.get('computational-physics')._id, skillMap.get('quantum-modeling')._id];
        prefSkills = [skillMap.get('scientific-publishing')._id];
        certLinks = [certMap.get('csir-net-physics')._id];
      } else {
        // General entry jobs accessible to 10th / 12th
        fieldRef = fieldMap.get('accounting-finance')._id;
        eduLinks = [
          { education: eduMap.get('10th')._id, relationshipType: 'POSSIBLE_WITH_SKILLS' },
          { education: eduMap.get('12th-commerce')._id, relationshipType: 'DIRECT' },
          { education: eduMap.get('12th-science')._id, relationshipType: 'DIRECT' }
        ];
        reqSkills = [skillMap.get('advanced-excel')._id];
      }

      return {
        ...job,
        career: careerRef,
        careerField: fieldRef,
        relatedEducation: eduLinks,
        requiredSkills: reqSkills,
        preferredSkills: prefSkills,
        certifications: certLinks
      };
    });

    await JobRole.insertMany(jobsWithRelations);
    console.log(`[Seed] Seeded ${jobsWithRelations.length} Job Roles linked with educations and skills.`);

    // 11. Projects Setup
    const sampleProjects = [
      {
        title: 'Three-Statement Financial Model & Valuation',
        slug: 'three-statement-financial-model',
        careerField: fieldMap.get('accounting-finance')._id,
        targetRoles: ['Junior Financial Analyst', 'Accountant & Tax Associate'],
        difficulty: 'Intermediate',
        description: 'Construct a linked Income Statement, Balance Sheet, and Cash Flow statement with a 5-year forecast and DCF valuation.',
        deliverables: ['Dynamic Excel workbook with formula switches', 'Valuation pitch presentation deck (10 slides)'],
        technologies: ['Advanced Excel', 'Financial Modeling', 'DCF Valuation'],
        estimatedHours: 25,
        resumeBulletExample: 'Engineered a 3-statement financial projection model with sensitivity analysis, valuing a mid-cap retailer within 4% of market consensus.'
      },
      {
        title: 'Full-Stack Task & Project Management SaaS',
        slug: 'fullstack-task-saas',
        careerField: fieldMap.get('computer-science-software')._id,
        targetRoles: ['Full Stack Software Engineer', 'Backend Developer'],
        difficulty: 'Portfolio Hero',
        description: 'Build a production-grade project collaboration platform with JWT auth, role permissions, drag-and-drop Kanban, and real-time websockets.',
        deliverables: ['Live deployed web app on Vercel/Render', 'GitHub repository with 90%+ test coverage and CI/CD workflow'],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        estimatedHours: 40,
        resumeBulletExample: 'Architected and deployed full-stack SaaS platform serving 500+ daily active requests with sub-120ms p95 API response times.'
      },
      {
        title: 'Industrial Motor Starter & Control Panel Wiring Lab',
        slug: 'motor-starter-control-panel',
        careerField: fieldMap.get('electrical-trades')._id,
        targetRoles: ['Industrial Electrical Technician'],
        difficulty: 'Intermediate',
        description: 'Assemble and test a Direct-On-Line (DOL) and Star-Delta starter circuit with overload relay protection and emergency cutoffs.',
        deliverables: ['Single-line schematic diagram', 'Photographic testing logbook verifying LOTO safety protocols'],
        technologies: ['Contactor Relays', 'Overload Protection', 'Industrial Multimeters'],
        estimatedHours: 20,
        resumeBulletExample: 'Assembled Star-Delta starter panel with overload protection, achieving 100% compliance with OSHA safety standards.'
      }
    ];

    await Project.insertMany(sampleProjects);

    // 12. Opportunities Setup
    await JobOpportunity.insertMany(seedSampleOpportunities);

    // 13. Create Career Twin for Demo User
    await CareerTwin.create({
      user: demoUser._id,
      education: {
        degreeName: 'B.Com (Bachelor of Commerce)',
        level: 'Undergraduate',
        stream: 'Commerce',
        completionYear: 2024,
        status: 'completed',
        institution: 'Mumbai University'
      },
      skills: [
        { name: 'Advanced Excel', level: 'Intermediate', verified: true },
        { name: 'Financial Accounting', level: 'Intermediate', verified: true },
        { name: 'Corporate Taxation & GST', level: 'Beginner', verified: false }
      ],
      interests: ['Financial Analysis', 'Business Intelligence', 'Corporate Valuation'],
      targetCareers: ['Corporate Financial Analyst', 'Junior Financial Analyst'],
      targetJobs: ['Junior Financial Analyst'],
      currentGpsProgress: 45,
      twinScore: 68,
      completedProjectsCount: 1,
      completedCertificationsCount: 0,
      completedRoadmapTasksCount: 3,
      interviewReadinessScore: 62,
      resumeScore: 74,
      passportSlug: 'priya-sharma-bcom-2024',
      isPassportPublic: true,
      recentActivity: [
        { action: 'Analyzed Education', detail: 'Explored future pathways for B.Com' },
        { action: 'Updated Target Career', detail: 'Set Corporate Financial Analyst as priority' },
        { action: 'Completed Daily Mission', detail: 'Financial Ratio analysis practice' }
      ]
    });

    console.log('[Seed] Database seeding completed successfully! All 14 educations, pathways, and models are live.');
  } catch (error) {
    console.error('[Seed] Database seeding failed:', error);
    throw error;
  }
};

// If run directly via CLI
if (process.argv[1]?.endsWith('runSeed.js')) {
  runSeed().then(async () => {
    await closeDB();
    process.exit(0);
  }).catch(async (err) => {
    console.error(err);
    await closeDB();
    process.exit(1);
  });
}
