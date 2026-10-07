import React, { useState, useRef } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Circle,
  GraduationCap,
  Target,
  Briefcase,
  Compass,
  BookOpen,
  Layers,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ExploreOpportunitiesSection } from '../components/ExploreOpportunitiesSection.jsx';
import { ExploreYourFutureSection } from '../components/ExploreYourFutureSection.jsx';

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
  const exploreRef = useRef(null);

  const handleScrollToExplore = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 3. User Name Dynamic Resolution (Strict: No "Good Morning / Afternoon / Evening")
  const rawName = user?.name || profile?.name;
  const userName = rawName ? rawName.trim().split(' ')[0] : '';

  const studyName = currentEducation?.educationName || 'B.Com';
  const studyFullName = currentEducation?.educationName?.toLowerCase().includes('b.com') || currentEducation?.educationName?.toLowerCase().includes('bcom')
    ? 'Bachelor of Commerce'
    : currentEducation?.educationName?.toLowerCase().includes('b.tech') || currentEducation?.educationName?.toLowerCase().includes('btech')
    ? 'Bachelor of Technology'
    : currentEducation?.educationName?.toLowerCase().includes('10th')
    ? 'Secondary School Certificate (SSC)'
    : currentEducation?.educationName?.toLowerCase().includes('12th')
    ? 'Higher Secondary Certificate (HSC)'
    : currentEducation?.educationName || 'Undergraduate Degree';

  const isCompleted = currentEducation?.status !== 'currently_studying';
  const statusLabel = isCompleted ? 'Completed' : 'Currently Studying';

  const targetJobName = targetJob?.targetJobName;

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

  // Dynamic Skill Gap items based on target
  const getSkillsData = () => {
    const t = (targetJobName || '').toLowerCase();
    if (t.includes('data') || t.includes('analyst')) {
      return {
        have: ['Excel', 'Problem Solving', 'Data Interpretation'],
        need: ['SQL', 'Power BI / Tableau', 'Statistics', 'Python for Analytics']
      };
    }
    if (t.includes('software') || t.includes('dev')) {
      return {
        have: ['Logic & Algorithms', 'Basic Programming'],
        need: ['JavaScript / React', 'Node.js & APIs', 'PostgreSQL', 'Git & CI/CD']
      };
    }
    if (t.includes('account') || t.includes('finance')) {
      return {
        have: ['Accounting Principles', 'Financial Statements'],
        need: ['Tally Prime & GST', 'Advanced Excel (VLOOKUP/XLOOKUP)', 'TDS E-Filing', 'Financial Modeling']
      };
    }
    return {
      have: ['Domain Fundamentals', 'Communication'],
      need: ['Core Technical Tools', 'Specialized Software', 'Project Execution', 'Industry Compliance']
    };
  };

  const skillsData = getSkillsData();

  // Dynamic Future Path preview stages
  const roadmapStages = [
    { title: studyName, subtitle: 'Current Education', status: 'Completed', to: '/study-next' },
    { title: targetJobName || 'Choose Target', subtitle: 'Target Goal', status: targetJobName ? 'Current' : 'Upcoming', to: '/job-roadmap' },
    { title: 'Learn SQL', subtitle: 'Core Tooling', status: 'Upcoming', to: '/learn' },
    { title: 'Learn Power BI', subtitle: 'Analytics Tool', status: 'Upcoming', to: '/learn' },
    { title: 'Build Projects', subtitle: 'Portfolio Proof', status: 'Upcoming', to: '/job-roadmap' },
    { title: 'Create Resume', subtitle: 'ATS Optimization', status: 'Upcoming', to: '/job-roadmap' },
    { title: 'Interview Prep', subtitle: 'STAR Method', status: 'Upcoming', to: '/ai-assistant' },
    { title: 'Apply for Jobs', subtitle: 'Career Entry', status: 'Upcoming', to: '/job-roadmap' },
  ];

  return (
    <div className="space-y-10 sm:space-y-12 max-w-5xl mx-auto py-2 sm:py-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold flex items-center gap-2.5 shadow-2xs animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 4: NEW HOME PAGE HERO (Section 3 & 4) */}
      {/* ============================================================ */}
      <section className="card-clean hero-bg-subtle p-6 sm:p-10 border border-slate-200/80 text-center space-y-6 relative overflow-hidden">
        {/* Subtle Decorative Backdrop Elements */}
        <div className="space-y-2">
          {/* Personalized Heading */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Future Path Personalized Navigator</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-700 tracking-tight pt-1">
            {userName ? `Welcome back, ${userName} 👋` : 'Welcome back 👋'}
          </h2>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Your future starts with the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              right path.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed pt-1">
            Explore what you can study next, discover career opportunities, and build a personalized path toward your goals.
          </p>
        </div>

        {/* Large Search Bar */}
        <div className="max-w-2xl mx-auto pt-2">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              <Search className="w-5 h-5 text-indigo-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search a study, career or job..."
              className="w-full pl-12 pr-28 py-3.5 sm:py-4 text-sm sm:text-base rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              Search
            </button>
          </form>

          {/* Search Examples Prompt Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs">
            <span className="text-slate-400 font-medium">Try:</span>
            <button
              onClick={() => handleChipClick('Data Analyst')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 font-medium transition-colors shadow-2xs cursor-pointer"
            >
              Search "Data Analyst"
            </button>
            <button
              onClick={() => handleChipClick('MBA')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 font-medium transition-colors shadow-2xs cursor-pointer"
            >
              Search "MBA"
            </button>
            <button
              onClick={() => handleChipClick(`Jobs after ${studyName}`)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 font-medium transition-colors shadow-2xs cursor-pointer"
            >
              Search "Jobs after {studyName}"
            </button>
            <button
              onClick={() => handleChipClick('Software Developer')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 font-medium transition-colors shadow-2xs cursor-pointer"
            >
              Search "Software Developer"
            </button>
          </div>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link
            to="/my-path"
            className="w-full sm:w-auto btn-gradient text-sm sm:text-base font-bold shadow-md hover:scale-[1.01] transition-transform"
          >
            <span>Build My Future Path</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <button
            onClick={handleScrollToExplore}
            className="w-full sm:w-auto btn-secondary text-sm sm:text-base font-semibold cursor-pointer"
          >
            <span>Explore Opportunities ↓</span>
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MAIN VISUAL HIGHLIGHT: EXPLORE YOUR FUTURE SECTION           */}
      {/* ============================================================ */}
      <ExploreYourFutureSection />

      {/* ============================================================ */}
      {/* SECTION 5 & 6: USER EDUCATION & TARGET CAREER SECTIONS */}
      {/* ============================================================ */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECTION 5: User Education Section */}
        <div className="card-clean p-6 bg-white border border-slate-200 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Your Current Education
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {studyName}
            </div>
            <div className="text-sm font-medium text-slate-600">
              {studyFullName}
            </div>
            <div className="pt-1">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {statusLabel}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={openChangeModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Change Education</span>
            </button>
          </div>
        </div>

        {/* SECTION 6: Target Career Section */}
        <div className="card-clean p-6 bg-white border border-slate-200 flex flex-col justify-between space-y-4">
          {targetJobName ? (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
                    Your Target
                  </div>
                  <button
                    onClick={removeTargetJob}
                    className="text-[11px] text-slate-400 hover:text-rose-600 font-semibold transition-colors cursor-pointer"
                  >
                    Clear Target
                  </button>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {targetJobName}
                </div>

                {/* Simple Path Representation */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Progression Blueprint:
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                    <span className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200">Education</span>
                    <span className="text-slate-400">↓</span>
                    <span className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200">Eligibility</span>
                    <span className="text-slate-400">↓</span>
                    <span className="px-2 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200">Skills</span>
                    <span className="text-slate-400">↓</span>
                    <span className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200">Projects</span>
                    <span className="text-slate-400">↓</span>
                    <span className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200">Resume</span>
                    <span className="text-slate-400">↓</span>
                    <span className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200">Interview</span>
                    <span className="text-slate-400">↓</span>
                    <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">Job</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  to="/job-roadmap"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-2xs transition-colors"
                >
                  <span>See Your Path →</span>
                </Link>
                <button
                  onClick={openTargetJobModal}
                  className="text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors cursor-pointer"
                >
                  Change Target
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Your Target
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Where do you want to go?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Choose a career or job and we'll help you build the step-by-step path from your {studyName} background.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={openTargetJobModal}
                  className="w-full btn-gradient !py-2.5 text-xs font-bold justify-center"
                >
                  <Target className="w-4 h-4 text-purple-200" />
                  <span>Choose My Target</span>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7: FUTURE PATH PREVIEW (ROADMAP SECTION) */}
      {/* ============================================================ */}
      <section className="card-clean p-6 sm:p-8 bg-white border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Your Future Path</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Action Roadmap
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              From your educational foundation to your target career milestone.
            </p>
          </div>
          <Link
            to="/my-path"
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>Full Engine View</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Timeline on Desktop / Vertical Timeline on Mobile */}
        <div className="pt-2">
          {/* Desktop Timeline */}
          <div className="hidden lg:grid grid-cols-8 gap-2 relative">
            {roadmapStages.map((stage, idx) => (
              <Link
                key={idx}
                to={stage.to}
                className="group p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between min-h-[110px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                    {stage.status === 'Completed' ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Done
                      </span>
                    ) : stage.status === 'Current' ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                        Active
                      </span>
                    ) : (
                      <span className="text-[9px] font-medium text-slate-400">
                        Next
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-2 transition-colors">
                    {stage.title}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 group-hover:text-slate-600 mt-2 truncate">
                  {stage.subtitle}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile / Tablet Vertical Timeline */}
          <div className="lg:hidden space-y-3 relative pl-4 border-l-2 border-slate-200">
            {roadmapStages.map((stage, idx) => (
              <Link
                key={idx}
                to={stage.to}
                className="block p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">
                      Step {idx + 1}:
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {stage.title}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      stage.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : stage.status === 'Current'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {stage.subtitle}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8: EXPLORE SECTION (3 CLEAN FEATURE CARDS) */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Explore Opportunities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover what to study next, explore career domains, and evaluate target job requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Study Next */}
          <Link
            to="/study-next"
            className="fp-card p-6 bg-white border border-slate-200 flex flex-col justify-between space-y-4 group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform shadow-2xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                📚 Study Next
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover what you can study after your current education. Explore verified direct masters, professional credentials, and executive degrees.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Explore Studies →</span>
            </div>
          </Link>

          {/* Card 2: Careers */}
          <Link
            to="/careers"
            className="fp-card p-6 bg-white border border-slate-200 flex flex-col justify-between space-y-4 group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform shadow-2xs">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                🧭 Careers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore career fields connected to your education and interests. Understand growth sectors, industry demand, and realistic career trajectories.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
              <span>Explore Careers →</span>
            </div>
          </Link>

          {/* Card 3: Jobs */}
          <Link
            to="/job-roadmap"
            className="fp-card p-6 bg-white border border-slate-200 flex flex-col justify-between space-y-4 group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform shadow-2xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                💼 Jobs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover jobs, eligibility criteria, required skills, portfolio blueprints, and end-to-end interview preparation paths.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-cyan-600 group-hover:translate-x-1 transition-transform">
              <span>Explore Jobs →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 9: SKILL GAP SECTION */}
      {/* ============================================================ */}
      <section className="card-clean p-6 sm:p-8 bg-white border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Target Competencies
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Skills for Your Target {targetJobName ? `(${targetJobName})` : ''}
            </h2>
          </div>
          <Link
            to="/learn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs self-start sm:self-auto"
          >
            <span>View Skill Roadmap →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
          {/* You already have */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You already have</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              {skillsData.have.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills to develop */}
          <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-200/80 space-y-3">
            <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
              <Circle className="w-4 h-4 text-indigo-600" />
              <span>Skills to develop</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              {skillsData.need.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-indigo-500 font-semibold">○</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* EXPLORE OPPORTUNITIES MASTER INTELLIGENCE SECTION */}
      {/* ============================================================ */}
      <div ref={exploreRef} className="pt-2">
        <ExploreOpportunitiesSection defaultEducation={studyName} />
      </div>

      {/* ============================================================ */}
      {/* SECTION 10: AI CAREER ASSISTANT SECTION CARD */}
      {/* ============================================================ */}
      <section className="card-clean p-6 sm:p-8 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Future Path AI</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Future Path AI
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200">
              Your personal education and career guide.
            </p>
          </div>

          <button
            onClick={openAi}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Ask Future Path AI ✨</span>
          </button>
        </div>

        {/* Suggested Quick Questions */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider mb-2.5">
            Suggested questions:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              `What can I study after ${studyName}?`,
              `Can I become a ${targetJobName || 'Data Analyst'}?`,
              'What skills am I missing?',
              'What jobs can I apply for?',
              'How should I prepare for this job?'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={openAi}
                className="text-xs px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer text-left"
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
