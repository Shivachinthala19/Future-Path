import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Clock, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

export const StudyCard = ({ study, currentEducation }) => {
  if (!study) return null;

  const id = study.slug || study.id || study._id;
  const name = study.name || study.title;
  const degreeLevel = study.degreeLevel || study.level || study.educationLevel || 'Undergraduate';
  const field = study.field || study.category || 'General Studies';
  const duration = study.duration || '3–4 Years';
  const eligibility = study.eligibility || `Eligible after ${currentEducation || '12th / Graduation'}`;

  return (
    <div className="p-5 sm:p-6 bg-white border border-slate-200/90 hover:border-indigo-300 transition-all rounded-2xl flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-xs group">
      <div className="space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            {degreeLevel}
          </span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1">
            {name}
          </h3>
          <div className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>{field}</span>
          </div>
        </div>

        {/* Eligibility Line */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
            Eligibility:
          </div>
          <p className="line-clamp-2 text-slate-800 font-medium">
            {eligibility}
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-slate-100">
        <Link
          to={`/study/${encodeURIComponent(id)}`}
          className="w-full px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center justify-between shadow-2xs transition-colors"
        >
          <span>View Study Pathways</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default StudyCard;
