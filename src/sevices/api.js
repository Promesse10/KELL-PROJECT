import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8009/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchProducts = async (category) => {
  try {
    const response = await api.get(`/products/get-all?category=${category}`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await api.get('/products/get-all');
    return response.data.products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post('/products/create', product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/delete/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (product) => {
  try {
    const response = await api.put(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await api.get('/orders/my-orders');
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const fetchPopularProducts = async () => {
  try {
    const response = await api.get('/products/top');
    return response.data.products;
  } catch (error) {
    console.error("Error fetching popular products:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('/category/get-all');
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await api.post('/category/create', category);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users/get-all');
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchTotalSales = async () => {
  try {
    const response = await api.get('/orders/admin/total-sales');
    return response.data.totalSales; // Ensure it returns the correct data
  } catch (error) {
    console.error("Error fetching total sales:", error);
    throw error;
  }
};

export const fetchTotalOrders = async () => {
  try {
    const response = await api.get('/orders/admin/total-orders');
    return response.data.totalOrders; // Ensure it returns the correct data
  } catch (error) {
    console.error("Error fetching total orders:", error);
    throw error;
  }
};

export const fetchTotalCustomers = async () => {
  try {
    const response = await api.get('/orders/admin/total-customers');
    return response.data.totalCustomers; // Ensure it returns the correct data
  } catch (error) {
    console.error("Error fetching total customers:", error);
    throw error;
  }
};

export const fetchRecentOrders = async () => {
  try {
    const response = await api.get('/orders/admin/recent-orders');
    return response.data.recentOrders; // Ensure it returns the correct data
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    throw error;
  }
};

export default api;
