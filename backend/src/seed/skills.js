/**
 * Structured Skills Seed Data
 */

export const structuredSkills = [
  {
    id: 'skill-sql',
    name: 'SQL (Structured Query Language)',
    shortName: 'SQL',
    type: 'SKILL',
    category: 'Information Technology',
    aliases: ['SQL', 'PostgreSQL', 'MySQL', 'Database Querying', 'Structured Query Language'],
    description: 'Standard domain-specific language for managing, querying, transforming, and modeling data in relational database systems.',
    overview: 'Essential foundational skill for data analysts, software developers, database administrators, and backend engineers.',
    requiredSkills: [],
    relatedStudies: ['B.Com', 'BCA', 'B.Tech CSE', 'M.Sc Data Science', 'MCA'],
    relatedJobs: ['Data Analyst', 'Software Developer', 'Database Administrator', 'Data Engineer'],
    sources: [
      {
        title: 'ISO/IEC 9075 SQL Standard',
        url: 'https://iso.org',
        sourceType: 'REFERENCE',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-python',
    name: 'Python Programming',
    shortName: 'Python',
    type: 'SKILL',
    category: 'Computer Science',
    aliases: ['Python', 'Python 3', 'Python Programming Language'],
    description: 'High-level, versatile programming language renowned for clear syntax, rich ecosystem in data science, artificial intelligence, web development, and scripting.',
    overview: 'The primary language powering machine learning (PyTorch, TensorFlow), data analytics (Pandas, NumPy), and backend APIs (FastAPI, Django).',
    requiredSkills: [],
    relatedStudies: ['B.Tech CSE', 'BCA', 'M.Sc Data Science', 'MCA'],
    relatedJobs: ['Data Analyst', 'Software Developer', 'AI/ML Engineer', 'Data Scientist'],
    sources: [
      {
        title: 'Python Software Foundation',
        url: 'https://python.org',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'skill-financial-accounting',
    name: 'Financial Accounting & Reporting',
    shortName: 'Financial Accounting',
    type: 'SKILL',
    category: 'Commerce',
    aliases: ['Financial Accounting', 'Accounting', 'Corporate Reporting', 'Bookkeeping'],
    description: 'Preparation and presentation of financial statements, balance sheets, cash flow statements, and profit & loss accounts in compliance with Accounting Standards (Ind AS / IFRS).',
    overview: 'Core commercial skill required for corporate financial health monitoring, audit readiness, and tax computation.',
    requiredSkills: [],
    relatedStudies: ['B.Com', 'M.Com', 'CA', 'CMA', 'BBA'],
    relatedJobs: ['Accountant', 'Financial Analyst', 'Tax Consultant', 'Auditor'],
    sources: [
      {
        title: 'Ministry of Corporate Affairs (MCA) Accounting Standards',
        url: 'https://mca.gov.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  }
];
