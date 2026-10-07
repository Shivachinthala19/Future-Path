import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  Building,
  Target,
  ChevronRight,
  Compass,
  RotateCw,
  ExternalLink,
  ShieldCheck,
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
import { SourceLinks } from '../components/SourceLinks.jsx';

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
    changeEducation,
    changeTargetJob,
    setToastMessage
  } = useEducation();

  const studyName = currentEducation?.educationName || 'B.Com';

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
    if (!q || !q.trim()) return;
    setLoading(true);
    setError(null);
    try {
      let url = `/search?q=${encodeURIComponent(q.trim())}`;
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
      setError('Unable to load search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchInput(queryParam);
    if (queryParam) {
      executeSearch(queryParam, activeCategory);
    }
  }, [queryParam, activeCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    if (queryParam) {
      executeSearch(queryParam, cat);
    }
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
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto py-2 sm:py-6">
      {/* Universal Search Header Card */}
      <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200/90 space-y-4 rounded-3xl shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Universal Education & Career Registry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Knowledge Navigator
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Current Profile: <strong className="text-indigo-600">{studyName}</strong>
          </div>
        </div>

        {/* Search Form Bar */}
        <form onSubmit={handleSearchSubmit} className="relative group">
          <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search any study, course, career, job, exam, certification or skill... e.g. B.Com, MBA, Data Analyst, SSC CHSL"
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50 shadow-2xs transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Filter Pills & Taxonomy Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-bold border transition-all text-xs cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTaxonomy(!showTaxonomy)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer ml-auto"
          >
            <span>{showTaxonomy ? 'Hide Categories' : 'Browse 36 Categories'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showTaxonomy ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Collapsible 36 Education Taxonomy Categories */}
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
        <div className="card-clean p-12 text-center bg-white border border-slate-200 space-y-3 rounded-3xl">
          <RotateCw className="w-7 h-7 text-indigo-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">
            Querying universal knowledge base for studies, careers, jobs, and recruitment...
          </p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="card-clean p-6 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* SECTION 13 & 25: DIRECT KNOWLEDGE CARD */}
      {!loading && searchData.directCard && (
        <section className="card-clean p-6 sm:p-8 bg-white border-2 border-indigo-200 space-y-6 shadow-xs rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
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

          {/* Official disclaimer note if applicable */}
          {searchData.directCard.disclaimer && (
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Official Notice: </strong>
                <span>{searchData.directCard.disclaimer}</span>
              </div>
            </div>
          )}

          {/* If Direct Card is Education Paths (e.g. jobs after B.Com / studies after 12th) */}
          {searchData.directCard.studyNext && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>Higher Study Pathways</span>
                </div>
                <div className="space-y-2">
                  {searchData.directCard.studyNext.map((st, idx) => {
                    const stName = typeof st === 'string' ? st : st.name;
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-indigo-200 flex items-center justify-between gap-2 shadow-2xs hover:border-indigo-400 transition-colors"
                      >
                        <span className="text-xs font-bold text-slate-800 truncate">
                          🎓 {stName}
                        </span>
                        <Link
                          to={`/study/${encodeURIComponent(stName.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 flex-shrink-0"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>Connected Job Roles</span>
                </div>
                <div className="space-y-2">
                  {searchData.directCard.privateJobs?.map((jb, idx) => {
                    const jbTitle = typeof jb === 'string' ? jb : (jb.title || jb.name);
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-between gap-2 shadow-2xs hover:border-emerald-400 transition-colors"
                      >
                        <span className="text-xs font-bold text-slate-800 truncate">
                          💼 {jbTitle}
                        </span>
                        <button
                          onClick={() => handleSetTarget(jbTitle)}
                          className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 flex-shrink-0 cursor-pointer"
                        >
                          <span>Set Target</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* If Direct Card is Government Job Guidance */}
          {searchData.directCard.governmentJobs && (
            <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-amber-600" />
                <span>Central & State Government Recruitment Pathways</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchData.directCard.governmentJobs.map((gj, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">
                        {gj.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        Official Exam
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Org: <strong className="text-slate-700">{gj.organization}</strong>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <ExternalSearchButton query={`${gj.title} official notification`} label="Search Web" />
                      {gj.notificationUrl && (
                        <OfficialSourceButton url={gj.notificationUrl} label="Portal" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If Direct Card is How To Become a Job (Education Routes + Roadmap) */}
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

      {/* CATEGORIZED RESULTS LIST (Section 12) */}
      {!loading && (
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            <span>
              {filteredResults.length} Result{filteredResults.length !== 1 ? 's' : ''} Found
            </span>
            <span className="text-[11px] font-normal text-slate-400">
              Showing matching database entities
            </span>
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResults.map((item, idx) => {
                const itemType = (item.type || '').toUpperCase();

                if (itemType.includes('STUDY') || itemType === 'EDUCATION') {
                  return <StudyCard key={item.id || idx} study={item} />;
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

                // Default fallback card
                return <StudyCard key={item.id || idx} study={item} />;
              })}
            </div>
          ) : (
            <div className="card-clean p-12 text-center bg-white border border-slate-200 space-y-4 rounded-3xl">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="font-extrabold text-slate-800 text-base">
                No matching results found for "{searchInput || queryParam}"
              </div>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Try searching for degrees (B.Com, B.Tech, MBBS, BCA), government recruitments (SSC CHSL, RRB NTPC), jobs (Data Analyst, Software Developer, Accountant), or natural queries like "jobs after B.Com".
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default SearchResultsPage;
