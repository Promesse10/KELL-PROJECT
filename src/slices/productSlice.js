
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, createProduct } from '../sevices/api';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  return await fetchProducts();
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  return await createProduct(product);
});

export const getPopularProducts = createAsyncThunk('products/getPopularProducts', async () => {
  return await fetchProducts();
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    popularProducts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(getPopularProducts.fulfilled, (state, action) => {
        state.popularProducts = action.payload; // Assuming the endpoint returns popular products
      });
  },
});
export default productSlice.reducer;
