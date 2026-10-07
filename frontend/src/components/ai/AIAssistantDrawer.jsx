import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, CornerDownLeft, Loader2, Copy, Check } from 'lucide-react';
import { educationService } from '../../services/educationService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useEducation } from '../../context/EducationContext.jsx';
import { MarkdownRenderer } from '../common/MarkdownRenderer.jsx';

export const AIAssistantDrawer = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { currentEducation, targetJob } = useEducation();
  const studyName = currentEducation?.educationName || user?.currentEducation?.name || 'B.Com';
  const targetJobName = targetJob?.targetJobName || user?.careerGoal?.targetCareer || 'Data Analyst';

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `### 🧭 Welcome to Future Path AI!

I am your personal education and career guide. You can ask me **any question** about your education, eligible jobs, degree comparisons, government exams, interview preparation, or skill roadmaps.

* **Current Education**: \`${studyName}\`
* **Target Goal**: \`${targetJobName}\`

How can I help guide your future path today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    `What can I study after ${studyName}?`,
    `Can I become a ${targetJobName}?`,
    'What skills am I missing?',
    'What jobs can I apply for?',
    'How should I prepare for this job?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleCopy = (text, idx) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { role: 'user', content: query.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await educationService.sendAiChat(query.trim(), {
        study: studyName,
        currentEducation: studyName,
        targetJob: targetJobName,
        userGoal: targetJobName,
      });

      if (res && res.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: res.reply }]);
      } else if (res && res.data && res.data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `We encountered an issue processing your query right now: ${err.message || 'Please check your connection and try again.'}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-ai-600 to-brand-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                Future Path AI
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-semibold uppercase">
                  Verified Guide
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your personal education and career guide.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-ai-100 dark:bg-ai-900/60 text-ai-600 dark:text-ai-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed relative group ${
                  m.role === 'user'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80'
                }`}
              >
                {m.role === 'assistant' ? (
                  <>
                    <MarkdownRenderer content={m.content} />
                    <button
                      onClick={() => handleCopy(m.content, idx)}
                      title="Copy response"
                      className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white/70 dark:bg-slate-750 backdrop-blur-xs transition-opacity shadow-2xs"
                    >
                      {copiedIdx === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </>
                ) : (
                  <div className="whitespace-pre-wrap break-words">{m.content}</div>
                )}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Loader2 className="w-4 h-4 animate-spin text-ai-500" />
              <span>Synthesizing database pathways & generating analysis...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="text-[11px] font-semibold text-slate-400 mb-2">Suggested Inquiries</div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs whitespace-nowrap px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 transition-colors shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your education or future career..."
              className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ai-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            Future Path AI grounds recommendations in accredited educational standards.
          </p>
        </div>
      </div>
    </div>
  );
};
