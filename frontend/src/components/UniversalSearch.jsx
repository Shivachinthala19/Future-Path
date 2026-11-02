import React, { useState, useRef, useEffect } from 'react';
import {
  Search as SearchIcon,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Layers,
  Building,
  Award,
  X,
  RotateCw,
  HelpCircle,
  Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';

export const UniversalSearch = ({
  placeholder = 'Search any study, course, job, career, exam, certification or skill...',
  className = '',
  autoFocus = false,
  onPerformSearch
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [directCard, setDirectCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const { changeEducation, changeTargetJob } = useEducation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Natural query suggestions as requested in Section 1 & 13
  const exampleQueries = [
    'B.Com',
    'B.Tech CSE',
    'MBA',
    'MBBS',
    'ITI Electrician',
    'Diploma Mechanical',
    'Data Analyst',
    'Software Developer',
    'Bank Clerk',
    'SSC CHSL',
    'RRB NTPC',
    'Government jobs after 12th',
    'Courses after B.Com',
    'Jobs after B.Tech',
    'How to become a Data Analyst'
  ];

  useEffect(() => {
    if (!query || !query.trim()) {
      setResults([]);
      setDirectCard(null);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query.trim())}`);
        if (res.success || res.data) {
          const resData = res.data || res;
          setResults(resData.results || []);
          setDirectCard(resData.directCard || null);
        }
      } catch (err) {
        console.warn('[UniversalSearch] Search error:', err.message);
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = async (item) => {
    setIsOpen(false);
    setQuery('');

    if (item.action === 'set_education' && item.payload?.educationName) {
      await changeEducation(item.payload.educationName);
      navigate(item.targetUrl || '/dashboard');
    } else if (item.action === 'set_target_job' && item.payload?.targetJobName) {
      await changeTargetJob(item.payload.targetJobName);
      navigate(item.targetUrl || `/job/${encodeURIComponent(item.id)}`);
    } else if (item.targetUrl) {
      navigate(item.targetUrl);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    if (onPerformSearch) {
      onPerformSearch(query.trim());
    } else {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handlePillClick = (example) => {
    setQuery(example);
    setIsOpen(false);
    if (onPerformSearch) {
      onPerformSearch(example);
    } else {
      navigate(`/search?q=${encodeURIComponent(example)}`);
    }
  };

  const getTypeIcon = (type = '') => {
    const upper = type.toUpperCase();
    if (upper.includes('STUDY') || upper === 'EDUCATION') {
      return <GraduationCap className="w-4 h-4 text-indigo-600" />;
    }
    if (upper.includes('GOVERNMENT')) {
      return <Building className="w-4 h-4 text-amber-600" />;
    }
    if (upper.includes('JOB')) {
      return <Briefcase className="w-4 h-4 text-emerald-600" />;
    }
    if (upper.includes('CAREER')) {
      return <Layers className="w-4 h-4 text-purple-600" />;
    }
    if (upper.includes('EXAM')) {
      return <Compass className="w-4 h-4 text-blue-600" />;
    }
    return <Award className="w-4 h-4 text-cyan-600" />;
  };

  const getTypeBadgeClass = (type = '') => {
    const upper = type.toUpperCase();
    if (upper.includes('STUDY') || upper === 'EDUCATION') {
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
    if (upper.includes('GOVERNMENT')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    if (upper.includes('JOB')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (upper.includes('CAREER')) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    }
    if (upper.includes('EXAM')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    return 'bg-cyan-50 text-cyan-700 border-cyan-200';
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <form onSubmit={handleFormSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-4 sm:h-5 w-4 sm:w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 sm:pl-12 pr-24 py-3 sm:py-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs transition-all"
        />

        <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* Instant Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden max-h-[75vh] sm:max-h-[500px] overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
          {/* Active Direct Knowledge Card preview if matched */}
          {directCard && (
            <div
              onClick={() => {
                setIsOpen(false);
                navigate(`/search?q=${encodeURIComponent(query)}`);
              }}
              className="p-4 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white hover:bg-indigo-50 cursor-pointer border-b border-indigo-100 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700">
                  <Compass className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Future Path Instant Knowledge</span>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getTypeBadgeClass(directCard.type)}`}>
                  {directCard.type?.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                {directCard.title}
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                {directCard.overview || directCard.subtitle || 'Click to view complete qualification pathways, requirements, and roadmaps.'}
              </p>
            </div>
          )}

          {/* Categorized Search Results */}
          {results.length > 0 && (
            <div className="p-2 space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Matching Database Entities
              </div>
              {results.slice(0, 7).map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => handleSelect(item)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {item.name || item.title}
                        </span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border ${getTypeBadgeClass(item.type)}`}>
                          {item.type?.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {item.hierarchy || item.category || item.description}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="p-4 text-center text-xs text-slate-500 font-semibold flex items-center justify-center gap-2">
              <RotateCw className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>Searching accredited education & career registry...</span>
            </div>
          )}

          {/* Popular / Recommended Query Suggestions */}
          {!query && (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Try Natural Searches</span>
                <span className="text-[10px] text-slate-400 font-normal">Click to search</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {exampleQueries.map((example, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePillClick(example)}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* View all results button */}
          {query.trim().length > 0 && (
            <div className="p-2.5 bg-slate-50 text-center">
              <button
                type="button"
                onClick={handleFormSubmit}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View all search results for "{query}"</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversalSearch;
