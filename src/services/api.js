import api from "../../axiosConfig";

export const fetchProducts = async (category, searchTerm = "") => {
  try {
    const response = await api.get(
      `/products/get-all?category=${category}&search=${searchTerm}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await api.get("/products/get-all");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post("/products/create", product);
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
    const response = await api.get("/orders/my-orders");
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders/create", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchPopularProducts = async () => {
  try {
    const response = await api.get("/products/top");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching popular products:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get("/category/get-all");
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await api.post("/category/create", category);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get("/users/all");
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchTotalSales = async () => {
  try {
    const response = await api.get("/orders/admin/total-sales");
    return response.data.totalSales;
  } catch (error) {
    console.error("Error fetching total sales:", error);
    throw error;
  }
};

export const fetchTotalOrders = async () => {
  try {
    const response = await api.get("/orders/admin/total-orders");
    return response.data.totalOrders;
  } catch (error) {
    console.error("Error fetching total orders:", error);
    throw error;
  }
};

export const fetchTotalCustomers = async () => {
  try {
    const response = await api.get("/orders/admin/total-customers");
    return response.data.totalCustomers;
  } catch (error) {
    console.error("Error fetching total customers:", error);
    throw error;
  }
};

export const fetchRecentOrders = async () => {
  try {
    const response = await api.get("/orders/admin/recent-orders");
    return response.data.recentOrders;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    throw error;
  }
};

export const processPayment = async (paymentData) => {
  try {
    const response = await api.post("/orders/payments", paymentData);
    return response.data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};

// Fetch all orders for admin
export const fetchAllOrders = async () => {
  try {
    const response = await api.get("/orders/admin/get-all-orders");
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

// Change order status (admin)
export const changeOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/orders/admin/order/${orderId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing order status:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await api.delete(`/category/delete/${id}`);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const updateCategory = async (id, updatedCategory) => {
  try {
    const response = await api.put(`/category/update/${id}`, {
      updatedCategory,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export default api;
