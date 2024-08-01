import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice'; // Ensure this import is correct
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import categoryReducer from './slices/categorySlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    products: productReducer, // Ensure this line is included
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    categories: categoryReducer,
    users: userReducer  
  },
});

export default store;
