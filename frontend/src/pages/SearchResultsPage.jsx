import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Search as SearchIcon,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Layers,
  BookOpen,
  Award,
  CheckCircle2,
  Building,
  Target,
  ChevronRight,
  Compass,
  RotateCw,
  AlertCircle,
  User,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';
import { StudyCard } from '../components/StudyCard.jsx';
import { JobCard } from '../components/JobCard.jsx';
import { ExamCard } from '../components/ExamCard.jsx';
import { CareerCard } from '../components/CareerCard.jsx';
import { CertificationCard } from '../components/CertificationCard.jsx';
import { TaxonomyBrowser } from '../components/TaxonomyBrowser.jsx';

export const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(queryParam);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showTaxonomy, setShowTaxonomy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({ query: '', count: 0, results: [] });
  const [error, setError] = useState(null);

  const { user, profile } = useAuth();
  const {
    currentEducation,
    targetJob,
    openChangeModal,
    changeTargetJob,
    setToastMessage
  } = useEducation();

  const rawName = user?.name || profile?.name || 'Explorer';
  const userName = rawName.trim().split(' ')[0] || 'Explorer';
  const studyName = currentEducation?.educationName || profile?.studyText || 'B.Tech Computer Science';
  const isCompleted = currentEducation?.status !== 'currently_studying';
  const statusLabel = isCompleted ? 'Completed' : 'Currently Studying';
  const targetJobName = targetJob?.targetJobName || 'Software Development Engineer (SDE)';

  const filterTabs = [
    { id: 'ALL', label: 'All Results' },
    { id: 'STUDY', label: 'Studies & Degrees' },
    { id: 'JOB', label: 'Private Jobs' },
    { id: 'GOVERNMENT_JOB', label: 'Govt Jobs & Exams' },
    { id: 'CAREER', label: 'Career Fields' },
    { id: 'EXAM', label: 'Entrance Exams' },
    { id: 'CERTIFICATION', label: 'Certifications' }
  ];

  const executeSearch = async (q, cat = 'ALL') => {
    const query = q ? q.trim() : studyName;
    setLoading(true);
    setError(null);
    try {
      let url = `/search?q=${encodeURIComponent(query)}`;
      if (cat && cat !== 'ALL') {
        url += `&category=${encodeURIComponent(cat)}`;
      }
      const res = await api.get(url);
      if (res && res.data) {
        setSearchData(res.data);
      } else if (res && res.results) {
        setSearchData(res);
      }
    } catch (err) {
      console.error('[SearchResultsPage] Search error:', err);
      setError('Unable to load exploration results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchInput(queryParam);
    // If a search query is present, search for it; otherwise load tailored recommendations for the user's education
    executeSearch(queryParam || studyName, activeCategory);
  }, [queryParam, activeCategory, studyName]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    executeSearch(queryParam || studyName, cat);
  };

  const handleQuickFilter = (queryText) => {
    setSearchInput(queryText);
    setSearchParams({ q: queryText });
  };

  const filteredResults = searchData.results?.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    const itemType = (item.type || '').toUpperCase();
    if (selectedFilter === 'STUDY') {
      return itemType.includes('STUDY') || itemType === 'EDUCATION';
    }
    if (selectedFilter === 'JOB') {
      return itemType === 'JOB' || itemType === 'PRIVATE_JOB';
    }
    if (selectedFilter === 'GOVERNMENT_JOB') {
      return itemType.includes('GOVERNMENT') || itemType === 'EXAM';
    }
    if (selectedFilter === 'CAREER') {
      return itemType === 'CAREER';
    }
    if (selectedFilter === 'EXAM') {
      return itemType === 'EXAM';
    }
    if (selectedFilter === 'CERTIFICATION') {
      return itemType === 'CERTIFICATION';
    }
    return itemType === selectedFilter;
  }) || [];

  return (
    <div className="space-y-8 sm:space-y-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* ============================================================ */}
      {/* 1. USER RELATED INFORMATION DATA CONTAINER                  */}
      {/* ============================================================ */}
      <section className="card-clean p-6 sm:p-8 bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF2FF]/40 border border-[#E2E8F0] rounded-3xl shadow-xs space-y-6">
        {/* Header: User Greeting & Baseline Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] font-extrabold flex items-center justify-center text-lg shadow-2xs">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                  Personalized Pathways for {rawName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Learner
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-medium">
                Baseline Degree: <strong className="text-[#334155]">{studyName}</strong> ({statusLabel})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={openChangeModal}
              className="px-3.5 py-1.5 rounded-xl border border-indigo-200/80 bg-white hover:bg-indigo-50 text-xs font-bold text-[#4F46E5] transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Change Education</span>
            </button>
            <Link
              to="/profile"
              className="px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] hover:bg-white text-xs font-bold text-[#475569] transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>

        {/* 3-Column User Relevant Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Box 1: Degrees & Master's Options */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span>Next Studies & Degrees</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                Master's Path
              </span>
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#0F172A]">
                Higher Studies after {studyName}
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Eligible for M.Tech, MBA, MS, M.Sc admissions via GATE, CAT, GRE.
              </p>
            </div>
            <button
              onClick={() => handleQuickFilter(`courses after ${studyName}`)}
              className="w-full text-left pt-2 border-t border-slate-100 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] flex items-center justify-between cursor-pointer"
            >
              <span>Explore Higher Degrees</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Box 2: High-Growth Jobs Tailored for Study */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                <span>Job Roles & Salaries</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
                Industry Roles
              </span>
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#0F172A]">
                Target: {targetJobName}
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Typical salary band ₹6.0 – 24.0 LPA with strong growth demand.
              </p>
            </div>
            <button
              onClick={() => handleQuickFilter(`jobs after ${studyName}`)}
              className="w-full text-left pt-2 border-t border-slate-100 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center justify-between cursor-pointer"
            >
              <span>View Matched Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Box 3: Sovereign & Government Exams */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Public & Sovereign Exams</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                Govt Entry
              </span>
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#0F172A]">
                Competitive Govt Pathways
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Qualified for UPSC CSE (IAS/IPS), SSC CGL, PSUs & State PSC recruitments.
              </p>
            </div>
            <button
              onClick={() => handleQuickFilter(`government jobs after ${studyName}`)}
              className="w-full text-left pt-2 border-t border-slate-100 text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center justify-between cursor-pointer"
            >
              <span>View Govt Exams</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1-Click Search Quick Chips for User Education */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E2E8F0]/70">
          <span className="text-[11px] font-bold uppercase text-[#64748B]">
            Quick Filters for {studyName}:
          </span>
          <button
            onClick={() => handleQuickFilter(`jobs after ${studyName}`)}
            className="px-3 py-1 rounded-xl bg-white hover:bg-slate-50 text-[#0F172A] border border-[#E2E8F0] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            💼 Jobs for {studyName}
          </button>
          <button
            onClick={() => handleQuickFilter(`courses after ${studyName}`)}
            className="px-3 py-1 rounded-xl bg-white hover:bg-slate-50 text-[#0F172A] border border-[#E2E8F0] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            🎓 Master's after {studyName}
          </button>
          <button
            onClick={() => handleQuickFilter(`government jobs after ${studyName}`)}
            className="px-3 py-1 rounded-xl bg-white hover:bg-slate-50 text-[#0F172A] border border-[#E2E8F0] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            🏛️ Govt Exams for {studyName}
          </button>
          <button
            onClick={() => handleQuickFilter(targetJobName)}
            className="px-3 py-1 rounded-xl bg-[#EEF2FF] text-[#4F46E5] hover:bg-indigo-100/80 border border-indigo-200 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            🎯 Roadmap: {targetJobName}
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. UNIVERSAL SEARCH BAR & CATEGORY FILTER TABS              */}
      {/* ============================================================ */}
      <section className="card-clean p-6 sm:p-8 bg-white border border-[#E2E8F0] space-y-5 rounded-3xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
              <SearchIcon className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Universal Database Search</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Knowledge Navigator
            </h2>
          </div>

          <div className="text-xs text-[#64748B] font-medium bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
            Filtered for: <strong className="text-[#4F46E5]">{queryParam || studyName}</strong>
          </div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative group">
          <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#4F46E5] transition-colors" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search degrees, careers, job roles, entrance exams, or skills (e.g. MBA, Data Analyst, SSC CGL)..."
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl border border-[#E2E8F0] text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-[#F8FAFC]/50 shadow-2xs transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-[#4F46E5] text-white font-bold text-xs hover:bg-[#4338CA] transition-colors shadow-2xs cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Filter Pills & Taxonomy Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#E2E8F0]/70">
          <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-bold border transition-all text-xs cursor-pointer ${selectedFilter === tab.id
                    ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-2xs'
                    : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-slate-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTaxonomy(!showTaxonomy)}
            className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] flex items-center gap-1 cursor-pointer ml-auto pt-1"
          >
            <span>{showTaxonomy ? 'Hide Categories' : 'Browse All Categories'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showTaxonomy ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Collapsible Taxonomy Categories */}
        {showTaxonomy && (
          <div className="pt-2 animate-in fade-in duration-200">
            <TaxonomyBrowser
              activeCategory={activeCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>
        )}
      </section>

      {/* Loading state */}
      {loading && (
        <div className="card-clean p-12 text-center bg-white border border-[#E2E8F0] space-y-3 rounded-3xl shadow-xs">
          <RotateCw className="w-7 h-7 text-[#4F46E5] animate-spin mx-auto" />
          <p className="text-xs sm:text-sm text-[#64748B] font-semibold">
            Querying verified pathways and opportunities for {studyName}...
          </p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="card-clean p-6 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. VERIFIED RESULTS LISTING                                  */}
      {/* ============================================================ */}
      {!loading && (
        <section className="space-y-5">
          <div className="flex items-center justify-between text-xs font-bold text-[#64748B] uppercase tracking-wider px-1">
            <span>
              {filteredResults.length} Verified Result{filteredResults.length !== 1 ? 's' : ''}
            </span>
            <span className="text-[11px] font-normal text-slate-400">
              Matching your qualification ({studyName}) and criteria
            </span>
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredResults.map((item, idx) => {
                const itemType = (item.type || '').toUpperCase();

                if (itemType.includes('STUDY') || itemType === 'EDUCATION') {
                  return <StudyCard key={item.id || idx} study={item} currentEducation={studyName} />;
                }
                if (itemType === 'GOVERNMENT_JOB' || itemType === 'EXAM') {
                  return <ExamCard key={item.id || idx} exam={item} />;
                }
                if (itemType.includes('JOB')) {
                  return <JobCard key={item.id || idx} job={item} />;
                }
                if (itemType === 'CAREER') {
                  return <CareerCard key={item.id || idx} career={item} />;
                }
                if (itemType === 'CERTIFICATION') {
                  return <CertificationCard key={item.id || idx} cert={item} />;
                }

                return <StudyCard key={item.id || idx} study={item} currentEducation={studyName} />;
              })}
            </div>
          ) : (
            <div className="card-clean p-12 text-center bg-white border border-[#E2E8F0] space-y-4 rounded-3xl shadow-xs">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="font-extrabold text-[#0F172A] text-base">
                No matching opportunities found for "{searchInput || queryParam || studyName}"
              </div>
              <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                Try searching for degrees (B.Com, B.Tech, MBBS, BCA), government recruitments (SSC CHSL, RRB NTPC), jobs (Data Analyst, Software Developer), or explore by clicking the Career Fields card above.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default SearchResultsPage;
