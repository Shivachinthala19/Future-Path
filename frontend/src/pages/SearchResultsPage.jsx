import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  AlertCircle
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';
import { StudyCard } from '../components/StudyCard.jsx';
import { JobCard } from '../components/JobCard.jsx';
import { ExamCard } from '../components/ExamCard.jsx';
import { CareerCard } from '../components/CareerCard.jsx';
import { CertificationCard } from '../components/CertificationCard.jsx';
import { TaxonomyBrowser } from '../components/TaxonomyBrowser.jsx';
import { ExternalSearchButton } from '../components/common/ExternalSearchButton.jsx';
import { OfficialSourceButton } from '../components/common/OfficialSourceButton.jsx';

export const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(queryParam);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showTaxonomy, setShowTaxonomy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({ query: '', count: 0, results: [], directCard: null });
  const [error, setError] = useState(null);

  const {
    currentEducation,
    changeTargetJob,
    setToastMessage
  } = useEducation();

  const studyName = currentEducation?.educationName || 'B.Tech Computer Science';

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

  const handleSetTarget = (jobTitle) => {
    changeTargetJob(jobTitle);
    if (setToastMessage) {
      setToastMessage(`🎯 Set "${jobTitle}" as your active target job.`);
    }
    navigate(`/job/${encodeURIComponent(jobTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`);
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* ============================================================ */}
      {/* UNIVERSAL SEARCH BAR & CATEGORY FILTER TABS                  */}
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
                className={`px-3 py-1.5 rounded-xl font-bold border transition-all text-xs cursor-pointer ${
                  selectedFilter === tab.id
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

      {/* DIRECT GUIDANCE CARD (If available) */}
      {!loading && searchData.directCard && (
        <section className="card-clean p-6 sm:p-8 bg-white border-2 border-indigo-200 space-y-6 shadow-xs rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>Direct Guidance Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {searchData.directCard.title}
              </h2>
              {searchData.directCard.salaryFormatted && (
                <div className="text-xs font-bold text-emerald-600">
                  {searchData.directCard.salaryFormatted}
                </div>
              )}
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 flex-shrink-0">
              {searchData.directCard.webSearchUrl && (
                <ExternalSearchButton query={searchData.directCard.title} label="Search Web" />
              )}
              {searchData.directCard.notificationUrl && (
                <OfficialSourceButton url={searchData.directCard.notificationUrl} label="Official Portal" />
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {searchData.directCard.overview || searchData.directCard.subtitle || searchData.directCard.description}
          </p>

          {/* Education Routes */}
          {searchData.directCard.educationRoutes && searchData.directCard.educationRoutes.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Possible Education & Experience Routes:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchData.directCard.educationRoutes.map((route, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-indigo-700">
                        {route.routeName || `ROUTE ${idx + 1}`}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                        {route.timeline || 'Direct Entry'}
                      </span>
                    </div>
                    {route.degrees && (
                      <div className="text-xs font-medium text-slate-800">
                        Eligible: <strong>{route.degrees.join(' / ')}</strong>
                      </div>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {route.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleSetTarget(searchData.directCard.jobTitle || searchData.directCard.title)}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
                >
                  <Target className="w-4 h-4" />
                  <span>Add as My Target Job & View Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ============================================================ */}
      {/* VERIFIED RESULTS LISTING                                     */}
      {/* ============================================================ */}
      {!loading && (
        <section className="space-y-5">
          <div className="flex items-center justify-between text-xs font-bold text-[#64748B] uppercase tracking-wider px-1">
            <span>
              {filteredResults.length} Verified Result{filteredResults.length !== 1 ? 's' : ''}
            </span>
            <span className="text-[11px] font-normal text-slate-400">
              Matching your qualification and criteria
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
