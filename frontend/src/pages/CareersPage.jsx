import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Briefcase,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  Target,
  Search,
  Filter
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';

export const CareersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentEducation,
    targetJob,
    changeTargetJob,
    removeTargetJob,
    openTargetJobModal
  } = useEducation();

  const studyName = currentEducation.educationName || 'B.Com';
  const activeTargetJobTitle = targetJob?.targetJobName;

  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Master catalog of grounded career fields
  const getAllEducationCareers = (edu) => {
    const lower = (edu || '').toLowerCase();

    if (lower.includes('com') || lower.includes('commerce') || lower.includes('finance')) {
      return [
        {
          id: 'data-analytics',
          name: 'Data Analytics & Business Intelligence',
          tag: 'High Growth',
          growthOutlook: 'Exponential Growth (+24% YoY)',
          demandScore: 95,
          isTargetFocused: true, // Relevant to Data Analyst
          overview: 'Extracting commercial value from structured enterprise records through SQL, Python, and Power BI dashboards.',
          whyRelevant: 'Translates financial and business knowledge from B.Com into predictive and quantitative dashboards.',
          requiredSkills: ['SQL', 'Power BI / Tableau', 'Python (Pandas)', 'Advanced Excel', 'Statistical Modeling'],
          relatedJobs: ['Data Analyst', 'Business Intelligence Developer', 'Financial Data Analyst', 'Reporting Specialist'],
          whatToStudy: ['Relational Database Systems', 'Business Metrics & KPIs', 'Data Storytelling & Executive Presentations'],
          projects: ['Sales Revenue & Retention Interactive Dashboard', 'Customer Churn RFM Segmentation Model'],
          certifications: ['Microsoft Certified: Power BI Data Analyst (PL-300)', 'Google Data Analytics Certificate'],
          careerProgression: 'Junior Data Analyst → Senior BI Analyst → Lead Analytics Architect → Head of Data'
        },
        {
          id: 'business-analytics',
          name: 'Business Analytics & Decision Science',
          tag: 'High Growth',
          growthOutlook: 'High Expansion (+20% YoY)',
          demandScore: 92,
          isTargetFocused: true, // Relevant to Data Analyst
          overview: 'Bridging technical data pipelines and management strategy to optimize corporate operational workflows and pricing models.',
          whyRelevant: 'Leverages business management insights alongside analytical queries to drive executive decisions.',
          requiredSkills: ['Business Process Mapping', 'SQL', 'Scenario Analysis', 'Data Visualization', 'A/B Testing'],
          relatedJobs: ['Business Analyst', 'Commercial Strategy Analyst', 'Operations Analyst'],
          whatToStudy: ['Management Information Systems (MIS)', 'Predictive Analytics', 'Managerial Decision Analysis'],
          projects: ['Supply Chain Bottleneck Simulation', 'E-Commerce Pricing Elasticity Model'],
          certifications: ['ECBA (Entry Certificate in Business Analysis)', 'CBAP'],
          careerProgression: 'Business Analyst → Senior Strategy Consultant → VP of Business Intelligence'
        },
        {
          id: 'accounting',
          name: 'Accounting & Auditing',
          tag: 'Core Commerce',
          growthOutlook: 'Steady Demand (+12% YoY)',
          demandScore: 88,
          isTargetFocused: false,
          overview: 'The discipline of recording, analyzing, auditing, and reporting corporate transactions and statutory balance sheets.',
          whyRelevant: 'Direct core foundation of your B.Com degree curriculum.',
          requiredSkills: ['Financial Accounting', 'Tally Prime / ERP', 'Advanced Excel', 'Auditing Standards'],
          relatedJobs: ['Accountant', 'Accounts Executive', 'Internal Auditor', 'Billing Specialist'],
          whatToStudy: ['Advanced Corporate Accounting', 'Indian Accounting Standards (Ind AS)', 'Direct & Indirect Taxes'],
          projects: ['12-Month SME Financial Statements & Ledger', 'Bank Reconciliation & Internal Control Audit'],
          certifications: ['CA Intermediate / Final', 'CMA India', 'Tally Professional Certification'],
          careerProgression: 'Junior Accountant → Senior Accountant → Accounting Manager → Financial Controller → CFO'
        },
        {
          id: 'finance',
          name: 'Corporate Finance & Valuation',
          tag: 'High Paying',
          growthOutlook: 'High Demand (+16% YoY)',
          demandScore: 92,
          isTargetFocused: false,
          overview: 'Allocating capital, evaluating investment proposals, building valuation models, and managing portfolio risk.',
          whyRelevant: 'Direct extension of financial management coursework.',
          requiredSkills: ['Financial Modeling', 'DCF Valuation', 'Corporate Finance', 'Capital Budgeting'],
          relatedJobs: ['Junior Financial Analyst', 'Equity Research Associate', 'Investment Banking Analyst'],
          whatToStudy: ['Corporate Finance Theory', 'Investment Banking Essentials', 'Mergers & Acquisitions'],
          projects: ['Full 3-Statement Forecast Model of Listed Firm', 'Discounted Cash Flow (DCF) Equity Valuation Report'],
          certifications: ['CFA (Chartered Financial Analyst)', 'NISM Research Analyst Certification', 'FRM'],
          careerProgression: 'Financial Analyst → Senior Analyst → Portfolio Manager → Director of Investments'
        },
        {
          id: 'banking',
          name: 'Commercial & Retail Banking',
          tag: 'High Volume',
          growthOutlook: 'Large Volume (+14% YoY)',
          demandScore: 86,
          isTargetFocused: false,
          overview: 'Commercial and retail banking operations, credit underwriting, treasury management, and retail lending.',
          whyRelevant: 'B.Com graduates form the primary recruitment pool for banking officers and operations executives.',
          requiredSkills: ['Banking Operations', 'Credit Risk Appraisal', 'KYC/AML Compliance', 'Customer Advisory'],
          relatedJobs: ['Banking Associate', 'Probationary Officer (PO)', 'Credit Manager', 'Branch Relationship Officer'],
          whatToStudy: ['Indian Financial System & RBI Guidelines', 'Retail & Corporate Lending', 'Negotiable Instruments Act'],
          projects: ['Credit Scoring Model for SME Working Capital', 'Retail Branch Deposit Campaign Strategy'],
          certifications: ['JAIIB / CAIIB (IIBF)', 'NISM Mutual Fund / Securities Certifications'],
          careerProgression: 'Banking Associate → Branch Operations Head → Chief Manager → AGM / DGM'
        },
        {
          id: 'taxation',
          name: 'Taxation & Statutory Compliance',
          tag: 'Specialized',
          growthOutlook: 'Very High (+18% YoY)',
          demandScore: 89,
          isTargetFocused: false,
          overview: 'Advising on corporate and direct/indirect tax liabilities, filing statutory returns, and handling scrutiny audits.',
          whyRelevant: 'High commercial demand for B.Com candidates skilled in GST and income tax portal filing.',
          requiredSkills: ['GST Regulations', 'Income Tax Act', 'TDS E-filing', 'Tax Computation'],
          relatedJobs: ['Tax Assistant', 'GST Compliance Officer', 'Direct Tax Analyst', 'Tax Consultant'],
          whatToStudy: ['Income Tax Law & Practice', 'Goods and Services Tax (GST) Act', 'International Taxation'],
          projects: ['Comprehensive Old vs New Tax Regime Simulator', 'GSTR-9 Annual Return Audit Reconciliation'],
          certifications: ['Diploma in Taxation Laws (DTL)', 'ICAI Certificate Course on GST'],
          careerProgression: 'Tax Assistant → Tax Consultant → Senior Tax Manager → Partner (Taxation)'
        },
        {
          id: 'operations',
          name: 'Business Operations & Supply Chain',
          tag: 'Operational',
          growthOutlook: 'Steady Growth (+11% YoY)',
          demandScore: 80,
          isTargetFocused: false,
          overview: 'Streamlining business processes, optimizing inventory replenishment, and coordinating logistical execution.',
          whyRelevant: 'Leverages organizational and commerce skills to manage vendor contracts and warehouse efficiency.',
          requiredSkills: ['Process Optimization', 'Vendor Negotiation', 'ERP Platforms', 'KPI Tracking'],
          relatedJobs: ['Business Operations Executive', 'Supply Chain Analyst', 'Procurement Specialist'],
          whatToStudy: ['Operations Research', 'Supply Chain Management', 'Procurement & Contract Law'],
          projects: ['Warehouse Inventory Turnaround Optimization Model', 'Vendor SLA Performance Scorecard'],
          certifications: ['APICS Certified Supply Chain Professional', 'Six Sigma Yellow/Green Belt'],
          careerProgression: 'Operations Executive → Operations Lead → Supply Chain Director → COO'
        }
      ];
    }

    if (lower.includes('electrician') || lower.includes('iti')) {
      return [
        {
          id: 'industrial-electrical',
          name: 'Industrial Electrical & Power Systems',
          tag: 'Core Trade',
          growthOutlook: 'Steady Industrial Need (+14% YoY)',
          demandScore: 90,
          isTargetFocused: true,
          overview: 'Installation and maintenance of industrial high-voltage distribution switchgear, transformer stations, and heavy motor controls.',
          whyRelevant: 'Direct application of your ITI Electrician curriculum and wiring regulations.',
          requiredSkills: ['Panel Wiring', 'Transformer Maintenance', 'LOTO Safety', 'Megger Insulation Testing'],
          relatedJobs: ['Industrial Electrician', 'Panel Board Wireman', 'Maintenance Technician'],
          whatToStudy: ['Indian Electricity Rules', 'AC/DC Motor Control Circuits', 'Switchgear & Protection'],
          projects: ['DOL & Star-Delta Motor Starter Panel Installation', 'Transformer Earth Resistance Test Pit'],
          certifications: ['State Electrical Inspectorate Wireman License', 'NAPS Apprenticeship Certificate'],
          careerProgression: 'Apprentice → Junior Wireman → Master Electrician → Electrical Supervisor'
        },
        {
          id: 'power-transmission',
          name: 'Power Distribution & Renewable Energy',
          tag: 'Government & Green Energy',
          growthOutlook: 'Rapid Expansion (+22% YoY)',
          demandScore: 92,
          isTargetFocused: false,
          overview: 'Overhead power transmission grid maintenance, state substation feeder operations, and solar PV array installations.',
          whyRelevant: 'Qualifies directly for state DISCOM Lineman and solar technician vacancies.',
          requiredSkills: ['Overhead Line Safety', 'Solar PV Installation', 'Substation Feeder Maintenance'],
          relatedJobs: ['Junior Lineman (DISCOM)', 'Solar Installation Technician', 'Substation Operator'],
          whatToStudy: ['Substation Layout & Equipment', 'Solar Inverter Topology', 'High-Voltage Safety Norms'],
          projects: ['5kW Grid-Tied Solar Inverter Wiring Simulation', 'Substation Single Line Diagram Analysis'],
          certifications: ['Surya Mitra Solar PV Technician', 'High Voltage Line Safety Pass'],
          careerProgression: 'Junior Lineman → Line Inspector → Substation In-Charge'
        }
      ];
    }

    // Default Tech
    return [
      {
        id: 'software-tech',
        name: 'Software & Technology Solutions',
        tag: 'Core Tech',
        growthOutlook: 'Very High (+22% YoY)',
        demandScore: 94,
        isTargetFocused: true,
        overview: 'Designing, building, testing, and maintaining distributed web applications, APIs, and microservices.',
        whyRelevant: 'Direct alignment with programming, algorithmic, and software development coursework.',
        requiredSkills: ['JavaScript / TypeScript', 'React.js', 'Node.js & Express', 'Databases (SQL & NoSQL)'],
        relatedJobs: ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer'],
        whatToStudy: ['Data Structures & Algorithms', 'System Architecture', 'Modern Web Standards'],
        projects: ['Full-Stack E-Commerce API', 'Real-Time Collaboration Platform with WebSockets'],
        certifications: ['AWS Certified Developer', 'Meta Full-Stack Engineer Certificate'],
        careerProgression: 'Software Engineer → Senior Engineer → Tech Lead → Engineering Director → CTO'
      },
      {
        id: 'data-ai',
        name: 'Data & Artificial Intelligence',
        tag: 'High Growth',
        growthOutlook: 'Rapid Expansion (+26% YoY)',
        demandScore: 96,
        isTargetFocused: true,
        overview: 'Leveraging big data, machine learning pipelines, predictive analytics, and applied AI models.',
        whyRelevant: 'Deep connection to data modeling and computer intelligence.',
        requiredSkills: ['Python', 'SQL', 'Pandas', 'Machine Learning Models', 'Data Visualizations'],
        relatedJobs: ['Data Analyst', 'Data Scientist', 'Machine Learning Engineer', 'BI Analyst'],
        whatToStudy: ['Applied Machine Learning', 'Big Data Engineering', 'Statistical Inference'],
        projects: ['Predictive Customer Churn Pipeline', 'Interactive KPI Intelligence Dashboard'],
        certifications: ['Google Data Analytics', 'AWS Certified Machine Learning Specialist'],
        careerProgression: 'Data Analyst → Data Scientist → AI Solutions Architect'
      }
    ];
  };

  const allCareers = getAllEducationCareers(studyName);

  // SECTION 16: If Target Job is selected, focus on career fields related to the target job
  const hasTargetJob = Boolean(activeTargetJobTitle);
  const targetJobLower = (activeTargetJobTitle || '').toLowerCase();

  // Filter career fields based on target job if selected
  const focusedCareers = hasTargetJob
    ? allCareers.filter((c) => {
        if (targetJobLower.includes('data') || targetJobLower.includes('analyst')) {
          return c.id === 'data-analytics' || c.id === 'business-analytics' || c.id === 'finance';
        }
        if (targetJobLower.includes('accountant') || targetJobLower.includes('tax')) {
          return c.id === 'accounting' || c.id === 'taxation' || c.id === 'finance';
        }
        if (targetJobLower.includes('electrician')) {
          return c.id === 'industrial-electrical' || c.id === 'power-transmission';
        }
        return true;
      })
    : allCareers;

  const displayCareers = focusedCareers.filter((c) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.overview.toLowerCase().includes(q) ||
      c.requiredSkills.some(s => s.toLowerCase().includes(q))
    );
  });

  const activeCareer = displayCareers.find(c => c.id === selectedCareerId) || displayCareers[0];

  return (
    <div className="space-y-8 py-2 sm:py-6 max-w-4xl mx-auto">
      {/* Header Card (Section 16) */}
      <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Career Field Explorer</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {hasTargetJob ? (
                <>Careers Focused on: <span className="text-purple-600">{activeTargetJobTitle}</span></>
              ) : (
                <>Careers Related to: <span className="text-indigo-600">{studyName}</span></>
              )}
            </h1>

            <div className="text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-2 pt-0.5">
              <span>Based on:</span>
              <span className="font-bold text-indigo-600">{studyName}</span>
              {hasTargetJob && (
                <>
                  <span>+</span>
                  <span className="font-bold text-purple-600">Target: {activeTargetJobTitle}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {hasTargetJob && <ChangeTargetJobButton label="Change Target" />}
            <ChangeEducationButton />
          </div>
        </div>

        {/* Section 16 Notice Banner when Target Job is active */}
        {hasTargetJob ? (
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>
                Personalized for <strong>{activeTargetJobTitle}</strong>. Showing domain fields that lead to or closely complement this target.
              </span>
            </div>
            <button
              onClick={removeTargetJob}
              className="text-purple-700 hover:text-purple-900 font-bold underline cursor-pointer text-xs whitespace-nowrap"
            >
              Show all fields for {studyName}
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>
                Showing all general career fields for <strong>{studyName}</strong>. Have a target job? Select one to focus your career view.
              </span>
            </div>
            <button
              onClick={openTargetJobModal}
              className="text-indigo-700 hover:text-indigo-900 font-bold underline cursor-pointer text-xs whitespace-nowrap"
            >
              Set Target Job
            </button>
          </div>
        )}
      </section>

      {/* Career Fields Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">
            {displayCareers.length} Relevant Career {displayCareers.length === 1 ? 'Field' : 'Fields'}
          </h2>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search career fields..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayCareers.map((career) => {
            const isSelected = activeCareer?.id === career.id;

            return (
              <div
                key={career.id}
                onClick={() => setSelectedCareerId(career.id)}
                className={`card-clean p-5 cursor-pointer transition-all border space-y-3.5 flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/20 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:-translate-y-0.5'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {career.tag}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      {career.growthOutlook}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {career.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {career.overview}
                    </p>
                  </div>

                  {/* Why relevant */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    <strong className="text-slate-800">Connection to {studyName}: </strong>
                    {career.whyRelevant}
                  </div>

                  {/* Required skills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {career.requiredSkills.slice(0, 4).map((sk, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sub-roles & Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Key Roles: </span>
                    {career.relatedJobs.slice(0, 2).join(', ')}
                  </div>
                  <span className="font-bold text-indigo-600 flex items-center gap-1">
                    {isSelected ? 'Viewing Details' : 'Explore Field →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Selected Career Deep Dive */}
      {activeCareer && (
        <section className="card-clean p-6 sm:p-8 bg-white border border-indigo-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                Detailed Field Breakdown
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                {activeCareer.name}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Demand Score: {activeCareer.demandScore}/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Roles inside this field */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                <span>Job Roles in this Field</span>
              </div>
              <div className="space-y-1.5 pt-1">
                {activeCareer.relatedJobs.map((role, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span className="font-bold text-slate-800">{role}</span>
                    <button
                      onClick={() => changeTargetJob(role)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors"
                    >
                      Set as Target Job
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* What to study */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                <span>What to Study for this Field</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 list-disc list-inside pt-1">
                {activeCareer.whatToStudy.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            {/* Recommended Projects */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-600" />
                <span>Recommended Projects to Build</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 list-disc list-inside pt-1">
                {activeCareer.projects.map((proj, idx) => (
                  <li key={idx} className="leading-relaxed">{proj}</li>
                ))}
              </ul>
            </div>

            {/* Certifications & Progression */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Industry Certifications</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeCareer.certifications.map((cert, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold text-[11px]">
                    {cert}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <span className="font-bold text-slate-800 text-[11px]">Career Progression: </span>
                <p className="text-indigo-600 font-semibold text-[11px] mt-0.5">
                  {activeCareer.careerProgression}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CareersPage;
