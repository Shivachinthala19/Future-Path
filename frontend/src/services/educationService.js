import api from './api.js';

export const educationService = {
  getEducations: async (params) => {
    return await api.get('/education', { params });
  },

  searchEducations: async (q) => {
    return await api.get('/education/search', { params: { q } });
  },

  getEducationById: async (id) => {
    return await api.get(`/education/${id}`);
  },

  getStudies: async (params) => {
    return await api.get('/studies', { params });
  },

  getStudyPrograms: async (params) => {
    return await api.get('/study-options', { params });
  },

  getStudyProgramById: async (id) => {
    return await api.get(`/studies/${id}`);
  },

  getCareers: async (params) => {
    return await api.get('/careers', { params });
  },

  getCareerById: async (id) => {
    return await api.get(`/careers/${id}`);
  },

  getJobs: async (params) => {
    return await api.get('/jobs/related', { params });
  },

  getJobById: async (id) => {
    return await api.get(`/jobs/${id}`);
  },

  getExams: async (params) => {
    return await api.get('/exams', { params });
  },

  getSkills: async (params) => {
    return await api.get('/skills', { params });
  },

  getCertifications: async (params) => {
    return await api.get('/certifications', { params });
  },

  getOpportunities: async (params) => {
    return await api.get('/opportunities', { params });
  },

  getTwin: async () => {
    return await api.get('/career-twin/me');
  },

  updateTwin: async (data) => {
    return await api.put('/career-twin/me', data);
  },

  getPublicPassport: async (slug) => {
    return await api.get(`/career-twin/passport/${slug}`);
  },

  sendAiChat: async (message, context) => {
    return await api.post('/ai/chat', { message, context });
  },

  getAdminStats: async () => {
    return await api.get('/admin/stats');
  }
};

export default educationService;
