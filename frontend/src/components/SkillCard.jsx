import React from 'react';
import { Brain, CheckCircle2 } from 'lucide-react';

export const SkillCard = ({ skill, index }) => {
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors flex items-start justify-between gap-3 text-xs">
      <div className="flex items-start gap-3">
        {index !== undefined && (
          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
            {index + 1}
          </span>
        )}
        <div className="space-y-0.5">
          <div className="font-bold text-sm text-slate-900">
            {skill.name}
          </div>
          <div className="text-[11px] text-slate-500">
            {skill.category || skill.type || 'Core Competency'}
          </div>
          {skill.description && (
            <p className="text-slate-600 pt-1 leading-relaxed">
              {skill.description}
            </p>
          )}
        </div>
      </div>

      <span
        className={`px-2 py-0.5 rounded-md font-semibold text-[10px] whitespace-nowrap ${
          skill.alreadyCoveredInEducation
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : skill.level === 'Intermediate'
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}
      >
        {skill.alreadyCoveredInEducation ? 'In Degree' : (skill.level || 'High Priority')}
      </span>
    </div>
  );
};
