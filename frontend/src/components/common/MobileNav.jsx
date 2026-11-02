import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Route, Sparkles, User } from 'lucide-react';

export const MobileNav = ({ onOpenAssistant }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', to: '/dashboard', icon: Home },
    { label: 'Explore', to: '/search', icon: Compass },
    { label: 'My Path', to: '/my-path', icon: Route },
    { label: 'AI', to: '/ai-assistant', icon: Sparkles, isAi: true },
    { label: 'Profile', to: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-3 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.to ||
            (item.to === '/dashboard' && (location.pathname === '/' || location.pathname === '/home'));

          if (item.isAi && onOpenAssistant) {
            return (
              <button
                key={item.to}
                onClick={onOpenAssistant}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[11px] font-semibold transition-colors cursor-pointer ${
                  isActive ? 'text-[#4F46E5] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#4F46E5]' : 'text-[#64748B]'}`} />
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[11px] font-semibold transition-colors ${
                isActive ? 'text-[#4F46E5] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#4F46E5]' : 'text-[#64748B]'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
export default MobileNav;
