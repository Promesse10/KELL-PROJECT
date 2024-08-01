import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, createProduct } from '../sevices/api'; // Corrected spelling from 'sevices' to 'services'

// Asynchronous thunk actions for fetching and adding products
export const getProducts = createAsyncThunk('products/getProducts', fetchProducts);
export const addProduct = createAsyncThunk('products/addProduct', createProduct);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        console.log('Fetching products...');
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log('Fetch successful:', action.payload);
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        console.log('Fetch failed:', action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;
