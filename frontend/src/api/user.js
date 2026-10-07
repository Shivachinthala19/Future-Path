import api from '../services/api.js';

export const userApi = {
  getProfile: async () => {
    return await api.get('/user/profile');
  },

  updateProfile: async (data) => {
    return await api.put('/user/profile', data);
  },

  updateEducation: async (data) => {
    return await api.put('/user/education', data);
  },

  updateTargetJob: async (data) => {
    return await api.put('/user/target-job', data);
  },

  getRoadmap: async () => {
    return await api.get('/user/roadmap');
  },

  saveRoadmap: async (data) => {
    return await api.post('/user/roadmap', data);
  },

  updateRoadmapTask: async (id, data) => {
    return await api.put(`/user/roadmap/${id}`, data);
  }
};

export default userApi;
