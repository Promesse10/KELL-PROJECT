import { createSlice } from '@reduxjs/toolkit';

// Helper functions to handle local storage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart) {
      return JSON.parse(serializedCart);
    }
  } catch (err) {
    console.error("Failed to load cart from localStorage", err);
  }
  return [];
};

const saveCartToLocalStorage = (cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error("Failed to save cart to localStorage", err);
  }
};

// Load initial state from local storage
const initialState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      saveCartToLocalStorage(state.items); // Save to local storage
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(i => i._id !== itemId);
      saveCartToLocalStorage(state.items); // Save to local storage
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state.items); // Save to local storage
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state.items); // Save to local storage
      } else if (item) {
        state.items = state.items.filter(i => i._id !== action.payload);
        saveCartToLocalStorage(state.items); // Save to local storage
      }
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

// Define and export selector
export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
