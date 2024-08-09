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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Add state for confirmation popup

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

  const toggleCartDisplay = () => {
    setShowCart(!showCart);
  };

  const handleCheckout = () => {
    navigate('/checkout');
    setShowCart(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true); // Show the confirmation popup
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setShowLogoutConfirm(false);
    navigate('/'); // Redirect to the home page
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

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
            <img className="w-5 h-5 cursor-pointer" src={Account1} alt="Account" onClick={handleAccountDropdown} />
            {showAccountDropdown && (
              <ul className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                <li className="px-4 py-2">
                  <p className="font-semibold">{t('navbar.hi')}, {user.name}!</p>
                </li>
                <li>
                  <RouterLink to="/profile" className="block px-4 py-2 hover:bg-gray-200">{t('navbar.profile')}</RouterLink>
                </li>
                <li>
                <RouterLink to="/my-orders" className="block px-4 py-2 hover:bg-gray-200">My Orders</RouterLink>
                </li>
                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={handleLogoutClick}>{t('navbar.logout')}</button>
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

        <button onClick={toggleCartDisplay} className="border-blue-950 border-2 p-1 rounded-2xl flex flex-row">
          <img className="w-5 h-5" src={Cart1} alt="Cart" />
          <span className="ml-2">{t('navbar.cart')}</span>
        </button>
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      <div className={`fixed left-0 top-0 w-[60%] h-full bg-blue-950 text-white transition-transform duration-300 ease-in-out ${nav ? 'translate-x-0' : '-translate-x-full'} z-50`} onClick={() => setNav(false)}>
        <ul className="uppercase p-4" onClick={(e) => e.stopPropagation()}>
          <li className="p-4 border-b border-gray-600" onClick={handleHomeClick}>{t('navbar.home')}</li>
          {!isLoginOrRegisterPage && (
            <>
              <li className="p-4 border-b border-gray-600">
                <ScrollLink to="services" smooth={true} duration={500} onClick={handleNav}>{t('navbar.services')}</ScrollLink>
              </li>
              <li className="p-4 border-b border-gray-600">
                <ScrollLink to="aboutus" smooth={true} duration={500} onClick={handleNav}>{t('navbar.about')}</ScrollLink>
              </li>
              <li className="p-4 border-b border-gray-600">
                <ScrollLink to="contactus" smooth={true} duration={500} onClick={handleNav}>{t('navbar.contact')}</ScrollLink>
              </li>
            </>
          )}
          {isLoggedIn ? (
            <>
              <li className="p-4 border-b border-gray-600">
                <img className="w-5 h-5 cursor-pointer" src={Account1} alt="Account" onClick={handleAccountDropdown} />
                {showAccountDropdown && (
                  <ul className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <li className="px-4 py-2">
                      <p className="font-semibold">{t('navbar.hi')}, {user?.name}!</p>
                    </li>
                    <li>
                      <RouterLink to="/profile" className="block px-4 py-2 hover:bg-gray-200">{t('navbar.profile')}</RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/settings" className="block px-4 py-2 hover:bg-gray-200">{t('navbar.settings')}</RouterLink>
                    </li>
                    <li>
                      <button onClick={handleLogoutClick} className="block px-4 py-2 w-full text-left hover:bg-gray-200">{t('navbar.logout')}</button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              <RouterLink to="/login" className="block p-4 border-b border-gray-600">{t('navbar.login')}</RouterLink>
              <RouterLink to="/CreateAccount" className="block p-4 border-b border-gray-600">{t('navbar.register')}</RouterLink>
            </>
          )}
          <li className="p-4 border-t border-gray-600">
            <div className="bg-white text-blue-950 rounded-lg p-2">
              <LanguageSwitcher/>
            </div>
          </li>
        </ul>
      </div>

      {/* Cart popup */}
      {showCart && (
        <div className="fixed right-0 top-0 w-[30%] h-full bg-white text-black shadow-lg z-50">
          <button onClick={() => setShowCart(false)} className="absolute top-4 right-4 text-2xl">×</button>
          <h2 className="text-lg font-semibold p-4">{t('navbar.cart')}</h2>

          {/* Scrollable container for cart items */}
          <div className="overflow-y-auto h-[calc(100%-150px)] p-4">
            <ul>
              {cartItems.length === 0 ? (
                <li>{t('navbar.cartEmpty')}</li>
              ) : (
                cartItems.map((item) => (
                  <li key={item._id} className="flex items-center justify-between py-2 border-b border-gray-200">
                    <img src={item.images[0].url} alt={item.name} className="w-12 h-12 object-cover" />
                    <div className="flex-1 ml-2">
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => dispatch(decreaseQuantity(item._id))} className="px-2">−</button>
                      <span className="px-2">{item.quantity}</span>
                      <button onClick={() => dispatch(increaseQuantity(item._id))} className="px-2">+</button>
                    </div>
                    <div className="ml-4">${(item.price * item.quantity).toFixed(2)}</div>
                    <button onClick={() => handleRemoveFromCart(item._id)} className="ml-4 text-red-500">Remove</button>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Fixed "Checkout" button */}
          <div className="absolute bottom-0 left-0 w-full p-4 border-t">
            <span className="font-semibold">{t('navbar.total')}: ${calculateCartTotal()}</span>
            <button onClick={handleCheckout} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full">
              {t('navbar.checkout')}
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{t('Are you sure you want to Logout ?')}</h3>
            <div className="flex justify-end gap-4">
              <button onClick={handleCancelLogout} className="px-4 py-2 bg-gray-300 rounded-lg">{t('cancel')}</button>
              <button onClick={handleConfirmLogout} className="px-4 py-2 bg-blue-950 text-white rounded-lg">{t('confirm')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
