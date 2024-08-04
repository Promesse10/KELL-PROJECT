import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8001/api/v1/users';

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
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
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

const fetchUserProfile = getProfile; // Alias for getProfile

export default {
  register,
  login,
  logout,
  getProfile,
  fetchUserProfile,
};
