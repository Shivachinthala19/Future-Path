import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, TrendingUp } from 'lucide-react';
import { ExternalSearchButton } from './common/ExternalSearchButton.jsx';

export const CareerCard = ({ career }) => {
  if (!career) return null;

  const name = career.name || career.title;
  const category = career.category || career.stream || 'Domain Track';
  const growth = career.growthOutlook || 'High Growth Demand';
  const salary = career.salaryRange?.formatted || 'Competitive';
  const description = career.description || career.overview || 'A major industry discipline.';
  const roles = career.relatedJobs || career.roles || [];

  return (
    <div className="card-clean p-5 sm:p-6 space-y-4 bg-white border border-slate-200 hover:border-indigo-300 transition-all rounded-2xl flex flex-col justify-between shadow-2xs hover:shadow-xs group">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-purple-700 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-[10px]">
            {category}
          </span>
          <span className="font-bold text-emerald-600 flex items-center gap-1 text-[11px]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{growth}</span>
          </span>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
            {name}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        {roles && roles.length > 0 && (
          <div className="pt-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Key Roles in Domain:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {roles.slice(0, 4).map((r, idx) => (
                <Link
                  key={idx}
                  to={`/job/${encodeURIComponent(r.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`}
                  className="px-2.5 py-0.5 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-colors shadow-2xs"
                >
                  💼 {r}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <ExternalSearchButton query={`${name} career scope salary roadmap`} label="Search Web" />

        <Link
          to={`/careers`}
          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1 transition-colors shadow-2xs"
        >
          <span>Explore Field</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default CareerCard;
