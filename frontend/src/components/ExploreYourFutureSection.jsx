import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  Compass,
  ClipboardCheck,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';

export const ExploreYourFutureSection = () => {
  const { currentEducation } = useEducation();
  const studyName = currentEducation?.educationName;

  // 1. Primary exploration cards (Study, Jobs, Careers)
  const primaryCards = [
    {
      id: 'study',
      title: 'Study',
      icon: BookOpen,
      iconBg: 'bg-[#EEF2FF] text-[#4F46E5]',
      desc: studyName ? `What can you study after ${studyName}?` : 'Discover what you can study next.',
      action: 'Explore Studies →',
      to: '/study-next',
      isFeatured: true,
      badge: 'RECOMMENDED'
    },
    {
      id: 'jobs',
      title: 'Jobs',
      icon: Briefcase,
      iconBg: 'bg-[#ECFEFF] text-[#0891B2]',
      desc: studyName ? `What jobs can you target after ${studyName}?` : 'Find jobs related to your education and goals.',
      action: 'Explore Jobs →',
      to: '/job-roadmap',
      isFeatured: false
    },
    {
      id: 'careers',
      title: 'Careers',
      icon: Compass,
      iconBg: 'bg-[#F5F3FF] text-[#7C3AED]',
      desc: studyName ? `Which careers connect to ${studyName}?` : 'Explore career paths and where they can lead.',
      action: 'Explore Careers →',
      to: '/careers',
      isFeatured: false
    }
  ];

  // 2. Secondary exploration cards (Exams, Skills)
  const secondaryCards = [
    {
      id: 'exams',
      title: 'Exams',
      icon: ClipboardCheck,
      iconBg: 'bg-[#FFFBEB] text-[#D97706]',
      desc: studyName ? `Which entrance & government exams can you consider?` : 'Find entrance and government exams you may pursue.',
      action: 'Explore Exams →',
      to: '/search?q=Exam'
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: GraduationCap,
      iconBg: 'bg-[#ECFDF5] text-[#059669]',
      desc: studyName ? `Which skills should you build for ${studyName}?` : 'Discover the skills you need for your future.',
      action: 'Explore Skills →',
      to: '/learn'
    }
  ];

  return (
    <section
      aria-labelledby="explore-heading"
      className="relative rounded-[24px] border border-[#E2E8F0] p-6 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(15,23,42,0.04)] overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.05), transparent 35%),
          radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.04), transparent 35%),
          #FFFFFF
        `
      }}
    >
      {/* ================================================================= */}
      {/* SECTION HEADING                                                   */}
      {/* ================================================================= */}
      <div className="text-center space-y-2.5 max-w-3xl mx-auto mb-10 sm:mb-12">
        {/* Small label */}
        <div>
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
            EXPLORE
          </span>
        </div>

        {/* Main heading */}
        <h2
          id="explore-heading"
          className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight"
        >
          Explore Your Future
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-base text-[#64748B] max-w-xl mx-auto leading-relaxed">
          Discover what you can study, which careers you can build, what jobs you can target, and the skills you need to get there.
        </p>

        {/* Dynamic Contextual Education Pill */}
        {studyName && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] text-xs font-semibold mt-2 shadow-2xs">
            <span>Based on your education:</span>
            <strong className="font-bold">{studyName}</strong>
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* 5 EXPLORATION OPTIONS HIERARCHY                                   */}
      {/* ================================================================= */}
      <div className="space-y-6">
        {/* PRIMARY EXPLORATION (Study, Jobs, Careers) - Desktop: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {primaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.to}
                aria-label={`${card.title}: ${card.desc}`}
                className={`group relative flex flex-col justify-between p-7 rounded-[20px] border transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5] ${
                  card.isFeatured
                    ? 'border-[#C7D2FE] shadow-[0_8px_30px_rgba(79,70,229,0.06)]'
                    : 'bg-[#FFFFFF] border-[#E2E8F0] hover:border-[#C7D2FE] shadow-[0_8px_30px_rgba(15,23,42,0.04)]'
                }`}
                style={
                  card.isFeatured
                    ? {
                        background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)'
                      }
                    : {
                        background: '#FFFFFF'
                      }
                }
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon + Optional Featured Pill */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-2xs ${card.iconBg}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {card.isFeatured && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#4F46E5] text-[#FFFFFF] uppercase tracking-wider shadow-2xs">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#4F46E5] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-5 border-t border-[#E2E8F0]/60 mt-4 flex items-center justify-between text-xs sm:text-sm font-bold text-[#4F46E5]">
                  <span>{card.action}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* SECONDARY EXPLORATION (Exams, Skills) - Desktop: 2 Columns Centered */}
        <div className="grid grid-cols-2 md:grid-cols-2 max-w-3xl mx-auto gap-4 sm:gap-6">
          {secondaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.to}
                aria-label={`${card.title}: ${card.desc}`}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#C7D2FE] shadow-[0_8px_30px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)] transition-all duration-200 ease-out hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              >
                <div className="space-y-3">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-2xs ${card.iconBg}`}
                  >
                    <Icon className="w-5 h-5 sm:w-5 sm:h-5" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight group-hover:text-[#4F46E5] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#64748B] leading-relaxed line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-3 sm:pt-4 border-t border-[#E2E8F0]/60 mt-3 flex items-center justify-between text-xs font-bold text-[#4F46E5]">
                  <span>{card.action}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
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
