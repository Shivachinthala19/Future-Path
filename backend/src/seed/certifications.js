/**
 * ==============================================================================
 * FUTURE PATH — MASTER INDUSTRY & PROFESSIONAL CERTIFICATIONS DATASET
 * ==============================================================================
 * Global credentials across Cloud, Security, Finance, Project Management, and Data.
 * ==============================================================================
 */

export const structuredCertifications = [
  // --------------------------------------------------------------------------
  // FINANCE & ACCOUNTING
  // --------------------------------------------------------------------------
  {
    id: 'cert-ca',
    name: 'Chartered Accountancy (CA)',
    shortName: 'CA',
    type: 'CERTIFICATION',
    category: 'Commerce & Accounting',
    aliases: ['Chartered Accountancy', 'CA', 'ICAI CA', 'Chartered Accountant'],
    organization: 'Institute of Chartered Accountants of India (ICAI)',
    description: 'Statutory professional qualification granting exclusive license to conduct statutory financial audits, sign balance sheets, and provide corporate taxation counsel in India.',
    overview: 'Three-tiered credential (Foundation, Intermediate, Final) accompanied by 2-3 years of practical articleship under a practicing Chartered Accountant.',
    eligibility: {
      qualification: '10+2 (Foundation route) OR Commerce Graduate with min 55% / Other Graduate with min 60% (Direct Entry to Intermediate)',
      streams: ['Commerce', 'Any Stream']
    },
    duration: '3 to 5 Years',
    skills: ['Auditing', 'Financial Reporting (Ind AS/IFRS)', 'Taxation (GST & Income Tax)', 'Corporate Law'],
    officialSource: 'Institute of Chartered Accountants of India (ICAI)',
    notificationUrl: 'https://icai.org',
    sources: [{ title: 'ICAI Official Portal', url: 'https://icai.org', sourceType: 'PROFESSIONAL_BODY', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-cfa',
    name: 'Chartered Financial Analyst (CFA)',
    shortName: 'CFA',
    type: 'CERTIFICATION',
    category: 'Investment & Finance',
    aliases: ['CFA', 'Chartered Financial Analyst', 'CFA Institute Charter'],
    organization: 'CFA Institute (USA)',
    description: 'Globally recognized gold standard charter for investment management, equity research, asset portfolio allocation, and ethical financial analysis.',
    overview: 'Comprises three rigorous computer-based examination levels (Level I, Level II, Level III) and mandatory 4,000 hours of qualified investment work experience.',
    eligibility: {
      qualification: 'Hold a bachelor’s degree or be in final year of undergraduate studies. International passport required.',
      streams: ['Any Stream']
    },
    duration: '2 to 3 Years',
    skills: ['Equity Valuation', 'Fixed Income Analysis', 'Portfolio Management', 'Derivatives & Alternative Investments'],
    officialSource: 'CFA Institute',
    notificationUrl: 'https://cfainstitute.org',
    sources: [{ title: 'CFA Institute Global Portal', url: 'https://cfainstitute.org', sourceType: 'PROFESSIONAL_BODY', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-frm',
    name: 'Financial Risk Manager (FRM)',
    shortName: 'FRM',
    type: 'CERTIFICATION',
    category: 'Risk & Capital Markets',
    aliases: ['FRM', 'Financial Risk Manager', 'GARP FRM'],
    organization: 'Global Association of Risk Professionals (GARP)',
    description: 'The premier global certification for financial risk management professionals, recognized by international investment banks and regulators.',
    overview: 'Two-part rigorous examination assessing credit risk, market risk, operational risk, liquidity risk, and quantitative risk modeling.',
    duration: '1 to 2 Years',
    skills: ['Market Risk Modeling', 'Credit Risk Analysis', 'Value at Risk (VaR)', 'Basel Capital Framework'],
    officialSource: 'GARP',
    notificationUrl: 'https://garp.org/frm',
    sources: [{ title: 'GARP FRM Portal', url: 'https://garp.org/frm', sourceType: 'PROFESSIONAL_BODY', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-acca',
    name: 'ACCA (Association of Chartered Certified Accountants)',
    shortName: 'ACCA',
    type: 'CERTIFICATION',
    category: 'Commerce & Accounting',
    aliases: ['ACCA', 'Global Chartered Accountant', 'ACCA UK'],
    organization: 'ACCA Global (United Kingdom)',
    description: 'Global body for professional accountants with recognition across 180+ countries for audit, strategic business leadership, and international taxation.',
    overview: '13 examinations across Applied Knowledge, Applied Skills, and Strategic Professional modules, alongside 36 months of supervised work experience.',
    duration: '2 to 3 Years',
    skills: ['Strategic Business Reporting', 'Audit & Assurance', 'Financial Management', 'Performance Management'],
    officialSource: 'ACCA Global',
    notificationUrl: 'https://accaglobal.com',
    sources: [{ title: 'ACCA Global Official Portal', url: 'https://accaglobal.com', sourceType: 'PROFESSIONAL_BODY', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // CLOUD & DEVOPS
  // --------------------------------------------------------------------------
  {
    id: 'cert-aws-solution-architect',
    name: 'AWS Certified Solutions Architect - Associate',
    shortName: 'AWS Solutions Architect',
    type: 'CERTIFICATION',
    category: 'Cloud Infrastructure',
    aliases: ['AWS Solutions Architect', 'AWS SAA-C03', 'AWS Associate', 'Amazon Web Services Certified'],
    organization: 'Amazon Web Services (AWS)',
    description: 'Industry standard cloud credential validating ability to design cost-efficient, fault-tolerant, secure, and scalable distributed systems on AWS cloud.',
    overview: 'Evaluates multi-tier architectures, VPC networking, compute (EC2/Lambda), storage (S3/EBS), database (RDS/DynamoDB), and IAM security.',
    duration: '2 - 3 Months Preparation',
    skills: ['AWS VPC Networking', 'High Availability Architecture', 'EC2 & Lambda Compute', 'S3 & Storage Systems', 'IAM Cloud Security'],
    officialSource: 'Amazon Web Services',
    notificationUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    sources: [{ title: 'AWS Certification Portal', url: 'https://aws.amazon.com/certification/', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-azure-solutions-architect',
    name: 'Microsoft Certified: Azure Solutions Architect Expert',
    shortName: 'Azure Solutions Architect',
    type: 'CERTIFICATION',
    category: 'Cloud Infrastructure',
    aliases: ['Azure Architect', 'AZ-305', 'Microsoft Azure Certified'],
    organization: 'Microsoft',
    description: 'Demonstrates expert knowledge in designing cloud and hybrid enterprise solutions that run on Microsoft Azure, including compute, network, storage, and security.',
    overview: 'Validates architectural decisions for governance, data storage, business continuity, and infrastructure virtualization.',
    duration: '3 Months Preparation',
    skills: ['Azure Resource Manager', 'Azure Active Directory (Entra ID)', 'Virtual Networks & ExpressRoute', 'Cosmos DB & Azure SQL'],
    officialSource: 'Microsoft Learn',
    notificationUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/',
    sources: [{ title: 'Microsoft Credentials Portal', url: 'https://learn.microsoft.com', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-gcp-cloud-architect',
    name: 'Google Cloud Professional Cloud Architect',
    shortName: 'GCP Cloud Architect',
    type: 'CERTIFICATION',
    category: 'Cloud Infrastructure',
    aliases: ['Google Cloud Architect', 'GCP Architect', 'GCP PCA'],
    organization: 'Google Cloud',
    description: 'Validates ability to leverage Google Cloud technologies to design robust, secure, scalable, highly available, and dynamic enterprise solutions.',
    overview: 'Comprehensive scenario-based examination testing enterprise migration, BigQuery analytics, Kubernetes Engine (GKE), and IAM security.',
    duration: '3 Months Preparation',
    skills: ['Google Kubernetes Engine (GKE)', 'BigQuery & Dataflow', 'Cloud IAM & Security', 'VPC & Hybrid Interconnect'],
    officialSource: 'Google Cloud',
    notificationUrl: 'https://cloud.google.com/certification/cloud-architect',
    sources: [{ title: 'Google Cloud Certification Portal', url: 'https://cloud.google.com/certification', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-cka',
    name: 'Certified Kubernetes Administrator (CKA)',
    shortName: 'CKA',
    type: 'CERTIFICATION',
    category: 'DevOps & Containers',
    aliases: ['CKA', 'Kubernetes Administrator', 'Linux Foundation CKA'],
    organization: 'Cloud Native Computing Foundation (CNCF) & The Linux Foundation',
    description: 'Hands-on performance-based exam proving real-world competence in installing, configuring, managing, and troubleshooting production Kubernetes clusters.',
    overview: '100% practical terminal assessment solving live cluster networking, pod scheduling, persistent volume management, and cluster upgrades.',
    duration: '2 - 3 Months Preparation',
    skills: ['Kubernetes Cluster Architecture', 'Pod Scheduling & ReplicaSets', 'Cluster Networking (CNI)', 'Persistent Storage Volumes (PV/PVC)'],
    officialSource: 'The Linux Foundation',
    notificationUrl: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/',
    sources: [{ title: 'Linux Foundation Training', url: 'https://training.linuxfoundation.org', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // CYBERSECURITY & NETWORKING
  // --------------------------------------------------------------------------
  {
    id: 'cert-cissp',
    name: 'CISSP (Certified Information Systems Security Professional)',
    shortName: 'CISSP',
    type: 'CERTIFICATION',
    category: 'Cybersecurity',
    aliases: ['CISSP', 'ISC2 CISSP', 'Chief Information Security Officer Credential'],
    organization: '(ISC)² International Information System Security Certification Consortium',
    description: 'The world’s most recognized cybersecurity credential validating deep technical and managerial competence to design, engineer, and manage overall security posture.',
    overview: 'Evaluates 8 security domains: Security & Risk Management, Asset Security, Security Architecture, Communication & Network Security, Identity & Access, Assessment, Operations, and Software Development Security.',
    duration: '4 - 6 Months Study + 5 Years Professional Experience Requirement',
    skills: ['Security Governance & Risk Management', 'Cryptography & PKI', 'Network Security Architecture', 'Incident Response & Disaster Recovery'],
    officialSource: '(ISC)²',
    notificationUrl: 'https://isc2.org/certifications/cissp',
    sources: [{ title: '(ISC)² CISSP Portal', url: 'https://isc2.org', sourceType: 'PROFESSIONAL_BODY', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-ceh',
    name: 'Certified Ethical Hacker (CEH v12)',
    shortName: 'CEH',
    type: 'CERTIFICATION',
    category: 'Cybersecurity',
    aliases: ['CEH', 'Ethical Hacker', 'Penetration Testing Credential', 'EC-Council CEH'],
    organization: 'EC-Council',
    description: 'Premier cybersecurity credential teaching identical tools and techniques used by malicious hackers to legally audit, test, and secure corporate networks.',
    overview: 'Covers reconnaissance, network scanning, vulnerability analysis, system hacking, malware threats, sniffing, social engineering, and web application attack vectors.',
    duration: '2 - 3 Months Preparation',
    skills: ['Penetration Testing', 'Network Scanning (Nmap)', 'Web Application Hacking (Burp Suite)', 'Vulnerability Assessment'],
    officialSource: 'EC-Council',
    notificationUrl: 'https://eccouncil.org/programs/certified-ethical-hacker-ceh/',
    sources: [{ title: 'EC-Council Official Portal', url: 'https://eccouncil.org', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-ccna',
    name: 'Cisco Certified Network Associate (CCNA)',
    shortName: 'CCNA',
    type: 'CERTIFICATION',
    category: 'Networking & Infrastructure',
    aliases: ['CCNA', 'Cisco CCNA', 'Cisco Network Associate'],
    organization: 'Cisco Systems',
    description: 'Foundational certification proving mastery of network fundamentals, IP connectivity, IP services, security fundamentals, and network automation.',
    overview: 'Tests real-world router/switch configuration, IPv4/IPv6 subnetting, VLANs, routing protocols (OSPF), wireless LANs, and network programmability with Python/REST APIs.',
    duration: '2 - 3 Months Preparation',
    skills: ['IPv4 & IPv6 Subnetting', 'Routing Protocols (OSPF)', 'VLANs & Trunking', 'Network Access & Security', 'Automation & Programmability'],
    officialSource: 'Cisco Learning Network',
    notificationUrl: 'https://cisco.com/c/en/us/training-events/career-certifications/associate/ccna.html',
    sources: [{ title: 'Cisco CCNA Portal', url: 'https://cisco.com', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // DATA & ANALYTICS
  // --------------------------------------------------------------------------
  {
    id: 'cert-pl-300',
    name: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
    shortName: 'Power BI Data Analyst (PL-300)',
    type: 'CERTIFICATION',
    category: 'Data & Analytics',
    aliases: ['PL-300', 'Power BI Certification', 'Microsoft Power BI Associate'],
    organization: 'Microsoft',
    description: 'Industry benchmark credential demonstrating mastery in preparing, modeling, visualizing, and analyzing business data using Microsoft Power BI.',
    overview: 'Validates skills in Power Query ETL, dimensional star schemas, DAX measures, interactive dashboard storytelling, and Power BI Service administration.',
    duration: '1 - 2 Months Preparation',
    skills: ['Power BI Desktop & Service', 'Data Modeling (Star Schema)', 'DAX (Data Analysis Expressions)', 'Data Transformation (Power Query)'],
    officialSource: 'Microsoft Learn',
    notificationUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/',
    sources: [{ title: 'Microsoft PL-300 Official Portal', url: 'https://learn.microsoft.com', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-google-data-analytics',
    name: 'Google Data Analytics Professional Certificate',
    shortName: 'Google Data Analytics',
    type: 'CERTIFICATION',
    category: 'Data & Analytics',
    aliases: ['Google Data Analytics', 'Coursera Google Analytics Certificate'],
    organization: 'Google / Coursera',
    description: 'Comprehensive 8-course foundational training program preparing individuals for entry-level data analyst positions without prior technical background.',
    overview: 'Hands-on curriculum covering spreadsheet data analysis, SQL queries, Tableau visualization, and statistical programming with R.',
    duration: '3 to 6 Months Self-Paced',
    skills: ['Data Cleaning & QA', 'SQL Queries (BigQuery)', 'Tableau Dashboards', 'R Programming Fundamentals'],
    officialSource: 'Google Career Certificates',
    notificationUrl: 'https://grow.google/certificates/data-analytics/',
    sources: [{ title: 'Google Grow Career Certificates', url: 'https://grow.google', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // PROJECT & PRODUCT MANAGEMENT
  // --------------------------------------------------------------------------
  {
    id: 'cert-pmp',
    name: 'PMP (Project Management Professional)',
    shortName: 'PMP',
    type: 'CERTIFICATION',
    category: 'Project Management',
    aliases: ['PMP', 'PMI PMP', 'Project Management Professional'],
    organization: 'Project Management Institute (PMI)',
    description: 'The world’s leading project management certification, proving ability to lead projects using Predictive (Waterfall), Agile, and Hybrid methodologies.',
    overview: 'Rigorous 180-question assessment across People (conflict management, team leadership), Process (budget, scope, risk, schedule), and Business Environment domains.',
    duration: '3 - 4 Months Study + 36 Months Project Leadership Experience',
    skills: ['Agile & Scrum Methodologies', 'Predictive Project Planning', 'Budget & Resource Management', 'Risk Assessment & Mitigation'],
    officialSource: 'Project Management Institute',
    notificationUrl: 'https://pmi.org/certifications/project-management-pmp',
    sources: [{ title: 'PMI Official Portal', url: 'https://pmi.org', sourceType: 'PROFESSIONAL_BODY', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },
  {
    id: 'cert-csm',
    name: 'Certified ScrumMaster (CSM)',
    shortName: 'CSM',
    type: 'CERTIFICATION',
    category: 'Project Management & Agile',
    aliases: ['CSM', 'Scrum Master', 'Scrum Alliance CSM'],
    organization: 'Scrum Alliance',
    description: 'Globally recognized credential certifying proficiency in Scrum framework, sprint planning, servant leadership, and agile team facilitation.',
    overview: 'Interactive training and examination covering Scrum roles (Scrum Master, Product Owner, Developers), artifacts (Product Backlog, Sprint Backlog), and events (Daily Scrum, Sprint Retrospective).',
    duration: '2-Day Workshop + Certification Exam',
    skills: ['Scrum Framework & Artifacts', 'Sprint Planning & Retrospectives', 'Agile Coaching & Facilitation', 'Impediment Removal'],
    officialSource: 'Scrum Alliance',
    notificationUrl: 'https://scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster',
    sources: [{ title: 'Scrum Alliance Portal', url: 'https://scrumalliance.org', sourceType: 'PROFESSIONAL_BODY', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  }
];
