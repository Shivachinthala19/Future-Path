/**
 * Structured Career Domains Seed Data
 */

export const structuredCareers = [
  {
    id: 'career-data-analytics',
    name: 'Data Analytics & Business Intelligence',
    shortName: 'Data Analytics',
    type: 'CAREER',
    category: 'Technology',
    aliases: ['Data Analytics', 'Business Intelligence', 'Analytics Career', 'Data Analysis'],
    description: 'The domain of extracting, synthesizing, and interpreting quantitative datasets to drive organizational strategy and product growth.',
    overview: 'High-growth multidisciplinary field combining computational statistics, business strategy, database querying, and dashboard design across e-commerce, banking, healthcare, and consulting.',
    growthOutlook: '28% projected decade growth (High Demand)',
    salaryRange: {
      min: 450000,
      max: 1800000,
      currency: 'INR',
      formatted: '₹4.5 - ₹18.0 LPA'
    },
    requiredSkills: ['SQL', 'Excel', 'Power BI / Tableau', 'Python', 'Statistical Modeling'],
    relatedStudies: ['B.Com', 'B.Sc Statistics', 'B.Tech CSE', 'BCA', 'M.Sc Data Science', 'MBA Analytics'],
    relatedJobs: ['Data Analyst', 'Business Analyst', 'BI Developer', 'Data Engineer', 'Analytics Manager'],
    sources: [
      {
        title: 'NASSCOM IT-BPM Industry Workforce Report',
        url: 'https://nasscom.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'career-software-engineering',
    name: 'Software Engineering & Cloud Systems',
    shortName: 'Software Engineering',
    type: 'CAREER',
    category: 'Computer Science',
    aliases: ['Software Engineering', 'Software Development', 'Web Development', 'Computer Programming'],
    description: 'The engineering discipline of architecting, coding, testing, and deploying scalable software systems, mobile applications, and cloud services.',
    overview: 'Core engine of global technology infrastructure, encompassing frontend web applications, distributed backend microservices, DevOps pipelines, and cloud native architectures.',
    growthOutlook: '25% projected decade growth (Very High Demand)',
    salaryRange: {
      min: 550000,
      max: 3000000,
      currency: 'INR',
      formatted: '₹5.5 - ₹30.0+ LPA'
    },
    requiredSkills: ['DSA', 'JavaScript / TypeScript', 'Python / Java', 'Databases', 'Cloud Infrastructure'],
    relatedStudies: ['B.Tech CSE', 'BCA', 'MCA', 'B.Sc CS', 'M.Tech CSE'],
    relatedJobs: ['Software Developer', 'Full Stack Engineer', 'Backend Engineer', 'Cloud Architect', 'DevOps Engineer'],
    sources: [
      {
        title: 'Ministry of Electronics and Information Technology (MeitY)',
        url: 'https://meity.gov.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'career-corporate-finance',
    name: 'Corporate Finance & Investment Banking',
    shortName: 'Corporate Finance',
    type: 'CAREER',
    category: 'Commerce',
    aliases: ['Corporate Finance', 'Investment Banking', 'Financial Markets', 'Banking & Finance'],
    description: 'Management of corporate capital structure, mergers and acquisitions, equity valuation, portfolio asset management, and commercial banking.',
    overview: 'High-stakes financial domain driving corporate capital deployment, securities trading, treasury operations, and strategic advisory.',
    growthOutlook: '18% projected decade growth',
    salaryRange: {
      min: 500000,
      max: 3500000,
      currency: 'INR',
      formatted: '₹5.0 - ₹35.0+ LPA'
    },
    requiredSkills: ['Financial Modeling', 'DCF Valuation', 'Corporate Accounting', 'Excel', 'Securities Regulation'],
    relatedStudies: ['B.Com', 'BBA', 'MBA Finance', 'CA', 'CFA', 'CMA', 'CS'],
    relatedJobs: ['Financial Analyst', 'Investment Banker', 'Equity Research Associate', 'Treasury Manager', 'CFO'],
    sources: [
      {
        title: 'Securities and Exchange Board of India (SEBI)',
        url: 'https://sebi.gov.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  }
];
