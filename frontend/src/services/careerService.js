import api from './api.js';

export const careerService = {
  // Signature AI Future Path
  analyzeFuturePath: async (payload) => {
    return await api.post('/career/analyze', payload);
  },

  recalculateFuturePath: async (payload) => {
    return await api.post('/career/recalculate', payload);
  },

  getSkillGap: async (payload) => {
    return await api.post('/career/skill-gap', payload);
  },

  generateRoadmap: async (payload) => {
    return await api.post('/career/roadmap/generate', payload);
  },

  getRoadmap: async () => {
    return await api.get('/career/roadmap');
  },

  updateRoadmapTask: async (taskId, completed) => {
    return await api.put(`/career/roadmap/tasks/${taskId}`, { completed });
  },

  getDailyMissions: async () => {
    return await api.get('/career/daily-mission');
  },

  completeDailyMission: async (missionId) => {
    return await api.post(`/career/daily-mission/${missionId}/complete`);
  },

  analyzeResume: async (resumeText, targetJob) => {
    return await api.post('/career/resume/analyze', { resumeText, targetJob });
  },

  startInterview: async (targetRole, interviewType, difficulty) => {
    return await api.post('/career/interview/start', { targetRole, interviewType, difficulty });
  },

  submitInterviewAnswer: async (sessionId, questionIndex, userAnswer) => {
    return await api.post('/career/interview/answer', { sessionId, questionIndex, userAnswer });
  }
};
