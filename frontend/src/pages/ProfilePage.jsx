import React, { useState } from 'react';
import { User, CheckCircle2, ArrowRight, LogOut, Target, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useEducation } from '../context/EducationContext.jsx';
import { ChangeEducationButton, ChangeTargetJobButton } from '../components/ChangeEducation.jsx';
import api from '../services/api.js';

export const ProfilePage = () => {
  const { user, profile, saveProfile, logout, isAuthenticated } = useAuth();
  const { currentEducation, targetJob, openChangeModal, openTargetJobModal } = useEducation();

  const [name, setName] = useState(user?.name || profile?.name || 'Career Explorer');
  const [email] = useState(user?.email || 'user@example.com');
  const [specialization, setSpecialization] = useState(currentEducation?.specialization || profile?.specialization || '');
  const [currentJob, setCurrentJob] = useState(profile?.currentJob || '');
  const [location, setLocation] = useState(user?.location?.city || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Save in Auth Context & local storage
    saveProfile({
      name: name.trim(),
      specialization: specialization.trim(),
      currentJob: currentJob.trim(),
      location: location.trim()
    });

    // Sync to backend if authenticated
    try {
      await api.put('/user/profile', {
        name: name.trim(),
        specialization: specialization.trim(),
        currentJob: currentJob.trim(),
        location: { city: location.trim() }
      });
    } catch (err) {
      console.log('[ProfilePage] Backend sync:', err.message);
    }

    setLoading(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 py-2 sm:py-6 max-w-xl mx-auto">
      {/* Header */}
      <section className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your education, target job, and personal career preferences.
        </p>
      </section>

      {/* Main Form (Section 29) */}
      <form onSubmit={handleSave} className="card-clean p-6 sm:p-8 space-y-6 bg-white border border-slate-200">
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-50 cursor-not-allowed"
            />
          </div>

          {/* Current Education Card (Section 29) */}
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Current Education</span>
              </span>
              <ChangeEducationButton label="Change Education" />
            </div>
            <div className="text-lg font-extrabold text-indigo-900">
              {currentEducation.educationName || 'B.Com'}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-200 font-medium text-indigo-700">
                Status: {currentEducation.status === 'currently_studying' ? 'Currently Studying' : 'Completed'}
              </span>
              <span>Your entire future path recalculates when changed.</span>
            </div>
          </div>

          {/* Target Job Card (Section 29) */}
          <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Target Job</span>
              </span>
              <ChangeTargetJobButton label="Change Target Job" />
            </div>
            <div className="text-lg font-extrabold text-purple-900">
              {targetJob?.targetJobName || 'None Selected (Click Change to Set)'}
            </div>
            <div className="text-[11px] text-slate-500">
              Personalizes your skills to learn, capstone projects, and interview preparation.
            </div>
          </div>

          {/* Specialization (Optional - Section 29) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase text-slate-500">
                Specialization
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Optional</span>
            </div>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="e.g. Finance, Marketing, Computer Science (Optional)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Current Job (Optional - Section 29) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase text-slate-500">
                Current Job
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Optional</span>
            </div>
            <input
              type="text"
              value={currentJob}
              onChange={(e) => setCurrentJob(e.target.value)}
              placeholder="e.g. Student, Junior Associate (Optional)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Location (Optional - Section 29) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase text-slate-500">
                Location
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Optional</span>
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Hyderabad, Mumbai, Bangalore (Optional)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile and career preferences have been saved.</span>
          </div>
        )}

        {/* Submit */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-xs px-6 py-2.5"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>

          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
