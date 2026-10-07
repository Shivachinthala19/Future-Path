/**
 * Target Job Pathway & Roadmap Engine
 * Generates 100% target-job specific education routes, qualifications, 
 * skills, 9-step preparation roadmaps, and interview guidance.
 * NEVER defaults to software engineering unless the job is actually a software role.
 */

export class RoadmapService {
  /**
   * Generates a complete domain-specific profile for any target job
   */
  static getJobRoadmapDetails(jobTitle = '', userEducation = 'B.Com') {
    const titleLower = (jobTitle || '').toLowerCase().trim();
    const eduLower = (userEducation || '').toLowerCase().trim();

    // 1. DATA ANALYST / BUSINESS ANALYST
    if (titleLower.includes('data analyst') || titleLower.includes('business analyst') || titleLower.includes('data analytics')) {
      const isCommerce = eduLower.includes('com') || eduLower.includes('finance') || eduLower.includes('business') || eduLower.includes('econ');
      const isTech = eduLower.includes('tech') || eduLower.includes('mca') || eduLower.includes('computer') || eduLower.includes('b.sc');

      return {
        domain: 'Data & Business Intelligence',
        sector: 'Analytics & Business Intelligence',
        salary: '₹5.5 - 11.0 LPA',
        educationRelevance: isCommerce
          ? `Your ${userEducation} degree provides strong commercial acumen, financial numeracy, and KPI intuition. You need to bridge technical tooling (SQL, Python, Power BI) to manipulate datasets.`
          : isTech
          ? `Your ${userEducation} degree directly provides computing and database foundations. Focus on dashboarding and business storytelling.`
          : `Your background in ${userEducation} provides domain reasoning. Transitioning requires building demonstrated competency in SQL and visual dashboarding.`,
        qualificationRequirements: {
          degreeAccepted: `${userEducation} meets academic qualification requirements.`,
          requiredQualifications: ['Bachelor Degree in Commerce, STEM, Economics, or recognized equivalent'],
          certificationsRecommended: ['Microsoft PL-300 (Power BI Certified)', 'Google Data Analytics Certificate', 'Tableau Desktop Specialist'],
          licensesRequired: 'None',
          entranceExams: 'None for private corporate roles'
        },
        multipleRoutes: [
          {
            name: 'Route 1: Direct Computing / Analytical Degree',
            type: 'DIRECT_ROUTE',
            description: 'Direct entry via B.Tech CSE, BCA, B.Sc Statistics with coursework in databases and discrete math.',
            steps: ['Degree in CS/Math/Stats', 'SQL & RDBMS', 'Python for Analytics', 'BI Tools (Power BI)', 'Analytics Projects', 'Job Placement']
          },
          {
            name: 'Route 2: Quantitative Commerce & Business Route',
            type: 'ALTERNATIVE_ROUTE',
            description: 'Leverages business, accounting, and economic intuition combined with acquired data querying skills.',
            steps: [`${userEducation}`, 'Advanced Excel', 'SQL Joins & Aggregations', 'Business Metrics & KPIs', 'Power BI Dashboards', 'Job Placement']
          },
          {
            name: 'Route 3: Career Switch / Portfolio Route',
            type: 'CAREER_SWITCH_ROUTE',
            description: 'Any degree discipline supported by verified end-to-end portfolio projects and public dashboards.',
            steps: ['Any Degree', 'Structured Analytics Curriculum', '2-3 Domain Capstone Projects', 'Public Dashboard Portfolio', 'Targeted Applications']
          }
        ],
        skillsAlreadyHave: isCommerce
          ? ['Business Economics', 'Financial Numeracy', 'Basic Spreadsheets', 'Metric & Ratio Intuition']
          : ['Analytical Thinking', 'Problem Solving', 'Structured Logic'],
        skillsYouNeed: [
          { name: 'Advanced Excel', level: 'Fundamental', desc: 'VLOOKUP/XLOOKUP, Pivot Tables, Power Query, Financial Models' },
          { name: 'SQL (Relational DBs)', level: 'Critical', desc: 'Complex Joins, Window Functions (DENSE_RANK), Group By, Subqueries, CTEs' },
          { name: 'Power BI / Tableau', level: 'Critical', desc: 'Data modeling, Star Schema, DAX measures, interactive executive dashboards' },
          { name: 'Python for Analytics', level: 'Core', desc: 'Pandas data wrangling, NumPy calculations, Matplotlib visual distribution' },
          { name: 'Business Storytelling', level: 'Core', desc: 'Translating raw numbers into executive recommendations and KPI tracking' }
        ],
        stepByStepRoadmap: [
          {
            step: 1,
            title: 'Understand the Data Analyst Role & Business Metrics',
            type: 'ROLE_ORIENTATION',
            description: 'Understand how analytics departments deliver value: tracking revenue retention, churn rates, CAC, LTV, and operational efficiencies.',
            whatToLearn: 'Core business metrics, difference between descriptive, diagnostic, predictive, and prescriptive analytics.',
            whyItMatters: 'Recruiters reject analysts who know tool syntax but cannot interpret commercial business meaning.'
          },
          {
            step: 2,
            title: 'Master Spreadsheet Modeling (Advanced Excel)',
            type: 'TECHNICAL_TOOL',
            description: 'Learn enterprise spreadsheet data cleaning, formula structuring, and automated reconciliation.',
            whatToLearn: 'XLOOKUP, INDEX-MATCH, nested IFs, Pivot Tables, conditional formatting, dynamic charts, Power Query.',
            whyItMatters: 'Excel remains the primary language of business stakeholders and initial data sanity checking.'
          },
          {
            step: 3,
            title: 'Master Relational Databases & SQL Querying',
            type: 'CORE_SKILL',
            description: 'Develop fluency in querying enterprise PostgreSQL or MySQL databases with multi-table joins.',
            whatToLearn: 'INNER/LEFT/RIGHT joins, GROUP BY, HAVING, subqueries, CTEs, Window functions (ROW_NUMBER, RANK, LEAD/LAG).',
            whyItMatters: '80%+ of technical interviews for Data Analysts test SQL live.'
          },
          {
            step: 4,
            title: 'Business Intelligence & Executive Dashboards (Power BI)',
            type: 'VISUALIZATION_TOOL',
            description: 'Build enterprise star-schema data models and executive dashboard reports.',
            whatToLearn: 'Power Query transformations, 1-to-many relationships, DAX measures (CALCULATE, RELATED, DATESYTD), drill-downs.',
            whyItMatters: 'Dashboards are the final deliverable presented to executives and decision-makers.'
          },
          {
            step: 5,
            title: 'Python for Exploratory Data Analysis (EDA)',
            type: 'PROGRAMMING_SKILL',
            description: 'Use Python notebooks to clean messy datasets and perform statistical outlier detection.',
            whatToLearn: 'Pandas DataFrames, groupby operations, handling nulls, NumPy array math, Seaborn distribution plots.',
            whyItMatters: 'Automates large-scale data ingestion and prepares you for advanced data science.'
          },
          {
            step: 6,
            title: 'Build 2–3 Real-World Analytics Capstone Projects',
            type: 'PORTFOLIO_BUILDING',
            description: 'Execute end-to-end data projects solving realistic industry problems (e.g. Sales churn, Financial P&L).',
            whatToLearn: 'Dataset cleaning, SQL querying, dashboard creation, hosting reports on NovyPro or GitHub with README.',
            whyItMatters: 'Portfolio proof is mandatory to demonstrate competence and overcome lack of prior experience.'
          },
          {
            step: 7,
            title: 'Create ATS-Optimized Analytics Resume & Portfolio',
            type: 'RESUME_PREPARATION',
            description: 'Frame accomplishments with impact metrics rather than generic responsibilities.',
            whatToLearn: 'Bullet formula: [Action Verb] + [Dataset/Tool] + [Quantified Business Outcome].',
            whyItMatters: 'Ensures your resume passes corporate ATS keyword filters and highlights transferable analytical skills.'
          },
          {
            step: 8,
            title: 'Practice SQL Live Querying & Business Case Interviews',
            type: 'INTERVIEW_PREP',
            description: 'Practice timed SQL queries and behavioral scenarios explaining trade-offs.',
            whatToLearn: 'LeetCode database problems, explaining project architecture, handling stakeholder ambiguity.',
            whyItMatters: 'Prepares you for the live 45-minute technical round.'
          },
          {
            step: 9,
            title: 'Targeted Applications & Career Progression',
            type: 'JOB_APPLICATION',
            description: 'Apply to FinTech, consultancies, e-commerce, and corporate analytics departments.',
            whatToLearn: 'LinkedIn outreach to Analytics Managers, targeting entry analyst / graduate trainee openings.',
            whyItMatters: 'Focuses your job search on companies with structured hiring cycles.'
          }
        ],
        projects: [
          { title: 'Executive Sales & Churn Analytics Dashboard', tech: 'SQL, Power BI, DAX', desc: 'Analyzed 200K+ transactional records; identified top churn drivers and built automated executive dashboard.' },
          { title: 'Customer Lifetime Value & RFM Segmentation', tech: 'Python, Pandas, Seaborn', desc: 'Segmented customer cohorts using recency, frequency, and monetary metrics to optimize marketing spend.' }
        ],
        careerProgression: ['Junior Data Analyst', 'Data Analyst', 'Senior Analytics Consultant', 'Analytics Lead', 'Director of Business Intelligence'],
        higherStudies: ['M.Sc / M.Tech in Data Science & AI', 'MBA in Business Analytics', 'Chartered Financial Analyst (CFA) Level 1']
      };
    }

    // 2. ACCOUNTANT / ACCOUNTS EXECUTIVE / TAX CONSULTANT / AUDITOR
    if (titleLower.includes('account') || titleLower.includes('tax') || titleLower.includes('audit') || titleLower.includes('bookkeeper')) {
      const isCommerce = eduLower.includes('com') || eduLower.includes('finance') || eduLower.includes('business');

      return {
        domain: 'Accounting & Corporate Finance',
        sector: 'Accounting, Auditing & Taxation',
        salary: '₹3.5 - 7.5 LPA',
        educationRelevance: isCommerce
          ? `Your ${userEducation} degree provides direct academic grounding in financial accounting, double-entry bookkeeping, and corporate taxation.`
          : `Transitioning to Accountant from ${userEducation} requires mastering double-entry bookkeeping principles, statutory tax laws (GST & TDS), and ERP accounting software.`,
        qualificationRequirements: {
          degreeAccepted: isCommerce ? 'B.Com / BBA is the direct qualifying degree.' : 'Any bachelor degree supplemented by accounting diploma or certification.',
          requiredQualifications: ['Bachelor Degree in Commerce / Accounting, or Diploma in Financial Accounting'],
          certificationsRecommended: ['Tally Certified Professional (TCP)', 'GST Practitioner Certificate', 'SAP FICO / Zoho Books Certification'],
          licensesRequired: 'None for corporate accounting; CA / CMA required for statutory audit signing authority',
          entranceExams: 'None for private corporate jobs; SSC CGL / State Accounts exams for government audit'
        },
        multipleRoutes: [
          {
            name: 'Route 1: Direct Commerce Graduation Route',
            type: 'DIRECT_ROUTE',
            description: 'Direct entry via B.Com / M.Com with campus or CA firm recruitment.',
            steps: ['B.Com Degree', 'Tally Prime Mastery', 'GST & TDS E-filing', 'Bank Reconciliation', 'CA Firm / Corporate Placement']
          },
          {
            name: 'Route 2: Professional Accounting Route',
            type: 'ALTERNATIVE_ROUTE',
            description: 'Enrollment in CA Inter, CMA Inter, or ACCA for fast-track senior corporate accounting.',
            steps: ['Degree / 12th', 'CA Foundation / Inter or CMA', 'Articleship / Industrial Training', 'Corporate Audit Role']
          },
          {
            name: 'Route 3: Practical Accounting Certification Route',
            type: 'CAREER_SWITCH_ROUTE',
            description: 'Bridging general education with intensive 3–6 month practical Tally and GST certification.',
            steps: [`${userEducation}`, 'Diploma in Computerized Accounting (Tally/SAP)', 'SME Bookkeeping Project', 'Accounts Executive Entry']
          }
        ],
        skillsAlreadyHave: isCommerce
          ? ['Double-Entry Bookkeeping', 'P&L / Balance Sheet Basics', 'Financial Principles', 'Taxation Fundamentals']
          : ['Numeracy', 'Attention to Detail', 'Basic Spreadsheets'],
        skillsYouNeed: [
          { name: 'Tally Prime / Zoho Books', level: 'Critical', desc: 'Voucher creation, ledger reconciliation, stock management, GST masters' },
          { name: 'GST & TDS E-Filing', level: 'Critical', desc: 'GSTR-1, GSTR-3B monthly filing, 2B reconciliation, Form 26AS, TDS Challan 281' },
          { name: 'Advanced Excel', level: 'Core', desc: 'VLOOKUP, Pivot Tables, Bank Reconciliation Statements (BRS) modeling' },
          { name: 'Corporate Compliance', level: 'Core', desc: 'Audit trails, statutory registers, depreciation schedule calculations' },
          { name: 'Financial Reporting', level: 'Fundamental', desc: 'Trial Balance adjustments, closing entries, Balance Sheet schedules' }
        ],
        stepByStepRoadmap: [
          {
            step: 1,
            title: 'Understand Role & Statutory Accounting Standards',
            type: 'ROLE_ORIENTATION',
            description: 'Master core responsibilities of corporate accountants: GAAP/Ind-AS standards, ledger maintenance, and statutory compliance timelines.',
            whatToLearn: 'Golden Rules of Accounting, Debit/Credit mechanics, Chart of Accounts, Financial Statements structure.',
            whyItMatters: 'Recruiters test your practical balance sheet instincts and journal entry reflexes immediately.'
          },
          {
            step: 2,
            title: 'Master Direct & Indirect Tax Regulations (GST & TDS)',
            type: 'REGULATORY_STUDY',
            description: 'Understand GST frameworks (CGST, SGST, IGST), Input Tax Credit rules, and TDS deduction sections.',
            whatToLearn: 'GSTR-1, GSTR-3B filing schedules, GSTR-2B reconciliation, TDS sections (194C, 194J, 194Q), Challan 281.',
            whyItMatters: 'Most entry and junior accounting positions require handling monthly tax compliance with zero penalties.'
          },
          {
            step: 3,
            title: 'Master Tally Prime & Modern Cloud Accounting Software',
            type: 'TECHNICAL_TOOL',
            description: 'Attain hands-on speed in Tally Prime, Zoho Books, or QuickBooks for corporate accounting.',
            whatToLearn: 'Sales/Purchase vouchers, contra entries, bank reconciliation, inventory tracking, GST tax invoices.',
            whyItMatters: 'Over 90% of Indian mid-market firms use Tally Prime as their primary accounting ERP.'
          },
          {
            step: 4,
            title: 'Advanced Excel for Financial Reconciliation',
            type: 'CORE_SKILL',
            description: 'Use spreadsheets to audit discrepancies between bank statements, vendor ledgers, and books.',
            whatToLearn: 'VLOOKUP, XLOOKUP, Pivot Tables, SUMIFS, Bank Reconciliation Statement (BRS) automation.',
            whyItMatters: 'Reconciliation is the daily benchmark for detecting accounting leakage and error.'
          },
          {
            step: 5,
            title: 'Build a Full Financial Year Practice Bookkeeping Project',
            type: 'PRACTICAL_PROJECT',
            description: 'Maintain simulated books of accounts for an SME from April to March with 500+ realistic vouchers.',
            whatToLearn: 'Opening balances, monthly adjustments, depreciation entries, closing trial balance, P&L, and balance sheet.',
            whyItMatters: 'Demonstrates tangible bookkeeping competence to show during interviews.'
          },
          {
            step: 6,
            title: 'Obtain Tally / GST Certification & Build Targeted Resume',
            type: 'CERTIFICATION_RESUME',
            description: 'Secure accredited industry credential and construct an ATS-optimized accounting resume.',
            whatToLearn: 'Tally Certified Professional test, bullet formulas quantifying invoices processed and returns filed.',
            whyItMatters: 'Verified credentials validate your practical software proficiency to recruiters.'
          },
          {
            step: 7,
            title: 'Prepare Accounting Technical Interview & Practical Viva',
            type: 'INTERVIEW_PREP',
            description: 'Prepare answers for accounting dilemmas, adjustment entries, and tax scenario questions.',
            whatToLearn: 'Accrual vs cash accounting, prepaid vs accrued expenses, treatment of bad debts, ITC eligibility.',
            whyItMatters: 'Ensures confidence during practical machine tests and technical grilling.'
          },
          {
            step: 8,
            title: 'Apply to CA Firms, Corporates & MNC Shared Services',
            type: 'JOB_APPLICATION',
            description: 'Submit targeted applications to CA partnership firms, corporate finance divisions, and business services.',
            whatToLearn: 'ICAI job board, Naukri accounting listings, direct cold outreach to CA firms for junior associate roles.',
            whyItMatters: 'CA firms offer unparalleled fast-track practical learning for fresh commerce talent.'
          },
          {
            step: 9,
            title: 'Career Advancement to Senior Accountant & Manager',
            type: 'CAREER_GROWTH',
            description: 'Expand your expertise to MIS reporting, budget forecasting, and preparation for CMA/CPA.',
            whatToLearn: 'Working capital management, ERP migration (SAP FICO), managerial accounting.',
            whyItMatters: 'Ensures long-term progression from Accounts Executive to Finance Manager.'
          }
        ],
        projects: [
          { title: 'SME Full Financial Year Ledger & P&L', tech: 'Tally Prime, Excel', desc: 'Simulated 12 months of transactional records for a trading firm, producing trial balance and balance sheet.' },
          { title: 'Monthly GST & TDS Return Reconciliation', tech: 'Excel, GST Portal Formats', desc: 'Audited purchase invoices against GSTR-2B, calculated Input Tax Credit, and drafted GSTR-3B.' }
        ],
        careerProgression: ['Accounts Executive / Assistant', 'Accountant', 'Senior Accountant', 'Finance & Accounts Manager', 'Chief Financial Officer (CFO)'],
        higherStudies: ['M.Com (Master of Commerce)', 'MBA in Finance & Banking', 'CMA (Cost & Management Accounting)', 'CA (Chartered Accountancy)']
      };
    }

    // 3. ELECTRICIAN / ELECTRICAL TECHNICIAN / MAINTENANCE ENGINEER
    if (titleLower.includes('electric') || titleLower.includes('wireman') || titleLower.includes('lineman') || titleLower.includes('substation')) {
      const isVocational = eduLower.includes('iti') || eduLower.includes('electric') || eduLower.includes('diploma');

      return {
        domain: 'Electrical Systems & Industrial Maintenance',
        sector: 'Power, Infrastructure & Manufacturing',
        salary: '₹2.8 - 6.0 LPA',
        educationRelevance: isVocational
          ? `Your ${userEducation} training directly qualifies you for industrial wiring, motor maintenance, and electrical panel operations.`
          : `Transitioning to Electrician requires formal vocational electrical trade training (ITI/Diploma) and mandatory statutory state licensing.`,
        qualificationRequirements: {
          degreeAccepted: 'ITI in Electrician Trade (2 years) or Diploma in Electrical Engineering (3 years).',
          requiredQualifications: ['National Trade Certificate (NTC) / National Apprenticeship Certificate (NAC) in Electrician trade'],
          certificationsRecommended: ['State Electrical Wireman Permit / Supervisor License (Grade A/B)'],
          licensesRequired: 'Mandatory State Licensing Board Electrical Wireman Permit for high-voltage work',
          entranceExams: 'State DISCOM trade test / Railway ALP exam for public sector appointments'
        },
        multipleRoutes: [
          {
            name: 'Route 1: Direct ITI / Vocational Trade Route',
            type: 'DIRECT_ROUTE',
            description: '2-year ITI Electrician course followed by National Apprenticeship Certificate (NAC).',
            steps: ['10th / SSC Pass', 'ITI Electrician Trade (2 Yrs)', 'All India Trade Test (AITT)', '1-Year Apprenticeship', 'Licensed Electrician']
          },
          {
            name: 'Route 2: Polytechnic Diploma Route',
            type: 'ALTERNATIVE_ROUTE',
            description: '3-year Diploma in Electrical Engineering for electrical supervisor and junior engineer positions.',
            steps: ['10th / 12th', 'Diploma in Electrical Engineering', 'Supervisor Licensing Examination', 'Junior Electrical Engineer']
          },
          {
            name: 'Route 3: Industrial Trade Apprenticeship',
            type: 'CAREER_SWITCH_ROUTE',
            description: 'Hands-on practical apprenticeship with manufacturing plants or state electricity boards.',
            steps: ['Qualifying Education', 'National Apprenticeship Promotion Scheme', 'Practical Trade Viva', 'Industrial Maintenance Technician']
          }
        ],
        skillsAlreadyHave: isVocational
          ? ['Basic Electrical Theory', 'Circuit Diagrams Reading', 'Tool Handling', 'Safety Protocols']
          : ['Technical Aptitude', 'Safety Awareness', 'Physical Stamina'],
        skillsYouNeed: [
          { name: 'Industrial Wiring & Panels', level: 'Critical', desc: 'Panel board assembly, busbar wiring, conduit bending, contactors and relays' },
          { name: 'Motor Controls & Starters', level: 'Critical', desc: 'DOL starters, Star-Delta starters, 3-phase induction motors maintenance' },
          { name: 'Testing Instruments', level: 'Critical', desc: 'Multimeter, Megger (insulation tester), clamp meter, earth resistance tester' },
          { name: 'Electrical Safety & Standards', level: 'Fundamental', desc: 'Indian Electricity Rules, PPE protocols, Lockout/Tagout (LOTO), earthing standards' }
        ],
        stepByStepRoadmap: [
          {
            step: 1,
            title: 'Understand Electrical Standards & Safety Protocols',
            type: 'SAFETY_FOUNDATION',
            description: 'Learn statutory Indian Electricity Rules (IER), shock prevention, earthing systems, and personal protective equipment (PPE).',
            whatToLearn: 'Lockout/Tagout (LOTO), fire extinguisher classes (Class C/E), rescue from live conductors, artificial respiration.',
            whyItMatters: 'Electrical safety is legally mandated; safety violations in industrial plants result in immediate termination or hazard.'
          },
          {
            step: 2,
            title: 'Circuit Theory, Schematics & Power Distribution',
            type: 'CORE_THEORY',
            description: 'Master Ohm’s law, Kirchhoff’s laws, AC vs DC circuits, single-phase vs 3-phase systems, and wiring schematic diagrams.',
            whatToLearn: 'Color codes (Phase, Neutral, Earth), cable sizing by current capacity, voltage drop calculations.',
            whyItMatters: 'Enables quick troubleshooting of complex control panels and distribution boards.'
          },
          {
            step: 3,
            title: 'Diagnostic Instruments & Electrical Measuring Tools',
            type: 'TOOL_MASTERY',
            description: 'Become proficient in using electrical measurement and testing instruments.',
            whatToLearn: 'Digital Multimeter (AC/DC voltage, continuity, resistance), Megger for insulation testing, Clamp Meter for live current.',
            whyItMatters: 'Accurate measurement prevents equipment burnout and detects earth leakages.'
          },
          {
            step: 4,
            title: 'Domestic & Industrial Wiring Installation',
            type: 'PRACTICAL_SKILL',
            description: 'Hands-on conduit pipe laying, MCB/ELCB/RCCB installation, and distribution board termination.',
            whatToLearn: 'Staircase wiring, godown wiring, commercial sub-distribution boards, pipe/plate earthing installation.',
            whyItMatters: 'Core daily operational deliverable expected by contractors and plant supervisors.'
          },
          {
            step: 5,
            title: 'Electric Motors, Starters & Control Panels',
            type: 'MACHINERY_SKILL',
            description: 'Master wiring and maintenance of AC/DC motors, Star-Delta starters, and motor control centers (MCC).',
            whatToLearn: 'Direct-on-Line (DOL) starters, forward-reverse motor control, thermal overload relay calibration.',
            whyItMatters: 'Motors drive 70% of manufacturing plant electrical machinery.'
          },
          {
            step: 6,
            title: 'Obtain State Wireman License & Trade Documentation',
            type: 'LICENSING',
            description: 'Apply to the State Electrical Licensing Board for Wireman Permit / Supervisor Certificate.',
            whatToLearn: 'Licensing board viva requirements, statutory documentation, NCVT marks verification.',
            whyItMatters: 'Legally authorizes you to execute and sign commercial electrical installation work.'
          },
          {
            step: 7,
            title: 'Trade Practical Test & Troubleshooting Practice',
            type: 'ASSESSMENT_PREP',
            description: 'Practice fast fault-finding on simulated motor control circuits and wiring boards.',
            whatToLearn: 'Tracing open circuits, short circuits, phase imbalance, and testing under exam conditions.',
            whyItMatters: 'State DISCOMs, Railways, and private factories administer practical trade tests before hiring.'
          },
          {
            step: 8,
            title: 'Apply to DISCOMs, Railways, Factories & Contractors',
            type: 'JOB_APPLICATION',
            description: 'Submit applications through apprenticeship portals, state electricity boards, and manufacturing plants.',
            whatToLearn: 'National Apprenticeship Portal (NAPS), Railway ALP/Technician recruitment, facility management agencies.',
            whyItMatters: 'Connects you directly to stable public sector and industrial opportunities.'
          },
          {
            step: 9,
            title: 'Career Advancement to Electrical Supervisor / Engineer',
            type: 'CAREER_GROWTH',
            description: 'Advance to Senior Maintenance Technician, Electrical Supervisor, or Substation Operator.',
            whatToLearn: 'PLC automation basics, transformer maintenance, HT/LT substation operations.',
            whyItMatters: 'Transitions your career from physical wiring to supervisory and plant maintenance management.'
          }
        ],
        projects: [
          { title: 'Automatic Star-Delta Starter Control Panel', tech: 'Contactors, Timers, Overload Relays', desc: 'Assembled a dual-mode starter panel for a 15HP 3-phase induction motor with auto-switching and trip protection.' },
          { title: 'Commercial Distribution Board & Earth Pit Setup', tech: 'MCB, RCCB, Plate Earthing', desc: 'Installed a 3-phase commercial distribution board with surge protection and achieved earth resistance < 2 ohms.' }
        ],
        careerProgression: ['Apprentice Electrician', 'Industrial Electrician', 'Senior Maintenance Technician', 'Electrical Supervisor', 'Plant Electrical In-Charge'],
        higherStudies: ['Polytechnic Diploma in Electrical Engineering (Lateral Entry)', 'Craft Instructor Training Scheme (CITS)', 'B.Tech Electrical & Electronics']
      };
    }

    // 4. MECHANICAL ENGINEER / CAD DESIGNER
    if (titleLower.includes('mechanical') || titleLower.includes('cad') || titleLower.includes('automobile') || titleLower.includes('hvac')) {
      return {
        domain: 'Mechanical Design & Industrial Engineering',
        sector: 'Manufacturing, Automotive & Industrial Systems',
        salary: '₹4.0 - 9.5 LPA',
        educationRelevance: eduLower.includes('mech')
          ? `Your ${userEducation} degree directly covers thermodynamics, mechanics of solids, fluid dynamics, and manufacturing technology.`
          : `Transitioning to Mechanical roles requires formal diploma/degree training in mechanical engineering principles and CAD/CAM software.`,
        qualificationRequirements: {
          degreeAccepted: 'B.Tech / B.E. in Mechanical Engineering, Automobile, or Production Engineering; or Diploma in Mechanical.',
          requiredQualifications: ['Accredited Bachelor Degree or Diploma in Mechanical Engineering'],
          certificationsRecommended: ['Certified SolidWorks Professional (CSWP)', 'AutoCAD Certified User', 'ANSYS FEA Specialist'],
          licensesRequired: 'None for general industry; Boiler Operation Engineer (BOE) license for power plant roles',
          entranceExams: 'GATE for PSU engineering jobs (BHEL, IOCL, ONGC)'
        },
        multipleRoutes: [
          {
            name: 'Route 1: Accredited Engineering Degree Route',
            type: 'DIRECT_ROUTE',
            description: 'Standard 4-year B.Tech Mechanical Engineering with campus placement or GATE examination.',
            steps: ['B.Tech Mechanical', 'Machine Design & CAD', 'Industrial Internship', 'PSU / OEM Campus Placement']
          },
          {
            name: 'Route 2: Polytechnic Diploma to Lateral B.Tech',
            type: 'ALTERNATIVE_ROUTE',
            description: '3-year Diploma followed by lateral entry into 2nd year B.Tech or direct industry entry.',
            steps: ['Diploma Mechanical', 'CNC / Tool Room Experience', 'Lateral B.Tech Entry', 'Design Engineer Placement']
          },
          {
            name: 'Route 3: Specialized CAD/CAM/CAE Design Track',
            type: 'CAREER_SWITCH_ROUTE',
            description: 'Focusing on computer-aided design, product engineering, and simulation software mastery.',
            steps: ['Engineering Background', 'SolidWorks / CATIA Mastery', 'FEA Simulation Projects', 'R&D Design Engineer']
          }
        ],
        skillsAlreadyHave: ['Engineering Mathematics', 'Physical Sciences', 'Technical Reasoning'],
        skillsYouNeed: [
          { name: '3D CAD Modeling (SolidWorks / CATIA)', level: 'Critical', desc: 'Part modeling, complex assemblies, surface design, GD&T manufacturing drawings' },
          { name: 'FEA Simulation (ANSYS)', level: 'Core', desc: 'Structural static analysis, thermal distribution, mesh optimization, stress concentrations' },
          { name: 'Manufacturing Processes', level: 'Core', desc: 'CNC machining, injection molding design, sheet metal fabrication, tolerance stack-up' },
          { name: 'Geometric Dimensioning & Tolerancing (GD&T)', level: 'Critical', desc: 'ASME Y14.5 standards, datum features, runout, position tolerances' }
        ],
        stepByStepRoadmap: [
          {
            step: 1,
            title: 'Understand Core Mechanical Disciplines & Industry Verticals',
            type: 'ROLE_ORIENTATION',
            description: 'Explore sectors: Automotive OEMs, Aerospace, Heavy Machinery, HVAC, and Product Design.',
            whatToLearn: 'Product development life cycle (PDLC), role distinctions between Design, CAE, Production, and Quality.',
            whyItMatters: 'Enables tailored skill development for your target industry sector.'
          },
          {
            step: 2,
            title: 'Master Strength of Materials & Machine Design Fundamentals',
            type: 'CORE_ENGINEERING',
            description: 'Solidify fundamental mechanics: stress-strain relations, bending moments, torsion, and factor of safety.',
            whatToLearn: 'Shaft design, gear drives, bearings selection, fastener torque calculations, failure theories (von Mises).',
            whyItMatters: 'Technical interviewers drill structural failure calculations before evaluating software skills.'
          },
          {
            step: 3,
            title: 'Master 3D CAD Parametric Design (SolidWorks / CATIA)',
            type: 'CAD_SOFTWARE',
            description: 'Attain high-speed parametric 3D modeling and engineering drawing production.',
            whatToLearn: 'Sketch constraints, sweep/loft features, top-down assembly design, BOM generation, exploded views.',
            whyItMatters: 'Primary day-to-day tool for design engineers creating production components.'
          },
          {
            step: 4,
            title: 'Geometric Dimensioning & Tolerancing (GD&T) Standards',
            type: 'TECHNICAL_STANDARD',
            description: 'Learn ASME Y14.5 standards for creating error-free manufacturing blueprints.',
            whatToLearn: 'Datums, true position, concentricity, flatness, perpendicularity, surface finish symbols.',
            whyItMatters: 'Without GD&T, 3D CAD models cannot be manufactured accurately in machine shops.'
          },
          {
            step: 5,
            title: 'Finite Element Analysis (FEA) with ANSYS',
            type: 'SIMULATION_TOOL',
            description: 'Simulate structural stress and thermal performance before physical prototyping.',
            whatToLearn: 'Meshing techniques (tetrahedral vs hexahedral), boundary conditions, stress concentration, deformation.',
            whyItMatters: 'Simulation validates safety factors and optimizes component weight in modern R&D.'
          },
          {
            step: 6,
            title: 'Design 2–3 Mechanical Products / Assembly Projects',
            type: 'PORTFOLIO_BUILDING',
            description: 'Build complete mechanism models with manufacturing drawings and simulation reports.',
            whatToLearn: 'Gearbox assembly, automotive suspension arm, sheet metal enclosure with fabrication drawings.',
            whyItMatters: 'Your physical portfolio book or 3D rendering reel is your primary hiring credential.'
          },
          {
            step: 7,
            title: 'Obtain Certified SolidWorks Professional (CSWP)',
            type: 'CERTIFICATION',
            description: 'Pass the globally recognized Dassault Systèmes CSWP exam.',
            whatToLearn: 'Timed parametric modification, assembly mating, mass property calculations.',
            whyItMatters: 'Provides third-party verification of your modeling speed and accuracy.'
          },
          {
            step: 8,
            title: 'Technical Viva & Mechanical Machine Test Preparation',
            type: 'INTERVIEW_PREP',
            description: 'Prepare answers for manufacturing processes, material selection, and 30-minute live CAD tests.',
            whatToLearn: 'Heat treatment processes, ferrous vs non-ferrous metals, tolerance stack-up analysis.',
            whyItMatters: 'Engineering recruiters consistently administer a 45-minute live CAD modeling test.'
          },
          {
            step: 9,
            title: 'Apply to Automotive OEMs, Industrial Plants & Consultancies',
            type: 'JOB_APPLICATION',
            description: 'Apply to automotive Tier-1 suppliers, heavy equipment manufacturers, and engineering consultancies.',
            whatToLearn: 'Targeting Graduate Engineer Trainee (GET) roles, utilizing campus recruitment and industry portals.',
            whyItMatters: 'Positions you for rapid advancement into Senior Design Engineer and Project Lead.'
          }
        ],
        projects: [
          { title: '2-Stage Industrial Reduction Gearbox Assembly', tech: 'SolidWorks, AGMA Standards', desc: 'Designed helical gear train, selected bearings and shaft seals; generated complete GD&T manufacturing drawings.' },
          { title: 'Automotive Wishbone Suspension Arm FEA Optimization', tech: 'ANSYS Mechanical, SolidWorks', desc: 'Conducted structural stress analysis under 3G bump load; reduced component mass by 14% while maintaining factor of safety > 2.0.' }
        ],
        careerProgression: ['Graduate Engineer Trainee (GET)', 'Mechanical Design Engineer', 'Senior Product Development Engineer', 'Lead Mechanical Engineer', 'Engineering Director / VP R&D'],
        higherStudies: ['M.Tech in Machine Design / Thermal Engineering', 'MS in Mechanical Engineering (Automotive / Robotics)', 'MBA in Operations & Supply Chain']
      };
    }

    // 5. CIVIL ENGINEER / SITE ENGINEER / STRUCTURAL ENGINEER
    if (titleLower.includes('civil') || titleLower.includes('construction') || titleLower.includes('structural') || titleLower.includes('site engineer')) {
      return {
        domain: 'Civil Engineering & Construction Management',
        sector: 'Infrastructure, Real Estate & Heavy Civil',
        salary: '₹3.8 - 8.5 LPA',
        educationRelevance: eduLower.includes('civil')
          ? `Your ${userEducation} curriculum directly covers structural analysis, soil mechanics, concrete technology, and surveying.`
          : `Transitioning to Civil Engineering requires formal degree/diploma education in civil engineering disciplines.`,
        qualificationRequirements: {
          degreeAccepted: 'B.Tech / B.E. in Civil Engineering or Diploma in Civil Engineering.',
          requiredQualifications: ['Accredited Bachelor Degree or 3-year Diploma in Civil Engineering'],
          certificationsRecommended: ['AutoCAD Civil 3D Certification', 'STAAD.Pro Structural Engineer', 'Revit BIM Architecture'],
          licensesRequired: 'Chartered Engineer / Licensed Structural Engineer for structural blueprint sign-off',
          entranceExams: 'GATE for PSU infrastructure roles (NHAI, NBCC); SSC JE for central government engineering'
        },
        multipleRoutes: [
          {
            name: 'Route 1: B.Tech Civil Engineering Degree',
            type: 'DIRECT_ROUTE',
            description: 'Standard 4-year engineering program qualifying for site execution and structural design.',
            steps: ['B.Tech Civil', 'AutoCAD & STAAD.Pro', 'Site Internship', 'EPC Contractor Placement']
          },
          {
            name: 'Route 2: Polytechnic Diploma Route',
            type: 'ALTERNATIVE_ROUTE',
            description: '3-year diploma qualifying for Junior Engineer (JE) and site execution supervisor roles.',
            steps: ['Diploma Civil', 'Surveying & Quantity Estimation', 'Site Supervisor Role', 'Junior Engineer']
          },
          {
            name: 'Route 3: Building Information Modeling (BIM) Specialization',
            type: 'CAREER_SWITCH_ROUTE',
            description: 'Focusing on digital construction, 3D architectural modeling, and clash detection.',
            steps: ['Civil Degree', 'Revit BIM & Navisworks', '4D Scheduling in Primavera', 'BIM Coordinator']
          }
        ],
        skillsAlreadyHave: ['Basic Mathematics', 'Material Understanding', 'Spatial Visualization'],
        skillsYouNeed: [
          { name: 'Structural Design (STAAD.Pro / ETABS)', level: 'Critical', desc: 'RCC frame analysis, wind & seismic load calculation as per IS 456 and IS 1893' },
          { name: 'AutoCAD Civil 3D', level: 'Critical', desc: 'Structural detailing drawings, reinforcement layout, contour and road alignment maps' },
          { name: 'Quantity Surveying & Estimation', level: 'Core', desc: 'Bill of Quantities (BOQ), rate analysis, bar bending schedules (BBS), material procurement' },
          { name: 'Site Execution & Quality Control', level: 'Core', desc: 'Concrete slump test, cube strength testing, shuttering inspection, site diary maintenance' }
        ],
        stepByStepRoadmap: [
          {
            step: 1,
            title: 'Understand Civil Verticals: Site, Structural, Estimation & BIM',
            type: 'ROLE_ORIENTATION',
            description: 'Differentiate career paths: on-site execution, structural consultancy, quantity surveying, or project management.',
            whatToLearn: 'Roles of Client, Contractor, and Consultant, construction project stages.',
            whyItMatters: 'Allows you to target your training toward site operations or air-conditioned design offices.'
          },
          {
            step: 2,
            title: 'Concrete Technology, Soil Mechanics & IS Codes',
            type: 'CORE_ENGINEERING',
            description: 'Master standard building codes: IS 456 (Plain and Reinforced Concrete) and IS 1893 (Earthquake Resistant Design).',
            whatToLearn: 'Mix design (M20, M25, M30), water-cement ratio, curing protocols, soil bearing capacity calculation.',
            whyItMatters: 'Foundational criteria tested in every technical interview and on-site quality check.'
          },
          {
            step: 3,
            title: 'Master Drafting & Structural Drawings with AutoCAD',
            type: 'DRAFTING_TOOL',
            description: 'Produce high-precision architectural layouts and structural reinforcement detailing plans.',
            whatToLearn: 'Column-beam layout, slab reinforcement schedules, foundation footings, cross-section views.',
            whyItMatters: 'AutoCAD is the universal drawing language shared between design consultants and site engineers.'
          },
          {
            step: 4,
            title: 'Structural Analysis & Design Software (STAAD.Pro / ETABS)',
            type: 'STRUCTURAL_TOOL',
            description: 'Model multi-story residential and commercial buildings under gravity and lateral earthquake loads.',
            whatToLearn: 'Dead/Live loads, seismic zone factors, wind loads, shear force and bending moment diagrams.',
            whyItMatters: 'Essential for structural design engineer roles in engineering consultancy firms.'
          },
          {
            step: 5,
            title: 'Quantity Surveying, Estimation & Bar Bending Schedules (BBS)',
            type: 'ESTIMATION_SKILL',
            description: 'Calculate exact quantities of cement, sand, aggregate, and steel rebar required for construction.',
            whatToLearn: 'Bill of Quantities (BOQ), CPWD schedule of rates, cutting and bending length calculations for steel.',
            whyItMatters: 'Crucial for cost control and preventing material theft or overruns on construction sites.'
          },
          {
            step: 6,
            title: 'Execute a Comprehensive Multi-Story Building Project',
            type: 'PRACTICAL_PROJECT',
            description: 'Execute a G+4 building design from architectural plan to STAAD structural analysis and BOQ estimate.',
            whatToLearn: 'Complete project portfolio: floor plan, structural 3D frame model, bending moment envelopes, steel BOQ.',
            whyItMatters: 'Gives concrete tangible proof of your design capabilities to construction hiring managers.'
          },
          {
            step: 7,
            title: 'Master On-Site Quality Assurance & Safety Procedures',
            type: 'SITE_MANAGEMENT',
            description: 'Learn on-site quality checks: concrete slump testing, compressive cube testing, rebar lap length checks.',
            whatToLearn: 'Safety protocols, scaffolding inspection, formwork stripping times, checking contractor billing.',
            whyItMatters: 'Directly prepares you for site engineer responsibilities on day one.'
          },
          {
            step: 8,
            title: 'Prepare Technical Drawing Reading & Structural Interview',
            type: 'INTERVIEW_PREP',
            description: 'Practice rapid interpretation of structural blueprints and answering concrete technology viva questions.',
            whatToLearn: 'Development length (Ld), cover thickness, bleeding/segregation of concrete, foundation settlement.',
            whyItMatters: 'Site managers test your ability to read construction drawings under pressure.'
          },
          {
            step: 9,
            title: 'Apply to Infrastructure Contractors & Engineering Firms',
            type: 'JOB_APPLICATION',
            description: 'Target construction contractors (L&T, Tata Projects, Shapoorji Pallonji), real estate developers, and government exams.',
            whatToLearn: 'SSC JE, State PWD exams, private construction walk-ins, LinkedIn networking with Project Managers.',
            whyItMatters: 'Ensures structured entry and rapid progression toward Project Manager.'
          }
        ],
        projects: [
          { title: 'G+4 Commercial RCC Building Structural Analysis', tech: 'STAAD.Pro, AutoCAD, IS 456', desc: 'Modeled complete frame for commercial complex; analyzed seismic loads (Zone III) and detailed reinforcement plans.' },
          { title: 'Comprehensive Bill of Quantities (BOQ) & Steel BBS', tech: 'Excel, CPWD DSR', desc: 'Prepared detailed material takeoff for a 12,000 sq.ft residential project including earthwork, concrete, and rebar.' }
        ],
        careerProgression: ['Graduate Site Engineer', 'Site Engineer', 'Project Engineer', 'Senior Project Manager', 'General Manager Projects'],
        higherStudies: ['M.Tech in Structural Engineering / Construction Management', 'MBA in Real Estate & Infrastructure Management', 'Chartered Engineer (IEI)']
      };
    }

    // 6. TEACHER / SCHOOL EDUCATOR / LECTURER
    if (titleLower.includes('teacher') || titleLower.includes('educator') || titleLower.includes('faculty') || titleLower.includes('professor') || titleLower.includes('lecturer')) {
      return {
        domain: 'Education & Pedagogy',
        sector: 'School Education & Higher Academics',
        salary: '₹3.0 - 7.5 LPA',
        educationRelevance: `Your ${userEducation} degree provides your core subject discipline. To teach in recognized schools or colleges, statutory professional qualifications (B.Ed or UGC-NET) are mandated by law.`,
        qualificationRequirements: {
          degreeAccepted: 'Bachelor / Master degree in relevant subject + B.Ed (Bachelor of Education) for schools; Master degree + UGC-NET for colleges.',
          requiredQualifications: ['Bachelor of Education (B.Ed) for TGT/PGT school roles', 'Master degree in subject with min 55% for college lecturers'],
          certificationsRecommended: ['CTET (Central Teacher Eligibility Test) Paper 1 & 2', 'State TET (Teacher Eligibility Test)'],
          licensesRequired: 'Mandatory CTET/TET qualification for government and CBSE-affiliated schools',
          entranceExams: 'CTET, State TET, KVS/NVS recruitment exam, or UGC-NET / CSIR-NET'
        },
        multipleRoutes: [
          {
            name: 'Route 1: School Teaching Route (TGT / PGT)',
            type: 'DIRECT_ROUTE',
            description: 'Graduation/Postgraduation in chosen subject followed by 2-year B.Ed and CTET certification.',
            steps: [`${userEducation}`, '2-Year B.Ed Program', 'Qualify CTET Paper 1/2', 'CBSE / State School Placement']
          },
          {
            name: 'Route 2: College / University Lecturing Route',
            type: 'ALTERNATIVE_ROUTE',
            description: 'Master degree in discipline followed by qualifying national eligibility test (UGC-NET / JRF).',
            steps: ['Bachelor Degree', 'Master Degree (Min 55%)', 'Qualify UGC-NET / CSIR-NET', 'Assistant Professor Appointment']
          },
          {
            name: 'Route 3: Private Coaching / EdTech Educator Track',
            type: 'CAREER_SWITCH_ROUTE',
            description: 'Subject expertise and digital presentation skills for coaching institutes and online learning platforms.',
            steps: [`${userEducation}`, 'Deep Subject Prep', 'Digital Content Demonstration', 'EdTech / Coaching Faculty']
          }
        ],
        skillsAlreadyHave: ['Domain Subject Knowledge', 'Communication', 'Empathy & Patience'],
        skillsYouNeed: [
          { name: 'Pedagogy & Teaching Methodology', level: 'Critical', desc: 'Child psychology, inclusive education, experiential learning, Blooms taxonomy' },
          { name: 'Curriculum & Lesson Planning', level: 'Critical', desc: 'Designing unit plans, formative/summative assessments, rubrics as per NEP 2020' },
          { name: 'Classroom Management', level: 'Core', desc: 'Student engagement, conflict resolution, motivating diverse learning paces' },
          { name: 'EdTech & Smart Class Tools', level: 'Core', desc: 'Interactive whiteboards, Google Classroom, digital quizzes, PowerPoint storytelling' }
        ],
        stepByStepRoadmap: [
          {
            step: 1,
            title: 'Understand Educational Frameworks & Regulatory Criteria',
            type: 'ROLE_ORIENTATION',
            description: 'Learn statutory teaching rules: RTE Act, NEP 2020 pedagogical structures (5+3+3+4), and CBSE guidelines.',
            whatToLearn: 'Difference between PRT (Primary), TGT (Trained Graduate Teacher), and PGT (Post Graduate Teacher).',
            whyItMatters: 'Mandatory for understanding your eligibility band and salary scale.'
          },
          {
            step: 2,
            title: 'Attain Required Professional Qualification (B.Ed / UGC-NET)',
            type: 'MANDATORY_QUALIFICATION',
            description: 'Enroll in an NCTE-recognized Bachelor of Education (B.Ed) or prepare for UGC-NET.',
            whatToLearn: 'Educational psychology, philosophy of education, assessment strategies, subject-specific pedagogy.',
            whyItMatters: 'Non-negotiable legal requirement for permanent school or college teaching appointments in India.'
          },
          {
            step: 3,
            title: 'Deepen Academic Subject Mastery',
            type: 'ACADEMIC_STUDY',
            description: 'Master NCERT textbooks from Class 6 to 12 in your subject domain with zero conceptual ambiguity.',
            whatToLearn: 'Solving advanced textbook exercises, conceptual clarity, contextual real-life examples.',
            whyItMatters: 'School selection panels test your subject depth through unexpected viva questions.'
          },
          {
            step: 4,
            title: 'Master Lesson Planning & Modern Pedagogical Techniques',
            type: 'PEDAGOGICAL_SKILL',
            description: 'Create engaging lesson plans integrating hands-on activities, questioning techniques, and visual aids.',
            whatToLearn: '5E Instructional Model (Engage, Explore, Explain, Elaborate, Evaluate), structuring 45-minute class sessions.',
            whyItMatters: 'Lesson plans are evaluated rigorously during demo class evaluations.'
          },
          {
            step: 5,
            title: 'Qualify Teacher Eligibility Test (CTET / State TET)',
            type: 'ELIGIBILITY_TEST',
            description: 'Prepare and clear Central Teacher Eligibility Test (CTET Paper 2 for Secondary Teachers).',
            whatToLearn: 'Child development & pedagogy, subject methodology, reading comprehension, previous 5-year papers.',
            whyItMatters: 'Mandatory certificate for appointment in Kendriya Vidyalayas (KVS), Navodaya, and top CBSE schools.'
          },
          {
            step: 6,
            title: 'Develop Digital Classroom & EdTech Presentation Skills',
            type: 'EDTECH_TOOL',
            description: 'Learn to use smart boards, slide presentations, and learning management systems (Google Classroom).',
            whatToLearn: 'Interactive simulations (PhET for science/math), digital student tracking, engaging visual graphics.',
            whyItMatters: 'Modern private and international schools mandate digital fluency for all educators.'
          },
          {
            step: 7,
            title: 'Practice 15-Minute Live Demonstration Teaching (Demo Class)',
            type: 'PRACTICE_DEMO',
            description: 'Rehearse delivering a compelling 15-minute concept introduction in front of an evaluation panel.',
            whatToLearn: 'Blackboard writing neatness, body language, asking questions, wrapping up with key takeaways.',
            whyItMatters: '80% of teacher hiring decisions are based entirely on the live demo class.'
          },
          {
            step: 8,
            title: 'Prepare Principal Panel & Behavioral Interview',
            type: 'INTERVIEW_PREP',
            description: 'Prepare answers for handling disengaged students, parent-teacher conferences, and extracurricular duties.',
            whatToLearn: 'Classroom discipline strategies, remedial teaching for slow learners, parent communication.',
            whyItMatters: 'Principals evaluate your temperament, dedication, and cultural fitment with the institution.'
          },
          {
            step: 9,
            title: 'Apply to Kendriya Vidyalaya (KVS), Top Schools & Academies',
            type: 'JOB_APPLICATION',
            description: 'Submit resumes during peak school hiring season (January to April) and apply to central/state recruitment drives.',
            whatToLearn: 'School job fairs, educational consultancy portals, direct walk-in demo days at schools.',
            whyItMatters: 'Positions you for a fulfilling tenure with standard academic vacation schedules and pension benefits.'
          }
        ],
        projects: [
          { title: 'Interactive 30-Day Subject Lesson Plan & Assessment Rubric', tech: 'CBSE Curriculum, NEP 2020 Guidelines', desc: 'Designed comprehensive 30-day unit plan with experiential learning activities and formative quizzes.' },
          { title: 'Remedial Learning Intervention for Slow Learners', tech: 'Diagnostic Tests, Differentiated Teaching', desc: 'Formulated personalized study guide improving student test scores by 25% over a term.' }
        ],
        careerProgression: ['Primary Teacher (PRT)', 'Trained Graduate Teacher (TGT)', 'Post Graduate Teacher (PGT)', 'Head of Department (HOD)', 'Vice Principal / Principal'],
        higherStudies: ['M.Ed (Master of Education)', 'Ph.D in Education / Subject Doctorate', 'Post Graduate Diploma in Educational Management']
      };
    }

    // 7. GOVERNMENT OFFICER / CIVIL SERVICES / SSC CGL / BANK PO
    if (titleLower.includes('government') || titleLower.includes('ssc') || titleLower.includes('upsc') || titleLower.includes('bank po') || titleLower.includes('civil service') || titleLower.includes('inspector') || titleLower.includes('officer')) {
      return {
        domain: 'Public Administration & Government Services',
        sector: 'Central / State Government & Public Sector Banking',
        salary: '₹45,000 - 95,000 / month (Pay Level 7/8/10)',
        educationRelevance: `Your ${userEducation} degree meets the statutory graduation requirement mandated by Central and State Public Service Commissions. Commerce/Economics students have distinct advantages in finance and banking papers.`,
        qualificationRequirements: {
          degreeAccepted: 'Any recognized Bachelor Degree from an accredited UGC/AIU university.',
          requiredQualifications: ['Bachelor Degree in any discipline (B.Com, B.Tech, BA, B.Sc)'],
          certificationsRecommended: ['None (Corporate certifications not considered for government marks)'],
          licensesRequired: 'None',
          entranceExams: 'UPSC Civil Services, SSC CGL, IBPS PO / SBI PO, or State PSC examination'
        },
        multipleRoutes: [
          {
            name: 'Route 1: Central Staff Selection Commission (SSC CGL)',
            type: 'DIRECT_ROUTE',
            description: 'Recruitment for Group B/C Officers: Assistant Audit Officer, Income Tax Inspector, Preventive Officer.',
            steps: [`${userEducation}`, 'Tier-1 CBT Exam', 'Tier-2 Specialized Papers', 'Document Verification & Medical', 'Central Ministry Posting']
          },
          {
            name: 'Route 2: Public Sector Banking (IBPS / SBI PO)',
            type: 'ALTERNATIVE_ROUTE',
            description: 'Recruitment for Probationary Officers across major public sector banks in India.',
            steps: [`${userEducation}`, 'Banking Prelims Exam', 'Mains Reasoning & DI', 'Group Discussion & Interview', 'Branch Manager Track']
          },
          {
            name: 'Route 3: Civil Services Examination (UPSC CSE / State PSC)',
            type: 'DIRECT_ROUTE',
            description: 'Premier administrative recruitment for IAS, IPS, IRS, and State Deputy Collectors.',
            steps: [`${userEducation}`, 'Prelims GS + CSAT', 'Mains 9 Descriptive Papers', 'Personality Test (UPSC Board)', 'All India Service Posting']
          }
        ],
        skillsAlreadyHave: ['Academic Discipline', 'Reading Comprehension', 'General Knowledge'],
        skillsYouNeed: [
          { name: 'Quantitative Aptitude', level: 'Critical', desc: 'Percentages, Profit & Loss, Ratio, Time & Work, Number Systems, Algebra' },
          { name: 'Reasoning Ability', level: 'Critical', desc: 'Syllogisms, Puzzles, Seating Arrangement, Coding-Decoding, Critical Reasoning' },
          { name: 'General Studies & Polity', level: 'Critical', desc: 'Indian Constitution, Governance, Modern History, Economics, Current Affairs' },
          { name: 'English Comprehension & Essay', level: 'Core', desc: 'Reading comprehension, précis writing, formal descriptive letter and essay writing' }
        ],
        stepByStepRoadmap: [
          {
            step: 1,
            title: 'Analyze Official Notification, Eligibility & Exam Pattern',
            type: 'EXAM_ORIENTATION',
            description: 'Review the official commission notification: age criteria (typically 20–30/32), syllabus stages, and post preferences.',
            whatToLearn: 'Marking schemes, negative marking rules, qualifying cut-offs across recent 3 years.',
            whyItMatters: 'A thorough understanding of syllabus boundaries prevents wasted effort on non-relevant topics.'
          },
          {
            step: 2,
            title: 'Master Quantitative Aptitude & Speed Calculation',
            type: 'CORE_SYLLABUS',
            description: 'Attain high-speed mental arithmetic and master all arithmetic and advanced math modules.',
            whatToLearn: 'Arithmetic (Percentages, Profit & Loss, SI/CI, Time & Distance), Advanced Math (Trigonometry, Geometry, Mensuration).',
            whyItMatters: 'Quantitative aptitude carries substantial weight in Tier-1 and Tier-2 competitive stages.'
          },
          {
            step: 3,
            title: 'Master Logical Reasoning & Analytical Puzzles',
            type: 'CORE_SYLLABUS',
            description: 'Develop fast pattern recognition for seating arrangements, syllogisms, and logical deductions.',
            whatToLearn: 'Circular/linear seating, blood relations, direction sense, statement-assumptions, coding-decoding.',
            whyItMatters: 'Reasoning tests your analytical speed under strict sectional time limits.'
          },
          {
            step: 4,
            title: 'Master Indian Polity, Economy & General Studies',
            type: 'CORE_SYLLABUS',
            description: 'Study the Indian Constitution, basic macroeconomics, modern Indian history, and physical geography.',
            whatToLearn: 'Fundamental Rights, Parliament, Monetary Policy, GDP/Inflation, Budget, key historic events.',
            whyItMatters: 'High-scoring section that takes minimal time during computer-based examination.'
          },
          {
            step: 5,
            title: 'Daily Current Affairs & Monthly Compilations',
            type: 'CURRENT_AFFAIRS',
            description: 'Track governmental schemes, international summits, economic surveys, and supreme court rulings.',
            whatToLearn: 'Past 12 months current affairs, sports honors, scientific missions, government welfare portals.',
            whyItMatters: 'Current affairs questions feature prominently across preliminary and mains stages.'
          },
          {
            step: 6,
            title: 'Solve Previous 10 Years Question Papers (PYQs)',
            type: 'PRACTICE_PYQ',
            description: 'Complete timed sectional practice using authentic previous year examination papers.',
            whatToLearn: 'Identifying question repeating patterns, question-skipping strategy, accuracy over blind attempts.',
            whyItMatters: 'PYQs are the single most accurate predictor of actual examination difficulty.'
          },
          {
            step: 7,
            title: 'Full-Length Computer-Based Mock Tests with Analysis',
            type: 'MOCK_TESTS',
            description: 'Attempt 30+ full-length online mock exams with strict countdown timer simulation.',
            whatToLearn: 'Time management across sections, error log maintenance, analyzing weak topic areas.',
            whyItMatters: 'Builds psychological stamina for the actual 2-hour high-pressure test.'
          },
          {
            step: 8,
            title: 'Descriptive Paper / Interview & DAF Profile Preparation',
            type: 'INTERVIEW_STAGE',
            description: 'Prepare for formal interview rounds (UPSC/Banking) or descriptive essay and précis writing (SSC).',
            whatToLearn: 'Drafting structured essays, defending your graduation background, expressing balanced opinions on national issues.',
            whyItMatters: 'The interview panel assesses your personality, integrity, and administrative problem-solving.'
          },
          {
            step: 9,
            title: 'Clear Document Verification & National Academy Training',
            type: 'SELECTION_ONBOARDING',
            description: 'Undergo document verification, medical clearance, and join national training academy.',
            whatToLearn: 'Service allocation procedures, probationary rules, initial administrative field posting.',
            whyItMatters: 'Culminates in a secure, prestigious government gazetted career serving the nation.'
          }
        ],
        projects: [
          { title: 'Comprehensive Exam Performance Tracker & Error Journal', tech: 'Mock Analytics, Performance Logs', desc: 'Analyzed 50+ mock exam score trends, pinpointing error categories to elevate accuracy from 68% to 92%.' },
          { title: 'Government Policy & Socio-Economic Analysis Report', tech: 'Descriptive Writing, Economic Survey', desc: 'Composed policy review on digital public infrastructure (UPI/DBT) evaluating fiscal efficiency and inclusion.' }
        ],
        careerProgression: ['Probationer Officer / Inspector', 'Assistant Commissioner / Section Officer', 'Deputy Commissioner / Under Secretary', 'Joint Commissioner / Deputy Secretary', 'Commissioner / Joint Secretary'],
        higherStudies: ['Mid-Career Public Policy Master (IIM / LBSNAA)', 'Law Degree (LLB) for Legal Cadre', 'Executive MBA in Public Governance']
      };
    }

    // 8. HEALTHCARE / NURSE / PHARMACIST / MEDICAL LAB TECHNICIAN
    if (titleLower.includes('nurse') || titleLower.includes('pharmacist') || titleLower.includes('pharma') || titleLower.includes('lab technician') || titleLower.includes('healthcare') || titleLower.includes('medical') || titleLower.includes('hospital')) {
      const isNursing = titleLower.includes('nurse');
      const isPharma = titleLower.includes('pharmacist') || titleLower.includes('pharma');
      return {
        domain: isNursing ? 'Clinical Nursing & Patient Care' : isPharma ? 'Pharmaceutical Sciences & Dispensing' : 'Allied Health Sciences',
        sector: 'Healthcare, Hospitals & Pharmaceuticals',
        salary: isNursing ? '₹3.2 - 7.0 LPA' : isPharma ? '₹3.5 - 7.5 LPA' : '₹3.0 - 6.0 LPA',
        educationRelevance: `Your education in ${userEducation} ${
          eduLower.includes('nurs') || eduLower.includes('pharm') || eduLower.includes('b.sc')
            ? 'directly aligns with clinical training requirements and statutory health licensing.'
            : 'provides academic maturity, but professional healthcare practice legally mandates statutory council registration.'
        }`,
        qualificationRequirements: {
          degreeAccepted: isNursing
            ? 'B.Sc Nursing (4 Yrs) or GNM (General Nursing & Midwifery - 3.5 Yrs).'
            : isPharma
            ? 'B.Pharm (4 Yrs) or D.Pharm (2 Yrs) recognized by Pharmacy Council of India (PCI).'
            : 'B.Sc in Medical Laboratory Technology (BMLT) or DMLT.',
          requiredQualifications: [
            isNursing ? 'State Nursing Council Registered Nurse & Midwife (RN/RM)' : isPharma ? 'PCI Registered Pharmacist' : 'Certified Medical Lab Technician'
          ],
          certificationsRecommended: ['Basic Life Support (BLS)', 'Advanced Cardiovascular Life Support (ACLS)', 'Good Clinical Practice (GCP)'],
          licensesRequired: isNursing ? 'Mandatory State Nursing Council Registration Certificate' : isPharma ? 'Mandatory State Pharmacy Council Registered Pharmacist License' : 'Clinical Laboratory License',
          entranceExams: 'AIIMS NORCET (for Central Govt Nursing Officer) / State Pharmacist Recruitment Exams'
        },
        multipleRoutes: [
          {
            name: isNursing ? 'Route 1: Degree in Nursing (B.Sc Nursing)' : isPharma ? 'Route 1: Bachelor of Pharmacy (B.Pharm)' : 'Route 1: B.Sc MLT Route',
            type: 'DIRECT_ROUTE',
            description: '4-year professional healthcare degree leading to direct licensing and multi-specialty hospital appointment.',
            steps: ['Qualifying 12th PCB', 'Accredited Degree Program', 'Hospital Internship', 'Council Registration', 'Hospital / Industry Placement']
          },
          {
            name: isNursing ? 'Route 2: Diploma in GNM' : isPharma ? 'Route 2: Diploma in Pharmacy (D.Pharm)' : 'Route 2: DMLT Diploma Track',
            type: 'ALTERNATIVE_ROUTE',
            description: 'Diploma route providing faster qualification for retail dispensing or hospital bedside nursing.',
            steps: ['12th Pass', 'Diploma Program', 'Practical Hospital Rotations', 'State Registration', 'Healthcare Practice']
          }
        ],
        skillsAlreadyHave: ['Patient Empathy', 'Attention to Detail', 'Ethical Responsibility'],
        skillsYouNeed: [
          { name: isNursing ? 'Patient Assessment & Vitals' : isPharma ? 'Pharmacology & Drug Interactions' : 'Clinical Diagnostic Testing', level: 'Critical', desc: 'Standard operating clinical protocols and diagnostic procedures' },
          { name: 'Emergency Care & BLS Protocols', level: 'Critical', desc: 'CPR, IV cannulation, triage management, dosage calculation formulas' },
          { name: 'Infection Control & Medical Safety', level: 'Core', desc: 'Biomedical waste management, sterile technique, hospital accreditation standards (NABH)' },
          { name: 'Electronic Health Records (EHR)', level: 'Fundamental', desc: 'Hospital information systems, prescription auditing, medical inventory logging' }
        ],
        stepByStepRoadmap: [
          {
            step: 1,
            title: 'Complete Accredited Healthcare Education & Internship',
            type: 'MANDATORY_EDUCATION',
            description: 'Complete formal university curriculum and mandatory 6-month clinical hospital rotational internship.',
            whatToLearn: 'Ward management, bedside patient care, drug administration, standard clinical procedures.',
            whyItMatters: 'Mandatory prerequisite for council registration; unaccredited courses are legally barred from practice.'
          },
          {
            step: 2,
            title: 'Obtain Statutory State Council Registration & License',
            type: 'LICENSING',
            description: 'Register with the State Nursing Council or State Pharmacy Council to receive official license number.',
            whatToLearn: 'State council verification norms, professional code of ethics, renewal criteria.',
            whyItMatters: 'Practicing without active council registration is a statutory offense under the National Medical Commission/PCI/INC acts.'
          },
          {
            step: 3,
            title: 'Acquire Life Support & Emergency Certifications (BLS / ACLS)',
            type: 'CERTIFICATION',
            description: 'Earn American Heart Association (AHA) certified Basic Life Support and ACLS credentials.',
            whatToLearn: 'High-quality CPR, AED operation, foreign-body airway obstruction relief, code blue protocols.',
            whyItMatters: 'NABH-accredited private hospitals mandate BLS certification for all clinical staff.'
          },
          {
            step: 4,
            title: 'Master Medication Administration & Dosage Calculations',
            type: 'CLINICAL_SKILL',
            description: 'Attain absolute error-free precision in calculating pediatric/adult drug doses and IV drip rates.',
            whatToLearn: 'Five Rights of Medication Administration, high-alert medications, calculating mg/kg/hr infusion rates.',
            whyItMatters: 'Medication errors have severe consequences; dosage math is tested in hospital screening rounds.'
          },
          {
            step: 5,
            title: 'Master Infection Control & Biomedical Waste Protocols',
            type: 'SAFETY_STANDARD',
            description: 'Strict adherence to BMW Rules 2016 (color-coded bins: yellow, red, blue, white) and hand hygiene.',
            whatToLearn: 'Surgical scrubbing, PPE donning/doffing, needle-stick injury protocols, sterile field maintenance.',
            whyItMatters: 'Fundamental for passing hospital safety interviews and hospital accreditation inspections.'
          },
          {
            step: 6,
            title: 'Clinical Rotations in Intensive Care (ICU / ER / OT)',
            type: 'SPECIALIZED_EXPERIENCE',
            description: 'Gain hands-on clinical exposure in high-acuity wards: Critical Care, Emergency, or Operation Theater.',
            whatToLearn: 'Ventilator management basics, cardiac monitoring, arterial blood gas (ABG) sampling, crash cart checks.',
            whyItMatters: 'ICU and emergency clinical experience commands higher pay and opens international opportunities (NCLEX/NHS).'
          },
          {
            step: 7,
            title: 'Build Verified Clinical Portfolio & Resume',
            type: 'RESUME_BUILDING',
            description: 'Document procedures performed, hospital bed capacities, specialties handled, and license details.',
            whatToLearn: 'Framing clinical experience: patient census managed, specialized equipment operated, NABH audit participation.',
            whyItMatters: 'Highlights verified clinical hours and competence to hospital medical superintendents.'
          },
          {
            step: 8,
            title: 'Prepare Clinical Scenarios & Viva Interview',
            type: 'INTERVIEW_PREP',
            description: 'Practice rapid clinical scenario responses (e.g. sudden anaphylaxis, cardiac arrest, drug interaction).',
            whatToLearn: 'Triage prioritization, verbal doctor order verification, SBAR communication technique.',
            whyItMatters: 'Hospital nursing directors test critical decision making and composure during crisis.'
          },
          {
            step: 9,
            title: 'Apply to Multi-Specialty Hospitals & Government Recruitment',
            type: 'JOB_APPLICATION',
            description: 'Apply to corporate hospital networks (Apollo, Fortis, Max) or sit for AIIMS NORCET / ESIC exams.',
            whatToLearn: 'Direct hospital HR walk-ins, government staff nurse examinations, international credential evaluation.',
            whyItMatters: 'Positions you for a secure, respected clinical career with clear advancement to Nurse In-Charge or Manager.'
          }
        ],
        projects: [
          { title: 'Infection Control & Hand Hygiene Compliance Audit', tech: 'WHO Hand Hygiene Guidelines, Hospital Protocols', desc: 'Monitored and documented 500+ clinical opportunities across 3 wards, improving antiseptic compliance from 74% to 96%.' },
          { title: 'Comprehensive Emergency Drug Cart Verification Audit', tech: 'NABH Standards, Crash Cart Logs', desc: 'Audited 50+ critical life-saving medications, ensuring zero expired stock and 100% equipment readiness.' }
        ],
        careerProgression: [isNursing ? 'Staff Nurse' : 'Pharmacist', isNursing ? 'Senior ICU Staff Nurse' : 'Senior Hospital Pharmacist', isNursing ? 'Ward In-Charge / Nursing Supervisor' : 'Pharmacy Manager', isNursing ? 'Assistant Nursing Superintendent' : 'Head of Pharmacy Operations', isNursing ? 'Chief Nursing Officer (CNO)' : 'Director of Pharmacy'],
        higherStudies: [isNursing ? 'M.Sc Nursing (Specialization in Critical Care/Cardiology)' : 'M.Pharm / Pharm.D', 'Post Basic B.Sc Nursing', 'MBA in Hospital & Healthcare Management (MHA)']
      };
    }

    // 9. SOFTWARE DEVELOPER / WEB DEVELOPER / FULL-STACK ENGINEER (Tech Roles Only!)
    if (titleLower.includes('software') || titleLower.includes('developer') || titleLower.includes('frontend') || titleLower.includes('backend') || titleLower.includes('full stack') || titleLower.includes('programmer') || titleLower.includes('coder') || titleLower.includes('web development')) {
      const isCS = eduLower.includes('tech') || eduLower.includes('computer') || eduLower.includes('mca') || eduLower.includes('bca') || eduLower.includes('it');
      return {
        domain: 'Software Engineering & Cloud Computing',
        sector: 'Information Technology, SaaS & Internet Services',
        salary: '₹6.0 - 15.0 LPA',
        educationRelevance: isCS
          ? `Your ${userEducation} degree directly provides computer science theory, algorithms, and computing fundamentals.`
          : `Transitioning to Software Engineering from ${userEducation} is widely supported in the private tech sector based on verified practical coding ability, GitHub repositories, and full-stack projects rather than traditional degree stream.`,
        qualificationRequirements: {
          degreeAccepted: 'Graduation degree in any discipline (B.Tech, BCA, B.Sc, B.Com, etc.). High-growth startups focus on demonstrable code.',
          requiredQualifications: ['Bachelor Degree in Computer Science, STEM, or recognized equivalent; self-taught developers evaluated on GitHub portfolio'],
          certificationsRecommended: ['AWS Certified Cloud Practitioner', 'Meta Front-End / Back-End Developer Professional Certificate'],
          licensesRequired: 'None',
          entranceExams: 'None for private tech companies; practical algorithmic live coding rounds'
        },
        multipleRoutes: [
          {
            name: 'Route 1: Traditional Computer Science Degree Route',
            type: 'DIRECT_ROUTE',
            description: '4-year B.Tech CSE or 3-year BCA/MCA with structured coursework in algorithms, OS, and software engineering.',
            steps: ['CS Degree (B.Tech/BCA)', 'Data Structures & Algorithms', 'Web Dev Frameworks', 'Campus / Off-Campus Placement']
          },
          {
            name: 'Route 2: Practical Full-Stack Project & Portfolio Route',
            type: 'CAREER_SWITCH_ROUTE',
            description: 'Demonstrable portfolio route: building 2-3 production-grade full-stack web applications to prove engineering competence.',
            steps: [`${userEducation}`, 'Modern JavaScript & TypeScript', 'Full-Stack Architecture (React + Node.js)', 'Production Deployment', 'Technical Coding Interviews']
          }
        ],
        skillsAlreadyHave: ['Logical Problem Solving', 'Analytical Reasoning'],
        skillsYouNeed: [
          { name: 'Modern JavaScript & TypeScript', level: 'Critical', desc: 'Async/await, Closures, DOM, ES6+ features, static typing' },
          { name: 'Frontend Architecture (React)', level: 'Critical', desc: 'Component lifecycle, hooks (useState, useEffect), state management, responsive UI' },
          { name: 'Backend & RESTful APIs (Node.js/Express)', level: 'Critical', desc: 'Server architecture, route handlers, middleware, JWT authentication, error handling' },
          { name: 'Relational & NoSQL Databases (PostgreSQL / MongoDB)', level: 'Core', desc: 'Schema design, indexes, ORM usage (Prisma/Mongoose), complex aggregation queries' },
          { name: 'Git, Docker & Cloud Deployment', level: 'Core', desc: 'Branching workflows, containerization, CI/CD pipelines, hosting on Vercel/AWS' }
        ],
        stepByStepRoadmap: [
          {
            step: 1,
            title: 'Computer Science Fundamentals & Core Programming',
            type: 'CORE_FOUNDATION',
            description: 'Master programming fundamentals: variables, control flow, functions, memory concepts, and time complexity (Big-O).',
            whatToLearn: 'JavaScript fundamentals, syntax, data types, scope, arrays, objects, recursion.',
            whyItMatters: 'Rock-solid fundamentals prevent bad coding habits and prepare you for technical interviews.'
          },
          {
            step: 2,
            title: 'Data Structures & Algorithmic Problem Solving',
            type: 'ALGORITHMS',
            description: 'Solve 100+ standard problems on arrays, strings, hash maps, linked lists, and binary search.',
            whatToLearn: 'Two-pointer technique, sliding window, hash lookups, recursion, sorting algorithms.',
            whyItMatters: 'Every major tech company conducts a mandatory live coding round testing data structures.'
          },
          {
            step: 3,
            title: 'Modern Frontend Development (React & TypeScript)',
            type: 'FRONTEND_ENGINEERING',
            description: 'Build fast, responsive single-page web applications with React, modern state management, and Tailwind CSS.',
            whatToLearn: 'Component composition, custom hooks, context API, client-side routing, accessibility.',
            whyItMatters: 'Frontend is the visible interface that demonstrates your product and UI engineering craft.'
          },
          {
            step: 4,
            title: 'Backend Architecture, REST APIs & Node.js',
            type: 'BACKEND_ENGINEERING',
            description: 'Design robust backend services with Express.js, handling HTTP requests, input validation, and security.',
            whatToLearn: 'REST API design conventions, middleware, JWT token authentication, bcrypt password hashing, CORS.',
            whyItMatters: 'Backend powers commercial application logic, transaction processing, and data security.'
          },
          {
            step: 5,
            title: 'Databases, Schema Design & Query Optimization',
            type: 'DATABASE_ENGINEERING',
            description: 'Master relational schema modeling in PostgreSQL and document storage in MongoDB.',
            whatToLearn: 'Normalization, foreign keys, indexing, ACID transactions, Prisma ORM, aggregation pipelines.',
            whyItMatters: 'Software applications live or die based on database performance and data consistency.'
          },
          {
            step: 6,
            title: 'Build 2 Production-Grade Full-Stack Capstone Projects',
            type: 'PORTFOLIO_BUILDING',
            description: 'Build and deploy two real-world web applications with authentication, database integration, and live URLs.',
            whatToLearn: 'E-commerce platform with payment gateway, or Real-time collaborative SaaS with WebSockets.',
            whyItMatters: 'A working deployed URL with clean GitHub documentation is 10x more persuasive than a resume claim.'
          },
          {
            step: 7,
            title: 'Git Version Control, CI/CD & Cloud Deployment',
            type: 'DEVOPS_TOOLING',
            description: 'Use Git for version control, Docker for environment consistency, and deploy to modern cloud platforms.',
            whatToLearn: 'Git pull requests, GitHub Actions, Dockerfile creation, deploying to Vercel, Render, or AWS EC2.',
            whyItMatters: 'Proves you are ready to collaborate in an engineering team on day one.'
          },
          {
            step: 8,
            title: 'Prepare System Design & Technical Coding Interviews',
            type: 'INTERVIEW_PREP',
            description: 'Practice live algorithmic coding under time constraints and explain system architecture decisions.',
            whatToLearn: 'Explaining code out loud, debugging edge cases, basic system design (caching, database scaling).',
            whyItMatters: 'Translates your coding competence into confident interview delivery.'
          },
          {
            step: 9,
            title: 'Targeted Tech Applications & Developer Community Outreach',
            type: 'JOB_APPLICATION',
            description: 'Apply directly to high-growth tech startups and tech MNCs via specialized hiring platforms.',
            whatToLearn: 'Wellfound (AngelList), LinkedIn outreach to engineering managers, contributing to open-source.',
            whyItMatters: 'Bypasses slow generic job portals by connecting directly with hiring engineering leads.'
          }
        ],
        projects: [
          { title: 'Full-Stack SaaS Platform with RBAC & Stripe Billing', tech: 'React, Node.js, PostgreSQL, Tailwind CSS', desc: 'Architected production web app with role-based access control, JWT auth, Stripe payments, and automated test coverage.' },
          { title: 'Real-Time Collaborative Workspace with WebSockets', tech: 'React, Node.js, WebSockets, Redis', desc: 'Built real-time collaborative whiteboard with room persistence and sub-50ms synchronization across concurrent users.' }
        ],
        careerProgression: ['Junior Software Engineer', 'Software Engineer (SDE-1)', 'Senior Software Engineer (SDE-2)', 'Staff Engineer / Tech Lead', 'Engineering Manager / VP of Engineering'],
        higherStudies: ['M.Tech in Computer Science / AI', 'MS in Computer Science (Overseas)', 'Executive MBA in Technology Management']
      };
    }

    // 10. UNIVERSAL DYNAMIC ENGINE (FOR ANY OTHER CUSTOM JOB ROLE)
    // Synthesizes 100% role-specific data using domain terms; NEVER defaults to web software development!
    const cleanTitle = jobTitle.replace(/junior|senior|lead|associate/gi, '').trim() || 'Specialist';
    
    return {
      domain: `${cleanTitle} Professional Practice`,
      sector: `${cleanTitle} Services & Industry Operations`,
      salary: '₹3.5 - 8.0 LPA',
      educationRelevance: `Your education in ${userEducation} provides relevant analytical discipline. Reaching ${cleanTitle} requires developing domain-specific technical skills, industry tools, and recognized certifications.`,
      qualificationRequirements: {
        degreeAccepted: `${userEducation} provides foundational eligibility.`,
        requiredQualifications: [`Recognized Degree in ${cleanTitle} or allied fields`],
        certificationsRecommended: [`Professional ${cleanTitle} Certification`, `Industry Standard Operating Procedures (SOP) Credentials`],
        licensesRequired: 'Role-specific statutory registration where mandated by law',
        entranceExams: 'Direct technical interview / corporate selection tests'
      },
      multipleRoutes: [
        {
          name: `Route 1: Direct ${cleanTitle} Academic Route`,
          type: 'DIRECT_ROUTE',
          description: `Direct entry through specialized graduation or vocational credentials in ${cleanTitle}.`,
          steps: [`Academic Study in ${cleanTitle}`, 'Core Domain Tools', 'Practical Projects', 'Campus / Direct Placement']
        },
        {
          name: `Route 2: Practical Skills & Certification Bridging Route`,
          type: 'ALTERNATIVE_ROUTE',
          description: `Bridging your ${userEducation} degree through accredited industry certifications and real-world projects.`,
          steps: [`${userEducation}`, `Accredited ${cleanTitle} Certification`, 'Industry Case Studies', 'Role Placement']
        },
        {
          name: `Route 3: Apprenticeship & Field Experience Route`,
          type: 'CAREER_SWITCH_ROUTE',
          description: `Hands-on practical traineeship or internship leading to junior practitioner appointment.`,
          steps: [`${userEducation}`, 'Trainee / Apprenticeship Role', 'Hands-on Skill Mastery', 'Full-time Appointment']
        }
      ],
      skillsAlreadyHave: ['Foundational Communication', 'Critical Problem Solving', 'Professional Work Ethic'],
      skillsYouNeed: [
        { name: `${cleanTitle} Core Principles`, level: 'Critical', desc: `Standard methodologies, regulatory compliance, and best practices in ${cleanTitle}` },
        { name: `Industry Standard Tools`, level: 'Critical', desc: `Software, instruments, and equipment utilized daily by professional ${cleanTitle}s` },
        { name: `Practical Case Execution`, level: 'Core', desc: `End-to-end execution of operational tasks with zero compliance errors` },
        { name: `Professional Communication`, level: 'Fundamental', desc: `Stakeholder coordination, client reporting, and team management` }
      ],
      stepByStepRoadmap: [
        {
          step: 1,
          title: `Understand the ${cleanTitle} Role & Industry Standards`,
          type: 'ROLE_ORIENTATION',
          description: `Analyze standard day-to-day responsibilities, industry expectations, and key performance indicators of a ${cleanTitle}.`,
          whatToLearn: `Job description requirements, industry terminology, client deliverables, and workflow hierarchies.`,
          whyItMatters: `Ensures your preparation is directly aligned with what hiring managers actively evaluate.`
        },
        {
          step: 2,
          title: `Build Required Core Theoretical Foundations`,
          type: 'CORE_FOUNDATION',
          description: `Master fundamental principles, regulatory compliance rules, and core concepts underlying ${cleanTitle}.`,
          whatToLearn: `Standard operating procedures, domain frameworks, ethics, and industry benchmarks.`,
          whyItMatters: `Technical interviewers drill core principles to distinguish real competence from superficial knowledge.`
        },
        {
          step: 3,
          title: `Master Industry-Standard Technical Tools & Software`,
          type: 'TOOL_MASTERY',
          description: `Attain hands-on operational efficiency in the primary software tools, equipment, or machinery used in this role.`,
          whatToLearn: `Core software suites, keyboard shortcuts, automated workflows, and troubleshooting common errors.`,
          whyItMatters: `Employers look for candidates who require minimal software onboarding.`
        },
        {
          step: 4,
          title: `Build 2–3 Real-World Practical Projects & Case Studies`,
          type: 'PRACTICAL_PROJECT',
          description: `Execute realistic domain projects simulating challenges faced by enterprise practitioners.`,
          whatToLearn: `Solving end-to-end problems, documenting results, and preparing a tangible portfolio showcase.`,
          whyItMatters: `Tangible portfolio proof bridges any perceived gap from your previous education background.`
        },
        {
          step: 5,
          title: `Obtain Recognized Industry Certifications & Tailor Resume`,
          type: 'CERTIFICATION_RESUME',
          description: `Secure accredited industry credentials and build an ATS-optimized resume emphasizing transferable skills from ${userEducation}.`,
          whatToLearn: `ATS formatting, action-oriented bullet points, certified practitioner examinations.`,
          whyItMatters: `Validates your commitment and ensures your application passes HR automated screening.`
        },
        {
          step: 6,
          title: `Practice Role-Specific Technical & Scenario Questions`,
          type: 'INTERVIEW_PREP',
          description: `Prepare for technical grilling, situational crisis management questions, and practical domain tests.`,
          whatToLearn: `Handling operational bottlenecks, behavioral STAR method answers, technical problem solving.`,
          whyItMatters: `Instills poise and clarity during rigorous managerial and technical interview panels.`
        },
        {
          step: 7,
          title: `Strategic Job Applications Across Direct Industry Portals`,
          type: 'JOB_APPLICATION',
          description: `Target specialized companies, agency partnerships, and corporate departments hiring for ${cleanTitle}.`,
          whatToLearn: `Direct hiring manager outreach on LinkedIn, niche trade portals, and campus/off-campus drives.`,
          whyItMatters: `Direct targeted applications generate substantially higher interview callback rates than bulk submissions.`
        },
        {
          step: 8,
          title: `Crack the Practical Assessment & Final Interviews`,
          type: 'ASSESSMENT',
          description: `Demonstrate your practical skills in live assessment tests, case presentations, and executive fitment rounds.`,
          whatToLearn: `Clear communication under test conditions, explaining technical trade-offs, professional enthusiasm.`,
          whyItMatters: `Converts your interview invitation into a definitive corporate job offer.`
        },
        {
          step: 9,
          title: `Onboarding, Ongoing Learning & Senior Career Growth`,
          type: 'CAREER_GROWTH',
          description: `Excel in your entry role and map your trajectory toward senior specialist or department leadership.`,
          whatToLearn: `Advanced domain frameworks, cross-functional leadership, higher academic credentials.`,
          whyItMatters: `Ensures long-term career progression and salary escalation.`
        }
      ],
      projects: [
        { title: `${cleanTitle} Industry Case Study & Implementation`, tech: 'Domain Standard Tools', desc: `Executed a full simulated operational project solving a critical workflow challenge with quantifiable results.` }
      ],
      careerProgression: [`Associate / Junior ${cleanTitle}`, cleanTitle, `Senior ${cleanTitle}`, `Lead ${cleanTitle}`, `Department Director / Head of ${cleanTitle}`],
      higherStudies: [`Master Degree in ${cleanTitle} / Allied Domain`, `Executive Management Credential`, `Advanced Global Licensure`]
    };
  }
}
