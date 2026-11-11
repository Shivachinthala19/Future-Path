import React, { useState, useEffect } from 'react';
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
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    if (isLoginPage) {
      setMobileMenuOpen(false);
    }
  }, [isLoginPage]);

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
          {isAuthenticated ? (
            <>
              {/* Current Education Quick Pill - After Login Only */}
              <button
                onClick={openChangeModal}
                title="Click to change education"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#0F172A] hover:text-[#4F46E5] transition-colors border border-[#E2E8F0] hover:border-[#C7D2FE] cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span className="max-w-[130px] truncate">{currentStudyName}</span>
              </button>

              {/* Profile link - After Login Only */}
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
            </>
          ) : (
            /* Login page / Unauthenticated: ONLY Sign In button, NO profile button */
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-2xs"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Navbar Hamburger & Quick AI (Hamburger removed on login page) */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && (
            onOpenAssistant ? (
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
            )
          )}

          {!isLoginPage && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/80"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE HAMBURGER MENU DRAWER (STRUCTURED IN COLUMNS)        */}
      {/* ============================================================ */}
      {mobileMenuOpen && !isLoginPage && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white/98 backdrop-blur-2xl px-4 sm:px-6 py-4 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto no-scrollbar touch-scroll">
          {/* Subtle Mobile Drag Indicator */}
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-1" />

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

          {/* Pathways & Career Planning Tools (Discovery & Academics removed in mobile view) */}
          <div className="space-y-3">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#4F46E5] px-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span>Career Planning & Advanced Tools</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                Pathway Hub
              </span>
            </div>

            <div className="space-y-2">
              {/* 1. My Career Path */}
              <Link
                to="/my-path"
                onClick={handleMobileNavClick}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all border active:scale-[0.98] ${
                  isActive('/my-path')
                    ? 'bg-[#EEF2FF] border-indigo-200 text-[#4F46E5] font-bold shadow-2xs'
                    : 'bg-[#F8FAFC] border-slate-200/80 text-slate-800 hover:bg-slate-100/80'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-indigo-200 flex items-center justify-center text-[#4F46E5] flex-shrink-0 shadow-2xs">
                  <Target className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold truncate flex items-center gap-2">
                    <span>My Career Path</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700">TRACKER</span>
                  </div>
                  <div className="text-[11px] text-[#64748B] truncate">Step-by-step milestones & skill gaps</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </Link>

              {/* 2. Career Domains */}
              <Link
                to="/careers"
                onClick={handleMobileNavClick}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all border active:scale-[0.98] ${
                  isActive('/careers')
                    ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold shadow-2xs'
                    : 'bg-[#F8FAFC] border-slate-200/80 text-slate-800 hover:bg-slate-100/80'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-2xs">
                  <Layers className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold truncate flex items-center gap-2">
                    <span>Career Domains & Ladders</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700">SALARIES</span>
                  </div>
                  <div className="text-[11px] text-[#64748B] truncate">13 strategic sectors & role ladders</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </Link>

              {/* 3. Entrance & Govt Exams */}
              <Link
                to="/exams"
                onClick={handleMobileNavClick}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all border active:scale-[0.98] ${
                  isActive('/exams')
                    ? 'bg-amber-50 border-amber-200 text-amber-800 font-bold shadow-2xs'
                    : 'bg-[#F8FAFC] border-slate-200/80 text-slate-800 hover:bg-slate-100/80'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-2xs">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold truncate flex items-center gap-2">
                    <span>Entrance & Govt Exams</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">GOVT</span>
                  </div>
                  <div className="text-[11px] text-[#64748B] truncate">UPSC, SSC, GATE, Banking & Defence</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </Link>

              {/* 4. Skills & ATS Readiness */}
              <Link
                to="/learn"
                onClick={handleMobileNavClick}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all border active:scale-[0.98] ${
                  isActive('/learn')
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold shadow-2xs'
                    : 'bg-[#F8FAFC] border-slate-200/80 text-slate-800 hover:bg-slate-100/80'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold truncate flex items-center gap-2">
                    <span>Skills & ATS Tools</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">CREDENTIALS</span>
                  </div>
                  <div className="text-[11px] text-[#64748B] truncate">Technical frameworks & portfolio tools</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </Link>

              {/* 5. AI Career Counselor */}
              {onOpenAssistant ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAssistant();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all border bg-gradient-to-r from-purple-50 via-indigo-50/70 to-blue-50 border-indigo-200 text-slate-900 text-left cursor-pointer shadow-2xs active:scale-[0.98]"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-indigo-200 flex items-center justify-center text-[#4F46E5] flex-shrink-0 shadow-2xs">
                    <Sparkles className="w-4.5 h-4.5 text-[#4F46E5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                      <span>Future Path AI Assistant</span>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#4F46E5] text-white">AI</span>
                    </div>
                    <div className="text-[11px] text-[#4F46E5] font-semibold truncate">Instant answers for degrees & salaries</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                </button>
              ) : (
                <Link
                  to="/ai-assistant"
                  onClick={handleMobileNavClick}
                  className="flex items-center gap-3 p-3 rounded-2xl transition-all border bg-gradient-to-r from-purple-50 via-indigo-50/70 to-blue-50 border-indigo-200 text-slate-900 shadow-2xs active:scale-[0.98]"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-indigo-200 flex items-center justify-center text-[#4F46E5] flex-shrink-0 shadow-2xs">
                    <Sparkles className="w-4.5 h-4.5 text-[#4F46E5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                      <span>Future Path AI Assistant</span>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#4F46E5] text-white">AI</span>
                    </div>
                    <div className="text-[11px] text-[#4F46E5] font-semibold truncate">Instant answers for degrees & salaries</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                </Link>
              )}
            </div>
          </div>

          {/* Bottom Action Strip: Profile & Login */}
          <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={handleMobileNavClick}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-transform active:scale-95 shadow-2xs ${isActive('/profile')
                      ? 'bg-[#EEF2FF] text-[#4F46E5] border-indigo-200'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                >
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>My Profile</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50/60 hover:bg-rose-100/70 border border-rose-200/60 transition-transform active:scale-95 cursor-pointer shadow-2xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              /* Unauthenticated: Only Sign In button */
              <Link
                to="/login"
                onClick={handleMobileNavClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-bold hover:bg-[#4338CA] transition-transform active:scale-95 shadow-2xs"
              >
                <span>Sign In to Future Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
