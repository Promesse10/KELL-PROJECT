import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed h-screen bg-gray-800 text-white w-64">
      <div className="flex items-center justify-center h-20">
        <h1 className="text-3xl font-bold">Admin</h1>
      </div>
      <nav className="flex-1">
        <ul className="p-4">
          <li className="mb-4">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/product"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block"
              }
            >
              Products
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block"
              }
            >
              Orders
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block"
              }
            >
              Categories
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block"
              }
            >
              Users
            </NavLink>
          </li>
          <li className="mt-auto mb-4">
            <button
              onClick={() => {
                // Add your logout functionality here
                console.log('Logout');
              }}
              className="text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block w-full text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
