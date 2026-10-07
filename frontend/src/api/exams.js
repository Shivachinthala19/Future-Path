import api from '../services/api.js';

export const examsApi = {
  getAll: async (params) => {
    return await api.get('/exams', { params });
  },

  getById: async (id) => {
    return await api.get(`/exams/${id}`);
  },

  search: async (q, params = {}) => {
    return await api.get('/exams/search', { params: { q, ...params } });
  }
};

export default examsApi;
