import React, { useState, useEffect } from 'react';
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
  Compass,
  Target,
  Search,
  Filter,
  RotateCw,
  Sparkles,
  DollarSign,
  GraduationCap,
  Building
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';
import { careersApi } from '../api/careers.js';

export const CareersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, profile } = useAuth();
  const {
    currentEducation,
    targetJob,
    changeTargetJob,
    removeTargetJob,
    openTargetJobModal
  } = useEducation();

  const studyName = currentEducation.educationName || 'B.Com';
  const isCompleted = currentEducation?.status !== 'currently_studying';
  const statusLabel = isCompleted ? 'Completed' : 'Currently Studying';
  const activeTargetJobTitle = targetJob?.targetJobName;

  const rawName = user?.name || profile?.name;
  const userName = rawName ? rawName.trim().split(' ')[0] : 'there';

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const hasTargetJob = Boolean(activeTargetJobTitle);

  const categories = ['All', 'Technology', 'Commerce', 'Management', 'Computer Science', 'General'];

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      try {
        const res = await careersApi.getAll({
          education: studyName,
          targetJob: activeTargetJobTitle
        });
        if (res && res.success && res.data) {
          setCareers(res.data);
          if (res.data.length > 0) {
            setSelectedCareerId(res.data[0].id || res.data[0].slug);
          }
        } else if (res && Array.isArray(res.data)) {
          setCareers(res.data);
          if (res.data.length > 0) {
            setSelectedCareerId(res.data[0].id || res.data[0].slug);
          }
        } else if (Array.isArray(res)) {
          setCareers(res);
          if (res.length > 0) {
            setSelectedCareerId(res[0].id || res[0].slug);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch careers from API:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, [studyName, activeTargetJobTitle]);

  const displayCareers = careers.filter((c) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (c.category && c.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    if (!searchFilter.trim()) return matchesCategory;
    const q = searchFilter.toLowerCase();
    const matchesSearch =
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.description && c.description.toLowerCase().includes(q)) ||
      (c.overview && c.overview.toLowerCase().includes(q)) ||
      (c.requiredSkills && c.requiredSkills.some(s => typeof s === 'string' && s.toLowerCase().includes(q)));

    return matchesCategory && matchesSearch;
  });

  const activeCareer = displayCareers.find(c => (c.id === selectedCareerId || c.slug === selectedCareerId)) || displayCareers[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* ============================================================ */}
      {/* HEADER HERO CARD WITH USER CONTEXT                           */}
      {/* ============================================================ */}
      <section className="card-clean p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-3xl shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold tracking-wide">
              <Compass className="w-4 h-4 text-[#4F46E5]" />
              <span>CAREER DOMAIN EXPLORER</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              {hasTargetJob ? (
                <>
                  Career Domains for <span className="text-[#7C3AED]">{activeTargetJobTitle}</span>
                </>
              ) : (
                <>
                  Career Fields Related to <span className="text-[#4F46E5]">{studyName}</span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Explore strategic industry sectors, career progression ladders, and compensation outlooks aligned with your background.
            </p>
          </div>

          {/* User Profile Context Capsule */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 flex-shrink-0 min-w-[260px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center justify-between">
              <span>Your Profile Context</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                <GraduationCap className="w-4 h-4 text-[#4F46E5] flex-shrink-0" />
                <span className="truncate">{studyName}</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {statusLabel}
                </span>
              </div>

              {hasTargetJob && (
                <div className="flex items-center gap-2 text-xs font-bold text-[#7C3AED]">
                  <Target className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                  <span className="truncate">{activeTargetJobTitle}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-[#E2E8F0]">
              {hasTargetJob && <ChangeTargetJobButton label="Change Target" />}
              <ChangeEducationButton />
            </div>
          </div>
        </div>

        {/* Informative Guidance Banner */}
        {hasTargetJob ? (
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs text-purple-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
              <span>
                Personalized for <strong>{activeTargetJobTitle}</strong>. Showing domain sectors that lead to or complement your active goal.
              </span>
            </div>
            <button
              onClick={removeTargetJob}
              className="text-[#7C3AED] hover:text-[#5B21B6] font-bold underline cursor-pointer text-xs whitespace-nowrap self-start sm:self-auto"
            >
              Show all fields for {studyName}
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Target className="w-4 h-4 text-[#4F46E5] flex-shrink-0" />
              <span>
                Want tailored milestone roadmaps to a specific career goal? Select an active Target Job.
              </span>
            </div>
            <button
              onClick={openTargetJobModal}
              className="btn-primary !text-xs !py-1.5 !px-3.5 !rounded-xl whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              Set Target Job
            </button>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* SEARCH AND CATEGORY FILTER TABS                              */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search career fields, executive domains, industry verticals..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E2E8F0] text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white shadow-2xs transition-all"
            />
          </div>

          <div className="text-xs font-semibold text-[#64748B] px-1 flex-shrink-0 self-center">
            Showing <strong className="text-[#0F172A]">{displayCareers.length}</strong> career domains
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-[#64748B] whitespace-nowrap mr-1">Sector:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#4F46E5] text-white shadow-xs'
                  : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#C7D2FE] hover:text-[#0F172A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTENT: 2-COLUMN LAYOUT (5 cols left, 7 cols right)         */}
      {/* ============================================================ */}
      {loading ? (
        <div className="card-clean p-12 sm:p-16 text-center space-y-3 bg-white border border-[#E2E8F0] rounded-3xl shadow-xs">
          <RotateCw className="w-8 h-8 text-[#4F46E5] animate-spin mx-auto" />
          <p className="text-xs sm:text-sm text-[#64748B] font-semibold">
            Querying career pathways and industry progression datasets...
          </p>
        </div>
      ) : displayCareers.length === 0 ? (
        <div className="card-clean p-12 sm:p-16 text-center space-y-3 bg-white border border-[#E2E8F0] rounded-3xl shadow-xs">
          <Layers className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-base font-bold text-[#0F172A]">No career fields matched your filter</p>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Try adjusting your search query or reset the sector filter to explore all available domains.
          </p>
          <button
            onClick={() => {
              setSearchFilter('');
              setSelectedCategory('All');
            }}
            className="btn-primary !text-xs !py-2 !px-4 !rounded-xl mt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ========================================================== */}
          {/* LEFT: INTERACTIVE CAREER FIELD CARDS                       */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 space-y-4">
            {displayCareers.map((c) => {
              const isSelected = activeCareer && (activeCareer.id === c.id || activeCareer.slug === c.slug);
              return (
                <div
                  key={c.id || c.slug || c.name}
                  onClick={() => setSelectedCareerId(c.id || c.slug)}
                  className={`card-clean p-5 sm:p-6 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-[#4F46E5] bg-[#EEF2FF]/40 shadow-sm ring-2 ring-[#4F46E5]/20'
                      : 'border-[#E2E8F0] bg-white hover:border-[#C7D2FE] hover:shadow-xs hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-extrabold text-[#0F172A] hover:text-[#4F46E5] transition-colors">
                          {c.name}
                        </span>
                        {c.category && (
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#475569]">
                            {c.category}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                        {c.description || c.overview}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#475569] font-medium">
                        {c.averageSalary && (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                            <span>₹</span>
                            <span>{c.averageSalary.entry || c.averageSalary.mid || 'Competitive'}</span>
                          </span>
                        )}
                        {c.growthOutlook && (
                          <span className="text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-md">
                            {c.growthOutlook}
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 flex-shrink-0 mt-1 transition-transform ${
                        isSelected ? 'text-[#4F46E5] translate-x-1' : 'text-slate-400'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================== */}
          {/* RIGHT: COMPREHENSIVE CAREER FIELD DETAILS (Sticky)         */}
          {/* ========================================================== */}
          <div className="lg:col-span-7">
            {activeCareer && (
              <div className="card-clean p-6 sm:p-8 lg:p-9 bg-white border border-[#E2E8F0] rounded-3xl shadow-sm space-y-6 sticky top-24">
                {/* Header Section */}
                <div className="space-y-3 border-b border-[#E2E8F0] pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5]">
                        {activeCareer.category || 'Career Field'}
                      </span>
                      <span className="text-[11px] font-semibold text-[#64748B]">
                        {activeCareer.sector || 'Industry & Enterprise'}
                      </span>
                    </div>

                    {activeCareer.averageSalary && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Avg: {activeCareer.averageSalary.mid || activeCareer.averageSalary.entry || '₹6.5 - 12.0 LPA'}</span>
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                    {activeCareer.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {activeCareer.overview || activeCareer.description}
                  </p>
                </div>

                {/* Key Demand & Growth Highlights */}
                {activeCareer.growthOutlook && (
                  <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-indigo-900 font-semibold">
                      <Sparkles className="w-4 h-4 text-[#4F46E5] flex-shrink-0" />
                      <span>Growth Outlook:</span>
                      <strong className="text-[#4F46E5]">{activeCareer.growthOutlook}</strong>
                    </div>
                    {activeCareer.demandScore && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white border border-indigo-200 text-indigo-700">
                        Match Score: {activeCareer.demandScore}%
                      </span>
                    )}
                  </div>
                )}

                {/* Direct & Allied Job Roles */}
                {activeCareer.relatedJobs && activeCareer.relatedJobs.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs font-extrabold text-[#0F172A] flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#4F46E5]" />
                      <span>Direct & Allied Job Roles in this Domain</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {activeCareer.relatedJobs.map((role, idx) => (
                        <Link
                          key={idx}
                          to={`/jobs?search=${encodeURIComponent(role)}`}
                          className="px-3.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#4F46E5] hover:bg-[#EEF2FF] hover:text-[#4F46E5] text-xs font-bold text-[#0F172A] transition-all flex items-center gap-1.5 shadow-2xs group"
                        >
                          <span>{role}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Required Skills & Modern Tooling */}
                {activeCareer.requiredSkills && activeCareer.requiredSkills.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-[#E2E8F0]">
                    <div className="text-xs font-extrabold text-[#0F172A] flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#7C3AED]" />
                      <span>Core Competencies & Tool Stack</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {activeCareer.requiredSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-purple-50 text-[#7C3AED] text-xs font-semibold border border-purple-100"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Career Progression Ladder (Stepper) */}
                {activeCareer.careerGrowth && activeCareer.careerGrowth.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-[#E2E8F0]">
                    <div className="text-xs font-extrabold text-[#0F172A] flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>Executive Progression Hierarchy</span>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {activeCareer.careerGrowth.map((stage, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-extrabold flex items-center justify-center flex-shrink-0 border border-[#C7D2FE]">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-[#0F172A]">{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA Buttons */}
                <div className="pt-4 border-t border-[#E2E8F0] space-y-2.5">
                  <Link
                    to={`/jobs?education=${encodeURIComponent(studyName)}`}
                    className="btn-primary w-full !py-3.5 !px-6 !text-sm !rounded-2xl flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Explore Jobs in {activeCareer.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/study-next"
                    className="btn-secondary w-full !py-2.5 !px-6 !text-xs !rounded-2xl flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>View Higher Study Pathways for this Domain</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
