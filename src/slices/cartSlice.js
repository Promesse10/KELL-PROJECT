import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingProduct = state.find((item) => item._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const existingProduct = state.find((item) => item._id === productId);
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          return state.filter((item) => item._id !== productId);
        } else {
          existingProduct.quantity -= 1;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
