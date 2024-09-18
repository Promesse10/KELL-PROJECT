import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../services/api";

// Existing Thunks
export const getCategories = createAsyncThunk(
  "category/getCategories",
  fetchCategories
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  createCategory
);

// New Thunks
export const removeCategory = createAsyncThunk(
  "category/removeCategory",
  deleteCategory
);
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, updatedCategory }) => {
    const response = await updateCategory(id, updatedCategory);
    return response;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.meta.arg
        );
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      });
  },
});

export default categorySlice.reducer;
