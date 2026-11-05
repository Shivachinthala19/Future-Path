import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Eye,
  EyeOff,
  Sparkles,
  User,
  Lock,
  BookOpen,
  Target,
  Check,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useEducation } from '../context/EducationContext.jsx';
import { FuturePathLogo } from '../components/common/FuturePathLogo.jsx';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { changeEducation, changeTargetJob, setToastMessage } = useEducation();

  // Step state: 1 = Credentials, 2 = Education Details
  const [step, setStep] = useState(1);

  // Step 1: Credentials
  const [identifier, setIdentifier] = useState('Shiva'); // Username or email
  const [password, setPassword] = useState('FuturePath2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Step 2: Education Details
  const [selectedDegree, setSelectedDegree] = useState('B.Tech Computer Science');
  const [customDegree, setCustomDegree] = useState('');
  const [status, setStatus] = useState('currently_studying'); // 'currently_studying' | 'completed'
  const [specialization, setSpecialization] = useState('Computer Science & Engineering');
  const [selectedTargetJob, setSelectedTargetJob] = useState('Software Development Engineer (SDE)');

  // Quick Degree Options
  const popularDegrees = [
    'B.Tech Computer Science',
    'B.Com (Finance & Accounts)',
    'BCA (Computer Applications)',
    'B.Sc (Data Science / IT)',
    'BBA (Business Management)',
    'MBBS (Medicine)',
    '12th Science (PCM / PCB)',
    '12th Commerce',
    'B.A. (Economics / Arts)',
    'B.Tech Mechanical / Civil'
  ];

  // Quick Target Goal Options
  const popularGoals = [
    'Software Development Engineer (SDE)',
    'Data Analyst',
    'Civil Services (IAS / IPS)',
    'Chartered Accountant (CA)',
    'Product Designer (UI/UX)',
    'Explore All Pathways'
  ];

  // Extract display name from username or email
  const getDisplayName = () => {
    if (!identifier.trim()) return 'Explorer';
    const clean = identifier.trim();
    if (clean.includes('@')) {
      const part = clean.split('@')[0];
      return part.charAt(0).toUpperCase() + part.slice(1);
    }
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  // Handle Step 1 -> Advance to Step 2
  const handleStep1Submit = (e) => {
    e?.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Please enter your username or email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setStep(2);
  };

  // Handle Step 2 -> Save Education and Launch Personalized Dashboard
  const handleCompleteLogin = async (e) => {
    e?.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const activeDegree = customDegree.trim() ? customDegree.trim() : selectedDegree;
      const displayName = getDisplayName();

      // 1. Authenticate user in AuthContext
      await login(identifier.trim(), password.trim(), displayName);

      // 2. Set education details in EducationContext
      await changeEducation(activeDegree, {
        status: status,
        specialization: specialization.trim()
      });

      // 3. Set target job if selected
      if (selectedTargetJob && selectedTargetJob !== 'Explore All Pathways') {
        changeTargetJob(selectedTargetJob);
      }

      // 4. Set welcome toast
      if (setToastMessage) {
        setToastMessage(`🎉 Welcome back, ${displayName}! Your home page is customized for ${activeDegree}.`);
      }

      // 5. Navigate to Home Page / Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('[LoginPage] Error finalizing login:', err);
      setError(err.message || 'Unable to complete sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setIdentifier('Shiva');
    setPassword('FuturePath2026!');
    setSelectedDegree('B.Tech Computer Science');
    setStatus('currently_studying');
    setSpecialization('Artificial Intelligence & Machine Learning');
    setSelectedTargetJob('Software Development Engineer (SDE)');
    setError(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
      <div className="w-full max-w-xl p-6 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-6">
        {/* Top Logo & Stepper Indicator */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <FuturePathLogo size={46} showTagline={false} />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] text-[11px] font-extrabold tracking-wide uppercase">
            <span>Step {step} of 2</span>
            <span>•</span>
            <span>{step === 1 ? 'Account Identification' : 'Education Profile'}</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {step === 1 ? 'Sign In to Future Path' : `Welcome, ${getDisplayName()}!`}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-md mx-auto">
              {step === 1
                ? 'Enter your username or email to access your personalized pathway.'
                : 'Select your education details to customize your home page and career roadmap.'}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 1: USERNAME / EMAIL & PASSWORD FORM                     */}
        {/* ============================================================ */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4 animate-in fade-in duration-200">
            {/* Username or Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Username or Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-4 h-4 text-[#4F46E5]" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. Shiva or shiva@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-[#F8FAFC]/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-slate-400 font-medium">Secured</span>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4 h-4 text-[#4F46E5]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-[#F8FAFC]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Next Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer pt-3"
            >
              <span>Continue to Education Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Demo Quick Fill */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-[#4F46E5] hover:text-[#3730A3] font-bold cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Demo Profile (Shiva)</span>
              </button>
              <Link to="/register" className="text-slate-500 hover:text-slate-800 font-medium">
                New user? Register
              </Link>
            </div>
          </form>
        )}

        {/* ============================================================ */}
        {/* STEP 2: EDUCATION DETAILS FORM                               */}
        {/* ============================================================ */}
        {step === 2 && (
          <form onSubmit={handleCompleteLogin} className="space-y-5 animate-in fade-in duration-200">
            {/* 1. Academic Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Your Current Study Status
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setStatus('currently_studying')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    status === 'currently_studying'
                      ? 'bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5] shadow-2xs'
                      : 'bg-[#F8FAFC] border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">Currently Studying</div>
                    <div className="text-[10px] text-slate-500">Pursuing coursework</div>
                  </div>
                  {status === 'currently_studying' && <CheckCircle2 className="w-4 h-4 text-[#4F46E5]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('completed')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    status === 'completed'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                      : 'bg-[#F8FAFC] border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">Completed / Graduated</div>
                    <div className="text-[10px] text-slate-500">Degree finished</div>
                  </div>
                  {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>
            </div>

            {/* 2. Degree Selection (Pills + Custom Input) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Select or Enter Degree
                </label>
                <span className="text-[11px] text-[#4F46E5] font-semibold flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Primary Baseline</span>
                </span>
              </div>

              {/* Quick Popular Pills */}
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 rounded-xl bg-slate-50/70 border border-slate-200/80">
                {popularDegrees.map((degree) => {
                  const isSelected = selectedDegree === degree && !customDegree.trim();
                  return (
                    <button
                      key={degree}
                      type="button"
                      onClick={() => {
                        setSelectedDegree(degree);
                        setCustomDegree('');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#4F46E5] text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50/50'
                      }`}
                    >
                      {degree}
                    </button>
                  );
                })}
              </div>

              {/* Or Custom Typing */}
              <input
                type="text"
                value={customDegree}
                onChange={(e) => setCustomDegree(e.target.value)}
                placeholder="Or type any degree (e.g. B.Tech Artificial Intelligence, B.Com Honors)..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-[#F8FAFC]/50 transition-all"
              />
            </div>

            {/* 3. Specialization (Optional) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Specialization / Branch <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="e.g. Artificial Intelligence, Accounting, Marketing, Mechanical"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-[#F8FAFC]/50 transition-all"
              />
            </div>

            {/* 4. Target Career Role */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                4. Target Career Goal <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {popularGoals.map((role) => {
                  const isSelected = selectedTargetJob === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedTargetJob(role)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-2xs font-bold'
                          : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit & Back Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Personalizing Dashboard...' : 'Enter My Future Path'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
