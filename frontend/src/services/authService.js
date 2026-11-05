import api from './api.js';

export const authService = {
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password });
  },

  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },

  getMe: async () => {
    return await api.get('/auth/me');
  },

  updateProfile: async (profileData) => {
    return await api.put('/auth/profile', profileData);
  },

  logout: () => {
    localStorage.removeItem('futurepath_token');
    localStorage.removeItem('futurepath_user');
    localStorage.removeItem('futurepath_profile');
    localStorage.removeItem('careercompass_token');
    localStorage.removeItem('careercompass_user');
    localStorage.removeItem('careercompass_profile');
  }
};
