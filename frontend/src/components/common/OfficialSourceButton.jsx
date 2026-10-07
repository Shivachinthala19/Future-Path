import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';

export const OfficialSourceButton = ({ url, label = 'Official Website', className = '' }) => {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 font-bold text-xs transition-all shadow-2xs ${className}`}
      title="Open official authoritative source in a new tab"
    >
      <Globe className="w-3.5 h-3.5 text-indigo-600" />
      <span>{label}</span>
      <ExternalLink className="w-3 h-3 text-indigo-400" />
    </a>
  );
};

export default OfficialSourceButton;
