import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, DollarSign, Target, ArrowRight, Layers, Building, ShieldCheck } from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { ExternalSearchButton } from './common/ExternalSearchButton.jsx';

export const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { targetJob, changeTargetJob, setToastMessage } = useEducation();

  if (!job) return null;

  const id = job.id || job.slug || job._id;
  const title = job.name || job.title;
  const sector = job.category || job.sector || 'Industry';
  const isGovt = (job.type === 'GOVERNMENT_JOB' || job.jobType === 'Government' || job.isGovernment);
  const salary = job.salary || job.salaryRange?.formatted || (isGovt ? 'Official Pay Matrix' : '₹4.5 - ₹9.0 LPA');
  const description = job.description || job.overview || `Key professional role operating within ${sector}.`;
  const skills = job.requiredSkills || job.skills || [];
  const educationRoutes = job.educationRoutes || [];
  const isCurrentTarget = targetJob?.targetJobName?.toLowerCase() === title.toLowerCase();

  const handleSetTarget = (e) => {
    e.preventDefault();
    e.stopPropagation();
    changeTargetJob(title);
    if (setToastMessage) {
      setToastMessage(`🎯 Set "${title}" as your active target job.`);
    }
    navigate(`/job/${encodeURIComponent(id)}`);
  };

  return (
    <div className="card-clean p-5 sm:p-6 bg-white border border-slate-200 hover:border-indigo-300 transition-all rounded-2xl shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
              isGovt
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {isGovt ? 'Government Sector' : 'Private Sector'}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
              {sector}
            </span>
          </div>

          {isCurrentTarget && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
              🎯 Active Target
            </span>
          )}
        </div>

        {/* Title & Salary */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              to={`/job/${encodeURIComponent(id)}`}
              className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1"
            >
              {title}
            </Link>
          </div>
          <div className="text-xs font-bold text-emerald-600 mt-0.5">
            {salary}
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Required Skills preview */}
        {skills.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Core Skills:
            </div>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((sk, sIdx) => {
                const skillName = typeof sk === 'string' ? sk : sk.name;
                return (
                  <span
                    key={sIdx}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200 font-medium"
                  >
                    {skillName}
                  </span>
                );
              })}
              {skills.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-semibold">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <ExternalSearchButton
          query={isGovt ? `${title} official notification recruitment` : `${title} eligibility skills career`}
          label="Search Web"
        />

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleSetTarget}
            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-colors shadow-2xs"
            title="Set as active target job"
          >
            Set as Target
          </button>
          <Link
            to={`/job/${encodeURIComponent(id)}`}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs transition-colors"
          >
            <span>Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
