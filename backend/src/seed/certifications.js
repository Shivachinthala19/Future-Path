/**
 * Structured Certifications & Professional Credentials Seed Data
 */

export const structuredCertifications = [
  {
    id: 'cert-ca',
    name: 'Chartered Accountancy (CA)',
    shortName: 'CA',
    type: 'CERTIFICATION',
    category: 'Commerce',
    aliases: ['Chartered Accountancy', 'CA', 'ICAI CA', 'Chartered Accountant'],
    organization: 'Institute of Chartered Accountants of India (ICAI)',
    description: 'Statutory professional qualification granting exclusive license to conduct statutory financial audits, sign balance sheets, and provide corporate taxation counsel in India.',
    overview: 'Three-tiered credential (Foundation, Intermediate, Final) accompanied by 2-3 years of practical articleship under a practicing Chartered Accountant.',
    eligibility: {
      qualification: '10+2 (Foundation route) OR Commerce Graduate with min 55% / Other Graduate with min 60% (Direct Entry to Intermediate)',
      streams: ['Commerce', 'Any Stream']
    },
    duration: '3 to 5 Years',
    officialSource: 'Institute of Chartered Accountants of India (ICAI)',
    notificationUrl: 'https://icai.org',
    sources: [
      {
        title: 'ICAI Official Portal',
        url: 'https://icai.org',
        sourceType: 'PROFESSIONAL_BODY',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-cfa',
    name: 'Chartered Financial Analyst (CFA)',
    shortName: 'CFA',
    type: 'CERTIFICATION',
    category: 'Finance',
    aliases: ['CFA', 'Chartered Financial Analyst', 'CFA Institute Charter'],
    organization: 'CFA Institute (USA)',
    description: 'Globally recognized gold standard charter for investment management, equity research, asset portfolio allocation, and ethical financial analysis.',
    overview: 'Comprises three rigorous computer-based examination levels (Level I, Level II, Level III) and mandatory 4,000 hours of qualified investment work experience.',
    eligibility: {
      qualification: 'Hold a bachelor’s degree or be in final year of undergraduate studies. International passport required.',
      streams: ['Any Stream']
    },
    duration: '2 to 3 Years',
    officialSource: 'CFA Institute',
    notificationUrl: 'https://cfainstitute.org',
    sources: [
      {
        title: 'CFA Institute Global Portal',
        url: 'https://cfainstitute.org',
        sourceType: 'PROFESSIONAL_BODY',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-aws-solution-architect',
    name: 'AWS Certified Solutions Architect - Associate',
    shortName: 'AWS Solutions Architect',
    type: 'CERTIFICATION',
    category: 'Cloud',
    aliases: ['AWS Solutions Architect', 'AWS SAA-C03', 'AWS Associate', 'Amazon Web Services Certified'],
    organization: 'Amazon Web Services (AWS)',
    description: 'Industry standard cloud credential validating ability to design cost-efficient, fault-tolerant, secure, and scalable distributed systems on AWS cloud.',
    overview: 'Evaluates multi-tier architectures, VPC networking, compute (EC2/Lambda), storage (S3/EBS), database (RDS/DynamoDB), and IAM security.',
    duration: '2 - 3 Months Preparation',
    officialSource: 'Amazon Web Services Training & Certification',
    notificationUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    sources: [
      {
        title: 'AWS Certification Portal',
        url: 'https://aws.amazon.com/certification/',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  }
];
