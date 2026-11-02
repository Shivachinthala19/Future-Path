import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Compass,
  Briefcase,
  GraduationCap,
  Layers,
  Award,
  BookOpen,
  ClipboardCheck,
  Check,
  Target
} from 'lucide-react';
import { MarkdownRenderer } from '../common/MarkdownRenderer.jsx';

export const StructuredAIResponse = ({ data, rawContent, userName = 'there' }) => {
  // If data is just a string or missing structured payload, render standard markdown
  if (!data || typeof data === 'string') {
    return <MarkdownRenderer content={data || rawContent || ''} />;
  }

  const {
    answer,
    intent,
    confidence = 'HIGH',
    personalized = true,
    userContextSummary,
    eligibilityStatus,
    keyPoints = [],
    skillGap,
    missingSkills = [],
    roadmap = [],
    comparisonTable,
    sources = [],
    relatedActions = []
  } = data;

  // Icon selector for related action buttons
  const getActionIcon = (iconType, label = '') => {
    const l = (iconType || label).toLowerCase();
    if (l.includes('roadmap') || l.includes('path')) return <Compass className="w-3.5 h-3.5 text-[#4F46E5]" />;
    if (l.includes('job') || l.includes('career')) return <Briefcase className="w-3.5 h-3.5 text-[#0891B2]" />;
    if (l.includes('skill') || l.includes('learn')) return <GraduationCap className="w-3.5 h-3.5 text-[#059669]" />;
    if (l.includes('study') || l.includes('degree')) return <BookOpen className="w-3.5 h-3.5 text-[#7C3AED]" />;
    if (l.includes('exam')) return <ClipboardCheck className="w-3.5 h-3.5 text-[#D97706]" />;
    return <ArrowRight className="w-3.5 h-3.5 text-[#4F46E5]" />;
  };

  // Eligibility Status styling helper
  const getEligibilityBadge = (status) => {
    switch (status) {
      case 'ELIGIBLE':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />,
          label: 'Eligible Based on Verified Criteria'
        };
      case 'POTENTIALLY_ELIGIBLE':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />,
          label: 'Potentially Eligible (With Additional Skills / Coursework)'
        };
      case 'NOT_ELIGIBLE':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          icon: <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />,
          label: 'Prerequisites Not Met'
        };
      case 'INSUFFICIENT_INFORMATION':
      default:
        return {
          bg: 'bg-slate-50 border-slate-200 text-slate-700',
          icon: <HelpCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />,
          label: 'More Information Needed'
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Header Bar: Intent Badge & Trust Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2E8F0]">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold text-[11px]">
            <Compass className="w-3 h-3 text-[#4F46E5]" />
            <span>{intent ? intent.replace(/_/g, ' ') : 'CAREER GUIDANCE'}</span>
          </span>

          {confidence === 'HIGH' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-[11px]">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Verified Database Grounding</span>
            </span>
          )}
        </div>

        {personalized && userContextSummary && (
          <div className="text-[11px] font-medium text-[#64748B] flex items-center gap-1">
            <span>Personalized for</span>
            <strong className="text-[#0F172A]">{userContextSummary.education || 'You'}</strong>
            {userContextSummary.targetJob && (
              <>
                <span className="text-slate-400">→</span>
                <strong className="text-[#4F46E5]">{userContextSummary.targetJob}</strong>
              </>
            )}
          </div>
        )}
      </div>

      {/* 2. Main Markdown Answer */}
      <div className="text-sm leading-relaxed text-[#0F172A]">
        <MarkdownRenderer content={answer || rawContent || ''} />
      </div>

      {/* 3. Structured Eligibility Checker Card (Section 10) */}
      {eligibilityStatus && (
        <div
          className={`p-4 rounded-2xl border flex flex-col gap-2 transition-all ${
            getEligibilityBadge(eligibilityStatus).bg
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-extrabold text-xs">
              {getEligibilityBadge(eligibilityStatus).icon}
              <span>ELIGIBILITY ASSESSMENT</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-current/20">
              {getEligibilityBadge(eligibilityStatus).label}
            </span>
          </div>

          <div className="text-xs leading-relaxed opacity-90">
            {eligibilityStatus === 'POTENTIALLY_ELIGIBLE' && (
              <p>
                Your educational background in <strong>{userContextSummary?.education || 'your current degree'}</strong> satisfies foundational prerequisites. Developing technical tooling (e.g. {missingSkills.slice(0, 3).join(', ') || 'essential analytics tools'}) unlocks standard recruitment eligibility.
              </p>
            )}
            {eligibilityStatus === 'ELIGIBLE' && (
              <p>
                Your qualification directly satisfies listed academic criteria according to official regulatory frameworks.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 4. Why / Key Takeaways Card (Section 7) */}
      {keyPoints.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#4F46E5]">
            <Target className="w-3.5 h-3.5" />
            <span>Key Strategic Insights</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#0F172A]">
            {keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-1.5 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Personalized Skill Gap Matrix (Section 11) */}
      {skillGap && (skillGap.hasSkills?.length > 0 || skillGap.missingSkills?.length > 0) && (
        <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Skill Gap & Learning Priorities</span>
            </div>
            <span className="text-[11px] text-[#64748B]">Target: {userContextSummary?.targetJob || 'Target Job'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Have Skills */}
            {skillGap.hasSkills?.length > 0 && (
              <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#15803D] uppercase flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#16A34A]" />
                  <span>Already in Profile</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {skillGap.hasSkills.map((sk, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-[#86EFAC] text-xs font-semibold text-[#166534]">
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills to Learn */}
            {skillGap.missingSkills?.length > 0 && (
              <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-1.5">
                <span className="text-[10px] font-bold text-[#B45309] uppercase flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                  <span>Priority Skills to Learn</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {skillGap.missingSkills.map((sk, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-[#FCD34D] text-xs font-semibold text-[#92400E]">
                      ⚠ {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Comparison Table Card (Section 13) */}
      {comparisonTable && comparisonTable.headers?.length > 0 && (
        <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 overflow-x-auto shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Direct Comparison Matrix</span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                {comparisonTable.headers.map((h, i) => (
                  <th key={i} className="p-2.5 font-bold text-[#0F172A]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonTable.rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-[#E2E8F0]/60 hover:bg-[#F8FAFC]/60 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? 'font-bold text-[#0F172A]' : 'text-[#64748B]'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 7. Structured Roadmap Pathway (Section 12) */}
      {roadmap && roadmap.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#4F46E5]">
              <Compass className="w-3.5 h-3.5" />
              <span>Recommended Transition Roadmap</span>
            </div>
            <Link to="/my-path" className="text-xs font-bold text-[#4F46E5] hover:underline inline-flex items-center gap-1">
              <span>Full Pathway</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2 pt-1">
            {roadmap.slice(0, 5).map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#EEF2FF] text-[#4F46E5] font-extrabold text-[11px] flex items-center justify-center flex-shrink-0">
                    {step.step || idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A]">{step.title}</div>
                    {step.description && <div className="text-[11px] text-[#64748B]">{step.description}</div>}
                  </div>
                </div>

                {step.type && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase flex-shrink-0">
                    {step.type}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Verified Sources Card (Section 6 & 16) */}
      {sources && sources.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            <span>Verified Official & Reference Sources</span>
            <span className="text-[10px] text-slate-400">Last Verified: {sources[0]?.lastVerified || 'September 2026'}</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {sources.map((src, idx) => (
              <a
                key={idx}
                href={src.sourceUrl.startsWith('http') ? src.sourceUrl : '#'}
                target={src.sourceUrl.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EEF2FF] border border-[#E2E8F0] hover:border-[#C7D2FE] text-[#0F172A] hover:text-[#4F46E5] font-semibold text-xs transition-colors shadow-2xs"
              >
                <span>{src.sourceName}</span>
                <ExternalLink className="w-3 h-3 text-[#4F46E5]" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 9. Related Action Buttons (Section 25) */}
      {relatedActions && relatedActions.length > 0 && (
        <div className="pt-2 flex flex-wrap items-center gap-2">
          {relatedActions.map((action, idx) => (
            <Link
              key={idx}
              to={action.to}
              className="px-3.5 py-1.5 rounded-xl bg-[#4F46E5] hover:bg-[#3730A3] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs"
            >
              {getActionIcon(action.icon, action.label)}
              <span>{action.label}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StructuredAIResponse;
