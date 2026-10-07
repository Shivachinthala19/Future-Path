import axios from 'axios';

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

// Response interceptor to catch unauthorized or errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
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
