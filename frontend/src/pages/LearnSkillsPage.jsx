import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, CheckCircle2, RotateCw, BookOpen, Layers, Sparkles, Briefcase, Plus, X } from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';
import api from '../services/api.js';

/**
 * Section 6: Learn for a Job Page (/learn)
 * Based on: User Education + Target Job if selected.
 * - If Target Job exists: "How to become a [Target Job]" with ordered skills
 * - If NO Target Job: Skills you can learn for careers related to education, with 1-click select
 */
export const LearnSkillsPage = () => {
  const {
    currentEducation,
    targetJob,
    changeTargetJob,
    removeTargetJob,
    openTargetJobModal
  } = useEducation();

  const studyName = currentEducation.educationName || 'B.Com';
  const targetJobName = targetJob?.targetJobName;

  const [learnData, setLearnData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedClusterIndex, setSelectedClusterIndex] = useState(0);

  const fetchLearnData = async (edu, job) => {
    setLoading(true);
    try {
      let url = `/learn?education=${encodeURIComponent(edu)}`;
      if (job) {
        url += `&targetJob=${encodeURIComponent(job)}`;
      }
      const res = await api.get(url);
      if (res.success && res.data) {
        setLearnData(res.data);
      }
    } catch (err) {
      console.warn('Failed to load learn skills from API:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearnData(studyName, targetJobName);
  }, [studyName, targetJobName]);

  return (
    <div className="space-y-6 sm:space-y-8 py-2 sm:py-6 max-w-4xl mx-auto">
      {/* Header (Section 6) */}
      <section className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
              <Brain className="w-3.5 h-3.5" />
              <span>Skill Curriculum & Learning Order</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {targetJobName ? `How to become a ${targetJobName}` : `Skills to Learn from ${studyName}`}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Education: <strong className="text-indigo-600 font-bold">{studyName}</strong>
              {targetJobName && (
                <>
                  {' '}• Target Role: <strong className="text-purple-600 font-bold">{targetJobName}</strong>
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ChangeEducationButton />
            {targetJobName && (
              <ChangeTargetJobButton />
            )}
          </div>
        </div>
      </section>

      {/* Main Content: Differentiates whether Target Job exists (Section 6) */}
      {loading ? (
        <div className="card-clean p-12 text-center space-y-3 bg-white border border-slate-200">
          <RotateCw className="w-6 h-6 text-purple-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">
            Customizing skill curriculum for {targetJobName || studyName}...
          </p>
        </div>
      ) : targetJobName ? (
        /* ================= CASE 1: TARGET JOB EXISTS ================= */
        <section className="space-y-6">
          <div className="card-clean p-6 sm:p-7 bg-white border border-purple-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600">
                  Targeted Learning Order
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  Ordered Skills to Learn
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Strictly filtered for <strong className="text-slate-800">{targetJobName}</strong> based on your {studyName} degree.
                </p>
              </div>

              <button
                onClick={removeTargetJob}
                className="text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors self-start sm:self-auto"
              >
                Clear Target & Browse All Careers
              </button>
            </div>

            {/* Ordered Skill List (1. Excel, 2. Statistics, 3. SQL, 4. Python, 5. Pandas, 6. Power BI...) */}
            <div className="space-y-3">
              {(learnData?.skillsToLearn || []).map((skill) => (
                <div
                  key={skill.step}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-purple-300 transition-all space-y-2 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {skill.step}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 group-hover:text-purple-600 transition-colors">
                          {skill.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {skill.category}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-white text-purple-700 border border-purple-200">
                        {skill.duration || '2-3 Weeks'}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        {skill.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pl-10">
                    <strong className="text-slate-700">Why needed:</strong> {skill.whyNeeded}
                  </p>
                </div>
              ))}
            </div>

            {/* Next Step Callout */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                Ready to see capstone projects and interview prep for {targetJobName}?
              </span>
              <Link
                to="/job-roadmap"
                className="btn-primary text-xs px-4 py-2 self-start sm:self-auto"
              >
                <span>View Complete Job Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* ================= CASE 2: NO TARGET JOB EXISTS ================= */
        <section className="space-y-6">
          <div className="card-clean p-6 sm:p-7 bg-white border border-slate-200 space-y-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Broad Career Exploration
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                Skills you can learn for careers related to {studyName}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select any career field or job below to focus your learning roadmap.
              </p>
            </div>

            {/* Career Cluster Tabs (Accounting, Finance, Banking, Data Analytics, etc.) */}
            <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-100 pb-3">
              {(learnData?.careerClusters || []).map((cluster, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => setSelectedClusterIndex(cIdx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedClusterIndex === cIdx
                      ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {cluster.field}
                </button>
              ))}
            </div>

            {/* Active Cluster Details */}
            {learnData?.careerClusters?.[selectedClusterIndex] && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    {learnData.careerClusters[selectedClusterIndex].field} Domain Overview
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {learnData.careerClusters[selectedClusterIndex].description}
                  </p>
                </div>

                {/* Skills in this Cluster */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key Competencies & Tools:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {learnData.careerClusters[selectedClusterIndex].skills.map((skillName, skIdx) => (
                      <div
                        key={skIdx}
                        className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs"
                      >
                        <span className="font-bold text-slate-900">{skillName}</span>
                        <span className="text-[10px] text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-md">
                          Core Skill
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Jobs you can set from this cluster */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Related Job Roles (Click to Set as Target Job):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {learnData.careerClusters[selectedClusterIndex].targetJobs.map((roleName) => (
                      <button
                        key={roleName}
                        onClick={() => changeTargetJob(roleName)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:border-purple-400 hover:bg-purple-50 text-slate-800 transition-all group"
                      >
                        <span>{roleName}</span>
                        <Plus className="w-3.5 h-3.5 text-purple-600 group-hover:scale-110 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
export default LearnSkillsPage;
