import { JobRole } from '../models/JobRole.js';
import { Skill } from '../models/Skill.js';
import { KnowledgeGraphService } from '../services/knowledgeGraphService.js';
import { EligibilityService } from '../services/eligibilityService.js';

/**
 * Learn Controller
 * Section 6: /api/learn and /api/learn/:jobId
 * Based on User Education + Target Job if selected.
 */

export const getLearnSkills = async (req, res, next) => {
  try {
    const educationQuery = req.query.education || req.user?.educationName || req.user?.currentEducation?.name || 'B.Com';
    const targetJobQuery = req.params.jobId || req.query.targetJob || req.query.job || req.user?.targetJob?.targetJobName;

    const education = await KnowledgeGraphService.identifyEducation(educationQuery);
    const eduName = education ? education.name : educationQuery;

    // CASE 1: Target Job EXISTS (Section 6)
    if (targetJobQuery && targetJobQuery.trim().length > 0) {
      const evaluation = await EligibilityService.evaluateEligibility({
        educationQuery: eduName,
        jobQuery: targetJobQuery
      });

      const jobTitle = evaluation.targetJob.title;
      const skillsOrdered = getOrderedSkillsForJob(jobTitle, eduName);

      return res.json({
        success: true,
        hasTargetJob: true,
        education: eduName,
        targetJob: evaluation.targetJob,
        heading: `How to become a ${jobTitle}`,
        subheading: `Personalized skill acquisition order starting from your ${eduName} background`,
        skillsToLearn: skillsOrdered,
        overview: evaluation.targetJob.overview,
        projects: evaluation.projects,
        interviewPreparation: evaluation.interviewPreparation
      });
    }

    // CASE 2: NO Target Job selected (Section 6)
    // Show skills you can learn for careers related to education
    const careerClusters = getCareerSkillClustersForEducation(eduName);

    res.json({
      success: true,
      hasTargetJob: false,
      education: eduName,
      heading: `Skills you can learn for careers related to ${eduName}`,
      subheading: 'Select any career field or target job to view its step-by-step learning roadmap',
      careerClusters
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Ordered skills for specific target jobs (Section 6 & 10)
 */
function getOrderedSkillsForJob(jobTitle, educationName) {
  const lower = jobTitle.toLowerCase();

  if (lower.includes('data analyst')) {
    return [
      { step: 1, name: 'Excel', category: 'Spreadsheets', duration: '2 Weeks', whyNeeded: 'Essential for fast tabular manipulation, VLOOKUP, pivot tables, and commercial data audits.', status: 'High Priority' },
      { step: 2, name: 'Statistics', category: 'Mathematical Foundation', duration: '2 Weeks', whyNeeded: 'Distributions, standard deviation, hypothesis testing, and regression analysis for business metrics.', status: 'High Priority' },
      { step: 3, name: 'SQL', category: 'Database Querying', duration: '3 Weeks', whyNeeded: 'Writing complex queries, joins, aggregations, and window functions to query enterprise data warehouses.', status: 'Crucial' },
      { step: 4, name: 'Python', category: 'Programming', duration: '3 Weeks', whyNeeded: 'Automating extraction, data pipeline scripting, and numerical computations.', status: 'Essential' },
      { step: 5, name: 'Pandas', category: 'Data Wrangling', duration: '2 Weeks', whyNeeded: 'Handling missing values, data shaping, grouping, and feature transformations in Python.', status: 'Essential' },
      { step: 6, name: 'Data Visualization', category: 'Business Reporting', duration: '1 Week', whyNeeded: 'Choosing the right chart types, executive dashboard principles, and visual narrative storytelling.', status: 'Recommended' },
      { step: 7, name: 'Power BI / Tableau', category: 'BI Tool', duration: '3 Weeks', whyNeeded: 'Building interactive executive KPI dashboards, DAX measures, and publishable business reports.', status: 'Crucial' }
    ];
  }

  if (lower.includes('accountant') || lower.includes('tax')) {
    return [
      { step: 1, name: 'Accounting Fundamentals', category: 'Core Principles', duration: '1 Week', whyNeeded: 'Double-entry bookkeeping, debit/credit golden rules, and journal ledger posting.', status: 'Covered in Degree' },
      { step: 2, name: 'Advanced Excel', category: 'Financial Tool', duration: '2 Weeks', whyNeeded: 'Financial functions (XLOOKUP, INDEX/MATCH, SUMIFS) and bank reconciliation models.', status: 'Crucial' },
      { step: 3, name: 'Tally Prime / Zoho Books', category: 'Accounting Software', duration: '3 Weeks', whyNeeded: 'Voucher entry, inventory management, e-way bills, and automated financial statements.', status: 'Crucial' },
      { step: 4, name: 'GST & TDS Law & E-filing', category: 'Statutory Compliance', duration: '3 Weeks', whyNeeded: 'GSTR-1, GSTR-3B monthly filings, input tax credit (ITC) calculations, and quarterly TDS returns.', status: 'Crucial' },
      { step: 5, name: 'Corporate Balance Sheet Finalization', category: 'Reporting', duration: '2 Weeks', whyNeeded: 'Schedule III profit & loss statements, audit preparation, and notes on accounts.', status: 'High Priority' }
    ];
  }

  if (lower.includes('financial analyst')) {
    return [
      { step: 1, name: 'Financial Statement Analysis', category: 'Core Finance', duration: '2 Weeks', whyNeeded: 'Evaluating profitability, liquidity, solvency ratios, and operational cash flows.', status: 'High Priority' },
      { step: 2, name: 'Advanced Excel & Shortcuts', category: 'Tool', duration: '2 Weeks', whyNeeded: 'Dynamic financial modeling shortcuts, scenario toggles, and data tables.', status: 'Crucial' },
      { step: 3, name: '3-Statement Financial Modeling', category: 'Forecasting', duration: '4 Weeks', whyNeeded: 'Integrating Income Statement, Balance Sheet, and Cash Flow with dynamic debt schedules.', status: 'Crucial' },
      { step: 4, name: 'Discounted Cash Flow (DCF) Valuation', category: 'Valuation', duration: '3 Weeks', whyNeeded: 'WACC estimation, terminal value calculations, and enterprise value sensitivities.', status: 'Crucial' },
      { step: 5, name: 'Power BI Financial Dashboards', category: 'BI Reporting', duration: '2 Weeks', whyNeeded: 'Visualizing quarterly budget variances and presenting financial findings to executives.', status: 'Recommended' }
    ];
  }

  if (lower.includes('software') || lower.includes('developer')) {
    return [
      { step: 1, name: 'JavaScript / TypeScript Basics', category: 'Language', duration: '3 Weeks', whyNeeded: 'Core language foundation, variables, functions, closures, and async promises.', status: 'Crucial' },
      { step: 2, name: 'Data Structures & Algorithms', category: 'Computer Science', duration: '4 Weeks', whyNeeded: 'Arrays, hashes, linked lists, trees, and time complexity optimization for coding interviews.', status: 'Crucial' },
      { step: 3, name: 'Git & GitHub Collaboration', category: 'Version Control', duration: '1 Week', whyNeeded: 'Managing code branches, pull requests, and multi-developer team repositories.', status: 'Essential' },
      { step: 4, name: 'Databases (SQL & MongoDB)', category: 'Data Storage', duration: '3 Weeks', whyNeeded: 'Designing relational schemas, normalization, indexing, and NoSQL document stores.', status: 'Crucial' },
      { step: 5, name: 'REST APIs & Node.js / Express', category: 'Backend Server', duration: '3 Weeks', whyNeeded: 'Building secure microservices, authentication with JWT, middleware, and request validation.', status: 'Crucial' },
      { step: 6, name: 'Frontend Frameworks (React)', category: 'Client Application', duration: '3 Weeks', whyNeeded: 'Component lifecycle, state management, hooks, and responsive user interfaces.', status: 'Crucial' }
    ];
  }

  if (lower.includes('electrician')) {
    return [
      { step: 1, name: 'Electrical Safety & LOTO Protocols', category: 'Safety & Compliance', duration: '1 Week', whyNeeded: 'Lockout/tagout safety procedures, grounding inspection, and OSHA compliance.', status: 'Crucial' },
      { step: 2, name: 'Industrial Wiring & Schematics', category: 'Technical Trade', duration: '3 Weeks', whyNeeded: 'Reading single-line blueprints, conduit installation, and commercial circuit runs.', status: 'Crucial' },
      { step: 3, name: 'Testing Tools (Multimeter & Megger)', category: 'Instruments', duration: '2 Weeks', whyNeeded: 'Measuring phase voltage, continuity, earth resistance, and insulation resistance.', status: 'Essential' },
      { step: 4, name: 'Three-Phase Motors & Starters', category: 'Machinery', duration: '3 Weeks', whyNeeded: 'Wiring DOL and Star-Delta starters, contactor relays, and overload protective circuits.', status: 'Crucial' },
      { step: 5, name: 'PLC & Automation Basics', category: 'Advanced Skill', duration: '3 Weeks', whyNeeded: 'Ladder logic programming and sensors for automated manufacturing plant panels.', status: 'Recommended' }
    ];
  }

  if (lower.includes('mechanical')) {
    return [
      { step: 1, name: 'Engineering Drawing & GD&T', category: 'Design Foundation', duration: '2 Weeks', whyNeeded: 'Interpreting geometric dimensioning, limits, fits, and machining tolerances.', status: 'Essential' },
      { step: 2, name: '3D CAD (SolidWorks / AutoCAD)', category: 'Design Software', duration: '4 Weeks', whyNeeded: 'Parametric part modeling, sheet metal design, assembly modeling, and drafting.', status: 'Crucial' },
      { step: 3, name: 'Thermodynamics & Fluid Power', category: 'Domain Theory', duration: '3 Weeks', whyNeeded: 'Pneumatic and hydraulic circuits, pressure valves, compressors, and pumps.', status: 'High Priority' },
      { step: 4, name: 'Manufacturing Processes & CNC', category: 'Shop Floor', duration: '3 Weeks', whyNeeded: 'G-code programming, milling, turning, and quality inspection tools (micrometers).', status: 'Crucial' },
      { step: 5, name: 'Preventive Maintenance Management', category: 'Plant Operations', duration: '2 Weeks', whyNeeded: 'Total Productive Maintenance (TPM), root cause analysis, and downtime reduction.', status: 'High Priority' }
    ];
  }

  // General default fallback
  return [
    { step: 1, name: 'Core Domain Foundation', category: 'Theory', duration: '2 Weeks', whyNeeded: 'Foundational concepts and principles.', status: 'Essential' },
    { step: 2, name: 'Industry Software Tools', category: 'Software', duration: '3 Weeks', whyNeeded: 'Standard digital tools used by practitioners.', status: 'Crucial' },
    { step: 3, name: 'Applied Case Projects', category: 'Practical', duration: '4 Weeks', whyNeeded: 'Demonstrating end-to-end execution on portfolio projects.', status: 'Crucial' },
    { step: 4, name: 'Quality Control & Documentation', category: 'Governance', duration: '2 Weeks', whyNeeded: 'Adhering to statutory benchmarks and verification standards.', status: 'High Priority' }
  ];
}

/**
 * Career skill clusters when no target job is selected yet (Section 6)
 */
function getCareerSkillClustersForEducation(eduName) {
  const lower = eduName.toLowerCase();

  if (lower.includes('com') || lower.includes('commerce') || lower.includes('bba')) {
    return [
      {
        field: 'Accounting',
        description: 'Financial recording, ledger auditing, and statutory tax compliance.',
        targetJobs: ['Accountant', 'Accounts Executive', 'Internal Auditor'],
        skills: ['Accounting Fundamentals', 'Tally Prime', 'Advanced Excel', 'GST & TDS E-filing', 'Auditing Standards']
      },
      {
        field: 'Finance',
        description: 'Capital structure, corporate financial forecasting, and valuation analysis.',
        targetJobs: ['Junior Financial Analyst', 'Equity Research Associate', 'Investment Banking Analyst'],
        skills: ['Financial Modeling', 'DCF Valuation', 'Corporate Finance', 'Ratio Analysis', 'Power BI']
      },
      {
        field: 'Banking',
        description: 'Retail and commercial lending, credit analysis, and KYC compliance.',
        targetJobs: ['Banking Associate', 'Probationary Officer (PO)', 'Credit Manager'],
        skills: ['Banking Operations (RBI Norms)', 'KYC/AML Compliance', 'Credit Risk Appraisal', 'Customer Advisory']
      },
      {
        field: 'Business Operations',
        description: 'Streamlining fulfillment, logistics, vendor agreements, and KPI tracking.',
        targetJobs: ['Business Operations Executive', 'Supply Chain Coordinator', 'Operations Lead'],
        skills: ['Process Optimization', 'Vendor Coordination', 'Excel KPI Dashboards', 'ERP Platforms']
      },
      {
        field: 'Data Analytics',
        description: 'Extracting commercial insights from relational databases and transactions.',
        targetJobs: ['Data Analyst', 'Business Analyst', 'Reporting Specialist'],
        skills: ['Excel for Analysis', 'Statistics', 'SQL Querying', 'Python / Pandas', 'Power BI']
      },
      {
        field: 'Taxation',
        description: 'Direct income tax and indirect GST statutory filings and compliance.',
        targetJobs: ['Tax Assistant', 'GST Consultant', 'Corporate Tax Executive'],
        skills: ['Income Tax Act (Old vs New)', 'GST Filing (GSTR-1/3B)', 'Form 26AS/AIS', 'Tax Planning']
      }
    ];
  }

  if (lower.includes('tech') || lower.includes('computer') || lower.includes('mca') || lower.includes('b.sc')) {
    return [
      {
        field: 'Software Engineering',
        description: 'Architecting scalable applications, microservices, and web platforms.',
        targetJobs: ['Software Developer', 'Backend Developer', 'Frontend Engineer'],
        skills: ['JavaScript / Node.js', 'React.js', 'Databases (SQL & NoSQL)', 'REST APIs', 'Git']
      },
      {
        field: 'Data & Artificial Intelligence',
        description: 'Transforming massive datasets, statistical modeling, and machine learning.',
        targetJobs: ['Data Analyst', 'Data Scientist', 'Machine Learning Engineer'],
        skills: ['SQL', 'Python (Pandas & NumPy)', 'Power BI', 'Business Statistics', 'Machine Learning']
      },
      {
        field: 'Cloud & DevOps',
        description: 'Containerizing services, automated CI/CD pipelines, and cloud systems.',
        targetJobs: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer'],
        skills: ['Linux Shell', 'Docker Containers', 'AWS / Azure Basics', 'CI/CD Pipelines (GitHub Actions)']
      }
    ];
  }

  if (lower.includes('electric') || lower.includes('iti')) {
    return [
      {
        field: 'Industrial Electrical Systems',
        description: 'Heavy industrial power grids, motor starters, and switchgear panels.',
        targetJobs: ['Industrial Electrical Technician', 'Panel Wireman', 'Maintenance Electrician'],
        skills: ['Industrial Wiring', 'Electrical Safety (LOTO)', 'Three-Phase Motor Starters', 'Megger & Multimeter Testing']
      },
      {
        field: 'Power Distribution & Utilities',
        description: 'Substation maintenance, power transmission, and transformer operations.',
        targetJobs: ['Substation Technician', 'Junior Lineman', 'Railway Technician'],
        skills: ['High Voltage Safety', 'Transformer Maintenance', 'Earthing & Grounding', 'Overhead Line Safety']
      }
    ];
  }

  // Default cluster
  return [
    {
      field: 'Domain Operations & Management',
      description: 'Core professional practice aligned with your study discipline.',
      targetJobs: ['Operations Specialist', 'Project Coordinator', 'Executive Associate'],
      skills: ['Domain Fundamentals', 'Digital Software Proficiency', 'Process Management', 'Stakeholder Communication']
    }
  ];
}
