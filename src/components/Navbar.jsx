// src/components/Navbar.js
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from '../assets/Logo.png';
import Account1 from '../assets/Account1.png';
import Cart1 from '../assets/Cart1.png';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../slices/cartSlice';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/CreateAccount';

  const cartItems = useSelector((state) => state.cart.items) || [];

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
            <li onMouseEnter={handleDropdown} onMouseLeave={handleDropdown} className="relative">
              <span className="hover:border-b-4 hover:border-blue-950 cursor-pointer">Products</span>
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
        <>
          <img className="w-5 h-5" src={Account1} alt="Account" />
          <RouterLink to="/login" className="md:cursor-pointer">Login</RouterLink>|
          <RouterLink to="/CreateAccount" className="md:cursor-pointer">Register</RouterLink>
        </>

        <button onClick={toggleCartDisplay} className="border-blue-950 border-2 p-1 rounded-2xl flex flex-row">
          <img className="w-5 h-5" src={Cart1} alt="Cart" />
          <span className="ml-2">Cart</span>
        </button>
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      <div className={`fixed left-0 top-0 w-[60%] h-full bg-blue-950 text-white ${nav ? 'block' : 'hidden'} z-50`}>
        <ul className="uppercase p-4">
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
          <li className="p-4">
            <RouterLink to="/login" className="block px-4 py-2" onClick={handleNav}>Login</RouterLink>
          </li>
          <li className="p-4">
            <RouterLink to="/CreateAccount" className="block px-4 py-2" onClick={handleNav}>Register</RouterLink>
          </li>
          <li className="p-4">
            <button onClick={() => { toggleCartDisplay(); handleNav(); }} className="border-blue-950 border-2 p-1 rounded-2xl flex flex-row w-full justify-center">
              <img className="w-5 h-5" src={Cart1} alt="Cart" />
              <span className="ml-2">Cart</span>
            </button>
          </li>
        </ul>
      </div>
      <div className={`fixed right-0 top-0 w-[350px] bg-white h-full shadow-2xl transition-transform transform ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
  <button onClick={toggleCartDisplay} className="p-2 focus:outline-none">
    <AiOutlineClose size={24} />
  </button>
  <h2 className="text-xl font-semibold p-4 border-b">Cart</h2>
  {cartItems.length === 0 ? (
    <p className="p-4">Your cart is empty</p>
  ) : (
    <ul className="p-4 overflow-y-auto max-h-[60vh]">
      {cartItems.map((item, index) => (
        <li key={index} className="flex justify-between items-center mb-4">
          <img src={item.images[0].url} alt={item.name} className="w-16 h-16 object-cover" />
          <div className="ml-4">
            <p className="text-sm font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">Price: rwf {item.price}</p>
            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            <div className="flex items-center space-x-2">
              <button onClick={() => dispatch(increaseQuantity(item._id))} className="px-2 py-1 bg-blue-950 text-white rounded">+</button>
              <button onClick={() => dispatch(decreaseQuantity(item._id))} className="px-2 py-1 bg-blue-950 text-white rounded">-</button>
              <button onClick={() => dispatch(removeFromCart(item._id))} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
            </div>
          </div>
          <p className="text-sm font-semibold">  rwf{(item.price * item.quantity).toFixed(2)}</p>
        </li>
      ))}
    </ul>
  )}
  <div className="p-4 border-t">
    <p className="font-semibold">Total: ${calculateCartTotal()}</p>
    <button className="w-full bg-blue-950 text-white p-2 mt-2">Checkout</button>
  </div>
</div>

    </div>
  );
};

export default Navbar;
