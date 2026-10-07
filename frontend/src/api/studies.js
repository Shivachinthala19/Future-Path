import api from '../services/api.js';

export const studiesApi = {
  getAll: async (params) => {
    return await api.get('/studies', { params });
  },

  getById: async (id) => {
    return await api.get(`/studies/${id}`);
  },

  search: async (q, params = {}) => {
    return await api.get('/studies/search', { params: { q, ...params } });
  },

  getStudyNext: async (education) => {
    return await api.get('/study-next', { params: { education } });
  },

  getHigherStudies: async (id) => {
    return await api.get(`/studies/${id}/higher-studies`);
  },

  getCareersForStudy: async (id) => {
    return await api.get(`/studies/${id}/careers`);
  },

  getJobsForStudy: async (id) => {
    return await api.get(`/studies/${id}/jobs`);
  }
};

export default studiesApi;
