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
      const item = state.items.find(i => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        if (state.userId) {
          saveCartToCookie(state.userId, state.items);
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        if (state.userId) {
          saveCartToCookie(state.userId, state.items);
        }
      } else if (item) {
        state.items = state.items.filter(i => i._id !== action.payload);
        if (state.userId) {
          saveCartToCookie(state.userId, state.items);
        }
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
      Cookies.set('token', action.payload);  // Save token to cookies
    },
    clearToken: (state) => {
      state.token = null;
      Cookies.remove('token');  // Remove token from cookies
      if (state.userId) {
        saveCartToCookie(state.userId, state.items);  // Save cart to cookie before logout
        state.items = [];  // Clear cart items
        state.userId = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        Cookies.set('token', action.payload.token);
        state.items = loadCartFromCookie(action.payload.userId);  // Load the user's cart from cookies
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        console.error('Failed to fetch profile:', action.payload);
      });
  },
});

// Export actions
export const { setUser, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setToken, clearToken } = cartSlice.actions;

// Export selectors
export const selectCartItems = (state) => state.cart.items;
export const selectToken = (state) => state.cart.token;

export default cartSlice.reducer;
