/**
 * ==============================================================================
 * FUTURE PATH — MASTER SKILLS & PROFESSIONAL COMPETENCIES DATASET
 * ==============================================================================
 * Covers Technical, Analytical, Clinical, Financial, Core Engineering & Design skills.
 * ==============================================================================
 */

export const structuredSkills = [
  // --------------------------------------------------------------------------
  // TECHNICAL & COMPUTING
  // --------------------------------------------------------------------------
  {
    id: 'skill-sql',
    name: 'SQL (Structured Query Language)',
    shortName: 'SQL',
    type: 'SKILL',
    category: 'Information Technology',
    demand_level: 'High',
    aliases: ['SQL', 'PostgreSQL', 'MySQL', 'Database Querying', 'Structured Query Language'],
    description: 'Standard domain-specific language for managing, querying, transforming, and modeling data in relational database systems.',
    overview: 'Essential foundational skill for data analysts, software developers, database administrators, and backend engineers.',
    relatedStudies: ['B.Com', 'BCA', 'B.Tech CSE', 'M.Sc Data Science', 'MCA'],
    relatedJobs: ['Data Analyst', 'Software Developer', 'Database Administrator', 'Data Engineer'],
    sources: [{ title: 'ISO/IEC 9075 SQL Standard', url: 'https://iso.org', sourceType: 'REFERENCE', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-python',
    name: 'Python Programming',
    shortName: 'Python',
    type: 'SKILL',
    category: 'Computer Science',
    demand_level: 'High',
    aliases: ['Python', 'Python 3', 'Python Programming Language'],
    description: 'High-level, versatile programming language renowned for clean syntax and a massive ecosystem in data science, artificial intelligence, web development, and scripting.',
    overview: 'The primary language powering machine learning (PyTorch, TensorFlow), data analytics (Pandas, NumPy), and backend APIs (FastAPI, Django).',
    relatedStudies: ['B.Tech CSE', 'BCA', 'M.Sc Data Science', 'MCA', 'B.Sc Statistics'],
    relatedJobs: ['Data Analyst', 'Software Developer', 'AI/ML Engineer', 'Data Scientist'],
    sources: [{ title: 'Python Software Foundation', url: 'https://python.org', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-dsa',
    name: 'Data Structures & Algorithms (DSA)',
    shortName: 'DSA',
    type: 'SKILL',
    category: 'Computer Science',
    demand_level: 'Critical',
    aliases: ['DSA', 'Algorithmic Problem Solving', 'LeetCode', 'Computer Algorithms'],
    description: 'Foundational computer science concepts including arrays, linked lists, trees, graphs, dynamic programming, sorting, and algorithmic complexity (Big-O).',
    overview: 'The primary benchmark used by top technology companies (Google, Microsoft, Amazon) in software engineering technical interviews.',
    relatedStudies: ['B.Tech CSE', 'BCA', 'MCA', 'B.Sc CS'],
    relatedJobs: ['Software Development Engineer (SDE)', 'Full Stack Web Developer'],
    sources: [{ title: 'ACM Computer Science Curricula', url: 'https://acm.org', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-react-frontend',
    name: 'React.js & Modern Web Frontend',
    shortName: 'React.js',
    type: 'SKILL',
    category: 'Web Development',
    demand_level: 'High',
    aliases: ['React', 'React.js', 'Frontend Development', 'Next.js'],
    description: 'Component-driven user interface library for building dynamic, high-performance single-page web applications with reactive state management.',
    overview: 'Industry standard for modern web development, utilized by top enterprises for user portals and interactive SaaS dashboards.',
    relatedStudies: ['B.Tech CSE', 'BCA', 'B.Sc IT'],
    relatedJobs: ['Full Stack Web Developer', 'Software Development Engineer (SDE)'],
    sources: [{ title: 'React Documentation', url: 'https://react.dev', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-node-backend',
    name: 'Node.js & Backend Architecture',
    shortName: 'Node.js',
    type: 'SKILL',
    category: 'Web Development',
    demand_level: 'High',
    aliases: ['Node.js', 'Express.js', 'Backend Development', 'Server-side JavaScript'],
    description: 'Asynchronous event-driven JavaScript runtime environment for constructing scalable network applications, REST APIs, and microservices.',
    overview: 'Powers fast, concurrent backend microservices interfacing with PostgreSQL and caching layers.',
    relatedStudies: ['B.Tech CSE', 'BCA', 'MCA'],
    relatedJobs: ['Software Development Engineer (SDE)', 'Full Stack Web Developer'],
    sources: [{ title: 'Node.js Official Documentation', url: 'https://nodejs.org', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-cloud-aws',
    name: 'Cloud Computing & AWS Architecture',
    shortName: 'Cloud (AWS)',
    type: 'SKILL',
    category: 'Cloud Infrastructure',
    demand_level: 'High',
    aliases: ['AWS', 'Cloud Architecture', 'Amazon Web Services', 'Cloud Computing'],
    description: 'Designing, provisioning, and securing virtualized computing, serverless functions, relational databases, and multi-region storage on AWS.',
    overview: 'Core infrastructure competency for modern software hosting and scalable enterprise deployments.',
    relatedStudies: ['B.Tech CSE/IT', 'MCA'],
    relatedJobs: ['Cloud Solutions Architect', 'DevOps & SRE Engineer', 'Software Development Engineer (SDE)'],
    sources: [{ title: 'AWS Cloud Architecture', url: 'https://aws.amazon.com', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-ai-deep-learning',
    name: 'Machine Learning & Deep Learning (PyTorch / TensorFlow)',
    shortName: 'Machine Learning',
    type: 'SKILL',
    category: 'Artificial Intelligence',
    demand_level: 'Critical',
    aliases: ['Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Neural Networks', 'LLMs'],
    description: 'Training and deploying supervised/unsupervised machine learning models, convolutional neural networks, transformer architectures, and LLM fine-tuning.',
    overview: 'Underpins state-of-the-art predictive analytics, generative AI, computer vision, and natural language understanding.',
    relatedStudies: ['B.Tech AI & Data Science', 'M.Tech CSE', 'M.Sc Data Science'],
    relatedJobs: ['AI & Machine Learning Engineer', 'Data Analyst & Business Intelligence Specialist'],
    sources: [{ title: 'PyTorch Foundation', url: 'https://pytorch.org', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // FINANCE, COMMERCE & ANALYTICS
  // --------------------------------------------------------------------------
  {
    id: 'skill-financial-accounting',
    name: 'Financial Accounting & Corporate Reporting (Ind AS / IFRS)',
    shortName: 'Financial Accounting',
    type: 'SKILL',
    category: 'Commerce & Finance',
    demand_level: 'High',
    aliases: ['Financial Accounting', 'Corporate Reporting', 'Ind AS', 'IFRS', 'Bookkeeping'],
    description: 'Preparation and presentation of balance sheets, cash flow statements, and profit & loss accounts in strict compliance with Accounting Standards (Ind AS / IFRS).',
    overview: 'Core commercial skill required for corporate financial health monitoring, audit readiness, and tax computation.',
    relatedStudies: ['B.Com', 'M.Com', 'CA', 'CMA', 'BBA'],
    relatedJobs: ['Chartered Accountant (CA) & Statutory Auditor', 'Corporate Financial Analyst (FP&A)'],
    sources: [{ title: 'Ministry of Corporate Affairs (MCA) Accounting Standards', url: 'https://mca.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-financial-modeling',
    name: 'Financial Modeling & Valuation (DCF / LBO)',
    shortName: 'Financial Modeling',
    type: 'SKILL',
    category: 'Finance & Banking',
    demand_level: 'High',
    aliases: ['Financial Modeling', 'DCF Valuation', 'LBO Modeling', 'Corporate Valuation'],
    description: 'Building dynamic 3-statement forecast models, discounted cash flow valuations, mergers & acquisitions pro forma accretion/dilution models in Excel.',
    overview: 'The essential core skill for investment banking, private equity, equity research, and corporate development.',
    relatedStudies: ['B.Com', 'MBA Finance', 'CFA', 'CA'],
    relatedJobs: ['Investment Banker (M&A & Corporate Finance)', 'Quantitative Analyst (Quant)'],
    sources: [{ title: 'Corporate Finance Institute (CFI)', url: 'https://corporatefinanceinstitute.com', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-power-bi',
    name: 'Business Intelligence & Power BI / Tableau',
    shortName: 'Power BI & Tableau',
    type: 'SKILL',
    category: 'Data & Analytics',
    demand_level: 'High',
    aliases: ['Power BI', 'Tableau', 'Business Intelligence', 'Data Visualization', 'DAX'],
    description: 'Transforming complex data models into intuitive, interactive visual dashboards featuring DAX calculations, drill-downs, and executive KPI summaries.',
    overview: 'Bridges raw database tables with executive decision-making across all modern enterprises.',
    relatedStudies: ['B.Com', 'BBA', 'B.Tech CSE', 'M.Sc Data Science', 'BCA'],
    relatedJobs: ['Data Analyst & Business Intelligence Specialist', 'Product Manager (Tech & Growth)'],
    sources: [{ title: 'Microsoft Power BI Documentation', url: 'https://learn.microsoft.com/power-bi/', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-excel-advanced',
    name: 'Advanced Microsoft Excel & Power Query',
    shortName: 'Advanced Excel',
    type: 'SKILL',
    category: 'Productivity & Analytics',
    demand_level: 'High',
    aliases: ['Excel', 'Advanced Excel', 'Spreadsheets', 'Power Query', 'Pivot Tables'],
    description: 'Mastery of nested lookup formulas (XLOOKUP), dynamic arrays, multi-table Pivot Tables, automated data cleaning with Power Query, and VBA macros.',
    overview: 'The ubiquitous analytical tool utilized across banking, accounting, supply chain, and operations worldwide.',
    relatedStudies: ['B.Com', 'BBA', 'BA Economics', 'Any Stream'],
    relatedJobs: ['Data Analyst & Business Intelligence Specialist', 'Corporate Financial Analyst (FP&A)'],
    sources: [{ title: 'Microsoft Excel Documentation', url: 'https://support.microsoft.com/excel', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // HEALTHCARE & CLINICAL
  // --------------------------------------------------------------------------
  {
    id: 'skill-clinical-diagnosis',
    name: 'Clinical Patient Diagnosis & Emergency Resuscitation',
    shortName: 'Clinical Diagnosis',
    type: 'SKILL',
    category: 'Healthcare & Medicine',
    demand_level: 'Critical',
    aliases: ['Clinical Examination', 'Differential Diagnosis', 'BLS / ACLS', 'Emergency Resuscitation'],
    description: 'Systematic clinical examination of patients, formulating differential diagnoses, ordering laboratory diagnostics, and executing Advanced Cardiac Life Support (ACLS).',
    overview: 'Core clinical competency for physicians, surgeons, and emergency room clinicians.',
    relatedStudies: ['MBBS', 'MD / MS', 'BDS', 'B.Sc Nursing'],
    relatedJobs: ['Physician / Resident Medical Officer (MBBS / MD)', 'Registered Nurse (Critical Care & Hospital Operations)'],
    sources: [{ title: 'National Medical Commission Guidelines', url: 'https://nmc.org.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-pharmacology',
    name: 'Pharmacology & Pharmacovigilance',
    shortName: 'Pharmacology',
    type: 'SKILL',
    category: 'Pharmaceutical Sciences',
    demand_level: 'High',
    aliases: ['Pharmacology', 'Pharmacovigilance', 'Drug Safety', 'Adverse Event Reporting'],
    description: 'Mechanism of drug action, pharmacokinetics, drug-drug interaction evaluation, and adverse drug reaction monitoring in compliance with ICH-GCP guidelines.',
    overview: 'Essential for clinical pharmacists, drug formulation specialists, and pharmacovigilance safety officers.',
    relatedStudies: ['Bachelor of Pharmacy (B.Pharm)', 'Doctor of Pharmacy (Pharm.D)', 'MBBS'],
    relatedJobs: ['Clinical Pharmacist & Drug Safety Specialist'],
    sources: [{ title: 'Pharmacy Council of India', url: 'https://pci.nic.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // CORE ENGINEERING & DESIGN
  // --------------------------------------------------------------------------
  {
    id: 'skill-cad-fea',
    name: '3D CAD Modeling & Finite Element Analysis (FEA / ANSYS)',
    shortName: 'CAD & FEA',
    type: 'SKILL',
    category: 'Core Engineering',
    demand_level: 'High',
    aliases: ['SolidWorks', 'CATIA', 'ANSYS', 'CAD', 'FEA', '3D Modeling Mechanical'],
    description: 'Parametric solid modeling of mechanical assemblies, applying Geometric Dimensioning & Tolerancing (GD&T), and performing structural/thermal stress simulations.',
    overview: 'Core engineering skill for automotive, aerospace, robotics, and consumer electronics manufacturing.',
    relatedStudies: ['B.Tech Mechanical Engineering', 'B.Tech Aerospace Engineering', 'Polytechnic Mechanical'],
    relatedJobs: ['Mechanical Design & Robotics Engineer'],
    sources: [{ title: 'ASME Standards', url: 'https://asme.org', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-structural-analysis',
    name: 'Structural Analysis & Design (STAAD.Pro / ETABS)',
    shortName: 'Structural Analysis',
    type: 'SKILL',
    category: 'Civil Engineering',
    demand_level: 'High',
    aliases: ['STAAD.Pro', 'ETABS', 'Structural Design', 'RCC Design', 'BIM'],
    description: 'Computational modeling of reinforced concrete and steel structures subjected to dead, live, wind, and seismic earthquake loads per Indian Standards (IS codes).',
    overview: 'Mandatory skill for civil structural engineers designing multi-story towers, expressways, and bridges.',
    relatedStudies: ['B.Tech Civil Engineering', 'M.Tech Structural Engineering'],
    relatedJobs: ['Civil & Structural Infrastructure Engineer'],
    sources: [{ title: 'Bureau of Indian Standards (BIS)', url: 'https://bis.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-figma-uiux',
    name: 'Figma Prototyping & Design Systems',
    shortName: 'UI/UX (Figma)',
    type: 'SKILL',
    category: 'Design & Creative Media',
    demand_level: 'High',
    aliases: ['Figma', 'UI/UX Design', 'Design Systems', 'Interactive Prototyping', 'Wireframing'],
    description: 'Designing user interfaces, scalable design system component libraries (auto-layout, design tokens), and interactive clickable prototypes in Figma.',
    overview: 'Primary design tool used worldwide by product designers and design engineers.',
    relatedStudies: ['Bachelor of Design (B.Des)', 'B.Arch', 'BCA / B.Tech CS with portfolio'],
    relatedJobs: ['UI/UX Product Designer'],
    sources: [{ title: 'Figma Official Learning', url: 'https://help.figma.com', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // LAW, GOVERNANCE & GENERAL STUDIES
  // --------------------------------------------------------------------------
  {
    id: 'skill-contract-drafting',
    name: 'Commercial Contract Drafting & Corporate Law',
    shortName: 'Contract Drafting',
    type: 'SKILL',
    category: 'Law & Governance',
    demand_level: 'High',
    aliases: ['Contract Drafting', 'Corporate Law', 'M&A Due Diligence', 'Legal Research'],
    description: 'Drafting, reviewing, and negotiating commercial agreements (NDAs, Master Service Agreements, Shareholder Agreements) and ensuring compliance with Companies Act 2013.',
    overview: 'Core professional skill for corporate attorneys, legal counsels, and company secretaries.',
    relatedStudies: ['BA LLB (Hons)', 'BBA LLB (Hons)', '3-Year LLB', 'Company Secretary (CS)'],
    relatedJobs: ['Corporate Legal Counsel & M&A Lawyer'],
    sources: [{ title: 'Bar Council of India', url: 'https://barcouncilofindia.org', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-public-administration',
    name: 'Public Policy, Governance & Constitutional Law',
    shortName: 'Public Governance',
    type: 'SKILL',
    category: 'Civil Services & Governance',
    demand_level: 'High',
    aliases: ['Public Policy', 'Constitutional Law', 'Administrative Governance', 'Indian Polity'],
    description: 'Deep understanding of the Indian Constitution, parliamentary statutes, administrative law, public finance management, and district development execution.',
    overview: 'Crucial for civil servants, IAS/IPS officers, state administrators, and policy think-tank analysts.',
    relatedStudies: ['Any Bachelor’s Degree', 'BA Political Science', 'Public Administration'],
    relatedJobs: ['IAS Officer (Indian Administrative Service)', 'IPS Officer (Indian Police Service)', 'Central Government Inspector & Auditor (SSC CGL)'],
    sources: [{ title: 'National Portal of India', url: 'https://india.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  }
];
