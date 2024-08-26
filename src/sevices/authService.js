import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8009/api/v1/users';

// Create axios instance with token interceptor
const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    console.log('Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const register = async (userData) => {
  try {
    const response = await instance.post('/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const login = async (email, password) => {
  try {
    const response = await instance.post('/login', { email, password });
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 15 });
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const logout = () => {
  Cookies.remove('token');
};

const getProfile = async () => {
  try {
    const response = await instance.get('/profile');
    return response.data; 
    
    
  } catch (error) {
    throw new Error('Failed to fetch profile');
  }
};

// Add resetPassword method
const resetPassword = async (resetData) => {
  try {
    const response = await instance.post('/forget-password', resetData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};

export default {
  register,
  login,
  logout,
  getProfile,
  resetPassword,
};
