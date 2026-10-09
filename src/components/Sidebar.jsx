import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  FiGrid, FiPackage, FiShoppingBag, FiTag, FiUsers, FiLogOut, FiMenu, FiX,
} from 'react-icons/fi';
import { logout } from '../slices/authSlice';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Overview', icon: FiGrid, end: true },
  { to: '/admin/product', label: 'Products', icon: FiPackage },
  { to: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  { to: '/admin/categories', label: 'Categories', icon: FiTag },
  { to: '/admin/users', label: 'Customers', icon: FiUsers },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login-admin');
  };

  return (
    <>
      <header className="kk-admin-mobilebar">
        <button type="button" onClick={() => setIsOpen(true)} aria-label="Open admin navigation">
          <FiMenu aria-hidden="true" />
        </button>
        <span>KarKelly <small>ADMIN</small></span>
      </header>
      {isOpen && (
        <button
          type="button"
          className="kk-admin-sidebar__scrim"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <aside className={`kk-admin-sidebar${isOpen ? ' is-open' : ''}`}>
        <div className="kk-admin-sidebar__brand">
          <span className="kk-admin-sidebar__brand-mark">K</span>
          <div><strong>KarKelly</strong><small>ADMIN CONSOLE</small></div>
          <button
            type="button"
            className="kk-admin-sidebar__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close admin navigation"
          ><FiX aria-hidden="true" /></button>
        </div>

        <p className="kk-admin-sidebar__section">WORKSPACE</p>
        <nav aria-label="Admin navigation">
          {adminLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `kk-admin-sidebar__link${isActive ? ' is-active' : ''}`}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="kk-admin-sidebar__bottom">
          <div className="kk-admin-sidebar__help">
            <span>Need a hand?</span>
            <small>Manage your business from one place.</small>
          </div>
          <button type="button" className="kk-admin-sidebar__logout" onClick={handleLogout}>
            <FiLogOut aria-hidden="true" /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
