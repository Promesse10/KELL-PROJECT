import axios from 'axios';

const API_BASE_URL = 'http://localhost:8009/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Existing API methods

export const fetchProducts = async (category) => {
  const response = await api.get(`/products/get-all?category=${category}`);
  return response.data.products;
};

export const fetchAllProducts = async () => {
  const response = await api.get(`/products/get-all`);
  return response.data.products;
};

export const createProduct = async (product) => {
  const response = await api.post('/products/create', product);
  return response.data;
};

// New API methods

export const deleteProduct = async (id) => {
  await api.delete(`/products/delete/${id}`);
};

export const updateProduct = async (product) => {
  const response = await api.put(`/products/${product.id}`, product);
  return response.data;
};

// Additional API methods

export const fetchOrders = async () => {
  const response = await api.get('/orders/my-orders');
  return response.data.orders;
};

export const fetchPopularProducts = async () => {
  const response = await api.get('/products/top'); 
  return response.data.products;
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

export const fetchTotalSales = async () => {
  const response = await api.get('/orders/admin/total-sales');
  return response.data;
};

export const fetchTotalOrders = async () => {
  const response = await api.get('/orders/admin/total-orders');
  return response.data;
};

export const fetchTotalCustomers = async () => {
  const response = await api.get('/orders/admin/total-customers');
  return response.data;
};

export const fetchRecentOrders = async () => {
  const response = await api.get('/orders/admin/recent-orders');
  return response.data;
};

export default api;
