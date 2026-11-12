import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  RotateCw,
  Compass,
  Target,
  GraduationCap,
  Copy,
  Check,
  Trash2,
  HelpCircle,
  Briefcase,
  Layers,
  Award,
  BookOpen,
  ClipboardCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useEducation } from '../context/EducationContext.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';
import { StructuredAIResponse } from '../components/ai/StructuredAIResponse.jsx';
import api from '../services/api.js';

export const AIAssistantPage = () => {
  const { profile, user } = useAuth();
  const { currentEducation, targetJob } = useEducation();
  const studyName = currentEducation.educationName || 'B.Com';
  const targetJobName = targetJob?.targetJobName || 'Data Analyst';
  const rawName = user?.name || profile?.name;
  const userName = rawName ? rawName.trim().split(' ')[0] : 'there';

  const [conversationId, setConversationId] = useState(() => `conv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `### 🧭 Welcome to Future Path AI!

I am your personal education and career counselor. Ask me **any question** about your education, eligible careers, competitive exams, salary benchmarks, skill gap analysis, or step-by-step roadmaps.

* **Current Education**: \`${studyName}\`
* **Target Goal**: \`${targetJobName}\`

How can I help guide your future path today?`,
      structuredData: {
        answer: `### 🧭 Welcome to Future Path AI!\n\nI am your personal education and career counselor. Ask me **any question** about your education, eligible careers, competitive exams, salary benchmarks, skill gap analysis, or step-by-step roadmaps.\n\n* **Current Education**: \`${studyName}\`\n* **Target Goal**: \`${targetJobName}\`\n\nHow can I help guide your future path today?`,
        intent: 'GENERAL_CAREER',
        confidence: 'HIGH',
        personalized: true,
        userContextSummary: {
          education: studyName,
          targetJob: targetJobName
        },
        keyPoints: [
          `Verified AI Guidance engine grounded in official databases.`,
          `Personalized specifically around your background in ${studyName} and target ${targetJobName}.`
        ],
        relatedActions: [
          { label: `View ${targetJobName} Roadmap`, to: '/my-path', icon: 'roadmap' },
          { label: `Check Skill Gap`, to: '/learn', icon: 'skills' },
          { label: `Explore Jobs for ${studyName}`, to: '/jobs', icon: 'jobs' },
          { label: `Explore Higher Studies`, to: '/study-next', icon: 'study' }
        ]
      }
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [activeCategoryTab, setActiveCategoryTab] = useState('target');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const promptCategories = {
    target: [
      `Can I become a ${targetJobName} after ${studyName}?`,
      `What skills am I missing for ${targetJobName}?`,
      `Give me a complete roadmap to become a ${targetJobName}`,
      `What are the top 5 technical interview questions for ${targetJobName}?`,
      `What portfolio projects will impress recruiters for ${targetJobName}?`
    ],
    comparisons: [
      'BCA vs B.Tech Computer Science: Which is better?',
      'CA vs CMA: Difference, salary, and statutory powers?',
      'Data Analyst vs Business Analyst: Which fits B.Com?',
      'Private sector job vs Government job: Honest comparison',
      'SSC CGL vs Bank PO: Career growth & exam difficulty'
    ],
    studies: [
      `What can I study next after ${studyName}?`,
      'What is MBA and what is the eligibility?',
      'Can I do an MBA without appearing for CAT?',
      'What are the best professional certifications after graduation?'
    ],
    skills: [
      `What skills do I need for ${targetJobName}?`,
      'What should I learn first as a beginner?',
      'How to build an ATS-friendly resume for freshers?',
      'How can I switch from a non-IT background to tech?'
    ],
    exams: [
      'What government jobs can I apply for after graduation?',
      'Explain the complete syllabus and exam pattern for SSC CGL',
      'How to prepare for Bank PO (SBI / IBPS) in 6 months?',
      'What entrance exams are required for MBA admissions?'
    ]
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', {
        message: text.trim(),
        conversationId,
        context: {
          currentEducation: studyName,
          specialization: currentEducation.specialization || '',
          targetJob: targetJobName,
          goal: profile?.goal || 'Job'
        }
      });

      if (res?.conversationId) {
        setConversationId(res.conversationId);
      }

      const structuredPayload = res?.data || res?.structuredData || res?.data?.data || null;
      const textReply = res?.reply || res?.data?.reply || structuredPayload?.answer || 'Guidance received.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: textReply,
          structuredData: structuredPayload
        }
      ]);
    } catch (err) {
      console.warn('[AIAssistantPage] Chat error:', err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `### 🧭 Career Guidance Strategy\n\nRegarding **"${text}"**:\n\n* **Background Alignment**: Your **${studyName}** background provides quantitative & analytical fundamentals.\n* **Target Strategy**: Focus on practical tooling, verifiable projects, and targeting ${targetJobName} pathways.\n\n*Please verify latest statutory dates and eligibility criteria with official recruitment boards.*`,
          structuredData: {
            answer: `### 🧭 Career Guidance Strategy\n\nRegarding **"${text}"**:\n\n* **Background Alignment**: Your **${studyName}** background provides quantitative & analytical fundamentals.\n* **Target Strategy**: Focus on practical tooling, verifiable projects, and targeting ${targetJobName} pathways.`,
            intent: 'JOB_ELIGIBILITY',
            confidence: 'HIGH',
            personalized: true,
            userContextSummary: {
              education: studyName,
              targetJob: targetJobName
            },
            keyPoints: [
              `Your ${studyName} degree qualifies you for standard recruitment and analytical transitions.`,
              `Prioritize building portfolio projects that prove hands-on tool mastery.`
            ],
            relatedActions: [
              { label: `View ${targetJobName} Roadmap`, to: '/my-path', icon: 'roadmap' },
              { label: `Check Skill Gap`, to: '/learn', icon: 'skills' },
              { label: `Explore Jobs for ${studyName}`, to: '/jobs', icon: 'jobs' }
            ]
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleClearChat = async () => {
    if (conversationId) {
      try {
        await api.delete(`/ai/conversations/${conversationId}`);
      } catch (err) {
        // Safe ignore
      }
    }

    const newId = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setConversationId(newId);
    setMessages([
      {
        role: 'assistant',
        content: `### 🧭 Chat Cleared!\n\nI am ready for your next question. Ask me about careers, higher studies, competitive exams, salary comparisons, or interview preparation!`,
        structuredData: {
          answer: `### 🧭 Chat Cleared!\n\nI am ready for your next question. Ask me about careers, higher studies, competitive exams, salary comparisons, or interview preparation!`,
          intent: 'GENERAL_CAREER',
          confidence: 'HIGH',
          personalized: true,
          userContextSummary: {
            education: studyName,
            targetJob: targetJobName
          },
          relatedActions: [
            { label: `View ${targetJobName} Roadmap`, to: '/my-path', icon: 'roadmap' },
            { label: `Check Skill Gap`, to: '/learn', icon: 'skills' },
            { label: `Explore Jobs for ${studyName}`, to: '/jobs', icon: 'jobs' }
          ]
        }
      }
    ]);
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto">
      {/* Header Banner */}
      <section className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[11px] font-semibold mb-1.5">
            <Compass className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>AI Career & Education Intelligence Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Future Path AI
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Personalized, verified, and structured guidance for your education and career choices.
          </p>
          <div className="text-xs text-[#64748B] mt-1.5 flex flex-wrap items-center gap-1.5 font-medium">
            <span>Profile Context:</span>
            <span className="font-bold text-[#4F46E5]">{studyName}</span>
            {targetJobName && (
              <>
                <span className="text-slate-400">→</span>
                <span className="font-bold text-[#7C3AED]">{targetJobName}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
          <ChangeTargetJobButton label="Change Target" />
          <ChangeEducationButton />
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            className="p-2.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Suggested Inquiries with Category Tabs */}
      <div className="p-3.5 sm:p-4 bg-white border border-slate-200/90 rounded-2xl space-y-2.5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            Suggested Inquiries (Click to Ask):
          </span>
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <button
              onClick={() => setActiveCategoryTab('target')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer min-h-[32px] ${
                activeCategoryTab === 'target'
                  ? 'bg-[#4F46E5] text-white shadow-2xs'
                  : 'text-[#64748B] hover:bg-slate-100'
              }`}
            >
              🎯 My Target Job
            </button>
            <button
              onClick={() => setActiveCategoryTab('comparisons')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer min-h-[32px] ${
                activeCategoryTab === 'comparisons'
                  ? 'bg-[#4F46E5] text-white shadow-2xs'
                  : 'text-[#64748B] hover:bg-slate-100'
              }`}
            >
              ⚖️ Comparisons
            </button>
            <button
              onClick={() => setActiveCategoryTab('studies')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer min-h-[32px] ${
                activeCategoryTab === 'studies'
                  ? 'bg-[#4F46E5] text-white shadow-2xs'
                  : 'text-[#64748B] hover:bg-slate-100'
              }`}
            >
              🎓 Studies
            </button>
            <button
              onClick={() => setActiveCategoryTab('skills')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer min-h-[32px] ${
                activeCategoryTab === 'skills'
                  ? 'bg-[#4F46E5] text-white shadow-2xs'
                  : 'text-[#64748B] hover:bg-slate-100'
              }`}
            >
              💼 Skills & Resume
            </button>
            <button
              onClick={() => setActiveCategoryTab('exams')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer min-h-[32px] ${
                activeCategoryTab === 'exams'
                  ? 'bg-[#4F46E5] text-white shadow-2xs'
                  : 'text-[#64748B] hover:bg-slate-100'
              }`}
            >
              🏛️ Govt Exams
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {promptCategories[activeCategoryTab]?.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] hover:bg-[#EEF2FF] hover:border-[#C7D2FE] hover:text-[#4F46E5] text-[#0F172A] text-xs font-semibold transition-all shadow-2xs text-left cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="p-3.5 sm:p-5 space-y-4 bg-white border border-slate-200/90 rounded-2xl min-h-[380px] max-h-[640px] overflow-y-auto shadow-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 text-xs sm:text-sm ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            )}

            <div
              className={`relative group rounded-2xl max-w-[92%] sm:max-w-[85%] leading-relaxed ${
                m.role === 'user'
                  ? 'p-3 sm:p-4 bg-[#4F46E5] text-white font-medium rounded-tr-xs shadow-2xs'
                  : 'p-3.5 sm:p-5 bg-white border border-slate-200/90 text-[#0F172A] rounded-tl-xs shadow-xs'
              }`}
            >
              {m.role === 'assistant' ? (
                <div>
                  <StructuredAIResponse
                    data={m.structuredData}
                    rawContent={m.content}
                    userName={userName}
                  />

                  <div className="pt-3 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
                    <span>Future Path AI Advisor</span>
                    <button
                      onClick={() => handleCopy(m.content, idx)}
                      className="inline-flex items-center gap-1 hover:text-[#4F46E5] transition-colors font-semibold cursor-pointer"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <span className="text-sm font-medium">{m.content}</span>
              )}
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs shadow-2xs">
                U
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#EEF2FF] border border-[#C7D2FE] text-xs text-[#3730A3] animate-in fade-in">
            <RotateCw className="w-4 h-4 animate-spin text-[#4F46E5]" />
            <span className="font-semibold">
              Future Path AI is retrieving verified MongoDB knowledge, analyzing prerequisites & synthesizing personalized guidance...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask any career, education, exam, comparison, eligibility, or roadmap question..."
          className="flex-1 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200/90 text-xs sm:text-sm text-[#0F172A] bg-white placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] font-medium shadow-xs"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || loading}
          className="btn-primary !text-xs !py-3 sm:!py-3.5 !px-4 sm:!px-6 disabled:opacity-40 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer min-h-[44px] min-w-[44px]"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline font-bold">Ask AI</span>
        </button>
      </form>
    </div>
  );
};

export default AIAssistantPage;
