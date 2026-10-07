import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Briefcase,
  GraduationCap,
  Building,
  Award,
  ArrowRight,
  Sparkles,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Shield,
  Layers,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';

export const ExploreOpportunitiesSection = ({ defaultEducation = 'B.Com' }) => {
  const { currentEducation, changeTargetJob } = useEducation();
  const navigate = useNavigate();

  const studyName = currentEducation?.educationName || defaultEducation || 'B.Com';
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Comprehensive master opportunities catalog tailored to student's background
  const getOpportunitiesData = (edu) => {
    const lower = (edu || '').toLowerCase();
    const isTech = lower.includes('tech') || lower.includes('cs') || lower.includes('bca') || lower.includes('mca') || lower.includes('computer');
    const isCommerce = lower.includes('com') || lower.includes('bba') || lower.includes('mba') || lower.includes('finance') || lower.includes('account');
    const isScience = lower.includes('science') || lower.includes('b.sc') || lower.includes('12th science') || lower.includes('physics') || lower.includes('math');
    const isDiploma = lower.includes('diploma') || lower.includes('polytechnic') || lower.includes('iti');

    return [
      // 1. PRIVATE SECTOR JOBS
      {
        id: 'data-analyst',
        title: 'Data Analyst / BI Specialist',
        category: 'Private Tech',
        type: 'private_job',
        salary: '₹6.0 - 11.5 LPA',
        demand: 'Very High Growth (+28% YoY)',
        eligibility: `${studyName} + SQL & Power BI`,
        hirers: ['Amazon', 'Deloitte', 'Flipkart', 'Accenture', 'Swiggy'],
        description: 'Transform raw enterprise data into executive dashboards, revenue models, and operational metrics.',
        tags: ['SQL', 'Power BI', 'Excel', 'Python'],
        accent: 'from-indigo-500/10 to-cyan-500/10 border-indigo-200 text-indigo-900',
        badgeColor: 'bg-indigo-100 text-indigo-800'
      },
      {
        id: 'software-engineer',
        title: 'Software Development Engineer (SDE)',
        category: 'Product Tech',
        type: 'private_job',
        salary: '₹8.0 - 24.0 LPA',
        demand: 'Massive Global Demand',
        eligibility: `${studyName} with programming foundations`,
        hirers: ['Microsoft', 'Google', 'TCS Digital', 'Infosys', 'Razorpay'],
        description: 'Design, code, and deploy scalable cloud backend systems, frontend web apps, and distributed microservices.',
        tags: ['Full Stack', 'Java / Python', 'React', 'Databases'],
        accent: 'from-purple-500/10 to-indigo-500/10 border-purple-200 text-purple-900',
        badgeColor: 'bg-purple-100 text-purple-800'
      },
      {
        id: 'financial-analyst',
        title: 'Corporate Financial Analyst',
        category: 'Finance & Banking',
        type: 'private_job',
        salary: '₹6.5 - 14.0 LPA',
        demand: 'High Corporate Demand',
        eligibility: `${studyName} with financial modeling skills`,
        hirers: ['J.P. Morgan', 'Morgan Stanley', 'HDFC Bank', 'KPMG', 'EY'],
        description: 'Conduct company valuation, cash-flow forecasting, quarterly budgeting, and investment risk assessment.',
        tags: ['Financial Modeling', 'DCF', 'Advanced Excel', 'Bloomberg'],
        accent: 'from-blue-500/10 to-indigo-500/10 border-blue-200 text-blue-900',
        badgeColor: 'bg-blue-100 text-blue-800'
      },

      // 2. GOVERNMENT & DEFENCE OPPORTUNITIES
      {
        id: 'police-si',
        title: 'State Police Sub-Inspector & SSC CPO',
        category: 'Police & Defence',
        type: 'government_job',
        salary: '₹6.5 - 11.0 LPA (Pay Level 6 + Allowances)',
        demand: 'Regular Annual Vacancies',
        eligibility: `Any Graduation (${studyName} accepted) • Age 20-25 yrs`,
        hirers: ['State Police Recruitment Boards', 'Delhi Police', 'BSF / CRPF / CISF'],
        description: 'Command police stations, maintain law & order, conduct criminal investigations, and lead armed units.',
        tags: ['Physical Standards', 'General Studies', 'Reasoning', 'Aptitude'],
        accent: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-900',
        badgeColor: 'bg-emerald-100 text-emerald-800'
      },
      {
        id: 'bank-po',
        title: 'Bank Probationary Officer (IBPS & SBI PO)',
        category: 'Public Sector Banking',
        type: 'government_job',
        salary: '₹7.5 - 13.0 LPA (With HRA & Perks)',
        demand: '5,000+ Annual Public Vacancies',
        eligibility: `Graduate in any discipline (${studyName} eligible) • Age 20-30 yrs`,
        hirers: ['State Bank of India', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank'],
        description: 'Officer-level banking management handling retail credit underwriting, treasury, and commercial operations.',
        tags: ['Quantitative Aptitude', 'Banking Awareness', 'Data Interpretation'],
        accent: 'from-amber-500/10 to-emerald-500/10 border-amber-200 text-amber-900',
        badgeColor: 'bg-amber-100 text-amber-800'
      },
      {
        id: 'ssc-cgl',
        title: 'SSC CGL (Inspector & Assistant Section Officer)',
        category: 'Central Government Group B',
        type: 'government_job',
        salary: '₹7.0 - 12.5 LPA (Central 7th CPC)',
        demand: 'Prestigious Central Cadres',
        eligibility: `Bachelor Degree in any stream • Age 18-30/32 yrs`,
        hirers: ['Ministry of External Affairs', 'Income Tax Dept', 'Central Excise / GST', 'CBI'],
        description: 'Direct inspection, policy execution, and intelligence administration across premier central ministries.',
        tags: ['General Awareness', 'English', 'Math', 'Tier I & II Exams'],
        accent: 'from-cyan-500/10 to-blue-500/10 border-cyan-200 text-cyan-900',
        badgeColor: 'bg-cyan-100 text-cyan-800'
      },

      // 3. HIGHER EDUCATION & MASTERS PATHS
      {
        id: 'mba-program',
        title: 'Master of Business Administration (MBA)',
        category: 'Postgraduate Management',
        type: 'higher_study',
        salary: '₹12.0 - 32.0 LPA (Top B-Schools Average)',
        demand: 'Top Career Accelerator',
        eligibility: `Graduation with 50%+ • Entrance via CAT / XAT / GMAT`,
        hirers: ['IIMs', 'XLRI', 'FMS Delhi', 'Symbiosis', 'Top Private Universities'],
        description: '2-year intensive program specializing in Finance, Marketing, Operations, Product, or Business Analytics.',
        tags: ['CAT / XAT', 'Case Studies', 'Leadership', 'Summer Internship'],
        accent: 'from-purple-500/10 to-rose-500/10 border-purple-200 text-purple-900',
        badgeColor: 'bg-purple-100 text-purple-800'
      },
      {
        id: 'm-tech-msc',
        title: isCommerce ? 'Master of Commerce (M.Com) / CFA' : 'M.Tech / M.Sc Advanced Computing',
        category: 'Specialized Masters',
        type: 'higher_study',
        salary: '₹8.0 - 18.0 LPA',
        demand: 'Deep Domain Authority',
        eligibility: `Bachelor Degree in relevant discipline`,
        hirers: ['IITs / NITs / Premier Universities', 'Global Research Centers'],
        description: 'Advanced academic and applied mastery preparing you for specialist roles, R&D, and higher advisory positions.',
        tags: ['Advanced Theory', 'Thesis Project', 'Research', 'Specialization'],
        accent: 'from-indigo-500/10 to-purple-500/10 border-indigo-200 text-indigo-900',
        badgeColor: 'bg-indigo-100 text-indigo-800'
      },

      // 4. HIGH-ROI CERTIFICATIONS & FAST-TRACK
      {
        id: 'cert-cloud-data',
        title: 'Professional Cloud & Data Architect Certification',
        category: 'Industry Certification',
        type: 'certification',
        salary: 'Boosts Fresher CTC by +40%',
        demand: 'Global Recruiter Validation',
        eligibility: 'Self-paced or 3-6 months structured prep',
        hirers: ['Microsoft (PL-300 / Azure)', 'Google Cloud', 'AWS Certified', 'NISM / ACCA'],
        description: 'Globally recognized credentials that prove production competence and fast-track automated ATS resume shortlisting.',
        tags: ['Industry Credential', 'Proctored Exam', 'LinkedIn Badge'],
        accent: 'from-teal-500/10 to-cyan-500/10 border-teal-200 text-teal-900',
        badgeColor: 'bg-teal-100 text-teal-800'
      }
    ];
  };

  const opportunities = getOpportunitiesData(studyName);

  const filteredList = opportunities.filter((item) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'jobs' && (item.type === 'private_job' || item.type === 'government_job')) ||
      (activeFilter === 'govt' && item.type === 'government_job') ||
      (activeFilter === 'private' && item.type === 'private_job') ||
      (activeFilter === 'study' && item.type === 'higher_study') ||
      (activeFilter === 'cert' && item.type === 'certification');

    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleAction = (item) => {
    if (item.type === 'higher_study') {
      navigate(`/study/${encodeURIComponent(item.title.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`);
    } else {
      changeTargetJob(item.title);
      navigate(`/job-roadmap?job=${encodeURIComponent(item.title)}`);
    }
  };

  return (
    <section id="explore-opportunities-hub" className="space-y-6 pt-4">
      {/* Header Banner */}
      <div className="card-clean p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 text-white rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Tailored Intelligence Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Explore All Opportunities for {studyName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curated private jobs, official government vacancies, postgraduate degrees, and industry credentials accepting your qualification.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white font-bold text-xs border border-white/20">
              🎯 {opportunities.length} Verified Routes
            </span>
          </div>
        </div>

        {/* Filter Pills and Quick Search */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-1.5 text-xs w-full md:w-auto">
            {[
              { id: 'all', label: 'All Opportunities' },
              { id: 'jobs', label: 'All Careers & Jobs' },
              { id: 'private', label: 'Private & MNCs' },
              { id: 'govt', label: 'Government & Defence' },
              { id: 'study', label: 'Higher Studies (Masters)' },
              { id: 'cert', label: 'Certifications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-white text-indigo-950 shadow-md scale-105'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill or title..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Grid of Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className={`card-clean p-5 bg-white border border-slate-200 hover:border-indigo-400 flex flex-col justify-between space-y-4 group rounded-2xl shadow-2xs hover:shadow-md transition-all`}
          >
            <div className="space-y-3">
              {/* Category Badge & Estimated Salary */}
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md ${item.badgeColor}`}>
                  {item.category}
                </span>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                  {item.salary}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  <strong className="text-slate-700">Eligibility: </strong> {item.eligibility}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {item.tags.map((tg, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {tg}
                  </span>
                ))}
              </div>

              {/* Major Hirers / Institutions */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="font-bold text-slate-700">Top Recruiters: </span>
                <span>{item.hirers.slice(0, 3).join(', ')}</span>
              </div>
            </div>

            {/* 1-Click Action Button */}
            <div className="pt-2">
              <button
                onClick={() => handleAction(item)}
                className="w-full py-2 px-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                {item.type === 'higher_study' ? (
                  <>
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>View Study Syllabus & Exams →</span>
                  </>
                ) : (
                  <>
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Crack This Role & Apply →</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredList.length === 0 && (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No opportunities matched your search. Try clearing the filter or search query.
        </div>
      )}
    </section>
  );
};

export default ExploreOpportunitiesSection;
