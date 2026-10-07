import api from '../services/api.js';

export const authApi = {
  login: async (credentials) => {
    return await api.post('/auth/login', credentials);
  },

  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },

  getCurrentUser: async () => {
    return await api.get('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('futurepath_token');
    localStorage.removeItem('careercompass_token');
  }
};

export default authApi;
