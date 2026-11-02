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
  RotateCw
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';
import { careersApi } from '../api/careers.js';

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

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  const hasTargetJob = Boolean(activeTargetJobTitle);

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      try {
        const res = await careersApi.getAll({
          education: studyName,
          targetJob: activeTargetJobTitle
        });
        if (res.success && res.data) {
          setCareers(res.data);
          if (res.data.length > 0) {
            setSelectedCareerId(res.data[0].id || res.data[0].slug);
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
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.description && c.description.toLowerCase().includes(q)) ||
      (c.overview && c.overview.toLowerCase().includes(q)) ||
      (c.requiredSkills && c.requiredSkills.some(s => typeof s === 'string' && s.toLowerCase().includes(q)))
    );
  });

  const activeCareer = displayCareers.find(c => (c.id === selectedCareerId || c.slug === selectedCareerId)) || displayCareers[0];

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

        {/* Notice Banner when Target Job is active */}
        {hasTargetJob ? (
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-600 flex-shrink-0" />
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
              <Compass className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>
                Want to see the fastest pathway to a specific goal? Set a Target Job.
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

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter career fields, domains, skills..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-2xs"
          />
        </div>
        <span className="text-xs font-semibold text-slate-500 px-1">
          Showing {displayCareers.length} fields
        </span>
      </div>

      {loading ? (
        <div className="card-clean p-12 text-center space-y-3 bg-white border border-slate-200">
          <RotateCw className="w-6 h-6 text-indigo-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">
            Loading career fields from database...
          </p>
        </div>
      ) : displayCareers.length === 0 ? (
        <div className="card-clean p-10 text-center space-y-2 bg-white border border-slate-200">
          <Layers className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No career fields match your filter</p>
          <p className="text-xs text-slate-500">Try clearing the search query or changing your education.</p>
        </div>
      ) : (
        /* Career Fields Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Field Cards */}
          <div className="lg:col-span-5 space-y-3">
            {displayCareers.map((c) => {
              const isSelected = activeCareer && (activeCareer.id === c.id || activeCareer.slug === c.slug);
              return (
                <div
                  key={c.id || c.slug || c.name}
                  onClick={() => setSelectedCareerId(c.id || c.slug)}
                  className={`card-clean p-4.5 cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-xs ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{c.name}</span>
                        {c.category && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {c.category}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {c.description || c.overview}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform ${isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Comprehensive Details for Selected Field */}
          <div className="lg:col-span-7">
            {activeCareer && (
              <div className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-6 sticky top-20 shadow-2xs">
                {/* Header */}
                <div className="space-y-2 border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {activeCareer.category || 'Career Field'}
                    </span>
                    {activeCareer.averageSalary && (
                      <span className="text-xs font-bold text-slate-700">
                        {activeCareer.averageSalary.entry || activeCareer.averageSalary.mid || 'Competitive'}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {activeCareer.name}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeCareer.overview || activeCareer.description}
                  </p>
                </div>

                {/* Related Job Roles */}
                {activeCareer.relatedJobs && activeCareer.relatedJobs.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Direct & Allied Job Roles</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCareer.relatedJobs.map((role, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Required Skills */}
                {activeCareer.requiredSkills && activeCareer.requiredSkills.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-purple-600" />
                      <span>Key Skills & Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCareer.requiredSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[11px] font-semibold border border-purple-100"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Career Growth / Progression */}
                {activeCareer.careerGrowth && activeCareer.careerGrowth.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Career Progression Hierarchy</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-600">
                      {activeCareer.careerGrowth.map((stage, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span>{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-2">
                  <Link
                    to={`/jobs?education=${encodeURIComponent(studyName)}`}
                    className="btn-primary w-full text-xs py-2.5 flex items-center justify-center gap-2"
                  >
                    <span>Explore Jobs in {activeCareer.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
