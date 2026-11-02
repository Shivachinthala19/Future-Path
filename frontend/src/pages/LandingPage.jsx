import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Compass,
  Target,
  GraduationCap,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ExploreYourFutureSection } from '../components/ExploreYourFutureSection.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';

export const LandingPage = () => {
  const { currentEducation, targetJob } = useEducation();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const rawName = user?.name || profile?.name;
  const userName = rawName ? rawName.trim().split(' ')[0] : '';
  const studyName = currentEducation?.educationName || 'B.Com';
  const targetJobName = targetJob?.targetJobName;

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleQuickChip = (text) => {
    navigate(`/search?q=${encodeURIComponent(text)}`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-4 sm:py-8 max-w-6xl mx-auto">
      {/* ================================================================= */}
      {/* 1. HERO: WELCOME & SEARCH ANYTHING                                */}
      {/* ================================================================= */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-2 sm:pt-4">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-indigo-600" />
          <span>Your Education. Your Choices. Your Future.</span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          {userName && (
            <div className="text-base sm:text-lg font-bold text-slate-500">
              Welcome back, {userName} 👋
            </div>
          )}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Your future starts with the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              right path.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore what you can study next, discover career opportunities, and build a personalized path toward your goals.
          </p>
        </div>

        {/* Large Search Bar */}
        <div className="max-w-2xl mx-auto pt-1">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-md p-1.5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all"
          >
            <div className="flex items-center gap-2.5 flex-1 px-3">
              <Search className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a study, career, job or exam (e.g. B.Com, Data Analyst, SSC)..."
                className="w-full text-xs sm:text-sm bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
              />
            </div>
            <button
              type="submit"
              className="btn-gradient !py-2.5 !px-5 text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer"
            >
              <span>Search Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Query Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 text-xs">
            <span className="text-slate-400 font-medium mr-1">Popular:</span>
            {[
              'B.Com',
              'Data Analyst',
              'B.Tech CSE',
              'Police SI',
              'Bank PO',
              '12th Science',
              'MBA'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleQuickChip(chip)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 font-medium transition-colors shadow-2xs cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. MAIN VISUAL HIGHLIGHT: EXPLORE YOUR FUTURE                     */}
      {/* ================================================================= */}
      <ExploreYourFutureSection />

      {/* ================================================================= */}
      {/* 3. PERSONALIZED CAREER POSITION & TARGET PATH CARD                */}
      {/* ================================================================= */}
      <section className="card-clean p-6 sm:p-8 bg-white border border-slate-200/90 rounded-3xl shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>Personalized Career Navigation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              My Future Path
            </h3>
            <p className="text-xs text-slate-500">
              Continuous step-by-step guidance connecting your qualification to your goal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ChangeEducationButton />
            <ChangeTargetJobButton />
          </div>
        </div>

        {/* 2-Column Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Education Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                CURRENT QUALIFICATION
              </div>
              <div className="text-lg font-extrabold text-slate-900">
                {studyName}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Foundational baseline for higher education degrees and corporate/government eligibility.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <Link
                to="/study-next"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>What can I study next?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Target Job Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                ACTIVE TARGET CAREER
              </div>
              <div className="text-lg font-extrabold text-slate-900">
                {targetJobName || 'Data Analyst'}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {targetJobName
                  ? `7-step preparation roadmap and direct application links active for ${targetJobName}.`
                  : 'Select any target role to personalize your skill checklist, resume, and interview prep.'}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <Link
                to="/job-roadmap"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>View Master Cracking Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. AI CAREER ASSISTANT INVITATION                                 */}
      {/* ================================================================= */}
      <section className="card-clean p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>AI Career Counselor</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Have a question about your path?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ask Future Path AI for personalized course comparisons, job eligibility rules, and interview preparation.
          </p>
        </div>

        <Link
          to="/ai-assistant"
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all shadow-md inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span>Ask Future Path AI</span>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
