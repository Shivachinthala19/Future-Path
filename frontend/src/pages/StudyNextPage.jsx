import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, RotateCw, Search, Filter, BookOpen, Clock, ShieldCheck } from 'lucide-react';
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
  
  // Filters (Section 12: Education Level, Field, Duration, Entrance Exam, Career Area)
  const [levelFilter, setLevelFilter] = useState('All');
  const [fieldFilter, setFieldFilter] = useState('All');

  const levelOptions = ['All', 'Postgraduate', 'Undergraduate', 'Diploma', 'Certification', 'Doctorate'];
  const fieldOptions = ['All', 'Management & Business', 'Technology & CS', 'Commerce & Finance', 'Engineering', 'Arts & Humanities', 'Sciences'];

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
    const name = (study.name || study.title || '').toLowerCase();
    const field = (study.field || study.category || '').toLowerCase();
    const level = (study.level || study.degreeLevel || study.educationLevel || '').toLowerCase();

    const matchesSearch =
      name.includes(searchQuery.toLowerCase()) ||
      field.includes(searchQuery.toLowerCase());

    const matchesLevel =
      levelFilter === 'All' ||
      level.includes(levelFilter.toLowerCase());

    const matchesField =
      fieldFilter === 'All' ||
      field.includes(fieldFilter.toLowerCase().split(' ')[0]);

    return matchesSearch && matchesLevel && matchesField;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2 sm:py-6">
      {/* Header (Section 12) */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>EDUCATION DISCOVERY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Study
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-2xl">
          Find the right next step for your education. Discover degrees, postgraduate courses, and specialized programs eligible from <strong className="text-[#4F46E5] font-semibold">{studyName}</strong>.
        </p>
      </div>

      {/* Search & Filters Controls */}
      <div className="card-clean p-4 sm:p-5 bg-white border border-[#E2E8F0] space-y-4">
        {/* Large Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search courses, degrees, diplomas..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#E2E8F0]/60">
          {/* Education Level Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-[#64748B] whitespace-nowrap mr-1">Level:</span>
            {levelOptions.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  levelFilter === lvl
                    ? 'bg-[#4F46E5] text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Field Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-[#64748B] whitespace-nowrap mr-1">Field:</span>
            {fieldOptions.slice(0, 4).map((fld) => (
              <button
                key={fld}
                onClick={() => setFieldFilter(fld)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  fieldFilter === fld
                    ? 'bg-[#7C3AED] text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
                }`}
              >
                {fld}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="card-clean p-6 bg-white border border-[#E2E8F0] space-y-4 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-1/2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredStudies.length === 0 && (
        <div className="card-clean p-12 bg-white border border-[#E2E8F0] text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mx-auto">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="text-lg font-bold text-[#0F172A]">No programs matched your search.</div>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Try adjusting your query or resetting the level & field filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setLevelFilter('All');
              setFieldFilter('All');
            }}
            className="btn-primary !text-xs !py-2 !px-4 cursor-pointer"
          >
            Reset Filters
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
