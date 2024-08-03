import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
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
