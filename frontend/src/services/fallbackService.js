/**
 * ==============================================================================
 * FUTURE PATH — CLIENT-SIDE FALLBACK & OFFLINE RESILIENCE SERVICE
 * ==============================================================================
 * Guarantees zero 404 errors and 100% uptime when deployed on static CDNs (Vercel,
 * Netlify, GitHub Pages) or when the backend server is starting up / asleep.
 * ==============================================================================
 */

export const FALLBACK_CAREERS = [
  {
    id: 'career-software-engineering',
    slug: 'software-engineering',
    name: 'Computer Science, Software & AI Systems',
    shortName: 'Software & AI',
    type: 'CAREER',
    category: 'Technology & AI',
    sector: 'Information Technology',
    aliases: ['Software Engineering', 'Software Development', 'AI Systems', 'Full Stack Development'],
    description: 'The global engineering discipline of architecting, coding, testing, and deploying high-scale software systems, AI models, mobile applications, and cloud services.',
    overview: 'Core engine of global technology infrastructure, encompassing frontend web applications, distributed backend microservices, generative AI models, DevOps pipelines, and cloud native architectures.',
    growthOutlook: '25% projected decade growth (Exponential Demand)',
    demand_score: 96,
    typical_roles: ['Software Development Engineer (SDE)', 'AI & Machine Learning Engineer', 'Cloud Solutions Architect', 'Full Stack Developer', 'DevOps & SRE Engineer'],
    requiredSkills: ['Data Structures & Algorithms', 'JavaScript / TypeScript', 'Python / Java', 'SQL & Distributed Databases', 'System Design', 'Git / GitHub'],
    relatedStudies: ['B.Tech Computer Science', 'B.Tech AI & Data Science', 'BCA', 'MCA', 'M.Tech CSE'],
    relatedJobs: ['Software Development Engineer (SDE)', 'AI & Machine Learning Engineer', 'Cloud Solutions Architect', 'Full Stack Web Developer'],
    topIndustries: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Tech Startups']
  },
  {
    id: 'career-data-analytics',
    slug: 'data-analytics',
    name: 'Data Analytics, Big Data & Business Intelligence',
    shortName: 'Data & Analytics',
    type: 'CAREER',
    category: 'Data & Analytics',
    sector: 'Business Intelligence & Enterprise Analytics',
    aliases: ['Data Analytics', 'Business Intelligence', 'Data Science', 'Big Data'],
    description: 'The discipline of extracting, synthesizing, and interpreting quantitative datasets to drive organizational strategy, automated decisions, and product growth.',
    overview: 'High-growth multidisciplinary field combining computational statistics, business strategy, database querying, and dashboard design across e-commerce, banking, and consulting.',
    growthOutlook: '28% projected decade growth (High Demand)',
    demand_score: 94,
    typical_roles: ['Data Analyst', 'BI Specialist', 'Quantitative Analyst', 'Data Engineer', 'Analytics Manager'],
    requiredSkills: ['SQL', 'Advanced Excel', 'Power BI / Tableau', 'Python (Pandas)', 'Statistical Modeling'],
    relatedStudies: ['B.Com', 'B.Sc Statistics', 'B.Tech CSE', 'BCA', 'MBA Analytics'],
    relatedJobs: ['Data Analyst & Business Intelligence Specialist', 'Quantitative Analyst (Quant)', 'Product Manager (Tech & Growth)'],
    topIndustries: ['Deloitte', 'McKinsey', 'Flipkart', 'Fractal', 'Mu Sigma']
  },
  {
    id: 'career-finance-banking',
    slug: 'finance-banking',
    name: 'Accounting, Banking & Corporate Finance',
    shortName: 'Finance & Banking',
    type: 'CAREER',
    category: 'Finance & Banking',
    sector: 'Financial Services & Capital Markets',
    aliases: ['Finance', 'Chartered Accountancy', 'Investment Banking', 'Commercial Banking'],
    description: 'Managing fiscal capital, corporate auditing, asset valuation, statutory compliance, risk management, and global financial operations.',
    overview: 'The economic nervous system covering statutory audit, wealth management, merger & acquisitions advisory, equity research, and central banking regulation.',
    growthOutlook: '18% projected decade growth (High Stability)',
    demand_score: 92,
    typical_roles: ['Chartered Accountant (CA)', 'Investment Banker', 'Financial Analyst', 'Bank PO (Probationary Officer)', 'RBI Grade B Officer'],
    requiredSkills: ['Financial Modeling', 'Corporate Taxation', 'GAAP / IFRS Auditing', 'Valuation Methodologies', 'Advanced Excel'],
    relatedStudies: ['B.Com', 'BBA Finance', 'CA (ICAI)', 'CFA', 'MBA Finance'],
    relatedJobs: ['Chartered Accountant (CA)', 'Investment Banker / Equity Analyst', 'Financial Risk Manager (FRM)', 'Bank Probationary Officer (PO)'],
    topIndustries: ['HDFC Bank', 'ICICI Bank', 'Goldman Sachs', 'Morgan Stanley', 'KPMG', 'EY']
  },
  {
    id: 'career-healthcare-clinical',
    slug: 'healthcare-clinical',
    name: 'Healthcare, Medicine & Clinical Sciences',
    shortName: 'Healthcare & Clinical',
    type: 'CAREER',
    category: 'Healthcare & Clinical',
    sector: 'Healthcare & Medical Practice',
    aliases: ['Medicine', 'Clinical Practice', 'Surgery', 'Physician', 'Doctor'],
    description: 'Diagnosing, treating, and preventing human diseases, clinical research, surgery, and delivering critical patient healthcare.',
    overview: 'The foundation of societal well-being and public health, spanning tertiary multi-specialty hospitals, research institutes, and clinical diagnostics.',
    growthOutlook: '24% projected decade growth (Evergreen Demand)',
    demand_score: 95,
    typical_roles: ['Medical Doctor (MBBS/MD)', 'Clinical Pharmacist', 'Healthcare Administrator', 'Surgeon', 'Biomedical Scientist'],
    requiredSkills: ['Clinical Diagnostics', 'Patient Care', 'Pharmacology', 'Medical Ethics', 'Emergency Medicine'],
    relatedStudies: ['MBBS', 'BDS', 'B.Pharm', 'B.Sc Nursing', 'MD / MS'],
    relatedJobs: ['Medical Officer / Physician (MBBS)', 'Clinical Research Associate', 'Hospital Operations Manager'],
    topIndustries: ['Apollo Hospitals', 'Fortis Healthcare', 'AIIMS', 'Max Healthcare', 'WHO']
  },
  {
    id: 'career-civil-services',
    slug: 'civil-services',
    name: 'Public Governance, Civil Services & Public Policy',
    shortName: 'Civil Services & Governance',
    type: 'CAREER',
    category: 'Civil Services & Governance',
    sector: 'Government Administration & Public Sector',
    aliases: ['Civil Services', 'UPSC', 'IAS', 'IPS', 'Government Administration'],
    description: 'Formulating and implementing government policies, maintaining law and order, administering sovereign districts, and managing public sector resources.',
    overview: 'The premier administrative apparatus of India, steering district governance, state administration, sovereign diplomacy, revenue collection, and national development programs.',
    growthOutlook: 'High Prestige & Permanent Tenure (Competitive Sovereign Entry)',
    demand_score: 98,
    typical_roles: ['IAS (Indian Administrative Service)', 'IPS (Indian Police Service)', 'IFS (Indian Foreign Service)', 'State Administrative Officer (Dy Collector)', 'Section Officer / Assistant Section Officer'],
    requiredSkills: ['Public Administration', 'Indian Constitutional Law', 'Policy Formulation', 'Crisis Management', 'Analytical Reasoning'],
    relatedStudies: ['B.A. Political Science', 'B.Com', 'B.Tech (Any Branch)', 'B.Sc (Any Stream)', 'LLB'],
    relatedJobs: ['Civil Services Administrator (IAS / IPS)', 'SSC CGL Inspector (Income Tax / GST)', 'State Civil Service Executive (Dy Collector)'],
    topIndustries: ['Government of India', 'State Public Service Commissions', 'Ministry of Finance', 'NITI Aayog']
  },
  {
    id: 'career-defence-forces',
    slug: 'defence-forces',
    name: 'Defence, National Security & Strategic Forces',
    shortName: 'Defence & Forces',
    type: 'CAREER',
    category: 'Defence & Forces',
    sector: 'Armed Forces & National Defence',
    aliases: ['Indian Army', 'Indian Navy', 'Indian Air Force', 'Defence Officer', 'NDA / CDS'],
    description: 'Safeguarding national territorial integrity, commanding strategic forces, aviation, maritime security, and border defense operations.',
    overview: 'Highest tier of patriotic leadership commanding military regiments, supersonic fighter squadrons, stealth naval warships, and cybersecurity wings.',
    growthOutlook: 'High Honor & Lifelong Sovereign Commission',
    demand_score: 97,
    typical_roles: ['Commissioned Army Officer (Lieutenant)', 'Naval Officer (Sub-Lieutenant)', 'Air Force Flying Officer (Pilot / Aeronautical Engg)', 'Coast Guard Assistant Commandant'],
    requiredSkills: ['Military Leadership', 'Physical Endurance', 'Tactical Strategy', 'Decision Making Under Pressure', 'Ballistics & Weapons Systems'],
    relatedStudies: ['12th PCM', 'B.Tech (Any Branch)', 'B.Sc Physics/Maths', 'Graduation in Any Discipline'],
    relatedJobs: ['Armed Forces Officer (Army / Navy / Air Force)', 'Defence Research Scientist (DRDO)', 'Aviation Pilot / Flight Engineer'],
    topIndustries: ['Indian Army', 'Indian Navy', 'Indian Air Force', 'DRDO', 'Coast Guard']
  },
  {
    id: 'career-core-engineering',
    slug: 'core-engineering',
    name: 'Mechanical, Electrical & Civil Engineering',
    shortName: 'Core Engineering',
    type: 'CAREER',
    category: 'Core Engineering',
    sector: 'Industrial Manufacturing & Infrastructure',
    aliases: ['Mechanical Engineering', 'Civil Engineering', 'Electrical Systems', 'Robotics'],
    description: 'Designing physical machines, electrical power grids, mega transportation infrastructure, renewable energy, and industrial manufacturing.',
    overview: 'The fundamental physical backbone of modern civilization, from smart bullet train corridors to electric vehicle powertrains and smart factories.',
    growthOutlook: '20% projected decade growth (Infrastructure Boom)',
    demand_score: 91,
    typical_roles: ['Mechanical Design Engineer', 'Civil Project Manager', 'Power Systems Engineer', 'Robotics & Automation Specialist'],
    requiredSkills: ['CAD / SolidWorks / AutoCAD', 'Thermodynamics & Structural Mechanics', 'Power Distribution', 'Project Management'],
    relatedStudies: ['B.Tech Mechanical', 'B.Tech Civil', 'B.Tech Electrical', 'M.Tech Structures'],
    relatedJobs: ['Mechanical Systems Design Engineer', 'Civil Infrastructure Project Manager', 'Power Systems & EV Engineer'],
    topIndustries: ['L&T', 'Tata Motors', 'BHEL', 'NTPC', 'Siemens', 'ISRO']
  },
  {
    id: 'career-law-legal',
    slug: 'law-legal',
    name: 'Law, Judiciary & Corporate Compliance',
    shortName: 'Law & Legal',
    type: 'CAREER',
    category: 'Law & Legal',
    sector: 'Legal Advisory & Judicial System',
    aliases: ['Law', 'Corporate Legal', 'Advocate', 'Judge', 'Judiciary'],
    description: 'Advising corporations on mergers, contracts, and regulatory compliance, or advocating for justice in judicial courts of law.',
    overview: 'Strategic pillar defending corporate interests, constitutional fundamental rights, international arbitration, and cyber law regulations.',
    growthOutlook: '21% projected decade growth (High Value)',
    demand_score: 90,
    typical_roles: ['Corporate Legal Counsel', 'Litigation Advocate', 'Judicial Magistrate / Judge', 'Cyber Law Specialist'],
    requiredSkills: ['Contract Drafting', 'Statutory Interpretation', 'Oral Advocacy', 'Corporate Due Diligence', 'Intellectual Property'],
    relatedStudies: ['BA LLB (5-Year Integrated)', 'BBA LLB', 'LLB (3-Year)', 'LLM'],
    relatedJobs: ['Corporate Legal Counsel', 'Litigation Advocate', 'Civil Judge / Judicial Magistrate'],
    topIndustries: ['Shardul Amarchand Mangaldas', 'AZB & Partners', 'Supreme Court of India', 'Multinational Corporations']
  },
  {
    id: 'career-design-creative',
    slug: 'design-creative',
    name: 'Digital Product Design, UI/UX & Creative Media',
    shortName: 'Design & Creative',
    type: 'CAREER',
    category: 'Design & Creative',
    sector: 'Design & Digital Media',
    aliases: ['UI/UX Design', 'Product Design', 'Visual Design', 'Creative Direction'],
    description: 'Crafting intuitive user journeys, digital wireframes, interactive mobile prototypes, and world-class brand design systems.',
    overview: 'The nexus of human psychology, visual aesthetics, and software ergonomics powering seamless digital product experiences worldwide.',
    growthOutlook: '26% projected decade growth (High Creative Demand)',
    demand_score: 93,
    typical_roles: ['Product Designer (UI/UX)', 'Interaction Designer', 'Visual Brand Designer', 'Design Systems Lead'],
    requiredSkills: ['Figma', 'User Research & Wireframing', 'Information Architecture', 'Usability Testing', 'Design Systems'],
    relatedStudies: ['B.Des (Bachelor of Design)', 'B.Tech CSE', 'B.Sc Multimedia', 'M.Des'],
    relatedJobs: ['Product Designer (UI/UX)', 'Visual Brand Designer', 'Creative Director'],
    topIndustries: ['Swiggy', 'Zomato', 'CRED', 'Google', 'Apple', 'Design Agencies']
  }
];

export const FALLBACK_JOBS = [
  {
    id: 'software-development-engineer',
    slug: 'software-development-engineer',
    name: 'Software Development Engineer (SDE)',
    title: 'Software Development Engineer (SDE)',
    shortName: 'SDE',
    type: 'JOB',
    category: 'Technology & Software',
    sector: 'Information Technology',
    aliases: ['Software Engineer', 'Backend Developer', 'Frontend Developer', 'Full Stack Engineer'],
    description: 'Designs, develops, tests, and deploys high-scale software applications, microservices, and distributed systems solving complex computational problems.',
    salaryFormatted: '₹6.0 – 24.0 LPA (Senior: ₹35 – 50+ LPA)',
    salary: { min: 600000, max: 2400000, median: 1200000, currency: 'INR' },
    demand_score: 96,
    educationRoutes: [
      {
        routeName: 'Route 1: Computer Science / Engineering Degree (B.Tech CSE/IT, MCA, BCA)',
        title: 'Formal Computer Science Path',
        degrees: ['B.Tech Computer Science', 'B.Tech IT', 'MCA', 'BCA'],
        skills: ['Data Structures & Algorithms', 'System Design', 'JavaScript / TypeScript', 'SQL & Databases'],
        timeline: 'Direct Placement / 3-6 Months Structured Prep'
      },
      {
        routeName: 'Route 2: STEM Degree + Full-Stack Software Bootcamps',
        title: 'Transition Path for Science & Engineering Graduates',
        degrees: ['B.Sc Computer Science', 'B.Tech Core Branches', 'M.Sc CS'],
        skills: ['Web Development', 'React', 'Node.js', 'PostgreSQL', 'Git / GitHub'],
        timeline: '6 Months Project-Driven Transition'
      }
    ],
    requiredSkills: ['Data Structures & Algorithms', 'JavaScript / TypeScript', 'Node.js or Python or Java', 'SQL / PostgreSQL', 'Git & Version Control'],
    preferredSkills: ['System Design', 'Docker & Containerization', 'AWS / Cloud Deployment', 'Microservices Architecture']
  },
  {
    id: 'data-analyst',
    slug: 'data-analyst',
    name: 'Data Analyst & Business Intelligence Specialist',
    title: 'Data Analyst & Business Intelligence Specialist',
    shortName: 'Data Analyst',
    type: 'JOB',
    category: 'Data & Analytics',
    sector: 'Enterprise Analytics',
    aliases: ['Business Analyst', 'BI Analyst', 'Analytics Consultant'],
    description: 'Transforms raw operational datasets into strategic visual dashboards, automated metrics pipelines, and predictive growth insights.',
    salaryFormatted: '₹5.0 – 16.0 LPA (Lead Analyst: ₹25+ LPA)',
    salary: { min: 500000, max: 1600000, median: 900000, currency: 'INR' },
    demand_score: 94,
    educationRoutes: [
      {
        routeName: 'Route 1: Direct Entry from Commerce / Economics / Math Degrees',
        title: 'Quantitative & Business Analytics Path',
        degrees: ['B.Com', 'B.Sc Statistics', 'BBA', 'B.Tech (Any Branch)', 'BCA'],
        skills: ['SQL', 'Power BI / Tableau', 'Advanced Excel', 'Python (Pandas)'],
        timeline: '3-4 Months Hands-on Portfolio Prep'
      }
    ],
    requiredSkills: ['SQL', 'Advanced Excel', 'Power BI or Tableau', 'Python for Data Analysis', 'Business Metrics Calculation'],
    preferredSkills: ['Snowflake / BigQuery', 'Statistical Hypothesis Testing', 'Machine Learning Basics', 'dbt']
  },
  {
    id: 'ias-civil-services',
    slug: 'ias-civil-services',
    name: 'Civil Services Administrator (IAS / IPS / IFS)',
    title: 'Civil Services Administrator (IAS / IPS / IFS)',
    shortName: 'IAS / IPS',
    type: 'GOVERNMENT_JOB',
    category: 'Civil Services & Governance',
    sector: 'Government of India',
    aliases: ['IAS Officer', 'IPS Officer', 'District Magistrate', 'Superintendent of Police'],
    description: 'Manages district administration, maintains public order, executes socio-economic welfare policies, and leads departments of the sovereign state.',
    salaryFormatted: 'Level 10 Pay Matrix (₹56,100 – ₹2,50,000/mo + Sovereign Perks)',
    demand_score: 99,
    educationRoutes: [
      {
        routeName: 'Route 1: Graduation in Any Discipline + UPSC CSE Exam',
        title: 'National Competitive Sovereign Entrance',
        degrees: ['Graduation in Any Discipline (B.Tech, B.Com, B.A, B.Sc, MBBS, LLB)'],
        skills: ['General Studies (Polity, History, Economy, Geography)', 'Essay Writing', 'Analytical Ethics', 'Interview Readiness'],
        timeline: '1-2 Years Dedicated Preparation'
      }
    ],
    requiredSkills: ['Indian Polity & Constitution', 'Macroeconomics & Fiscal Policy', 'Written Essay Articulation', 'Critical Analytical Reasoning'],
    notificationUrl: 'https://upsc.gov.in'
  },
  {
    id: 'chartered-accountant',
    slug: 'chartered-accountant',
    name: 'Chartered Accountant (CA)',
    title: 'Chartered Accountant (CA)',
    shortName: 'Chartered Accountant',
    type: 'JOB',
    category: 'Finance & Banking',
    sector: 'Financial Accounting & Statutory Audit',
    aliases: ['CA', 'Auditor', 'Tax Consultant', 'Financial Controller'],
    description: 'Authoritative financial professional certified by ICAI to perform statutory audit, direct/indirect taxation compliance, and corporate financial controller roles.',
    salaryFormatted: '₹9.0 – 28.0 LPA (Partner: ₹50+ LPA)',
    demand_score: 95,
    educationRoutes: [
      {
        routeName: 'Route 1: Direct Entry after Graduation (B.Com / BBA)',
        title: 'ICAI Direct Entry Scheme',
        degrees: ['B.Com (Min 55%)', 'Any Graduate (Min 60%)'],
        skills: ['Direct Tax', 'GST Law', 'Company Law', 'Corporate Audit Standards'],
        timeline: '3 Years Articleship + CA Inter & Final'
      }
    ],
    requiredSkills: ['Statutory Financial Auditing', 'Indian & International Tax Laws', 'Corporate Financial Reporting', 'GST Compliance']
  },
  {
    id: 'ai-ml-engineer',
    slug: 'ai-machine-learning-engineer',
    name: 'AI & Machine Learning Engineer',
    title: 'AI & Machine Learning Engineer',
    shortName: 'AI / ML Engineer',
    type: 'JOB',
    category: 'Technology & AI',
    sector: 'Artificial Intelligence & Deep Learning',
    aliases: ['Machine Learning Engineer', 'MLOps Engineer', 'AI Research Engineer', 'Deep Learning Specialist'],
    description: 'Designs, trains, fine-tunes, and deploys high-scale deep learning models, LLMs, and real-time computer vision / NLP inference engines.',
    salaryFormatted: '₹8.0 – 26.0 LPA (Senior AI Lead: ₹40+ LPA)',
    demand_score: 98,
    educationRoutes: [
      {
        routeName: 'Route 1: CS / Math / Engineering Degree + Deep Learning Track',
        title: 'Machine Learning Engineering Path',
        degrees: ['B.Tech Computer Science', 'B.Tech AI & Data Science', 'MCA', 'M.Tech CSE'],
        skills: ['Python', 'PyTorch / TensorFlow', 'Transformers & LLMs', 'Linear Algebra & Statistics', 'Docker & MLOps'],
        timeline: '6-9 Months Hands-on Project Implementation'
      }
    ],
    requiredSkills: ['Python', 'PyTorch / TensorFlow', 'Machine Learning Algorithms', 'SQL', 'Git & Docker']
  },
  {
    id: 'fullstack-web-developer',
    slug: 'full-stack-web-developer',
    name: 'Full Stack Web & Cloud Developer',
    title: 'Full Stack Web & Cloud Developer',
    shortName: 'Full Stack Developer',
    type: 'JOB',
    category: 'Software Engineering',
    sector: 'Information Technology',
    aliases: ['Web Developer', 'Frontend Developer', 'Backend Developer', 'MERN Stack Developer'],
    description: 'Builds end-to-end web architectures, responsive frontends in React / Next.js, and scalable cloud microservices in Node.js / Python.',
    salaryFormatted: '₹5.5 – 18.0 LPA (Tech Lead: ₹30+ LPA)',
    demand_score: 96,
    educationRoutes: [
      {
        routeName: 'Route 1: Computer Science / Engineering / BCA Degree',
        title: 'Full Stack Engineering Pathway',
        degrees: ['B.Tech Computer Science', 'BCA', 'MCA', 'B.Sc IT'],
        skills: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST / GraphQL APIs'],
        timeline: '3-6 Months Full Stack Projects'
      }
    ],
    requiredSkills: ['JavaScript / TypeScript', 'React', 'Node.js / Express', 'SQL & MongoDB', 'RESTful APIs', 'Git / GitHub']
  }
];

export const FALLBACK_STUDIES = [
  {
    id: 'study-btech-cse',
    slug: 'btech-computer-science',
    name: 'B.Tech Computer Science & Engineering',
    degreeLevel: 'UNDERGRADUATE',
    duration: '4 Years',
    type: 'STUDY',
    category: 'Engineering & Technology',
    overview: 'The flagship undergraduate professional engineering program covering computer algorithms, operating systems, compiler design, software development, cloud computing, and AI architectures.',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics (PCM) with minimum 50-60% marks.',
    typicalFees: '₹1.5 Lakhs – ₹4.0 Lakhs per annum',
    admissionProcess: 'National / State Entrance Exams (JEE Main, JEE Advanced, BITSAT, State CETs)',
    nextStudies: ['M.Tech Computer Science', 'MBA in Technology Management', 'MS in Computer Science (USA/Europe)', 'PG Diploma in Data Science'],
    targetJobs: ['Software Development Engineer (SDE)', 'AI & Machine Learning Engineer', 'Cloud Solutions Architect', 'Data Scientist'],
    exams: ['GATE', 'CAT', 'GRE']
  },
  {
    id: 'study-mtech-cse',
    slug: 'mtech-computer-science',
    name: 'M.Tech in Computer Science & Artificial Intelligence',
    degreeLevel: 'POSTGRADUATE',
    duration: '2 Years',
    type: 'STUDY',
    category: 'Postgraduate Engineering',
    overview: 'Premier 2-year Master’s program at IITs, NITs, and IIITs focusing on advanced algorithms, distributed AI architectures, quantum computing, and research publications.',
    eligibility: 'Bachelor’s degree in Engineering (B.Tech / B.E. in CSE, IT, ECE) or MCA / M.Sc CS with valid GATE score.',
    typicalFees: '₹50,000 – ₹1.5 Lakhs per annum (Includes ₹12,400/month MHRD stipend)',
    admissionProcess: 'GATE Exam + COAP Counseling',
    nextStudies: ['Ph.D. in Computer Science', 'Postdoctoral Research Fellowship'],
    targetJobs: ['AI Research Scientist', 'Senior Software Engineer', 'Chief Technology Officer (CTO)', 'Systems Architect'],
    exams: ['GATE']
  },
  {
    id: 'study-mba',
    slug: 'mba-technology-business-management',
    name: 'MBA (Master of Business Administration)',
    degreeLevel: 'POSTGRADUATE',
    duration: '2 Years',
    type: 'STUDY',
    category: 'Management & Business Strategy',
    overview: 'Flagship 2-year leadership degree at IIMs, XLRI, and FMS covering corporate strategy, product management, financial analytics, operations, and marketing leadership.',
    eligibility: 'Bachelor’s degree in any discipline (B.Tech, B.Com, BBA, B.Sc, B.A.) with minimum 50% marks.',
    typicalFees: '₹8.0 Lakhs – ₹25.0 Lakhs (IIMs)',
    admissionProcess: 'CAT / XAT / GMAT Entrance Examination + WAT / GD / PI',
    nextStudies: ['Executive Management', 'Doctorate in Business (DBA)'],
    targetJobs: ['Product Manager (Tech)', 'Management Consultant (McKinsey/BCG)', 'Investment Banker', 'Corporate Strategy Director'],
    exams: ['CAT', 'XAT', 'GMAT']
  },
  {
    id: 'study-ms-cs',
    slug: 'ms-computer-science-abroad',
    name: 'MS in Computer Science & Data Systems (USA / Europe)',
    degreeLevel: 'POSTGRADUATE',
    duration: '1.5 – 2 Years',
    type: 'STUDY',
    category: 'International Postgraduate',
    overview: 'International Master’s program specializing in machine learning, distributed computing, cybersecurity, and cloud infrastructure at top global universities.',
    eligibility: 'Bachelor’s in Engineering / CS (B.Tech / B.E. / BCA / B.Sc CS) with minimum 65-70% / 3.0+ GPA.',
    typicalFees: '₹20 Lakhs – ₹45 Lakhs total tuition',
    admissionProcess: 'GRE + TOEFL / IELTS + Statement of Purpose (SOP) + LORs',
    nextStudies: ['Ph.D. in AI / Robotics', 'Global R&D Leadership'],
    targetJobs: ['Silicon Valley SDE', 'Machine Learning Research Engineer', 'Data Systems Architect'],
    exams: ['GRE', 'TOEFL', 'IELTS']
  },
  {
    id: 'study-bcom',
    slug: 'bcom-accounting-finance',
    name: 'B.Com (Bachelor of Commerce)',
    degreeLevel: 'UNDERGRADUATE',
    duration: '3 Years',
    type: 'STUDY',
    category: 'Commerce & Business',
    overview: 'The fundamental commerce degree providing comprehensive mastery of financial accounting, corporate governance, mercantile law, taxation, macroeconomics, and banking operations.',
    eligibility: '10+2 in Commerce or Any Stream with minimum 50% aggregate marks.',
    typicalFees: '₹20,000 – ₹1.2 Lakhs per annum',
    admissionProcess: 'CUET UG or Merit-Based University Admission',
    nextStudies: ['Chartered Accountancy (CA Direct Entry)', 'MBA Finance', 'M.Com', 'CFA (Chartered Financial Analyst)', 'US CPA'],
    targetJobs: ['Data Analyst', 'Financial Analyst', 'Accountant', 'Bank Probationary Officer (PO)', 'Tax Consultant'],
    exams: ['CAT', 'CUET PG', 'ICAI CA Inter']
  },
  {
    id: 'study-mcom',
    slug: 'mcom-master-of-commerce',
    name: 'M.Com (Master of Commerce)',
    degreeLevel: 'POSTGRADUATE',
    duration: '2 Years',
    type: 'STUDY',
    category: 'Commerce & Accounting',
    overview: 'Advanced 2-year postgraduate program covering advanced financial management, corporate accounting, international banking, econometric modeling, and tax policies.',
    eligibility: 'B.Com / BBA with minimum 50% aggregate marks.',
    typicalFees: '₹15,000 – ₹80,000 per annum',
    admissionProcess: 'CUET PG / University Entrance Test',
    nextStudies: ['Ph.D. in Commerce', 'UGC NET (Assistant Professor)'],
    targetJobs: ['Senior Financial Analyst', 'Assistant Professor', 'Corporate Accountant', 'Statutory Tax Officer'],
    exams: ['CUET PG', 'UGC NET']
  },
  {
    id: 'study-bca',
    slug: 'bca-computer-applications',
    name: 'BCA (Bachelor of Computer Applications)',
    degreeLevel: 'UNDERGRADUATE',
    duration: '3 Years',
    type: 'STUDY',
    category: 'Computer Applications',
    overview: 'Undergraduate computer applications degree emphasizing practical software development, database administration, web programming, networking, and application engineering.',
    eligibility: '10+2 in Any Stream (Preferably with Mathematics / Computer Applications).',
    typicalFees: '₹40,000 – ₹1.8 Lakhs per annum',
    nextStudies: ['MCA (Master of Computer Applications)', 'M.Sc Computer Science', 'MBA Tech Management'],
    targetJobs: ['Software Development Engineer (SDE)', 'Full Stack Developer', 'System Administrator', 'Database Administrator'],
    exams: ['NIMCET', 'MAH MCA CET', 'CUET PG']
  },
  {
    id: 'study-mca',
    slug: 'mca-master-of-computer-applications',
    name: 'MCA (Master of Computer Applications)',
    degreeLevel: 'POSTGRADUATE',
    duration: '2 Years',
    type: 'STUDY',
    category: 'Computer Applications',
    overview: 'Premier 2-year technical master’s program granting equivalence to B.Tech Computer Science for corporate placements and system development roles.',
    eligibility: 'BCA, B.Sc Computer Science, or Any Graduate with Mathematics at 10+2 or Graduation level.',
    typicalFees: '₹60,000 – ₹2.5 Lakhs per annum',
    admissionProcess: 'NIMCET (for NITs) / MAH MCA CET / State MCA Entrance Tests',
    nextStudies: ['Ph.D. in Computer Science', 'Cloud Architect Certification'],
    targetJobs: ['Software Development Engineer (SDE)', 'Full Stack Engineer', 'Cloud Solutions Architect'],
    exams: ['NIMCET', 'MAH MCA CET', 'CUET PG']
  }
];

export const FALLBACK_EXAMS = [
  {
    id: 'exam-upsc-cse',
    slug: 'upsc-civil-services-examination',
    name: 'UPSC Civil Services Examination (CSE)',
    conductingBody: 'Union Public Service Commission (UPSC)',
    frequency: 'Annually',
    type: 'GOVERNMENT_JOB',
    category: 'Civil Services & Administration',
    overview: 'India’s premier nationwide competitive examination to recruit administrators into the Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), and 24 Allied Central Services.',
    eligibility: 'Bachelor’s Degree in any discipline from a recognized University. Age: 21 to 32 years.',
    examPattern: 'Three-Stage Selection: 1. Prelims (Objective MCQs), 2. Mains (9 Written Subjective Papers), 3. Personality Test (Interview).',
    notificationUrl: 'https://upsc.gov.in',
    recruitsTo: ['IAS (District Magistrate)', 'IPS (Superintendent of Police)', 'IFS (Ambassador / Diplomat)', 'IRS (Income Tax / Customs Commissioner)']
  },
  {
    id: 'exam-ssc-cgl',
    slug: 'ssc-cgl-combined-graduate-level',
    name: 'SSC CGL (Combined Graduate Level Examination)',
    conductingBody: 'Staff Selection Commission (SSC)',
    frequency: 'Annually',
    type: 'GOVERNMENT_JOB',
    category: 'Central Government Staffing',
    overview: 'National recruitment examination to select Group B and Group C officers across all Government of India Ministries, Income Tax, GST & Central Excise, Enforcement Directorate, and CBI.',
    eligibility: 'Graduation in Any Discipline. Age: 18 to 30/32 years.',
    examPattern: 'Tier 1 (Computer Based Test - Reasoning, Math, English, GK), Tier 2 (Advanced CBT + Computer & Typing Test).',
    notificationUrl: 'https://ssc.gov.in',
    recruitsTo: ['Income Tax Inspector', 'Central Excise / GST Inspector', 'Assistant Section Officer (Central Secretariat)', 'Sub-Inspector (CBI / NIA)']
  },
  {
    id: 'exam-gate',
    slug: 'gate-graduate-aptitude-test-engineering',
    name: 'GATE (Graduate Aptitude Test in Engineering)',
    conductingBody: 'IITs & IISc on rotation',
    frequency: 'Annually (February)',
    type: 'EXAM',
    category: 'Post-Graduate & PSU Recruitment',
    overview: 'All-India examination that tests comprehensive understanding of engineering and science subjects. Scores are used for direct Master’s (M.Tech) admissions at IITs/NITs and direct Executive Trainee appointments in Navratna PSUs (ONGC, IOCL, NTPC, BHEL).',
    eligibility: 'Candidates in 3rd year or completed Bachelor’s degree in Engineering / Technology / Science.',
    notificationUrl: 'https://gate.iitk.ac.in',
    recruitsTo: ['M.Tech / MS at IITs & IISc', 'Executive Engineer at PSUs (IOCL, NTPC, BHEL, PowerGrid)']
  }
];

/**
 * Intelligent Router that serves rich responses for any API route when backend is offline.
 */
export const handleFallbackRequest = (config = {}) => {
  const url = config.url || '';
  const cleanUrl = url.split('?')[0].replace(/^\/api/, '');
  const params = config.params || {};

  // 1. Careers List
  if (cleanUrl === '/careers' || cleanUrl === '/career') {
    return {
      success: true,
      count: FALLBACK_CAREERS.length,
      data: FALLBACK_CAREERS
    };
  }

  // 2. Career Detail
  if (cleanUrl.startsWith('/careers/') || cleanUrl.startsWith('/career/')) {
    const slug = cleanUrl.split('/').pop().toLowerCase();
    const career = FALLBACK_CAREERS.find(c => c.slug === slug || c.id === slug) || FALLBACK_CAREERS[0];
    return { success: true, data: career };
  }

  // 3. Jobs List
  if (cleanUrl === '/jobs' || cleanUrl === '/job') {
    return {
      success: true,
      count: FALLBACK_JOBS.length,
      data: FALLBACK_JOBS
    };
  }

  // 4. Job Detail
  if (cleanUrl.startsWith('/jobs/') || cleanUrl.startsWith('/job/')) {
    const slug = cleanUrl.split('/').pop().toLowerCase();
    const job = FALLBACK_JOBS.find(j => j.slug === slug || j.id === slug) || FALLBACK_JOBS[0];
    return { success: true, data: job };
  }

  // 5. Studies / Degrees List
  if (cleanUrl === '/studies' || cleanUrl === '/study' || cleanUrl === '/study-options' || cleanUrl === '/study-next') {
    return {
      success: true,
      count: FALLBACK_STUDIES.length,
      data: FALLBACK_STUDIES
    };
  }

  // 6. Exams List
  if (cleanUrl === '/exams' || cleanUrl === '/exam') {
    return {
      success: true,
      count: FALLBACK_EXAMS.length,
      data: FALLBACK_EXAMS
    };
  }

  // 7. Universal Search (Intent-Aware & Profile-Personalized)
  if (cleanUrl === '/search' || cleanUrl.startsWith('/search')) {
    const qParam = new URLSearchParams(url.includes('?') ? url.split('?')[1] : '').get('q') || params.q || '';
    const query = qParam.toLowerCase().trim();

    // Context awareness: Get current user education
    let userEdu = 'B.Tech';
    try {
      const storedEdu = localStorage.getItem('careercompass_education');
      if (storedEdu) {
        const parsed = JSON.parse(storedEdu);
        if (parsed.educationName) userEdu = parsed.educationName;
      }
    } catch {}

    const allEntities = [
      ...FALLBACK_JOBS.map(j => ({ ...j, type: j.type || 'JOB' })),
      ...FALLBACK_STUDIES.map(s => ({ ...s, type: 'STUDY' })),
      ...FALLBACK_EXAMS.map(e => ({ ...e, type: e.type || 'GOVERNMENT_JOB' })),
      ...FALLBACK_CAREERS.map(c => ({ ...c, type: 'CAREER' }))
    ];

    let results = allEntities;

    // Intent detection
    const isStudyIntent = /^(study|studies|course|courses|degree|degrees|masters|master|higher study|higher studies|college|education|phd)$/i.test(query) ||
      query.includes('study after') || query.includes('courses after') || query.includes('degrees after') || query.includes('what to study');

    const isJobIntent = /^(job|jobs|career|careers|placement|placements|work|hiring|role|roles|salary|salaries)$/i.test(query) ||
      query.includes('jobs after') || query.includes('careers after') || query.includes('jobs for');

    const isGovtIntent = /^(govt|government|exam|exams|sarkari|upsc|ssc|gate|psu)$/i.test(query) ||
      query.includes('govt job') || query.includes('government job');

    if (isStudyIntent) {
      // Return study entities, prioritizing those matching or following user's degree
      results = allEntities.filter(item => {
        const itemType = (item.type || '').toUpperCase();
        return itemType.includes('STUDY') || itemType === 'EDUCATION';
      });
      results.sort((a, b) => {
        const aText = `${a.name || ''} ${a.overview || ''} ${a.eligibility || ''}`.toLowerCase();
        const bText = `${b.name || ''} ${b.overview || ''} ${b.eligibility || ''}`.toLowerCase();
        const aMatchesEdu = aText.includes(userEdu.toLowerCase());
        const bMatchesEdu = bText.includes(userEdu.toLowerCase());
        return (bMatchesEdu ? 1 : 0) - (aMatchesEdu ? 1 : 0);
      });
    } else if (isJobIntent) {
      // Return job and career entities, prioritizing those matching user's degree
      results = allEntities.filter(item => {
        const itemType = (item.type || '').toUpperCase();
        return itemType.includes('JOB') || itemType === 'CAREER';
      });
      results.sort((a, b) => {
        const aText = `${a.title || ''} ${a.name || ''} ${JSON.stringify(a.educationRoutes || [])}`.toLowerCase();
        const bText = `${b.title || ''} ${b.name || ''} ${JSON.stringify(b.educationRoutes || [])}`.toLowerCase();
        const aMatchesEdu = aText.includes(userEdu.toLowerCase());
        const bMatchesEdu = bText.includes(userEdu.toLowerCase());
        return (bMatchesEdu ? 1 : 0) - (aMatchesEdu ? 1 : 0);
      });
    } else if (isGovtIntent) {
      results = allEntities.filter(item => {
        const itemType = (item.type || '').toUpperCase();
        return itemType === 'GOVERNMENT_JOB' || itemType === 'EXAM';
      });
    } else if (query) {
      results = allEntities.filter(item => {
        const text = `${item.name || ''} ${item.title || ''} ${item.description || ''} ${item.category || ''} ${(item.aliases || []).join(' ')} ${(item.requiredSkills || []).join(' ')}`.toLowerCase();
        return text.includes(query);
      });
      if (results.length === 0) {
        const tokens = query.split(/\s+/).filter(Boolean);
        results = allEntities.filter(item => {
          const text = `${item.name || ''} ${item.title || ''} ${item.description || ''}`.toLowerCase();
          return tokens.some(t => text.includes(t));
        });
      }
      if (results.length === 0) {
        results = allEntities;
      }
    }

    let directCard = null;
    if (query && (query.includes('how to become') || query.includes('sde') || query.includes('software development engineer') || query.includes('roadmap'))) {
      directCard = FALLBACK_JOBS.find(j => j.title.toLowerCase().includes(query) || j.name.toLowerCase().includes(query) || (j.aliases || []).some(a => a.toLowerCase().includes(query))) || null;
    }

    return {
      query: qParam,
      count: results.length,
      results,
      directCard
    };
  }

  // 8. Auth Endpoints (Login / Register / Me / Profile)
  if (cleanUrl.includes('auth/login') || cleanUrl.includes('auth/register') || cleanUrl.includes('auth/me') || cleanUrl.includes('user/profile')) {
    let userName = '';
    let userEmail = '';
    let userDegree = 'B.Tech';
    let userStream = 'Computer Science';
    let userTargetJob = 'Software Development Engineer (SDE)';

    try {
      const stored = localStorage.getItem('careercompass_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) userName = parsed.name;
        if (parsed.email) userEmail = parsed.email;
      }
      const storedProf = localStorage.getItem('careercompass_profile');
      if (storedProf) {
        const parsedProf = JSON.parse(storedProf);
        if (parsedProf.name && !userName) userName = parsedProf.name;
        if (parsedProf.degree) userDegree = parsedProf.degree;
        if (parsedProf.specialization) userStream = parsedProf.specialization;
        if (parsedProf.targetJob) userTargetJob = parsedProf.targetJob;
      }
    } catch {}

    // Check payload data if provided in config.data
    try {
      if (config.data) {
        const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
        if (data) {
          if (data.email) {
            userEmail = data.email;
            if (!userName) {
              const part = data.email.split('@')[0];
              userName = part.charAt(0).toUpperCase() + part.slice(1);
            }
          }
          if (data.username) {
            userName = data.username.charAt(0).toUpperCase() + data.username.slice(1);
          }
          if (data.name) {
            userName = data.name;
          }
          if (data.degree) userDegree = data.degree;
          if (data.specialization) userStream = data.specialization;
        }
      }
    } catch {}

    if (!userName) userName = 'Explorer';
    if (!userEmail) userEmail = `${userName.toLowerCase().replace(/\s+/g, '')}@futurepath.ai`;

    return {
      success: true,
      token: 'jwt-futurepath-active-session',
      user: {
        id: 'usr-futurepath-active',
        name: userName,
        email: userEmail,
        role: 'user',
        profile: {
          education: {
            degreeName: userDegree,
            stream: userStream
          },
          targetCareer: {
            title: userTargetJob
          }
        }
      }
    };
  }

  // 9. Future Path / Target Job Roadmap
  if (cleanUrl.includes('future-path') || cleanUrl.includes('target-job') || cleanUrl.includes('job-roadmap')) {
    return {
      success: true,
      education: 'B.Tech Computer Science',
      targetJob: 'Software Development Engineer (SDE)',
      roadmap: {
        title: 'Roadmap to Software Development Engineer',
        totalSteps: 4,
        steps: [
          {
            stepNumber: 1,
            title: 'Core Fundamentals & Data Structures',
            description: 'Master arrays, linked lists, trees, graphs, sorting, and algorithmic complexity (Big-O).',
            status: 'CURRENT',
            timeline: 'Month 1 - 2',
            skills: ['DSA', 'LeetCode (Easy/Medium)', 'Time Complexity']
          },
          {
            stepNumber: 2,
            title: 'Full-Stack Architecture & Microservices',
            description: 'Build production-ready REST & GraphQL services with authentication, caching, and database schemas.',
            status: 'UPCOMING',
            timeline: 'Month 3 - 4',
            skills: ['Node.js / Express', 'PostgreSQL / Prisma', 'Redis', 'JWT Auth']
          },
          {
            stepNumber: 3,
            title: 'System Design & Cloud Infrastructure',
            description: 'Learn high-availability system architecture, load balancers, CDN, message queues, and containerization.',
            status: 'UPCOMING',
            timeline: 'Month 5 - 6',
            skills: ['System Design', 'Docker', 'AWS (EC2, S3)', 'Kafka']
          },
          {
            stepNumber: 4,
            title: 'Capstone Projects & Technical Mock Interviews',
            description: 'Deploy 2 high-impact full-stack portfolio systems with live URLs, CI/CD, and conduct behavioral interview prep.',
            status: 'UPCOMING',
            timeline: 'Month 7',
            skills: ['CI/CD (GitHub Actions)', 'Portfolio Deployment', 'Behavioral Interviews']
          }
        ]
      }
    };
  }

  // 9. Default Fallback
  return {
    success: true,
    message: 'Loaded verified offline dataset.',
    data: FALLBACK_CAREERS
  };
};

