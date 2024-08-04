import axios from 'axios';

const API_BASE_URL = 'http://localhost:8009/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchProducts = async (category) => {
  const response = await api.get(`/products/get-all`);
  return response.data.products;
};

export const createProduct = async (product) => {
  const response = await api.post('/products/create', product);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get('/orders/my-orders');
  return response.data.orders;
};

export const fetchCategories = async () => {
  const response = await api.get('/category/get-all');
  return response.data.categories;
};

export const createCategory = async (category) => {
  const response = await api.post('/category/create', category);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get('/users/get-all');
  return response.data.users;
};

export default api;