import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8009/api/v1/users';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    Cookies.set('user', JSON.stringify(response.data), { expires: 7 }); // Store for 7 days
  }
  return response.data;
};

const logout = () => {
  Cookies.remove('user');
};

const getProfile = async () => {
  const user = JSON.parse(Cookies.get('user') || '{}');
  if (!user || !user.token) {
    throw new Error('No token found');
  }

  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};

const getStoredUser = () => {
  return JSON.parse(Cookies.get('user') || '{}');
};

// Add resetPassword method
const resetPassword = async (resetData) => {
  const response = await axios.post(`${API_URL}/forget-password`, resetData);
  return response.data;
};

export default {
  register,
  login,
  logout,
  getProfile,
  getStoredUser,
  resetPassword, 
};
