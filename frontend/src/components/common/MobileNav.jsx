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
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0] shadow-[0_-4px_24px_rgba(15,23,42,0.08)] pb-[calc(env(safe-area-inset-bottom,0px)+6px)] pt-1.5">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match(location.pathname);

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 select-none group active:scale-95 ${
                isActive ? 'text-[#4F46E5]' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <div
                className={`relative flex items-center justify-center w-10 h-8 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#EEF2FF] text-[#4F46E5] shadow-2xs border border-indigo-200/80 scale-105'
                    : 'text-[#64748B] group-hover:bg-slate-50'
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
                className={`text-[10px] mt-1 tracking-tight transition-colors duration-200 ${
                  isActive ? 'font-extrabold text-[#4F46E5]' : 'font-semibold text-[#64748B]'
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
