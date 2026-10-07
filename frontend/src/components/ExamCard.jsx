import React from 'react';
import { Link } from 'react-router-dom';
import { Building, ShieldCheck, ExternalLink, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { ExternalSearchButton } from './common/ExternalSearchButton.jsx';
import { OfficialSourceButton } from './common/OfficialSourceButton.jsx';

export const ExamCard = ({ exam }) => {
  if (!exam) return null;

  const id = exam.id || exam._id;
  const name = exam.name || exam.title;
  const organization = exam.organization || 'National Examination Authority';
  const category = exam.category || 'National Entrance';
  const description = exam.description || exam.overview || `Official examination authority.`;
  const qualification = exam.qualification || exam.eligibility?.qualification || 'Refer to official notification';
  const officialUrl = exam.notificationUrl || exam.officialUrl || exam.sources?.[0]?.url;

  return (
    <div className="card-clean p-5 sm:p-6 bg-white border border-slate-200 hover:border-indigo-300 transition-all rounded-2xl shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            {exam.type || 'EXAM'}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
            {category}
          </span>
        </div>

        {/* Title & Organization */}
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1">
            {name}
          </h3>
          <div className="text-xs font-semibold text-indigo-600 mt-0.5 flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-indigo-500" />
            <span>{organization}</span>
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Qualification Criteria Note */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-0.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Eligibility Qualification:
          </div>
          <p className="line-clamp-2 text-slate-800 font-medium">
            {qualification}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <ExternalSearchButton query={`${name} official notification syllabus eligibility`} label="Search Web" />

        <div className="flex items-center gap-1.5">
          {officialUrl && (
            <OfficialSourceButton url={officialUrl} label="Official Portal" />
          )}
          <Link
            to={`/job/${encodeURIComponent(id)}`}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
