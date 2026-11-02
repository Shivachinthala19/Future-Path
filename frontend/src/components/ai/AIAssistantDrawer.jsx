import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, CornerDownLeft, Loader2, Copy, Check, Trash2, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useEducation } from '../../context/EducationContext.jsx';
import { StructuredAIResponse } from './StructuredAIResponse.jsx';
import api from '../../services/api.js';

export const AIAssistantDrawer = ({ isOpen, onClose }) => {
  const { user, profile } = useAuth();
  const { currentEducation, targetJob } = useEducation();
  const studyName = currentEducation?.educationName || user?.currentEducation?.name || 'B.Com';
  const targetJobName = targetJob?.targetJobName || user?.careerGoal?.targetCareer || 'Data Analyst';
  const rawName = user?.name || profile?.name;
  const userName = rawName ? rawName.trim().split(' ')[0] : 'there';

  const [conversationId, setConversationId] = useState(() => `conv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `### 🧭 Welcome to Future Path AI!

I am your personal education and career counselor. Ask me **any question** about your education, eligible jobs, degree comparisons, government exams, interview preparation, or skill roadmaps.

* **Current Education**: \`${studyName}\`
* **Target Goal**: \`${targetJobName}\`

How can I help guide your future path today?`,
      structuredData: {
        answer: `### 🧭 Welcome to Future Path AI!\n\nI am your personal education and career counselor. Ask me **any question** about your education, eligible jobs, degree comparisons, government exams, interview preparation, or skill roadmaps.\n\n* **Current Education**: \`${studyName}\`\n* **Target Goal**: \`${targetJobName}\`\n\nHow can I help guide your future path today?`,
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
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    `Can I become a ${targetJobName} after ${studyName}?`,
    `What skills am I missing for ${targetJobName}?`,
    `What can I study after ${studyName}?`,
    'BCA vs B.Tech CSE: Key differences?',
    'What government jobs can I apply for?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

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
        content: `### 🧭 Chat Cleared!\n\nI am ready for your next question. How can I guide your education or career roadmap today?`,
        structuredData: {
          answer: `### 🧭 Chat Cleared!\n\nI am ready for your next question. How can I guide your education or career roadmap today?`,
          intent: 'GENERAL_CAREER',
          confidence: 'HIGH',
          personalized: true,
          userContextSummary: {
            education: studyName,
            targetJob: targetJobName
          },
          relatedActions: [
            { label: `View ${targetJobName} Roadmap`, to: '/my-path', icon: 'roadmap' },
            { label: `Check Skill Gap`, to: '/learn', icon: 'skills' }
          ]
        }
      }
    ]);
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
      const res = await api.post('/ai/chat', {
        message: query.trim(),
        conversationId,
        context: {
          currentEducation: studyName,
          targetJob: targetJobName,
          goal: profile?.goal || 'Job'
        }
      });

      if (res?.conversationId) {
        setConversationId(res.conversationId);
      }

      const structuredPayload = res?.data || res?.structuredData || res?.data?.data || null;
      const textReply = res?.reply || res?.data?.reply || structuredPayload?.answer || 'Guidance synthesized.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: textReply,
          structuredData: structuredPayload
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `We encountered an issue processing your query right now: ${err.message || 'Please check your connection and try again.'}`,
          structuredData: {
            answer: `We encountered an issue processing your query right now: ${err.message || 'Please check your connection and try again.'}`,
            intent: 'GENERAL_CAREER',
            confidence: 'NEEDS_VERIFICATION',
            personalized: false,
            relatedActions: [
              { label: `View ${targetJobName} Roadmap`, to: '/my-path', icon: 'roadmap' },
              { label: `Explore Jobs`, to: '/jobs', icon: 'jobs' }
            ]
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-[#E2E8F0] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#0F172A] flex items-center gap-1.5">
                Future Path AI
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold uppercase">
                  Verified Guide
                </span>
              </h3>
              <p className="text-xs text-[#64748B]">
                {studyName} → {targetJobName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              title="Clear chat history"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[90%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                  m.role === 'user'
                    ? 'bg-[#4F46E5] text-white shadow-xs font-medium'
                    : 'bg-white text-[#0F172A] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(15,23,42,0.04)]'
                }`}
              >
                {m.role === 'assistant' ? (
                  <div>
                    <StructuredAIResponse
                      data={m.structuredData}
                      rawContent={m.content}
                      userName={userName}
                    />
                    <div className="pt-2 mt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#64748B]">
                      <span>Future Path AI</span>
                      <button
                        onClick={() => handleCopy(m.content, idx)}
                        title="Copy response"
                        className="inline-flex items-center gap-1 hover:text-[#4F46E5] transition-colors font-semibold cursor-pointer"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap break-words">{m.content}</div>
                )}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#4F46E5] bg-[#EEF2FF] p-3 rounded-xl border border-[#C7D2FE]">
              <Loader2 className="w-4 h-4 animate-spin text-[#4F46E5]" />
              <span className="font-semibold">Synthesizing database pathways & generating analysis...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">Suggested Inquiries</div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs whitespace-nowrap px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] hover:border-[#C7D2FE] hover:text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors shadow-2xs cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-[#E2E8F0] bg-white">
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
              className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="btn-primary !p-2.5 !rounded-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center text-[#64748B] mt-2">
            Future Path AI grounds recommendations in accredited educational standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantDrawer;
