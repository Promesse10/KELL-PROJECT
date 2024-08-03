import axios from 'axios';
import Cookies from 'js-cookie';


const API_URL = 'http://localhost:8001/api/v1/users';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    Cookies.set('token', response.data.token, { expires: 15 });
  }
  return response.data;
};

const logout = () => {
  Cookies.remove('token');
};

const getProfile = async () => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const fetchUserProfile = getProfile; // Alias for getProfile

export default {
  register,
  login,
  logout,
  getProfile,
  fetchUserProfile,
};
