import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Briefcase,
  GraduationCap,
  Building,
  Award,
  ArrowRight,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Shield,
  Layers,
  ChevronRight,
  Filter,
  Search,
  RotateCw,
  Compass,
  Target
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';

export const ExploreOpportunitiesSection = ({ defaultEducation = 'B.Com' }) => {
  const { currentEducation, changeTargetJob, setToastMessage } = useEducation();
  const navigate = useNavigate();

  const studyName = currentEducation?.educationName || defaultEducation || 'B.Com';
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic opportunities generator based on student's education background
  const getOpportunitiesData = (edu, apiJobs = [], apiStudies = []) => {
    const lower = (edu || '').toLowerCase();
    const isTech = lower.includes('tech') || lower.includes('cs') || lower.includes('bca') || lower.includes('mca') || lower.includes('computer');
    const isCommerce = lower.includes('com') || lower.includes('bba') || lower.includes('mba') || lower.includes('finance') || lower.includes('account');
    const isScience = lower.includes('science') || lower.includes('b.sc') || lower.includes('12th science') || lower.includes('physics') || lower.includes('math');
    const isDiploma = lower.includes('diploma') || lower.includes('polytechnic') || lower.includes('iti');

    const defaultItems = [
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
        badgeColor: 'bg-indigo-50 text-[#4F46E5] border border-indigo-200'
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
        badgeColor: 'bg-purple-50 text-[#7C3AED] border border-purple-200'
      },
      {
        id: isCommerce ? 'financial-analyst' : 'product-operations-specialist',
        title: isCommerce ? 'Corporate Financial Analyst' : 'Product Operations Specialist',
        category: isCommerce ? 'Finance & Banking' : 'Business Operations',
        type: 'private_job',
        salary: '₹6.5 - 14.0 LPA',
        demand: 'High Corporate Demand',
        eligibility: `${studyName} with quantitative / analytics skills`,
        hirers: ['J.P. Morgan', 'Morgan Stanley', 'HDFC Bank', 'KPMG', 'EY'],
        description: isCommerce
          ? 'Conduct company valuation, cash-flow forecasting, quarterly budgeting, and investment risk assessment.'
          : 'Streamline digital product workflows, user onboarding metrics, and customer experience operations.',
        tags: isCommerce ? ['Financial Modeling', 'DCF', 'Advanced Excel'] : ['Product Ops', 'Jira', 'SQL', 'Metrics'],
        badgeColor: 'bg-cyan-50 text-[#0891B2] border border-cyan-200'
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
        badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200'
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
        badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200'
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
        badgeColor: 'bg-blue-50 text-blue-800 border border-blue-200'
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
        badgeColor: 'bg-purple-50 text-[#7C3AED] border border-purple-200'
      },
      {
        id: 'specialized-masters',
        title: isCommerce ? 'Master of Commerce (M.Com) / CFA' : (isTech ? 'M.Tech / M.Sc Computer Science' : 'Master of Arts (MA) / Specialized PG'),
        category: 'Specialized Masters',
        type: 'higher_study',
        salary: '₹8.0 - 18.0 LPA',
        demand: 'Deep Domain Authority',
        eligibility: `Bachelor Degree in relevant discipline`,
        hirers: ['IITs / NITs / Premier Universities', 'Global Research Centers'],
        description: 'Advanced academic and applied mastery preparing you for specialist roles, R&D, and higher advisory positions.',
        tags: ['Advanced Theory', 'Thesis Project', 'Research', 'Specialization'],
        badgeColor: 'bg-indigo-50 text-[#4F46E5] border border-indigo-200'
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
        badgeColor: 'bg-teal-50 text-[#059669] border border-teal-200'
      }
    ];

    return defaultItems;
  };

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const [jobsRes, studiesRes] = await Promise.allSettled([
          api.get('/jobs'),
          api.get('/studies')
        ]);

        const jobs = jobsRes.status === 'fulfilled'
          ? (Array.isArray(jobsRes.value?.data) ? jobsRes.value.data : (Array.isArray(jobsRes.value) ? jobsRes.value : []))
          : [];
        const studies = studiesRes.status === 'fulfilled'
          ? (Array.isArray(studiesRes.value?.data) ? studiesRes.value.data : (Array.isArray(studiesRes.value) ? studiesRes.value : []))
          : [];

        if (isMounted) {
          const generated = getOpportunitiesData(studyName, jobs, studies);
          setOpportunities(generated);
        }
      } catch (err) {
        if (isMounted) {
          setOpportunities(getOpportunitiesData(studyName));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [studyName]);

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
      navigate(`/study-next`);
    } else {
      changeTargetJob(item.title);
      if (setToastMessage) {
        setToastMessage(`🎯 Set "${item.title}" as your active target job.`);
      }
      navigate(`/jobs`);
    }
  };

  return (
    <section id="explore-opportunities-hub" className="space-y-6">
      {/* Header Banner - Standard Clean Styling */}
      <div className="card-clean p-4.5 sm:p-8 bg-white border border-[#E2E8F0] space-y-4 sm:space-y-5 rounded-2xl sm:rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold">
              <Compass className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Tailored Opportunities Engine</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#0F172A]">
              Explore All Opportunities for {studyName}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Curated private jobs, official government vacancies, postgraduate degrees, and industry credentials accepting your qualification.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center flex-shrink-0">
            <span className="px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A]">
              🎯 {opportunities.length} Verified Pathways
            </span>
          </div>
        </div>

        {/* Filter Pills (Mobile Horizontal Swipe) and Quick Search */}
        <div className="pt-3 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x py-1.5 -mx-3 px-3 md:mx-0 md:px-0 md:flex-wrap text-xs w-full md:w-auto">
            {[
              { id: 'all', label: 'All Opportunities' },
              { id: 'jobs', label: 'All Careers & Jobs' },
              { id: 'private', label: 'Private & MNCs' },
              { id: 'govt', label: 'Government & Defence' },
              { id: 'study', label: 'Higher Studies' },
              { id: 'cert', label: 'Certifications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  activeFilter === tab.id
                    ? 'bg-[#4F46E5] text-white font-bold shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] border border-[#E2E8F0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill, title, recruiter..."
              className="w-full pl-9 pr-3 py-2 sm:py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-base sm:text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid of Opportunities */}
      {loading ? (
        <div className="card-clean p-12 text-center space-y-3 bg-white border border-[#E2E8F0]">
          <RotateCw className="w-6 h-6 text-[#4F46E5] animate-spin mx-auto" />
          <p className="text-xs text-[#64748B] font-semibold">
            Loading tailored opportunities for {studyName}...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="card-clean p-4.5 sm:p-6 bg-white border border-[#E2E8F0] hover:border-[#C7D2FE] flex flex-col justify-between space-y-4 group rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                {/* Category Badge & Estimated Salary */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {item.salary}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-[11px] text-[#64748B] font-medium mt-0.5">
                    <strong className="text-slate-700">Eligibility: </strong> {item.eligibility}
                  </div>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tg, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]"
                    >
                      {tg}
                    </span>
                  ))}
                </div>

                {/* Major Hirers / Institutions */}
                <div className="pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                  <span className="font-bold text-slate-700">Top Recruiters: </span>
                  <span>{item.hirers.slice(0, 3).join(', ')}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleAction(item)}
                  className="w-full btn-primary !text-xs !py-2.5 sm:!py-2 !px-3 !rounded-xl justify-center flex items-center gap-1.5 active:scale-[0.98] transition-transform cursor-pointer"
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
      )}

      {!loading && filteredList.length === 0 && (
        <div className="card-clean p-8 text-center bg-white rounded-2xl border border-[#E2E8F0] text-[#64748B] text-xs">
          No opportunities matched your search. Try clearing the filter or search query.
        </div>
      )}
    </section>
  );
};

export default ExploreOpportunitiesSection;
