import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const EducationContext = createContext(null);

const DEFAULT_EDUCATION = {
  educationId: null,
  educationName: 'B.Com',
  qualificationLevel: 'Undergraduate',
  specialization: '',
  status: 'completed', // 'currently_studying' | 'completed'
  completionYear: 2024,
  country: 'India',
  region: '',
};

const DEFAULT_TARGET_JOB = {
  targetJobId: 'data-analyst',
  targetJobName: 'Data Analyst',
  category: 'Private',
  relevance: 'Possible With Additional Skills'
};

export const EducationProvider = ({ children }) => {
  const { user, profile, saveProfile } = useAuth();

  // 1. Current Education State (Section 2 & 3)
  const [currentEducation, setCurrentEducation] = useState(() => {
    try {
      const stored = localStorage.getItem('careercompass_education');
      if (stored) return JSON.parse(stored);
      if (profile?.studyText) {
        return {
          ...DEFAULT_EDUCATION,
          educationName: profile.studyText,
          qualificationLevel: profile.degree || 'Undergraduate',
          specialization: profile.specialization || '',
          status: profile.status || 'completed'
        };
      }
      return DEFAULT_EDUCATION;
    } catch {
      return DEFAULT_EDUCATION;
    }
  });

  // 2. Target Job State (Section 7, 8, 18, 19)
  const [targetJob, setTargetJob] = useState(() => {
    try {
      const stored = localStorage.getItem('careercompass_target_job');
      if (stored) return JSON.parse(stored);
      return DEFAULT_TARGET_JOB;
    } catch {
      return DEFAULT_TARGET_JOB;
    }
  });

  const [futurePathData, setFuturePathData] = useState(null);
  const [targetJobAnalysis, setTargetJobAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals & Warning States
  const [isChangeEducationModalOpen, setIsChangeEducationModalOpen] = useState(false);
  const [isChangeTargetJobModalOpen, setIsChangeTargetJobModalOpen] = useState(false);
  const [targetMismatchModal, setTargetMismatchModal] = useState({
    isOpen: false,
    newEducation: null,
    targetJobName: ''
  });

  // Helper: Check compatibility between education and target job (Section 18)
  const checkCompatibility = (eduName, jobTitle) => {
    if (!jobTitle || !eduName) return { isCompatible: true };
    const e = eduName.toLowerCase();
    const j = jobTitle.toLowerCase();

    if (j.includes('doctor') && !e.includes('mbbs')) {
      return { isCompatible: false, reason: 'Medical practitioner roles legally require an MBBS clinical degree.' };
    }
    if (j.includes('nurse') && !e.includes('nursing')) {
      return { isCompatible: false, reason: 'Nursing roles legally require a certified B.Sc / GNM Nursing degree.' };
    }
    if (j.includes('civil engineer') && !e.includes('civil') && !e.includes('tech') && !e.includes('diploma')) {
      return { isCompatible: false, reason: 'Civil Engineering structural posts mandate civil engineering qualifications.' };
    }
    return { isCompatible: true };
  };

  // Fetch full data whenever education or target job changes
  const fetchEducationData = async (eduName, jobName) => {
    const activeEdu = eduName || currentEducation.educationName || 'B.Com';
    const activeJob = jobName !== undefined ? jobName : targetJob?.targetJobName;

    setLoading(true);
    setError(null);

    try {
      // 1. Fetch Future Path
      let pathUrl = `/future-path?education=${encodeURIComponent(activeEdu)}`;
      if (activeJob) {
        pathUrl += `&targetJob=${encodeURIComponent(activeJob)}`;
      }
      const pathRes = await api.get(pathUrl);
      if (pathRes.success && pathRes.data) {
        setFuturePathData(pathRes.data);
      }

      // 2. If target job exists, fetch target-job analysis
      if (activeJob) {
        const jobRes = await api.get(`/target-job?education=${encodeURIComponent(activeEdu)}&job=${encodeURIComponent(activeJob)}`);
        if (jobRes.success && jobRes.data) {
          setTargetJobAnalysis(jobRes.data);
        }
      } else {
        setTargetJobAnalysis(null);
      }
    } catch (err) {
      console.warn('[EducationContext] Fetch warning:', err.message);
      // Fallback analyze endpoint
      try {
        const fallbackRes = await api.post('/education/analyze', {
          study: activeEdu,
          status: currentEducation.status || 'completed',
          country: currentEducation.country || 'India',
        });
        if (fallbackRes.success && fallbackRes.data) {
          setFuturePathData({
            education: fallbackRes.data.currentEducation,
            studyNext: fallbackRes.data.studyOptions || [],
            careers: fallbackRes.data.careerFields || [],
            jobs: fallbackRes.data.jobOptions || [],
            skills: fallbackRes.data.skills || [],
            careerPaths: fallbackRes.data.careerPaths || [],
            counts: fallbackRes.data.counts || {},
            summary: fallbackRes.data.summary || '',
          });
        }
      } catch (fErr) {
        setError(fErr.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducationData(currentEducation.educationName, targetJob?.targetJobName);
  }, [currentEducation.educationName, targetJob?.targetJobName]);

  // Section 18: Change Education at any time
  const changeEducation = async (newStudyName, extra = {}) => {
    if (!newStudyName || !newStudyName.trim()) return;

    const trimmed = newStudyName.trim();
    const updatedEdu = {
      ...currentEducation,
      educationName: trimmed,
      qualificationLevel: extra.qualificationLevel || currentEducation.qualificationLevel || "Bachelor's Degree",
      specialization: extra.specialization !== undefined ? extra.specialization : (currentEducation.specialization || ''),
      status: extra.status || currentEducation.status || 'completed',
      completionYear: extra.completionYear || currentEducation.completionYear || 2024,
      educationId: extra.educationId || null,
      country: extra.country || 'India',
      region: extra.region || '',
    };

    setCurrentEducation(updatedEdu);
    localStorage.setItem('careercompass_education', JSON.stringify(updatedEdu));

    // Profile sync
    saveProfile({
      studyText: trimmed,
      degree: updatedEdu.qualificationLevel,
      specialization: updatedEdu.specialization,
      status: updatedEdu.status
    });

    // Notify backend if authenticated
    try {
      await api.put('/user/education', {
        educationName: trimmed,
        educationId: extra.educationId,
      });
    } catch (e) {
      // Non-blocking sync
    }

    // Check target job compatibility (Section 18)
    if (targetJob?.targetJobName) {
      const compat = checkCompatibility(trimmed, targetJob.targetJobName);
      if (!compat.isCompatible) {
        setTargetMismatchModal({
          isOpen: true,
          newEducation: trimmed,
          targetJobName: targetJob.targetJobName,
          reason: compat.reason
        });
      }
    }

    setToastMessage(`Education changed to ${trimmed}. Personalizing your career path...`);
    setTimeout(() => setToastMessage(null), 3500);

    await fetchEducationData(trimmed, targetJob?.targetJobName);
  };

  // Section 19: Change Target Job at any time
  const changeTargetJob = async (newJobName, extra = {}) => {
    if (!newJobName || !newJobName.trim()) return;

    const trimmedJob = newJobName.trim();
    const updatedTarget = {
      targetJobId: extra.targetJobId || trimmedJob.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      targetJobName: trimmedJob,
      category: extra.category || 'Private',
      relevance: extra.relevance || 'Directly Related'
    };

    setTargetJob(updatedTarget);
    localStorage.setItem('careercompass_target_job', JSON.stringify(updatedTarget));

    try {
      await api.put('/user/target-job', {
        targetJobName: trimmedJob,
        targetJobId: updatedTarget.targetJobId,
        category: updatedTarget.category
      });
    } catch (e) {
      // Non-blocking sync
    }

    setToastMessage(`Target job set to ${trimmedJob}. Personalizing roadmap and skills...`);
    setTimeout(() => setToastMessage(null), 3500);

    await fetchEducationData(currentEducation.educationName, trimmedJob);
  };

  // Remove target job to browse all jobs for education
  const removeTargetJob = async () => {
    setTargetJob(null);
    localStorage.removeItem('careercompass_target_job');
    setToastMessage(`Cleared target job. Showing all eligible careers for ${currentEducation.educationName}.`);
    setTimeout(() => setToastMessage(null), 3500);
    await fetchEducationData(currentEducation.educationName, null);
  };

  return (
    <EducationContext.Provider
      value={{
        currentEducation,
        targetJob,
        futurePathData,
        targetJobAnalysis,
        loading,
        error,
        toastMessage,
        changeEducation,
        changeTargetJob,
        removeTargetJob,
        fetchEducationData,
        isChangeEducationModalOpen,
        openChangeModal: () => setIsChangeEducationModalOpen(true),
        closeChangeModal: () => setIsChangeEducationModalOpen(false),
        isChangeTargetJobModalOpen,
        openTargetJobModal: () => setIsChangeTargetJobModalOpen(true),
        closeTargetJobModal: () => setIsChangeTargetJobModalOpen(false),
        targetMismatchModal,
        dismissMismatchModal: () => setTargetMismatchModal(prev => ({ ...prev, isOpen: false }))
      }}
    >
      {children}
    </EducationContext.Provider>
  );
};

export const useEducation = () => {
  const context = useContext(EducationContext);
  if (!context) {
    throw new Error('useEducation must be used within an EducationProvider');
  }
  return context;
};
