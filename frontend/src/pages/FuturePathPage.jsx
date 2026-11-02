import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Target,
  GraduationCap,
  Briefcase,
  Layers,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  ShieldCheck,
  Check,
  Play,
  Lock,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';

export const FuturePathPage = () => {
  const navigate = useNavigate();
  const {
    currentEducation,
    targetJob,
    openChangeModal,
    openTargetJobModal,
    changeTargetJob,
    removeTargetJob
  } = useEducation();

  const studyName = currentEducation?.educationName || 'B.Com';
  const statusLabel = currentEducation?.status === 'currently_studying' ? 'Currently Studying' : 'Completed';
  const targetJobName = targetJob?.targetJobName;

  const [pathData, setPathData] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default steps generator based on current education & target job
  const generateRoadmapSteps = (edu, tgt) => {
    const jobTitle = tgt || 'Data Analyst';
    return [
      {
        stepNumber: 1,
        title: 'Eligibility & Prerequisite Check',
        description: `Verify degree credentials and entry pathways from ${edu} to ${jobTitle}.`,
        status: 'COMPLETED',
        estimatedEffort: '1 Day',
        relatedSkills: ['Degree Verification', 'Subject Prerequisites'],
        actionText: 'Verified ✓',
        actionUrl: null
      },
      {
        stepNumber: 2,
        title: 'Core Fundamentals & Spreadsheets',
        description: 'Master data tables, formulas, VLOOKUP/XLOOKUP, and structured data handling.',
        status: 'COMPLETED',
        estimatedEffort: '1–2 Weeks',
        relatedSkills: ['Advanced Excel', 'Formulas', 'Data Modeling'],
        actionText: 'Review Skills',
        actionUrl: '/learn'
      },
      {
        stepNumber: 3,
        title: 'Structured Query Language (SQL)',
        description: 'Learn database queries, filtering, joins, aggregations, and window functions.',
        status: 'CURRENT',
        estimatedEffort: '3–4 Weeks',
        relatedSkills: ['SQL', 'PostgreSQL', 'Joins & Indexes'],
        actionText: 'Start Learning →',
        actionUrl: '/learn'
      },
      {
        stepNumber: 4,
        title: 'Business Statistics & Analysis',
        description: 'Understand probability, distributions, descriptive statistics, and hypothesis testing.',
        status: 'UPCOMING',
        estimatedEffort: '2 Weeks',
        relatedSkills: ['Statistics', 'Hypothesis Testing', 'Data Analysis'],
        actionText: 'View Syllabus',
        actionUrl: '/learn'
      },
      {
        stepNumber: 5,
        title: 'Business Intelligence & Dashboards',
        description: 'Build interactive executive dashboards, DAX queries, and KPI reports in Power BI / Tableau.',
        status: 'UPCOMING',
        estimatedEffort: '3 Weeks',
        relatedSkills: ['Power BI', 'Tableau', 'Data Visualization'],
        actionText: 'View Syllabus',
        actionUrl: '/learn'
      },
      {
        stepNumber: 6,
        title: 'Build Real-World Industry Projects',
        description: 'Complete 3 end-to-end portfolio projects using real sales, customer, and financial datasets.',
        status: 'UPCOMING',
        estimatedEffort: '4 Weeks',
        relatedSkills: ['Project Architecture', 'GitHub', 'Documentation'],
        actionText: 'Project Ideas',
        actionUrl: '/jobs'
      },
      {
        stepNumber: 7,
        title: 'Create Portfolio & Showcase',
        description: 'Deploy public dashboard links and publish GitHub repositories with clear READMEs.',
        status: 'UPCOMING',
        estimatedEffort: '1 Week',
        relatedSkills: ['Portfolio Building', 'GitHub Pages'],
        actionText: 'Guidance',
        actionUrl: '/ai-assistant'
      },
      {
        stepNumber: 8,
        title: 'Prepare ATS-Optimized Resume',
        description: 'Highlight measurable metrics, technical keywords, and relevant business impact.',
        status: 'UPCOMING',
        estimatedEffort: '3 Days',
        relatedSkills: ['Resume Crafting', 'ATS Keywords'],
        actionText: 'Resume Assistant',
        actionUrl: '/ai-assistant'
      },
      {
        stepNumber: 9,
        title: 'Interview Preparation & Mock Tests',
        description: 'Practice technical SQL/problem-solving questions and behavioral STAR technique answers.',
        status: 'UPCOMING',
        estimatedEffort: '2 Weeks',
        relatedSkills: ['STAR Method', 'SQL Queries Live', 'Case Studies'],
        actionText: 'Mock Interview',
        actionUrl: '/ai-assistant'
      },
      {
        stepNumber: 10,
        title: `Apply for ${jobTitle} Roles`,
        description: 'Target entry and associate positions on LinkedIn, job boards, and industry portals.',
        status: 'UPCOMING',
        estimatedEffort: 'Ongoing',
        relatedSkills: ['Job Applications', 'Networking', 'Follow-ups'],
        actionText: 'Find Jobs',
        actionUrl: '/jobs'
      }
    ];
  };

  useEffect(() => {
    let isMounted = true;
    const fetchPath = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `/future-path?education=${encodeURIComponent(studyName)}&status=${encodeURIComponent(currentEducation?.status || 'completed')}`;
        if (targetJobName) {
          url += `&targetJob=${encodeURIComponent(targetJobName)}`;
        }
        const res = await api.get(url);
        if (isMounted) {
          const data = res?.data || res;
          setPathData(data);
          
          if (data?.roadmap?.steps && data.roadmap.steps.length > 0) {
            setSteps(data.roadmap.steps);
          } else {
            setSteps(generateRoadmapSteps(studyName, targetJobName));
          }
        }
      } catch (err) {
        console.error('[FuturePathPage] Fetch error:', err);
        if (isMounted) {
          setSteps(generateRoadmapSteps(studyName, targetJobName));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPath();
    return () => {
      isMounted = false;
    };
  }, [studyName, targetJobName, currentEducation?.status]);

  const toggleStepStatus = (stepIdx) => {
    setSteps(prev => {
      const updated = [...prev];
      const cur = updated[stepIdx];
      if (cur.status === 'COMPLETED') {
        cur.status = 'CURRENT';
      } else if (cur.status === 'CURRENT') {
        cur.status = 'COMPLETED';
      } else {
        cur.status = 'CURRENT';
      }
      return updated;
    });
  };

  const completedCount = steps.filter(s => s.status === 'COMPLETED').length;
  const progressPercent = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2 sm:py-6">
      {/* Header Banner */}
      <section className="card-clean p-6 sm:p-8 bg-white border border-[#E2E8F0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>CAREER ROADMAP</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              My Career Path
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Step-by-step verified pathway from <span className="font-semibold text-[#0F172A]">{studyName}</span> to <span className="font-semibold text-[#4F46E5]">{targetJobName || 'Your Target Career'}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start flex-shrink-0">
            <button
              onClick={openChangeModal}
              className="px-3.5 py-2 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Change Education
            </button>
            <button
              onClick={openTargetJobModal}
              className="btn-primary !text-xs !py-2 !px-4 !rounded-xl cursor-pointer"
            >
              {targetJobName ? 'Change Target' : '+ Choose Target Job'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {targetJobName && steps.length > 0 && (
          <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#64748B]">Roadmap Completion</span>
              <span className="text-[#4F46E5] font-bold">{completedCount} of {steps.length} Steps Completed ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#F1F5F9] overflow-hidden">
              <div
                className="h-full bg-brand-gradient rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </section>

      {/* No Target Job Empty State (Section 23 requirement) */}
      {!targetJobName && !loading && (
        <section className="card-clean p-12 bg-white border border-[#E2E8F0] text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mx-auto shadow-2xs">
            <Target className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-[#0F172A]">
              No target job selected
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Choose a career goal and we'll build a personalized step-by-step roadmap for you based on your {studyName} background.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={openTargetJobModal}
              className="btn-gradient !py-2.5 !px-6 text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <Target className="w-4 h-4" />
              <span>Choose Target Job</span>
            </button>
          </div>
        </section>
      )}

      {/* VERTICAL ROADMAP SECTION (Section 11) */}
      {targetJobName && (
        <section className="space-y-6">
          {/* Start Origin Node */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  STARTING POINT
                </div>
                <div className="text-base font-extrabold text-[#0F172A]">
                  {studyName} <span className="text-xs font-semibold text-emerald-600">({statusLabel})</span>
                </div>
              </div>
            </div>
            <button
              onClick={openChangeModal}
              className="text-xs font-semibold text-[#4F46E5] hover:underline cursor-pointer"
            >
              Change
            </button>
          </div>

          {/* Vertical Stepper Nodes */}
          <div className="space-y-0 relative pl-4 sm:pl-6">
            {steps.map((step, idx) => {
              const isCompleted = step.status === 'COMPLETED';
              const isCurrent = step.status === 'CURRENT';
              const isBlocked = step.status === 'BLOCKED';
              const isLast = idx === steps.length - 1;

              return (
                <div key={idx} className="relative pb-8 group">
                  {/* Vertical Connector Line */}
                  {!isLast && (
                    <div
                      className={`absolute left-4 top-10 bottom-0 w-0.5 ${
                        isCompleted ? 'bg-emerald-400' : 'bg-[#E2E8F0]'
                      }`}
                    />
                  )}

                  {/* Step Row */}
                  <div className="flex items-start gap-4">
                    {/* Node Icon / Status Indicator */}
                    <button
                      onClick={() => toggleStepStatus(idx)}
                      title="Click to toggle status"
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-transform cursor-pointer group-hover:scale-110 ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : isCurrent
                          ? 'bg-[#4F46E5] text-white ring-4 ring-[#EEF2FF] shadow-xs'
                          : isBlocked
                          ? 'bg-amber-500 text-white'
                          : 'bg-white text-[#64748B] border-2 border-[#E2E8F0]'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : isCurrent ? (
                        <span>{step.stepNumber || idx + 1}</span>
                      ) : isBlocked ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : (
                        <span>{step.stepNumber || idx + 1}</span>
                      )}
                    </button>

                    {/* Step Card */}
                    <div
                      className={`flex-1 p-5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-white border-[#4F46E5] shadow-[0_8px_24px_rgba(79,70,229,0.08)] ring-1 ring-[#EEF2FF]'
                          : isCompleted
                          ? 'bg-[#F8FAFC] border-emerald-200'
                          : 'bg-white border-[#E2E8F0]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          {/* Top Status & Time Badge */}
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                isCompleted
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isCurrent
                                  ? 'bg-[#EEF2FF] text-[#4F46E5]'
                                  : isBlocked
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-[#64748B]'
                              }`}
                            >
                              {step.status}
                            </span>
                            {step.estimatedEffort && (
                              <span className="inline-flex items-center gap-1 text-[11px] text-[#64748B]">
                                <Clock className="w-3 h-3" />
                                <span>{step.estimatedEffort}</span>
                              </span>
                            )}
                          </div>

                          {/* Step Title */}
                          <h3
                            className={`text-base sm:text-lg font-bold ${
                              isCurrent ? 'text-[#4F46E5]' : 'text-[#0F172A]'
                            }`}
                          >
                            {step.title}
                          </h3>

                          {/* Step Description */}
                          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                            {step.description}
                          </p>

                          {/* Related Skills */}
                          {step.relatedSkills && step.relatedSkills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {step.relatedSkills.map((sk, skIdx) => (
                                <span
                                  key={skIdx}
                                  className="text-[11px] px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#0F172A] font-medium"
                                >
                                  {sk}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Action CTA */}
                        <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0 pt-2 sm:pt-0">
                          {step.actionUrl ? (
                            <Link
                              to={step.actionUrl}
                              className={`text-xs font-bold px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors ${
                                isCurrent
                                  ? 'btn-primary'
                                  : 'bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#0F172A] hover:text-[#4F46E5] border border-[#E2E8F0]'
                              }`}
                            >
                              <span>{step.actionText || 'Proceed'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <button
                              onClick={() => toggleStepStatus(idx)}
                              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            >
                              {isCompleted ? 'Mark Incomplete' : 'Mark Done'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Destination Goal Node */}
          <div className="p-5 rounded-2xl bg-brand-gradient text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                🎯
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                  CAREER MILESTONE
                </div>
                <div className="text-xl font-extrabold text-white">
                  {targetJobName}
                </div>
              </div>
            </div>
            <Link
              to="/jobs"
              className="px-4 py-2 rounded-xl bg-white text-[#4F46E5] text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs"
            >
              Explore Job Roles
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default FuturePathPage;
