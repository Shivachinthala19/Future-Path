import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, RotateCw, Search, ShieldCheck } from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { StudyCard } from '../components/StudyCard.jsx';
import { ChangeEducationButton } from '../components/ChangeEducation.jsx';
import api from '../services/api.js';

/**
 * Section 5: Study Next Page (/study-next)
 * Answers: "What can I study after my current education?"
 * Only shows study paths strictly relevant to user education.
 */
export const StudyNextPage = () => {
  const { currentEducation } = useEducation();
  const studyName = currentEducation.educationName || 'B.Com';

  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Directly Related',
    'Related',
    'Possible With Additional Qualification',
    'Requires Entrance Exam',
    'Requires Certification / License'
  ];

  const fetchStudies = async (edu) => {
    setLoading(true);
    try {
      const res = await api.get(`/study-next?education=${encodeURIComponent(edu)}`);
      if (res.success && res.data) {
        setStudies(res.data);
      }
    } catch (err) {
      console.warn('Failed to fetch study options from API:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies(studyName);
  }, [studyName]);

  const filteredStudies = studies.filter((study) => {
    const matchesCategory = selectedCategory === 'All' || study.relationshipCategory === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      study.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (study.subjects && study.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 py-2 sm:py-6 max-w-4xl mx-auto">
      {/* Header (Section 5) */}
      <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Higher Studies & Qualifications</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Can You Study Next?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing verified higher degree, professional qualification, and certification pathways based strictly on: <strong className="text-indigo-600 font-bold">{studyName}</strong>
            </p>
          </div>

          <ChangeEducationButton />
        </div>

        {/* Search & Category Filter Bar */}
        <div className="pt-2 space-y-3 border-t border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs, subjects, entrance exams..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full font-semibold border transition-all text-[11px] ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Studies Listing */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>{filteredStudies.length} Connected Study Programs Found</span>
          <span className="text-[11px] font-normal text-slate-400">Strictly filtered by {studyName}</span>
        </div>

        {loading ? (
          <div className="card-clean p-12 text-center space-y-3 bg-white border border-slate-200">
            <RotateCw className="w-6 h-6 text-indigo-600 animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-semibold">
              Querying accredited study registry for {studyName}...
            </p>
          </div>
        ) : filteredStudies.length > 0 ? (
          <div className="space-y-4">
            {filteredStudies.map((study, idx) => (
              <StudyCard key={study.id || idx} study={study} />
            ))}
          </div>
        ) : (
          <div className="card-clean p-10 text-center space-y-3 bg-white border border-slate-200">
            <p className="text-sm font-bold text-slate-700">
              No study programs matched the selected filter.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
export default StudyNextPage;
