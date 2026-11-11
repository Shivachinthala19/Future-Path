import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, GraduationCap, Briefcase, User } from 'lucide-react';

export const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    {
      label: 'Home',
      to: '/dashboard',
      icon: Home,
      match: (path) => path === '/' || path === '/dashboard' || path === '/home'
    },
    {
      label: 'Explore',
      to: '/explore',
      icon: Compass,
      match: (path) => path.startsWith('/explore') || path.startsWith('/search')
    },
    {
      label: 'Study',
      to: '/study-next',
      icon: GraduationCap,
      match: (path) => path.startsWith('/study')
    },
    {
      label: 'Jobs',
      to: '/jobs',
      icon: Briefcase,
      match: (path) => path.startsWith('/job')
    },
    {
      label: 'Profile',
      to: '/profile',
      icon: User,
      match: (path) => path.startsWith('/profile')
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/92 backdrop-blur-2xl border-t border-slate-200/80 shadow-[0_-8px_32px_rgba(15,23,42,0.08)] pb-[calc(env(safe-area-inset-bottom,0px)+8px)] pt-2 select-none">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match(location.pathname);

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-150 select-none group active:scale-90 cursor-pointer ${
                isActive ? 'text-[#4F46E5]' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div
                className={`relative flex items-center justify-center w-11 h-8 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-b from-[#EEF2FF] to-indigo-50/70 text-[#4F46E5] shadow-2xs border border-indigo-200/90 scale-105'
                    : 'text-slate-500 group-hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -top-1 w-2 h-2 rounded-full bg-[#4F46E5] ring-2 ring-white animate-pulse" />
                )}
              </div>

              <span
                className={`text-[10.5px] mt-1 tracking-tight transition-colors duration-200 ${
                  isActive ? 'font-extrabold text-[#4F46E5]' : 'font-semibold text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
