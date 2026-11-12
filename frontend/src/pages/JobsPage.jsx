import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Briefcase, CheckCircle2, AlertTriangle, ArrowRight, Filter, Building, Layers } from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';
import { ExternalSearchButton } from '../components/common/ExternalSearchButton.jsx';

export const JobsPage = () => {
  const navigate = useNavigate();
  const { currentEducation, targetJob, changeTargetJob, setToastMessage } = useEducation();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const studyName = currentEducation?.educationName || 'B.Com';

  useEffect(() => {
    let isMounted = true;
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/jobs');
        if (isMounted) {
          const data = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
          setJobs(data);
        }
      } catch (err) {
        console.error('[JobsPage] Failed to load jobs:', err);
        if (isMounted) setError('Unable to load job opportunities.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['All', 'Technology', 'Finance', 'Analytics', 'Government', 'Management'];

  const filteredJobs = jobs.filter((job) => {
    const title = (job.title || job.name || '').toLowerCase();
    const category = (job.category || job.sector || '').toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase()) || category.includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || category.includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  const getMatchDetails = (job) => {
    const isEducationEligible = true; // In our system, all listed jobs show available routes
    const reqSkills = job.requiredSkills || job.skills || [];
    const skillsToLearnCount = Math.max(1, Math.min(4, Math.floor(reqSkills.length * 0.75)));
    return {
      educationEligible: isEducationEligible,
      skillsToLearn: skillsToLearnCount,
      totalSkills: reqSkills.length
    };
  };

  const handleSetTarget = (jobTitle, jobId) => {
    changeTargetJob(jobTitle);
    if (setToastMessage) {
      setToastMessage(`🎯 Set "${jobTitle}" as your active target job.`);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-6xl mx-auto py-1 sm:py-4 px-1 sm:px-0">
      {/* Header Section */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[11px] font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER OPPORTUNITIES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Find Your Next Job
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl">
          Discover jobs you can target based on your education (<span className="font-semibold text-[#4F46E5]">{studyName}</span>) and skills.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-3.5 sm:p-5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, sector, or keyword..."
              className="w-full pl-10 pr-4 py-2 min-h-[42px] rounded-xl border border-[#E2E8F0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x py-0.5 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-transform active:scale-95 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4F46E5] text-white shadow-2xs font-bold'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] border border-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="card-clean p-6 bg-white border border-[#E2E8F0] space-y-4 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-3 bg-slate-200 rounded w-5/6"></div>
              <div className="h-10 bg-slate-100 rounded-xl w-full pt-4"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="card-clean p-8 bg-white border border-rose-200 text-center space-y-3">
          <div className="text-rose-600 font-bold text-base">Something went wrong.</div>
          <p className="text-xs text-slate-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary !text-xs !py-2 !px-4"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredJobs.length === 0 && (
        <div className="card-clean p-12 bg-white border border-[#E2E8F0] text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mx-auto">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="text-lg font-bold text-[#0F172A]">We couldn't find matching jobs.</div>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Try adjusting your search terms or exploring all sectors.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="btn-primary !text-xs !py-2 !px-4 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Jobs Grid */}
      {!loading && !error && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredJobs.map((job) => {
            const id = job.slug || job.id || job._id;
            const title = job.title || job.name;
            const sector = job.category || job.sector || 'Technology & Analytics';
            const reqSkills = job.requiredSkills || job.skills || ['SQL', 'Excel', 'Communication'];
            const match = getMatchDetails(job);
            const isCurrentTarget = targetJob?.targetJobName?.toLowerCase() === title.toLowerCase();

            return (
              <div
                key={id}
                className={`p-4 sm:p-5 bg-white border flex flex-col justify-between space-y-4 rounded-2xl shadow-2xs hover:shadow-xs transition-all duration-200 group ${
                  isCurrentTarget ? 'border-[#4F46E5] ring-2 ring-[#EEF2FF]' : 'border-[#E2E8F0] hover:border-indigo-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Category & Target Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                      {sector}
                    </span>
                    {isCurrentTarget && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        🎯 Target Job
                      </span>
                    )}
                  </div>

                  {/* Job Title */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2 mt-0.5 leading-relaxed">
                      {job.overview || job.description || `Professional career opportunity in ${sector}.`}
                    </p>
                  </div>

                  {/* Education Eligibility */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Education Route:
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      {studyName} / B.Tech / BCA / Related Degrees
                    </div>
                  </div>

                  {/* Key Skills */}
                  {reqSkills.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Key Skills:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {reqSkills.slice(0, 4).map((sk, sIdx) => {
                          const sName = typeof sk === 'string' ? sk : sk.name;
                          return (
                            <span
                              key={sIdx}
                              className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] font-medium"
                            >
                              {sName}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Your Match Box (Section 13) */}
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 text-xs">
                    <div className="font-bold text-[#0F172A] flex items-center justify-between">
                      <span>Your Match:</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Education route available</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-700 font-semibold text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>{match.skillsToLearn} skills to learn</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleSetTarget(title, id)}
                    className="min-h-[40px] px-3 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#0F172A] hover:text-[#4F46E5] text-xs font-semibold border border-[#E2E8F0] transition-colors cursor-pointer active:scale-98"
                  >
                    Set Target
                  </button>

                  <Link
                    to={`/job/${encodeURIComponent(id)}`}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-2xs active:scale-98"
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
