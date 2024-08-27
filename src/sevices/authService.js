import api from '../../axiosConfig';
import Cookies from 'js-cookie';

const register = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
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
  Cookies.remove('user');
};

const getProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile');
  }
};

const updateProfile = async (userData) => {
  try {
    const response = await api.put('/users/profile-update', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

const updatePassword = async (passwordData) => {
  try {
    const response = await api.put('/users/update-password', passwordData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update password');
  }
};

const updateProfilePic = async (formData) => {
  try {
    const response = await api.put('/users/update-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile picture');
  }
};

const resetPassword = async (resetData) => {
  try {
    const response = await api.post('/users/forget-password', resetData);
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
  updateProfile,
  updatePassword,
  updateProfilePic,
  resetPassword,
};
