import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Compass, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useEducation } from '../context/EducationContext.jsx';

export const OnboardingPage = () => {
  const { profile, saveProfile } = useAuth();
  const { changeEducation } = useEducation();
  const navigate = useNavigate();

  const studyDegrees = [
    '10th / SSC',
    '12th Science',
    '12th Commerce',
    '12th Arts',
    'Diploma',
    'ITI',
    'B.Tech',
    'B.E.',
    'BCA',
    'B.Sc',
    'B.Com',
    'BA',
    'BBA',
    'MBBS',
    'B.Pharm',
    'LLB',
    'CA',
    'CMA',
    'MBA',
    'M.Tech',
    'MCA',
    'M.Sc',
    'PhD',
    'Vocational Training',
    'Other'
  ];

  const goals = [
    { id: 'Study Further', label: '🎓 Study Further', desc: 'Find higher degrees, masters, or certifications' },
    { id: 'Get a Job', label: '💼 Get a Job', desc: 'Learn skills and prepare to enter the workforce' },
    { id: 'Both', label: '🚀 Both', desc: 'Explore higher education while preparing for jobs' },
    { id: 'Not Sure', label: '🧭 Not Sure', desc: 'Show me my complete options and possibilities' },
  ];

  const [degree, setDegree] = useState(profile?.degree || 'B.Com');
  const [status, setStatus] = useState(profile?.status || 'completed');
  const [specialization, setSpecialization] = useState(profile?.specialization || '');
  const [goal, setGoal] = useState(profile?.goal || 'Both');
  const [experience, setExperience] = useState('Fresher / Student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanDegree = (degree || '').trim();
    const cleanSpec = (specialization || '').trim();
    const fullStudyText = cleanSpec ? `${cleanDegree} ${cleanSpec}`.trim() : cleanDegree;
    
    saveProfile({
      degree: cleanDegree,
      specialization: cleanSpec,
      studyText: fullStudyText,
      status,
      goal,
      experience,
    });

    await changeEducation(fullStudyText, {
      status,
      qualificationLevel: cleanDegree,
      specialization: cleanSpec
    });

    navigate('/home');
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-10">
      <div className="card-clean p-6 sm:p-10 space-y-8 bg-white border border-slate-200">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <span>Quick Profile Setup</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tell us about your background
          </h1>
          <p className="text-sm text-slate-500">
            Takes less than 30 seconds. This helps us customize your study options, required skills, and roadmap.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Question 1: What did you study? */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              1. What did you study? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
              {studyDegrees.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setDegree(item)}
                  className={`p-2.5 text-xs font-semibold rounded-xl border text-center transition-all ${
                    degree === item
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-2xs'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Education Status (Section 1) */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900">
              Education Status <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStatus('currently_studying')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                  status === 'currently_studying'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${status === 'currently_studying' ? 'border-indigo-600' : 'border-slate-400'}`}>
                  {status === 'currently_studying' && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                </span>
                <span>Currently Studying</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('completed')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                  status === 'completed'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${status === 'completed' ? 'border-indigo-600' : 'border-slate-400'}`}>
                  {status === 'completed' && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                </span>
                <span>Completed</span>
              </button>
            </div>
          </div>

          {/* Question 2: What did you specialize in? */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-900">
                2. What did you specialize in?
              </label>
              <span className="text-xs text-slate-400 font-medium">Optional</span>
            </div>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="e.g. Computer Science, Commerce (Leave blank if not applicable)"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-xs text-slate-400 block">
              Not mandatory. If you studied 10th, 12th, or a general degree, you can leave this blank.
            </span>
          </div>

          {/* Question 3: What do you want? */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              3. What do you want to do next?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goals.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setGoal(item.id)}
                  className={`p-4 text-left rounded-xl border transition-all ${
                    goal === item.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-sm">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Optional: Experience */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Experience Level (Optional)
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Fresher / Student">Fresher / Student</option>
              <option value="1-2 Years Experience">1-2 Years Experience</option>
              <option value="3+ Years Experience">3+ Years Experience</option>
            </select>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Selected: <span className="font-bold text-slate-800">{degree} {specialization}</span>
            </div>
            <button type="submit" className="btn-primary">
              <span>View My Career Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
