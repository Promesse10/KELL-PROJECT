// components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/Logo.png';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/">
        <img className="w-28" src={Logo} alt="Logo" />
      </Link>
  
      <button type="button" onClick={() => navigate(-1)} className="kk-checkout__back">
        {t('cart.continueShopping')}
      </button>
    </header>
  );
};

export default Header;
