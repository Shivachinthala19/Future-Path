import React from 'react';
import {
  ExternalLink,
  Briefcase,
  Building,
  Globe,
  CheckCircle2,
  Send,
  ShieldCheck,
  Search
} from 'lucide-react';
import { getApplicationLinksForJob } from '../utils/jobApplicationUrls.js';

export const ApplicationLinksSection = ({ jobTitle = '', category = '', jobType = '' }) => {
  if (!jobTitle) return null;

  const appData = getApplicationLinksForJob(jobTitle, category, jobType);

  const getBadgeColor = (type = '') => {
    switch (type) {
      case 'OFFICIAL_PORTAL':
      case 'DEFENCE_PORTAL':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'STATE_PORTAL':
      case 'GOVERNMENT_EXCHANGE':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'JOB_BOARD':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300';
      case 'TECH_PLATFORM':
      case 'STARTUP_PLATFORM':
        return 'bg-purple-50 text-purple-800 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getPlatformIcon = (type = '') => {
    if (type.includes('PORTAL') || type.includes('DEFENCE') || type.includes('STATE')) {
      return <Building className="w-4 h-4 text-emerald-600" />;
    }
    if (type.includes('TECH') || type.includes('STARTUP')) {
      return <Globe className="w-4 h-4 text-purple-600" />;
    }
    return <Briefcase className="w-4 h-4 text-indigo-600" />;
  };

  return (
    <section className="card-clean p-6 sm:p-8 bg-white border-2 border-indigo-200/80 rounded-3xl shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-extrabold border border-indigo-200">
            <Send className="w-3 h-3 text-indigo-600" />
            <span>Targeted Application Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Where & How to Apply for {jobTitle}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
            {appData.description}
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-auto">
          {appData.badge}
        </span>
      </div>

      {/* Grid of Targeted Job Application Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {appData.links.map((link, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-indigo-400 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getBadgeColor(link.type)}`}>
                  {link.badge}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  {getPlatformIcon(link.type)}
                  <span>Direct Application</span>
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {link.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {link.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                Opens official application in new tab
              </span>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer group-hover:scale-[1.02]"
                title={`Open application page for ${link.name}`}
              >
                <span>Apply / View Jobs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pro-Tips for Cracking this Application */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 border border-indigo-100 text-xs text-slate-700 space-y-2">
        <div className="flex items-center gap-1.5 font-extrabold text-indigo-950">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Application Strategy Checklist for {jobTitle}:</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 pt-1">
          <li className="flex items-start gap-1.5 bg-white p-2.5 rounded-xl border border-slate-200">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Tailor your resume keywords to match the exact requirements above.</span>
          </li>
          <li className="flex items-start gap-1.5 bg-white p-2.5 rounded-xl border border-slate-200">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Include live portfolio / GitHub / verified credentials in top header.</span>
          </li>
          <li className="flex items-start gap-1.5 bg-white p-2.5 rounded-xl border border-slate-200">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Apply within 48 hours of posting for maximum recruiter callback rate.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ApplicationLinksSection;
