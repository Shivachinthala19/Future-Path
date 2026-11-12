import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Target,
  Briefcase,
  Compass,
  BookOpen,
  ClipboardCheck,
  ChevronRight,
  TrendingUp,
  Circle,
  Clock,
  Layers
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ExploreYourFutureSection } from '../components/ExploreYourFutureSection.jsx';
import { ExploreOpportunitiesSection } from '../components/ExploreOpportunitiesSection.jsx';
import api from '../services/api.js';

export const Dashboard = () => {
  const {
    currentEducation,
    targetJob,
    toastMessage,
    openChangeModal,
    openTargetJobModal,
    removeTargetJob
  } = useEducation();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const outletCtx = useOutletContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [nextStepInfo, setNextStepInfo] = useState(null);
  const [loadingStep, setLoadingStep] = useState(false);

  // Dynamic user name from auth/profile (never hardcoded)
  const rawName = user?.name || profile?.name;
  const userName = rawName ? rawName.trim().split(' ')[0] : 'there';

  const studyName = currentEducation?.educationName || 'B.Com';
  const isCompleted = currentEducation?.status !== 'currently_studying';
  const statusLabel = isCompleted ? 'Completed' : 'Currently Studying';
  const targetJobName = targetJob?.targetJobName;

  // Search submission handler
  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleChipClick = (queryText) => {
    navigate(`/search?q=${encodeURIComponent(queryText)}`);
  };

  const openAi = () => {
    if (outletCtx?.openAIAssistant) {
      outletCtx.openAIAssistant();
    } else {
      navigate('/ai-assistant');
    }
  };

  // Dynamically compute/fetch "YOUR NEXT STEP" (Section 10)
  useEffect(() => {
    let isMounted = true;
    const fetchNextStep = async () => {
      setLoadingStep(true);
      try {
        if (targetJobName) {
          // Dynamic calculation based on target job
          const res = await api.get(`/future-path?education=${encodeURIComponent(studyName)}&targetJob=${encodeURIComponent(targetJobName)}`);
          const roadmapData = res?.roadmap || res?.data?.roadmap;
          if (isMounted && roadmapData?.steps?.length > 0) {
            const steps = roadmapData.steps;
            const currentOrFirstStep = steps.find(s => s.status === 'CURRENT') || steps[0];
            setNextStepInfo({
              title: currentOrFirstStep.title || 'Master Core Tooling',
              description: currentOrFirstStep.description || `Essential foundation step for your ${targetJobName} goal.`,
              progress: '0%',
              to: `/job-roadmap`,
              target: targetJobName
            });
            return;
          }
        }

        // Default based on current education
        setNextStepInfo({
          title: `Explore Careers for ${studyName}`,
          description: `Identify high-growth job roles and eligibility pathways tailored for ${studyName} graduates.`,
          progress: '0%',
          to: '/study-next',
          target: null
        });
      } catch (err) {
        if (isMounted) {
          setNextStepInfo({
            title: targetJobName ? `Learn Core Skills for ${targetJobName}` : `Explore Studies after ${studyName}`,
            description: targetJobName ? `Key requirement for your ${targetJobName} journey.` : `Discover high-demand master degrees and diploma certifications.`,
            progress: '0%',
            to: targetJobName ? '/learn' : '/study-next',
            target: targetJobName
          });
        }
      } finally {
        if (isMounted) setLoadingStep(false);
      }
    };

    fetchNextStep();
    return () => {
      isMounted = false;
    };
  }, [studyName, targetJobName]);

  const popularSearches = [
    'MBA',
    'Data Analyst',
    'B.Tech',
    'Government Jobs',
    'Courses after 12th',
    'Jobs after B.Com'
  ];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto py-1 sm:py-4 px-1 sm:px-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-[#EEF2FF] border border-[#C7D2FE] text-[#3730A3] text-xs font-semibold flex items-center gap-2.5 shadow-2xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#4F46E5] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 5: HERO SECTION                                      */}
      {/* ============================================================ */}
      <section className="text-center space-y-3 pt-1 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-bold text-[#4F46E5] shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Welcome, {userName}! Pathways tailored for {studyName} ({statusLabel})</span>
        </div>

        <div className="space-y-1.5 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Build the future you want.
          </h1>
        </div>

        {/* ============================================================ */}
        {/* SECTION 6: UNIVERSAL SEARCH BAR                              */}
        {/* ============================================================ */}
        <div className="max-w-2xl mx-auto pt-2 sm:pt-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              <Search className="w-4 h-4 text-[#4F46E5]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for? Search studies, jobs, careers, exams, skills..."
              className="w-full pl-10 pr-12 py-3 sm:py-3.5 text-xs sm:text-sm rounded-xl sm:rounded-2xl bg-white border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent shadow-2xs transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#4F46E5] hover:bg-[#3730A3] text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer active:scale-95"
              title="Search Future Path"
              aria-label="Submit search"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* SECTION 7: SEARCH SUGGESTIONS PILLS */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs">
            <span className="text-[#64748B] font-medium text-[11px]">Popular:</span>
            {popularSearches.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(item)}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-[#EEF2FF] border border-[#E2E8F0] hover:border-[#C7D2FE] text-[#0F172A] hover:text-[#4F46E5] font-medium transition-colors shadow-2xs cursor-pointer text-[11px]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8: YOUR JOURNEY SECTION                              */}
      {/* ============================================================ */}
      <section className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 sm:space-y-5">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5]">
              YOUR JOURNEY
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
              Current Education & Target
            </h2>
          </div>
          {targetJobName && (
            <button
              onClick={removeTargetJob}
              className="text-xs text-[#64748B] hover:text-rose-600 font-semibold transition-colors cursor-pointer min-h-[36px] px-2 flex items-center"
            >
              Reset Target
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 items-stretch">
          {/* Current Education Node */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-[#E2E8F0] hover:border-[#C7D2FE] flex flex-col justify-between space-y-3 shadow-2xs transition-all">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>Current Education</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{statusLabel}</span>
                </span>
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                {studyName}
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Eligible programs and job pathways are dynamically computed for this degree.
              </p>
            </div>
            <div className="pt-1">
              <button
                onClick={openChangeModal}
                className="w-full min-h-[42px] py-2 px-3.5 rounded-xl border border-[#E2E8F0] hover:border-[#4F46E5] text-xs font-bold text-[#4F46E5] hover:bg-[#EEF2FF] inline-flex items-center justify-between transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
              >
                <span>Change Degree / Stream</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Target Job Node */}
          {targetJobName ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-purple-50/40 to-indigo-50/30 border border-[#C7D2FE] hover:border-purple-300 flex flex-col justify-between space-y-3 shadow-2xs transition-all">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Target Goal</span>
                  </span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full border border-purple-200">
                    Active Roadmap
                  </span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight flex items-center gap-1.5">
                  <span>{targetJobName}</span>
                  <span className="text-base">🎯</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Your personalized skill gap analysis and step-by-step career path are active.
                </p>
              </div>
              <div className="pt-1">
                <Link
                  to="/my-path"
                  className="w-full min-h-[42px] py-2 px-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold inline-flex items-center justify-between transition-all shadow-2xs active:scale-[0.99]"
                >
                  <span>View Full Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-[#E2E8F0] hover:border-purple-300 flex flex-col justify-between space-y-3 shadow-2xs transition-all group">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Target Job</span>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Not Set
                  </span>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-[#0F172A] tracking-tight group-hover:text-[#7C3AED] transition-colors">
                  Explore possible careers and jobs →
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Select a target job to generate your personalized skill roadmap, courses, and project milestones.
                </p>
              </div>
              <div className="pt-1">
                <button
                  onClick={openTargetJobModal}
                  className="w-full min-h-[42px] py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white text-xs font-bold inline-flex items-center justify-between transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
                >
                  <span>Explore My Options</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 9: EXPLORE YOUR FUTURE (5 Cards Grid)                */}
      {/* ============================================================ */}
      <ExploreYourFutureSection />

      {/* ============================================================ */}
      {/* ALL TAILORED OPPORTUNITIES EXPLORATION HUB                   */}
      {/* ============================================================ */}
      <ExploreOpportunitiesSection defaultEducation={studyName} />

      {/* ============================================================ */}
      {/* SECTION 18: FUTURE PATH AI BANNER                            */}
      {/* ============================================================ */}
      <section className="p-5 sm:p-8 bg-[#0F172A] text-white space-y-5 rounded-2xl shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold border border-white/10">
              <Compass className="w-3.5 h-3.5 text-cyan-300" />
              <span>Future Path AI</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Ask anything about your education and career path.
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Powered by your profile, verified MongoDB career pathways, and intelligent guidance.
            </p>
          </div>

          <button
            onClick={openAi}
            className="self-stretch sm:self-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-white text-[#0F172A] font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Ask Future Path AI</span>
          </button>
        </div>

        {/* Suggested Quick Questions */}
        <div className="pt-3 border-t border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Suggested questions:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              `What can I do after ${studyName}?`,
              `Am I eligible for ${targetJobName || 'Data Analyst'} jobs?`,
              'What skills am I missing?',
              'What should I study next?',
              'Show me my career roadmap.'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={openAi}
                className="text-xs min-h-[38px] px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer text-left border border-slate-700 active:scale-98"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
