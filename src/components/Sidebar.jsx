import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  FiGrid, FiPackage, FiShoppingBag, FiUsers, FiLogOut, FiMenu, FiX,
} from 'react-icons/fi';
import { logout } from '../slices/authSlice';

const adminLinks = [
  { to: '/admin/dashboard', label: 'overview', icon: FiGrid, end: true },
  { to: '/admin/product', label: 'products', icon: FiPackage },
  { to: '/admin/orders', label: 'orders', icon: FiShoppingBag },
  { to: '/admin/users', label: 'customers', icon: FiUsers },
];

const Sidebar = () => {
  const { t, i18n } = useTranslation();
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
        <button type="button" onClick={() => setIsOpen(true)} aria-label={t('admin.navigation.open')}>
          <FiMenu aria-hidden="true" />
        </button>
        <span>KarKelly <small>{t('admin.navigation.brand')}</small></span>
      </header>
      {isOpen && (
        <button
          type="button"
          className="kk-admin-sidebar__scrim"
          onClick={() => setIsOpen(false)}
          aria-label={t('admin.navigation.close')}
        />
      )}
      <aside className={`kk-admin-sidebar${isOpen ? ' is-open' : ''}`}>
        <div className="kk-admin-sidebar__brand">
          <span className="kk-admin-sidebar__brand-mark">K</span>
          <div><strong>KarKelly</strong><small>{t('admin.navigation.brand')}</small></div>
          <button
            type="button"
            className="kk-admin-sidebar__close"
            onClick={() => setIsOpen(false)}
            aria-label={t('admin.navigation.close')}
          ><FiX aria-hidden="true" /></button>
        </div>

        <p className="kk-admin-sidebar__section">{t('admin.navigation.workspace')}</p>
        <nav aria-label={t('admin.navigation.workspace')}>
          {adminLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `kk-admin-sidebar__link${isActive ? ' is-active' : ''}`}
            >
              <Icon aria-hidden="true" />
              <span>{t(`admin.navigation.${label}`)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="kk-admin-sidebar__bottom">
          <label className="kk-admin-language">
            <span>{t('admin.language')}</span>
            <select
              value={i18n.resolvedLanguage?.startsWith('kin') ? 'kin' : 'en'}
              onChange={(event) => i18n.changeLanguage(event.target.value)}
              aria-label={t('admin.language')}
            >
              <option value="en">{t('admin.english')}</option>
              <option value="kin">{t('admin.kinyarwanda')}</option>
            </select>
          </label>
          <div className="kk-admin-sidebar__help">
            <span>{t('admin.navigation.help')}</span>
            <small>{t('admin.navigation.helpText')}</small>
          </div>
          <button type="button" className="kk-admin-sidebar__logout" onClick={handleLogout}>
            <FiLogOut aria-hidden="true" /> {t('admin.navigation.signOut')}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
