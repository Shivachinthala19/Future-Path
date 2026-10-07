import React from 'react';
import { CheckCircle2, AlertCircle, Award, BookOpen, Clock, ShieldCheck, Zap } from 'lucide-react';

export const RelationshipBadge = ({ type, className = '' }) => {
  const configs = {
    DIRECT: {
      label: 'Direct Pathway',
      bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-400/40 dark:border-emerald-500/30',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
    },
    RELATED: {
      label: 'Related Field',
      bg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-400/40 dark:border-cyan-500/30',
      dot: 'bg-cyan-500',
      icon: BookOpen,
    },
    POSSIBLE_WITH_SKILLS: {
      label: 'Bridge With Skills',
      bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-400/40 dark:border-amber-500/30',
      dot: 'bg-amber-500',
      icon: Zap,
    },
    POSSIBLE_WITH_QUALIFICATION: {
      label: 'Requires Qualification',
      bg: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-400/40 dark:border-indigo-500/30',
      dot: 'bg-indigo-500',
      icon: Award,
    },
    LICENSE_REQUIRED: {
      label: 'Regulated / Bar License',
      bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-400/40 dark:border-rose-500/30',
      dot: 'bg-rose-500',
      icon: ShieldCheck,
    },
    EXPERIENCE_REQUIRED: {
      label: 'Experience Required',
      bg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-400/40 dark:border-purple-500/30',
      dot: 'bg-purple-500',
      icon: Clock,
    },
  };

  const config = configs[type] || configs.DIRECT;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border backdrop-blur-md transition-all shadow-2xs ${config.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};
