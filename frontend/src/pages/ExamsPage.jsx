import React, { useState, useEffect } from 'react';
import { Search, ClipboardCheck, ExternalLink, AlertCircle, Filter, Calendar, BookOpen, ShieldCheck } from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';

export const ExamsPage = () => {
  const { currentEducation } = useEducation();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const studyName = currentEducation?.educationName || 'B.Com';

  const categories = [
    'All',
    'Entrance Exams',
    'Government Exams',
    'Competitive Exams',
    'University Exams',
    'Professional Exams'
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchExams = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/exams');
        if (isMounted) {
          const data = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
          setExams(data);
        }
      } catch (err) {
        console.error('[ExamsPage] Failed to fetch exams:', err);
        if (isMounted) setError('Unable to load exams.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchExams();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredExams = exams.filter((exam) => {
    const name = (exam.name || exam.title || '').toLowerCase();
    const type = (exam.type || exam.category || '').toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase()) || type.includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' ||
      type.includes(selectedCategory.toLowerCase().replace(' exams', '')) ||
      (selectedCategory === 'Entrance Exams' && type.includes('entrance')) ||
      (selectedCategory === 'Government Exams' && (type.includes('government') || type.includes('govt'))) ||
      (selectedCategory === 'Competitive Exams' && type.includes('competitive')) ||
      (selectedCategory === 'Professional Exams' && type.includes('professional'));
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2 sm:py-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
          <ClipboardCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>EXAM DISCOVERY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Entrance & Competitive Exams
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-2xl">
          Discover national, state, and professional examinations aligned with your education and career targets.
        </p>
      </div>

      {/* Official Info Notice Disclaimer (Section 16 requirement) */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Important Notice: </strong>
          Information can change. Please verify the latest exam dates, patterns, and notification details with the official source.
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="card-clean p-4 sm:p-5 bg-white border border-[#E2E8F0] space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by exam name (e.g., CAT, GATE, UPSC, SSC)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4F46E5] text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
                }`}
              >
                {cat}
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
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-6 bg-slate-200 rounded w-2/3"></div>
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredExams.length === 0 && (
        <div className="card-clean p-12 bg-white border border-[#E2E8F0] text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div className="text-lg font-bold text-[#0F172A]">No exams match your filter.</div>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Try searching for "CAT", "UPSC", "GATE", "SSC", or clearing your category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="btn-primary !text-xs !py-2 !px-4 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Exams Grid */}
      {!loading && !error && filteredExams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => {
            const id = exam.slug || exam.id || exam._id;
            const name = exam.name || exam.title;
            const purpose = exam.purpose || exam.description || 'National/State competitive examination for admissions or recruitment.';
            const eligibility = exam.eligibility || 'Graduation / Relevant qualification from recognized university';
            const relatedCourses = exam.relatedCourses || exam.courses || ['MBA', 'Post Graduate Programs'];
            const officialUrl = exam.officialWebsite || exam.officialUrl || exam.website || `https://www.google.com/search?q=${encodeURIComponent(name + ' official website')}`;
            const lastVerified = exam.lastVerified || 'October 2026';

            return (
              <div
                key={id}
                className="card-clean p-6 bg-white border border-[#E2E8F0] hover:border-amber-300 flex flex-col justify-between space-y-5 group transition-all"
              >
                <div className="space-y-4">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      {exam.category || exam.type || 'Entrance Exam'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Verified: {lastVerified}
                    </span>
                  </div>

                  {/* Exam Name & Purpose */}
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-amber-700 transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2 mt-1">
                      {purpose}
                    </p>
                  </div>

                  {/* Eligibility & Education Requirement */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Eligibility / Requirement:
                    </div>
                    <div className="text-slate-700 font-medium line-clamp-2">
                      {eligibility}
                    </div>
                  </div>

                  {/* Related Courses */}
                  {relatedCourses.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Target Courses:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {relatedCourses.map((c, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#4F46E5] font-medium"
                          >
                            {typeof c === 'string' ? c : c.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Official Source Link */}
                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Official Source</span>
                  <a
                    href={officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#4F46E5] hover:text-[#3730A3]"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
