import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  Compass,
  ClipboardCheck,
  GraduationCap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';

export const ExploreYourFutureSection = () => {
  const { currentEducation } = useEducation();
  const studyName = currentEducation?.educationName || 'B.Tech Computer Science';

  // 1. Primary exploration cards (Jobs, Study, Careers)
  const primaryCards = [
    {
      id: 'jobs',
      title: 'Jobs & Openings',
      icon: Briefcase,
      iconBg: 'bg-cyan-50 text-cyan-700 border border-cyan-200/80',
      badgeBg: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
      accentColor: '#0891B2',
      badge: 'HIGH DEMAND',
      desc: 'Browse 22+ high-demand private sector positions and government vacancies eligible from your qualification.',
      action: 'Explore Jobs',
      to: '/jobs'
    },
    {
      id: 'study',
      title: 'Study Next',
      icon: BookOpen,
      iconBg: 'bg-[#EEF2FF] text-[#4F46E5] border border-indigo-200/80',
      badgeBg: 'bg-[#EEF2FF] text-[#4F46E5] border border-indigo-200',
      accentColor: '#4F46E5',
      badge: 'RECOMMENDED',
      desc: 'Discover 35+ verified master\'s degrees, specialized diplomas, and academic pathways eligible from your education.',
      action: 'Explore Degrees',
      to: '/study-next'
    },
    {
      id: 'careers',
      title: 'Career Fields',
      icon: Compass,
      iconBg: 'bg-purple-50 text-[#7C3AED] border border-purple-200/80',
      badgeBg: 'bg-purple-50 text-[#7C3AED] border border-purple-200',
      accentColor: '#7C3AED',
      badge: 'STRATEGIC DOMAINS',
      desc: 'Explore 13 strategic career sectors, executive progression ladders, salaries, and allied roles.',
      action: 'Explore Careers',
      to: '/careers'
    }
  ];

  // 2. Secondary exploration cards (Exams, Skills)
  const secondaryCards = [
    {
      id: 'exams',
      title: 'Competitive Exams',
      icon: ClipboardCheck,
      iconBg: 'bg-amber-50 text-amber-700 border border-amber-200/80',
      badgeBg: 'bg-amber-50 text-amber-700 border border-amber-200',
      accentColor: '#D97706',
      badge: 'CENTRAL & STATE',
      desc: 'Check eligibility, syllabi, and official notification portals for national entrance & civil services exams.',
      action: 'Explore Exams',
      to: '/exams'
    },
    {
      id: 'skills',
      title: 'Skills & Learning',
      icon: GraduationCap,
      iconBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
      badgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      accentColor: '#059669',
      badge: 'PORTFOLIO READY',
      desc: 'Master industry-validated technical tools, frameworks, and portfolio credentials required for ATS shortlisting.',
      action: 'Explore Skills',
      to: '/learn'
    }
  ];

  return (
    <section
      aria-labelledby="explore-heading"
      className="p-5 sm:p-8 bg-white border border-slate-200/90 space-y-6 sm:space-y-8 rounded-2xl shadow-xs"
    >
      {/* ================================================================= */}
      {/* SECTION HEADING                                                   */}
      {/* ================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E8F0]/80 pb-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold border border-indigo-100">
            <Compass className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>DISCOVERY MATRIX</span>
          </div>

          <h2
            id="explore-heading"
            className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight"
          >
            Explore Your Future Pathways
          </h2>

          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Discover verified jobs, degrees, strategic career domains, and skills matched with your background.
          </p>
        </div>

        {studyName && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs text-[#0F172A] self-start sm:self-auto shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tailored for <strong className="text-[#4F46E5] font-extrabold">{studyName}</strong></span>
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* 5 EXPLORATION CARDS (3 PRIMARY + 2 SECONDARY)                     */}
      {/* ================================================================= */}
      <div className="space-y-4 sm:space-y-6">
        {/* ROW 1: JOBS, STUDY, CAREERS (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {primaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.to}
                aria-label={`${card.title}: ${card.desc}`}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5] active:scale-[0.99]"
              >
                <div className="space-y-3.5">
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs ${card.iconBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${card.badgeBg}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold text-[#0F172A] tracking-tight group-hover:text-[#4F46E5] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-3.5 border-t border-slate-100 mt-5 flex items-center justify-between text-xs font-extrabold text-[#4F46E5] group-hover:text-[#4338CA]">
                  <span>{card.action}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ROW 2: EXAMS & SKILLS (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {secondaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.to}
                aria-label={`${card.title}: ${card.desc}`}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5] active:scale-[0.99]"
              >
                <div className="space-y-3.5">
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs ${card.iconBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${card.badgeBg}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold text-[#0F172A] tracking-tight group-hover:text-[#4F46E5] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-3.5 border-t border-slate-100 mt-5 flex items-center justify-between text-xs font-extrabold text-[#4F46E5] group-hover:text-[#4338CA]">
                  <span>{card.action}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreYourFutureSection;
