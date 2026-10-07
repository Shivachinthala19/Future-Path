import api from '../services/api.js';

export const certificationsApi = {
  getAll: async (params) => {
    return await api.get('/certifications', { params });
  },

  getById: async (id) => {
    return await api.get(`/certifications/${id}`);
  },

  search: async (q, params = {}) => {
    return await api.get('/certifications/search', { params: { q, ...params } });
  }
};

export default certificationsApi;
