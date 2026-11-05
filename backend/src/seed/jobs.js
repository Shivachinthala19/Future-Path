/**
 * ==============================================================================
 * FUTURE PATH — MASTER JOB ROLES & CAREER OCCUPATIONS DATASET
 * ==============================================================================
 * Comprehensive coverage across all sectors:
 * - Software & AI Systems (SDE, ML Engineer, Cloud Architect, DevOps, Cyber, Full Stack)
 * - Data, Analytics & Product (Data Analyst, Quant Analyst, Product Manager)
 * - Finance, Accounting & Banking (Chartered Accountant, Investment Banker, Financial Analyst, Bank PO, RBI Grade B)
 * - Healthcare & Clinical Sciences (Physician / MBBS, Pharmacist, Nurse, Physiotherapist, Lab Technologist)
 * - Core Engineering & Deep Tech (Mechanical, Electrical, Civil, Chemical, Aerospace / ISRO)
 * - Law & Legal Advisory (Corporate Counsel, Litigation Advocate, Compliance Officer)
 * - Civil Services, Public Sector & Defence (IAS, IPS, Defence Officer, SSC CGL Inspector, RRB Station Master)
 * - Design, Architecture & Media (UI/UX Designer, Architect, 3D/VFX Artist)
 * - Academics, Research & Agriculture (University Professor, Research Physicist, Psychologist, Agri Scientist)
 * ==============================================================================
 */

export const structuredJobs = [
  // --------------------------------------------------------------------------
  // 1. SOFTWARE & ARTIFICIAL INTELLIGENCE
  // --------------------------------------------------------------------------
  {
    id: 'software-development-engineer',
    name: 'Software Development Engineer (SDE)',
    title: 'Software Development Engineer (SDE)',
    shortName: 'SDE',
    type: 'JOB',
    category: 'Technology & Software',
    sector: 'Information Technology',
    aliases: ['Software Engineer', 'Software Developer', 'SDE 1', 'Backend Developer', 'Frontend Developer', 'Full Stack Engineer'],
    description: 'Designs, develops, tests, and deploys high-scale software applications, microservices, and distributed systems solving complex computational and business problems.',
    overview: 'Core engineering role responsible for writing clean, performant code, architecting relational and NoSQL databases, implementing REST/GraphQL APIs, and maintaining robust CI/CD deployment pipelines.',
    educationRoutes: [
      {
        routeName: 'Route 1: Computer Science / Engineering Degree (B.Tech CSE/IT, MCA, BCA)',
        title: 'Formal Computer Science Path',
        degrees: ['B.Tech Computer Science', 'B.Tech IT', 'MCA', 'BCA'],
        skills: ['Data Structures & Algorithms', 'System Design', 'JavaScript / TypeScript', 'Node.js / Java / Python', 'SQL & Databases'],
        timeline: 'Direct Placement / 3-6 Months Structured Prep'
      },
      {
        routeName: 'Route 2: STEM Degree + Full-Stack Software Engineering Bootcamps',
        title: 'Transition Path for Science & Engineering Graduates',
        degrees: ['B.Sc Computer Science', 'B.Tech Core Branches', 'M.Sc CS'],
        skills: ['Web Development', 'React', 'Node.js', 'PostgreSQL', 'Git / GitHub'],
        timeline: '6 Months Project-Driven Transition'
      }
    ],
    requiredSkills: ['Data Structures & Algorithms', 'JavaScript / TypeScript', 'Node.js or Python or Java', 'SQL / PostgreSQL', 'Git & Version Control', 'RESTful APIs'],
    preferredSkills: ['System Design', 'Docker & Containerization', 'AWS / Cloud Deployment', 'Microservices Architecture', 'Redis Caching', 'CI/CD Pipelines'],
    tools: ['VS Code', 'Git', 'Docker', 'Postman', 'Supabase / PostgreSQL', 'AWS', 'Linux'],
    topCompanies: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Zomato', 'Swiggy', 'Infosys', 'TCS', 'Leading Tech Startups'],
    salaryRange: { min: 600000, max: 2400000, currency: 'INR', formatted: '₹6.0 - ₹24.0 LPA' },
    minimumEducation: 'B.Tech / B.E. / BCA / MCA / B.Sc Computer Science',
    eligibility: 'Graduation in Engineering / Computer Applications / Science with sound programming and algorithmic problem-solving foundations.'
  },
  {
    id: 'ai-machine-learning-engineer',
    name: 'AI & Machine Learning Engineer',
    title: 'AI & Machine Learning Engineer',
    shortName: 'ML Engineer',
    type: 'JOB',
    category: 'Technology & Software',
    sector: 'Artificial Intelligence & Data',
    aliases: ['Machine Learning Engineer', 'ML Engineer', 'AI Engineer', 'Deep Learning Engineer', 'LLM Engineer'],
    description: 'Builds, trains, fine-tunes, and deploys machine learning models, neural networks, and generative AI systems into production software environments.',
    overview: 'Develops predictive algorithms, natural language processing (NLP) pipelines, computer vision models, and transformer architectures to solve high-value enterprise problems.',
    educationRoutes: [
      {
        routeName: 'Route 1: Degree in CS, Data Science, AI or Mathematics (B.Tech / M.Tech / M.Sc)',
        degrees: ['B.Tech CS / AI', 'M.Tech CSE', 'M.Sc Data Science', 'B.Sc Statistics / Math'],
        skills: ['Python', 'Linear Algebra & Calculus', 'Scikit-learn', 'PyTorch / TensorFlow', 'Hugging Face Transformers'],
        timeline: '6 - 9 Months Deep Learning Specialization'
      }
    ],
    requiredSkills: ['Python Programming', 'PyTorch or TensorFlow', 'Linear Algebra & Statistics', 'Machine Learning Algorithms', 'Data Preprocessing', 'Model Evaluation'],
    preferredSkills: ['Large Language Models (LLMs)', 'RAG Pipelines (Retrieval Augmented Generation)', 'Vector Databases', 'MLOps & Model Deployment', 'Docker', 'CUDA / GPU Optimization'],
    tools: ['Jupyter Notebooks', 'PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'Pinecone / ChromaDB', 'Docker'],
    topCompanies: ['OpenAI', 'Google DeepMind', 'Microsoft', 'NVIDIA', 'Amazon AWS', 'Adobe', 'Fractal Analytics', 'Tiger Analytics'],
    salaryRange: { min: 800000, max: 3200000, currency: 'INR', formatted: '₹8.0 - ₹32.0 LPA' },
    minimumEducation: 'B.Tech / M.Sc / M.Tech in CS, AI, Data Science or Mathematics',
    eligibility: 'Strong foundation in Python programming, applied linear algebra, calculus, probability, and machine learning architectures.'
  },
  {
    id: 'cloud-solutions-architect',
    name: 'Cloud Solutions Architect',
    title: 'Cloud Solutions Architect',
    shortName: 'Cloud Architect',
    type: 'JOB',
    category: 'Technology & Software',
    sector: 'Cloud Infrastructure & DevOps',
    aliases: ['Cloud Architect', 'AWS Solutions Architect', 'Azure Architect', 'Cloud Infrastructure Engineer'],
    description: 'Architects, secures, and oversees enterprise cloud computing environments across Amazon Web Services (AWS), Microsoft Azure, or Google Cloud Platform (GCP).',
    overview: 'Designs highly available, fault-tolerant, scalable, and cost-optimized multi-region cloud infrastructures incorporating container orchestration, serverless compute, and zero-trust security.',
    educationRoutes: [
      {
        routeName: 'Route 1: Engineering Degree + Professional Cloud Certifications',
        degrees: ['B.Tech CSE/IT/ECE', 'MCA', 'B.Sc Computer Science'],
        skills: ['AWS / Azure / GCP', 'Terraform / IaC', 'Kubernetes & Docker', 'Networking & Subnetting', 'Cloud Security'],
        timeline: '1 - 2 Years progressive cloud infrastructure engineering'
      }
    ],
    requiredSkills: ['Cloud Architecture (AWS / Azure / GCP)', 'Infrastructure as Code (Terraform)', 'Kubernetes & Docker', 'Virtual Networks & VPCs', 'Identity & Access Management (IAM)', 'Cost Optimization'],
    preferredSkills: ['Multi-Cloud Strategy', 'CI/CD Pipelines', 'Zero-Trust Architecture', 'Disaster Recovery Planning', 'FinOps'],
    tools: ['AWS Console', 'Terraform', 'Kubernetes', 'Docker', 'Ansible', 'Prometheus', 'Grafana'],
    topCompanies: ['Amazon Web Services', 'Microsoft', 'Google Cloud', 'Wipro', 'Cognizant', 'Accenture', 'Deloitte', 'HCLTech'],
    salaryRange: { min: 1200000, max: 3800000, currency: 'INR', formatted: '₹12.0 - ₹38.0 LPA' },
    minimumEducation: 'B.Tech / B.E. / MCA / Relevant Cloud Certifications',
    eligibility: 'Background in IT systems, computer networking, server administration, and hands-on public cloud platforms.'
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst & Ethical Hacker',
    title: 'Cybersecurity Analyst & Ethical Hacker',
    shortName: 'Cybersecurity Analyst',
    type: 'JOB',
    category: 'Technology & Software',
    sector: 'Information Security',
    aliases: ['Security Analyst', 'SOC Analyst', 'Penetration Tester', 'Ethical Hacker', 'Information Security Officer'],
    description: 'Safeguards computer networks, cloud servers, databases, and digital assets against unauthorized access, cyber attacks, data breaches, and ransomware.',
    overview: 'Monitors security operations center (SOC) alerts, conducts penetration testing, performs vulnerability assessments, and enforces corporate security protocols.',
    educationRoutes: [
      {
        routeName: 'Route 1: CS/IT Degree + Security Certifications (CEH, CompTIA Security+)',
        degrees: ['B.Tech CSE/IT', 'BCA', 'B.Sc Cyber Security / CS'],
        skills: ['Network Protocols (TCP/IP, DNS, SSL)', 'Linux Administration', 'Penetration Testing (Kali Linux)', 'SIEM Tools', 'Cryptography'],
        timeline: '4 - 8 Months Security Lab Training'
      }
    ],
    requiredSkills: ['Computer Networking & Protocols', 'Vulnerability Assessment', 'Incident Response & Threat Analysis', 'Linux CLI', 'SIEM & SOC Operations', 'Identity & Access Management'],
    preferredSkills: ['Penetration Testing (Burp Suite, Metasploit)', 'Cloud Security (AWS/Azure)', 'Reverse Engineering', 'Malware Analysis', 'ISO 27001 Compliance'],
    tools: ['Wireshark', 'Kali Linux', 'Burp Suite', 'Splunk', 'Nessus', 'Metasploit', 'Nmap'],
    topCompanies: ['PwC', 'EY', 'KPMG', 'Deloitte', 'Quick Heal', 'Palo Alto Networks', 'CrowdStrike', 'Cisco', 'Banks & Defense Agencies'],
    salaryRange: { min: 550000, max: 1800000, currency: 'INR', formatted: '₹5.5 - ₹18.0 LPA' },
    minimumEducation: 'B.Tech / BCA / B.Sc IT / Industry Certifications',
    eligibility: 'Understanding of network protocols, operating systems, threat vectors, and defensive security measures.'
  },
  {
    id: 'full-stack-developer',
    name: 'Full Stack Web Developer',
    title: 'Full Stack Web Developer',
    shortName: 'Full Stack Developer',
    type: 'JOB',
    category: 'Technology & Software',
    sector: 'Information Technology',
    aliases: ['MERN Stack Developer', 'Web Developer', 'Software Engineer', 'React & Node Developer'],
    description: 'Builds end-to-end web applications managing everything from interactive client-side browser user interfaces to server logic, APIs, and relational databases.',
    overview: 'Develops user-facing frontend components with React/Next.js and Tailwind CSS while implementing server endpoints with Node.js/Express and managing Supabase/PostgreSQL databases.',
    educationRoutes: [
      {
        routeName: 'Route 1: Computer Science / Applications Degree or Coding Bootcamp',
        degrees: ['B.Tech CSE/IT', 'BCA', 'MCA', 'B.Sc Computer Science', 'Any Graduate with portfolio'],
        skills: ['HTML5 / CSS3 / JavaScript', 'React.js', 'Node.js & Express', 'PostgreSQL / MongoDB', 'Git & Deployment'],
        timeline: '3 - 6 Months intensive full-stack project building'
      }
    ],
    requiredSkills: ['JavaScript (ES6+) & TypeScript', 'React.js & State Management', 'Node.js & Express.js', 'Relational Databases (PostgreSQL / MySQL)', 'RESTful API Design', 'HTML5 & Modern CSS / Tailwind'],
    preferredSkills: ['Next.js / Server Components', 'Supabase / Firebase', 'Docker & Cloud Deployment', 'GraphQL', 'Automated Testing (Jest / Cypress)'],
    tools: ['VS Code', 'Git & GitHub', 'Postman', 'Supabase', 'Vercel', 'Tailwind CSS', 'Docker'],
    topCompanies: ['Razorpay', 'CRED', 'Paytm', 'Freshworks', 'Zoho', 'Infosys', 'Global Tech Agencies'],
    salaryRange: { min: 500000, max: 1800000, currency: 'INR', formatted: '₹5.0 - ₹18.0 LPA' },
    minimumEducation: 'B.Tech / BCA / MCA / B.Sc CS or demonstrated web portfolio',
    eligibility: 'Proficiency in modern JavaScript, frontend frameworks, backend server creation, and database modeling.'
  },

  // --------------------------------------------------------------------------
  // 2. DATA, ANALYTICS & PRODUCT MANAGEMENT
  // --------------------------------------------------------------------------
  {
    id: 'data-analyst',
    name: 'Data Analyst & Business Intelligence Specialist',
    title: 'Data Analyst & Business Intelligence Specialist',
    shortName: 'Data Analyst',
    type: 'JOB',
    category: 'Data & Analytics',
    sector: 'Business Intelligence & Data',
    aliases: ['Data Analyst', 'BI Analyst', 'Business Data Analyst', 'Commercial Analytics Specialist'],
    description: 'Collects, cleans, models, and analyzes structured datasets to uncover patterns, generate business insights, and drive executive decision-making through interactive dashboards.',
    overview: 'Bridges business operations with technical analytics. Extracts data using SQL, performs statistical computations in Excel and Python, and creates executive dashboards in Power BI or Tableau.',
    educationRoutes: [
      {
        routeName: 'Route 1: Quantitative / Commerce Degree (B.Com, BBA, Economics, Statistics)',
        degrees: ['B.Com', 'BBA', 'BA Economics', 'B.Sc Statistics'],
        skills: ['Advanced Excel', 'SQL Queries', 'Power BI / Tableau', 'Business Statistics'],
        timeline: '3 - 6 Months analytical prep'
      },
      {
        routeName: 'Route 2: Technical Degree (B.Tech, BCA, B.Sc CS)',
        degrees: ['B.Tech CSE/IT', 'BCA', 'B.Sc Computer Science'],
        skills: ['Python', 'SQL', 'Data Warehousing', 'Data Modeling'],
        timeline: 'Direct Placement / 2 - 4 Months'
      }
    ],
    requiredSkills: ['Advanced MS Excel (Pivot Tables, Power Query)', 'Relational Databases & SQL (Joins, Window Functions)', 'Data Visualization (Power BI or Tableau)', 'Descriptive & Inferential Statistics', 'Data Cleaning & Transformation'],
    preferredSkills: ['Python (Pandas, NumPy, Seaborn)', 'Cloud Data Warehouses (BigQuery, Snowflake)', 'ETL Pipeline Design', 'Business Storytelling'],
    tools: ['Excel', 'Power BI', 'Tableau', 'PostgreSQL', 'Python (Pandas)', 'Jupyter', 'Snowflake'],
    topCompanies: ['Deloitte', 'McKinsey & Company', 'Mu Sigma', 'Fractal Analytics', 'Amazon', 'Accenture', 'HDFC Bank'],
    salaryRange: { min: 450000, max: 1200000, currency: 'INR', formatted: '₹4.5 - ₹12.0 LPA' },
    minimumEducation: 'Bachelor’s degree in Commerce, Economics, Engineering, Math or Computer Applications',
    eligibility: 'Aptitude for numbers, relational databases, business metrics, and graphical presentation.'
  },
  {
    id: 'product-manager',
    name: 'Product Manager (Tech & Growth)',
    title: 'Product Manager (Tech & Growth)',
    shortName: 'Product Manager',
    type: 'JOB',
    category: 'Product & Strategy',
    sector: 'Technology & Enterprise',
    aliases: ['PM', 'Associate Product Manager', 'APM', 'Technical Product Manager', 'Growth Product Manager'],
    description: 'Leads cross-functional engineering, design, and business teams to conceptualize, define, build, and launch customer-centric digital products and features.',
    overview: 'Acts as the intersection of business strategy, UX design, and technology. Defines product roadmaps, conducts user research, writes product requirement documents (PRDs), and tracks product metrics.',
    educationRoutes: [
      {
        routeName: 'Route 1: Engineering / Tech Degree + MBA in Product / General Management',
        degrees: ['B.Tech + MBA', 'B.Tech CSE/IT', 'BBA + Experience in Tech'],
        skills: ['Product Strategy', 'User Experience (UX)', 'Agile / Scrum', 'Data Analysis (SQL)', 'A/B Testing'],
        timeline: 'Campus Placement from top B-Schools or Internal Tech-to-PM Transition'
      }
    ],
    requiredSkills: ['Product Roadmap Planning', 'User Research & Wireframing', 'PRD & Feature Specification Writing', 'Data-Driven Decision Making (SQL, Amplitude)', 'Agile / Scrum Methodologies', 'Stakeholder Management'],
    preferredSkills: ['Technical Architecture Comprehension', 'Growth Experimentation & Funnel Analysis', 'Go-To-Market Strategy', 'Figma Prototyping'],
    tools: ['Jira', 'Figma', 'Amplitude / Mixpanel', 'SQL', 'Notion', 'Google Analytics'],
    topCompanies: ['Google', 'Microsoft', 'Uber', 'Flipkart', 'Swiggy', 'CRED', 'MakeMyTrip', 'Groww'],
    salaryRange: { min: 1400000, max: 3600000, currency: 'INR', formatted: '₹14.0 - ₹36.0 LPA' },
    minimumEducation: 'B.Tech / MBA / Bachelor’s degree with relevant tech product experience',
    eligibility: 'Strong analytical reasoning, communication, customer empathy, and collaborative execution abilities.'
  },
  {
    id: 'quantitative-analyst',
    name: 'Quantitative Analyst (Quant) & Financial Modeler',
    title: 'Quantitative Analyst (Quant) & Financial Modeler',
    shortName: 'Quant Analyst',
    type: 'JOB',
    category: 'Finance & Analytics',
    sector: 'Investment Banking & Capital Markets',
    aliases: ['Quant', 'Quantitative Researcher', 'Algorithmic Trader', 'Risk Modeler', 'Financial Engineer'],
    description: 'Develops complex mathematical models and algorithmic trading strategies for hedge funds, investment banks, asset management firms, and proprietary trading desks.',
    overview: 'Applies stochastic calculus, statistical arbitrage, probability theory, and machine learning to price exotic derivatives, assess portfolio risk, and automate high-frequency market execution.',
    educationRoutes: [
      {
        routeName: 'Route 1: Rigorous Degree in Mathematics, Statistics, Physics or Engineering',
        degrees: ['B.Tech / Dual Degree IIT/BITS', 'M.Sc Mathematics / Statistics', 'M.Tech Computational Finance'],
        skills: ['Stochastic Calculus', 'Python / C++', 'Financial Derivatives Pricing', 'Statistical Arbitrage'],
        timeline: 'Direct quantitative campus hiring or specialized Financial Engineering degree'
      }
    ],
    requiredSkills: ['Advanced Mathematics & Probability Theory', 'Python / C++ Programming', 'Derivatives Pricing (Black-Scholes, Monte Carlo)', 'Time-Series Analysis', 'Statistical Modeling'],
    preferredSkills: ['Algorithmic Trading Systems', 'High-Frequency Trading Infrastructure', 'Deep Learning for Finance', 'KDB+/Q'],
    tools: ['Python (NumPy, SciPy)', 'C++', 'R', 'Bloomberg Terminal', 'MATLAB', 'Git'],
    topCompanies: ['Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan', 'Jane Street', 'WorldQuant', 'Tower Research Capital', 'DE Shaw'],
    salaryRange: { min: 1800000, max: 5000000, currency: 'INR', formatted: '₹18.0 - ₹50.0 LPA' },
    minimumEducation: 'Master’s or Bachelor’s from premier institutes in Mathematics, Physics, Statistics, Computer Science, or Engineering',
    eligibility: 'Exceptional mathematical problem solving, coding efficiency in C++/Python, and analytical rigor.'
  },

  // --------------------------------------------------------------------------
  // 3. FINANCE, ACCOUNTING & BANKING
  // --------------------------------------------------------------------------
  {
    id: 'chartered-accountant',
    name: 'Chartered Accountant (CA) & Statutory Auditor',
    title: 'Chartered Accountant (CA) & Statutory Auditor',
    shortName: 'Chartered Accountant',
    type: 'JOB',
    category: 'Finance & Accounting',
    sector: 'Accounting, Audit & Taxation',
    aliases: ['CA', 'Auditor', 'Tax Consultant', 'Financial Controller', 'Partner Audit Firm'],
    description: 'Manages statutory audit, corporate taxation, forensic accounting, financial controllership, and international financial reporting (Ind AS / IFRS).',
    overview: 'Certified professional authorized under the Chartered Accountants Act to audit financial statements, represent corporate clients before tax authorities, and advise executive boards on capital structuring.',
    educationRoutes: [
      {
        routeName: 'Route 1: ICAI Professional Certification (Foundation -> Inter -> Articleship -> Final)',
        degrees: ['10+2 Pass -> CA Foundation', 'Direct Entry for Commerce Graduates (55%+) or Other Graduates (60%+)'],
        skills: ['Statutory Auditing Standards (SAs)', 'Direct & Indirect Taxes (GST, Income Tax)', 'Ind AS / IFRS', 'Company Law & Corporate Governance'],
        timeline: '3 - 5 Years including mandatory 2-year practical articleship training'
      }
    ],
    requiredSkills: ['Financial Accounting & Reporting (Ind AS / IFRS)', 'Statutory Auditing & Internal Controls', 'Direct & Indirect Taxation (GST / Income Tax)', 'Corporate Law Compliance', 'Financial Statement Analysis'],
    preferredSkills: ['Forensic Audit & Fraud Examination', 'SAP / Oracle ERP Financials', 'Mergers & Acquisitions Valuation', 'Transfer Pricing'],
    tools: ['Tally Prime', 'SAP ERP FICO', 'Advanced Excel', 'Tax Cloud Software', 'Audit Documentation Systems'],
    topCompanies: ['Deloitte', 'PwC', 'EY', 'KPMG', 'BDO', 'Grant Thornton', 'Reliance Industries', 'Tata Sons', 'Major Banks'],
    salaryRange: { min: 800000, max: 2500000, currency: 'INR', formatted: '₹8.0 - ₹25.0 LPA' },
    minimumEducation: 'ICAI Chartered Accountancy (CA) Final Qualification',
    eligibility: 'Membership of the Institute of Chartered Accountants of India (ICAI) following completion of exams and articleship.'
  },
  {
    id: 'investment-banker',
    name: 'Investment Banker (M&A & Corporate Finance)',
    title: 'Investment Banker (M&A & Corporate Finance)',
    shortName: 'Investment Banker',
    type: 'JOB',
    category: 'Finance & Banking',
    sector: 'Investment Banking & Capital Markets',
    aliases: ['Investment Banking Analyst', 'IB Associate', 'M&A Analyst', 'Corporate Finance Associate'],
    description: 'Advises corporate executives, institutional investors, and governments on mergers, acquisitions, initial public offerings (IPOs), and large debt/equity capital raising.',
    overview: 'Builds comprehensive 3-statement financial models, discounted cash flow (DCF) valuations, leveraged buyout (LBO) structures, and creates investor pitchbooks.',
    educationRoutes: [
      {
        routeName: 'Route 1: Top Tier MBA Finance / Chartered Financial Analyst (CFA) / CA Rankers',
        degrees: ['MBA Finance (IIMs/XLRI/ISB)', 'B.Com / B.Tech + CFA', 'Chartered Accountant'],
        skills: ['Financial Modeling & DCF Valuation', 'Pitchbook Creation', 'LBO & M&A Analysis', 'Capital Markets Law'],
        timeline: 'Campus recruitment or financial advisory boutique progression'
      }
    ],
    requiredSkills: ['Advanced Financial Modeling (DCF, Comps, Precedent Transactions)', 'M&A Structuring & Due Diligence', 'Corporate Valuation & LBO Modeling', 'Capital Markets & IPO Processes', 'Executive Presentation & Pitching'],
    preferredSkills: ['CFA Credential', 'Cross-Border M&A Regulations', 'Syndicated Debt Financing', 'Private Equity Deal Sourcing'],
    tools: ['Microsoft Excel (Advanced Macros)', 'Bloomberg Terminal', 'CapIQ (Capital IQ)', 'FactSet', 'PowerPoint'],
    topCompanies: ['Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan', 'Avendus Capital', 'Kotak Investment Banking', 'JM Financial', 'Axis Capital'],
    salaryRange: { min: 1400000, max: 4000000, currency: 'INR', formatted: '₹14.0 - ₹40.0 LPA' },
    minimumEducation: 'MBA Finance / CFA / CA / Top Tier Undergraduate Degree',
    eligibility: 'Exemplary quantitative analysis, financial statement accounting, commercial valuation, and presentation poise.'
  },
  {
    id: 'bank-probationary-officer',
    name: 'Bank Probationary Officer (IBPS PO / SBI PO)',
    title: 'Bank Probationary Officer (IBPS PO / SBI PO)',
    shortName: 'Bank PO',
    type: 'GOVERNMENT_JOB',
    category: 'Banking & Financial Services',
    sector: 'Public Sector Banking',
    aliases: ['Bank PO', 'SBI PO', 'IBPS PO', 'Assistant Manager Bank', 'Public Sector Banker'],
    description: 'Executive managerial cadre in public sector banks managing branch banking, loan underwriting, commercial credit sanctioning, foreign exchange, and retail operations.',
    overview: 'Entry-level managerial appointment leading to senior executive leadership (Scale I to Scale VII General Manager / Executive Director) within nationalized and commercial banks.',
    educationRoutes: [
      {
        routeName: 'Route 1: Any Graduation + IBPS PO / SBI PO Competitive Examination',
        degrees: ['Any Bachelor’s Degree (B.Com, B.Tech, B.Sc, BA, BBA)'],
        skills: ['Banking & Financial Awareness', 'Quantitative Aptitude', 'Reasoning & Logic', 'English Comprehension', 'Credit Assessment'],
        timeline: '6 - 12 Months competitive examination preparation'
      }
    ],
    requiredSkills: ['Retail & Commercial Banking Operations', 'Credit Analysis & Loan Appraisal', 'Financial Regulations & KYC/AML Guidelines', 'Customer Relationship Management', 'Risk Assessment & NPA Management'],
    preferredSkills: ['JAIIB & CAIIB Certifications', 'Treasury Operations', 'Trade Finance', 'Foreign Exchange (Forex)'],
    tools: ['Finacle Core Banking Solution (CBS)', 'Bancs24', 'Credit Appraisal Software', 'RBI Portals'],
    topCompanies: ['State Bank of India (SBI)', 'Punjab National Bank (PNB)', 'Bank of Baroda (BoB)', 'Canara Bank', 'Union Bank of India'],
    salaryRange: { min: 700000, max: 1200000, currency: 'INR', formatted: '₹7.0 - ₹12.0 LPA (Scale I + Perks & Quarters)' },
    minimumEducation: 'Graduation in any stream from a recognized university',
    eligibility: 'Indian citizen, age 20-30 years, cleared IBPS PO or SBI PO multi-tier examination and personal interview.'
  },
  {
    id: 'rbi-grade-b-officer',
    name: 'RBI Grade B Officer (Central Banking & Policy)',
    title: 'RBI Grade B Officer (Central Banking & Policy)',
    shortName: 'RBI Grade B Officer',
    type: 'GOVERNMENT_JOB',
    category: 'Banking & Financial Services',
    sector: 'Central Banking & Financial Regulation',
    aliases: ['RBI Officer', 'Reserve Bank Grade B', 'Central Bank Manager', 'Monetary Policy Analyst'],
    description: 'Direct-entry Class A regulatory officer at India’s central bank, shaping monetary policy, banking regulation, foreign exchange reserves management, and financial sector stability.',
    overview: 'Prestigious career leading to Chief General Manager, Executive Director, and Deputy Governor appointments at the Reserve Bank of India.',
    educationRoutes: [
      {
        routeName: 'Route 1: Graduation with min 60% + Clear RBI Grade B Examination',
        degrees: ['Graduation in Any Stream (Economics, Commerce, Engineering, Finance prioritized)'],
        skills: ['Macroeconomics & Monetary Policy', 'Financial Markets', 'Management Principles', 'Descriptive English Writing'],
        timeline: '9 - 15 Months dedicated preparation'
      }
    ],
    requiredSkills: ['Macroeconomic Analysis & Monetary Economics', 'Banking Regulation & Basel Accords', 'Financial Markets Operations', 'Policy Formulation & Economic Writing', 'Quantitative Research'],
    preferredSkills: ['Master’s in Economics / Finance', 'CFA / FRM Certification', 'Data Science for Macro Research'],
    tools: ['Econometric Software (Stata, R)', 'Bloomberg Terminal', 'Reserve Bank CBS & NEFT/RTGS Core Systems'],
    topCompanies: ['Reserve Bank of India (RBI)', 'International Monetary Fund (IMF / Deputation)', 'Bank for International Settlements (BIS)'],
    salaryRange: { min: 1400000, max: 2200000, currency: 'INR', formatted: '₹14.0 - ₹22.0 LPA (Class A Officer + Central Housing & Allowances)' },
    minimumEducation: 'Graduation with min 60% marks (50% for SC/ST) or Post-Graduation with min 55%',
    eligibility: 'Age 21-30 years, Indian national, successful qualification in RBI Services Board Phase-I, Phase-II descriptive papers, and interview.'
  },

  // --------------------------------------------------------------------------
  // 4. HEALTHCARE, MEDICINE & CLINICAL SCIENCES
  // --------------------------------------------------------------------------
  {
    id: 'physician-resident-medical-officer',
    name: 'Physician / Resident Medical Officer (MBBS / MD)',
    title: 'Physician / Resident Medical Officer (MBBS / MD)',
    shortName: 'Physician / Doctor',
    type: 'JOB',
    category: 'Healthcare & Clinical Sciences',
    sector: 'Healthcare & Hospital Medicine',
    aliases: ['Doctor', 'Medical Officer', 'MBBS Doctor', 'General Physician', 'Resident Doctor', 'Clinical Specialist'],
    description: 'Diagnoses clinical ailments, prescribes therapies, manages acute and chronic medical conditions, performs clinical examinations, and oversees emergency patient care.',
    overview: 'Licensed medical practitioner registered with the National Medical Commission (NMC). Works in tertiary hospitals, community health centers, multi-specialty clinics, or pursues specialist MD/MS residency.',
    educationRoutes: [
      {
        routeName: 'Route 1: 10+2 PCB -> NEET-UG -> MBBS Degree (4.5 yrs + 1 yr Internship)',
        degrees: ['Bachelor of Medicine and Bachelor of Surgery (MBBS)', 'MD General Medicine', 'MS General Surgery'],
        skills: ['Clinical Diagnosis', 'Pharmacology & Therapeutics', 'Emergency Resuscitation (ACLS/BLS)', 'Patient Care & Ethics'],
        timeline: '5.5 Years standard graduation route followed by mandatory rotating internship'
      }
    ],
    requiredSkills: ['Clinical Patient Examination', 'Medical Diagnosis & Differential Diagnostics', 'Emergency Medicine & Trauma Care', 'Pharmacology & Prescription Management', 'Infection Control & Bio-safety', 'Doctor-Patient Communication'],
    preferredSkills: ['Postgraduate Specialization (MD/MS/DNB)', 'Advanced Cardiac Life Support (ACLS)', 'Ultrasound / Diagnostic Imaging Interpretation', 'Clinical Research Protocols'],
    tools: ['Stethoscope', 'Diagnostic Monitoring Systems', 'Electronic Health Records (EHR)', 'Hospital Information Systems (HIS)', 'ICU Ventilators'],
    topCompanies: ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Manipal Hospitals', 'AIIMS', 'Government Medical Colleges & Hospitals'],
    salaryRange: { min: 800000, max: 2400000, currency: 'INR', formatted: '₹8.0 - ₹24.0 LPA (Scales rapidly with MD/MS specialization)' },
    minimumEducation: 'MBBS Degree recognized by NMC + State Medical Council Registration',
    eligibility: 'Cleared NEET-UG, completed 4.5-year MBBS course, 12-month rotating internship, and holds permanent NMC registration.'
  },
  {
    id: 'clinical-pharmacist',
    name: 'Clinical Pharmacist & Drug Safety Specialist',
    title: 'Clinical Pharmacist & Drug Safety Specialist',
    shortName: 'Clinical Pharmacist',
    type: 'JOB',
    category: 'Healthcare & Pharmaceuticals',
    sector: 'Pharmaceuticals & Clinical Healthcare',
    aliases: ['Pharmacist', 'Drug Safety Associate', 'Pharmacovigilance Specialist', 'Hospital Pharmacist', 'Formulation Scientist'],
    description: 'Dispenses prescription medications, evaluates drug interactions, monitors adverse drug reactions (ADRs), conducts clinical trials, and ensures pharmaceutical quality standards.',
    overview: 'Licensed healthcare professional operating at the intersection of chemistry, medicine, and human physiology. Works in hospitals, pharmaceutical research corporations, and clinical trial research organizations.',
    educationRoutes: [
      {
        routeName: 'Route 1: 10+2 Science (PCM/PCB) -> Bachelor of Pharmacy (B.Pharm / Pharm.D)',
        degrees: ['Bachelor of Pharmacy (B.Pharm - 4 Years)', 'Doctor of Pharmacy (Pharm.D - 6 Years)', 'M.Pharm'],
        skills: ['Pharmacology & Toxicology', 'Drug Dispensing & Quality Control', 'Pharmacovigilance (MedDRA, Argus)', 'Regulatory Affairs (US FDA / CDSCO)'],
        timeline: '4 - 6 Years professional pharmacy education'
      }
    ],
    requiredSkills: ['Pharmacology & Therapeutics', 'Pharmacovigilance & Adverse Drug Reaction Reporting', 'Prescription Verification & Dispensing', 'Good Manufacturing Practices (GMP)', 'Clinical Trial Protocol Compliance'],
    preferredSkills: ['Argus Safety Database', 'Medical Coding (MedDRA, WHO-DD)', 'Regulatory Submissions (DMF, CTD)', 'Formulation Development'],
    tools: ['Argus Safety Database', 'Pharmacy Management Software', 'Spectrophotometer', 'HPLC Systems', 'Drug Interaction Databases (Lexicomp)'],
    topCompanies: ['Sun Pharma', 'Dr. Reddy’s Laboratories', 'Cipla', 'Novartis', 'Pfizer', 'IQVIA', 'Apollo Pharmacy', 'Max Healthcare'],
    salaryRange: { min: 400000, max: 1100000, currency: 'INR', formatted: '₹4.0 - ₹11.0 LPA' },
    minimumEducation: 'B.Pharm / Pharm.D / M.Pharm + State Pharmacy Council Registration',
    eligibility: 'Recognized pharmacy degree and active license from the Pharmacy Council of India (PCI).'
  },
  {
    id: 'registered-nurse-specialist',
    name: 'Registered Nurse (Critical Care & Hospital Operations)',
    title: 'Registered Nurse (Critical Care & Hospital Operations)',
    shortName: 'Registered Nurse',
    type: 'JOB',
    category: 'Healthcare & Clinical Sciences',
    sector: 'Hospital & Patient Care Services',
    aliases: ['Staff Nurse', 'Nursing Officer', 'ICU Nurse', 'Operation Theatre Nurse', 'Clinical Nurse Specialist'],
    description: 'Administers continuous patient care, monitors vital signs, executes medical treatments, operates life-support systems in ICUs, and assists surgeons in operating theatres.',
    overview: 'Essential pillar of healthcare delivery with high global demand (India, UK NHS, US NCLEX, Gulf countries). Career paths include Nursing Supervisor, Infection Control Officer, and Hospital Administrator.',
    educationRoutes: [
      {
        routeName: 'Route 1: 10+2 PCB -> B.Sc Nursing (4-Year Degree) or GNM Diploma',
        degrees: ['B.Sc Nursing (4 Years)', 'General Nursing and Midwifery (GNM - 3 Years)', 'M.Sc Nursing'],
        skills: ['Patient Monitoring & Assessment', 'Medication Administration & IV Therapy', 'ICU Life Support Management', 'Infection Control Protocols'],
        timeline: '4 Years accredited university clinical education'
      }
    ],
    requiredSkills: ['Patient Vital Signs & Triage Monitoring', 'IV Cannulation & Medication Infusion', 'Emergency Resuscitation (BLS / ACLS)', 'Infection Control & Sterilization', 'Critical Care & Ventilator Support', 'Documentation & Shift Handover'],
    preferredSkills: ['Operating Theatre Assisting', 'Neonatal Intensive Care (NICU)', 'Chemotherapy Administration', 'IELTS / OET for International Nursing'],
    tools: ['Patient Monitors', 'Infusion Pumps', 'Defibrillators', 'Ventilators', 'Electronic Medical Records (EMR)'],
    topCompanies: ['Apollo Hospitals', 'Medanta The Medicity', 'Max Healthcare', 'Fortis Healthcare', 'AIIMS Nursing Cadre', 'UK NHS / Global Healthcare'],
    salaryRange: { min: 380000, max: 950000, currency: 'INR', formatted: '₹3.8 - ₹9.5 LPA (₹25 - ₹45 LPA for overseas nursing in UK/US/Gulf)' },
    minimumEducation: 'B.Sc Nursing / GNM + State Nursing Council Registration',
    eligibility: 'Pass in B.Sc Nursing from an INC-approved college, registered as Nurse and Midwife (RN/RM).'
  },

  // --------------------------------------------------------------------------
  // 5. CORE ENGINEERING & DEEP TECH
  // --------------------------------------------------------------------------
  {
    id: 'mechanical-design-engineer',
    name: 'Mechanical Design & Robotics Engineer',
    title: 'Mechanical Design & Robotics Engineer',
    shortName: 'Mechanical Engineer',
    type: 'JOB',
    category: 'Core Engineering',
    sector: 'Automotive, Aerospace & Manufacturing',
    aliases: ['Mechanical Engineer', 'CAD Design Engineer', 'R&D Engineer', 'Automotive Engineer', 'Product Design Engineer Mechanical'],
    description: 'Develops 3D CAD mechanical components, analyzes thermal/structural stresses using FEA/CFD, and designs automated robotic systems for manufacturing and aerospace.',
    overview: 'Translates functional engineering specifications into manufacturable machine designs, optimizing material selection, aerodynamics, structural rigidity, and production costs.',
    educationRoutes: [
      {
        routeName: 'Route 1: 10+2 PCM -> B.Tech Mechanical Engineering / Mechatronics',
        degrees: ['B.Tech Mechanical Engineering', 'B.Tech Mechatronics & Robotics', 'M.Tech Machine Design'],
        skills: ['SolidWorks / CATIA 3D Modeling', 'Finite Element Analysis (ANSYS FEA)', 'Thermodynamics & Fluid Dynamics', 'GD&T (Geometric Dimensioning & Tolerancing)'],
        timeline: '4-Year Engineering Degree + CAD/FEA project portfolio'
      }
    ],
    requiredSkills: ['3D CAD Modeling (SolidWorks / CATIA / Creo)', 'Finite Element Analysis (FEA / ANSYS)', 'Geometric Dimensioning & Tolerancing (GD&T)', 'Manufacturing Processes & Materials Science', 'Kinematics & Machine Design'],
    preferredSkills: ['Computational Fluid Dynamics (CFD)', 'Robotics & PLC Automation', 'Automotive Powertrain / EV Battery Pack Design', 'DFM / DFA (Design for Manufacturing)'],
    tools: ['SolidWorks', 'CATIA', 'ANSYS', 'AutoCAD', 'MATLAB / Simulink', 'Creo Parametric'],
    topCompanies: ['Tata Motors', 'Mahindra & Mahindra', 'Larsen & Toubro (L&T)', 'ISRO', 'DRDO', 'Boeing India', 'Bosch', 'Siemens'],
    salaryRange: { min: 450000, max: 1400000, currency: 'INR', formatted: '₹4.5 - ₹14.0 LPA' },
    minimumEducation: 'B.Tech / B.E. in Mechanical / Automobile / Production / Aerospace Engineering',
    eligibility: 'Engineering graduation with strong fundamentals in mechanics, materials, CAD modeling, and FEA simulation.'
  },
  {
    id: 'civil-structural-engineer',
    name: 'Civil & Structural Infrastructure Engineer',
    title: 'Civil & Structural Infrastructure Engineer',
    shortName: 'Civil Engineer',
    type: 'JOB',
    category: 'Core Engineering',
    sector: 'Construction & Civil Infrastructure',
    aliases: ['Civil Engineer', 'Structural Engineer', 'Site Engineer', 'Project Engineer Infrastructure', 'Bridge & Highway Engineer'],
    description: 'Plans, analyzes, designs, and supervises construction of high-rise structures, bridges, expressways, metro rail networks, and smart city infrastructure.',
    overview: 'Ensures structural stability, seismic earthquake resistance, geotechnical foundation safety, and regulatory municipal compliance for modern infrastructure developments.',
    educationRoutes: [
      {
        routeName: 'Route 1: 10+2 PCM -> B.Tech Civil Engineering / Structural M.Tech',
        degrees: ['B.Tech Civil Engineering', 'M.Tech Structural Engineering', 'Polytechnic Diploma in Civil'],
        skills: ['Structural Analysis (STAAD.Pro / ETABS)', 'AutoCAD & Revit BIM', 'RCC & Steel Structural Design', 'Project Estimation & Site Execution'],
        timeline: '4 Years Graduation + On-Site Project Experience'
      }
    ],
    requiredSkills: ['Structural Analysis & Design (STAAD.Pro / ETABS)', 'Building Information Modeling (Revit BIM / AutoCAD)', 'Reinforced Concrete (RCC) & Structural Steel Design (IS 456, IS 800)', 'Quantity Surveying & Estimation', 'Quality Assurance & Concrete Technology'],
    preferredSkills: ['Seismic Analysis & Foundation Engineering', 'Green Building (LEED / GRIHA) Standards', 'Primavera / MS Project Management'],
    tools: ['STAAD.Pro', 'ETABS', 'AutoCAD', 'Revit', 'MS Project', 'Total Station Surveying'],
    topCompanies: ['Larsen & Toubro (L&T Construction)', 'Tata Projects', 'Shapoorji Pallonji', 'Afcons Infrastructure', 'NHAI', 'DMRC', 'CPWD'],
    salaryRange: { min: 420000, max: 1300000, currency: 'INR', formatted: '₹4.2 - ₹13.0 LPA' },
    minimumEducation: 'B.Tech / B.E. / M.Tech in Civil / Structural Engineering',
    eligibility: 'Degree in Civil Engineering with proficiency in structural design codes, drafting, and project site supervision.'
  },

  // --------------------------------------------------------------------------
  // 6. LAW & LEGAL ADVISORY
  // --------------------------------------------------------------------------
  {
    id: 'corporate-legal-counsel',
    name: 'Corporate Legal Counsel & M&A Lawyer',
    title: 'Corporate Legal Counsel & M&A Lawyer',
    shortName: 'Corporate Lawyer',
    type: 'JOB',
    category: 'Law & Legal Advisory',
    sector: 'Corporate Law & Commercial Advisory',
    aliases: ['Corporate Counsel', 'Legal Associate', 'In-House Counsel', 'M&A Lawyer', 'Commercial Legal Manager'],
    description: 'Drafts and negotiates high-value commercial agreements, advises on mergers & acquisitions, ensures regulatory compliance, and manages corporate governance.',
    overview: 'Specializes in company law, cross-border investments, intellectual property licensing, antitrust regulations, and legal risk mitigation for corporate enterprises and law firms.',
    educationRoutes: [
      {
        routeName: 'Route 1: 10+2 -> CLAT -> 5-Year Integrated Law (BA LLB / BBA LLB / B.Com LLB)',
        degrees: ['BA LLB (Hons)', 'BBA LLB (Hons)', 'LLM Corporate Law', '3-Year LLB (After Graduation)'],
        skills: ['Contract Drafting & Negotiation', 'Companies Act 2013 & SEBI Regulations', 'M&A Due Diligence', 'Intellectual Property Rights (IPR)'],
        timeline: '5-Year Integrated Course or 3-Year Post-Grad LLB + Bar Council Enrollment'
      }
    ],
    requiredSkills: ['Commercial Contract Drafting & Review', 'Companies Act 2013 & Corporate Governance', 'M&A Due Diligence & Term Sheets', 'SEBI & Competition Commission Regulations', 'Dispute Resolution & Arbitration Strategy'],
    preferredSkills: ['Data Privacy Laws (GDPR / DPDP Act)', 'Intellectual Property Licensing', 'Cross-Border Tax Treaties', 'Foreign Exchange Management Act (FEMA)'],
    tools: ['SCC Online', 'Manupatra', 'Contract Lifecycle Management (CLM)', 'LexisNexis'],
    topCompanies: ['Shardul Amarchand Mangaldas', 'Cyril Amarchand Mangaldas', 'AZB & Partners', 'Trilegal', 'Khaitan & Co', 'Google India', 'Reliance Industries', 'Tata Sons'],
    salaryRange: { min: 800000, max: 2800000, currency: 'INR', formatted: '₹8.0 - ₹28.0 LPA (Up to ₹35+ LPA at tier-1 law firms)' },
    minimumEducation: 'LLB Degree recognized by the Bar Council of India (BCI)',
    eligibility: 'Graduation in Law (5-Year or 3-Year LLB), enrolled with State Bar Council, and cleared All India Bar Examination (AIBE).'
  },

  // --------------------------------------------------------------------------
  // 7. CIVIL SERVICES, GOVERNANCE & DEFENCE
  // --------------------------------------------------------------------------
  {
    id: 'ias-officer',
    name: 'IAS Officer (Indian Administrative Service - District Magistrate & Secretary)',
    title: 'IAS Officer (Indian Administrative Service)',
    shortName: 'IAS Officer',
    type: 'GOVERNMENT_JOB',
    category: 'Civil Services & Government',
    sector: 'Public Administration & Governance',
    aliases: ['IAS', 'District Magistrate', 'Collector', 'Sub-Divisional Magistrate (SDM)', 'Cabinet Secretary', 'Civil Servant'],
    description: 'Constitutional administrative officer leading public governance, district management, law and order coordination, policy implementation, and development administration.',
    overview: 'The apex civil service of the Republic of India. IAS officers head districts as District Magistrates/Collectors and advance to senior executive policymaking as Union Secretaries and Cabinet Secretary of India.',
    educationRoutes: [
      {
        routeName: 'Route 1: Any Graduation -> UPSC Civil Services Examination (CSE)',
        degrees: ['Bachelor’s Degree in Any Discipline (B.A, B.Com, B.Tech, MBBS, B.Sc, BBA, Law)'],
        skills: ['General Studies (Polity, Economy, History, Geography, Ethics)', 'Public Policy & Administration', 'Decision Making & Leadership', 'Analytical Essay Writing'],
        timeline: '1 - 3 Years dedicated multi-stage competitive examination preparation'
      }
    ],
    requiredSkills: ['Public Policy Formulation & Execution', 'District Crisis & Law/Order Administration', 'Government Finance & Budgetary Management', 'Inter-Departmental Coordination', 'Constitutional Law & Statutory Governance'],
    preferredSkills: ['Public Grievance Redressal', 'E-Governance & Digital Administration Initiatives', 'International Relations & Diplomacy'],
    tools: ['Government Official Portals', 'PFMS (Public Financial Management System)', 'E-Office Systems', 'NIC Portals'],
    topCompanies: ['Government of India', 'Respective State Government Cadres', 'United Nations & World Bank (on deputation)'],
    salaryRange: { min: 1100000, max: 2800000, currency: 'INR', formatted: '₹11.0 - ₹28.0 LPA (Level 10 Pay Matrix starting at ₹56,100 basic + DA, Official Bungalow, Vehicle & Security)' },
    minimumEducation: 'Bachelor’s degree in any discipline from a recognized university',
    eligibility: 'Indian citizen, age 21-32 years, cleared UPSC CSE Prelims, Mains, and Personality Interview within top rank merit list.'
  },
  {
    id: 'ips-officer',
    name: 'IPS Officer (Indian Police Service - Superintendent of Police)',
    title: 'IPS Officer (Indian Police Service)',
    shortName: 'IPS Officer',
    type: 'GOVERNMENT_JOB',
    category: 'Civil Services & Government',
    sector: 'Law Enforcement & National Security',
    aliases: ['IPS', 'Superintendent of Police (SP)', 'DCP', 'DIG', 'IGP', 'DGP', 'Police Commissioner'],
    description: 'Senior police leadership commanding district law and order, counter-terrorism, criminal investigation, intelligence gathering, and cyber crime enforcement.',
    overview: 'Heads police forces across districts, cities, states, and central security organizations including the Intelligence Bureau (IB), CBI, RAW, and Central Armed Police Forces.',
    educationRoutes: [
      {
        routeName: 'Route 1: Any Graduation -> UPSC Civil Services Examination (IPS Cadre)',
        degrees: ['Graduation in Any Discipline'],
        skills: ['Criminal Law (IPC/BNS, CrPC/BNSS, Evidence Act)', 'Police Leadership & Tactical Operations', 'Physical Fitness & Endurance', 'Investigation Methodology'],
        timeline: 'Preparation + 2-Year rigorous training at Sardar Vallabhbhai Patel National Police Academy (SVPNPA)'
      }
    ],
    requiredSkills: ['Criminal Investigation & Forensic Science', 'Law & Order Command & Crowd Control', 'Cybercrime & Digital Forensics', 'Surveillance & Intelligence Gathering', 'Physical Combat & Firearms Proficiency'],
    preferredSkills: ['Counter-Terrorism Tactics', 'VIP Security & Strategic Operations', 'Community Policing Models'],
    tools: ['CCTNS (Crime and Criminal Tracking Network & Systems)', 'Digital Forensics Tools', 'Police Radio & Tactical Communication'],
    topCompanies: ['State Police Departments', 'Central Bureau of Investigation (CBI)', 'Intelligence Bureau (IB)', 'National Investigation Agency (NIA)'],
    salaryRange: { min: 1100000, max: 2800000, currency: 'INR', formatted: '₹11.0 - ₹28.0 LPA (Level 10 Pay Matrix + Official Security & Allowances)' },
    minimumEducation: 'Bachelor’s degree from a recognized university + Medical fitness standards',
    eligibility: 'Indian citizen, cleared UPSC CSE, meets mandatory physical standards (height, chest, vision).'
  },
  {
    id: 'defence-commissioned-officer',
    name: 'Defence Commissioned Officer (Indian Army / Navy / Air Force)',
    title: 'Defence Commissioned Officer (Indian Armed Forces)',
    shortName: 'Defence Officer',
    type: 'GOVERNMENT_JOB',
    category: 'Defence & Armed Forces',
    sector: 'National Defence & Military Command',
    aliases: ['Army Lieutenant', 'Navy Sub-Lieutenant', 'Air Force Flying Officer', 'Military Officer', 'SSB Officer'],
    description: 'Commands military platoons, warships, fighter aircraft squadrons, or combat engineering units defending the sovereignty and territorial integrity of the nation.',
    overview: 'High-prestige military leadership position entered via NDA (after 12th) or CDS / AFCAT / Technical Graduate Course (after Graduation), followed by training at IMA, INA, AFA, or OTA.',
    educationRoutes: [
      {
        routeName: 'Route 1: 10+2 -> UPSC NDA Examination -> National Defence Academy Khadakwasla',
        degrees: ['10+2 (Any stream for Army; PCM for Navy/Air Force) -> B.Sc/B.Tech at NDA'],
        skills: ['Officer Like Qualities (OLQ)', 'Physical Fitness & Obstacle Courses', 'Tactical Military Command', 'Weaponry & Navigation'],
        timeline: '3 Years NDA + 1 Year IMA/INA/AFA Finishing Academy'
      },
      {
        routeName: 'Route 2: Graduation / B.Tech -> UPSC CDS / AFCAT / TGC -> SSB Interview',
        degrees: ['Any Graduation (Army) / B.Tech (Navy, Technical Air Force, Engineers)'],
        skills: ['SSB Psychological & GTO Testing', 'Analytical Reasoning', 'Leadership Under Stress'],
        timeline: '1 Year Academy Training (IMA Dehradun / OTA Chennai / AFA Dundigal)'
      }
    ],
    requiredSkills: ['Strategic Military Tactics & Combat Leadership', 'Officer Like Qualities (OLQs)', 'Crisis Decision Making & Risk Management', 'Physical Endurance & Tactical Navigation', 'Weapon Systems & Modern Warfare Equipment'],
    preferredSkills: ['Aviation & Aerodynamics (Flying Branch)', 'Maritime Navigation & Sonar (Naval Branch)', 'Combat Engineering & Cyber Warfare'],
    tools: ['Military Tactical Hardware', 'Radar & Satellite Communication Systems', 'Naval Command Consoles', 'Aviation Avionics'],
    topCompanies: ['Indian Army', 'Indian Navy', 'Indian Air Force', 'Strategic Forces Command', 'UN Peacekeeping Forces'],
    salaryRange: { min: 1000000, max: 2600000, currency: 'INR', formatted: '₹10.0 - ₹26.0 LPA (Starting basic ₹56,100 + Military Service Pay ₹15,500 + Flying/High-Altitude Allowances + Free Messing/Quarters)' },
    minimumEducation: '10+2 for NDA; Graduation / B.Tech for CDS, AFCAT & Technical Entries',
    eligibility: 'Passed written exam (NDA/CDS/AFCAT), recommended by Services Selection Board (SSB), and medically cleared by military medical board.'
  },
  {
    id: 'ssc-cgl-auditor-inspector',
    name: 'Central Government Inspector & Auditor (SSC CGL)',
    title: 'Central Government Inspector & Auditor (SSC CGL)',
    shortName: 'SSC CGL Inspector',
    type: 'GOVERNMENT_JOB',
    category: 'Civil Services & Government',
    sector: 'Central Government Ministries & Attached Offices',
    aliases: ['Income Tax Inspector', 'Central Excise Inspector', 'GST Inspector', 'CAG Auditor', 'Enforcement Officer (ED)', 'ASO in CSS / MEA'],
    description: 'Conducts tax assessments, anti-smuggling raids, commercial audits, and policy execution in central ministries like Finance, External Affairs, and CAG.',
    overview: 'Recruited through the Staff Selection Commission Combined Graduate Level (SSC CGL) exam for Group B Gazetted/Non-Gazetted and Group C postings across India.',
    educationRoutes: [
      {
        routeName: 'Route 1: Any Graduation -> Clear SSC CGL Tier-I & Tier-II Examination',
        degrees: ['Bachelor’s degree in any discipline (B.Com, B.Sc, B.Tech, BA, BBA)'],
        skills: ['Quantitative Aptitude & Mathematics', 'Logical Reasoning', 'General Awareness', 'English Comprehension & Drafting'],
        timeline: '6 - 12 Months structured competitive preparation'
      }
    ],
    requiredSkills: ['Tax Laws & Statutory Auditing Standards', 'Verification of Accounts & Fraud Detection', 'Government Rules & Regulations (GFR / FRSR)', 'Official Secretarial Correspondence', 'Data Compilation & Office Automation'],
    preferredSkills: ['Computer Proficiency & Advanced Excel', 'Intelligence Gathering & Raid Operations'],
    tools: ['Income Tax Portal (ITBA)', 'GSTN Portal', 'CAG Audit Automation Software', 'E-Office'],
    topCompanies: ['Central Board of Direct Taxes (CBDT)', 'Central Board of Indirect Taxes & Customs (CBIC)', 'Comptroller & Auditor General (CAG)', 'Ministry of External Affairs (MEA)', 'Enforcement Directorate (ED)'],
    salaryRange: { min: 650000, max: 1100000, currency: 'INR', formatted: '₹6.5 - ₹11.0 LPA (Pay Level 7 / Level 8 + Central HRA & DA)' },
    minimumEducation: 'Bachelor’s degree in any discipline from a recognized university',
    eligibility: 'Age 18-30 years (varies by post), Indian national, cleared SSC CGL Tier-I & Tier-II merit rankings.'
  },

  // --------------------------------------------------------------------------
  // 8. DESIGN, ARCHITECTURE & CREATIVE MEDIA
  // --------------------------------------------------------------------------
  {
    id: 'ui-ux-product-designer',
    name: 'UI/UX Product Designer',
    title: 'UI/UX Product Designer',
    shortName: 'UI/UX Designer',
    type: 'JOB',
    category: 'Design & Creative Media',
    sector: 'Digital Products & Technology',
    aliases: ['Product Designer', 'UX Designer', 'UI Designer', 'User Experience Researcher', 'Interaction Designer'],
    description: 'Designs intuitive digital interfaces, user flows, interactive prototypes, and scalable design systems for web and mobile software applications.',
    overview: 'Combines psychological user research, visual aesthetics, typography, accessibility standards (WCAG), and interaction design to create engaging digital user experiences.',
    educationRoutes: [
      {
        routeName: 'Route 1: Degree in Design (B.Des / M.Des / NIFT / IIT IDC) or Portfolio Switch',
        degrees: ['Bachelor of Design (B.Des)', 'B.Arch', 'B.Tech CS / BCA', 'Any Graduate with UI/UX portfolio'],
        skills: ['Figma Mastery', 'Wireframing & Prototyping', 'User Research & Personas', 'Design Systems (Tokens, Auto-layout)', 'Usability Testing'],
        timeline: '4 - 6 Months intensive portfolio building'
      }
    ],
    requiredSkills: ['Figma & Interactive Prototyping', 'User Research & Usability Testing', 'Information Architecture & User Journey Mapping', 'Design Systems & Component Libraries', 'Visual Design, Color Theory & Typography', 'Accessibility (WCAG) Compliance'],
    preferredSkills: ['Basic HTML/CSS/Tailwind Understanding', 'Motion Design & Micro-interactions (Lottie, Principle)', 'UX Copywriting', 'A/B Test Design Analysis'],
    tools: ['Figma', 'FigJam', 'Miro', 'Adobe Creative Cloud', 'Lottie', 'Notion', 'Hotjar'],
    topCompanies: ['CRED', 'Swiggy', 'Zomato', 'Microsoft', 'Google', 'Urban Company', 'Design Studios & Tech Startups'],
    salaryRange: { min: 600000, max: 2200000, currency: 'INR', formatted: '₹6.0 - ₹22.0 LPA' },
    minimumEducation: 'Bachelor’s degree in Design / Architecture / CS or strong Behance / Dribbble portfolio',
    eligibility: 'Demonstrated design portfolio with at least 2-3 end-to-end case studies showing user research, wireframes, and high-fidelity prototypes.'
  },
  {
    id: 'architectural-designer',
    name: 'Architectural Designer & Urban Planner',
    title: 'Architectural Designer & Urban Planner',
    shortName: 'Architect',
    type: 'JOB',
    category: 'Design & Architecture',
    sector: 'Architecture & Built Environment',
    aliases: ['Architect', 'Landscape Architect', 'Urban Planner', 'Project Architect', 'BIM Architect'],
    description: 'Creates architectural concepts, master plans, 3D structural visualizations, and sustainable construction blueprints for residential, commercial, and civic spaces.',
    overview: 'Regulated professional registered with the Council of Architecture (COA). Balances aesthetic beauty, structural viability, environmental sustainability, and municipal building bye-laws.',
    educationRoutes: [
      {
        routeName: 'Route 1: 10+2 PCM -> NATA / JEE Main Paper 2 -> 5-Year Bachelor of Architecture (B.Arch)',
        degrees: ['Bachelor of Architecture (B.Arch - 5 Years)', 'Master of Architecture (M.Arch)', 'Master of Urban Planning'],
        skills: ['Architectural Drawing & Detailing', 'AutoCAD & Revit BIM', '3D Visualization (Lumion, Rhino, V-Ray)', 'Sustainable Building Codes (NBC, ECBC)'],
        timeline: '5 Years COA-accredited university degree'
      }
    ],
    requiredSkills: ['Architectural Drafting (AutoCAD / Revit)', '3D Modeling & Rendering (SketchUp / Rhino / Lumion)', 'Building Bye-laws & National Building Code (NBC)', 'Sustainable & Green Architecture', 'Construction Working Drawings'],
    preferredSkills: ['BIM Coordination (Revit Architecture)', 'Parametric Design (Grasshopper)', 'Landscape Design', 'Heritage Conservation'],
    tools: ['AutoCAD', 'Autodesk Revit', 'SketchUp', 'Lumion', 'Rhino & Grasshopper', 'Adobe Photoshop'],
    topCompanies: ['Morphogenesis', 'Hafeez Contractor Architects', 'CP Kukreja Architects', 'L&T Infrastructure', 'HOK', 'Gensler', 'Municipal Corporations'],
    salaryRange: { min: 450000, max: 1500000, currency: 'INR', formatted: '₹4.5 - ₹15.0 LPA' },
    minimumEducation: 'B.Arch degree recognized by Council of Architecture (COA)',
    eligibility: 'Cleared NATA or JEE Main Paper-2, passed 5-year B.Arch course, and holds valid COA registration.'
  },

  // --------------------------------------------------------------------------
  // 9. PURE SCIENCES, ACADEMICS & RESEARCH
  // --------------------------------------------------------------------------
  {
    id: 'university-professor-lecturer',
    name: 'University Assistant Professor / Lecturer (UGC NET)',
    title: 'University Assistant Professor / Lecturer (UGC NET)',
    shortName: 'Assistant Professor',
    type: 'JOB',
    category: 'Education, Academics & Research',
    sector: 'Higher Education & Academic Research',
    aliases: ['Assistant Professor', 'College Lecturer', 'University Faculty', 'Academic Researcher', 'Associate Professor'],
    description: 'Teaches undergraduate and postgraduate degree courses, conducts scholarly peer-reviewed academic research, and mentors students in colleges and universities.',
    overview: 'Prestigious academic career in central, state, or private universities governed by UGC guidelines. Progression follows Assistant Professor -> Associate Professor -> Professor -> Dean / Vice-Chancellor.',
    educationRoutes: [
      {
        routeName: 'Route 1: Master’s Degree (55%+) -> UGC-NET / CSIR-NET Qualification -> Ph.D',
        degrees: ['Master’s Degree (M.A, M.Sc, M.Com, M.Tech, MBA, LLM) + Ph.D'],
        skills: ['Curriculum Delivery & Pedagogy', 'Scholarly Research & Publication', 'Grant Writing & Lab Supervision', 'Academic Assessment & Mentorship'],
        timeline: 'Master’s (2 yrs) + UGC-NET + Ph.D (3-5 yrs)'
      }
    ],
    requiredSkills: ['Subject Matter Expertise in Specialized Field', 'Academic Lecturing & Classroom Pedagogy', 'Peer-Reviewed Research Publication (Scopus / UGC-CARE)', 'Curriculum Design & Evaluation', 'Ph.D Thesis Mentorship'],
    preferredSkills: ['Funded Research Grant Acquisition', 'International Conference Presentation', 'Online Course (SWAYAM / MOOC) Creation'],
    tools: ['Learning Management Systems (Moodle, Canvas)', 'Statistical Packages (SPSS, R, LaTeX)', 'Academic Databases (JSTOR, Scopus, Google Scholar)'],
    topCompanies: ['Central Universities (DU, JNU, BHU, Hyderabad University)', 'State Universities', 'IITs / NITs / IIMs', 'Top Private Universities (Ashoka, BITS, Amity)'],
    salaryRange: { min: 800000, max: 1800000, currency: 'INR', formatted: '₹8.0 - ₹18.0 LPA (UGC 7th Pay Commission Academic Level 10 starting basic ₹57,700 + DA & HRA)' },
    minimumEducation: 'Master’s degree with min 55% marks + Qualified UGC-NET / CSIR-NET or Ph.D',
    eligibility: 'UGC NET qualified or Ph.D degree in accordance with UGC Minimum Qualifications for Appointment of Teachers Regulations.'
  },
  {
    id: 'research-scientist-physicist',
    name: 'Research Scientist / Physicist (ISRO / BARC / CSIR / DRDO)',
    title: 'Research Scientist / Physicist',
    shortName: 'Research Scientist',
    type: 'GOVERNMENT_JOB',
    category: 'Pure Sciences & Deep Research',
    sector: 'National Scientific Laboratories & Space Research',
    aliases: ['Scientist B / C', 'Scientific Officer', 'ISRO Scientist', 'BARC Scientist', 'DRDO Scientist', 'R&D Physicist'],
    description: 'Conducts fundamental and applied scientific research in astrophysics, quantum computing, nuclear physics, advanced composite materials, and satellite propulsion.',
    overview: 'Elite scientific cadre working in India’s premier government research institutions (ISRO, Bhabha Atomic Research Centre, DRDO, CSIR labs, TIFR, IISc).',
    educationRoutes: [
      {
        routeName: 'Route 1: B.Tech / M.Sc Physics -> GATE / ISRO ICRB / BARC OCES Exam',
        degrees: ['B.Tech / B.E. (Mechanical, Electrical, Aerospace, CS)', 'M.Sc Physics / Chemistry / Materials Science', 'Ph.D'],
        skills: ['Quantum Mechanics & Electrodynamics', 'Experimental Lab Instrumentation', 'Computational Simulation & Modeling', 'Scientific Programming (Python/Fortran/MATLAB)'],
        timeline: 'Graduation + Direct competitive examination or campus hiring from IITs/IISc'
      }
    ],
    requiredSkills: ['Fundamental Scientific Principles & Mathematical Modeling', 'Experimental Design & Data Acquisition', 'Computational Physics & Simulation', 'Scientific Documentation & Technical Reports', 'High-Vacuum / Radiation / Cryogenic Systems'],
    preferredSkills: ['Machine Learning for Physical Systems', 'Satellite Payload Integration', 'High-Performance Computing (HPC) Clusters'],
    tools: ['MATLAB / Simulink', 'LabVIEW', 'Python (SciPy)', 'COMSOL Multiphysics', 'Spectrometers & Electron Microscopes'],
    topCompanies: ['Indian Space Research Organisation (ISRO)', 'Bhabha Atomic Research Centre (BARC)', 'Defence Research & Development Organisation (DRDO)', 'CSIR Labs', 'Tata Institute of Fundamental Research (TIFR)'],
    salaryRange: { min: 900000, max: 2000000, currency: 'INR', formatted: '₹9.0 - ₹20.0 LPA (Scientist SC/SD Level 10 + Special Scientific Allowances + Government Quarters)' },
    minimumEducation: 'B.Tech / B.E. with first class (65%+) or M.Sc in relevant scientific discipline',
    eligibility: 'Selected via GATE score, ISRO Centralised Recruitment Board (ICRB), or BARC OCES/DGFS examination and scientific interview.'
  },
  {
    id: 'agricultural-scientist-agronomist',
    name: 'Agricultural Scientist & Agronomist (ICAR / AgTech)',
    title: 'Agricultural Scientist & Agronomist',
    shortName: 'Agricultural Scientist',
    type: 'JOB',
    category: 'Agriculture & Food Technology',
    sector: 'Agriculture, AgTech & Rural Development',
    aliases: ['Agronomist', 'Soil Scientist', 'Crop Consultant', 'ICAR Scientist', 'AgTech Product Manager', 'Plant Breeder'],
    description: 'Researches soil nutrition, crop genetics, sustainable irrigation, precision agriculture, and pest management to maximize food production efficiency.',
    overview: 'Crucial role driving the second green revolution and modern AgTech startups. Opportunities exist in ICAR research institutes, seed & fertilizer corporations, and smart precision-farming enterprises.',
    educationRoutes: [
      {
        routeName: 'Route 1: 10+2 Science -> B.Sc Agriculture (Hons) -> M.Sc / ICAR AIEEA Exam',
        degrees: ['B.Sc Agriculture (Hons - 4 Years)', 'M.Sc Agronomy / Genetics & Plant Breeding', 'Ph.D / ARS Exam'],
        skills: ['Crop Physiology & Soil Chemistry', 'Precision Farming & Drone Analytics', 'Plant Disease Diagnostics', 'Seed Technology & Genetics'],
        timeline: '4 Years Graduation + Specialized Master’s or AgTech Industry Entry'
      }
    ],
    requiredSkills: ['Soil Chemistry & Fertility Management', 'Crop Protection & Integrated Pest Management (IPM)', 'Agricultural Drone & Satellite Remote Sensing Analysis', 'Seed Breeding & Genetic Improvement', 'Sustainable Irrigation Technologies'],
    preferredSkills: ['IoT Sensors in Farming', 'Hydroponics & Vertical Farming Systems', 'Agri-Business Supply Chain Logistics'],
    tools: ['Soil Testing Equipment', 'GIS & Satellite Crop Monitoring Software', 'Weather Prediction Analytics', 'Drone Mapping Tools'],
    topCompanies: ['Indian Council of Agricultural Research (ICAR)', 'Bayer Crop Science', 'Syngenta', 'UPL Ltd', 'ITC Agri-Business', 'DeHaat', 'NABARD'],
    salaryRange: { min: 450000, max: 1400000, currency: 'INR', formatted: '₹4.5 - ₹14.0 LPA' },
    minimumEducation: 'B.Sc Agriculture (Hons) / M.Sc Agriculture from an ICAR-accredited university',
    eligibility: 'Degree in Agriculture, Horticulture, or related agricultural sciences with sound field and lab knowledge.'
  }
];
