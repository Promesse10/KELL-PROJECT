import axios from '../../axiosConfig'; // Use the axios instance with headers

const API_URL = '/users';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData);
  return response.data;
};

const resetPassword = async (resetData) => {
  const response = await axios.post(`${API_URL}/reset-password`, resetData);
  return response.data;
};

const authService = {
  register,
  login,
  getProfile,
  updateProfile,
  resetPassword,
};

export default authService;
