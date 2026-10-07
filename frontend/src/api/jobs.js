import api from '../services/api.js';

export const jobsApi = {
  getAll: async (params) => {
    return await api.get('/jobs', { params });
  },

  getById: async (id) => {
    return await api.get(`/jobs/${id}`);
  },

  search: async (q, params = {}) => {
    return await api.get('/jobs/search', { params: { q, ...params } });
  },

  getEligible: async (params) => {
    return await api.get('/jobs/eligible', { params });
  },

  getRelated: async (params) => {
    return await api.get('/jobs/related', { params });
  },

  getEducationRoutes: async (id) => {
    return await api.get(`/jobs/${id}/education-routes`);
  },

  getSkills: async (id) => {
    return await api.get(`/jobs/${id}/skills`);
  },

  getRoadmap: async (id) => {
    return await api.get(`/jobs/${id}/roadmap`);
  },

  getCareerGrowth: async (id) => {
    return await api.get(`/jobs/${id}/career-growth`);
  }
};

export default jobsApi;
