import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from '../assets/Logo.png';
import Logo1 from '../assets/Logo1.png';
import Account1 from '../assets/Account1.png';
import Account from '../assets/Account.png';
import Cart from '../assets/Cart.png';
import Cart1 from '../assets/Cart1.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleNav = () => {
    setNav(!nav);
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to the home page
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
  };

  const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/CreateAccount';

  return (
    <div className="fixed top-0 z-50 w-full flex justify-between items-center h-24 max-w-[2794px] mx-auto px-4 bg-gray-100 shadow-md">
      <div className="flex items-center flex-shrink-0">
        <img className="w-28" src={Logo} alt="Logo" />
      </div>

      {/* Desktop navigation */}
      <ul className={`hidden md:flex md:ml-14 md:space-x-12 md:text-blue-950 md:cursor-pointer md:font-semibold ${isLoginOrRegisterPage ? 'hidden' : ''}`}>
        <li>
          <span 
            onClick={handleHomeClick} 
            className="hover:border-b-4 hover:border-blue-950 cursor-pointer"
          >
            Home
          </span>
        </li>
        {!isLoginOrRegisterPage && (
          <>
            <li>
              <ScrollLink 
                to="services" 
                smooth={true} 
                duration={500} 
                className="hover:border-b-4 hover:border-blue-950"
              >
                Services
              </ScrollLink>
            </li>
            <li onMouseEnter={handleDropdown} onMouseLeave={handleDropdown} className="relative">
              <span className="hover:border-b-4 hover:border-blue-950 cursor-pointer">Products</span>
              {dropdown && (
                <ul className="absolute top-full font-thin text-sm left-0 w-52 bg-blue-950 text-white shadow-lg">
                  <li><RouterLink to="/infopage" className="block px-4 py-2 hover:bg-blue-900">Information and Technology</RouterLink></li>
                  <li><RouterLink to="/Construction" className="block px-4 py-2 hover:bg-blue-900">Civil Engineering Projects</RouterLink></li>
                  <li><RouterLink to="/Food" className="block px-4 py-2 hover:bg-blue-900">Food Service</RouterLink></li>
                </ul>
              )}
            </li>
            <li>
              <ScrollLink 
                to="aboutus" 
                smooth={true} 
                duration={500} 
                className="hover:border-b-4 hover:border-blue-950"
              >
                About us
              </ScrollLink>
            </li>
            <li>
              <ScrollLink 
                to="contactus" 
                smooth={true} 
                duration={500} 
                className="hover:border-b-4 hover:border-blue-950"
              >
                Contact us
              </ScrollLink>
            </li>
          </>
        )}
      </ul>

      {/* Mobile navigation */}
      <div className="hidden md:flex md:items-center md:gap-5">
        
          <>
            <img className="w-5 h-5" src={Account1} alt="Account" /> 
            <RouterLink to="/login" className="md:cursor-pointer">Login</RouterLink>|
            <RouterLink to="/CreateAccount" className="md:cursor-pointer">Register</RouterLink>
          </>
      
        <button className='border-blue-950 border-2 p-1 rounded-2xl flex flex-row'>
          <img className="w-5 h-5" src={Cart1} alt="Cart" />
          <span className='ml-2'>Cart</span>
        </button>
        <RouterLink to="/cart"></RouterLink>
      </div>

      {/* Hamburger menu for mobile */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      {/* Mobile navigation menu */}
      <div className={nav ? "fixed top-0 left-0 w-[50%] h-full bg-blue-950 shadow-lg ease-in-out duration-1000 overflow-y-auto" : "hidden md:hidden"}>
        <img className="w-20 h-12 my-6 ml-2" src={Logo1} alt="Logo" />
        <hr className="border-2 text-white" />
        <div className="flex flex-col items-start mt-5 h-full">
          {!isLoginOrRegisterPage && (
            <ul className="uppercase text-start ml-5">
              <li className="text-white">
                <span 
                  onClick={handleHomeClick} 
                  className="block py-3 hover:border-b-4 hover:border-blue-950 cursor-pointer"
                >
                  Home
                </span>
              </li>
              <li className="text-white">
                <ScrollLink 
                  to="services" 
                  smooth={true} 
                  duration={500} 
                  onClick={handleNav} 
                  className="block py-3 hover:border-b-4 hover:border-blue-950 active:text-blue-400"
                >
                  Services
                </ScrollLink>
              </li>
              <li className="text-white">
                <span className="block py-3 hover:border-b-4 hover:border-blue-950 cursor-pointer">Products</span>
                <ul className="ml-5 mt-2">
                  <li><RouterLink to="/infopage" className="block py-2 hover:bg-blue-500">Information and Technology</RouterLink></li>
                  <li><RouterLink to="/civil-engineering-projects" className="block py-2 hover:bg-blue-200">Civil Engineering Projects</RouterLink></li>
                  <li><RouterLink to="/food-service" className="block py-2 hover:bg-blue-200">Food Service</RouterLink></li>
                </ul>
              </li>
              <li className="text-white">
                <ScrollLink 
                  to="aboutus" 
                  smooth={true} 
                  duration={500} 
                  onClick={handleNav} 
                  className="block py-3 hover:border-b-4 hover:border-blue-950 active:text-blue-400"
                >
                  About us
                </ScrollLink>
              </li>
              <li className="text-white">
                <ScrollLink 
                  to="contactus" 
                  smooth={true} 
                  duration={500} 
                  onClick={handleNav} 
                  className="block py-3 hover:border-b-4 hover:border-blue-950 active:text-blue-400"
                >
                  Contact us
                </ScrollLink>
              </li>
            </ul>
          )}
          <div className="flex flex-col items-center justify-start p-4">
            <div className="flex gap-3 justify-start items-start">
              <RouterLink to="/login"><img className="w-5 h-5 active:text-lg active:w-7 active:h-7" src={Account} alt="" /></RouterLink>
              <RouterLink to="/cart"><img className="w-5 h-5 active:w-7 active:h-7" src={Cart} alt="Cart" /></RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
