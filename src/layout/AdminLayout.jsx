import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="kk-admin-shell">
      <Sidebar />
      <main className="kk-admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
