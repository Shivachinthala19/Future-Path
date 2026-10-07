import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Clock, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { ExternalSearchButton } from './common/ExternalSearchButton.jsx';

export const StudyCard = ({ study }) => {
  const navigate = useNavigate();
  const { changeEducation } = useEducation();

  if (!study) return null;

  const id = study.id || study.slug || study._id;
  const name = study.name || study.title;
  const degreeLevel = study.degreeLevel || study.educationLevel || study.level || 'Degree';
  const duration = study.duration || '3-4 Years';
  const category = study.category || study.field || 'General';
  const description = study.description || study.overview || `Recognized academic program structured for foundational mastery and career pathways.`;
  const specializations = study.specializations || [];
  const careerOpportunities = study.careerOpportunities || study.careerFields || study.relatedJobs || [];

  const handleSetMyEducation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    changeEducation(name, 'completed');
    navigate('/dashboard');
  };

  return (
    <div className="card-clean p-5 sm:p-6 bg-white border border-slate-200 hover:border-indigo-300 transition-all rounded-2xl shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {degreeLevel}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
              {category}
            </span>
          </div>

          <span className="text-xs text-slate-500 font-semibold inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{duration}</span>
          </span>
        </div>

        {/* Title */}
        <div>
          <Link
            to={`/study/${encodeURIComponent(id)}`}
            className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1"
          >
            {name}
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Specialization tags */}
        {specializations.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Specializations:
            </div>
            <div className="flex flex-wrap gap-1">
              {specializations.slice(0, 3).map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-medium"
                >
                  {spec}
                </span>
              ))}
              {specializations.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-semibold">
                  +{specializations.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <ExternalSearchButton query={`${name} course eligibility admission syllabus`} label="Search Web" />

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleSetMyEducation}
            className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-xs font-bold transition-colors shadow-2xs"
            title="Set as my current active study"
          >
            Set as My Study
          </button>
          <Link
            to={`/study/${encodeURIComponent(id)}`}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
