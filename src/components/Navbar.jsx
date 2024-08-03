import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from '../assets/Logo.png';
import Account1 from '../assets/Account1.png';
import Cart1 from '../assets/Cart1.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { increaseQuantity, decreaseQuantity } from '../slices/cartSlice';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [dropdown, setDropdown] = useState(false); // Define dropdown state

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items) || [];

  const handleNav = () => {
    setNav(!nav);
  };

  const handleAccountDropdown = (e) => {
    e.stopPropagation(); // Prevent click events from affecting other dropdowns
    setShowAccountDropdown(!showAccountDropdown);
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to Profile page
    setShowAccountDropdown(false); // Close account dropdown after navigation
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

  return (
    <div className="fixed top-0 z-50 w-full flex justify-between items-center h-24 max-w-[2794px] mx-auto px-4 bg-gray-100 shadow-md">
      <div className="flex items-center flex-shrink-0">
        <img className="w-28" src={Logo} alt="Logo" />
      </div>

      <ul className={`hidden md:flex md:ml-14 md:space-x-12 md:text-blue-950 md:cursor-pointer md:font-semibold ${isLoginOrRegisterPage ? 'hidden' : ''}`}>
        <li>
          <span onClick={handleHomeClick} className="hover:border-b-4 hover:border-blue-950 cursor-pointer">
            Home
          </span>
        </li>
        {!isLoginOrRegisterPage && (
          <>
            <li>
              <ScrollLink to="services" smooth={true} duration={500} className="hover:border-b-4 hover:border-blue-950">
                Services
              </ScrollLink>
            </li>
            <li onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className="relative">
              <span className="hover:border-b-4 hover:border-blue-950 cursor-pointer" onClick={(e) => e.stopPropagation()}>Products</span>
              {dropdown && (
                <ul className="absolute top-full font-thin text-sm left-0 w-52 bg-blue-950 text-white shadow-lg">
                  <li>
                    <RouterLink to="/infopage" className="block px-4 py-2 hover:bg-blue-900">
                      Information and Technology
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/Construction" className="block px-4 py-2 hover:bg-blue-900">
                      Civil Engineering Projects
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/Food" className="block px-4 py-2 hover:bg-blue-900">
                      Food Service
                    </RouterLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <ScrollLink to="aboutus" smooth={true} duration={500} className="hover:border-b-4 hover:border-blue-950">
                About us
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="contactus" smooth={true} duration={500} className="hover:border-b-4 hover:border-blue-950">
                Contact us
              </ScrollLink>
            </li>
          </>
        )}
      </ul>

      <div className="hidden md:flex md:items-center md:gap-5">
        {isLoggedIn ? (
          <>
            <img className="w-5 h-5 cursor-pointer" src={Account1} alt="Account" onClick={handleAccountDropdown} />
            {showAccountDropdown && (
              <ul className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                <li className="px-4 py-2">
                  <p className="font-semibold">Hi, {user.name}!</p>
                </li>
                <li>
                  <RouterLink to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</RouterLink>
                </li>
                <li>
                  <RouterLink to="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</RouterLink>
                </li>
                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => dispatch(logout())}>Logout</button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <>
            <RouterLink to="/login" className="md:cursor-pointer">Login</RouterLink>|
            <RouterLink to="/CreateAccount" className="md:cursor-pointer">Register</RouterLink>
          </>
        )}

        <button onClick={toggleCartDisplay} className="border-blue-950 border-2 p-1 rounded-2xl flex flex-row">
          <img className="w-5 h-5" src={Cart1} alt="Cart" />
          <span className="ml-2">Cart</span>
        </button>
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      <div className={`fixed left-0 top-0 w-[60%] h-full bg-blue-950 text-white ${nav ? 'block' : 'hidden'} z-50`} onClick={() => setNav(false)}>
        <ul className="uppercase p-4" onClick={(e) => e.stopPropagation()}>
          <li className="p-4 border-b border-gray-600" onClick={handleHomeClick}>Home</li>
          {!isLoginOrRegisterPage && (
            <>
              <li className="p-4 border-b border-gray-600">
                <ScrollLink to="services" smooth={true} duration={500} onClick={handleNav}>Services</ScrollLink>
              </li>
              <li className="p-4 border-b border-gray-600">
                <ScrollLink to="aboutus" smooth={true} duration={500} onClick={handleNav}>About us</ScrollLink>
              </li>
              <li className="p-4 border-b border-gray-600">
                <ScrollLink to="contactus" smooth={true} duration={500} onClick={handleNav}>Contact us</ScrollLink>
              </li>
            </>
          )}
          {isLoggedIn ? (
            <>
              <img className="w-5 h-5 cursor-pointer" src={Account1} alt="Account" onClick={handleAccountDropdown} />
              {showAccountDropdown && (
                <ul className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                  <li className="px-4 py-2">
                    <p className="font-semibold">Hi, {user?.name}!</p> {/* Optional chaining */}
                  </li>
                  <li>
                    <button onClick={handleProfileClick} className="block px-4 py-2 hover:bg-gray-200">Profile</button>
                  </li>
                  <li>
                    <RouterLink to="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</RouterLink>
                  </li>
                  <li>
                    <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => dispatch(logout())}>Logout</button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              <RouterLink to="/login" className="block p-4 border-b border-gray-600">Login</RouterLink>
              <RouterLink to="/CreateAccount" className="block p-4 border-b border-gray-600">Register</RouterLink>
            </>
          )}
        </ul>
      </div>

      {/* Cart popup */}
      {showCart && (
        <div className="fixed right-0 top-0 w-[30%] h-full bg-white text-black shadow-lg z-50">
          <button onClick={() => setShowCart(false)} className="absolute top-4 right-4 text-2xl">×</button>
          <h2 className="text-lg font-semibold p-4">Cart</h2>
          <ul className="p-4">
            {cartItems.length === 0 ? (
              <li>Your cart is empty</li>
            ) : (
              cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                  <div className="flex-1 ml-2">
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => dispatch(decreaseQuantity({ id: item.id }))} className="px-2">−</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity({ id: item.id }))} className="px-2">+</button>
                  </div>
                  <div className="ml-4">${(item.price * item.quantity).toFixed(2)}</div>
                </li>
              ))
            )}
          </ul>
          <div className="p-4 border-t">
            <span className="font-semibold">Total: ${calculateCartTotal()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
