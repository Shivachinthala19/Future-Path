import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, GraduationCap, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useEducation } from '../../context/EducationContext.jsx';
import { FuturePathLogo } from './FuturePathLogo.jsx';

export const Navbar = ({ onOpenAssistant }) => {
  const { isAuthenticated, user, profile } = useAuth();
  const { currentEducation, openChangeModal } = useEducation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/dashboard' },
    { label: 'Explore', to: '/search' },
    { label: 'Study', to: '/study-next' },
    { label: 'Jobs', to: '/jobs' },
    { label: 'My Path', to: '/my-path' },
    { label: 'AI', to: '/ai-assistant', isAi: true },
  ];

  const currentStudyName = currentEducation?.educationName || 'B.Com';

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard' || location.pathname === '/home';
    }
    if (path === '/search') {
      return location.pathname.startsWith('/search') || location.pathname.startsWith('/explore');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[rgba(255,255,255,0.95)] backdrop-blur-[10px] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Future Path logo + name */}
        <Link to="/dashboard" className="flex items-center gap-2 flex-shrink-0 group">
          <FuturePathLogo size={36} showTagline={false} />
        </Link>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            if (link.isAi && onOpenAssistant) {
              return (
                <button
                  key={link.to}
                  onClick={onOpenAssistant}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'text-[#4F46E5] bg-[#EEF2FF] font-bold'
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
                className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  active
                    ? 'text-[#4F46E5] bg-[#EEF2FF] font-bold'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Education Switcher + Profile */}
        <div className="hidden md:flex items-center gap-3">
          {/* Current Education Quick Pill */}
          <button
            onClick={openChangeModal}
            title="Click to change education"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#0F172A] hover:text-[#4F46E5] transition-colors border border-[#E2E8F0] hover:border-[#C7D2FE] cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span className="max-w-[120px] truncate">{currentStudyName}</span>
          </button>

          {/* Profile link */}
          <Link
            to="/profile"
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-colors border ${
              isActive('/profile')
                ? 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE] font-bold'
                : 'bg-white hover:bg-slate-50 text-[#0F172A] border-[#E2E8F0]'
            }`}
          >
            <User className="w-4 h-4 text-[#64748B]" />
            <span>Profile</span>
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
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs text-[#64748B] font-medium">Your Education:</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChangeModal();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="max-w-[160px] truncate">{currentStudyName}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold'
                      : 'text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                isActive('/profile')
                  ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold'
                  : 'text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
