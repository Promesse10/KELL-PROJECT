import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Login from './Login';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <main className="ml-64 p-4 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
