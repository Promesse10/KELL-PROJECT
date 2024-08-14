


import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from '../assets/Logo.png';
import Account1 from '../assets/Account1.png';
import Cart1 from '../assets/Cart1.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../slices/cartSlice';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items) || [];

  const handleNav = () => {
    setNav(!nav);
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleAccountDropdown = (e) => {
    e.stopPropagation();
    setShowAccountDropdown(!showAccountDropdown);
  };

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/CreateAccount';

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const toggleCartDisplay = () => {
    setShowCart(!showCart);
  };

  const handleCheckout = () => {
    navigate('/checkout');
    setShowCart(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="fixed top-0 z-50 w-full flex justify-between items-center h-24 mx-auto px-4 bg-gray-100 shadow-md navbar-custom">
      <div className="flex items-center flex-shrink-0">
        <img className="w-28" src={Logo} alt="Logo" />
      </div>

      <ul className={`hidden lg:flex lg:ml-14 lg:space-x-12 lg:text-blue-950 lg:cursor-pointer lg:font-semibold ${isLoginOrRegisterPage ? 'hidden' : ''}`}>
        <li>
          <span onClick={handleHomeClick} className="hover:border-b-4 hover:border-blue-950 cursor-pointer">
            {t('navbar.home')}
          </span>
        </li>
        {!isLoginOrRegisterPage && (
          <>
            <li>
              <ScrollLink to="services" smooth={true} duration={500} className="hover:border-b-4 hover:border-blue-950">
                {t('navbar.services')}
              </ScrollLink>
            </li>
            <li onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className="relative">
              <span className="hover:border-b-4 hover:border-blue-950 cursor-pointer" onClick={(e) => e.stopPropagation()}>{t('navbar.products')}</span>
              {dropdown && (
                <ul className="absolute top-full font-thin text-sm left-0 w-52 bg-blue-950 text-white shadow-lg">
                  <li>
                    <RouterLink to="/infopage" className="block px-4 py-2 hover:bg-blue-900">
                      {t('navbar.it')}
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/Construction" className="block px-4 py-2 hover:bg-blue-900">
                      {t('navbar.civil')}
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/Food" className="block px-4 py-2 hover:bg-blue-900">
                      {t('navbar.food')}
                    </RouterLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <ScrollLink to="aboutus" smooth={true} duration={500} className="hover:border-b-4 hover:border-blue-950">
                {t('navbar.about')}
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="contactus" smooth={true} duration={500} className="hover:border-b-4 hover:border-blue-950">
                {t('navbar.contact')}
              </ScrollLink>
            </li>
          </>
        )}
      </ul>

      <div className="hidden lg:flex lg:items-center lg:gap-5">
        <LanguageSwitcher />
        {isLoggedIn ? (
          <>
            <img className="w-5 h-5 cursor-pointer" src={Account1} alt="Account" onClick={handleAccountDropdown} />
            {showAccountDropdown && (
              <ul className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                <li className="px-4 py-2">
                  <p className="font-semibold">{t('navbar.hi')}, {user.name ? user.name : 'Guest'}!</p>
                </li>
                <li>
                  <RouterLink to="/profile" className="block px-4 py-2 hover:bg-gray-200">{t('navbar.profile')}</RouterLink>
                </li>
                <li>
                  <RouterLink to="/myorders" className="block px-4 py-2 hover:bg-gray-200">{t('navbar.myOrders')}</RouterLink>
                </li>
                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={handleLogoutClick}>{t('navbar.logout')}</button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <>
            <RouterLink to="/login" className="lg:cursor-pointer">{t('navbar.login')}</RouterLink>|
            <RouterLink to="/CreateAccount" className="lg:cursor-pointer">{t('navbar.register')}</RouterLink>
          </>
        )}

        <button onClick={toggleCartDisplay} className="border-blue-950 border-2 p-1 rounded-2xl flex flex-row">
          <img className="w-5 h-5" src={Cart1} alt="Cart" />
          <span className="ml-1">{cartItems.length}</span>
        </button>
      </div>

      <div onClick={handleNav} className="block lg:hidden">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      <div className={`fixed left-0 top-0 w-[60%] h-full bg-white z-40 ease-in-out duration-500 shadow-lg ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="pt-8 uppercase pl-4 text-blue-950">
          <li onClick={handleHomeClick} className="p-4 border-b border-gray-200 cursor-pointer">
            {t('navbar.home')}
          </li>
          <li className="p-4 border-b border-gray-200">
            <ScrollLink to="services" smooth={true} duration={500}>
              {t('navbar.services')}
            </ScrollLink>
          </li>
          <li className="p-4 border-b border-gray-200">
            <ScrollLink to="aboutus" smooth={true} duration={500}>
              {t('navbar.about')}
            </ScrollLink>
          </li>
          <li className="p-4 border-b border-gray-200">
            <ScrollLink to="contactus" smooth={true} duration={500}>
              {t('navbar.contact')}
            </ScrollLink>
          </li>
          <LanguageSwitcher />
        </ul>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p>{t('navbar.confirmLogout')}</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleCancelLogout} className="px-4 py-2 bg-gray-300 rounded mr-2">{t('navbar.cancel')}</button>
              <button onClick={handleConfirmLogout} className="px-4 py-2 bg-red-600 text-white rounded">{t('navbar.logout')}</button>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-4/5 max-w-lg">
            <h2 className="text-xl font-semibold mb-4">{t('navbar.yourCart')}</h2>
            {cartItems.length > 0 ? (
              <div>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center mb-4">
                      <span>{item.name}</span>
                      <span>{item.price} x {item.quantity}</span>
                      <button onClick={() => handleRemoveFromCart(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                        {t('navbar.remove')}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center">
                  <span>{t('navbar.total')}: {calculateCartTotal()}</span>
                  <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
                    {t('navbar.checkout')}
                  </button>
                </div>
              </div>
            ) : (
              <p>{t('navbar.emptyCart')}</p>
            )}
            <button onClick={toggleCartDisplay} className="mt-4 text-blue-500 underline">{t('navbar.close')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
