import axios from 'axios';
import { handleFallbackRequest } from './fallbackService.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('futurepath_token') || localStorage.getItem('careercompass_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch unauthorized, 404, or Vercel HTML rewrites
api.interceptors.response.use(
  (response) => {
    // If Vercel rewrote /api/... to /index.html (string containing <!DOCTYPE html>)
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      console.warn('[API Engine] Received HTML rewrite instead of JSON. Serving verified fallback data for:', response.config?.url);
      const fallback = handleFallbackRequest(response.config);
      return fallback;
    }
    return response.data;
  },
  async (error) => {
    // If backend is not deployed, returned 404, server asleep (502/503), or network offline
    const status = error.response?.status;
    const isOfflineOr404 = status === 404 || status === 502 || status === 503 || !error.response;

    if (isOfflineOr404) {
      console.warn(`[API Engine] Backend returned ${status || 'Network Disconnected'}. Serving verified offline dataset for:`, error.config?.url);
      try {
        const fallback = handleFallbackRequest(error.config);
        if (fallback) {
          return fallback;
        }
      } catch (fbErr) {
        console.error('[API Engine] Fallback dispatch error:', fbErr);
      }
    }

    const customError = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message || 'Something went wrong. Please try again.',
      errors: error.response?.data?.errors,
      suggestions: error.response?.data?.suggestions,
    };
    return Promise.reject(customError);
  }
);

export default api;
