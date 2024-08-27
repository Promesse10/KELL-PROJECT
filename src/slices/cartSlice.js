import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { fetchProfile } from './authSlice';

const getCartCookie = (userId) => `cart_${userId}`;

const loadCartFromCookie = (userId) => {
  try {
    const cartCookie = Cookies.get(getCartCookie(userId));
    if (cartCookie) {
      return JSON.parse(cartCookie);
    }
  } catch (err) {
    console.error("Failed to load cart from cookies", err);
  }
  return [];
};

const saveCartToCookie = (userId, cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    Cookies.set(getCartCookie(userId), serializedCart, { expires: 365 }); // Cookie expires in 1 year
  } catch (err) {
    console.error("Failed to save cart to cookies", err);
  }
};

const clearCartCookie = (userId) => {
  try {
    Cookies.remove(getCartCookie(userId));
  } catch (err) {
    console.error("Failed to clear cart cookie", err);
  }
};

// Initial state
const initialState = {
  items: [],
  userId: null,
  token: Cookies.get('token') || null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
      state.items = loadCartFromCookie(action.payload);
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      if (state.userId) {
        saveCartToCookie(state.userId, state.items);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(i => i._id !== itemId);
      if (state.userId) {
        saveCartToCookie(state.userId, state.items);
      }
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(i => i._id === itemId);
      if (item) {
        item.quantity += 1;
        if (state.userId) {
          saveCartToCookie(state.userId, state.items);
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(i => i._id === itemId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i._id !== itemId);
        }
        if (state.userId) {
          saveCartToCookie(state.userId, state.items);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (state.userId) {
        clearCartCookie(state.userId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.userId = action.payload._id;
        state.items = loadCartFromCookie(action.payload._id) || [];
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setUser,
} = cartSlice.actions;

// Add selector to access cart items
export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
