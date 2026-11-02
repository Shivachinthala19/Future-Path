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
    <div className="card-clean p-6 bg-white border border-[#E2E8F0] hover:border-[#C7D2FE] flex flex-col justify-between space-y-4 group transition-all">
      <div className="space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
            {name}
          </h3>
          <div className="text-xs font-semibold text-[#64748B] mt-0.5">
            {degreeLevel} · {field}
          </div>
        </div>

        {/* Duration */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-slate-700">
          <Clock className="w-3.5 h-3.5 text-[#64748B]" />
          <span>{duration}</span>
        </div>

        {/* Eligibility Line */}
        <div className="text-xs text-slate-600 font-medium pt-1">
          {eligibility}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-[#E2E8F0]">
        <Link
          to={`/study/${encodeURIComponent(id)}`}
          className="w-full btn-primary !text-xs !py-2 !px-4 !rounded-xl justify-between flex items-center"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default StudyCard;
