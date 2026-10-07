import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
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
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useEducation } from '../context/EducationContext.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer.jsx';
import api from '../services/api.js';

export const AIAssistantPage = () => {
  const { profile } = useAuth();
  const { currentEducation, targetJob } = useEducation();
  const studyName = currentEducation.educationName || 'B.Com';
  const targetJobName = targetJob?.targetJobName || 'Data Analyst';

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `### 🧭 Welcome to Future Path AI!

I am your personal education and career guide—ready to answer **any question** about your education, target career, job transitions, competitive exams, and interview strategy.

* **Your Current Education**: \`${studyName}\`
* **Active Target Goal**: \`${targetJobName}\`

Feel free to ask me anything—like *"How can I transition into ${targetJobName}?"*, *"What is the difference between CA and CMA?"*, *"What can I study after ${studyName}?"*, or *"Give me top technical interview questions."*`
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
      `How can I crack ${targetJobName} with my ${studyName} background?`,
      `What are the top 5 technical interview questions for ${targetJobName}?`,
      `What portfolio projects will impress recruiters for ${targetJobName}?`,
      `What is the realistic salary and career growth for ${targetJobName}?`
    ],
    comparisons: [
      'What is the difference between CA and CMA?',
      'BCA vs B.Tech CSE: Which one is better?',
      'Data Analyst vs Data Scientist: Key differences?',
      'Private sector job vs Government job: An honest breakdown',
      'SSC CGL vs Bank PO: Which one should I choose?'
    ],
    studies: [
      `What can I study next after ${studyName}?`,
      'Can I do an MBA without appearing for CAT?',
      'Is a 1-year Executive MBA better than a 2-year Regular MBA?',
      'What are the best professional certifications in 2026?'
    ],
    skills: [
      `What specific skills and tools do I need for ${targetJobName}?`,
      'How to write an ATS-friendly resume for freshers?',
      'How to answer "Tell me about yourself" in an interview?',
      'How can I switch from a non-IT background to tech?'
    ],
    exams: [
      'How to prepare for the UPSC Civil Services Examination?',
      'Explain the complete syllabus and exam pattern for SSC CGL',
      'How to prepare for Bank PO (SBI / IBPS) in 6 months?',
      'What is the CTET exam and how do I clear Paper 1 and 2?'
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
        context: {
          currentEducation: studyName,
          specialization: currentEducation.specialization || '',
          targetJob: targetJobName,
          goal: profile?.goal || 'Job'
        }
      });

      if (res && res.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: res.reply }]);
      } else if (res && res.data && res.data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `### 🧭 Career Guidance Strategy\n\nRegarding your query on **"${text}"**:\n\n* **Academic Alignment**: With your foundation in **${studyName}**, focus on building practical demonstrable competence.\n* **Next Action**: Master the core operational software tools, build 2 capstone projects, and tailor your resume around quantifiable metrics.\n\nFeel free to ask for specific project ideas, salary benchmarks, or interview practice!`
          }
        ]);
      }
    } catch (err) {
      console.warn('[AIAssistantPage] Chat error:', err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `### 🧭 Career Guidance\n\nRegarding **"${text}"**:\n\nTo advance toward **${targetJobName}** from **${studyName}**, focus on acquiring practical tools, building verified portfolio projects on GitHub or NovyPro, and practicing behavioral STAR interview answers.`
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

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `### 🧭 Chat Cleared!\n\nI am ready for your next question. Ask me about careers, higher studies, competitive exams, salary comparisons, or interview preparation!`
      }
    ]);
  };

  return (
    <div className="space-y-6 py-2 sm:py-6 max-w-4xl mx-auto">
      {/* Header */}
      <section className="card-clean p-6 bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Career & Education Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Future Path AI
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Your personal education and career guide.
          </p>
          <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-1.5 font-medium">
            <span>Context:</span>
            <span className="font-bold text-indigo-600">{studyName}</span>
            {targetJobName && (
              <>
                <span className="text-slate-400">→</span>
                <span className="font-bold text-purple-600">{targetJobName}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ChangeTargetJobButton label="Change Target" />
          <ChangeEducationButton />
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-rose-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Suggested Inquiries with Category Tabs */}
      <div className="card-clean p-4 bg-white border border-slate-200 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Suggested Inquiries (Click to Ask):
          </span>
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveCategoryTab('target')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                activeCategoryTab === 'target'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🎯 My Target Job
            </button>
            <button
              onClick={() => setActiveCategoryTab('comparisons')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                activeCategoryTab === 'comparisons'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ⚖️ Comparisons
            </button>
            <button
              onClick={() => setActiveCategoryTab('studies')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                activeCategoryTab === 'studies'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🎓 Studies
            </button>
            <button
              onClick={() => setActiveCategoryTab('skills')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                activeCategoryTab === 'skills'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              💼 Skills & Resume
            </button>
            <button
              onClick={() => setActiveCategoryTab('exams')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                activeCategoryTab === 'exams'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🏛️ Govt Exams
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {promptCategories[activeCategoryTab]?.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 text-xs font-semibold transition-all shadow-2xs text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="card-clean p-4 sm:p-6 space-y-5 bg-white border border-slate-200 min-h-[420px] max-h-[620px] overflow-y-auto shadow-2xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 text-xs sm:text-sm ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                <Compass className="w-4 h-4" />
              </div>
            )}

            <div
              className={`relative group rounded-2xl max-w-[90%] leading-relaxed ${
                m.role === 'user'
                  ? 'p-4 bg-indigo-600 text-white font-medium rounded-tr-xs shadow-2xs'
                  : 'p-5 bg-slate-50/80 border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
              }`}
            >
              {m.role === 'assistant' ? (
                <div>
                  <MarkdownRenderer content={m.content} />
                  <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Future Path AI Advisor</span>
                    <button
                      onClick={() => handleCopy(m.content, idx)}
                      className="inline-flex items-center gap-1 hover:text-indigo-600 transition-colors font-medium cursor-pointer"
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
                <span>{m.content}</span>
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
          <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-700 animate-in fade-in">
            <RotateCw className="w-4 h-4 animate-spin text-indigo-600" />
            <span className="font-semibold">Future Path AI is analyzing your inquiry & synthesizing guidance...</span>
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
          placeholder={`Ask any career, education, exam, comparison, or interview question...`}
          className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium shadow-2xs"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || loading}
          className="btn-primary text-xs px-6 py-3.5 disabled:opacity-40 flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline font-bold">Ask AI</span>
        </button>
      </form>
    </div>
  );
};

export default AIAssistantPage;
