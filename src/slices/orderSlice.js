import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchOrders,
  fetchTotalSales,
  fetchTotalOrders,
  fetchTotalCustomers,
  fetchRecentOrders,
  fetchPopularProducts 
} from '../sevices/api';

export const getOrders = createAsyncThunk('orders/getOrders', fetchOrders);
export const getTotalSales = createAsyncThunk('orders/getTotalSales', fetchTotalSales);
export const getTotalOrders = createAsyncThunk('orders/getTotalOrders', fetchTotalOrders);
export const getTotalCustomers = createAsyncThunk('orders/getTotalCustomers', fetchTotalCustomers);
export const getRecentOrders = createAsyncThunk('orders/getRecentOrders', fetchRecentOrders);
export const getPopularProducts = createAsyncThunk('orders/getPopularProducts', fetchPopularProducts); // Add this line

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    recentOrders: [],
    popularProducts: [],
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
        state.recentOrders = action.payload;
      })
      .addCase(getPopularProducts.fulfilled, (state, action) => {
        state.popularProducts = action.payload;
      });
  },
});

export default orderSlice.reducer;
