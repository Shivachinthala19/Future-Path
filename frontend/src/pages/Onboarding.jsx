import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const Onboarding = () => {
  const { changeEducation, currentEducation } = useEducation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Select study, 2: Confirm, 3: Optional info
  const [studyInput, setStudyInput] = useState(currentEducation.educationName || '');
  const [specialization, setSpecialization] = useState('');
  const [college, setCollege] = useState('');
  const [country, setCountry] = useState('India');
  const [completionYear, setCompletionYear] = useState('');

  const sampleStudies = [
    '10th',
    '12th Science',
    '12th Commerce',
    'B.Com',
    'B.Tech Computer Science',
    'B.Sc',
    'MBA',
    'ITI Electrician',
    'Diploma Mechanical',
    'MCA',
    'MBBS',
    'Nursing',
    'Law (LLB)',
    'B.Pharm',
    'BA Psychology',
  ];

  const handleStudySubmit = (selected) => {
    const chosen = selected || studyInput;
    if (!chosen.trim()) return;
    setStudyInput(chosen.trim());
    setStep(2); // Move to confirmation
  };

  const handleConfirm = () => {
    setStep(3); // Move to optional info
  };

  const handleFinish = async (e) => {
    e?.preventDefault();
    await changeEducation(studyInput.trim(), {
      specialization: specialization.trim(),
      country,
      college: college.trim(),
      completionYear: completionYear ? parseInt(completionYear, 10) : undefined,
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12">
      <div className="card-clean p-6 sm:p-10 bg-white border border-slate-200 space-y-6">
        {/* Step 1: What did you study? */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                Step 1 of 3
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome to Future Path 👋
              </h1>
              <p className="text-sm text-slate-600">
                Let's start with what you studied. What did you study?
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStudySubmit();
              }}
              className="space-y-3"
            >
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studyInput}
                  onChange={(e) => setStudyInput(e.target.value)}
                  placeholder="Search your study or qualification (e.g. B.Com, B.Tech, ITI, 10th)..."
                  autoFocus
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={!studyInput.trim()}
                className="w-full btn-primary py-3 text-sm disabled:opacity-40"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Popular suggestions */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Popular Studies:
              </div>
              <div className="flex flex-wrap gap-2">
                {sampleStudies.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStudySubmit(s)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <div className="space-y-6 text-center py-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Your Education
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {studyInput}
              </div>
              <p className="text-xs text-slate-500">
                Is this correct?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary text-xs px-5 py-2.5"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="btn-primary text-xs px-6 py-2.5"
              >
                <span>Yes, Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Optional Education Information (Section 4) */}
        {step === 3 && (
          <form onSubmit={handleFinish} className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                Step 3 of 3 (All Optional)
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Additional Details (Optional)
              </h2>
              <p className="text-xs text-slate-500">
                You can leave all of these blank and jump straight to your career path.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Specialization / Stream (Optional)
                </label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. Computer Science, Accounting, Electrical (Optional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  College / Institution (Optional)
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Delhi University, IIT, State Board (Optional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Country (Optional)
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="India"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Completion Year (Optional)
                  </label>
                  <input
                    type="number"
                    value={completionYear}
                    onChange={(e) => setCompletionYear(e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                ← Back
              </button>
              <button type="submit" className="btn-primary text-xs px-6 py-2.5">
                <span>Go to My Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
