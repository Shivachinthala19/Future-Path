import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, GraduationCap, Target, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useEducation } from '../../context/EducationContext.jsx';
import { FuturePathLogo } from './FuturePathLogo.jsx';

export const Navbar = ({ onOpenAssistant }) => {
  const { isAuthenticated, user, profile } = useAuth();
  const {
    currentEducation,
    targetJob,
    openChangeModal,
    openTargetJobModal
  } = useEducation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/dashboard' },
    { label: 'Explore', to: '/search' },
    { label: 'Study Next', to: '/study-next' },
    { label: 'Jobs', to: '/job-roadmap' },
    { label: 'My Path', to: '/my-path' },
    { label: 'Profile', to: '/profile' },
  ];

  const currentStudyName = currentEducation?.educationName || 'B.Com';
  const activeTargetJobTitle = targetJob?.targetJobName;

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo: Logo icon + Wordmark, 36-44px */}
        <Link to="/dashboard" className="flex items-center gap-2 flex-shrink-0 group">
          <FuturePathLogo size={38} showTagline={false} />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'text-indigo-600 bg-indigo-50 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Section: AI Assistant Button + Pills */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Active Education Pill */}
          <button
            onClick={openChangeModal}
            title="Click to change education"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 transition-colors border border-slate-200 hover:border-indigo-200 cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span className="max-w-[110px] truncate">{currentStudyName}</span>
          </button>

          {/* AI Assistant CTA */}
          {onOpenAssistant ? (
            <button
              onClick={onOpenAssistant}
              className="btn-gradient !py-1.5 !px-3.5 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              title="Open Future Path AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>AI Assistant</span>
            </button>
          ) : (
            <Link
              to="/ai-assistant"
              className="btn-gradient !py-1.5 !px-3.5 text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>AI Assistant</span>
            </Link>
          )}
        </div>

        {/* Mobile Navbar: [Logo] Future Path ... ☰ */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenAssistant ? (
            <button
              onClick={onOpenAssistant}
              className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600"
              title="AI Assistant"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/ai-assistant"
              className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600"
              title="AI Assistant"
            >
              <Sparkles className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Your Education:</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChangeModal();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="max-w-[160px] truncate">{currentStudyName}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/ai-assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-gradient !py-2 text-xs font-bold justify-center"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Future Path AI Assistant</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
