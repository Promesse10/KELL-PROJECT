import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, login, logout, register } from '../slices/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isLoggedIn, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchProfile())
        .unwrap()
        .catch((error) => {
          console.error('Failed to fetch profile:', error.message || error);
          
        });
    }
  }, [isLoggedIn, dispatch]);

  const registerUser = (userData) => dispatch(register(userData));
  const loginUser = (credentials) => dispatch(login(credentials));
  const logoutUser = () => dispatch(logout());

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoggedIn, 
        loading, 
        error, 
        isAdmin: user ? user.isAdmin : false,  // Ensure user is not null
        registerUser, 
        loginUser, 
        logoutUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
