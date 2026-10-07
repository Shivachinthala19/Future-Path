/**
 * Structured Job Database Seed
 * Covers: Technology, Software, Data, AI, Cybersecurity, Cloud, DevOps,
 * Finance, Accounting, Banking, Healthcare, Nursing, Engineering, Government / Public Sector.
 */

export const structuredJobs = [
  // ==========================================
  // 1. DATA ANALYST
  // ==========================================
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    shortName: 'Data Analyst',
    type: 'JOB',
    category: 'Technology & Analytics',
    aliases: ['Data Analyst', 'Junior Data Analyst', 'Business Data Analyst', 'Analytics Specialist', 'Commercial Analyst'],
    description: 'Collects, cleans, models, and analyzes structured and unstructured datasets to uncover patterns, generate business insights, and drive executive decision-making through interactive dashboards.',
    overview: 'Data Analysts bridge business operations with technical analytics. They extract data using SQL, perform statistical computations with Excel and Python, and create executive-ready dashboards with Power BI or Tableau.',
    educationRoutes: [
      {
        routeName: 'Route 1: Quantitative / Commerce Degree (B.Com, BBA, Economics, Statistics)',
        title: 'Commerce & Economics Background Route',
        type: 'Domain & Business Analytical Path',
        degrees: ['B.Com', 'BBA', 'BA Economics', 'B.Sc Statistics'],
        skills: ['Advanced Excel', 'SQL Queries', 'Business Statistics', 'Power BI / Tableau', 'Financial Analytics'],
        timeline: '3 - 6 Months focused analytical bridging',
        description: 'Leverages domain business understanding and financial literacy, supplemented with database querying and business intelligence tools.',
        steps: [
          'Master Advanced Excel (Pivot Tables, XLOOKUP, Index-Match, Power Query)',
          'Learn Relational Databases & SQL (Joins, Window Functions, Aggregations, CTEs)',
          'Learn Data Visualization in Power BI or Tableau',
          'Learn basic Python for Exploratory Data Analysis (Pandas, NumPy, Matplotlib)',
          'Build 3 portfolio projects solving business case studies',
          'Apply for entry-level analyst roles and business intelligence associate positions'
        ]
      },
      {
        routeName: 'Route 2: Technical / Computer Science Degree (B.Tech CSE/IT, BCA, B.Sc CS)',
        title: 'Direct Technical Degree Route',
        type: 'Technical & Computational Path',
        degrees: ['B.Tech CSE / IT', 'BCA', 'B.Sc Computer Science'],
        skills: ['Python', 'SQL', 'Database Schema Design', 'Statistics', 'Cloud Data Warehousing'],
        timeline: 'Direct Campus Placement / 2 - 4 Months',
        description: 'Utilizes foundational coding and database knowledge to quickly master business intelligence dashboards and statistical modeling.',
        steps: [
          'Solidify SQL complex analytical queries and database indexing',
          'Deepen Python data wrangling (Pandas, Seaborn, Scikit-learn basics)',
          'Master interactive dashboard storytelling in Tableau or Power BI',
          'Deploy automated ETL pipelines using Python and cloud storage',
          'Build GitHub portfolio with interactive dashboards and documented case studies'
        ]
      },
      {
        routeName: 'Route 3: Any Recognized Degree + Professional Analytics Certification',
        title: 'Career Switch / Non-Technical Degree Route',
        type: 'Skill-Driven Transition Path',
        degrees: ['Any Bachelor Degree (BA, B.Sc General, etc.)'],
        skills: ['Data Literacy', 'Excel', 'SQL', 'Power BI', 'Portfolio Projects'],
        timeline: '6 Months intensive self-paced / bootcamp training',
        description: 'Designed for candidates transitioning into data from non-quantitative disciplines through project proof of work.',
        steps: [
          'Complete accredited certification (e.g. Google Data Analytics Professional Certificate)',
          'Build 4 domain-specific data analysis projects on GitHub/Kaggle',
          'Publish case studies on LinkedIn demonstrating business impact',
          'Practice live technical SQL assessments and case study interviews'
        ]
      }
    ],
    requiredSkills: [
      'Advanced MS Excel (Formulas, Power Query, Macros)',
      'Relational Databases & SQL (Joins, CTEs, Window Functions)',
      'Data Visualization (Power BI or Tableau)',
      'Descriptive & Inferential Statistics',
      'Data Cleaning, Transformation & Quality Assurance'
    ],
    preferredSkills: [
      'Python (Pandas, NumPy, Matplotlib, Seaborn)',
      'Cloud Data Warehouses (Google BigQuery, Snowflake, AWS Redshift)',
      'Git & Version Control',
      'Basic Machine Learning Concepts',
      'Storytelling with Data & Stakeholder Presentation'
    ],
    certifications: [
      'Google Data Analytics Professional Certificate (Coursera)',
      'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
      'Tableau Certified Data Analyst',
      'IBM Data Analyst Professional Certificate',
      'AWS Certified Data Analytics - Specialty'
    ],
    experience: {
      entryLevel: true,
      level: 'Entry Level (0 - 2 Years)',
      minYears: 0,
      maxYears: 2
    },
    salaryRange: {
      min: 450000,
      max: 950000,
      currency: 'INR',
      formatted: '₹4.5 - ₹9.5 LPA'
    },
    roadmap: [
      {
        step: 1,
        title: 'Master Spreadsheet Data Modeling & Excel',
        type: 'FUNDAMENTALS',
        description: 'Acquire proficiency in spreadsheet calculations, dynamic array formulas, nested lookups, data validation, and Power Query automation.',
        whatToLearn: 'XLOOKUP, INDEX-MATCH, SUMIFS, Pivot Tables, Power Pivot, Data Modeling, DAX basics.',
        whyItMatters: '90% of business reporting begins in spreadsheets; mastering Excel provides immediate commercial utility.'
      },
      {
        step: 2,
        title: 'Master Relational Databases & SQL Querying',
        type: 'TECHNICAL_CORE',
        description: 'Understand relational schemas, table joins, group aggregations, window functions, and subqueries to extract enterprise data.',
        whatToLearn: 'SELECT, GROUP BY, HAVING, INNER/LEFT/RIGHT JOINs, RANK(), DENSE_RANK(), LEAD/LAG, CASE WHEN, CTEs (WITH clause).',
        whyItMatters: 'SQL is the universal language of enterprise databases and the primary filter in technical interviews.'
      },
      {
        step: 3,
        title: 'Statistical Thinking & Quantitative Reasoning',
        type: 'ANALYTICAL_SKILLS',
        description: 'Apply descriptive statistics, probability distributions, hypothesis testing, A/B testing, and correlation vs causation analysis.',
        whatToLearn: 'Mean, Median, Mode, Standard Deviation, Percentiles, Normal Distribution, Confidence Intervals, p-values.',
        whyItMatters: 'Ensures business conclusions are statistically valid rather than coincidental.'
      },
      {
        step: 4,
        title: 'Interactive Business Intelligence Dashboards (Power BI / Tableau)',
        type: 'VISUALIZATION',
        description: 'Transform raw data tables into insightful visual dashboards with drill-downs, filters, and KPI cards for leadership.',
        whatToLearn: 'Data modeling, DAX measures, calculated columns, storytelling, layout design, dashboard publishing.',
        whyItMatters: 'Decision-makers consume dashboards; clear visual communication drives business adoption.'
      },
      {
        step: 5,
        title: 'Python for Data Analysis & Automation',
        type: 'PROGRAMMING',
        description: 'Learn fundamental scripting in Python to clean complex datasets, handle missing values, and automate repetitive tasks.',
        whatToLearn: 'Jupyter Notebooks, Pandas DataFrames, NumPy arrays, Matplotlib and Seaborn visualization libraries.',
        whyItMatters: 'Enables handling large datasets that exceed spreadsheet memory limits.'
      },
      {
        step: 6,
        title: 'Build Real-World Industry Portfolio Projects',
        type: 'PORTFOLIO',
        description: 'Create 3 comprehensive portfolio projects: 1) Sales & Revenue Performance Dashboard, 2) Customer Churn Analysis, 3) Supply Chain / Financial Metrics.',
        whatToLearn: 'Data cleaning, business problem definition, insightful visualizations, executive summary documentation.',
        whyItMatters: 'A live portfolio proves tangible capability and replaces lack of prior experience.'
      },
      {
        step: 7,
        title: 'ATS-Optimized Resume & LinkedIn Profile Optimization',
        type: 'APPLICATION',
        description: 'Structure a single-page resume with quantified impact bullets (e.g. "Automated weekly sales report reducing manual hours by 30%").',
        whatToLearn: 'Action verbs, keywords matching job descriptions, GitHub/Portfolio link placement.',
        whyItMatters: 'Passes automated applicant tracking systems (ATS) used by top employers.'
      },
      {
        step: 8,
        title: 'Technical Assessments & SQL Interview Preparation',
        type: 'INTERVIEW_PREP',
        description: 'Solve SQL challenges on LeetCode/HackerRank and practice answering business scenario case questions.',
        whatToLearn: 'Writing SQL on whiteboard/coderpad, explaining assumptions, answering behavioral questions using STAR method.',
        whyItMatters: 'Converts technical rounds into confirmed job offers.'
      },
      {
        step: 9,
        title: 'Targeted Applications & Networking',
        type: 'JOB_HUNTING',
        description: 'Apply strategically on LinkedIn, Naukri, AngelList/Wellfound, and network with hiring managers and senior analysts.',
        whatToLearn: 'Writing personalized cold outreach messages, following up, negotiating entry-level salary packages.',
        whyItMatters: 'Direct referrals increase interview callback probability by over 400%.'
      }
    ],
    projects: [
      {
        name: 'Executive E-Commerce Sales & Profitability Dashboard (Power BI)',
        tech: 'Power BI, DAX, Power Query, Excel',
        desc: 'Interactive 3-page dashboard analyzing ₹50M sales dataset across 4 regions with profitability drill-downs and customer segmentation.'
      },
      {
        name: 'Customer Churn & Retention Analysis (SQL & Python)',
        tech: 'PostgreSQL, Python, Pandas, Seaborn',
        desc: 'Identified key drivers of customer attrition in a telecom subscription database using cohort analysis and SQL window functions.'
      },
      {
        name: 'Financial Performance & Expense Optimization Model',
        tech: 'Advanced Excel, Financial Modeling, Power Pivot',
        desc: 'Built a dynamic 5-year budgeting forecast model incorporating scenario analysis, sensitivity matrices, and variance reporting.'
      }
    ],
    interviewPreparation: [
      {
        category: 'SQL Technical',
        question: 'What is the difference between WHERE and HAVING clause, and how do Window Functions differ from GROUP BY?',
        answerGuidance: 'WHERE filters rows before aggregation, while HAVING filters grouped rows after aggregation. GROUP BY collapses multiple rows into a single summary row, whereas Window Functions perform calculations across rows while preserving individual row identity.'
      },
      {
        category: 'Business Analytics Scenario',
        question: 'If our website traffic increased by 20% last month but revenue declined by 5%, how would you investigate?',
        answerGuidance: 'Break down metrics: Check conversion rate, average order value (AOV), traffic source mix (organic vs paid/low-intent), device types (mobile checkout issues), and product categories to isolate root cause.'
      },
      {
        category: 'Technical Tooling',
        question: 'How do you handle missing or corrupt data values in a critical business report?',
        answerGuidance: 'Analyze the mechanism of missingness (MCAR, MAR, MNAR), consult domain stakeholders, and determine whether imputation (mean, median, forward fill) or exclusion is appropriate without introducing bias.'
      }
    ],
    howToApply: 'Build public GitHub portfolio with README case studies, optimize LinkedIn with "Data Analyst | SQL | Power BI | Python", and apply on LinkedIn Jobs, Naukri, Instahyre, and Hirist.',
    careerGrowth: [
      'Junior Data Analyst (Years 0-2)',
      'Senior Data Analyst / BI Developer (Years 2-5)',
      'Analytics Team Lead / Analytics Manager (Years 5-8)',
      'Director of Analytics / Head of Business Intelligence (Years 8-12)',
      'Chief Data Officer (CDO) / VP of Analytics (Years 12+)'
    ],
    higherStudies: [
      'M.Sc in Data Science & Business Analytics',
      'Master of Business Administration (MBA in Business Analytics)',
      'M.Tech in Data Engineering / Computational Systems'
    ],
    sources: [
      {
        title: 'NASSCOM FutureSkills Prime Career Pathway: Data Analyst',
        url: 'https://futureskillsprime.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      },
      {
        title: 'Microsoft Learn Certified Data Analyst Certification Guide',
        url: 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 2. SOFTWARE DEVELOPER / SOFTWARE ENGINEER
  // ==========================================
  {
    id: 'software-developer',
    name: 'Software Developer',
    shortName: 'Software Developer',
    type: 'JOB',
    category: 'Technology & Software',
    aliases: ['Software Developer', 'Software Engineer', 'SDE', 'Full Stack Developer', 'Backend Developer', 'Frontend Developer'],
    description: 'Designs, develops, tests, and maintains software applications, web platforms, APIs, and scalable backend microservices using modern programming languages and frameworks.',
    overview: 'Software Developers build user-facing interfaces and backend architectures powering modern industry. They write clean, testable code, implement REST/GraphQL APIs, manage database transactions, and deploy applications to cloud servers.',
    educationRoutes: [
      {
        routeName: 'Route 1: Formal Computer Science Degree (B.Tech CSE/IT, BCA, MCA)',
        title: 'Computer Science & Engineering Pathway',
        type: 'Standard Formal Education',
        degrees: ['B.Tech CSE', 'B.Tech IT', 'BCA', 'MCA'],
        skills: ['Data Structures & Algorithms', 'Object Oriented Programming', 'DBMS', 'Web Development'],
        timeline: 'Direct Campus Placement / 0 - 3 Months',
        description: 'Standard accredited path providing comprehensive computer science theory and direct campus recruitment access.',
        steps: ['Master DSA in Java/C++/Python', 'Build full-stack web applications (MERN / Spring Boot)', 'Participate in hackathons & open source', 'Crack campus or off-campus technical coding rounds']
      },
      {
        routeName: 'Route 2: Any Engineering Branch (Mechanical, Electrical, Civil) to Software',
        title: 'Non-CS Engineering Transition Pathway',
        type: 'Technical Transition Route',
        degrees: ['B.Tech in Any Discipline', 'BE in Any Discipline'],
        skills: ['DSA', 'Java/JavaScript/Python', 'System Design basics', 'Git'],
        timeline: '4 - 6 Months focused preparation',
        description: 'Engineers with strong logical backgrounds transition into software engineering through focused self-study in algorithms and web stacks.',
        steps: ['Master one core language (Java, JavaScript, Python, or C++)', 'Solve 150+ LeetCode DSA problems', 'Build 2 full-stack projects with databases', 'Apply for off-campus SDE roles']
      },
      {
        routeName: 'Route 3: Non-Tech Graduate to Full-Stack Developer',
        title: 'Portfolio & Bootcamp Driven Pathway',
        type: 'Skill-Based Direct Entry',
        degrees: ['B.Com', 'B.Sc', 'BA', 'Any Graduate'],
        skills: ['JavaScript / TypeScript', 'React', 'Node.js', 'PostgreSQL / MongoDB', 'Git'],
        timeline: '6 - 9 Months intensive practice',
        description: 'A project-first approach demonstrating working web applications, GitHub commits, and freelance/internship experience.',
        steps: ['HTML, CSS, Modern JavaScript (ES6+)', 'Frontend mastery (React, Tailwind CSS)', 'Backend & APIs (Node.js, Express, PostgreSQL)', 'Deploy live full-stack web apps on Vercel/Render', 'Apply for Junior Web Developer positions']
      }
    ],
    requiredSkills: [
      'Core Programming (JavaScript/TypeScript, Python, Java, or C++)',
      'Data Structures & Algorithms (Arrays, Trees, Graphs, Dynamic Programming)',
      'Relational / NoSQL Databases (PostgreSQL, MySQL, MongoDB)',
      'RESTful API Design & HTTP Protocols',
      'Git & GitHub Version Control'
    ],
    preferredSkills: [
      'Frontend Frameworks (React, Next.js, Vue)',
      'Backend Frameworks (Node.js/Express, Spring Boot, FastAPI, Django)',
      'Docker & Containerization Basics',
      'Cloud Deployment (AWS, Vercel, Firebase)',
      'Unit Testing & CI/CD Pipelines'
    ],
    certifications: [
      'AWS Certified Developer - Associate',
      'Meta Front-End / Back-End Developer Professional Certificate (Coursera)',
      'Oracle Certified Professional: Java SE Programmer',
      'Google Cloud Associate Cloud Engineer'
    ],
    experience: {
      entryLevel: true,
      level: 'Entry Level (0 - 2 Years)',
      minYears: 0,
      maxYears: 2
    },
    salaryRange: {
      min: 550000,
      max: 1400000,
      currency: 'INR',
      formatted: '₹5.5 - ₹14.0 LPA'
    },
    roadmap: [
      {
        step: 1,
        title: 'Master Programming Foundations & Memory Models',
        type: 'FOUNDATIONS',
        description: 'Choose one primary language (Java, Python, C++, or JavaScript/TypeScript) and master syntax, data types, control flow, functions, OOP, and memory management.',
        whatToLearn: 'Variables, loops, arrays, objects, OOP principles (Encapsulation, Inheritance, Polymorphism), error handling.',
        whyItMatters: 'Fluency in one core language allows quick adaptation to any framework.'
      },
      {
        step: 2,
        title: 'Data Structures & Algorithmic Problem Solving',
        type: 'COMPUTER_SCIENCE',
        description: 'Learn computational complexity (Big O) and core data structures: Arrays, Strings, HashMaps, Linked Lists, Stacks, Queues, Trees, Heaps, and Graphs.',
        whatToLearn: 'Binary Search, Two Pointers, Sliding Window, DFS/BFS, Recursion, Dynamic Programming.',
        whyItMatters: 'Standard screening benchmark for product engineering interviews worldwide.'
      },
      {
        step: 3,
        title: 'Web & API Fundamentals',
        type: 'DEVELOPMENT',
        description: 'Understand how the internet works, HTTP/HTTPS request-response cycles, status codes, headers, and RESTful API architecture.',
        whatToLearn: 'JSON, REST verbs (GET, POST, PUT, DELETE), CORS, Authentication (JWT, OAuth), Cookies & Sessions.',
        whyItMatters: 'Essential for connecting frontend clients with backend servers.'
      },
      {
        step: 4,
        title: 'Database Design & SQL / NoSQL Mastery',
        type: 'DATABASES',
        description: 'Design normalized relational database schemas and write optimized queries in PostgreSQL/MySQL or handle documents in MongoDB.',
        whatToLearn: 'Primary/Foreign keys, indexing, ACID transactions, Prisma/Mongoose ORMs.',
        whyItMatters: 'Every software application requires reliable, secure data persistence.'
      },
      {
        step: 5,
        title: 'Full-Stack Application Development',
        type: 'FRAMEWORKS',
        description: 'Build end-to-end full-stack applications with modern frameworks: React/Next.js on frontend + Node.js/Express or Spring Boot on backend.',
        whatToLearn: 'Component state management, responsive UI, API integration, middleware, error handling.',
        whyItMatters: 'Demonstrates ability to ship real working products from scratch.'
      },
      {
        step: 6,
        title: 'DevOps, Docker & Cloud Deployment',
        type: 'DEPLOYMENT',
        description: 'Containerize applications using Docker and deploy them to cloud platforms with CI/CD automation.',
        whatToLearn: 'Dockerfile, docker-compose, AWS EC2/S3, Vercel, Render, GitHub Actions.',
        whyItMatters: 'Distinguishes junior coders from engineers who can take code into production.'
      },
      {
        step: 7,
        title: 'Build 2 High-Impact Production Capstone Projects',
        type: 'PORTFOLIO',
        description: 'Develop and deploy: 1) SaaS Productivity / Collaboration App, 2) E-Commerce / FinTech Platform with payment integration.',
        whatToLearn: 'Authentication, Stripe/Razorpay payments, real-time WebSockets, clean architecture.',
        whyItMatters: 'Working deployed applications speak louder than resume bullet points.'
      },
      {
        step: 8,
        title: 'System Design Basics & Interview Rounds',
        type: 'INTERVIEWS',
        description: 'Prepare for technical coding interviews, object-oriented design, and system architecture fundamentals (caching, load balancing, databases).',
        whatToLearn: 'Scalability concepts, microservices vs monolith, LeetCode medium problem solving under timed pressure.',
        whyItMatters: 'Clearing technical rounds consistently leads to multiple top offers.'
      },
      {
        step: 9,
        title: 'Job Applications & Technical Networking',
        type: 'CAREER_LAUNCH',
        description: 'Apply on AngelList/Wellfound, LinkedIn, Instahyre, and participate in tech meetups and open-source GitHub contributions.',
        whatToLearn: 'Cold messaging founders and tech leads, pitching portfolio projects, negotiating offer terms.',
        whyItMatters: 'Maximizes interview pipeline and compensation.'
      }
    ],
    projects: [
      {
        name: 'Full-Stack Enterprise Team Collaboration Platform',
        tech: 'React, Node.js, Express, PostgreSQL, Socket.io, TailwindCSS',
        desc: 'Real-time team messaging, task Kanban boards, role-based access control, and live notifications with 99.9% uptime deployment.'
      },
      {
        name: 'FinTech Subscription & Payment Processing Engine',
        tech: 'Next.js, TypeScript, PostgreSQL, Prisma, Stripe API, Docker',
        desc: 'Multi-tenant subscription billing platform with automated invoice generation, webhook listeners, and idempotent payment processing.'
      }
    ],
    interviewPreparation: [
      {
        category: 'Data Structures & Algorithms',
        question: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target in O(N) time.',
        answerGuidance: 'Use a HashMap to store the complement (target - num) and its index while iterating through the array in a single pass.'
      },
      {
        category: 'System Architecture',
        question: 'What is the difference between SQL (Relational) and NoSQL databases, and when would you choose which?',
        answerGuidance: 'SQL databases are relational, structured, schema-bound, and ACID compliant (ideal for financial transactions). NoSQL databases are document/key-value/graph based, schema-flexible, and horizontally scalable (ideal for rapid prototyping, real-time analytics, and high-velocity unstructured data).'
      }
    ],
    howToApply: 'Maintain an active GitHub with clear commit history, deploy live links for all projects on Vercel/AWS, and apply on LinkedIn, Instahyre, Wellfound, and company career portals.',
    careerGrowth: [
      'Junior Software Engineer / SDE-1 (Years 0-2)',
      'Software Development Engineer / SDE-2 (Years 2-5)',
      'Senior Software Engineer / SDE-3 (Years 5-8)',
      'Staff Software Engineer / Engineering Manager (Years 8-12)',
      'Principal Architect / VP of Engineering / CTO (Years 12+)'
    ],
    higherStudies: [
      'M.Tech in Computer Science & Engineering (via GATE)',
      'MS in Computer Science (International)',
      'Executive MBA in Technology Strategy'
    ],
    sources: [
      {
        title: 'IEEE Computer Society Software Engineering Body of Knowledge (SWEBOK)',
        url: 'https://computer.org',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 3. GOVERNMENT RECRUITMENT: SSC CHSL
  // ==========================================
  {
    id: 'ssc-chsl',
    name: 'SSC CHSL (Combined Higher Secondary Level)',
    shortName: 'SSC CHSL',
    type: 'GOVERNMENT_JOB',
    category: 'Government & Public Sector',
    organization: 'Staff Selection Commission (SSC), Government of India',
    aliases: ['SSC CHSL', 'CHSL', 'Combined Higher Secondary Level', 'Lower Division Clerk SSC', 'DEO SSC'],
    description: 'National competitive recruitment conducted by Staff Selection Commission for various Central Government ministries, departments, and offices.',
    overview: 'SSC CHSL recruits 12th-pass candidates for key administrative posts including Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO) across Central Government ministries.',
    posts: [
      'Lower Division Clerk (LDC) / Junior Secretariat Assistant (JSA) - Pay Level 2 (₹19,900 - ₹63,200)',
      'Data Entry Operator (DEO) - Pay Level 4 (₹25,500 - ₹81,100) and Pay Level 5 (₹29,200 - ₹92,300)',
      'Data Entry Operator Grade A - Pay Level 4 (₹25,500 - ₹81,100)'
    ],
    qualification: 'Must have passed 12th Standard or equivalent examination from a recognized Board or University. (For DEO in CAG office: 12th Standard pass in Science stream with Mathematics).',
    ageLimit: 'Typically 18 to 27 years (Age relaxation applicable for OBC, SC, ST, PwBD, Ex-Servicemen as per official Central Government rules). Please verify exact cut-off dates in the active notification.',
    eligibility: {
      qualification: '12th Standard / Higher Secondary / Intermediate in any stream (Science with Math for DEO Grade A CAG)',
      streams: ['Arts', 'Commerce', 'Science', 'Vocational'],
      minimumRequirements: ['12th standard pass certificate from a recognized board before closing date of notification.'],
      ageLimit: '18 - 27 Years (with category relaxations)'
    },
    exams: [
      'Tier-1: Computer Based Examination (Objective Multiple Choice - 100 Questions / 200 Marks)',
      'Tier-2: Computer Based Examination (Section I: Math & Reasoning; Section II: English & GA; Section III: Computer & Typing Skill Test)'
    ],
    subjects: [
      'Quantitative Aptitude (Arithmetic & Advanced Math)',
      'General Intelligence & Logical Reasoning',
      'English Language & Comprehension',
      'General Awareness (History, Geography, Polity, Science, Current Affairs)',
      'Computer Knowledge Module (Qualifying)',
      'Typing / Skill Test (Qualifying: English 35 WPM / Hindi 30 WPM)'
    ],
    roadmap: [
      {
        step: 1,
        title: 'Understand Exam Pattern & Official Syllabus',
        type: 'ORIENTATION',
        description: 'Read the latest SSC CHSL official notification carefully to understand revised scheme of Tier-1 and Tier-2 examination.',
        whatToLearn: 'Marking scheme (+2, -0.5 in Tier 1; +3, -1 in Tier 2), sectional cutoffs, typing test requirements.',
        whyItMatters: 'Prevents misdirected preparation and aligns practice with actual testing standards.'
      },
      {
        step: 2,
        title: 'Master Quantitative Aptitude & Arithmetic',
        type: 'MATH',
        description: 'Build strong conceptual clarity and calculation speed in arithmetic, algebra, geometry, trigonometry, and data interpretation.',
        whatToLearn: 'Percentages, Profit & Loss, Ratio, Time & Work, Algebra, Geometry, Mensuration.',
        whyItMatters: 'Quant carries high weightage and requires high accuracy under time constraints.'
      },
      {
        step: 3,
        title: 'General Intelligence & Logical Reasoning',
        type: 'REASONING',
        description: 'Practice verbal and non-verbal reasoning, analogies, series completion, coding-decoding, syllogisms, and matrix puzzles.',
        whatToLearn: 'Fast pattern recognition, elimination techniques, spatial visualization.',
        whyItMatters: 'Highest scoring section where top rankers score 45+ out of 50.'
      },
      {
        step: 4,
        title: 'English Language & Grammar Rules',
        type: 'ENGLISH',
        description: 'Master English grammar rules (Subject-Verb Agreement, Tenses, Prepositions), vocabulary (Synonyms/Antonyms, Idioms), and reading comprehension.',
        whatToLearn: 'Spotting errors, sentence improvement, active-passive voice, direct-indirect speech, cloze tests.',
        whyItMatters: 'Crucial in both Tier-1 and Tier-2 Section II.'
      },
      {
        step: 5,
        title: 'General Awareness & Current Affairs',
        type: 'GENERAL_AWARENESS',
        description: 'Study NCERT static GK (Indian Polity, Modern History, Geography, Economics, General Science) and monthly current affairs.',
        whatToLearn: 'Constitutional articles, government schemes, awards, sports, scientific discoveries.',
        whyItMatters: 'Provides rapid scoring without calculation time.'
      },
      {
        step: 6,
        title: 'Daily Typing Speed Practice',
        type: 'SKILL_TEST',
        description: 'Practice English typing for 30 minutes daily to achieve 35+ words per minute with 95%+ accuracy.',
        whatToLearn: 'Touch typing on standard QWERTY keyboard without looking at keys.',
        whyItMatters: 'Typing test is mandatory qualifying; failing it disqualifies despite high Tier-2 marks.'
      },
      {
        step: 7,
        title: 'Full-Length Mock Tests & Time Management',
        type: 'MOCK_TESTS',
        description: 'Attempt 30+ full-length computer-based mock tests on exact TCS examination interface and analyze weak areas.',
        whatToLearn: 'Question skipping strategy, negative mark management, sectional time allocation.',
        whyItMatters: 'Simulates exam pressure and boosts speed by 25-40%.'
      },
      {
        step: 8,
        title: 'Appear in Tier-1 & Tier-2 Examination',
        type: 'EXAMINATION',
        description: 'Appear in Tier-1, qualify for Tier-2, clear Computer Module and Typing Test.',
        whatToLearn: 'Exam day calm, document verification prep.',
        whyItMatters: 'Final merit is prepared based on aggregate marks in Tier-2.'
      },
      {
        step: 9,
        title: 'Post Preference & Document Verification',
        type: 'APPOINTMENT',
        description: 'Fill online post preferences (LDC vs DEO vs Ministry preference) and attend document verification.',
        whatToLearn: 'Central Government department selection criteria.',
        whyItMatters: 'Secures permanent Central Government appointment and joining letter.'
      }
    ],
    salaryRange: {
      min: 240000,
      max: 480000,
      currency: 'INR',
      formatted: 'Pay Level 2 to Level 5 (₹19,900 - ₹92,300 basic + DA, HRA, TA)'
    },
    careerGrowth: [
      'Lower Division Clerk (LDC) / DEO (Entry Level)',
      'Upper Division Clerk (UDC) / Senior Secretariat Assistant (After 3-5 Years)',
      'Assistant Section Officer (ASO - via Departmental Exam / Promotion)',
      'Section Officer (SO - Gazetted Group B)',
      'Under Secretary (Central Secretariat Service - Group A)'
    ],
    sources: [
      {
        title: 'Staff Selection Commission (SSC) Official Website',
        url: 'https://ssc.gov.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    officialSource: 'Staff Selection Commission (SSC)',
    notificationUrl: 'https://ssc.gov.in',
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 4. RAILWAYS RECRUITMENT: RRB NTPC
  // ==========================================
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC (Non-Technical Popular Categories)',
    shortName: 'RRB NTPC',
    type: 'GOVERNMENT_JOB',
    category: 'Government & Public Sector',
    organization: 'Railway Recruitment Control Board (RRB), Ministry of Railways',
    aliases: ['RRB NTPC', 'NTPC Railway', 'Station Master', 'Goods Train Manager', 'Commercial Clerk'],
    description: 'National recruitment by Indian Railways for non-technical posts across graduate and undergraduate categories including Station Master, Goods Train Manager, Commercial Apprentice, and Clerical cadres.',
    overview: 'RRB NTPC is one of India’s largest employment notifications offering central government railway career stability, quarters, medical benefits, and promotion ladders.',
    posts: [
      'Graduate Posts (Level 4, 5, 6): Station Master, Goods Train Manager, Junior Accounts Assistant, Senior Commercial cum Ticket Clerk',
      'Undergraduate Posts (Level 2, 3): Commercial cum Ticket Clerk, Accounts Clerk cum Typist, Junior Clerk cum Typist, Trains Clerk'
    ],
    qualification: 'Graduation from a recognized university for Graduate-level posts; 12th (+2 Stage) or its equivalent with not less than 50% marks for Undergraduate posts.',
    ageLimit: 'Typically 18 to 30 years for 12th-level posts; 18 to 33/36 years for Graduate posts (with standard OBC/SC/ST/PwBD relaxations). Refer to current official notification.',
    eligibility: {
      qualification: '12th Standard or Bachelor Degree (depending on the post)',
      streams: ['Any Discipline'],
      minimumRequirements: ['Educational qualification from a recognized board/university as on notification closing date.'],
      ageLimit: '18 - 33 Years (Graduate) / 18 - 30 Years (Undergraduate)'
    },
    exams: [
      '1st Stage Computer Based Test (CBT-1) - Screening (100 Questions / 100 Marks)',
      '2nd Stage Computer Based Test (CBT-2) - (120 Questions / 120 Marks)',
      'Computer Based Aptitude Test (CBAT - for Station Master) / Typing Skill Test (for Clerical posts)',
      'Document Verification and Medical Fitness Examination'
    ],
    salaryRange: {
      min: 240000,
      max: 600000,
      currency: 'INR',
      formatted: 'Pay Level 2 to Level 6 (₹19,900 - ₹1,12,400 + Railway Allowances & Passes)'
    },
    careerGrowth: [
      'Station Master / Goods Guard / Ticket Clerk (Entry Level)',
      'Station Superintendent / Yard Master / Chief Commercial Inspector',
      'Assistant Operations Manager (AOM) / Assistant Commercial Manager (ACM - Group B Gazetted)',
      'Divisional Operations Manager (DOM) / Senior DCM (Group A Indian Railway Traffic Service)'
    ],
    sources: [
      {
        title: 'Indian Railways Official Recruitment Portal',
        url: 'https://indianrailways.gov.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    officialSource: 'Railway Recruitment Control Board (RRB)',
    notificationUrl: 'https://indianrailways.gov.in',
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 5. BANKING: BANK PO & CLERK
  // ==========================================
  {
    id: 'bank-po',
    name: 'Bank Probationary Officer (IBPS PO / SBI PO)',
    shortName: 'Bank PO',
    type: 'GOVERNMENT_JOB',
    category: 'Banking & Financial Services',
    organization: 'Institute of Banking Personnel Selection (IBPS) & State Bank of India (SBI)',
    aliases: ['Bank PO', 'IBPS PO', 'SBI PO', 'Probationary Officer', 'Scale 1 Officer Bank'],
    description: 'Management-track recruitment for officer grade (Junior Management Grade Scale-I) in Public Sector Banks and State Bank of India.',
    overview: 'Bank POs manage retail banking operations, loan credit appraisals, foreign exchange, treasury operations, and branch management, with rapid promotion channels to executive leadership.',
    posts: [
      'Probationary Officer / Management Trainee (JMGS-I: Scale-I Officer in Public Sector Banks)',
      'State Bank of India (SBI) Probationary Officer (JMGS-I)'
    ],
    qualification: 'A degree (Graduation) in any discipline from a recognized University or any equivalent qualification recognized as such by the Central Government.',
    ageLimit: '20 to 30 years (as on reference date specified in official advertisement, with category relaxations).',
    eligibility: {
      qualification: 'Bachelor Degree in any discipline (B.Com, B.Tech, B.Sc, BA, BBA)',
      streams: ['Any Stream'],
      minimumRequirements: ['Graduation pass certificate before registration deadline.'],
      ageLimit: '20 - 30 Years'
    },
    exams: [
      'Preliminary Examination (Objective: Reasoning, Quant, English - 100 Marks)',
      'Main Examination (Objective + Descriptive Letter/Essay Writing - 225 Marks)',
      'Psychometric Test, Group Discussion & Personal Interview (100 Marks)'
    ],
    salaryRange: {
      min: 650000,
      max: 1050000,
      currency: 'INR',
      formatted: '₹6.5 - ₹10.5 LPA (Basic ₹48,480/mo as per 12th Bipartite Settlement + DA, HRA, CCA)'
    },
    careerGrowth: [
      'Scale I: Assistant Manager / Probationary Officer',
      'Scale II: Manager (Branch Head / Specialist)',
      'Scale III: Senior Manager',
      'Scale IV: Chief Manager',
      'Scale V: Assistant General Manager (AGM)',
      'Scale VI: Deputy General Manager (DGM)',
      'Scale VII: General Manager (GM) / Chief General Manager (CGM)',
      'Executive Director (ED) & Managing Director (MD & CEO)'
    ],
    sources: [
      {
        title: 'Institute of Banking Personnel Selection (IBPS) Official Website',
        url: 'https://ibps.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      },
      {
        title: 'State Bank of India (SBI) Careers Portal',
        url: 'https://sbi.co.in/careers',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    officialSource: 'IBPS / State Bank of India',
    notificationUrl: 'https://ibps.in',
    lastVerified: 'September 2026'
  }
];
