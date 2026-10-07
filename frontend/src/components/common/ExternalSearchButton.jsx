import React from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { googleSearchUrl } from '../../utils/searchHelpers.js';

export const ExternalSearchButton = ({ query, label = 'Search Web', className = '' }) => {
  const url = googleSearchUrl(query);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-300 font-semibold text-xs transition-all shadow-2xs ${className}`}
      title={`Search "${query}" on Google`}
    >
      <Search className="w-3.5 h-3.5 text-indigo-500" />
      <span>{label}</span>
      <ExternalLink className="w-3 h-3 text-slate-400" />
    </a>
  );
};

export default ExternalSearchButton;
