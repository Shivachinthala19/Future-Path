import React, { useState } from 'react';
import { Search, CheckCircle2, ArrowRight, RotateCw } from 'lucide-react';

export const EducationSelector = ({ initialValue = '', onConfirm }) => {
  const [selectedStudy, setSelectedStudy] = useState(initialValue);
  const [confirmed, setConfirmed] = useState(false);

  const sampleStudies = [
    '10th',
    '12th Science',
    '12th Commerce',
    'B.Com',
    'B.Tech Computer Science',
    'B.Sc',
    'MBA',
    'ITI Electrician',
    'Diploma Mechanical',
    'MCA',
    'MBBS',
    'Nursing',
    'Law (LLB)',
    'B.Pharm',
    'BA Psychology'
  ];

  const handleSelect = (study) => {
    setSelectedStudy(study);
    setConfirmed(true);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (selectedStudy.trim()) {
      setConfirmed(true);
    }
  };

  return (
    <div className="card-clean p-6 sm:p-8 bg-white border border-slate-200 space-y-6">
      {!confirmed ? (
        <div className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              What did you study?
            </h2>
            <p className="text-xs text-slate-500">
              Type any qualification, vocational trade, school, or degree:
            </p>
          </div>

          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={selectedStudy}
                onChange={(e) => setSelectedStudy(e.target.value)}
                placeholder="Search or enter your study (e.g. B.Com, ITI, B.Tech, 12th)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={!selectedStudy.trim()}
              className="btn-primary text-xs px-5 py-3 disabled:opacity-40"
            >
              Continue
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Or Choose From Common Studies:
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleStudies.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSelect(s)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Confirmation step (Section 3) */
        <div className="space-y-6 text-center py-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Your Education
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {selectedStudy}
            </div>
            <p className="text-xs text-slate-500">
              Is this correct?
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setConfirmed(false)}
              className="btn-secondary text-xs px-5 py-2.5"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => onConfirm && onConfirm(selectedStudy)}
              className="btn-primary text-xs px-6 py-2.5"
            >
              <span>Yes, Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
