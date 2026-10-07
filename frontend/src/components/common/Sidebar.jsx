import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  GraduationCap,
  Compass,
  Briefcase,
  Monitor,
  Brain,
  Target,
  MapPin,
  CheckSquare,
  FileText,
  Mic,
  Radar,
  Sparkles,
  User,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export const Sidebar = ({ onOpenAssistant }) => {
  const { isAdmin } = useAuth();

  const links = [
    { label: 'Future Path (AI)', to: '/education/analyze', icon: Compass, badge: 'Core' },
    { label: 'Education Directory', to: '/education', icon: GraduationCap },
    { label: 'Career Fields', to: '/careers', icon: Briefcase },
    { label: 'Job Roles', to: '/jobs', icon: Monitor },
    { label: 'Skill Gap', to: '/skill-gap', icon: Brain },
    { label: 'Career GPS', to: '/career-gps', icon: Target },
    { label: 'Action Roadmap', to: '/roadmap', icon: MapPin },
    { label: 'Daily Mission', to: '/daily-mission', icon: CheckSquare },
    { label: 'Resume Scanner', to: '/resume', icon: FileText },
    { label: 'AI Interview Coach', to: '/interview', icon: Mic },
    { label: 'Opportunity Radar', to: '/opportunity-radar', icon: Radar },
    { label: 'Career Twin', to: '/career-twin', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-4 space-y-6 flex-shrink-0">
      {/* AI Assistant Quick Trigger Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-600 via-ai-600 to-ai-700 text-white shadow-md shadow-brand-500/20">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-200">AI Navigator</span>
        </div>
        <p className="text-xs text-brand-100 mb-3 leading-relaxed">
          Ask questions about your study, career switches, and skill roadmaps.
        </p>
        <button
          onClick={onOpenAssistant}
          className="w-full py-1.5 px-3 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs"
        >
          ✨ Ask Future Path
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Navigation
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        {isAdmin && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Administration
            </div>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Admin Console</span>
            </NavLink>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-[11px] text-slate-400 dark:text-slate-500 px-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div>Universal Knowledge Graph</div>
        <div className="font-semibold text-slate-600 dark:text-slate-400">Future Path v1.0</div>
      </div>
    </aside>
  );
};
