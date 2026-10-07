import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Target,
  GraduationCap,
  Briefcase,
  Layers,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Code,
  FileText
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';

/**
 * Section 8 & 16: Your Future Path Component
 * Visually communicates:
 * - With Target Job: Current Education → Possible Next Studies → Career Fields → Target Job → Skills → Projects → Resume → Interview → Apply → Job
 * - Without Target Job: Current Education → Possible Studies → Career Fields → Related Jobs
 * - Career Switching: Highlights 'Path type: Additional Skills Required' + Recommended preparation sequence
 */
export const FuturePath = () => {
  const { currentEducation, targetJob, targetJobAnalysis, loading, openTargetJobModal } = useEducation();

  const studyName = currentEducation.educationName || 'B.Com';
  const statusLabel = currentEducation.status === 'currently_studying' ? 'Currently Studying' : 'Completed';
  const hasTargetJob = Boolean(targetJob?.targetJobName);
  const targetJobName = targetJob?.targetJobName;

  // Detect Career Switching (Section 16: e.g. Mechanical Engineering -> Software Developer)
  const isCareerSwitch = targetJobAnalysis?.isCareerSwitch ||
    (targetJobName && (
      (targetJobName.toLowerCase().includes('software') && !studyName.toLowerCase().includes('computer') && !studyName.toLowerCase().includes('cse') && !studyName.toLowerCase().includes('mca')) ||
      (targetJobName.toLowerCase().includes('data analyst') && !studyName.toLowerCase().includes('computer') && !studyName.toLowerCase().includes('data'))
    ));

  const pathType = targetJobAnalysis?.pathType || (isCareerSwitch ? 'Additional Skills Required' : 'Direct Alignment');

  // Dynamic preparation sequence derived strictly from target job and analysis (Section 16)
  const pipelineSteps = React.useMemo(() => {
    if (targetJobAnalysis?.roadmap?.steps && targetJobAnalysis.roadmap.steps.length > 0) {
      return targetJobAnalysis.roadmap.steps.map(s => typeof s === 'string' ? s : s.title);
    }
    const titleLow = (targetJobName || '').toLowerCase();
    if (titleLow.includes('account') || titleLow.includes('tax') || titleLow.includes('audit')) {
      return ['Bookkeeping Principles', 'Tally Prime & ERP', 'GST & TDS E-filing', 'Bank Reconciliation', 'Audit Compliance', 'Resume', 'Interview', 'Corporate Placement'];
    }
    if (titleLow.includes('electric') || titleLow.includes('wireman') || titleLow.includes('lineman')) {
      return ['Circuit Theory & Safety', 'Conduit & Panel Wiring', 'Motors & Starters', 'Testing (Megger)', 'State Wireman License', 'Trade Test Prep', 'DISCOM / Factory Electrician'];
    }
    if (titleLow.includes('civil') || titleLow.includes('site') || titleLow.includes('structural')) {
      return ['Concrete Tech & IS Codes', 'AutoCAD Drafting', 'STAAD.Pro Analysis', 'BOQ & Bar Bending', 'Site Quality & Safety', 'Project Portfolio', 'Site / Structural Engineer'];
    }
    if (titleLow.includes('mech') || titleLow.includes('cad') || titleLow.includes('design')) {
      return ['Machine Design Basics', 'SolidWorks 3D CAD', 'GD&T Standards', 'ANSYS FEA Simulation', 'Assembly Projects', 'CSWP Certification', 'Design Engineer'];
    }
    if (titleLow.includes('teach') || titleLow.includes('lectur') || titleLow.includes('educat')) {
      return ['Subject Mastery (NCERT)', 'B.Ed / UGC-NET Prep', 'Lesson Planning', 'CTET Paper 1/2', 'Demo Class Practice', 'Panel Interview', 'School / College Appointment'];
    }
    if (titleLow.includes('nurse') || titleLow.includes('pharmacist') || titleLow.includes('healthcare') || titleLow.includes('medical')) {
      return ['Healthcare Degree/Diploma', 'State Council Registration', 'BLS / ACLS Certification', 'Clinical Rotations', 'Dosage Calculations', 'Hospital Interviews', 'Staff Placement'];
    }
    if (titleLow.includes('gov') || titleLow.includes('ssc') || titleLow.includes('upsc') || titleLow.includes('bank po')) {
      return ['Syllabus & Notification', 'Quantitative Aptitude', 'Reasoning Ability', 'General Studies & Polity', 'Current Affairs', 'Mock Test Series', 'Document Verification & Appointment'];
    }
    if (titleLow.includes('data analyst') || titleLow.includes('business analyst')) {
      return ['Business Metrics', 'Advanced Excel', 'SQL Querying', 'Power BI Dashboards', 'Python EDA', 'Capstone Projects', 'Interview Prep', 'Analytics Job'];
    }
    if (titleLow.includes('software') || titleLow.includes('developer') || titleLow.includes('frontend') || titleLow.includes('backend') || titleLow.includes('web')) {
      return ['Programming Fundamentals', 'Data Structures & Algorithms', 'Frontend & Backend Stack', 'Databases & APIs', 'Full-Stack Projects', 'GitHub Portfolio', 'Tech Interview', 'Software Engineer'];
    }
    // Dynamic universal fallback from target job skills
    const skills = targetJobAnalysis?.skillsBreakdown?.skillsYouNeed?.slice(0, 3)?.map(s => typeof s === 'string' ? s : s.name) || [`${targetJobName} Fundamentals`, 'Industry Tools'];
    return [...skills, 'Practical Projects', 'Targeted Resume', 'Interview Preparation', 'Job Application'];
  }, [targetJobAnalysis, targetJobName]);

  // Derive top skills for target job (Section 6, 15, 16)
  const skillsList = React.useMemo(() => {
    if (targetJobAnalysis?.skillsBreakdown?.skillsYouNeed?.length > 0) {
      return targetJobAnalysis.skillsBreakdown.skillsYouNeed.map(s => typeof s === 'string' ? s : s.name).slice(0, 6);
    }
    const titleLow = (targetJobName || '').toLowerCase();
    if (titleLow.includes('account') || titleLow.includes('tax') || titleLow.includes('audit')) {
      return ['Financial Accounting', 'Tally Prime', 'GST & TDS E-filing', 'Bank Reconciliation', 'Advanced Excel'];
    }
    if (titleLow.includes('electric') || titleLow.includes('wireman')) {
      return ['Industrial Panel Wiring', 'Motor Starters (DOL/Star-Delta)', 'Multimeter & Megger Diagnostics', 'Electrical Safety (LOTO)'];
    }
    if (titleLow.includes('civil') || titleLow.includes('site')) {
      return ['AutoCAD Civil 3D', 'STAAD.Pro / ETABS', 'Quantity Estimation & BOQ', 'IS 456 Concrete Codes'];
    }
    if (titleLow.includes('mech') || titleLow.includes('cad')) {
      return ['SolidWorks 3D CAD', 'GD&T (ASME Y14.5)', 'ANSYS FEA Simulation', 'Machine Design'];
    }
    if (titleLow.includes('teach') || titleLow.includes('educat')) {
      return ['Child Pedagogy', 'Curriculum & Lesson Planning', 'Classroom Management', 'CTET Preparation'];
    }
    if (titleLow.includes('nurse') || titleLow.includes('pharmacist') || titleLow.includes('healthcare')) {
      return ['Clinical Nursing / Pharma', 'Patient Assessment', 'BLS / ACLS Protocols', 'Medication Administration'];
    }
    if (titleLow.includes('gov') || titleLow.includes('ssc') || titleLow.includes('bank po')) {
      return ['Quantitative Aptitude', 'Logical Reasoning', 'General Awareness & Polity', 'English Comprehension'];
    }
    if (titleLow.includes('data')) {
      return ['Advanced Excel', 'SQL', 'Power BI', 'Python (Pandas)', 'Statistics'];
    }
    if (titleLow.includes('software') || titleLow.includes('developer')) {
      return ['Programming Core', 'Data Structures', 'Web Frameworks', 'Databases & APIs'];
    }
    return ['Domain Core Principles', 'Industry Standard Software', 'Portfolio Project Execution'];
  }, [targetJobAnalysis, targetJobName]);

  return (
    <div className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Your Future Path</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
            {hasTargetJob ? `Path from ${studyName} to ${targetJobName}` : `Career Progression Map for ${studyName}`}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {hasTargetJob ? (
            <button
              onClick={openTargetJobModal}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center gap-1"
            >
              <span>Change Target</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={openTargetJobModal}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1"
            >
              <span>+ Add Target Job</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs text-slate-400">
          Calculating your future path...
        </div>
      ) : (
        <div className="space-y-5">
          {/* ============================================================ */}
          {/* CASE 1: TARGET JOB SELECTED (Section 6, 8, 15, 16)           */}
          {/* ============================================================ */}
          {hasTargetJob ? (
            <div className="space-y-4">
              {/* Career Switching Notice (Section 16: Mechanical -> Software Developer) */}
              {isCareerSwitch && (
                <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Path Type: {pathType}</span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    Transitioning from <strong>{studyName}</strong> to <strong>{targetJobName}</strong> is fully supported through targeted technical bridging rather than direct qualification. Follow this recommended sequence:
                  </p>
                  <div className="pt-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1.5">
                      Recommended Preparation Pipeline:
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
                      {pipelineSteps.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-slate-800 shadow-2xs">
                            {step}
                          </span>
                          {idx < pipelineSteps.length - 1 && (
                            <span className="text-amber-500 font-bold">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Visual Flow Pipeline (Section 8) */}
              <div className="flex flex-col space-y-2 max-w-2xl mx-auto">
                {/* Node 1: Current Education */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Current Education
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 truncate">
                      {studyName}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200">
                    {statusLabel}
                  </span>
                </div>

                <div className="flex justify-center text-indigo-400 font-bold text-sm my-0.5">↓</div>

                {/* Node 2: Possible Next Studies */}
                <Link
                  to="/study-next"
                  className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50 border border-indigo-200 hover:border-indigo-400 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      Possible Next Studies
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      Direct & Related Higher Study Options
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <div className="flex justify-center text-indigo-400 font-bold text-sm my-0.5">↓</div>

                {/* Node 3: Career Fields */}
                <Link
                  to="/careers"
                  className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/50 border border-purple-200 hover:border-purple-400 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                      Career Fields
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                      Industries & Growth Domains Connected to Your Study
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <div className="flex justify-center text-indigo-400 font-bold text-sm my-0.5">↓</div>

                {/* Node 4: Target Job */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-100/60 border border-purple-300 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-purple-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                      Target Job
                    </div>
                    <div className="font-extrabold text-sm text-purple-900 truncate">
                      {targetJobName}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-purple-700 border border-purple-200">
                    Active Goal
                  </span>
                </div>

                <div className="flex justify-center text-indigo-400 font-bold text-sm my-0.5">↓</div>

                {/* Node 5: Skills */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Skills to Learn
                    </span>
                    <Link to="/learn" className="text-[10px] font-bold text-indigo-600 hover:underline">
                      View details →
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center text-indigo-400 font-bold text-sm my-0.5">↓</div>

                {/* Node 6: Projects → Resume → Interview → Apply → Job */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-bold pt-1">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-purple-600 text-[10px] uppercase">Step 6</div>
                    <div className="text-slate-800 mt-0.5 truncate">Projects</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-purple-600 text-[10px] uppercase">Step 7</div>
                    <div className="text-slate-800 mt-0.5 truncate">Resume</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-cyan-600 text-[10px] uppercase">Step 8</div>
                    <div className="text-slate-800 mt-0.5 truncate">Interview</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-cyan-600 text-[10px] uppercase">Step 9</div>
                    <div className="text-slate-800 mt-0.5 truncate">Apply</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs col-span-2 sm:col-span-1">
                    <div className="text-emerald-600 text-[10px] uppercase">Goal</div>
                    <div className="font-extrabold mt-0.5 truncate">Job</div>
                  </div>
                </div>
              </div>

              {/* Link to Roadmaps */}
              <div className="pt-2 text-center">
                <Link
                  to="/job-roadmap"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  <span>Open Full 7-Step Cracking Blueprint for {targetJobName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            /* ============================================================ */
            /* CASE 2: NO TARGET JOB SELECTED (Section 8)                    */
            /* Flow: Current Education → Possible Studies → Career Fields → Related Jobs */
            /* ============================================================ */
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 max-w-xl mx-auto">
                {/* Node 1: Current Education */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Current Education
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 truncate">
                      {studyName}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200">
                    {statusLabel}
                  </span>
                </div>

                <div className="flex justify-center text-indigo-400 font-bold text-sm my-0.5">↓</div>

                {/* Node 2: Possible Studies */}
                <Link
                  to="/study-next"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200 hover:border-indigo-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      Possible Studies
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      What can I study after {studyName}?
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Explore master degrees, professional qualifications & certifications
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <div className="flex justify-center text-indigo-400 font-bold text-sm my-0.5">↓</div>

                {/* Node 3: Career Fields */}
                <Link
                  to="/careers"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 hover:border-purple-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                      Career Fields
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                      Industries & Disciplines you can enter
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      High-growth sectors matching your background
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <div className="flex justify-center text-indigo-400 font-bold text-sm my-0.5">↓</div>

                {/* Node 4: Related Jobs */}
                <Link
                  to="/job-roadmap"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-cyan-50/60 border border-cyan-200 hover:border-cyan-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                      Related Jobs
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 group-hover:text-cyan-700 transition-colors truncate">
                      Private & Government opportunities
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Directly related and skill-pathway roles with verified eligibility
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-500 group-hover:text-cyan-700 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>

              {/* Set target prompt */}
              <div className="pt-2 text-center text-xs text-slate-500">
                Want a specific role?{' '}
                <button
                  onClick={openTargetJobModal}
                  className="font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  Select a target job
                </button>{' '}
                to generate a step-by-step preparation roadmap.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FuturePath;
