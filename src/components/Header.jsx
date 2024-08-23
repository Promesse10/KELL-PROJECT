// components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/Logo.png';
import Cart1 from '../assets/Cart1.png';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Add this to use navigate
  const cartItems = []; // Placeholder for cartItems, replace with actual cart items logic

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/">
        <img className="w-28" src={Logo} alt="Logo" />
      </Link>
  
      <button onClick={handleCartClick} className="relative border-blue-950 border-2 p-1 rounded-2xl flex flex-row items-center">
        <img className="w-5 h-5" src={Cart1} alt="Cart" />
        <span className="ml-2">{t('navbar.cart')}</span>
        {cartItems.length > 0 && (
          <span className="absolute top-5 right-14 bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
