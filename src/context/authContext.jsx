import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, login, logout, register } from '../slices/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isLoggedIn, loading, error } = useSelector((state) => state.auth);
  const [fetchProfileAfterLogin, setFetchProfileAfterLogin] = useState(false);

  useEffect(() => {
    if (isLoggedIn && fetchProfileAfterLogin) {
      dispatch(fetchProfile())
        .unwrap()
        .catch((error) => {
          console.error('Failed to fetch profile:', error.message || error);
        });
      setFetchProfileAfterLogin(false); // Reset flag after fetching profile
    }
  }, [isLoggedIn, dispatch, fetchProfileAfterLogin]);

  const registerUser = async (userData) => {
    await dispatch(register(userData));
    // Do not fetch profile after registration
  };

  const loginUser = (credentials) => {
    setFetchProfileAfterLogin(true); // Set flag to fetch profile after login
    return dispatch(login(credentials));
  };

  const logoutUser = () => {
    setFetchProfileAfterLogin(false); // Reset flag on logout
    return dispatch(logout());
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoggedIn, 
        loading, 
        error, 
        isAdmin: user ? user.isAdmin : false, // Ensure user is not null
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
