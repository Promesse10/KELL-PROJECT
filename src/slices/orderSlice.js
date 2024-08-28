import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchOrders,
  fetchTotalSales,
  fetchTotalOrders,
  fetchTotalCustomers,
  fetchRecentOrders,
  fetchPopularProducts,
  processPayment,
  fetchAllOrders,
  changeOrderStatus,
  createOrder as apiCreateOrder,
} from '../sevices/api';

// Define the async thunks
export const getOrders = createAsyncThunk('orders/getOrders', fetchOrders);
export const getTotalSales = createAsyncThunk('orders/getTotalSales', fetchTotalSales);
export const getTotalOrders = createAsyncThunk('orders/getTotalOrders', fetchTotalOrders);
export const getTotalCustomers = createAsyncThunk('orders/getTotalCustomers', fetchTotalCustomers);
export const getRecentOrders = createAsyncThunk('orders/getRecentOrders', fetchRecentOrders);
export const getPopularProducts = createAsyncThunk('orders/getPopularProducts', fetchPopularProducts);
export const payForOrder = createAsyncThunk('orders/payForOrder', processPayment);
export const createOrder = createAsyncThunk('orders/createOrder', apiCreateOrder);
export const getAllOrders = createAsyncThunk('orders/getAllOrders', fetchAllOrders);
export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ orderId, status }) => {
  return await changeOrderStatus(orderId, status);
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    recentOrders: [], // Ensure this is an empty array
    popularProducts: [],
    paymentStatus: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getTotalSales.fulfilled, (state, action) => {
        state.totalSales = action.payload;
      })
      .addCase(getTotalOrders.fulfilled, (state, action) => {
        state.totalOrders = action.payload;
      })
      .addCase(getTotalCustomers.fulfilled, (state, action) => {
        state.totalCustomers = action.payload;
      })
      .addCase(getRecentOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recentOrders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getRecentOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getPopularProducts.fulfilled, (state, action) => {
        state.popularProducts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(payForOrder.fulfilled, (state, action) => {
        state.paymentStatus = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.meta.arg;
        const order = state.orders.find(order => order.id === orderId);
        if (order) {
          order.status = status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
