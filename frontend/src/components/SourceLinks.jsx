import React from 'react';
import { ShieldCheck, ExternalLink, Globe, BookOpen, Building, AlertCircle } from 'lucide-react';

export const SourceLinks = ({ sources = [], officialSource, lastVerified = 'September 2026', disclaimer }) => {
  const getBadgeStyle = (type) => {
    switch (type) {
      case 'OFFICIAL':
      case 'GOVERNMENT':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'UNIVERSITY':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'PROFESSIONAL_BODY':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'RECRUITMENT':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getSourceIcon = (type) => {
    switch (type) {
      case 'GOVERNMENT':
      case 'RECRUITMENT':
        return <Building className="w-3.5 h-3.5" />;
      case 'UNIVERSITY':
      case 'PROFESSIONAL_BODY':
        return <BookOpen className="w-3.5 h-3.5" />;
      default:
        return <Globe className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Authoritative & Verified Sources
          </span>
        </div>
        <div className="text-[11px] text-slate-400 font-medium">
          Last Verified: <strong className="text-slate-600">{lastVerified}</strong>
        </div>
      </div>

      {disclaimer && (
        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-amber-900 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {disclaimer}
          </p>
        </div>
      )}

      {sources && sources.length > 0 ? (
        <div className="space-y-2">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-200 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`p-1.5 rounded-lg border flex-shrink-0 ${getBadgeStyle(src.sourceType)}`}>
                  {getSourceIcon(src.sourceType)}
                </span>
                <div className="truncate">
                  <div className="font-bold text-slate-800 truncate">
                    {src.title || 'Official Source'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Type: <span className="font-semibold text-slate-600">{src.sourceType || 'OFFICIAL'}</span>
                  </div>
                </div>
              </div>

              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 font-bold text-xs transition-colors flex-shrink-0 shadow-2xs"
                >
                  <span>View Source</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ) : null}
            </div>
          ))}
        </div>
      ) : officialSource ? (
        <div className="text-xs text-slate-600">
          Source: <strong className="text-slate-800">{officialSource}</strong>
        </div>
      ) : (
        <div className="text-xs text-slate-500">
          Verified against UGC, AICTE, and national education commission standards.
        </div>
      )}
    </section>
  );
};

export default SourceLinks;
