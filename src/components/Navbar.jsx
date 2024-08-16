import React, { useState, useRef, useEffect } from 'react';
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

  const accountDropdownRef = useRef(null); // Ref for the account dropdown

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
    setShowAccountDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowAccountDropdown(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/CreateAccount';

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the cart page
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

  useEffect(() => {
    // Close the dropdown when clicking outside of it
    function handleClickOutside(event) {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full flex justify-between items-center h-24 max-w-[2794px] mx-auto px-4 bg-gray-100 shadow-md">
      <div className="flex items-center flex-shrink-0">
        <img className="w-28" src={Logo} alt="Logo" />
      </div>

      <ul className={`hidden md:flex md:ml-14 md:space-x-12 md:text-blue-950 md:cursor-pointer md:font-semibold ${isLoginOrRegisterPage ? 'hidden' : ''}`}>
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

      <div className="hidden md:flex md:items-center md:gap-5">
        <LanguageSwitcher />
        {isLoggedIn ? (
          <>
            <img className="w-5 h-5 cursor-pointer" src={Account1} alt="Account" onClick={handleAccountDropdown }  />
            {showAccountDropdown && (
              <ul ref={accountDropdownRef} className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                <li className="px-4 py-2">
                  <p className="font-semibold">
                    {t('navbar.hi')}, {user.name ? user.name : 'Guest'}!
                  </p>
                </li>
                <li>
                  <RouterLink to="/profile" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setShowAccountDropdown(false)}>
                    {t('navbar.profile')}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/myorders" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setShowAccountDropdown(false)}>
                    My Orders
                  </RouterLink>
                </li>
                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={handleLogoutClick}>
                    {t('navbar.logout')}
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <>
            <RouterLink to="/login" className="md:cursor-pointer">{t('navbar.login')}</RouterLink>|
            <RouterLink to="/CreateAccount" className="md:cursor-pointer">{t('navbar.register')}</RouterLink>
          </>
        )}

        <button onClick={handleCartClick} className="relative border-blue-950 border-2 p-1 rounded-2xl flex flex-row items-center">
          <img className="w-5 h-5" src={Cart1} alt="Cart" />
          <span className="ml-2">{t('navbar.cart')}</span>
          {cartItems.length > 0 && (
            <span className="absolute top-6 right-14 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      <div className={`fixed left-0 top-0 w-[60%] h-full bg-blue-950 text-white transition-transform duration-300 ease-in-out ${nav ? 'translate-x-0' : '-translate-x-full'} z-50`} onClick={() => setNav(false)}>
        <ul className="pt-24">
          <li className="text-2xl py-4 px-4 border-b border-white cursor-pointer hover:bg-blue-800" onClick={handleHomeClick}>
            {t('navbar.home')}
          </li>
          <li className="text-2xl py-4 px-4 border-b border-white cursor-pointer hover:bg-blue-800">
            <ScrollLink to="services" smooth={true} duration={500} onClick={() => setNav(false)}>
              {t('navbar.services')}
            </ScrollLink>
          </li>
          <li className="text-2xl py-4 px-4 border-b border-white cursor-pointer hover:bg-blue-800" onClick={() => setNav(false)}>
            <ScrollLink to="aboutus" smooth={true} duration={500}>
              {t('navbar.about')}
            </ScrollLink>
          </li>
          <li className="text-2xl py-4 px-4 border-b border-white cursor-pointer hover:bg-blue-800" onClick={() => setNav(false)}>
            <ScrollLink to="contactus" smooth={true} duration={500}>
              {t('navbar.contact')}
            </ScrollLink>
          </li>
          <li className="text-2xl py-4 px-4 border-b border-white cursor-pointer hover:bg-blue-800">
            {isLoggedIn ? (
              <>
                <RouterLink to="/profile" className="block py-4" onClick={() => setNav(false)}>
                  {t('navbar.profile')}
                </RouterLink>
                <button className="block py-4" onClick={handleLogoutClick}>
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <>
                <RouterLink to="/login" className="block py-4" onClick={() => setNav(false)}>
                  {t('navbar.login')}
                </RouterLink>
                <RouterLink to="/CreateAccount" className="block py-4" onClick={() => setNav(false)}>
                  {t('navbar.register')}
                </RouterLink>
              </>
            )}
          </li>
          <li className="text-2xl py-4 px-4 border-b border-white cursor-pointer hover:bg-blue-800">
            <button onClick={handleCartClick} className="relative">
              <img className="w-5 h-5 inline" src={Cart1} alt="Cart" />
              <span className="ml-2">{t('navbar.cart')}</span>
              {cartItems.length > 0 && (
                <span className=" top-0 right-2 bg-red-500 text-white text-xs rounded-full px-8 py-1">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
            <div className="flex gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleConfirmLogout}>Yes</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
