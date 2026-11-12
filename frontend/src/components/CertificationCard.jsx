import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Building, ExternalLink, ArrowRight, Clock } from 'lucide-react';
import { ExternalSearchButton } from './common/ExternalSearchButton.jsx';
import { OfficialSourceButton } from './common/OfficialSourceButton.jsx';

export const CertificationCard = ({ cert }) => {
  if (!cert) return null;

  const name = cert.name || cert.title;
  const organization = cert.organization || cert.issuingBody || 'Accredited Board';
  const category = cert.category || 'Professional Credential';
  const description = cert.description || cert.overview || 'Industry recognized credential validating core competencies.';
  const duration = cert.duration || 'Self-Paced / 3-6 Months';
  const officialUrl = cert.notificationUrl || cert.url || cert.sources?.[0]?.url;

  return (
    <div className="p-5 sm:p-6 bg-white border border-slate-200/90 hover:border-sky-300 transition-all rounded-2xl flex flex-col justify-between shadow-2xs hover:shadow-xs group space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-sky-700 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-[10px]">
            {category}
          </span>
          <span className="font-semibold text-slate-500 text-[11px] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{duration}</span>
          </span>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1">
            {name}
          </h3>
          <div className="text-xs font-semibold text-slate-600 mt-1 flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>{organization}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <ExternalSearchButton query={`${name} ${organization} certification syllabus exam`} label="Search Web" />

        {officialUrl ? (
          <OfficialSourceButton url={officialUrl} label="Official Portal" />
        ) : (
          <Link
            to="/careers"
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1 transition-colors shadow-2xs"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;
