import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  CheckCircle2,
  ArrowRight,
  LogOut,
  Target,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  Compass,
  BookOpen,
  TrendingUp,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  Lock,
  Mail,
  MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useEducation } from '../context/EducationContext.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';
import api from '../services/api.js';

export const ProfilePage = () => {
  const { user, profile, saveProfile, logout, isAuthenticated } = useAuth();
  const {
    currentEducation,
    targetJob,
    openChangeModal,
    openTargetJobModal,
    changeTargetJob,
    setToastMessage
  } = useEducation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('study'); // 'study' | 'job' | 'skills'

  const studyName = currentEducation?.educationName || user?.currentEducation?.name || profile?.studyText || 'B.Tech Computer Science';
  const isCompleted = currentEducation?.status !== 'currently_studying';
  const statusLabel = isCompleted ? 'Completed' : 'Currently Studying';
  const activeTargetJobTitle = targetJob?.targetJobName || user?.careerGoal?.targetJobRole || profile?.targetJob || 'Software Development Engineer (SDE)';
  const specializationVal = currentEducation?.specialization || profile?.specialization || user?.specialization || '';

  const rawName = user?.name || profile?.name || 'Explorer';
  const userName = rawName.trim().split(' ')[0] || 'Explorer';
  const headline = user?.headline || profile?.headline || 'Active Learner & Future Path Explorer';

  const userSkills = Array.isArray(user?.skills) && user.skills.length > 0
    ? user.skills
    : Array.isArray(profile?.skills) && profile.skills.length > 0
    ? profile.skills
    : ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'System Design'];

  const recommendedSkills = [
    'Docker & Kubernetes',
    'Cloud Architecture (AWS / GCP)',
    'Distributed Systems',
    'CI/CD Pipelines',
    'Microservices'
  ];

  // Profile Edit Form State
  const [name, setName] = useState(user?.name || profile?.name || '');
  const [email, setEmail] = useState(user?.email || profile?.email || '');
  const [specialization, setSpecialization] = useState(specializationVal);
  const [currentJob, setCurrentJob] = useState(profile?.currentJob || user?.currentJob || '');
  const [location, setLocation] = useState(user?.location?.city || profile?.location || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name || profile?.name) {
      setName(user?.name || profile?.name);
    }
    if (user?.email || profile?.email) {
      setEmail(user?.email || profile?.email);
    }
  }, [user?.name, profile?.name, user?.email, profile?.email]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Save in Auth Context & local storage
    saveProfile({
      name: name.trim(),
      specialization: specialization.trim(),
      currentJob: currentJob.trim(),
      location: location.trim()
    });

    // Sync to backend if authenticated
    try {
      await api.put('/user/profile', {
        name: name.trim(),
        specialization: specialization.trim(),
        currentJob: currentJob.trim(),
        location: { city: location.trim() }
      });
    } catch (err) {
      console.log('[ProfilePage] Backend sync:', err.message);
    }

    setLoading(false);
    setSavedSuccess(true);
    if (setToastMessage) {
      setToastMessage('✅ Profile updated successfully.');
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleQuickSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
      {/* ============================================================ */}
      {/* 1. PERSONAL EXPLORATION PROFILE HERO DASHBOARD CONTAINER     */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/30 border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xs p-6 sm:p-8 space-y-6">
        {/* Top: User Identity & Quick Action Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black flex items-center justify-center text-xl sm:text-2xl shadow-md shadow-indigo-500/20 flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {rawName}'s Exploration Profile
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Learner
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {headline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
            <Link
              to="/my-path"
              className="px-4.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-xs hover:shadow-md active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>My Career Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Switcher for User Details (Study vs Job vs Skills) */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 overflow-x-auto no-scrollbar scroll-smooth snap-x">
          <button
            type="button"
            onClick={() => setActiveTab('study')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95 ${
              activeTab === 'study'
                ? 'bg-indigo-600 text-white shadow-xs border border-indigo-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80 bg-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Academic Studies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('job')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95 ${
              activeTab === 'job'
                ? 'bg-purple-600 text-white shadow-xs border border-purple-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80 bg-white'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Target Career</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95 ${
              activeTab === 'skills'
                ? 'bg-emerald-600 text-white shadow-xs border border-emerald-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80 bg-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Skills & Readiness ({userSkills.length})</span>
          </button>
        </div>

        {/* Tab 1: STUDY PROFILE */}
        {activeTab === 'study' && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 space-y-5 shadow-2xs animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                  Active Academic Baseline
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {studyName}
                </h3>
                {specialization && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    Specialization: <strong className="text-slate-800">{specialization}</strong>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {statusLabel}
                </span>
                <button
                  type="button"
                  onClick={openChangeModal}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 border border-indigo-200 transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  Change Education
                </button>
              </div>
            </div>

            {/* Study Opportunity Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-slate-100">
              <div className="p-4 sm:p-4.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1 hover:border-slate-300 hover:bg-slate-50 transition-all">
                <span className="text-[10px] font-bold uppercase text-slate-500">Degree Level</span>
                <p className="text-sm font-extrabold text-slate-900">Undergraduate Degree</p>
                <p className="text-xs text-slate-500">Full statutory UGC / AICTE recognition</p>
              </div>

              <div className="p-4 sm:p-4.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1 hover:border-slate-300 hover:bg-slate-50 transition-all">
                <span className="text-[10px] font-bold uppercase text-slate-500">Next Master's Options</span>
                <p className="text-sm font-extrabold text-indigo-600">M.Tech, MBA, MS, M.Sc</p>
                <p className="text-xs text-slate-500">Direct admission via GATE, CAT, GRE</p>
              </div>

              <div className="p-4 sm:p-4.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1 hover:border-slate-300 hover:bg-slate-50 transition-all">
                <span className="text-[10px] font-bold uppercase text-slate-500">Sovereign / Public Entry</span>
                <p className="text-sm font-extrabold text-emerald-700">UPSC CSE, SSC CGL, PSUs</p>
                <p className="text-xs text-slate-500">Eligible for Group A & B Gazetted posts</p>
              </div>
            </div>

            {/* Quick Exploration Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleQuickSearch(`jobs after ${studyName}`)}
                className="px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Jobs for {studyName}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSearch(`government jobs after ${studyName}`)}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Govt Exams for {studyName}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSearch(`courses after ${studyName}`)}
                className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Master's Degrees</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: TARGET JOB PROFILE */}
        {activeTab === 'job' && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 space-y-5 shadow-2xs animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">
                  Active Career Goal
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {activeTargetJobTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aligned with: <strong className="text-slate-800">Technology, Software & AI Systems</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={openTargetJobModal}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-purple-700 hover:bg-purple-50 border border-purple-200 transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  Change Target Goal
                </button>
              </div>
            </div>

            {/* Target Job Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-slate-100">
              <div className="p-4 sm:p-4.5 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1 hover:border-purple-200 hover:bg-purple-50 transition-all">
                <span className="text-[10px] font-bold uppercase text-purple-600">Benchmark Compensation</span>
                <p className="text-sm font-extrabold text-purple-950">₹6.0 – 24.0 LPA</p>
                <p className="text-xs text-purple-700">Senior / Lead roles: ₹35 – 50+ LPA</p>
              </div>

              <div className="p-4 sm:p-4.5 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                <span className="text-[10px] font-bold uppercase text-emerald-600">Market Demand Index</span>
                <p className="text-sm font-extrabold text-emerald-950">94 / 100 • Very High</p>
                <p className="text-xs text-emerald-700">+22% YoY hiring expansion</p>
              </div>

              <div className="p-4 sm:p-4.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                <span className="text-[10px] font-bold uppercase text-indigo-600">Preparation Horizon</span>
                <p className="text-sm font-extrabold text-indigo-950">6 – 12 Months</p>
                <p className="text-xs text-indigo-700">System design & full-stack mastery</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100">
              <Link
                to="/my-path"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-2xs active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Launch Interactive Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => handleQuickSearch(activeTargetJobTitle)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Explore Open Roles</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: SKILLS & READINESS */}
        {activeTab === 'skills' && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 space-y-5 shadow-2xs animate-in fade-in duration-150">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                Competency Inventory
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                Verified Skills & Target Alignment
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {userSkills.length} competencies verified on your profile.
              </p>
            </div>

            {/* Verified Skills */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">Current Verified Skills:</span>
              <div className="flex flex-wrap items-center gap-2">
                {userSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:bg-emerald-100/70 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Skills */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">
                Recommended Next Skills for {activeTargetJobTitle}:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {recommendedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50/70 text-indigo-700 border border-indigo-200/70 text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-100/70 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* 2. ACCOUNT PREFERENCES & PROFILE EDIT FORM                   */}
      {/* ============================================================ */}
      <section className="space-y-4 sm:space-y-5">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Account Preferences
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Edit your contact info, academic record, and target career direction.
          </p>
        </div>

        <form onSubmit={handleSave} className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xs p-6 sm:p-8 space-y-6 sm:space-y-7">
          <div className="space-y-5">
            {/* 2-Column Grid for Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 font-medium bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email Address</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    Read-only
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-50/80 cursor-not-allowed"
                />
              </div>
            </div>

            {/* 2-Column Grid for Education and Target Job Quick Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Education Quick Card */}
              <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/40 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>Current Education</span>
                    </span>
                    <ChangeEducationButton label="Change" />
                  </div>
                  <div className="text-lg font-extrabold text-indigo-950">
                    {studyName}
                  </div>
                </div>
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 pt-1 border-t border-indigo-100/80">
                  <span className="px-2.5 py-0.5 rounded-md bg-white border border-indigo-200 font-semibold text-indigo-700 shadow-2xs">
                    {statusLabel}
                  </span>
                  <span>Pathways dynamically recalculate.</span>
                </div>
              </div>

              {/* Target Job Quick Card */}
              <div className="p-5 rounded-2xl border border-purple-100 bg-purple-50/40 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                      <Target className="w-4 h-4" />
                      <span>Target Goal</span>
                    </span>
                    <ChangeTargetJobButton label="Change" />
                  </div>
                  <div className="text-lg font-extrabold text-purple-950">
                    {activeTargetJobTitle}
                  </div>
                </div>
                <div className="text-xs text-slate-500 pt-1 border-t border-purple-100/80">
                  Personalizes skills, roadmap milestones, and prep.
                </div>
              </div>
            </div>

            {/* 2-Column Grid for Specialization and Current Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Specialization */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Specialization / Branch
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Optional</span>
                </div>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. Artificial Intelligence, Finance, Mechanical"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                />
              </div>

              {/* Current Role / Student */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Current Role / Status
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Optional</span>
                </div>
                <input
                  type="text"
                  value={currentJob}
                  onChange={(e) => setCurrentJob(e.target.value)}
                  placeholder="e.g. Final Year Student, Associate Engineer"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>City / Location</span>
                </label>
                <span className="text-[11px] text-slate-400 font-medium">Optional</span>
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Hyderabad, Bangalore, Mumbai"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Success Alert */}
          {savedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in duration-200 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Profile preferences have been successfully updated.</span>
            </div>
          )}

          {/* Submit Action Bar */}
          <div className="pt-3 flex items-center justify-start border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-xs hover:shadow-md disabled:opacity-50 cursor-pointer active:scale-95"
            >
              {loading ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </section>

      {/* ============================================================ */}
      {/* 3. DEDICATED ACCOUNT SESSION & LOG OUT CARD                  */}
      {/* ============================================================ */}
      <section className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="space-y-0.5">
            <div className="text-base font-extrabold text-slate-900">
              Active Session for {rawName}
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Signed in as <strong className="text-slate-800">{email}</strong>. Logging out ends this session.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs self-start sm:self-auto active:scale-95 flex-shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out of Future Path</span>
        </button>
      </section>
    </div>
  );
};

export default ProfilePage;
