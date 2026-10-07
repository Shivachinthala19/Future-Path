import React from 'react';
import { Layers, GraduationCap, ChevronRight } from 'lucide-react';
import { EDUCATION_CATEGORIES } from '../utils/searchHelpers.js';

export const TaxonomyBrowser = ({ onSelectCategory, activeCategory }) => {
  return (
    <section className="p-5 sm:p-6 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">
              Browse by Education Taxonomy (36 Domains)
            </h2>
            <p className="text-[11px] text-slate-500">
              Explore studies, certifications, and career paths across structured education categories
            </p>
          </div>
        </div>

        {activeCategory && activeCategory !== 'ALL' && (
          <button
            onClick={() => onSelectCategory('ALL')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 py-1">
        {EDUCATION_CATEGORIES.map((cat, idx) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={idx}
              onClick={() => onSelectCategory(isSelected ? 'ALL' : cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TaxonomyBrowser;
