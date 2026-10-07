import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Target,
  GraduationCap,
  Briefcase,
  Layers,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Code,
  FileText,
  Building,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { ApplicationLinksSection } from '../components/ApplicationLinksSection.jsx';
import api from '../services/api.js';

export const FuturePathPage = () => {
  const navigate = useNavigate();
  const {
    currentEducation,
    targetJob,
    openChangeModal,
    openTargetJobModal,
    changeTargetJob,
    removeTargetJob
  } = useEducation();

  const studyName = currentEducation?.educationName || 'B.Com';
  const statusLabel = currentEducation?.status === 'currently_studying' ? 'Currently Studying' : 'Completed';
  const targetJobName = targetJob?.targetJobName;

  const [pathData, setPathData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch from unified Future Path API
  useEffect(() => {
    let isMounted = true;
    const fetchPath = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `/future-path?education=${encodeURIComponent(studyName)}&status=${encodeURIComponent(currentEducation?.status || 'completed')}`;
        if (targetJobName) {
          url += `&targetJob=${encodeURIComponent(targetJobName)}`;
        }
        const res = await api.get(url);
        if (isMounted) {
          if (res && res.data) {
            setPathData(res.data);
          } else if (res) {
            setPathData(res);
          }
        }
      } catch (err) {
        console.error('[FuturePathPage] Fetch error:', err);
        if (isMounted) setError('Unable to load future path intelligence.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPath();
    return () => {
      isMounted = false;
    };
  }, [studyName, targetJobName, currentEducation?.status]);

  // Section 28: Target compatibility calculation
  const isTargetMismatched = Boolean(
    targetJobName && (
      (targetJobName.toLowerCase().includes('account') && studyName.toLowerCase().includes('tech')) ||
      (targetJobName.toLowerCase().includes('software') && studyName.toLowerCase().includes('b.com')) ||
      (targetJobName.toLowerCase().includes('electrician') && studyName.toLowerCase().includes('mbbs'))
    )
  );

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto py-2 sm:py-6">
      {/* Page Header */}
      <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Universal Future Path Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Future Path
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Personalized navigation showing where you can go from where you are now, and what exactly you should do.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start flex-shrink-0">
            <button
              onClick={openChangeModal}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Change Education
            </button>
            <button
              onClick={openTargetJobModal}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              {targetJobName ? 'Change Target' : '+ Add Target Job'}
            </button>
          </div>
        </div>

        {/* SECTION 28: EDUCATION CHANGED RECALCULATION & COMPATIBILITY NOTICE */}
        {isTargetMismatched && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Education Updated – Target Job Compatibility Notice</span>
            </div>
            <p className="text-slate-600">
              Your target is: <strong className="text-slate-900">{targetJobName}</strong>.<br />
              Your new education is: <strong className="text-slate-900">{studyName}</strong>.<br />
              This target is still saved. You can choose to keep it or explore targets tailored for {studyName}.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {}}
                className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs"
              >
                Keep Target
              </button>
              <button
                onClick={openTargetJobModal}
                className="px-3 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100"
              >
                Explore New Targets
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Loading State */}
      {loading && (
        <div className="card-clean p-16 text-center bg-white border border-slate-200 space-y-3">
          <RotateCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-semibold">
            Synthesizing personalized education → study → career → job path...
          </p>
        </div>
      )}

      {/* SECTION 26: CENTRAL FUTURE PATH WITH TARGET JOB */}
      {!loading && targetJobName && (
        <>
        <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-6 shadow-2xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Step-by-Step Path
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Path from {studyName} to {targetJobName}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Every step is actionable. Click any step to open deep guidance, resources, and requirements.
            </p>
          </div>

          {/* Connected Clickable Timeline Flow (Section 26) */}
          <div className="space-y-3 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-indigo-100">
            {/* 1. CURRENT POSITION */}
            <div
              onClick={openChangeModal}
              className="relative pl-10 group cursor-pointer"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-200 group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 group-hover:border-indigo-300 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    CURRENT POSITION
                  </div>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5">
                    {studyName} — <span className="text-indigo-600">{statusLabel}</span>
                  </div>
                </div>
                <button className="text-xs font-bold text-indigo-600 group-hover:underline">
                  Change
                </button>
              </div>
            </div>

            {/* 2. TARGET */}
            <div
              onClick={() => navigate(`/job/${encodeURIComponent(targetJobName.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`)}
              className="relative pl-10 group cursor-pointer"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-purple-600 border-2 border-white ring-2 ring-purple-200 group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-200 group-hover:border-purple-400 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                    TARGET
                  </div>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5">
                    {targetJobName}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-600" />
              </div>
            </div>

            {/* 3. ELIGIBILITY */}
            <div
              onClick={() => navigate(`/job/${encodeURIComponent(targetJobName.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`)}
              className="relative pl-10 group cursor-pointer"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-200 group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 group-hover:border-emerald-400 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    ELIGIBILITY
                  </div>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5">
                    {pathData?.eligibility?.status || 'Potentially Eligible'}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {pathData?.eligibility?.explanation || 'Your degree provides relevant foundational knowledge.'}
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">View Rules</span>
              </div>
            </div>

            {/* 4. SKILL GAP */}
            <div
              onClick={() => navigate('/learn')}
              className="relative pl-10 group cursor-pointer"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-amber-500 border-2 border-white ring-2 ring-amber-200 group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 group-hover:border-amber-400 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    SKILL GAP (IDENTIFIED)
                  </div>
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                    <span>Learn Skills</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(pathData?.skillGap && pathData.skillGap.length > 0
                    ? pathData.skillGap.map(s => s.name || s)
                    : ['SQL', 'Statistics', 'Power BI', 'Python']
                  ).map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-white border border-amber-300 text-xs font-semibold text-amber-900 shadow-2xs"
                    >
                      ✗ {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. LEARNING */}
            <div
              onClick={() => navigate('/learn')}
              className="relative pl-10 group cursor-pointer"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-200 group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 group-hover:border-indigo-300 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    LEARNING
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    Complete Structured Learning Curriculum
                  </div>
                  <div className="text-xs text-slate-500">
                    Guided tutorials, practice quizzes, and documentation for missing tools.
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </div>
            </div>

            {/* 6. PROJECTS */}
            <div
              onClick={() => navigate(`/job/${encodeURIComponent(targetJobName.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`)}
              className="relative pl-10 group cursor-pointer"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-purple-600 border-2 border-white ring-2 ring-purple-200 group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 group-hover:border-purple-300 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    PROJECTS
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    Build 3–4 Relevant Portfolio Projects
                  </div>
                  <div className="text-xs text-slate-500">
                    End-to-end industry datasets with GitHub code repository and live deployment.
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
              </div>
            </div>

            {/* 7. RESUME */}
            <div
              onClick={() => navigate('/ai-assistant')}
              className="relative pl-10 group cursor-pointer"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-cyan-600 border-2 border-white ring-2 ring-cyan-200 group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 group-hover:border-cyan-300 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    RESUME
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    Create Targeted ATS-Optimized Resume
                  </div>
                  <div className="text-xs text-slate-500">
                    Emphasize transferable analytical strengths from {studyName} and technical projects.
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600" />
              </div>
            </div>

            {/* 8. INTERVIEW */}
            <div
              onClick={() => navigate('/ai-assistant')}
              className="relative pl-10 group cursor-pointer"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-200 group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 group-hover:border-indigo-300 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    INTERVIEW
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    Technical Assessment + Domain Case Study + HR
                  </div>
                  <div className="text-xs text-slate-500">
                    Interactive AI Interview Practice & behavioral situational questions.
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </div>
            </div>

            {/* 9. APPLICATION */}
            <div
              onClick={() => navigate('/job-roadmap')}
              className="relative pl-10 group cursor-pointer"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-200 group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 group-hover:border-emerald-300 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    APPLICATION
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    Apply to Suitable Entry-Level & Trainee Roles
                  </div>
                  <div className="text-xs text-slate-500">
                    Job portals, company career pages, and campus/off-campus recruitment drives.
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
              </div>
            </div>

            {/* 10. CAREER OUTCOME */}
            <div className="relative pl-10">
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-purple-600 border-2 border-white ring-2 ring-purple-200" />
              <div className="p-4 rounded-xl bg-purple-600 text-white flex items-center justify-between shadow-2xs">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                    CAREER GOAL
                  </div>
                  <div className="text-lg font-extrabold mt-0.5">
                    {targetJobName}
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Master Targeted Application Links for Selected Target Job */}
        <ApplicationLinksSection
          jobTitle={targetJobName}
          category={pathData?.targetJobDetails?.sector || ''}
          jobType={pathData?.targetJobDetails?.category || ''}
        />
        </>
      )}

      {/* SECTION 27: IF USER HAS NO TARGET JOB */}
      {!loading && !targetJobName && (
        <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-6 shadow-2xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              You Studied
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {studyName} — <span className="text-indigo-600 font-semibold">{statusLabel}</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Here are all your verified directions based strictly on this education:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Study Further */}
            <Link
              to="/study-next"
              className="p-5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between space-y-3 group shadow-2xs"
            >
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                  🎓
                </div>
                <div className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Study Further
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Accredited Master degrees, professional certifications, and postgraduate programs.
                </p>
              </div>
              <div className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Explore Study Options</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 2. Career Fields */}
            <Link
              to="/careers"
              className="p-5 rounded-xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between space-y-3 group shadow-2xs"
            >
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                  🚀
                </div>
                <div className="font-extrabold text-base text-slate-900 group-hover:text-purple-600 transition-colors">
                  Career Fields
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Major industry domains and career paths connected to your study specialization.
                </p>
              </div>
              <div className="text-xs font-bold text-purple-600 flex items-center gap-1">
                <span>Explore Careers</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. Private Jobs */}
            <Link
              to="/job-roadmap"
              className="p-5 rounded-xl bg-slate-50 hover:bg-cyan-50/50 border border-slate-200 hover:border-cyan-300 transition-all flex flex-col justify-between space-y-3 group shadow-2xs"
            >
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-lg">
                  💼
                </div>
                <div className="font-extrabold text-base text-slate-900 group-hover:text-cyan-600 transition-colors">
                  Private Sector Jobs
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Roles where your academic foundation gives you direct or strong eligibility.
                </p>
              </div>
              <div className="text-xs font-bold text-cyan-600 flex items-center gap-1">
                <span>View Jobs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 4. Government / Public Sector */}
            <Link
              to="/job-roadmap"
              className="p-5 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3 group shadow-2xs"
            >
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
                  🏛️
                </div>
                <div className="font-extrabold text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                  Government & Public Jobs
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Official recruitment exams and public sector vacancies accepting your degree.
                </p>
              </div>
              <div className="text-xs font-bold text-amber-700 flex items-center gap-1">
                <span>View Public Roles</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Want a personalized step-by-step roadmap for a specific job?
            </span>
            <button
              onClick={openTargetJobModal}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Target className="w-4 h-4" />
              <span>Choose a Target Job</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default FuturePathPage;
