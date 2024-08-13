import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ isAdminRoute }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  console.log('isLoggedIn:', isLoggedIn);
console.log('isAdmin:', isAdmin);

  if (!isLoggedIn) {
    return <Navigate to="/login-admin" />;
  }

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
