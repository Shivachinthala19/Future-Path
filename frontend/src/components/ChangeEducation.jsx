import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Check, ArrowRight, RotateCw, AlertTriangle, Briefcase, GraduationCap } from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';

/**
 * Section 2, 10 & 18: Searchable Education Modal with Status Selector and Hierarchical Data
 */
export const ChangeEducationModal = () => {
  const {
    currentEducation,
    changeEducation,
    isChangeEducationModalOpen,
    closeChangeModal
  } = useEducation();

  const [searchInput, setSearchInput] = useState('');
  const [status, setStatus] = useState(currentEducation.status || 'completed');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced real-time search from Section 10 & 12
  React.useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        const res = await api.get(`/education/search?q=${encodeURIComponent(searchInput.trim())}`);
        if (res.success && res.data) {
          setSearchResults(res.data);
        }
      } catch (err) {
        console.warn('Education search error:', err.message);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchInput]);

  if (!isChangeEducationModalOpen) return null;

  // Comprehensive example studies from Section 1 & Section 10
  const popularGroups = [
    {
      group: 'Secondary & High School',
      items: ['10th / SSC', '12th Science', '12th Commerce', '12th Arts']
    },
    {
      group: 'Diploma & Vocational',
      items: ['Diploma Mechanical', 'Diploma Electrical', 'ITI Electrician', 'ITI Fitter', 'Vocational Training']
    },
    {
      group: 'Undergraduate Degrees',
      items: ['B.Com', 'B.Tech Computer Science', 'B.Tech Mechanical', 'B.E.', 'BCA', 'B.Sc', 'BA', 'BBA', 'MBBS', 'B.Pharm', 'LLB']
    },
    {
      group: 'Professional & Postgraduate',
      items: ['CA', 'CMA', 'MBA', 'M.Tech', 'MCA', 'M.Sc', 'PhD']
    }
  ];

  const handleSelect = async (studyName, itemMeta = null) => {
    const target = studyName || searchInput;
    if (!target.trim()) return;

    setLoading(true);
    await changeEducation(target.trim(), {
      status,
      qualificationLevel: itemMeta?.level,
      specialization: itemMeta?.specialization || itemMeta?.branch,
      educationId: itemMeta?.id
    });
    setLoading(false);
    setSearchInput('');
    setSearchResults([]);
    closeChangeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
          <div>
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>What did you study?</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Current: <span className="font-bold text-indigo-600">{currentEducation.educationName}</span> ({currentEducation.status === 'currently_studying' ? 'Currently Studying' : 'Completed'})
            </p>
          </div>
          <button
            onClick={closeChangeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Education Status Radio (Section 1) */}
        <div className="space-y-1 flex-shrink-0">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Status (Mandatory)
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setStatus('currently_studying')}
              className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                status === 'currently_studying'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-2xs'
                  : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${status === 'currently_studying' ? 'border-indigo-600' : 'border-slate-400'}`}>
                {status === 'currently_studying' && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
              </span>
              <span>Currently Studying</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus('completed')}
              className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                status === 'completed'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-2xs'
                  : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${status === 'completed' ? 'border-indigo-600' : 'border-slate-400'}`}>
                {status === 'completed' && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
              </span>
              <span>Completed</span>
            </button>
          </div>
        </div>

        {/* Search input with Section 10 Hierarchical support */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSelect();
          }}
          className="space-y-1 flex-shrink-0"
        >
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Search Education or Type Any Study
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. B.Com, ITI Electrician, B.Tech Mech, CA, 12th Arts..."
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            {isSearching && (
              <RotateCw className="w-4 h-4 text-indigo-500 absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin" />
            )}
          </div>
        </form>

        {/* Scrollable Results / Suggestions */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-3 min-h-[140px]">
          {/* Section 10 Hierarchical search results if searching */}
          {searchResults.length > 0 ? (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Matching Recognized Programs ({searchResults.length}):
              </div>
              <div className="space-y-1.5">
                {searchResults.map((item) => (
                  <button
                    key={item.id || item.slug || item.name}
                    type="button"
                    onClick={() => handleSelect(item.name, item)}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all flex flex-col gap-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-indigo-700">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {item.level || 'Degree'}
                      </span>
                    </div>
                    {item.hierarchy && (
                      <div className="text-[10px] text-slate-400 leading-tight">
                        {item.hierarchy}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : searchInput.trim() ? (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">
                Custom qualification: &quot;{searchInput.trim()}&quot;
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Future Path AI will dynamically synthesize study pathways, careers, and jobs for this study program.
              </p>
            </div>
          ) : (
            /* Categorized Education Quick Select from Section 1 & 10 */
            <div className="space-y-3">
              {popularGroups.map((grp) => (
                <div key={grp.group} className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {grp.group}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.items.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSelect(s)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          currentEducation.educationName.toLowerCase() === s.toLowerCase()
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
                            : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          <button
            type="button"
            onClick={closeChangeModal}
            className="text-xs text-slate-500 hover:text-slate-700 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSelect()}
            disabled={loading || !searchInput.trim()}
            className="btn-primary text-xs px-5 py-2 disabled:opacity-40"
          >
            {loading ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Updating Pathways...</span>
              </>
            ) : (
              <>
                <span>Save Education</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Section 7 & 19: Searchable Target Job Modal
 */
export const ChangeTargetJobModal = () => {
  const navigate = useNavigate();
  const {
    targetJob,
    changeTargetJob,
    isChangeTargetJobModalOpen,
    closeTargetJobModal,
    removeTargetJob,
    currentEducation
  } = useEducation();

  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isChangeTargetJobModalOpen) return null;

  // Diverse catalog of jobs across Sectors (Section 19 & 20)
  const popularJobs = [
    { title: 'Data Analyst', type: 'Private', sector: 'Technology & Analytics' },
    { title: 'Software Developer', type: 'Private', sector: 'Software Engineering' },
    { title: 'Accountant', type: 'Private', sector: 'Accounting & Finance' },
    { title: 'Financial Analyst', type: 'Private', sector: 'Corporate Finance' },
    { title: 'Staff Selection Commission (SSC CGL) Auditor / Inspector', type: 'Government', sector: 'Central Ministries' },
    { title: 'Probationary Officer (IBPS / SBI PO)', type: 'Public Sector', sector: 'Banking' },
    { title: 'State Police Sub-Inspector / Constable', type: 'Government', sector: 'Police & Law Enforcement' },
    { title: 'Electrician', type: 'Skilled Trades', sector: 'Electrical Infrastructure' },
    { title: 'Mechanical Engineer', type: 'Private', sector: 'Manufacturing' },
    { title: 'Railway Assistant Loco Pilot & Technician (RRB)', type: 'Government', sector: 'Indian Railways' },
    { title: 'State Electricity Board / DISCOM Junior Lineman', type: 'Government', sector: 'Power Distribution' },
    { title: 'Civil Engineer', type: 'Private', sector: 'Construction' },
    { title: 'School Teacher / Subject Educator', type: 'Government / Private', sector: 'Education' },
    { title: 'Registered Nurse', type: 'Healthcare', sector: 'Clinical Care' },
    { title: 'Resident Medical Officer (MBBS)', type: 'Healthcare', sector: 'Clinical Medicine' },
    { title: 'Marketing Executive', type: 'Private', sector: 'Commercial Business' }
  ];

  const filteredJobs = searchInput.trim()
    ? popularJobs.filter(j => j.title.toLowerCase().includes(searchInput.toLowerCase()) || j.sector.toLowerCase().includes(searchInput.toLowerCase()))
    : popularJobs;

  const handleSelect = async (jobTitle, category = 'Private') => {
    const target = jobTitle || searchInput;
    if (!target.trim()) return;

    setLoading(true);
    await changeTargetJob(target.trim(), { category });
    setLoading(false);
    setSearchInput('');
    closeTargetJobModal();
    navigate(`/job-roadmap?job=${encodeURIComponent(target.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <span>What job do you want?</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalizing steps for: <span className="font-bold text-indigo-600">{currentEducation.educationName}</span>
            </p>
          </div>
          <button
            onClick={closeTargetJobModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSelect();
          }}
          className="space-y-1.5"
        >
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Search or Type Target Job
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="[ 🔍 Search your target job... ] e.g. Data Analyst, Accountant, Electrician..."
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </form>

        {/* Catalog of jobs */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Popular Job Objectives:</span>
            {targetJob && (
              <button
                type="button"
                onClick={() => {
                  removeTargetJob();
                  closeTargetJobModal();
                }}
                className="text-red-500 hover:underline font-bold text-[10px]"
              >
                Clear Target (Browse All)
              </button>
            )}
          </div>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {filteredJobs.map((j) => {
              const isSelected = targetJob?.targetJobName?.toLowerCase() === j.title.toLowerCase();
              return (
                <div
                  key={j.title}
                  onClick={() => handleSelect(j.title, j.type)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900">{j.title}</div>
                    <div className="text-[10px] text-slate-400">{j.sector}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                    j.type === 'Government' || j.type === 'Public Sector'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {j.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={closeTargetJobModal}
            className="text-xs text-slate-500 hover:text-slate-700 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSelect()}
            disabled={loading || !searchInput.trim()}
            className="btn-primary text-xs px-5 py-2 disabled:opacity-40"
          >
            {loading ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Personalizing...</span>
              </>
            ) : (
              <>
                <span>Set Target Job</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Section 18: Target Job Mismatch Warning Modal
 * When education changes, prompts user: [ Keep Target ] vs [ Choose New Target ]
 */
export const TargetMismatchModal = () => {
  const { targetMismatchModal, dismissMismatchModal, openTargetJobModal } = useEducation();

  if (!targetMismatchModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-amber-200 p-6 space-y-4">
        <div className="flex items-center gap-3 text-amber-600">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Target Job Compatibility Notice
            </h3>
            <p className="text-xs text-slate-500">
              Education changed to: <span className="font-bold text-slate-800">{targetMismatchModal.newEducation}</span>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
          Your active target job is <strong className="text-slate-900">{targetMismatchModal.targetJobName}</strong>. {targetMismatchModal.reason || 'It may require additional qualifications or licensing under your new educational background.'}
        </p>

        <p className="text-xs text-slate-500 font-semibold">
          Would you like to keep this target or select a new role?
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={dismissMismatchModal}
            className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all text-center"
          >
            Keep Target
          </button>
          <button
            onClick={() => {
              dismissMismatchModal();
              openTargetJobModal();
            }}
            className="btn-primary py-2.5 px-4 text-xs font-bold text-center"
          >
            Choose New Target
          </button>
        </div>
      </div>
    </div>
  );
};

export const ChangeEducationButton = ({ className = '', label = 'Change Education' }) => {
  const { openChangeModal } = useEducation();
  return (
    <button
      onClick={openChangeModal}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 transition-colors shadow-2xs ${className}`}
    >
      <span>{label}</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  );
};

export const ChangeTargetJobButton = ({ className = '', label = 'Change Target Job' }) => {
  const { openTargetJobModal } = useEducation();
  return (
    <button
      onClick={openTargetJobModal}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-purple-700 transition-colors shadow-2xs ${className}`}
    >
      <span>{label}</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  );
};
