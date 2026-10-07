import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, GraduationCap, Brain, Briefcase, User, Sparkles } from 'lucide-react';

export const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', to: '/dashboard', icon: Home },
    { label: 'Study', to: '/study-next', icon: GraduationCap },
    { label: 'Learn', to: '/learn', icon: Brain },
    { label: 'Jobs', to: '/job-roadmap', icon: Briefcase },
    { label: 'Profile', to: '/profile', icon: User },
  ];

  return (
    <>
      {/* Floating AI Button on mobile (Section 21) */}
      <Link
        to="/ai-assistant"
        className="md:hidden fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
        title="AI Assistant"
      >
        <Sparkles className="w-5 h-5" />
      </Link>

      {/* Bottom Navigation (Section 21) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || (item.to === '/dashboard' && location.pathname === '/home');
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                  isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
export default MobileNav;
