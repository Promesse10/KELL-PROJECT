import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/api";

// Thunks for async actions
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (category) => {
    return await fetchProducts(category);
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    return await fetchAllProducts();
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    return await createProduct(product);
  }
);

export const deleteProductById = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

export const updateProductById = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    await updateProduct(product);
    return product;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      });
  },
});

export default productSlice.reducer;
