import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Target,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  GraduationCap,
  BookOpen,
  Code,
  FileText,
  DollarSign,
  Building,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Compass
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';
import { ExternalSearchButton } from '../components/common/ExternalSearchButton.jsx';
import { OfficialSourceButton } from '../components/common/OfficialSourceButton.jsx';
import { SourceLinks } from '../components/SourceLinks.jsx';
import { ApplicationLinksSection } from '../components/ApplicationLinksSection.jsx';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentEducation,
    targetJob,
    changeTargetJob,
    setToastMessage
  } = useEducation();

  const studyName = currentEducation?.educationName || 'B.Com';

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(0);
  const [activeStepTab, setActiveStepTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]);
  const [savingStep, setSavingStep] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/job/${encodeURIComponent(id)}?education=${encodeURIComponent(studyName)}`);
        if (isMounted) {
          if (res && res.data) {
            setJobData(res.data);
          } else if (res) {
            setJobData(res);
          }
        }
      } catch (err) {
        console.error('[JobDetailsPage] Error fetching job details:', err);
        if (isMounted) {
          setError('Unable to load job path details.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJob();
    return () => {
      isMounted = false;
    };
  }, [id, studyName]);

  // Load user saved roadmap step progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const res = await api.get('/user/roadmap');
        if (res && res.data && res.data.completedSteps) {
          setCompletedSteps(res.data.completedSteps);
        }
      } catch (e) {
        // Safe fallback
      }
    };
    fetchUserProgress();
  }, []);

  const handleSetTarget = async () => {
    if (!jobData) return;
    const jobTitle = jobData.title || jobData.name;
    changeTargetJob(jobTitle);
    try {
      await api.put('/user/target-job', { targetJob: jobTitle });
    } catch (e) {
      // Local state is already updated
    }
    if (setToastMessage) {
      setToastMessage(`🎯 Set "${jobTitle}" as your active target job.`);
    }
  };

  const handleToggleStep = async (stepNum) => {
    setSavingStep(true);
    let updated;
    if (completedSteps.includes(stepNum)) {
      updated = completedSteps.filter((s) => s !== stepNum);
    } else {
      updated = [...completedSteps, stepNum];
    }
    setCompletedSteps(updated);

    try {
      await api.put('/user/roadmap/progress', {
        targetId: id,
        completedSteps: updated,
        currentStep: stepNum
      });
    } catch (err) {
      console.warn('[JobDetailsPage] Progress sync fallback:', err.message);
    } finally {
      setSavingStep(false);
    }
  };

  if (loading) {
    return (
      <div className="card-clean p-16 text-center bg-white border border-slate-200 space-y-3 max-w-5xl mx-auto my-8 rounded-3xl">
        <RotateCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-semibold">
          Calculating multi-route eligibility and structured career roadmap...
        </p>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="card-clean p-12 text-center bg-white border border-slate-200 space-y-4 max-w-5xl mx-auto my-8 rounded-3xl">
        <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Job Role Not Found</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          The requested job or recruitment role could not be located in our registry.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-2xs"
        >
          <span>Search Jobs & Careers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const title = jobData.title || jobData.name;
  const isCurrentTarget = targetJob?.targetJobName?.toLowerCase() === title.toLowerCase();
  const multipleRoutes = jobData.multipleRoutes || [];
  const reqChecklist = jobData.userVsJobRequirements || {};
  const roadmapSteps = jobData.stepByStepRoadmap || jobData.roadmap || [];
  const projects = jobData.projects || [];
  const interviewPreparation = jobData.interviewPreparation || [];
  const careerGrowth = jobData.careerProgression || jobData.careerGrowth || [];
  const higherStudies = jobData.higherStudies || [];
  const isGovt = jobData.sector?.toLowerCase().includes('government') || jobData.jobType === 'Government' || jobData.isGovernment;
  const sources = jobData.sources || [];
  const officialUrl = jobData.officialUrl || jobData.notificationUrl || sources[0]?.url;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DIRECTLY_RELEVANT':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'POTENTIALLY_ELIGIBLE':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'ADDITIONAL_SKILLS_REQUIRED':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300';
      case 'ADDITIONAL_QUALIFICATION_REQUIRED':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'EXAM_REQUIRED':
        return 'bg-purple-50 text-purple-800 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-5xl mx-auto py-1 sm:py-4">
      {/* SECTION 14: TARGET JOB HERO */}
      <section className="p-4 sm:p-6 bg-white border border-slate-200/90 space-y-4 shadow-xs rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                isGovt ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {isGovt ? 'Government Sector' : (jobData.sector || 'Industry Career')}
              </span>
              {jobData.salary && (
                <span className="text-xs text-emerald-600 font-extrabold inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{jobData.salary}</span>
                </span>
              )}
              {isCurrentTarget && (
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  🎯 Active Target
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl pt-0.5">
              {jobData.overview || jobData.description || `Comprehensive pathway analysis, qualification routes, and skills required to become a ${title}.`}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 self-start flex-shrink-0">
            {!isCurrentTarget ? (
              <button
                onClick={handleSetTarget}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer min-h-[38px]"
              >
                <Target className="w-4 h-4" />
                <span>Set as My Target Job</span>
              </button>
            ) : (
              <Link
                to="/my-path"
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-2xs flex items-center gap-1.5 min-h-[38px]"
              >
                <span>Continue My Future Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Action Buttons: Search Web & Official Source (Section 15 & 16) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <ExternalSearchButton
              query={isGovt ? `${title} official recruitment notification eligibility` : `${title} eligibility skills career`}
              label="🔎 Search Web on Google"
            />
            {officialUrl && (
              <OfficialSourceButton
                url={officialUrl}
                label="🌐 Official Website"
              />
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-medium">
            Last Verified: <strong className="text-slate-600">{jobData.lastVerified || 'September 2026'}</strong>
          </div>
        </div>

        {/* Factual Disclaimer Card (Section 18 & 27) */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-900 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold">Career Guidance Principle: </strong>
            <span>
              {jobData.disclaimer?.statement ||
                jobData.disclaimer ||
                'Your current profile matches listed requirements based on available information. Hiring and selection depend strictly on employer interviews and official recruitment criteria.'}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 14 & 15: CAN YOUR CURRENT EDUCATION LEAD TO THIS JOB? */}
      <section className="p-4 sm:p-6 bg-white border border-slate-200/90 space-y-4 rounded-2xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Job Eligibility Engine
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Can your current education lead to this job?
            </h2>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${getStatusBadge(jobData.eligibilityStatus)}`}>
            {jobData.eligibilityStatus?.replace(/_/g, ' ') || 'POTENTIALLY ELIGIBLE'}
          </span>
        </div>

        {/* User vs Job Education Banner */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px] block">Your Education</span>
            <span className="text-sm font-extrabold text-indigo-600">{studyName}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px] block">Target Job</span>
            <span className="text-sm font-extrabold text-slate-800">{title}</span>
          </div>
          <div className="sm:max-w-xs text-slate-600 text-[11px] leading-relaxed">
            {jobData.educationRelevance || 'Your degree provides foundational competencies applicable to this role.'}
          </div>
        </div>

        {/* Requirement-by-Requirement Matching */}
        {reqChecklist.skillsBreakdown && reqChecklist.skillsBreakdown.length > 0 && (
          <div className="space-y-3 pt-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Required Skills Checklist:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {reqChecklist.skillsBreakdown.map((sk, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs"
                >
                  <span className="font-semibold text-slate-800">{sk.name}</span>
                  {sk.have || sk.status === 'Completed' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Have</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                      <XCircle className="w-4 h-4" />
                      <span>To Learn</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 20: MULTIPLE ROUTES TO THE SAME JOB */}
      {multipleRoutes.length > 0 && (
        <section className="p-4 sm:p-6 bg-white border border-slate-200/90 space-y-4 rounded-2xl shadow-xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Multiple Pathways
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              How can I become a {title}?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Multiple supported routes lead to this career. Select the route that matches your academic background.
            </p>
          </div>

          <div className="space-y-4">
            {/* Route selector pills */}
            <div className="flex flex-wrap gap-2">
              {multipleRoutes.map((route, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRouteIdx(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedRouteIdx === idx
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {route.routeName || route.name || `ROUTE ${idx + 1}`}
                </button>
              ))}
            </div>

            {/* Active Route Detail Card */}
            {multipleRoutes[selectedRouteIdx] && (
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wide">
                    {multipleRoutes[selectedRouteIdx].routeName || multipleRoutes[selectedRouteIdx].name}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold">
                    {multipleRoutes[selectedRouteIdx].timeline || 'Direct Entry'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {multipleRoutes[selectedRouteIdx].description}
                </p>

                {/* Pathway Flow Diagram */}
                {multipleRoutes[selectedRouteIdx].steps && (
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Step Progression:
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      {multipleRoutes[selectedRouteIdx].steps.map((st, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 font-bold text-slate-800 shadow-2xs">
                            {st}
                          </span>
                          {sIdx < multipleRoutes[selectedRouteIdx].steps.length - 1 && (
                            <span className="text-indigo-600 font-bold">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 14 & 16: STEP-BY-STEP ROADMAP (WITH CHECKABLE PROGRESS) */}
      {roadmapSteps.length > 0 && (
        <section className="p-4 sm:p-6 bg-white border border-slate-200/90 space-y-4 rounded-2xl shadow-xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Preparation Strategy
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Step-by-Step Roadmap to {title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Complete each stage sequentially from foundational tooling to projects, resume, and interview clearance.
            </p>
          </div>

          <div className="space-y-3">
            {roadmapSteps.map((step) => {
              const stepNum = step.step || 1;
              const isCompleted = completedSteps.includes(stepNum);
              const isExpanded = activeStepTab === stepNum;

              return (
                <div
                  key={stepNum}
                  className={`rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : isExpanded
                      ? 'bg-indigo-50/30 border-indigo-200 shadow-2xs'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div
                    onClick={() => setActiveStepTab(isExpanded ? null : stepNum)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStep(stepNum);
                        }}
                        title={isCompleted ? 'Mark step incomplete' : 'Mark step completed'}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                      </button>

                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          STEP {stepNum} • {step.type || 'PREPARATION'}
                        </div>
                        <div className="text-sm font-extrabold text-slate-900">
                          {step.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isCompleted ? 'Completed' : 'Pending'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs space-y-3">
                      <p className="text-slate-600 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {step.whatToLearn && (
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                            <div className="font-bold text-slate-800 text-[11px]">What to learn:</div>
                            <p className="text-slate-600 text-[11px]">{step.whatToLearn}</p>
                          </div>
                        )}

                        {step.whyItMatters && (
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                            <div className="font-bold text-slate-800 text-[11px]">Why it matters:</div>
                            <p className="text-slate-600 text-[11px]">{step.whyItMatters}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-slate-400 font-medium">
                          Tip: Complete before advancing to Step {stepNum + 1}
                        </span>
                        <button
                          onClick={() => handleToggleStep(stepNum)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            isCompleted
                              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                          }`}
                        >
                          {isCompleted ? 'Mark as Incomplete' : '✓ Mark as Completed'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* PROJECTS & INTERVIEW PREPARATION (Section 14) */}
      {(projects.length > 0 || interviewPreparation.length > 0) && (
        <section className="p-4 sm:p-6 bg-white border border-slate-200/90 space-y-4 rounded-2xl shadow-xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Practical Portfolio & Interview Preparation
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Projects to Build & Interview Questions
            </h2>
          </div>

          {/* Projects to Build */}
          {projects.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-indigo-600" />
                <span>Recommended Portfolio Projects</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2 shadow-2xs"
                  >
                    <div className="text-xs font-extrabold text-slate-900">
                      {proj.name}
                    </div>
                    {proj.tech && (
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {proj.tech}
                      </span>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interview Questions */}
          {interviewPreparation.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>Technical Interview Questions & Guidance</span>
              </div>
              <div className="space-y-3">
                {interviewPreparation.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-2 text-xs"
                  >
                    <div className="font-extrabold text-slate-900">
                      Q: {q.question}
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-3 border-l-2 border-purple-300">
                      <strong>Answer Guidance: </strong>
                      {q.answerGuidance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* CAREER GROWTH & FURTHER STUDY */}
      {(careerGrowth.length > 0 || higherStudies.length > 0) && (
        <section className="p-4 sm:p-6 bg-white border border-slate-200/90 space-y-4 rounded-2xl shadow-xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Long-Term Outlook
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Career Growth & Subsequent Higher Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerGrowth.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Promotion & Hierarchy Progression</span>
                </div>
                <div className="space-y-2 text-xs">
                  {careerGrowth.map((lvl, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 flex items-center gap-2 shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{lvl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {higherStudies.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <span>Subsequent Higher Study Qualifications</span>
                </div>
                <div className="space-y-2 text-xs">
                  {higherStudies.map((prog, idx) => {
                    const progName = typeof prog === 'string' ? prog : (prog.name || prog.program);
                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 flex items-center justify-between shadow-2xs"
                      >
                        <span>🎓 {progName}</span>
                        <Link
                          to={`/study/${encodeURIComponent(progName.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`}
                          className="text-[11px] text-indigo-600 hover:underline font-bold"
                        >
                          View Program
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* DIRECT APPLICATION & HIRING LINKS SPECIFIC TO THIS JOB */}
      <ApplicationLinksSection
        jobTitle={title}
        category={jobData.sector || jobData.category}
        jobType={jobData.jobType}
      />

      {/* VERIFIED SOURCES & RECRUITMENT RULES */}
      <SourceLinks
        sources={sources}
        officialSource={jobData.officialSource || 'Official Recruitment Commission / Employer Database'}
        lastVerified={jobData.lastVerified || 'September 2026'}
        disclaimer={
          isGovt
            ? 'Information can change. Please verify current vacancies, age limits, syllabus, and application deadlines with the official government notification.'
            : 'Information can change. Hiring requirements, technical stacks, and salaries depend on specific employers and market conditions.'
        }
      />
    </div>
  );
};

export default JobDetailsPage;
