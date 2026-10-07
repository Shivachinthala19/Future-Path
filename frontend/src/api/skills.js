import api from '../services/api.js';

export const skillsApi = {
  getAll: async (params) => {
    return await api.get('/skills', { params });
  },

  getById: async (id) => {
    return await api.get(`/skills/${id}`);
  },

  search: async (q, params = {}) => {
    return await api.get('/skills/search', { params: { q, ...params } });
  }
};

export default skillsApi;
