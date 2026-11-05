import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  RotateCw,
  Search,
  Filter,
  BookOpen,
  Clock,
  ShieldCheck,
  Compass,
  Sparkles,
  X,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { StudyCard } from '../components/StudyCard.jsx';
import api from '../services/api.js';

export const StudyNextPage = () => {
  const { currentEducation } = useEducation();
  const studyName = currentEducation?.educationName || 'B.Com';

  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters: Education Level & Field of Study
  const [levelFilter, setLevelFilter] = useState('All');
  const [fieldFilter, setFieldFilter] = useState('All');

  const levelOptions = [
    { label: 'All', value: 'All' },
    { label: 'Postgraduate', value: 'Postgraduate' },
    { label: 'Undergraduate', value: 'Undergraduate' },
    { label: 'Diploma', value: 'Diploma' },
    { label: 'Certification', value: 'Certification' },
    { label: 'Doctorate', value: 'Doctorate' }
  ];

  const fieldOptions = [
    { label: 'All', value: 'All' },
    { label: 'Management & Business', value: 'Management & Business' },
    { label: 'Technology & CS', value: 'Technology & CS' },
    { label: 'Commerce & Finance', value: 'Commerce & Finance' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Arts & Humanities', value: 'Arts & Humanities' },
    { label: 'Sciences', value: 'Sciences' }
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchStudies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/studies`);
        if (isMounted) {
          const data = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
          setStudies(data);
        }
      } catch (err) {
        console.error('[StudyNextPage] Failed to fetch studies:', err);
        if (isMounted) setError('Unable to load study programs.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStudies();
    return () => {
      isMounted = false;
    };
  }, [studyName]);

  const filteredStudies = studies.filter((study) => {
    const name = (study.name || study.title || study.shortName || '').toLowerCase();
    const field = (study.field || study.category || '').toLowerCase();
    const level = (study.level || study.degreeLevel || study.educationLevel || '').toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      name.includes(searchQuery.toLowerCase().trim()) ||
      field.includes(searchQuery.toLowerCase().trim());

    const matchesLevel = (() => {
      if (levelFilter === 'All') return true;
      const l = level.toLowerCase();
      const n = name.toLowerCase();
      if (levelFilter === 'Postgraduate') {
        return l.includes('postgraduate') || l.includes('master') || n.startsWith('m.') || n.startsWith('mba') || n.startsWith('mca') || n.startsWith('msc') || n.startsWith('mtech') || n.includes('master');
      }
      if (levelFilter === 'Undergraduate') {
        return l.includes('undergraduate') || l.includes('bachelor') || n.startsWith('b.') || n.startsWith('bba') || n.startsWith('bca') || n.startsWith('bsc') || n.startsWith('btech') || n.includes('bachelor');
      }
      if (levelFilter === 'Diploma') {
        return l.includes('diploma') || n.includes('diploma') || n.includes('pgdm');
      }
      if (levelFilter === 'Certification') {
        return l.includes('certificat') || n.includes('certificat');
      }
      if (levelFilter === 'Doctorate') {
        return l.includes('doctor') || l.includes('phd') || n.includes('ph.d') || n.includes('phd') || n.includes('doctor');
      }
      return l.includes(levelFilter.toLowerCase());
    })();

    const matchesField = (() => {
      if (fieldFilter === 'All') return true;
      const f = field.toLowerCase();
      const n = name.toLowerCase();
      if (fieldFilter === 'Management & Business') {
        return f.includes('management') || f.includes('business') || n.includes('mba') || n.includes('bba') || n.includes('management') || n.includes('business') || n.includes('pgdm');
      }
      if (fieldFilter === 'Technology & CS') {
        return f.includes('tech') || f.includes('computer') || f.includes('it') || f.includes('software') || f.includes('data') || n.includes('mca') || n.includes('bca') || n.includes('computer') || n.includes('data');
      }
      if (fieldFilter === 'Commerce & Finance') {
        return f.includes('commerce') || f.includes('finance') || f.includes('account') || f.includes('bank') || n.includes('commerce') || n.includes('b.com') || n.includes('m.com') || n.includes('finance') || n.includes('accounting');
      }
      if (fieldFilter === 'Engineering') {
        return f.includes('engineer') || n.includes('b.tech') || n.includes('m.tech') || n.includes('engineering');
      }
      if (fieldFilter === 'Arts & Humanities') {
        return f.includes('art') || f.includes('humanities') || f.includes('design') || f.includes('social') || f.includes('law') || n.includes('b.a') || n.includes('m.a');
      }
      if (fieldFilter === 'Sciences') {
        return f.includes('science') || f.includes('medical') || f.includes('pharm') || f.includes('biology') || f.includes('math') || n.includes('b.sc') || n.includes('m.sc');
      }
      return f.includes(fieldFilter.toLowerCase());
    })();

    return matchesSearch && matchesLevel && matchesField;
  });

  const hasActiveFilters = levelFilter !== 'All' || fieldFilter !== 'All' || searchQuery.trim() !== '';

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2 sm:py-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ACCREDITED HIGHER EDUCATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Study Pathways & Degrees
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-2xl leading-relaxed">
          Explore accredited master's degrees, specialized diplomas, and professional certifications eligible after <strong className="text-[#4F46E5] font-semibold">{studyName}</strong>.
        </p>
      </div>

      {/* Main Filter & Search Control Panel */}
      <div className="card-clean p-4 sm:p-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs space-y-3.5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs, degrees, or fields..."
            className="w-full pl-9 pr-9 py-2 rounded-xl border border-[#E2E8F0] text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1.5 focus:ring-[#4F46E5] focus:border-transparent transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 1. Education Level Section */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Level</span>
            {levelFilter !== 'All' && (
              <button
                onClick={() => setLevelFilter('All')}
                className="text-[10px] font-semibold text-[#4F46E5] hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {levelOptions.map((lvl) => {
              const isSelected = levelFilter === lvl.value;
              return (
                <button
                  key={lvl.value}
                  onClick={() => setLevelFilter(lvl.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#4F46E5] text-white font-semibold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200/70 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Field of Study & Discipline Section */}
        <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Field</span>
            {fieldFilter !== 'All' && (
              <button
                onClick={() => setFieldFilter('All')}
                className="text-[10px] font-semibold text-[#7C3AED] hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {fieldOptions.map((fld) => {
              const isSelected = fieldFilter === fld.value;
              return (
                <button
                  key={fld.value}
                  onClick={() => setFieldFilter(fld.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#7C3AED] text-white font-semibold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200/70 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {fld.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Results Summary & Reset Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>
              Showing <strong className="text-slate-800">{filteredStudies.length}</strong> of{' '}
              <strong className="text-slate-800">{studies.length}</strong> programs
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchQuery('');
                setLevelFilter('All');
                setFieldFilter('All');
              }}
              className="self-start sm:self-auto text-[11px] font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCw className="w-3 h-3" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="card-clean p-6 bg-white border border-[#E2E8F0] rounded-3xl space-y-4 animate-pulse">
              <div className="h-6 bg-slate-200 rounded-lg w-1/2"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-1/3"></div>
              <div className="h-3 bg-slate-200 rounded-lg w-full"></div>
              <div className="h-10 bg-slate-100 rounded-2xl w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredStudies.length === 0 && (
        <div className="card-clean p-12 bg-white border border-[#E2E8F0] rounded-3xl text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mx-auto shadow-2xs">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-[#0F172A]">No programs matched your selection</div>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto">
              We couldn't find any study programs matching your current level, field, or search query.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setLevelFilter('All');
              setFieldFilter('All');
            }}
            className="btn-primary !text-xs !py-2.5 !px-5 !rounded-xl cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Study Cards Grid */}
      {!loading && !error && filteredStudies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <StudyCard key={study.id || study.slug || study._id} study={study} currentEducation={studyName} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyNextPage;
