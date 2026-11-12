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
  ExternalLink,
  X
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
    { id: 'JOB', label: 'Jobs & Careers' },
    { id: 'GOVERNMENT_JOB', label: 'Govt Jobs & Exams' },
    { id: 'CAREER', label: 'Career Fields' },
    { id: 'EXAM', label: 'Entrance Exams' },
    { id: 'CERTIFICATION', label: 'Certifications' }
  ];

  // Natural Language Intent Engine: Detects whether query relates to "Study", "Job", or "Govt Exam"
  const detectQueryIntent = (text, userEdu) => {
    const lower = (text || '').toLowerCase().trim();
    if (!lower) return null;

    const isStudy = /^(study|studies|course|courses|degree|degrees|masters|master|higher study|higher studies|college|education|phd|what to study|further studies|study next|study options)$/i.test(lower) ||
      lower.includes('study after') || lower.includes('courses after') || lower.includes('degrees after') || lower.includes('what to study') || lower.includes('study options');

    const isJob = /^(job|jobs|career|careers|placement|placements|work|hiring|role|roles|salary|salaries|private job|private jobs|job options|job roles)$/i.test(lower) ||
      lower.includes('jobs after') || lower.includes('careers after') || lower.includes('jobs for') || lower.includes('job options') || lower.includes('roles for');

    const isGovt = /^(govt|government|exam|exams|sarkari|upsc|ssc|gate|psu|sarkari naukri|govt job|govt jobs|civil services)$/i.test(lower) ||
      lower.includes('govt job') || lower.includes('government job') || lower.includes('govt jobs') || lower.includes('entrance exam');

    if (isStudy) {
      return {
        type: 'STUDY',
        title: `Higher Studies & Master's Degrees for ${userEdu}`,
        badge: '🎓 Study Pathways',
        description: `Showing higher degrees, Master's programs, and specialized academic courses tailored for ${userEdu} graduates.`,
        filter: 'STUDY'
      };
    }
    if (isJob) {
      return {
        type: 'JOB',
        title: `Industry Job Roles & Careers for ${userEdu}`,
        badge: '💼 Job Opportunities',
        description: `Showing high-demand job roles, technical career tracks, and compensation benchmarks open for ${userEdu} graduates.`,
        filter: 'JOB'
      };
    }
    if (isGovt) {
      return {
        type: 'GOVERNMENT_JOB',
        title: `Government Jobs & Sovereign Exams for ${userEdu}`,
        badge: '🏛️ Govt Recruitments',
        description: `Showing Union & State public sector recruitments, PSC exams, and statutory commissions open to ${userEdu}.`,
        filter: 'GOVERNMENT_JOB'
      };
    }

    return null;
  };

  const activeIntent = detectQueryIntent(queryParam || searchInput, studyName);

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
    const intent = detectQueryIntent(queryParam, studyName);
    if (intent) {
      setSelectedFilter(intent.filter);
    }
    executeSearch(queryParam || studyName, activeCategory);
  }, [queryParam, activeCategory, studyName]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const clean = searchInput.trim();
    if (clean) {
      const intent = detectQueryIntent(clean, studyName);
      if (intent) {
        setSelectedFilter(intent.filter);
      }
      setSearchParams({ q: clean });
    } else {
      setSearchParams({});
    }
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    executeSearch(queryParam || studyName, cat);
  };

  const handleQuickFilter = (queryText) => {
    setSearchInput(queryText);
    const intent = detectQueryIntent(queryText, studyName);
    if (intent) {
      setSelectedFilter(intent.filter);
    }
    setSearchParams({ q: queryText });
  };

  const filteredResults = (searchData.results || []).filter((item) => {
    if (selectedFilter === 'ALL') return true;
    const itemType = (item.type || '').toUpperCase();
    if (selectedFilter === 'STUDY') {
      return itemType.includes('STUDY') || itemType === 'EDUCATION';
    }
    if (selectedFilter === 'JOB') {
      return itemType === 'JOB' || itemType === 'PRIVATE_JOB' || itemType === 'CAREER';
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
  });

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-4 space-y-4 sm:space-y-5">
      {/* ============================================================ */}
      {/* 1. USER RELATED INFORMATION DATA CONTAINER                  */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/30 border border-slate-200/90 rounded-2xl shadow-2xs p-4 sm:p-6 space-y-4 sm:space-y-5">
        {/* Header: User Greeting & Baseline Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200/80">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black flex items-center justify-center text-lg sm:text-xl shadow-md shadow-indigo-500/20 flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Personalized Pathways for {rawName}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Learner
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Baseline Degree: <strong className="text-slate-800">{studyName}</strong> ({statusLabel})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
            <button
              onClick={openChangeModal}
              className="px-3.5 py-2 min-h-[40px] rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-xs font-bold text-indigo-700 transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center gap-1.5 active:scale-95"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Change Education</span>
            </button>
            <Link
              to="/profile"
              className="px-3.5 py-2 min-h-[40px] rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 active:scale-95"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Profile</span>
            </Link>
          </div>
        </div>

        {/* 3-Column User Relevant Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Box 1: Degrees & Master's Options */}
          <div
            onClick={() => handleQuickFilter(`courses after ${studyName}`)}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-3 shadow-2xs group cursor-pointer"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <span>Next Studies & Degrees</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Master's Path
                </span>
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                  Higher Studies after {studyName}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Eligible for M.Tech, MBA, MS, M.Sc admissions via GATE, CAT, GRE.
                </p>
              </div>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center justify-between transition-colors">
              <span>Explore Higher Degrees</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Box 2: High-Growth Jobs Tailored for Study */}
          <div
            onClick={() => handleQuickFilter(`jobs after ${studyName}`)}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-3 shadow-2xs group cursor-pointer"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <span>Job Roles & Salaries</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                  Industry Roles
                </span>
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-purple-700 transition-colors">
                  Target: {targetJobName}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Typical salary band ₹6.0 – 24.0 LPA with strong growth demand.
                </p>
              </div>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 text-xs font-bold text-purple-700 group-hover:text-purple-800 flex items-center justify-between transition-colors">
              <span>View Matched Jobs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Box 3: Sovereign & Government Exams */}
          <div
            onClick={() => handleQuickFilter(`government jobs after ${studyName}`)}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-3 shadow-2xs group cursor-pointer"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span>Public & Sovereign Exams</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Govt Entry
                </span>
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  Competitive Govt Pathways
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Qualified for UPSC CSE (IAS/IPS), SSC CGL, PSUs & State PSC recruitments.
                </p>
              </div>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center justify-between transition-colors">
              <span>View Govt Exams</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* 1-Click Search Quick Chips for User Education (Horizontal Carousel Container) */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex-shrink-0 flex items-center gap-1 pr-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Quick:</span>
          </span>
          <button
            onClick={() => handleQuickFilter(`jobs after ${studyName}`)}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 border border-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap"
          >
            💼 Jobs for {studyName}
          </button>
          <button
            onClick={() => handleQuickFilter(`courses after ${studyName}`)}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 border border-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap"
          >
            🎓 Master's after {studyName}
          </button>
          <button
            onClick={() => handleQuickFilter(`government jobs after ${studyName}`)}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap"
          >
            🏛️ Govt Exams for {studyName}
          </button>
          <button
            onClick={() => handleQuickFilter(targetJobName)}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap"
          >
            🎯 Roadmap: {targetJobName}
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. UNIVERSAL SEARCH BAR & CATEGORY FILTER TABS              */}
      {/* ============================================================ */}
      <section className="bg-white border border-slate-200/90 space-y-3.5 sm:space-y-4 p-4 sm:p-6 rounded-2xl shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <SearchIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Universal Database Search</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Knowledge Navigator
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-xl self-start sm:self-auto shadow-2xs">
            Filtered for: <strong className="text-indigo-600">{queryParam || studyName}</strong>
          </div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative group">
          <SearchIcon className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search anything: 'study', 'job', 'MBA', 'Data Analyst', 'Govt exams', 'Python'..."
            className="w-full pl-10 pr-28 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 focus:bg-white shadow-2xs transition-all"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                setSearchParams({});
              }}
              className="absolute right-20 sm:right-24 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 min-h-[38px] rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Real-time Semantic Understanding Suggestion */}
        {activeIntent && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50/70 to-blue-50 border border-indigo-200/80 text-xs sm:text-sm text-indigo-950 font-semibold shadow-2xs animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 animate-pulse" />
              <span>
                Understood intent: <strong>"{searchInput || queryParam}"</strong> — Showing {activeIntent.title} tailored for your <strong>{studyName}</strong> background.
              </span>
            </div>
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-2xs self-start sm:self-auto flex-shrink-0">
              {activeIntent.badge}
            </span>
          </div>
        )}

        {/* Filter Pills & Taxonomy Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x py-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap text-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`flex-shrink-0 px-4 py-2 sm:py-2.5 rounded-xl font-bold border transition-all active:scale-95 text-xs sm:text-sm cursor-pointer whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50/80 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTaxonomy(!showTaxonomy)}
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer ml-auto py-1.5 px-3 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            <span>{showTaxonomy ? 'Hide Categories' : 'Browse All Categories'}</span>
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showTaxonomy ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Collapsible Taxonomy Categories */}
        {showTaxonomy && (
          <div className="pt-3 animate-in fade-in duration-200">
            <TaxonomyBrowser
              activeCategory={activeCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>
        )}
      </section>

      {/* Loading state */}
      {loading && (
        <div className="p-12 text-center bg-white border border-slate-200/90 space-y-3 rounded-2xl sm:rounded-3xl shadow-xs">
          <RotateCw className="w-7 h-7 text-indigo-600 animate-spin mx-auto" />
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            Querying verified pathways and opportunities for {studyName}...
          </p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="p-5 sm:p-6 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm rounded-2xl flex items-center gap-3 shadow-2xs">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. VERIFIED RESULTS LISTING                                  */}
      {/* ============================================================ */}
      {!loading && (
        <section className="space-y-4 sm:space-y-5">
          {/* Intent Intelligence Capsule Banner */}
          {activeIntent && (
            <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/30 border border-indigo-200/80 shadow-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Personalized Recommendation Engine</span>
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Profile Matched ({studyName})
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                {activeIntent.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {activeIntent.description}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider px-1">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>{filteredResults.length} Verified Result{filteredResults.length !== 1 ? 's' : ''}</span>
            </span>
            <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
              Matching your qualification ({studyName}) and criteria
            </span>
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
            <div className="p-10 sm:p-14 text-center bg-white border border-slate-200/90 space-y-4 rounded-2xl sm:rounded-3xl shadow-xs">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="font-extrabold text-slate-900 text-base sm:text-lg">
                No matching opportunities found for "{searchInput || queryParam || studyName}"
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Try searching for degrees (B.Com, B.Tech, MBBS, BCA), government recruitments (SSC CHSL, RRB NTPC), jobs (Data Analyst, Software Developer), or explore by clicking the quick buttons below.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => handleQuickFilter('study')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  🎓 Higher Studies
                </button>
                <button
                  onClick={() => handleQuickFilter('job')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  💼 Job Roles
                </button>
                <button
                  onClick={() => handleQuickFilter('govt')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  🏛️ Govt Exams
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default SearchResultsPage;
