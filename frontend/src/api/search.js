import api from '../services/api.js';

export const searchApi = {
  universalSearch: async (q, params = {}) => {
    return await api.get('/search', { params: { q, ...params } });
  }
};

export default searchApi;
