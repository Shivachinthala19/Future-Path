import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Circle,
  Compass,
  Target,
  BookOpen,
  Code,
  Layers,
  ChevronRight,
  RotateCw
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';

export const LearnSkillsPage = () => {
  const navigate = useNavigate();
  const {
    currentEducation,
    targetJob,
    openTargetJobModal,
    changeTargetJob,
    removeTargetJob
  } = useEducation();

  const studyName = currentEducation?.educationName || 'B.Com';
  const targetJobName = targetJob?.targetJobName || 'Data Analyst';

  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Skill categorization generator based on education & target role
  const generateSkillBreakdown = (edu, job) => {
    const jobLower = (job || 'Data Analyst').toLowerCase();
    
    if (jobLower.includes('data') || jobLower.includes('analyst')) {
      return [
        { name: 'Microsoft Excel & Spreadsheets', status: 'HAVE', category: 'Core Office', importance: 'Foundation', description: 'Formulas, VLOOKUP, pivot tables, basic charts and data cleaning.' },
        { name: 'SQL (Structured Query Language)', status: 'NEED', category: 'Database', importance: 'Critical', description: 'Table joins, aggregation functions, subqueries, and window functions.' },
        { name: 'Business Statistics', status: 'NEED', category: 'Analytics', importance: 'Critical', description: 'Descriptive stats, probability distributions, hypothesis testing.' },
        { name: 'Power BI / Tableau', status: 'NEED', category: 'Visualization', importance: 'High', description: 'Interactive dashboard creation, KPI metrics, DAX queries.' },
        { name: 'Python for Data Analysis', status: 'RECOMMENDED', category: 'Programming', importance: 'Recommended', description: 'Pandas, NumPy, automated data pipelines and scripting.' },
        { name: 'Data Storytelling & Reporting', status: 'RECOMMENDED', category: 'Communication', importance: 'Recommended', description: 'Translating technical numbers into executive business insights.' }
      ];
    }

    if (jobLower.includes('software') || jobLower.includes('dev')) {
      return [
        { name: 'Computer Science Basics', status: 'HAVE', category: 'Fundamentals', importance: 'Foundation', description: 'Logical thinking, algorithms, and computational problem-solving.' },
        { name: 'JavaScript / TypeScript', status: 'NEED', category: 'Language', importance: 'Critical', description: 'ES6+ syntax, asynchronous programming, DOM and types.' },
        { name: 'React.js Frontend Framework', status: 'NEED', category: 'Frontend', importance: 'Critical', description: 'Components, hooks, state management, and modern UI creation.' },
        { name: 'Node.js & REST APIs', status: 'NEED', category: 'Backend', importance: 'Critical', description: 'Express.js server architecture, routing, middleware and auth.' },
        { name: 'PostgreSQL / MongoDB', status: 'RECOMMENDED', category: 'Database', importance: 'Recommended', description: 'Schema design, indexing, ORMs and query optimization.' },
        { name: 'Git & Version Control', status: 'RECOMMENDED', category: 'DevOps', importance: 'Recommended', description: 'Branching, PRs, code review workflows, and CI/CD basics.' }
      ];
    }

    if (jobLower.includes('finance') || jobLower.includes('account')) {
      return [
        { name: 'Financial Accounting Principles', status: 'HAVE', category: 'Domain', importance: 'Foundation', description: 'Double-entry bookkeeping, ledger entries, trial balance.' },
        { name: 'Tally Prime & GST Filing', status: 'NEED', category: 'Software', importance: 'Critical', description: 'Voucher entries, GST returns, e-invoicing and reconciliation.' },
        { name: 'Advanced Excel Financial Modeling', status: 'NEED', category: 'Analysis', importance: 'Critical', description: 'XLOOKUP, DCF models, sensitivity tables and macros.' },
        { name: 'TDS & Income Tax Compliance', status: 'NEED', category: 'Taxation', importance: 'High', description: 'Form 16/26AS, deduction slabs, quarterly returns.' },
        { name: 'SAP FICO / ERP Systems', status: 'RECOMMENDED', category: 'ERP', importance: 'Recommended', description: 'Enterprise financial accounting modules and reporting.' }
      ];
    }

    return [
      { name: 'Domain Knowledge', status: 'HAVE', category: 'Foundation', importance: 'Foundation', description: 'Principles and theoretical framework from your education.' },
      { name: 'Core Industry Tooling', status: 'NEED', category: 'Tools', importance: 'Critical', description: 'Primary industry software and practical workflow tooling.' },
      { name: 'Applied Problem Solving', status: 'NEED', category: 'Practice', importance: 'Critical', description: 'Solving real-world scenarios and client requirements.' },
      { name: 'Advanced Certification Skill', status: 'RECOMMENDED', category: 'Professional', importance: 'Recommended', description: 'Recognized industry credentials and advanced specialization.' }
    ];
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    // Simulate/Fetch skill gap from API
    setTimeout(() => {
      if (isMounted) {
        const breakdown = generateSkillBreakdown(studyName, targetJobName);
        setSkillsData(breakdown);
        setSelectedSkill(breakdown.find(s => s.status === 'NEED') || breakdown[0]);
        setLoading(false);
      }
    }, 150);

    return () => {
      isMounted = false;
    };
  }, [studyName, targetJobName]);

  const haveCount = skillsData.filter(s => s.status === 'HAVE').length;
  const needCount = skillsData.filter(s => s.status === 'NEED').length;
  const recCount = skillsData.filter(s => s.status === 'RECOMMENDED').length;

  return (
    <div className="space-y-4 sm:space-y-5 max-w-5xl mx-auto py-1 sm:py-4 px-1 sm:px-0">
      {/* Header Section (Section 17) */}
      <section className="p-4 sm:p-6 bg-white border border-slate-200/90 rounded-2xl shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[11px] font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>SKILL GAP ANALYSIS</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Your Skill Gap
            </h1>
            <div className="text-xs sm:text-sm text-[#64748B] flex items-center gap-2 pt-0.5">
              <span>Target Role:</span>
              <strong className="text-[#4F46E5] font-bold">{targetJobName}</strong>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">From {studyName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openTargetJobModal}
              className="btn-primary !text-xs !py-1.5 !px-3.5 !rounded-xl cursor-pointer"
            >
              Change Target Role
            </button>
          </div>
        </div>

        {/* Legend Bar (Section 17 requirement) */}
        <div className="pt-2.5 border-t border-[#E2E8F0] flex flex-wrap items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs">
            <span className="w-4.5 h-4.5 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-[11px]">✓</span>
            <span>Already have ({haveCount})</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 text-xs">
            <span className="w-4.5 h-4.5 rounded-full bg-amber-100 flex items-center justify-center font-bold text-[11px]">⚠</span>
            <span>Need to learn ({needCount})</span>
          </div>
          <div className="flex items-center gap-1.5 text-indigo-700 text-xs">
            <span className="w-4.5 h-4.5 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-[11px]">○</span>
            <span>Recommended ({recCount})</span>
          </div>
        </div>
      </section>

      {/* Main Skill Gap Breakdown & Learning Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-6">
        {/* Left Side: Skill List */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] px-1">
            Skill Requirement Matrix for {targetJobName}
          </div>

          <div className="space-y-2">
            {skillsData.map((skill, idx) => {
              const isHave = skill.status === 'HAVE';
              const isNeed = skill.status === 'NEED';
              const isRec = skill.status === 'RECOMMENDED';
              const isSelected = selectedSkill?.name === skill.name;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-3.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-white border-[#4F46E5] ring-2 ring-[#EEF2FF] shadow-2xs'
                      : 'bg-white border-[#E2E8F0] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Status Icon */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isHave
                          ? 'bg-emerald-100 text-emerald-800'
                          : isNeed
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {isHave ? '✓' : isNeed ? '⚠' : '○'}
                    </div>

                    <div>
                      <div className="text-sm font-bold text-[#0F172A]">
                        {skill.name}
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        {skill.category} · {skill.importance}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#4F46E5]' : 'text-slate-300'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Skill Deep-Dive & Action Card */}
        <div className="lg:col-span-5">
          {selectedSkill ? (
            <div className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4 sticky top-20">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      selectedSkill.status === 'HAVE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedSkill.status === 'NEED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {selectedSkill.status === 'HAVE' ? '✓ Acquired' : selectedSkill.status === 'NEED' ? '⚠ Priority Skill' : '○ Elective Skill'}
                  </span>
                  <span className="text-xs text-[#64748B] font-semibold">
                    {selectedSkill.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
                  {selectedSkill.name}
                </h3>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {selectedSkill.description}
                </p>
              </div>

              {/* Learning Curriculum Modules */}
              <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Recommended Study Modules:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
                    <span>Module 1: Syntax & Core Concepts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
                    <span>Module 2: Practical Queries & Real Datasets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
                    <span>Module 3: Optimization & Portfolio Project</span>
                  </li>
                </ul>
              </div>

              {/* Start Learning Action Button (Section 17) */}
              <div className="pt-3">
                <Link
                  to="/ai-assistant"
                  className="w-full min-h-[44px] btn-primary !py-2.5 text-xs font-bold justify-center active:scale-98"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Guided Practice</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-white border border-slate-200/90 rounded-2xl text-center space-y-2 shadow-2xs">
              <p className="text-xs text-slate-500">Select any skill on the left to view modules and start learning.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnSkillsPage;
