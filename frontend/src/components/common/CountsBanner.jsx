import React from 'react';
import { GraduationCap, Briefcase, Monitor, Brain, Award, Activity } from 'lucide-react';

export const CountsBanner = ({ counts = {}, title = 'Verified Options Connected to Your Education' }) => {
  const items = [
    {
      label: 'Study Pathways',
      count: counts.studyPathways ?? 0,
      icon: GraduationCap,
      accent: 'from-indigo-500/20 to-brand-500/10 text-brand-600 dark:text-brand-300 border-indigo-200 dark:border-indigo-500/30',
      dotColor: 'bg-brand-500',
    },
    {
      label: 'Career Fields',
      count: counts.careerFields ?? 0,
      icon: Briefcase,
      accent: 'from-purple-500/20 to-ai-500/10 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-500/30',
      dotColor: 'bg-purple-500',
    },
    {
      label: 'Job Roles',
      count: counts.jobRoles ?? 0,
      icon: Monitor,
      accent: 'from-cyan-500/20 to-sky-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30',
      dotColor: 'bg-cyan-500',
    },
    {
      label: 'Relevant Skills',
      count: counts.skills ?? 0,
      icon: Brain,
      accent: 'from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
      dotColor: 'bg-emerald-500',
    },
    {
      label: 'Certifications',
      count: counts.certifications ?? 0,
      icon: Award,
      accent: 'from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-300 border-amber-200 dark:border-amber-500/30',
      dotColor: 'bg-amber-500',
    },
  ];

  return (
    <div className="relative w-full rounded-3xl p-6 hud-card overflow-hidden">
      {/* Background ambient flare */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500/10 dark:bg-ai-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {title}
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
          <Activity className="w-3.5 h-3.5 text-cyan-500" />
          <span>LIVE REGISTRY GRAPH</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`group relative p-4 rounded-2xl border bg-gradient-to-br ${item.accent} backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-slate-900/80 shadow-xs flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`w-2 h-2 rounded-full ${item.dotColor} opacity-75`} />
              </div>

              <div>
                <div className="text-3xl font-black tracking-tight font-display text-slate-900 dark:text-white">
                  {item.count}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-80 mt-0.5">
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
