import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
