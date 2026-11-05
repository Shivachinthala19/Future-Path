import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Menu,
  X,
  GraduationCap,
  User,
  Home,
  Compass,
  Briefcase,
  Layers,
  Target,
  Award,
  ArrowRight,
  LogOut,
  ChevronRight,
  Route
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useEducation } from '../../context/EducationContext.jsx';
import { FuturePathLogo } from './FuturePathLogo.jsx';

export const Navbar = ({ onOpenAssistant }) => {
  const { isAuthenticated, user, profile, logout } = useAuth();
  const { currentEducation, openChangeModal } = useEducation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const rawName = user?.name || profile?.name || 'Explorer';
  const userName = rawName.trim().split(' ')[0] || 'Explorer';
  const currentStudyName = currentEducation?.educationName || profile?.studyText || 'B.Tech Computer Science';

  const navLinks = [
    { label: 'Home', to: '/dashboard' },
    { label: 'Explore', to: '/explore' },
    { label: 'Study', to: '/study-next' },
    { label: 'Jobs', to: '/jobs' },
    { label: 'Careers', to: '/careers' },
    { label: 'My Path', to: '/my-path' },
    { label: 'AI', to: '/ai-assistant', isAi: true }
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard' || location.pathname === '/home';
    }
    if (path === '/explore' || path === '/search') {
      return location.pathname.startsWith('/search') || location.pathname.startsWith('/explore');
    }
    return location.pathname.startsWith(path);
  };

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[rgba(255,255,255,0.95)] backdrop-blur-[12px] border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Future Path logo + name */}
        <Link to="/dashboard" className="flex items-center gap-2 flex-shrink-0 group">
          <FuturePathLogo size={36} showTagline={false} />
        </Link>

        {/* Center: Desktop Nav Links (Visible when authenticated) */}
        {isAuthenticated ? (
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              if (link.isAi && onOpenAssistant) {
                return (
                  <button
                    key={link.to}
                    onClick={onOpenAssistant}
                    className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      active
                        ? 'text-[#4F46E5] bg-[#EEF2FF] font-bold shadow-2xs'
                        : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{link.label}</span>
                  </button>
                );
              }
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'text-[#4F46E5] bg-[#EEF2FF] font-bold shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        ) : (
          <div className="hidden md:flex items-center text-xs font-semibold text-slate-500">
            Sign in to unlock personalized pathways, careers, and roadmaps.
          </div>
        )}

        {/* Right: Education Switcher + Profile / Login */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Current Education Quick Pill */}
          <button
            onClick={openChangeModal}
            title="Click to change education"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#0F172A] hover:text-[#4F46E5] transition-colors border border-[#E2E8F0] hover:border-[#C7D2FE] cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span className="max-w-[130px] truncate">{currentStudyName}</span>
          </button>

          {/* Profile link */}
          <Link
            to="/profile"
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-colors border ${isActive('/profile')
                ? 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE] font-bold shadow-2xs'
                : 'bg-white hover:bg-slate-50 text-[#0F172A] border-[#E2E8F0]'
              }`}
          >
            <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold flex items-center justify-center">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span>{userName}</span>
          </Link>

          {/* Sign In / Switch Account */}
          <Link
            to="/login"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${isActive('/login')
                ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                : 'text-[#4F46E5] bg-[#EEF2FF] hover:bg-indigo-100/80 border-indigo-200'
              }`}
          >
            {isAuthenticated ? 'Switch User' : 'Sign In'}
          </Link>
        </div>

        {/* Mobile Navbar Hamburger & Quick AI */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenAssistant ? (
            <button
              onClick={onOpenAssistant}
              className="p-2 rounded-xl bg-[#EEF2FF] text-[#4F46E5] cursor-pointer"
              title="AI Assistant"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/ai-assistant"
              className="p-2 rounded-xl bg-[#EEF2FF] text-[#4F46E5]"
              title="AI Assistant"
            >
              <Sparkles className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/80"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE HAMBURGER MENU DRAWER (STRUCTURED IN COLUMNS)        */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white/98 backdrop-blur-xl px-4 sm:px-6 py-5 space-y-5 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Top: User Greeting & Current Education Capsule */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F8FAFC] to-[#EEF2FF]/50 border border-[#E2E8F0] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] font-extrabold flex items-center justify-center text-sm shadow-2xs flex-shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold text-[#0F172A] truncate">
                    {userName}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                </div>
                <p className="text-[11px] text-[#64748B] truncate">
                  {currentStudyName}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChangeModal();
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-[#4F46E5] border border-indigo-200/80 hover:bg-indigo-50 transition-colors shadow-2xs flex-shrink-0 cursor-pointer"
            >
              Change
            </button>
          </div>

          {/* Columnar Navigation Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* COLUMN 1: DISCOVERY & ACADEMICS */}
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#4F46E5] px-1 flex items-center gap-1.5">
                <Compass className="w-3 h-3" />
                <span>Discovery & Academics</span>
              </div>

              <div className="space-y-1.5">
                <Link
                  to="/dashboard"
                  onClick={handleMobileNavClick}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors border ${isActive('/dashboard')
                      ? 'bg-[#EEF2FF] border-indigo-200/80 text-[#4F46E5] font-bold shadow-2xs'
                      : 'bg-[#F8FAFC] border-slate-200/70 text-slate-800 hover:bg-slate-100/80'
                    }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-2xs">
                    <Home className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Home Dashboard</div>
                    <div className="text-[10px] text-[#64748B] truncate">Overview & recommendations</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/explore"
                  onClick={handleMobileNavClick}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors border ${isActive('/explore') || isActive('/search')
                      ? 'bg-[#EEF2FF] border-indigo-200/80 text-[#4F46E5] font-bold shadow-2xs'
                      : 'bg-[#F8FAFC] border-slate-200/70 text-slate-800 hover:bg-slate-100/80'
                    }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-2xs">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Explore Database</div>
                    <div className="text-[10px] text-[#64748B] truncate">Universal knowledge search</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/study-next"
                  onClick={handleMobileNavClick}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors border ${isActive('/study-next')
                      ? 'bg-[#EEF2FF] border-indigo-200/80 text-[#4F46E5] font-bold shadow-2xs'
                      : 'bg-[#F8FAFC] border-slate-200/70 text-slate-800 hover:bg-slate-100/80'
                    }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-2xs">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Study Programs</div>
                    <div className="text-[10px] text-[#64748B] truncate">Undergraduate & Master's degrees</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/jobs"
                  onClick={handleMobileNavClick}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors border ${isActive('/jobs')
                      ? 'bg-[#EEF2FF] border-indigo-200/80 text-[#4F46E5] font-bold shadow-2xs'
                      : 'bg-[#F8FAFC] border-slate-200/70 text-slate-800 hover:bg-slate-100/80'
                    }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Jobs & Careers</div>
                    <div className="text-[10px] text-[#64748B] truncate">High-growth roles & salaries</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* COLUMN 2: PATHWAYS & AI TOOLS */}
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 px-1 flex items-center gap-1.5">
                <Layers className="w-3 h-3" />
                <span>Pathways & AI Tools</span>
              </div>

              <div className="space-y-1.5">
                <Link
                  to="/careers"
                  onClick={handleMobileNavClick}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors border ${isActive('/careers')
                      ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold shadow-2xs'
                      : 'bg-[#F8FAFC] border-slate-200/70 text-slate-800 hover:bg-slate-100/80'
                    }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-2xs">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Career Domains</div>
                    <div className="text-[10px] text-[#64748B] truncate">11 Strategic industry sectors</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/my-path"
                  onClick={handleMobileNavClick}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors border ${isActive('/my-path')
                      ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold shadow-2xs'
                      : 'bg-[#F8FAFC] border-slate-200/70 text-slate-800 hover:bg-slate-100/80'
                    }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-2xs">
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">My Career Path</div>
                    <div className="text-[10px] text-[#64748B] truncate">Personalized milestone tracker</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/exams"
                  onClick={handleMobileNavClick}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors border ${isActive('/exams')
                      ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold shadow-2xs'
                      : 'bg-[#F8FAFC] border-slate-200/70 text-slate-800 hover:bg-slate-100/80'
                    }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-rose-600 flex-shrink-0 shadow-2xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Entrance & Govt Exams</div>
                    <div className="text-[10px] text-[#64748B] truncate">UPSC, SSC, GATE, Banking</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                {onOpenAssistant ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAssistant();
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors border bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 text-purple-900 text-left cursor-pointer shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-2xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>AI Career Assistant</span>
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-purple-600 text-white">AI</span>
                      </div>
                      <div className="text-[10px] text-purple-700 truncate">Instant pathway questions</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                ) : (
                  <Link
                    to="/ai-assistant"
                    onClick={handleMobileNavClick}
                    className="flex items-center gap-3 p-2.5 rounded-xl transition-colors border bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 text-purple-900 shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-2xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>AI Career Assistant</span>
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-purple-600 text-white">AI</span>
                      </div>
                      <div className="text-[10px] text-purple-700 truncate">Instant pathway questions</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Strip: Profile & Login */}
          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                onClick={handleMobileNavClick}
                className={`flex-1 sm:flex-initial flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-colors ${isActive('/profile')
                    ? 'bg-[#EEF2FF] text-[#4F46E5] border-indigo-200 shadow-2xs'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span>My Profile</span>
              </Link>

              <Link
                to="/login"
                onClick={handleMobileNavClick}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#EEF2FF] text-[#4F46E5] border border-indigo-200 text-xs font-bold hover:bg-indigo-100 transition-colors shadow-2xs"
              >
                <span>{isAuthenticated ? 'Switch User' : 'Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
