import api from '../services/api.js';

export const careersApi = {
  getAll: async (params) => {
    return await api.get('/careers', { params });
  },

  getById: async (id) => {
    return await api.get(`/careers/${id}`);
  },

  getCareerPathway: async (id) => {
    return await api.get(`/careers/${id}`);
  }
};

export default careersApi;
