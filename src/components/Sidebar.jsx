import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login-admin');
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 text-gray-800"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      <div
        className={`fixed h-screen bg-gray-800 text-white w-64 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
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
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block'
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
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block'
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
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block'
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
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block'
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
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white p-3 rounded block'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block'
                }
              >
                Custommers
              </NavLink>
            </li>
            <li className="mt-auto mb-4">
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded block w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
