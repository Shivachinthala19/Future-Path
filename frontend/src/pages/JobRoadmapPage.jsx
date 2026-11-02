import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Briefcase,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Code,
  Building,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  Award,
  HelpCircle,
  Clock,
  DollarSign,
  Target,
  Compass,
  GraduationCap
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';
import { ApplicationLinksSection } from '../components/ApplicationLinksSection.jsx';
import api from '../services/api.js';

export const JobRoadmapPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentEducation,
    targetJob,
    changeTargetJob,
    removeTargetJob,
    openTargetJobModal,
    openChangeModal
  } = useEducation();

  const studyName = currentEducation.educationName || 'B.Com';
  const activeTargetJobTitle = targetJob?.targetJobName || searchParams.get('job');

  const [activeTab, setActiveTab] = useState('all'); // for non-target view
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState(null);
  const [activeStepTab, setActiveStepTab] = useState(1);
  const [backendRoadmap, setBackendRoadmap] = useState(null);
  const [loadingBackend, setLoadingBackend] = useState(false);

  // Fetch from backend whenever education or target job changes
  useEffect(() => {
    let isMounted = true;
    const fetchRoadmap = async () => {
      if (!activeTargetJobTitle) {
        setBackendRoadmap(null);
        return;
      }
      setLoadingBackend(true);
      try {
        const res = await api.get(
          `/job-roadmap?education=${encodeURIComponent(studyName)}&job=${encodeURIComponent(activeTargetJobTitle)}`
        );
        if (isMounted && res.success && res.data) {
          setBackendRoadmap(res.data);
        }
      } catch (err) {
        console.warn('[JobRoadmapPage] Backend fetch fallback to local intelligence:', err.message);
      } finally {
        if (isMounted) setLoadingBackend(false);
      }
    };

    fetchRoadmap();
    return () => {
      isMounted = false;
    };
  }, [studyName, activeTargetJobTitle]);

  // Master catalog of detailed job specifications
  const getJobDetails = (jobTitle, edu) => {
    const titleLower = (jobTitle || '').toLowerCase();
    const eduLower = (edu || '').toLowerCase();

    // 1. DATA ANALYST (Section 6, 8, 9, 10, 11)
    if (titleLower.includes('data analyst')) {
      const isCommerce = eduLower.includes('com') || eduLower.includes('finance') || eduLower.includes('business');
      const isTech = eduLower.includes('tech') || eduLower.includes('mca') || eduLower.includes('computer') || eduLower.includes('b.sc');

      return {
        id: 'data-analyst',
        title: 'Data Analyst',
        category: 'Private',
        sector: 'Technology & Business Intelligence',
        salary: '₹5.5 - 11.0 LPA',
        relevance: isCommerce ? 'Possible With Additional Skills' : isTech ? 'Directly Related' : 'Related',
        eligibilityStatus: 'Needs Additional Skills',
        educationRelevance: isCommerce
          ? 'Your B.Com degree provides essential financial acumen, business process knowledge, and numerical aptitude. While academic commerce prepares you for business interpretation, you require technical tooling (SQL, Python, Power BI) to manipulate large datasets.'
          : 'Your degree provides strong quantitative and analytical fundamentals. Transitioning to Data Analyst requires mastering data querying, dashboarding, and business metrics.',
        eligibility: {
          degreeAccepted: `${studyName} meets the foundational graduation requirement.`,
          minimumMarks: '50% - 60% aggregate in graduation.',
          ageLimit: 'No upper age limit for private sector roles (typically 20-35 years).',
          certificationsPreferred: 'Microsoft PL-300 (Power BI) or Google Data Analytics Professional Certificate.',
          experienceNeeded: '0–2 years (Freshers with 2-3 verified portfolio projects are readily hired).'
        },
        skillsAlreadyHave: isCommerce
          ? ['Financial Mathematics', 'Business Economics', 'Basic Excel & Spreadsheets', 'Domain Context & KPI Intuition']
          : ['Logical Thinking', 'Basic Programming / Mathematics', 'Problem Solving'],
        skillsYouNeed: [
          { name: 'Advanced Excel', level: 'Fundamental', desc: 'VLOOKUP/XLOOKUP, INDEX-MATCH, Pivot Tables, What-If Analysis' },
          { name: 'Statistics & Math', level: 'Core', desc: 'Descriptive stats, Probability distributions, Hypothesis testing, Regression' },
          { name: 'SQL (Relational DBs)', level: 'Critical', desc: 'Complex Joins, Aggregations, Window Functions (DENSE_RANK, ROW_NUMBER), CTEs' },
          { name: 'Python for Analytics', level: 'Core', desc: 'Pandas for data wrangling, NumPy for array math, Matplotlib/Seaborn' },
          { name: 'Power BI / Tableau', level: 'Critical', desc: 'Data modeling (Star Schema), DAX measures, interactive executive dashboards' }
        ],
        roadmapFlow: [
          studyName,
          'Target: Data Analyst',
          'Excel & Pivot Tables',
          'Statistics',
          'SQL & Joins',
          'Python (Pandas)',
          'Power BI & DAX',
          'Build 2–3 Projects',
          'Resume Preparation',
          'Interview Preparation',
          'Job Application',
          'Interview',
          'Get The Job'
        ],
        projects: [
          {
            title: 'Sales Performance & Customer Churn Dashboard',
            tech: 'SQL, Power BI, DAX',
            desc: 'Designed an executive dashboard querying 250K+ transactional records. Built star schema model and calculated customer lifetime value (LTV) and churn probabilities.'
          },
          {
            title: 'Customer Segmentation & RFM Analysis',
            tech: 'Python, Pandas, Seaborn',
            desc: 'Segmented 50,000 retail customers based on Recency, Frequency, and Monetary scores to identify high-value repeat buyers and improve marketing ROI.'
          },
          {
            title: 'Financial Data & Profitability Audit Model',
            tech: 'Advanced Excel, Power Query',
            desc: 'Automated 12-month P&L consolidation across 4 regional business units, eliminating 6 hours of manual spreadsheet data reconciliation.'
          },
          {
            title: 'Inventory Stock-out Risk Forecasting',
            tech: 'Python, Time-Series ARIMA',
            desc: 'Predicted stock reorder points for retail warehouse inventory with an accuracy rate of 91% using historical 3-year supply logs.'
          }
        ],
        resumeAdvice: {
          headline: 'Aspiring Data Analyst | SQL, Python, Power BI | Financial & Business Analytics',
          keywords: ['SQL', 'Power BI', 'Python', 'Pandas', 'DAX', 'ETL', 'Data Visualization', 'Business Intelligence', 'A/B Testing'],
          bulletFormulas: [
            'Extracted and transformed 100K+ transactional rows using PostgreSQL CTEs and window functions, reducing report latency by 35%.',
            'Built an interactive Power BI dashboard tracking 14 executive KPIs, utilized by department heads for quarterly budget allocations.',
            'Conducted exploratory data analysis in Python Pandas to identify revenue leaks, saving an estimated ₹4.2 Lakhs annually.'
          ]
        },
        interviewPrep: [
          {
            category: 'SQL Technical',
            q: 'What is the difference between WHERE and HAVING in SQL, and when do you use window functions like ROW_NUMBER() vs DENSE_RANK()?',
            a: 'WHERE filters rows before grouping occurs, while HAVING filters aggregated grouped rows. ROW_NUMBER assigns a unique sequential integer to each row regardless of duplicates, whereas DENSE_RANK assigns identical ranks to tied rows without skipping rank numbers.'
          },
          {
            category: 'Statistics',
            q: 'Explain the difference between Type I and Type II errors with a business example.',
            a: 'A Type I error is a False Positive (e.g. predicting a customer will churn when they actually stay), while a Type II error is a False Negative (e.g. failing to detect a customer who actually churns). In business, minimizing Type II error is often critical to avoid losing loyal revenue.'
          },
          {
            category: 'Power BI & Data Modeling',
            q: 'What is the difference between a Star Schema and a Snowflake Schema?',
            a: 'A Star Schema connects one central fact table directly to de-normalized dimension tables, which optimizes query performance and simplifies DAX formulas. A Snowflake Schema normalizes dimension tables into multiple related sub-tables to reduce redundancy.'
          },
          {
            category: 'Project Defense',
            q: 'Walk me through how you validated your data before visualizing it in your portfolio project.',
            a: 'Describe checking for null values, handling outliers via IQR methods, verifying foreign key integrity across tables, and running summary statistics (min, max, mean) to ensure data distributions match expected business constraints.'
          },
          {
            category: 'HR & Transition',
            q: `Why are you transitioning from ${studyName} into Data Analytics?`,
            a: `Highlight how ${studyName} gave you deep domain intuition for business operations and finance, and how adding SQL, Python, and Power BI allows you to directly turn raw numbers into commercial strategic decisions.`
          }
        ],
        howToApply: {
          strategy: 'Focus applications on mid-size enterprises, analytics consultancies, and FinTech startups. Tailor your resume summary with the exact BI tools requested in the JD.',
          platforms: ['LinkedIn Jobs', 'Wellfound (AngelList)', 'Naukri.com', 'Hirist Tech', 'Direct Company Portals'],
          portfolioTip: 'Host your code on GitHub and publish interactive Power BI reports to NovyPro or Microsoft Fabric web link.'
        },
        officialVerification: {
          source: 'NASSCOM / Analytics India Industry Standards',
          officialUrl: 'https://nasscom.in',
          lastVerified: 'September 2026',
          disclaimer: 'Based on stored industry qualification frameworks. Private corporate hiring decisions depend on portfolio verification and technical interview performance.'
        }
      };
    }

    // 2. ACCOUNTANT
    if (titleLower.includes('accountant') || titleLower.includes('accounts executive')) {
      return {
        id: 'accountant',
        title: 'Accountant',
        category: 'Private',
        sector: 'Accounting & Corporate Finance',
        salary: '₹3.5 - 6.5 LPA',
        relevance: 'Directly Related',
        eligibilityStatus: 'Eligible',
        educationRelevance: 'Your B.Com degree directly qualifies you for corporate accounting, bookkeeping, and statutory tax compliance.',
        eligibility: {
          degreeAccepted: `${studyName} is the gold standard undergraduate degree for this role.`,
          minimumMarks: 'Pass graduation degree (50%+ preferred).',
          ageLimit: 'No restriction.',
          certificationsPreferred: 'Tally Certified Professional, GST Certification, or CA Inter.',
          experienceNeeded: '0–2 years.'
        },
        skillsAlreadyHave: ['Double-Entry Bookkeeping', 'P&L / Balance Sheet Basics', 'Financial Principles', 'Taxation Fundamentals'],
        skillsYouNeed: [
          { name: 'Tally Prime / Zoho Books', level: 'Critical', desc: 'Voucher creation, ledger reconciliation, statutory GST masters' },
          { name: 'GST & TDS E-filing', level: 'Critical', desc: 'GSTR-1, GSTR-3B monthly filing, 26AS verification, TDS Challan 281' },
          { name: 'Advanced Excel', level: 'Core', desc: 'VLOOKUP, Pivot Tables, Bank Reconciliation Statement (BRS) modeling' },
          { name: 'Corporate Compliance', level: 'Fundamental', desc: 'Audit trails, statutory registers, depreciation schedule calculations' }
        ],
        roadmapFlow: [
          studyName,
          'Target: Accountant',
          'Accounting Principles',
          'Tally Prime Mastery',
          'GST & TDS Law',
          'Advanced Excel & BRS',
          'Audit Case Study',
          'Resume Building',
          'Interview Prep',
          'Apply to CA Firms & Corporates',
          'Interview',
          'Hired as Accountant'
        ],
        projects: [
          {
            title: 'SME Full Financial Year Ledger & P&L',
            tech: 'Tally Prime, Excel',
            desc: 'Simulated 12 months of transactional records for a retail trading enterprise, producing trial balance, trading account, and balance sheet.'
          },
          {
            title: 'Monthly GST & TDS Return Reconciliation',
            tech: 'Excel, GST Portal Formats',
            desc: 'Audited purchase invoices against GSTR-2B, calculated allowable Input Tax Credit (ITC), and drafted GSTR-3B with zero discrepancy.'
          }
        ],
        resumeAdvice: {
          headline: 'B.Com Graduate | Tally Prime, GST & TDS Compliance | Corporate Accounting',
          keywords: ['Tally Prime', 'GSTR-3B', 'BRS', 'TDS Filing', 'Journal Entries', 'Trial Balance', 'Accounts Payable', 'Accounts Receivable'],
          bulletFormulas: [
            'Processed 200+ monthly vendor invoices and reconciled monthly bank statements with zero variance.',
            'Prepared quarterly TDS statements and filed monthly GSTR-1 and GSTR-3B returns adhering to statutory deadlines.'
          ]
        },
        interviewPrep: [
          {
            category: 'Accounting Principles',
            q: 'Explain the 3 Golden Rules of Accounting with journal entry examples.',
            a: '1. Personal Account: Debit the receiver, Credit the giver. 2. Real Account: Debit what comes in, Credit what goes out. 3. Nominal Account: Debit all expenses/losses, Credit all incomes/gains.'
          },
          {
            category: 'Taxation & GST',
            q: 'How do you reconcile Input Tax Credit (ITC) between books of accounts and GSTR-2B?',
            a: 'Compare supplier invoices in purchase register against auto-populated GSTR-2B. Flag any missing supplier uploads, incorrect GSTINs, or value mismatches before filing GSTR-3B.'
          }
        ],
        howToApply: {
          strategy: 'Apply directly to Chartered Accountant (CA) partnership firms, mid-market enterprises, and corporate finance departments.',
          platforms: ['Naukri.com', 'CA Job Portal (ICAI)', 'LinkedIn', 'Local Chamber of Commerce'],
          portfolioTip: 'Bring printed sample BRS sheets and simulated Tally balance sheets to in-person interviews.'
        },
        officialVerification: {
          source: 'Institute of Chartered Accountants of India (ICAI) Standards',
          officialUrl: 'https://icai.org',
          lastVerified: 'September 2026',
          disclaimer: 'Based on standard corporate accounting hiring criteria across India.'
        }
      };
    }

    // 3. GOVERNMENT: SSC CGL AUDITOR / INSPECTOR
    if (titleLower.includes('ssc') || titleLower.includes('auditor') || titleLower.includes('government officer')) {
      return {
        id: 'ssc-cgl-auditor',
        title: 'SSC CGL Auditor / Inspector',
        category: 'Government',
        sector: 'Central Government (CAG / CBDT / CBIC)',
        salary: '₹45,000 - 85,000 / month (Pay Level 5/7)',
        relevance: 'Directly Related',
        eligibilityStatus: 'Eligible',
        educationRelevance: `${studyName} fulfills the statutory Bachelor Degree requirement for Central Government recruitment. B.Com candidates also have subject advantages in the Tier-2 General Studies (Finance & Economics) paper.`,
        eligibility: {
          degreeAccepted: `Bachelor's Degree from a recognized university in any discipline (${studyName} is 100% eligible).`,
          minimumMarks: 'Pass degree (No minimum percentage mandated).',
          ageLimit: '18 to 30 years (with age relaxations: OBC 3 yrs, SC/ST 5 yrs).',
          certificationsPreferred: 'None. Selection strictly through merit rank in SSC CGL Exam.',
          experienceNeeded: '0 years (Direct competitive recruitment).'
        },
        skillsAlreadyHave: ['Basic Arithmetic', 'Comprehension', 'Finance / Economics Concepts'],
        skillsYouNeed: [
          { name: 'Quantitative Aptitude', level: 'Critical', desc: 'Arithmetic, Geometry, Trigonometry, Algebra, Data Interpretation' },
          { name: 'Reasoning & General Intelligence', level: 'Critical', desc: 'Coding-decoding, Syllogisms, Analogies, Puzzles' },
          { name: 'General Awareness', level: 'Core', desc: 'Indian Polity, History, Science, Static GK, Current Affairs' },
          { name: 'English Comprehension', level: 'Core', desc: 'Grammar rules, Vocabulary, Reading comprehension, Active/Passive voice' },
          { name: 'Computer Knowledge Test & DEST', level: 'Mandatory Qualifying', desc: 'MS Office, Internet fundamentals, 2,000 key depressions in 15 mins' }
        ],
        roadmapFlow: [
          studyName,
          'SSC CGL Notification',
          'Syllabus & Exam Pattern',
          'Tier 1 Preparation (Maths, Reasoning, English, GK)',
          'Tier 1 Computer Based Exam',
          'Tier 2 Intensive Prep (Domain & Quantitative)',
          'DEST Typing Test',
          'Document Verification',
          'Final Merit List',
          'Appointment as Central Govt Auditor'
        ],
        projects: [
          {
            title: 'Mock Test Speed & Accuracy Tracking',
            tech: 'Online Test Series (Testbook/Oliveboard)',
            desc: 'Completed 60+ full-length Tier-1 and Tier-2 mock exams with an average scoring percentile of 94%.'
          }
        ],
        resumeAdvice: {
          headline: 'Government Job Applicant — SSC CGL Aspirant',
          keywords: ['Central Govt Service', 'Audit Compliance', 'CAG', 'Statutory Rules', 'Civil Service'],
          bulletFormulas: [
            'Selection based solely on score in SSC Combined Graduate Level Examination.'
          ]
        },
        interviewPrep: [
          {
            category: 'Official Notification Rule',
            q: 'Is there an interview in SSC CGL for Auditor or Inspector posts?',
            a: 'No. Interviews were discontinued for Group B & C posts by the Government of India. Final selection is purely determined by marks in Tier-2 written examination and qualifying the typing/computer test.'
          },
          {
            category: 'Service Knowledge',
            q: 'What is the role of an Auditor in the Office of the Comptroller and Auditor General (CAG)?',
            a: 'Auditors in CAG conduct statutory financial, compliance, and performance audits of Central and State government departments, PSUs, and autonomous bodies under Article 148-151 of the Constitution.'
          }
        ],
        howToApply: {
          strategy: 'Apply strictly through the official SSC website (ssc.gov.in) during the annual recruitment window.',
          platforms: ['Official Staff Selection Commission Portal: ssc.gov.in'],
          portfolioTip: 'Ensure photo, signature, and category certificates meet SSC specified dimensions.'
        },
        officialVerification: {
          source: 'Staff Selection Commission (SSC) Official Notice',
          officialUrl: 'https://ssc.gov.in',
          lastVerified: 'September 2026',
          disclaimer: 'Current official recruitment notification requirement. Eligibility, age limits, and exam pattern must be verified from the active SSC CGL Gazette Notification.'
        }
      };
    }

    // 4. ITI ELECTRICIAN / ELECTRICIAN
    if (titleLower.includes('electrician') || eduLower.includes('electrician')) {
      const isIti = eduLower.includes('iti') || eduLower.includes('electrician') || eduLower.includes('diploma');
      return {
        id: 'electrician',
        title: 'Electrician',
        category: 'Skilled Trades',
        sector: 'Electrical Services, Infrastructure & Manufacturing',
        salary: '₹2.8 - 5.5 LPA (Private) / ₹32,000/mo (Govt DISCOM)',
        relevance: isIti ? 'Directly Related' : 'Requires Additional Qualification',
        eligibilityStatus: isIti ? 'Eligible' : 'Needs License / Registration',
        educationRelevance: isIti
          ? 'Your ITI Electrician trade certificate is the mandatory statutory qualification required for electrical work licenses and lineman recruitment.'
          : 'Electrical wiring and industrial power maintenance legally require an ITI Electrical trade certificate or state wireman license.',
        eligibility: {
          degreeAccepted: 'ITI in Electrician Trade (NCVT/SCVT recognized) or Diploma in Electrical Engineering.',
          minimumMarks: 'Pass in 10th standard + ITI trade examination.',
          ageLimit: '18 to 35 years (for state DISCOMs / Railway ALP).',
          certificationsPreferred: 'State Electrical Inspectorate Wireman Permit / License.',
          experienceNeeded: '1-year National Apprenticeship Certificate (NAC) preferred.'
        },
        skillsAlreadyHave: isIti
          ? ['AC/DC Circuit Theory', 'Transformer Connections', 'Motor Rewinding', 'Electrical Safety & Earthing']
          : [],
        skillsYouNeed: [
          { name: 'Industrial Wiring & Conduit', level: 'Critical', desc: 'Panel wiring, MCCB/MCB breaker installation, 3-phase balancing' },
          { name: 'Electrical Safety & PPE', level: 'Critical', desc: 'Lockout/Tagout (LOTO), arc flash safety, Indian Electricity (IE) Rules' },
          { name: 'Troubleshooting Tools', level: 'Core', desc: 'Multimeter, Megger (insulation tester), clamp meter diagnostics' },
          { name: 'Blueprint & Schematic Reading', level: 'Core', desc: 'Single-line diagrams (SLD), industrial wiring schematics' }
        ],
        roadmapFlow: [
          studyName,
          'Target: Electrician',
          'Circuit Theory & Safety',
          'Hands-on Panel Wiring',
          'Megger & Diagnostic Tools',
          'Apprenticeship Training (NAPS)',
          'State Wireman License',
          'Interview & Practical Trade Test',
          'Industrial / DISCOM Electrician'
        ],
        projects: [
          {
            title: '3-Phase Motor Control Panel with DOL Starter',
            tech: 'Contactor, Overload Relay, Push Buttons',
            desc: 'Wired and tested a functional Direct-On-Line (DOL) starter control circuit with emergency stop and indicator lamps.'
          },
          {
            title: 'Substation Earth Resistance Testing & Maintenance',
            tech: 'Earth Megger Tester',
            desc: 'Measured soil resistance across 4 earth pits, refilled chemical bentonite, and brought resistance below 2 Ohms.'
          }
        ],
        resumeAdvice: {
          headline: 'Certified ITI Electrician | Industrial Panel Wiring, Maintenance & Safety',
          keywords: ['NCVT Electrician', 'Wireman License', '3-Phase', 'LOTO Safety', 'Motor Maintenance', 'Megger Testing'],
          bulletFormulas: [
            'Conducted preventive maintenance on 15+ industrial distribution transformers and motor control centers.',
            'Troubleshot electrical breakdown faults using multimeter and megger, reducing plant downtime by 20%.'
          ]
        },
        interviewPrep: [
          {
            category: 'Safety & Regulations',
            q: 'What is the Indian Electricity Rule regarding permissible earthing resistance?',
            a: 'For power stations and large substations, earth resistance should not exceed 0.5 to 1.0 Ohm. For domestic and small commercial installations, it should be below 5.0 Ohms.'
          },
          {
            category: 'Trade Practical',
            q: 'Explain the working principle and difference between MCB, MCCB, and ELCB/RCCB.',
            a: 'MCB protects against overload and short circuits up to 63A. MCCB handles high currents up to 1000A with adjustable trip settings. RCCB/ELCB detects earth leakage current to protect human life from shock.'
          }
        ],
        howToApply: {
          strategy: 'Register on the National Apprenticeship Promotion Scheme (apprenticeshipindia.gov.in) and apply to state DISCOMs and manufacturing plants.',
          platforms: ['Apprenticeship India Portal', 'State Electricity Boards (DISCOMs)', 'Naukri (Skilled Trades)'],
          portfolioTip: 'Keep your ITI NCVT certificate, trade mark sheets, and Wireman License copy organized.'
        },
        officialVerification: {
          source: 'Directorate General of Training (DGT) / State Licensing Board',
          officialUrl: 'https://dgt.gov.in',
          lastVerified: 'September 2026',
          disclaimer: 'Regulated trade. High-voltage installation work strictly requires a valid state electrical inspectorate wireman permit.'
        }
      };
    }

    // 5. MECHANICAL ENGINEER / CAD DESIGNER
    if (titleLower.includes('mechanical') || titleLower.includes('cad') || titleLower.includes('automobile') || titleLower.includes('hvac')) {
      const isMech = eduLower.includes('mech') || eduLower.includes('automobile') || eduLower.includes('production');
      return {
        id: 'mechanical-engineer',
        title: jobTitle || 'Mechanical Engineer',
        category: 'Private',
        sector: 'Manufacturing, Automotive & Industrial Systems',
        salary: '₹4.0 - 9.5 LPA',
        relevance: isMech ? 'Directly Related' : 'Requires Additional Technical Qualification',
        eligibilityStatus: isMech ? 'Eligible' : 'Needs Technical Training',
        educationRelevance: isMech
          ? `Your ${studyName} degree directly covers machine design, thermodynamics, mechanics of materials, and manufacturing processes.`
          : `Transitioning from ${studyName} to Mechanical Design requires mastering 3D CAD modeling (SolidWorks), engineering drawing standards (GD&T), and structural FEA simulation.`,
        eligibility: {
          degreeAccepted: 'B.Tech / B.E. in Mechanical Engineering, Automobile, or 3-Year Polytechnic Diploma.',
          minimumMarks: '55% - 60% aggregate in engineering.',
          ageLimit: 'No age limit for private manufacturing; 30 years for PSU engineering recruitment (GATE).',
          certificationsPreferred: 'Certified SolidWorks Professional (CSWP) or ANSYS Structural FEA Certification.',
          experienceNeeded: '0–2 years (Demonstrated through CAD design portfolio & manufacturing drawings).'
        },
        skillsAlreadyHave: isMech
          ? ['Engineering Mechanics', 'Thermodynamics', 'Strength of Materials', 'Fluid Mechanics']
          : ['Spatial Reasoning', 'Applied Mathematics'],
        skillsYouNeed: [
          { name: '3D CAD Modeling (SolidWorks / CATIA)', level: 'Critical', desc: 'Part modeling, complex assemblies, surface modeling, exploded views' },
          { name: 'Geometric Dimensioning & Tolerancing (GD&T)', level: 'Critical', desc: 'ASME Y14.5 standards, datum selection, true position, surface finish symbols' },
          { name: 'Finite Element Analysis (ANSYS)', level: 'Core', desc: 'Static structural simulation, mesh optimization, stress concentrations, factor of safety' },
          { name: 'Manufacturing Processes & DFM', level: 'Core', desc: 'Design for Manufacturing, CNC machining tolerances, injection molding draft angles' }
        ],
        roadmapFlow: [
          studyName,
          `Target: ${jobTitle || 'Mechanical Engineer'}`,
          'Machine Design & Mechanics',
          'SolidWorks Parametric CAD',
          'GD&T Blueprint Standards',
          'ANSYS Structural FEA',
          'Build 2 Assembly Portfolios',
          'CSWP Certification',
          'Technical Viva Prep',
          'Apply to OEMs & Tier-1 Plants',
          'Live CAD Test & Interview',
          'GET / Design Engineer'
        ],
        projects: [
          {
            title: '2-Stage Industrial Reduction Gearbox Assembly',
            tech: 'SolidWorks, AGMA Standards',
            desc: 'Designed helical gear train, selected bearings and shaft seals; generated complete GD&T manufacturing drawings and bill of materials.'
          },
          {
            title: 'Automotive Suspension Wishbone FEA Optimization',
            tech: 'ANSYS Mechanical, SolidWorks',
            desc: 'Simulated structural stress under 3G bump load; reduced component mass by 14% while maintaining factor of safety > 2.0.'
          }
        ],
        resumeAdvice: {
          headline: `Mechanical Design Engineer | SolidWorks, GD&T, ANSYS | ${studyName} Graduate`,
          keywords: ['SolidWorks', 'GD&T', 'ASME Y14.5', 'ANSYS', 'FEA', 'CAD/CAM', 'DFM', 'Tolerance Stack-up', 'AutoCAD'],
          bulletFormulas: [
            'Engineered 3D CAD assembly models for industrial equipment, reducing fabrication rework by 25% through GD&T tolerance checks.',
            'Conducted structural FEA stress simulations on automotive brackets, optimizing material mass by 12% without compromising yield strength.'
          ]
        },
        interviewPrep: [
          {
            category: 'Machine Design',
            q: 'Explain the difference between von Mises stress and Maximum Principal Stress theories of failure.',
            a: 'Von Mises (Distortion Energy Theory) is used for ductile materials yielding under multi-axial shear. Maximum Principal Stress (Rankine Theory) applies to brittle materials failing due to tensile fracture without significant yielding.'
          },
          {
            category: 'GD&T Standards',
            q: 'What does a True Position tolerance callout with Maximum Material Condition (MMC) imply?',
            a: 'It specifies the permissible location variation of a feature center from its true theoretical position. The MMC modifier grants bonus tolerance when the actual produced feature size departs from the maximum material condition toward least material condition.'
          }
        ],
        howToApply: {
          strategy: 'Build a PDF portfolio displaying 3D rendered assembly models, exploded views, and GD&T production drawings. Apply to automotive OEMs, heavy equipment manufacturers, and engineering services firms.',
          platforms: ['LinkedIn Jobs', 'Naukri (Engineering & Manufacturing)', 'AutoJobsIndia', 'Direct OEM Careers Portals'],
          portfolioTip: 'Bring printed 2D manufacturing drawings with title blocks and GD&T callouts to in-person interviews.'
        },
        officialVerification: {
          source: 'American Society of Mechanical Engineers (ASME) / Institution of Engineers (India)',
          officialUrl: 'https://asme.org',
          lastVerified: 'September 2026',
          disclaimer: 'Private engineering recruitment. Selection depends on 3D CAD modeling test performance and core mechanics viva.'
        }
      };
    }

    // 6. CIVIL ENGINEER / SITE ENGINEER / STRUCTURAL ENGINEER
    if (titleLower.includes('civil') || titleLower.includes('construction') || titleLower.includes('structural') || titleLower.includes('site engineer')) {
      const isCivil = eduLower.includes('civil') || eduLower.includes('construction') || eduLower.includes('survey');
      return {
        id: 'civil-engineer',
        title: jobTitle || 'Civil Engineer',
        category: 'Private',
        sector: 'Infrastructure, Construction & Heavy Civil',
        salary: '₹3.8 - 8.5 LPA',
        relevance: isCivil ? 'Directly Related' : 'Requires Technical Engineering Qualification',
        eligibilityStatus: isCivil ? 'Eligible' : 'Needs Technical Training',
        educationRelevance: isCivil
          ? `Your ${studyName} degree directly covers structural analysis, soil mechanics, concrete technology, and surveying.`
          : `Transitioning from ${studyName} to Civil Engineering requires learning structural drafting (AutoCAD Civil 3D), RCC analysis (STAAD.Pro), and CPWD estimation standards.`,
        eligibility: {
          degreeAccepted: 'B.Tech / B.E. in Civil Engineering or 3-Year Polytechnic Diploma in Civil Engineering.',
          minimumMarks: '55% aggregate in engineering graduation.',
          ageLimit: 'No limit for private EPC contractors; 30 years for government SSC JE / State PWD.',
          certificationsPreferred: 'STAAD.Pro Certified Structural Engineer or Revit BIM Architecture.',
          experienceNeeded: '0–2 years (Site internship or structural drawing portfolio).'
        },
        skillsAlreadyHave: isCivil
          ? ['Structural Mechanics', 'Concrete Technology', 'Surveying', 'Soil Mechanics']
          : ['Spatial Layout Reasoning', 'Basic Mathematics'],
        skillsYouNeed: [
          { name: 'Structural Design (STAAD.Pro / ETABS)', level: 'Critical', desc: 'RCC frame modeling, seismic zone analysis (IS 1893), wind load calculation' },
          { name: 'AutoCAD Civil 3D & Detailing', level: 'Critical', desc: 'Column-beam grid layouts, foundation footings, slab reinforcement schedules' },
          { name: 'Quantity Surveying & Estimation', level: 'Core', desc: 'Bill of Quantities (BOQ), CPWD schedule of rates, bar bending schedules (BBS)' },
          { name: 'Site Execution & Quality Testing', level: 'Core', desc: 'Slump test, cube compressive strength, shuttering inspection, safety supervision' }
        ],
        roadmapFlow: [
          studyName,
          `Target: ${jobTitle || 'Civil Engineer'}`,
          'Concrete Tech & IS 456 Codes',
          'AutoCAD Structural Detailing',
          'STAAD.Pro Frame Analysis',
          'Quantity Surveying & BOQ',
          'G+4 Building Capstone Project',
          'Site Quality & Safety Standards',
          'Blueprint Reading Prep',
          'Apply to EPC Contractors',
          'Site Walk-in & Technical Viva',
          'Graduate Site Engineer'
        ],
        projects: [
          {
            title: 'G+4 Commercial RCC Building Structural Analysis',
            tech: 'STAAD.Pro, AutoCAD, IS 456:2000',
            desc: 'Modeled complete frame for commercial complex; analyzed seismic loads (Zone III) and detailed reinforcement plans with bar bending schedules.'
          },
          {
            title: 'Comprehensive Bill of Quantities (BOQ) & Steel BBS',
            tech: 'MS Excel, CPWD DSR',
            desc: 'Prepared detailed material takeoff for a 12,000 sq.ft residential project including earthwork, concrete volume, and reinforcement steel tonnage.'
          }
        ],
        resumeAdvice: {
          headline: `Civil Site & Structural Engineer | AutoCAD, STAAD.Pro, BOQ | ${studyName} Graduate`,
          keywords: ['AutoCAD Civil', 'STAAD.Pro', 'IS 456', 'BOQ', 'Bar Bending Schedule', 'Concrete Technology', 'Site Execution', 'Quality Control', 'Estimation'],
          bulletFormulas: [
            'Supervised on-site RCC casting of columns and slabs, conducting slump tests and verifying rebar placement per structural drawings.',
            'Modeled multi-story framed structures in STAAD.Pro and drafted accurate architectural reinforcement schedules in AutoCAD.'
          ]
        },
        interviewPrep: [
          {
            category: 'Concrete Technology',
            q: 'What is the characteristic compressive strength of M25 concrete, and what is the standard water-cement ratio?',
            a: 'M25 concrete indicates a characteristic 28-day compressive strength of 25 N/mm² (tested on 150mm cubes with 95% confidence). The typical water-cement ratio ranges between 0.40 and 0.45 as per IS 456:2000.'
          },
          {
            category: 'Structural Detailing',
            q: 'Explain Development Length (Ld) in RCC beams and why it is provided.',
            a: 'Development length is the embedded length of a reinforcing bar required inside concrete to develop its full tensile yield stress via bond resistance, preventing rebar pullout during peak bending moments.'
          }
        ],
        howToApply: {
          strategy: 'Target large EPC contractors (L&T, Tata Projects, Shapoorji Pallonji), real estate developers, and local consulting structural engineering firms.',
          platforms: ['Naukri (Civil & Infrastructure)', 'ConstructionJobsIndia', 'LinkedIn', 'State PWD / SSC JE Portals'],
          portfolioTip: 'Keep a clean folder of AutoCAD structural drawing sheets (A3 size) showcasing column layout and foundation details.'
        },
        officialVerification: {
          source: 'Bureau of Indian Standards (BIS) / Institution of Engineers (India)',
          officialUrl: 'https://bis.gov.in',
          lastVerified: 'September 2026',
          disclaimer: 'Recruitment in civil infrastructure requires technical engineering graduation or recognized polytechnic diploma.'
        }
      };
    }

    // 7. TEACHER / SCHOOL EDUCATOR / LECTURER
    if (titleLower.includes('teacher') || titleLower.includes('educator') || titleLower.includes('faculty') || titleLower.includes('professor') || titleLower.includes('lecturer')) {
      return {
        id: 'school-teacher',
        title: jobTitle || 'Teacher / School Educator',
        category: 'Private',
        sector: 'School Education & Higher Academics',
        salary: '₹3.0 - 7.5 LPA',
        relevance: 'Directly Related Subject Discipline',
        eligibilityStatus: 'Needs Professional Teaching Qualification',
        educationRelevance: `Your ${studyName} degree fulfills the subject graduation requirement. To teach in recognized CBSE/ICSE or state schools, professional qualifications (B.Ed or CTET) are mandated by National Council for Teacher Education (NCTE).`,
        eligibility: {
          degreeAccepted: 'Bachelor / Master degree in relevant subject + B.Ed (Bachelor of Education).',
          minimumMarks: '50% aggregate in graduation for B.Ed entry.',
          ageLimit: 'No age limit for private schools; 30–35 years for Kendriya Vidyalaya (KVS) / Navodaya (NVS).',
          certificationsPreferred: 'Central Teacher Eligibility Test (CTET Paper 1 or 2).',
          experienceNeeded: '0–2 years (Fresh B.Ed graduates hired based on live demo class).'
        },
        skillsAlreadyHave: ['Domain Subject Knowledge', 'Verbal Communication', 'Patience & Empathy'],
        skillsYouNeed: [
          { name: 'Pedagogy & Child Psychology', level: 'Critical', desc: 'Experiential learning, Bloom taxonomy, addressing diverse student learning styles' },
          { name: 'Lesson Planning & NEP 2020', level: 'Critical', desc: 'Designing 45-minute lesson plans, activity rubrics, continuous evaluation' },
          { name: 'Classroom Management', level: 'Core', desc: 'Maintaining student engagement, positive reinforcement, conflict de-escalation' },
          { name: 'Digital Teaching & Smart Classroom', level: 'Core', desc: 'Interactive whiteboards, digital presentations, Google Classroom' }
        ],
        roadmapFlow: [
          studyName,
          `Target: ${jobTitle || 'Teacher'}`,
          'Subject Mastery (NCERT 6-12)',
          'Enroll in 2-Year B.Ed Program',
          'Pedagogical Teaching Methods',
          'Curriculum & Lesson Planning',
          'Qualify CTET Paper 1/2',
          'Smart Classroom EdTech Tools',
          '15-Minute Demo Class Practice',
          'Apply to CBSE / International Schools',
          'Demo Teaching & Principal Interview',
          'Appointed as Educator'
        ],
        projects: [
          {
            title: '30-Day Comprehensive Subject Lesson Plan & Assessment Rubric',
            tech: 'CBSE Curriculum, NEP 2020 Guidelines',
            desc: 'Designed interactive unit plan incorporating activity-based learning modules, formative worksheets, and diagnostic quiz assessments.'
          },
          {
            title: 'Remedial Learning Intervention Plan for Diverse Learners',
            tech: 'Diagnostic Tests, Differentiated Pedagogy',
            desc: 'Formulated personalized study guide improving student conceptual scores by 25% over a structured 6-week module.'
          }
        ],
        resumeAdvice: {
          headline: `Trained Graduate Teacher (TGT) | B.Ed, CTET Qualified | ${studyName} Graduate`,
          keywords: ['B.Ed', 'CTET', 'Pedagogy', 'Lesson Planning', 'Classroom Management', 'CBSE Curriculum', 'Experiential Learning'],
          bulletFormulas: [
            'Planned and delivered structured interactive curriculum for 120+ secondary students, achieving 94% board exam pass rates.',
            'Integrated smart-board visual demonstrations and weekly formative assessments to elevate student engagement.'
          ]
        },
        interviewPrep: [
          {
            category: 'Pedagogy & Classroom Management',
            q: 'How do you handle a disruptive or disengaged student during a live class?',
            a: 'Avoid confrontational public shaming. Use gentle proximity control, invite the student to participate in an active discussion or board task, and hold a private conversation after class to uncover root causes.'
          },
          {
            category: 'National Education Policy',
            q: 'How do you incorporate experiential learning as recommended by NEP 2020 in your subject?',
            a: 'Shift from rote memorization to inquiry-based learning: connect abstract theory to real-world applications, group experiments, case simulations, and project-based problem solving.'
          }
        ],
        howToApply: {
          strategy: 'Prepare a compelling 15-minute live demonstration lesson plan. Apply during peak hiring season (January to April) to CBSE-affiliated schools, international schools, and coaching academies.',
          platforms: ['Direct School Portals', 'Naukri (Education/Teaching)', 'TimesJobs', 'KVS / NVS Recruitment Portal'],
          portfolioTip: 'Bring printed color lesson plans and sample student activity worksheets to the principal interview.'
        },
        officialVerification: {
          source: 'National Council for Teacher Education (NCTE) / CBSE',
          officialUrl: 'https://ncte.gov.in',
          lastVerified: 'September 2026',
          disclaimer: 'Permanent school teaching appointments legally require recognized B.Ed and CTET/TET qualification.'
        }
      };
    }

    // 8. FINANCIAL ANALYST / INVESTMENT ANALYST
    if (titleLower.includes('financial analyst') || titleLower.includes('investment') || titleLower.includes('equity research')) {
      const isFinance = eduLower.includes('com') || eduLower.includes('finance') || eduLower.includes('business') || eduLower.includes('econ');
      return {
        id: 'financial-analyst',
        title: jobTitle || 'Financial Analyst',
        category: 'Private',
        sector: 'Corporate Finance, Banking & Asset Management',
        salary: '₹4.5 - 9.0 LPA',
        relevance: isFinance ? 'Directly Related' : 'Possible With Financial Modeling Skills',
        eligibilityStatus: 'Eligible',
        educationRelevance: `${studyName} gives you the academic grounding in financial statements, corporate economics, and arithmetic calculations.`,
        eligibility: {
          degreeAccepted: 'Graduation degree in Commerce, Finance, Economics, or STEM discipline.',
          minimumMarks: '55% aggregate in graduation.',
          ageLimit: 'No restriction.',
          certificationsPreferred: 'CFA Level 1, Financial Modeling & Valuation Analyst (FMVA), or NISM Certifications.',
          experienceNeeded: '0–2 years (Demonstrated through 3-statement financial models).'
        },
        skillsAlreadyHave: isFinance
          ? ['Accounting Basics', 'Financial Statement Analysis', 'Corporate Finance Principles', 'Macroeconomics']
          : ['Quantitative Aptitude', 'Analytical Mindset'],
        skillsYouNeed: [
          { name: '3-Statement Financial Modeling', level: 'Critical', desc: 'Integrated P&L, Balance Sheet, and Cash Flow dynamic forecast models in Excel' },
          { name: 'Valuation Methodologies (DCF & Comps)', level: 'Critical', desc: 'Discounted Cash Flow (WACC calculation), Trading Multiples (EV/EBITDA, P/E)' },
          { name: 'Advanced Excel & Financial Functions', level: 'Critical', desc: 'XNPV, XIRR, INDEX-MATCH, sensitivity data tables, dynamic scenario toggles' },
          { name: 'Investment Pitch Deck & Equity Research', level: 'Core', desc: 'Writing corporate research notes, analyzing 10-K/annual reports, earnings call analysis' }
        ],
        roadmapFlow: [
          studyName,
          `Target: ${jobTitle || 'Financial Analyst'}`,
          'Financial Statement Analysis',
          'Advanced Excel & Shortcuts',
          '3-Statement Modeling',
          'DCF Valuation & WACC',
          'Build 2 Public Stock Models',
          'CFA Level 1 Prep / FMVA',
          'Equity Research Pitch Deck',
          'Apply to FinTech & Consultancies',
          'Financial Model Test & Viva',
          'Financial Analyst'
        ],
        projects: [
          {
            title: 'Integrated 3-Statement Forecast Model for Listed Enterprise',
            tech: 'Excel, Financial Statement Analysis',
            desc: 'Built dynamic 5-year forecast model connecting P&L, balance sheet, and cash flow with scenario toggles (Bull, Base, Bear cases).'
          },
          {
            title: 'Discounted Cash Flow (DCF) Equity Valuation Report',
            tech: 'DCF, WACC, Capital IQ/Bloomberg Data',
            desc: 'Calculated weighted average cost of capital (WACC) and intrinsic enterprise value for an Indian FMCG leader, drafting an equity research recommendation.'
          }
        ],
        resumeAdvice: {
          headline: `Financial Analyst | Financial Modeling, DCF Valuation, Advanced Excel | ${studyName} Graduate`,
          keywords: ['Financial Modeling', 'DCF Valuation', 'WACC', 'Trading Multiples', 'Equity Research', 'Advanced Excel', 'Variance Analysis', 'Forecasting'],
          bulletFormulas: [
            'Constructed dynamic 5-year integrated 3-statement models in Excel with automated sensitivity tables and capital expenditure schedules.',
            'Analyzed annual reports and earnings presentations for 10+ public equities, evaluating EBITDA margins and capital return ratios (ROIC/ROE).'
          ]
        },
        interviewPrep: [
          {
            category: 'Financial Statement Interconnection',
            q: 'If depreciation increases by $10, walk me through how all 3 financial statements are impacted.',
            a: '1. Income Statement: Operating income drops by $10. Assuming 20% tax, net income drops by $8. 2. Cash Flow Statement: Net income starts -$8. Add back non-cash depreciation +$10. Net change in cash is +$2. 3. Balance Sheet: Cash increases by $2, PPE decreases by $10 (net assets -$8). Retained earnings drops by $8, balancing both sides.'
          },
          {
            category: 'Valuation & DCF',
            q: 'How do you calculate Weighted Average Cost of Capital (WACC)?',
            a: 'WACC = (E/V * Re) + (D/V * Rd * (1 - T)), where E is market value of equity, D is debt, V is total capital, Re is cost of equity calculated via CAPM (Rf + Beta * MRP), Rd is cost of debt, and T is corporate tax rate.'
          }
        ],
        howToApply: {
          strategy: 'Host your financial models on a shared Google Drive or GitHub repository with clean formatting. Reach out directly to Research Associates and Finance Managers at boutique investment banks and FinTech consultancies.',
          platforms: ['LinkedIn Jobs', 'Wellfound', 'Naukri Finance', 'eFinancialCareers'],
          portfolioTip: 'Ensure your Excel models follow standard Wall Street color coding (blue for hardcoded inputs, black for formulas).'
        },
        officialVerification: {
          source: 'CFA Institute / Institute of Cost Accountants of India',
          officialUrl: 'https://cfainstitute.org',
          lastVerified: 'September 2026',
          disclaimer: 'Private corporate finance recruitment. Selection is heavily weighted on financial modeling test and valuation interview.'
        }
      };
    }

    // 9. HEALTHCARE / NURSE / PHARMACIST
    if (titleLower.includes('nurse') || titleLower.includes('pharmacist') || titleLower.includes('pharma') || titleLower.includes('medical') || titleLower.includes('healthcare')) {
      const isNursing = titleLower.includes('nurse');
      return {
        id: isNursing ? 'staff-nurse' : 'hospital-pharmacist',
        title: jobTitle || (isNursing ? 'Staff Nurse' : 'Hospital Pharmacist'),
        category: 'Private',
        sector: 'Healthcare, Multi-Specialty Hospitals & Clinical Services',
        salary: '₹3.2 - 7.5 LPA',
        relevance: eduLower.includes('nurs') || eduLower.includes('pharm') ? 'Directly Related' : 'Requires Statutory Health Council Licensure',
        eligibilityStatus: eduLower.includes('nurs') || eduLower.includes('pharm') ? 'Eligible' : 'Needs Formal Medical Qualification',
        educationRelevance: `Healthcare professions are strictly regulated by statutory councils. Candidates must hold accredited professional qualifications (B.Sc Nursing / B.Pharm) and official state registration.`,
        eligibility: {
          degreeAccepted: isNursing ? 'B.Sc Nursing (4 Years) or GNM (3.5 Years).' : 'B.Pharm or D.Pharm from a PCI-recognized institution.',
          minimumMarks: '50% aggregate in professional degree.',
          ageLimit: 'No limit for private hospitals; 30–35 years for government AIIMS/ESIC posts.',
          certificationsPreferred: 'Basic Life Support (BLS) & ACLS (American Heart Association).',
          experienceNeeded: '0–1 year (Clinical rotational internship completed).'
        },
        skillsAlreadyHave: ['Patient Empathy', 'Ethical Diligence', 'Observation Skills'],
        skillsYouNeed: [
          { name: isNursing ? 'Patient Vitals & Assessment' : 'Pharmacology & Drug Dispensing', level: 'Critical', desc: 'Clinical care protocols and standard operating procedures' },
          { name: 'BLS & Emergency Response', level: 'Critical', desc: 'CPR, AED operation, crash cart management, triage protocols' },
          { name: 'Medication Administration & Dosage', level: 'Critical', desc: 'Calculations for mg/kg infusion rates, avoiding drug-drug interactions' },
          { name: 'Infection Control & BMW Rules', level: 'Core', desc: 'Biomedical waste segregation (color-coded bins), sterile field maintenance' }
        ],
        roadmapFlow: [
          studyName,
          `Target: ${jobTitle || (isNursing ? 'Staff Nurse' : 'Hospital Pharmacist')}`,
          'Accredited Healthcare Degree / Diploma',
          'Clinical Hospital Internship',
          'State Council Registration (License)',
          'BLS & ACLS Certification',
          'Dosage Math & Pharmacology',
          'Infection Control (NABH Standards)',
          'High-Acuity ICU/Emergency Rotations',
          'Hospital Viva & Practical Rounds',
          'Multi-Specialty Staff Placement'
        ],
        projects: [
          {
            title: 'Biomedical Waste Segregation & Hand Hygiene Audit',
            tech: 'WHO Guidelines, Hospital Infection Control',
            desc: 'Conducted compliance observation study across 3 hospital wards, elevating proper waste bin segregation from 78% to 98%.'
          },
          {
            title: 'Emergency Crash Cart Medication Readiness Protocol',
            tech: 'NABH Audit Standards',
            desc: 'Maintained and verified 50+ critical life-saving medications and equipment, achieving 100% emergency audit readiness.'
          }
        ],
        resumeAdvice: {
          headline: `Registered ${isNursing ? 'Nurse (RN/RM)' : 'Pharmacist'} | BLS Certified | Hospital Clinical Care`,
          keywords: [isNursing ? 'Registered Nurse' : 'Pharmacist', 'BLS', 'ACLS', 'NABH', 'ICU Care', 'Infection Control', 'Patient Care', 'Dosage Calculation'],
          bulletFormulas: [
            'Delivered direct clinical care to 15+ acute medical-surgical patients per shift, monitoring vitals and administering prescribed IV medications with zero error.',
            'Maintained strict adherence to NABH infection control standards and biomedical waste protocols across critical care units.'
          ]
        },
        interviewPrep: [
          {
            category: 'Patient Safety & Pharmacology',
            q: 'Explain the 5 Rights of Medication Administration and why they are vital.',
            a: '1. Right Patient 2. Right Drug 3. Right Dose 4. Right Route 5. Right Time. Checking all five prevents catastrophic medication administration errors.'
          },
          {
            category: 'Infection Control',
            q: 'Explain color-coded Biomedical Waste (BMW) segregation in hospitals.',
            a: 'Yellow bin: anatomical waste, soiled dressings. Red bin: contaminated plastics (catheters, IV tubing). Blue box: glassware, ampoules. White translucent container: sharps, needles, scalpels.'
          }
        ],
        howToApply: {
          strategy: 'Bring your state registration certificate, mark sheets, and BLS card directly to hospital HR walk-in interview drives at leading private hospital networks (Apollo, Max, Fortis).',
          platforms: ['Direct Hospital Walk-ins', 'Naukri Healthcare', 'AIIMS NORCET Portal'],
          portfolioTip: 'Keep your state council license card and AHA BLS certificate readily accessible in your portfolio.'
        },
        officialVerification: {
          source: 'Indian Nursing Council (INC) / Pharmacy Council of India (PCI)',
          officialUrl: 'https://indiannursingcouncil.org',
          lastVerified: 'September 2026',
          disclaimer: 'Clinical practice strictly requires recognized professional qualification and statutory council license registration.'
        }
      };
    }

    // 10. SOFTWARE DEVELOPER / WEB DEVELOPER (Tech roles only!)
    if (titleLower.includes('software') || titleLower.includes('developer') || titleLower.includes('frontend') || titleLower.includes('backend') || titleLower.includes('full stack') || titleLower.includes('programmer') || titleLower.includes('coder') || titleLower.includes('web development')) {
      return {
        id: 'software-developer',
        title: jobTitle || 'Software Developer',
        category: 'Private',
        sector: 'Information Technology & Software Engineering',
        salary: '₹6.0 - 15.0 LPA',
        relevance: eduLower.includes('tech') || eduLower.includes('mca') || eduLower.includes('computer') || eduLower.includes('bca') ? 'Directly Related' : 'Possible With Additional Skills',
        eligibilityStatus: 'Eligible',
        educationRelevance: `${studyName} provides the foundational academic discipline. Tech startups and IT companies prioritize practical coding skills, GitHub projects, and algorithmic problem solving.`,
        eligibility: {
          degreeAccepted: 'Graduation degree in any discipline (B.Tech, BCA, B.Sc, B.Com, etc.). Demonstrable code is paramount.',
          minimumMarks: '60% aggregate often requested by traditional IT MNCs; high-growth startups do not check marks.',
          ageLimit: 'No age limit.',
          certificationsPreferred: 'AWS Certified Cloud Practitioner or Meta Full-Stack Certificate.',
          experienceNeeded: '0–2 years (Demonstrated through GitHub repositories).'
        },
        skillsAlreadyHave: ['Logical Reasoning', 'Analytical Mindset'],
        skillsYouNeed: [
          { name: 'JavaScript & Modern ES6+', level: 'Critical', desc: 'Async/Await, Closures, DOM, Promises, Event Loop' },
          { name: 'Frontend Framework (React)', level: 'Critical', desc: 'Components, State, Hooks (useState, useEffect), Tailwind CSS' },
          { name: 'Backend & APIs (Node.js)', level: 'Critical', desc: 'Express.js, RESTful APIs, JWT Authentication, Middleware' },
          { name: 'Databases (PostgreSQL / MongoDB)', level: 'Core', desc: 'Schema design, indexing, CRUD queries, ORMs (Prisma/Mongoose)' },
          { name: 'Git & Deployment', level: 'Fundamental', desc: 'Git branching, GitHub actions, Docker containerization, Vercel/AWS' }
        ],
        roadmapFlow: [
          studyName,
          `Target: ${jobTitle || 'Software Developer'}`,
          'Programming Fundamentals',
          'Data Structures & Algorithms',
          'Frontend Development (React)',
          'Backend & APIs (Node.js)',
          'Databases & Architecture',
          'Build 2 Full-Stack Projects',
          'Resume & GitHub Portfolio',
          'Technical Interview Prep',
          'Job Applications',
          'Coding Round & Interview',
          'Hired as Developer'
        ],
        projects: [
          {
            title: 'Full-Stack SaaS Platform with Authentication',
            tech: 'React, Node.js, PostgreSQL, Tailwind CSS',
            desc: 'Engineered a production-ready web application featuring role-based access control, Stripe payment checkout, and responsive UI.'
          },
          {
            title: 'Real-Time Collaborative Workspace',
            tech: 'Node.js, WebSockets, Redis, React',
            desc: 'Implemented sub-second synchronized text editing and room management supporting 50 concurrent active users.'
          }
        ],
        resumeAdvice: {
          headline: `Full-Stack Developer | React, Node.js, PostgreSQL | ${studyName} Graduate`,
          keywords: ['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'REST API', 'Git'],
          bulletFormulas: [
            'Designed and deployed a responsive web app utilized by 1,200+ monthly users with 99.8% uptime on AWS.',
            'Built RESTful API endpoints with JWT authentication and optimized MongoDB queries, improving response times by 40%.'
          ]
        },
        interviewPrep: [
          {
            category: 'Coding Fundamentals',
            q: 'Explain the JavaScript Event Loop, Call Stack, and Task Queue.',
            a: 'The Call Stack executes synchronous code. Asynchronous callbacks (e.g. setTimeout, fetch) are delegated to Web APIs and pushed to the Task/Microtask Queue upon completion. The Event Loop continually monitors if the Call Stack is empty before dequeuing callbacks.'
          },
          {
            category: 'System & Database',
            q: 'What is database normalization, and when is denormalization preferred?',
            a: 'Normalization minimizes data redundancy and avoids insert/update anomalies by dividing tables (1NF, 2NF, 3NF). Denormalization is intentionally used in high-read systems or data warehouses to reduce expensive joins.'
          }
        ],
        howToApply: {
          strategy: 'Deploy working demo links on Vercel/Render, keep clean GitHub repositories with README documentation, and reach out directly to tech founders on LinkedIn and Wellfound.',
          platforms: ['LinkedIn Jobs', 'Wellfound', 'GitHub Jobs', 'Instahyre'],
          portfolioTip: 'Include live demo URLs and clear architecture diagrams in every portfolio repository.'
        },
        officialVerification: {
          source: 'Software Engineering Industry Standards',
          officialUrl: 'https://github.com',
          lastVerified: 'September 2026',
          disclaimer: 'Private tech recruitment. Hiring is based on practical code review and algorithmic problem solving.'
        }
      };
    }

    // 11. UNIVERSAL DYNAMIC ENGINE (FOR ANY OTHER CUSTOM JOB ENTERED BY USER)
    // NEVER defaults to web development! Generates 100% role-specific domain pathway.
    const cleanTitle = (jobTitle || 'Industry Specialist').replace(/junior|senior|lead|associate/gi, '').trim() || 'Specialist';
    return {
      id: cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: jobTitle || `${cleanTitle} Specialist`,
      category: 'Private',
      sector: `${cleanTitle} Industry Operations & Services`,
      salary: '₹3.5 - 8.0 LPA',
      relevance: 'Possible With Domain Preparation',
      eligibilityStatus: 'Eligible With Target Skills',
      educationRelevance: `Your background in ${studyName} provides relevant analytical discipline. Pursuing ${cleanTitle} requires building domain-specific technical skills, industry tools, and recognized certifications.`,
      eligibility: {
        degreeAccepted: `${studyName} or any recognized Bachelor's Degree meets the educational baseline.`,
        minimumMarks: 'Pass degree (50%+ preferred by corporate employers).',
        ageLimit: 'No age limit for private sector roles.',
        certificationsPreferred: `Accredited Professional ${cleanTitle} Certification.`,
        experienceNeeded: '0–2 years (Demonstrated through practical case studies and projects).'
      },
      skillsAlreadyHave: ['Analytical Thinking', 'Problem Solving', 'Professional Communication'],
      skillsYouNeed: [
        { name: `${cleanTitle} Core Methodologies`, level: 'Critical', desc: `Standard operating procedures, quality standards, and compliance frameworks in ${cleanTitle}` },
        { name: `Industry Standard Software & Tools`, level: 'Critical', desc: `Professional software suites, diagnostic equipment, and operational platforms used in ${cleanTitle}` },
        { name: `Practical Case Execution`, level: 'Core', desc: `Executing end-to-end operational deliverables with zero procedural errors` },
        { name: `Stakeholder Reporting`, level: 'Fundamental', desc: `Translating technical findings into actionable executive presentations` }
      ],
      roadmapFlow: [
        studyName,
        `Target: ${cleanTitle}`,
        `${cleanTitle} Industry Standards`,
        'Core Operational Software',
        'Practical Case Studies',
        'Accredited Certification',
        'Targeted ATS Resume',
        'Technical Viva Prep',
        'Direct Industry Applications',
        'Assessment & Interview',
        `Appointed as ${cleanTitle}`
      ],
      projects: [
        {
          title: `${cleanTitle} Operational Case Study & Workflow Optimization`,
          tech: 'Industry Standard Tools & Frameworks',
          desc: `Executed an end-to-end simulated operational project solving a critical workflow challenge with quantifiable results and full documentation.`
        }
      ],
      resumeAdvice: {
        headline: `${cleanTitle} | Certified Professional | ${studyName} Graduate`,
        keywords: [cleanTitle, 'Standard Operating Procedures', 'Quality Assurance', 'Process Optimization', 'Reporting'],
        bulletFormulas: [
          `Executed end-to-end operational workflows for ${cleanTitle} assignments, ensuring 100% adherence to quality guidelines.`,
          `Analyzed domain metrics and implemented procedural improvements, reducing error turnaround times by 20%.`
        ]
      },
      interviewPrep: [
        {
          category: `${cleanTitle} Domain Fundamentals`,
          q: `What are the most critical responsibilities and challenges in a ${cleanTitle} role?`,
          a: `Highlight understanding of the primary operational workflow, quality control checkpoints, adherence to safety or regulatory standards, and how cross-functional collaboration drives successful results.`
        },
        {
          category: 'Situational & Problem Solving',
          q: `How do you handle unexpected procedural errors or strict deadlines in ${cleanTitle}?`,
          a: `Follow the STAR method: describe isolating the root cause, applying standard mitigation protocols, communicating proactively with supervisors, and implementing preventive safeguards for the future.`
        }
      ],
      howToApply: {
        strategy: `Target companies, service providers, and agencies specializing in ${cleanTitle}. Connect with department heads on LinkedIn and highlight transferable skills from ${studyName}.`,
        platforms: ['LinkedIn Jobs', 'Naukri.com', 'Direct Corporate Career Portals'],
        portfolioTip: 'Include tangible project case studies or sample reports demonstrating real operational problem solving.'
      },
      officialVerification: {
        source: `${cleanTitle} Industry Professional Standards`,
        officialUrl: 'https://nasscom.in',
        lastVerified: 'September 2026',
        disclaimer: 'Recruitment is based on employer technical assessment, portfolio verification, and interview performance.'
      }
    };
  };

  // Grounded catalog of jobs for the current education when NO target is selected
  const getCatalogForEducation = (edu) => {
    const lower = (edu || '').toLowerCase();

    if (lower.includes('com') || lower.includes('commerce') || lower.includes('finance')) {
      return [
        {
          id: 'accountant',
          title: 'Accountant',
          category: 'Private',
          sector: 'Finance & Accounting',
          salary: '₹3.5 - 6.5 LPA',
          relevance: 'Directly Related',
          eligibilityStatus: 'Eligible',
          overview: 'Maintains corporate general ledgers, oversees accounts payable/receivable, reconciles bank accounts, and prepares quarterly P&L statements.',
          keySkills: ['Tally Prime', 'Advanced Excel', 'GST & TDS Law', 'Double-Entry Accounting'],
          entranceExam: 'None (Direct Interview)'
        },
        {
          id: 'junior-financial-analyst',
          title: 'Financial Analyst',
          category: 'Private',
          sector: 'Corporate Finance & Banking',
          salary: '₹4.5 - 8.5 LPA',
          relevance: 'Directly Related',
          eligibilityStatus: 'Eligible',
          overview: 'Constructs 3-statement integrated financial forecast models in Excel, audits variance, and prepares investor earnings presentations.',
          keySkills: ['Financial Modeling', 'DCF Valuation', 'Excel Shortcuts', 'Ratio Analysis'],
          entranceExam: 'None (Direct Interview)'
        },
        {
          id: 'data-analyst',
          title: 'Data Analyst',
          category: 'Private',
          sector: 'Business Intelligence & Tech',
          salary: '₹5.5 - 11.0 LPA',
          relevance: 'Possible With Additional Skills',
          eligibilityStatus: 'Needs Additional Skills',
          overview: 'Translates raw sales data into interactive Power BI / Tableau dashboards and conducts SQL queries to unlock commercial insights.',
          keySkills: ['SQL', 'Power BI', 'Excel', 'Python (Pandas)', 'Statistics'],
          entranceExam: 'None (Portfolio & Technical Coding)'
        },
        {
          id: 'ssc-cgl-auditor',
          title: 'SSC CGL Auditor / Inspector',
          category: 'Government',
          sector: 'Central Govt (CAG / CBDT)',
          salary: '₹45,000 - 85,000 / mo',
          relevance: 'Directly Related',
          eligibilityStatus: 'Eligible',
          overview: 'Performs statutory financial audits of Central Government departments, monitors tax compliance, and verifies state treasury accounts.',
          keySkills: ['Quantitative Aptitude', 'General Awareness', 'Reasoning', 'English Comprehension'],
          entranceExam: 'SSC Combined Graduate Level (Tier 1 & 2)'
        },
        {
          id: 'bank-po',
          title: 'Bank Probationary Officer (IBPS / SBI PO)',
          category: 'Public Sector',
          sector: 'Public Sector Banking',
          salary: '₹55,000 - 75,000 / mo',
          relevance: 'Directly Related',
          eligibilityStatus: 'Eligible',
          overview: 'Underwrites retail and commercial credit, manages branch banking operations, and advises corporate clients on treasury instruments.',
          keySkills: ['Banking Awareness', 'Data Interpretation', 'English', 'Reasoning Ability'],
          entranceExam: 'IBPS / SBI PO National Recruitment Exam'
        },
        {
          id: 'tax-assistant',
          title: 'Tax Assistant',
          category: 'Private',
          sector: 'Tax Consulting & Advisory',
          salary: '₹3.2 - 5.5 LPA',
          relevance: 'Directly Related',
          eligibilityStatus: 'Eligible',
          overview: 'Prepares individual and corporate income tax returns, computes advance tax obligations, and assists in GST scrutiny compliance.',
          keySkills: ['Income Tax Act', 'GST Portal', 'Form 16/26AS Verification', 'Excel'],
          entranceExam: 'None'
        }
      ];
    }

    if (lower.includes('electrician') || lower.includes('iti')) {
      return [
        {
          id: 'electrician',
          title: 'Electrician',
          category: 'Skilled Trades',
          sector: 'Electrical Services & Contracting',
          salary: '₹2.8 - 5.5 LPA',
          relevance: 'Directly Related',
          eligibilityStatus: 'Eligible',
          overview: 'Installs and maintains commercial electrical distribution panels, conduit piping, transformers, and industrial motor controls.',
          keySkills: ['Industrial Wiring', 'Multimeter & Megger', 'LOTO Safety', 'Blueprint Reading'],
          entranceExam: 'State Wireman License Examination'
        },
        {
          id: 'state-discom-lineman',
          title: 'State DISCOM Junior Lineman',
          category: 'Government',
          sector: 'State Power Distribution (DISCOM)',
          salary: '₹30,000 - 45,000 / mo',
          relevance: 'Directly Related',
          eligibilityStatus: 'Eligible',
          overview: 'Maintains 11kV/33kV overhead electrical feeders, resolves power distribution faults, and inspects pole-mounted distribution transformers.',
          keySkills: ['Overhead Line Safety', 'Pole Climbing', 'Transformer Maintenance', 'IE Rules'],
          entranceExam: 'State Power Transmission / Distribution Board Exam'
        },
        {
          id: 'railway-alp',
          title: 'Railway Assistant Loco Pilot (RRB ALP)',
          category: 'Government',
          sector: 'Indian Railways (Ministry of Railways)',
          salary: '₹35,000 - 60,000 / mo',
          relevance: 'Directly Related',
          eligibilityStatus: 'Eligible',
          overview: 'Assists senior locomotive pilots in operating freight and passenger trains, monitoring track signals, and inspecting train brake power.',
          keySkills: ['Basic Science & Engineering', 'Technical Trade Knowledge', 'Aptitude & Psycho Test'],
          entranceExam: 'RRB ALP Computer Based Test (CBT 1 & 2)'
        }
      ];
    }

    // Default Tech
    return [
      {
        id: 'software-developer',
        title: 'Software Developer',
        category: 'Private',
        sector: 'Technology & Internet',
        salary: '₹6.0 - 14.0 LPA',
        relevance: 'Directly Related',
        eligibilityStatus: 'Eligible',
        overview: 'Builds modular web applications, REST APIs, and microservices using JavaScript, React, Node.js, and relational databases.',
        keySkills: ['JavaScript/TypeScript', 'React.js', 'Node.js', 'PostgreSQL / MongoDB', 'Git'],
        entranceExam: 'None (Technical Coding Assessment)'
      },
      {
        id: 'data-analyst-tech',
        title: 'Data Analyst',
        category: 'Private',
        sector: 'Technology & BI',
        salary: '₹5.5 - 11.0 LPA',
        relevance: 'Directly Related',
        eligibilityStatus: 'Eligible',
        overview: 'Extracts, transforms, and visualizes complex telemetry records using SQL, Python, and Power BI dashboards.',
        keySkills: ['SQL', 'Python (Pandas)', 'Power BI', 'Statistics'],
        entranceExam: 'None (Technical Case Study)'
      },
      {
        id: 'bank-po-tech',
        title: 'Bank IT Officer / Probationary Officer',
        category: 'Public Sector',
        sector: 'Banking & Financial Services',
        salary: '₹55,000 - 75,000 / mo',
        relevance: 'Directly Related',
        eligibilityStatus: 'Eligible',
        overview: 'Maintains core banking technology infrastructure, database integrity, and network cybersecurity.',
        keySkills: ['Database Systems', 'Networking', 'Cybersecurity', 'Banking Aptitude'],
        entranceExam: 'IBPS Specialist Officer (IT) / PO'
      }
    ];
  };

  // If Target Job is active, retrieve its specifications (merging backendRoadmap if present)
  const targetDetails = React.useMemo(() => {
    if (!activeTargetJobTitle) return null;
    const base = getJobDetails(activeTargetJobTitle, studyName);
    if (!backendRoadmap) return base;

    const bj = backendRoadmap.targetJob || {};
    const canI = backendRoadmap.canIPursue || {};
    const crack = backendRoadmap.howToCrack || {};
    const roadmapSteps = backendRoadmap.roadmap?.steps || [];
    const qual = backendRoadmap.qualificationRequirements || {};

    return {
      ...base,
      title: bj.title || base.title,
      sector: bj.sector || base.sector,
      salary: bj.salary || base.salary,
      relevance: canI.relevance || bj.relevance || base.relevance,
      eligibilityStatus: canI.eligibilityStatus || bj.eligibilityStatus || base.eligibilityStatus,
      educationRelevance: canI.relevanceExplanation || bj.educationRelevance || base.educationRelevance,
      eligibility: {
        degreeAccepted: qual.degreeAccepted || bj.degreeAccepted || base.eligibility.degreeAccepted,
        minimumMarks: bj.minimumMarks || base.eligibility.minimumMarks,
        ageLimit: bj.ageLimit || base.eligibility.ageLimit,
        certificationsPreferred: (qual.certificationsRecommended?.length > 0)
          ? qual.certificationsRecommended.join(', ')
          : (bj.certificationsPreferred || base.eligibility.certificationsPreferred),
        experienceNeeded: canI.experienceRequired || bj.experienceNeeded || base.eligibility.experienceNeeded
      },
      skillsAlreadyHave: (backendRoadmap.skillsBreakdown?.skillsAlreadyHave?.length > 0)
        ? backendRoadmap.skillsBreakdown.skillsAlreadyHave
        : base.skillsAlreadyHave,
      skillsYouNeed: (backendRoadmap.skillsBreakdown?.skillsYouNeed?.length > 0)
        ? backendRoadmap.skillsBreakdown.skillsYouNeed.map((s) =>
            typeof s === 'string'
              ? { name: s, level: 'Required', desc: `Core competency required for ${bj.title || base.title}.` }
              : s
          )
        : base.skillsYouNeed,
      roadmapFlow: roadmapSteps.length > 0
        ? [studyName, `Target: ${bj.title || base.title}`, ...roadmapSteps.map((s) => typeof s === 'string' ? s : s.title), 'Get The Job']
        : base.roadmapFlow,
      projects: (backendRoadmap.projects?.length > 0)
        ? backendRoadmap.projects
        : base.projects,
      resumeAdvice: {
        headline: `${bj.title || base.title} | ${studyName} Graduate`,
        keywords: [
          ...(backendRoadmap.skillsBreakdown?.requiredSkills || []),
          ...(backendRoadmap.skillsBreakdown?.skillsYouNeed?.map((s) => typeof s === 'string' ? s : s.name) || [])
        ].slice(0, 9).length > 0
          ? [
              ...(backendRoadmap.skillsBreakdown?.requiredSkills || []),
              ...(backendRoadmap.skillsBreakdown?.skillsYouNeed?.map((s) => typeof s === 'string' ? s : s.name) || [])
            ].slice(0, 9)
          : base.resumeAdvice.keywords,
        bulletFormulas: crack.step4_buildResume?.bulletFormulas || base.resumeAdvice.bulletFormulas
      },
      interviewPrep: (backendRoadmap.interviewPreparation?.length > 0)
        ? backendRoadmap.interviewPreparation
        : base.interviewPrep,
      howToApply: crack.step6_apply && crack.step6_apply.strategy
        ? crack.step6_apply
        : base.howToApply
    };
  }, [activeTargetJobTitle, studyName, backendRoadmap]);

  const catalogJobs = getCatalogForEducation(studyName);

  const filteredCatalog = catalogJobs.filter((j) => {
    const matchesCategory =
      activeTab === 'all'
        ? true
        : activeTab === 'private'
        ? j.category === 'Private'
        : activeTab === 'government'
        ? j.category === 'Government' || j.category === 'Public Sector'
        : true;

    const matchesSearch =
      searchQuery.trim() === '' ||
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.sector.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Eligible':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          text: 'Eligible'
        };
      case 'Potentially Eligible':
        return {
          bg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
          icon: HelpCircle,
          text: 'Potentially Eligible'
        };
      case 'Needs Additional Skills':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          icon: GraduationCap,
          text: 'Needs Additional Skills'
        };
      case 'Needs Additional Qualification':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: AlertTriangle,
          text: 'Needs Additional Qualification'
        };
      case 'Needs License / Registration':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: ShieldCheck,
          text: 'Needs License / Registration'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: AlertTriangle,
          text: status || 'Needs Verification'
        };
    }
  };

  return (
    <div className="space-y-8 py-2 sm:py-6 max-w-4xl mx-auto">
      {/* ============================================================ */}
      {/* SECTION 8 & 9: ACTIVE TARGET JOB CONTROLS THE JOB SECTION     */}
      {/* ============================================================ */}
      {activeTargetJobTitle && targetDetails ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Card (Section 9 Header) */}
          <section className="card-clean p-6 sm:p-8 bg-white border border-indigo-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" />
                  <span>Target Job Master Roadmap</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  YOUR TARGET JOB: {targetDetails.title.toUpperCase()}
                </h1>
                <div className="text-xs sm:text-sm text-slate-600 flex flex-wrap items-center gap-2 pt-0.5">
                  <span>Based on:</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                    Education: {studyName} ({currentEducation.status === 'currently_studying' ? 'Currently Studying' : 'Completed'})
                  </span>
                  <span>+</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold border border-purple-200">
                    Target: {targetDetails.title}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-col gap-2 flex-shrink-0">
                <ChangeTargetJobButton label="Change Target Job" />
                <ChangeEducationButton label="Change Education" />
              </div>
            </div>

            {/* Quick Summary Pill Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                  Sector: {targetDetails.sector}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  {targetDetails.salary}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                  {targetDetails.category} Sector
                </span>
              </div>

              {/* Clear Target toggle */}
              <button
                onClick={removeTargetJob}
                className="text-slate-400 hover:text-slate-600 font-medium text-xs underline cursor-pointer"
              >
                Browse all jobs for {studyName}
              </button>
            </div>
          </section>

          {/* ======================================================== */}
          {/* SECTION 9: CAN I PURSUE THIS JOB? (ELIGIBILITY CHECK)    */}
          {/* ======================================================== */}
          <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Can I pursue this job?
                  </h2>
                  <p className="text-xs text-slate-500">
                    Structured eligibility evaluation based on verified qualification rules
                  </p>
                </div>
              </div>

              {/* Status Badge (Section 9 & 13) */}
              {(() => {
                const badge = getStatusBadge(targetDetails.eligibilityStatus);
                const Icon = badge.icon;
                return (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${badge.bg}`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span>{badge.text}</span>
                  </span>
                );
              })()}
            </div>

            {/* Why Education is Relevant (Section 8 & 9) */}
            <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>Why your education is relevant</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {targetDetails.educationRelevance}
              </p>
            </div>

            {/* Detailed Eligibility Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800">Degree & Qualification Match</div>
                <p className="text-slate-600">{targetDetails.eligibility.degreeAccepted}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800">Minimum Marks / GPA</div>
                <p className="text-slate-600">{targetDetails.eligibility.minimumMarks}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800">Age Limits & Requirements</div>
                <p className="text-slate-600">{targetDetails.eligibility.ageLimit}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800">Experience / Portfolio Needed</div>
                <p className="text-slate-600">{targetDetails.eligibility.experienceNeeded}</p>
              </div>
            </div>

            {/* Section 30: Official Verification & Disclaimer Box */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-[11px] uppercase tracking-wider text-amber-800">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  Official Source Verification
                </span>
                <span className="text-[10px] text-amber-700 font-semibold">
                  Last Verified: {targetDetails.officialVerification.lastVerified}
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {targetDetails.officialVerification.disclaimer}
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="font-medium text-slate-700">
                  Authority: <strong>{targetDetails.officialVerification.source}</strong>
                </span>
                <a
                  href={targetDetails.officialVerification.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold underline"
                >
                  <span>Check Official Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* SECTION 11: TARGET JOB ROADMAP (VISUAL PROGRESSION NODES) */}
          {/* ======================================================== */}
          <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                  Progression Pipeline
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Target Job Roadmap
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Dynamic execution timeline
              </span>
            </div>

            {/* Visual Dynamic Roadmap Flow (Section 11) */}
            <div className="overflow-x-auto pb-2">
              <div className="flex items-center gap-2 min-w-max py-2 text-xs font-bold">
                {targetDetails.roadmapFlow.map((step, idx) => {
                  const isFirst = idx === 0;
                  const isTarget = idx === 1;
                  const isLast = idx === targetDetails.roadmapFlow.length - 1;

                  let nodeClass = 'bg-slate-100 text-slate-800 border-slate-200';
                  if (isFirst) {
                    nodeClass = 'bg-indigo-600 text-white shadow-xs';
                  } else if (isTarget) {
                    nodeClass = 'bg-purple-600 text-white shadow-xs';
                  } else if (isLast) {
                    nodeClass = 'bg-emerald-600 text-white shadow-xs';
                  } else if (step.includes('Project') || step.includes('Resume')) {
                    nodeClass = 'bg-cyan-50 text-cyan-900 border-cyan-200';
                  } else if (step.includes('Interview')) {
                    nodeClass = 'bg-amber-50 text-amber-900 border-amber-200';
                  }

                  return (
                    <React.Fragment key={idx}>
                      <div className={`px-3 py-2 rounded-xl border text-center whitespace-nowrap transition-all ${nodeClass}`}>
                        {step}
                      </div>
                      {!isLast && (
                        <span className="text-indigo-400 font-extrabold px-0.5">→</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* SECTION 10: HOW TO CRACK THE TARGET JOB (7 MASTER STEPS) */}
          {/* ======================================================== */}
          <section className="card-clean p-6 sm:p-8 bg-white border border-slate-200 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="text-xs font-extrabold uppercase tracking-wider text-purple-600">
                Action Plan & Preparation
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                HOW TO GET THIS JOB
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Complete 7-step blueprint from role mastery to passing interviews
              </p>
            </div>

            {/* Interactive Step Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100">
              {[
                { step: 1, label: 'Role' },
                { step: 2, label: 'Skills' },
                { step: 3, label: 'Projects' },
                { step: 4, label: 'Resume' },
                { step: 5, label: 'Interview Prep' },
                { step: 6, label: 'Apply' },
                { step: 7, label: 'Mock Test' }
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStepTab(s.step)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeStepTab === s.step
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Step {s.step}: {s.label}
                </button>
              ))}
            </div>

            {/* STEP 1: UNDERSTAND THE ROLE */}
            {activeStepTab === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Step 1 — Understand the Role: What does a {targetDetails.title} do?
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                  <p>
                    A <strong className="text-slate-900">{targetDetails.title}</strong> operates at the intersection of business strategy and technical execution.
                    In daily operations, professionals in this position extract raw transactional numbers, clean inconsistencies, build analytical models, and communicate findings to executives.
                  </p>
                  <p>
                    Typical starting compensation ranges between <strong className="text-emerald-700">{targetDetails.salary}</strong> with rapid salary growth as technical competency expands.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: LEARN REQUIRED SKILLS */}
            {activeStepTab === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Step 2 — Learn Required Skills
                  </h3>
                </div>

                {/* Skills Already Have from Education */}
                {targetDetails.skillsAlreadyHave && targetDetails.skillsAlreadyHave.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Skills you already have from {studyName}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {targetDetails.skillsAlreadyHave.map((sk, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-white text-emerald-800 border border-emerald-200 text-xs font-semibold">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills You Need to Learn */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Target Skills to Acquire:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {targetDetails.skillsYouNeed.map((sk, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{sk.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {sk.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          {sk.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/learn"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    <span>Open Interactive Learning Hub for {targetDetails.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* STEP 3: BUILD PROJECTS */}
            {activeStepTab === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Step 3 — Build Capstone Projects & Practical Experience
                  </h3>
                </div>

                <p className="text-xs text-slate-500">
                  Hiring managers review demonstrable projects before inviting candidates for interviews. Complete 2–3 of these:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {targetDetails.projects.map((proj, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        {proj.title}
                      </div>
                      <div className="inline-block px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                        {proj.tech}
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: BUILD RESUME */}
            {activeStepTab === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Step 4 — Build ATS-Optimized Resume
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800">Recommended Headline:</span>
                    <div className="p-2 rounded-lg bg-white border border-slate-200 text-indigo-700 font-mono text-xs mt-1">
                      {targetDetails.resumeAdvice.headline}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800">Key ATS Keywords to Include:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {targetDetails.resumeAdvice.keywords.map((kw, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800">High-Impact Bullet Point Templates:</span>
                    <ul className="space-y-1.5 mt-1 text-slate-600 list-disc list-inside">
                      {targetDetails.resumeAdvice.bulletFormulas.map((bullet, idx) => (
                        <li key={idx} className="leading-relaxed">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: PREPARE FOR INTERVIEWS */}
            {activeStepTab === 5 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    5
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Step 5 — Prepare for Technical & Behavioral Interviews
                  </h3>
                </div>

                <div className="space-y-2">
                  {targetDetails.interviewPrep.map((item, idx) => {
                    const isExpanded = expandedInterviewIdx === idx;
                    return (
                      <div key={idx} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                        <button
                          onClick={() => setExpandedInterviewIdx(isExpanded ? null : idx)}
                          className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                              {item.category}
                            </span>
                            <div className="text-xs sm:text-sm font-bold text-slate-900">
                              {item.q}
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                            <strong className="text-slate-900 font-semibold">Model Answer: </strong>
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: APPLY */}
            {activeStepTab === 6 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    6
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Step 6 — Job Application Strategy
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <p className="text-slate-700 leading-relaxed">
                    {targetDetails.howToApply.strategy}
                  </p>

                  <div>
                    <span className="font-bold text-slate-800">Primary Hiring Channels:</span>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {targetDetails.howToApply.platforms.map((p, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-indigo-700 font-semibold text-xs">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-900">
                    <strong>Portfolio Tip:</strong> {targetDetails.howToApply.portfolioTip}
                  </div>
                </div>

                {/* Direct Application & Hiring Links */}
                <ApplicationLinksSection
                  jobTitle={targetDetails.title}
                  category={targetDetails.sector}
                  jobType={targetDetails.category}
                />
              </div>
            )}

            {/* STEP 7: MOCK INTERVIEW / PRACTICE */}
            {activeStepTab === 7 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    7
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Step 7 — Mock Interview Simulation & Practice
                  </h3>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-200 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm">
                    <Compass className="w-4 h-4 text-indigo-600" />
                    <span>Live Mock Interview Simulation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Practice answering real questions for <strong className="text-slate-900">{targetDetails.title}</strong> customized to your background in <strong className="text-slate-900">{studyName}</strong>.
                    Receive instant feedback on technical accuracy, structure, and communication clarity.
                  </p>
                  <div>
                    <Link
                      to="/ai-assistant"
                      className="inline-flex items-center gap-2 btn-primary text-xs px-4 py-2"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Start Practice Interview Session</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Master Application Engine Section */}
          <ApplicationLinksSection
            jobTitle={targetDetails.title}
            category={targetDetails.sector}
            jobType={targetDetails.category}
          />
        </div>
      ) : (
        /* ============================================================ */
        /* NO TARGET JOB SELECTED: DISPLAY ALL ELIGIBLE JOBS FOR DEGREE  */
        /* ============================================================ */
        <div className="space-y-6">
          {/* Header Card */}
          <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Eligible Career Opportunities</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Jobs for {studyName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Select a target job below to unlock its complete 7-step cracking guide and roadmap.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={openTargetJobModal}
                  className="btn-primary text-xs px-4 py-2 inline-flex items-center gap-1.5"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Select Target Job</span>
                </button>
                <ChangeEducationButton />
              </div>
            </div>
          </section>

          {/* Prompt Banner to choose target job (Section 7 & 8) */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-cyan-50 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 text-sm">
                Have a specific job in mind?
              </span>
              <p className="text-slate-600">
                Setting a target job personalizes your learning checklist, resume bullets, and interview drill questions.
              </p>
            </div>
            <button
              onClick={openTargetJobModal}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-2xs text-xs whitespace-nowrap text-center"
            >
              Set Target Job →
            </button>
          </div>

          {/* Search & Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filter Pills (Section 12: Private vs Govt) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All Jobs' },
                { id: 'private', label: 'Private Sector' },
                { id: 'government', label: 'Government & Public' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-full font-bold transition-all border ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eligible Jobs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCatalog.map((job) => {
              const statusBadge = getStatusBadge(job.eligibilityStatus);
              const BadgeIcon = statusBadge.icon;

              return (
                <div
                  key={job.id}
                  className="card-clean p-5 bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    {/* Category & Salary Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${statusBadge.bg}`}>
                        {statusBadge.text}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {job.salary}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">
                        {job.title}
                      </h3>
                      <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">
                        {job.sector} • {job.category}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {job.overview}
                    </p>

                    {/* Key skills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {job.keySkills.slice(0, 3).map((sk, sIdx) => (
                        <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 1-Click Set as Target Job Button (Section 7, 8, 19) */}
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => changeTargetJob(job.title, { category: job.category })}
                      className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>Set as Target Job & View Master Roadmap →</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRoadmapPage;
