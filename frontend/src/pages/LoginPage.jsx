import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  GraduationCap,
  Eye,
  EyeOff,
  User,
  Lock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useEducation } from '../context/EducationContext.jsx';
import { FuturePathLogo } from '../components/common/FuturePathLogo.jsx';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { changeEducation, setToastMessage } = useEducation();

  // Credentials
  const [identifier, setIdentifier] = useState(''); // Name or email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Education baseline for home dashboard
  const [selectedDegree, setSelectedDegree] = useState('B.Tech Computer Science');
  const [customDegree, setCustomDegree] = useState('');

  // Quick Degree Options
  const popularDegrees = [
    'B.Tech Computer Science',
    'B.Com (Finance & Accounts)',
    'BCA (Computer Applications)',
    'B.Sc (Data Science / IT)',
    'BBA (Business Management)',
    '12th Science (PCM / PCB)',
    '12th Commerce',
    'B.A. (Economics / Arts)',
    'MBBS (Medicine)'
  ];

  // Format clean display name
  const getDisplayName = () => {
    if (!identifier.trim()) return 'Explorer';
    const clean = identifier.trim();
    if (clean.includes('@')) {
      const part = clean.split('@')[0];
      return part.charAt(0).toUpperCase() + part.slice(1);
    }
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  const handleSignIn = async (e) => {
    e?.preventDefault();
    setError(null);

    const cleanId = identifier.trim();
    const cleanPass = password.trim();

    if (!cleanId) {
      setError('Please enter your name or email address.');
      return;
    }
    if (!cleanPass) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const activeDegree = customDegree.trim() ? customDegree.trim() : selectedDegree;
      const displayName = getDisplayName();

      // Sign in locally (no database requirement)
      await login(cleanId, cleanPass, displayName);

      // Save user education details for personalized home page (non-blocking)
      if (activeDegree) {
        try {
          changeEducation(activeDegree, {
            status: 'currently_studying',
            specialization: ''
          });
        } catch (e) {
          console.warn('[LoginPage] Education preset notice:', e);
        }
      }

      if (setToastMessage) {
        setToastMessage(`👋 Welcome, ${displayName}! Signed in successfully.`);
      }

      // Enter website home page immediately
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('[LoginPage] Sign in error:', err);
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
      <div className="w-full max-w-xl p-6 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <FuturePathLogo size={46} showTagline={false} />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Sign In to Future Path
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-md mx-auto">
              Enter your name or email and password to enter the website.
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

        {/* Direct Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Name or Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Name or Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-4 h-4 text-[#4F46E5]" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your name or email"
                required
                autoFocus
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
                placeholder="Enter your password"
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

          {/* Education Details */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Your Education / Degree
              </label>
              <span className="text-[11px] text-[#4F46E5] font-semibold flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Customizes Home</span>
              </span>
            </div>

            {/* Quick Degree Pills */}
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1.5 rounded-xl bg-slate-50/70 border border-slate-200/80">
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
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#4F46E5] text-white shadow-2xs font-bold'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50/50'
                    }`}
                  >
                    {degree}
                  </button>
                );
              })}
            </div>

            {/* Custom Degree Input */}
            <input
              type="text"
              value={customDegree}
              onChange={(e) => setCustomDegree(e.target.value)}
              placeholder="Or type any degree (e.g. B.Tech Artificial Intelligence, B.Com)..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-[#F8FAFC]/50 transition-all"
            />
          </div>

          {/* Sign In Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Instant client sign-in — enter your details to launch your personalized pathways.</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
