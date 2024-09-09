import React, { useState, useRef, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from "../assets/Logo.png";
import Cart1 from "../assets/Cart1.png";
import { logout } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import acount from "../assets/Account.png"
import myorder from "../assets/order-delivery.png"
import logot from "../assets/logout.png"
import Logo1 from "../assets/Logo1.png";
import Cart from "../assets/Cart.png"

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const accountDropdownRef = useRef(null);

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
    setShowAccountDropdown((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowAccountDropdown(false);
  };

  const handleOrdersClick = () => {
    navigate("/myorders");
    setShowAccountDropdown(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setShowLogoutConfirm(false);
    setShowAccountDropdown(false);
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleHomeClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLoginOrRegisterPage =
    location.pathname === "/login" || location.pathname === "/createAccount";
  const isCheckoutPage = location.pathname === "/checkout";

  const calculateCartTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setShowAccountDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full flex justify-between items-center h-24 max-w-[2794px] mx-auto px-4 bg-gray-100 shadow-md">
      <div className="flex items-center flex-shrink-0">
        <img className="w-28" src={Logo} alt="Logo" onClick={handleHomeClick} />
      </div>

      {!isCheckoutPage && (
        <ul
          className={`hidden md:flex md:ml-14 md:space-x-12 md:text-blue-950 md:cursor-pointer md:font-semibold ${
            isLoginOrRegisterPage ? "hidden" : ""
          }`}
        >
          <li>
            <span
              onClick={handleHomeClick}
              className="hover:border-b-4 hover:border-blue-950 cursor-pointer"
            >
              {t("navbar.home")}
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
                  {t("navbar.services")}
                </ScrollLink>
              </li>
              <li
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                className="relative"
              >
                <span
                  className="hover:border-b-4 hover:border-blue-950 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t("navbar.products")}
                </span>
                {dropdown && (
                  <ul className="absolute top-full font-thin text-sm left-0 w-52 bg-blue-950 text-white shadow-lg">
                    <li>
                      <RouterLink
                        to="/infopage"
                        className="block px-4 py-2 hover:bg-blue-900"
                      >
                        {t("navbar.it")}
                      </RouterLink>
                    </li>
                    {/* <li>
                      <RouterLink
                        to="/Construction"
                        className="block px-4 py-2 hover:bg-blue-900"
                      >
                        {t("navbar.civil")}
                      </RouterLink>
                    </li> */}
                    <li>
                      <RouterLink
                        to="/Food"
                        className="block px-4 py-2 hover:bg-blue-900"
                      >
                        {t("navbar.food")}
                      </RouterLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <RouterLink
                  to="/aboutus"
                  className="hover:border-b-4 hover:border-blue-950"
                >
                  {t("navbar.about")}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/contactus"
                  className="hover:border-b-4 hover:border-blue-950"
                >
                  {t("navbar.contact")}
                </RouterLink>
              </li>
            </>
          )}
        </ul>
      )}

{/* 
      <div className="hidden md:flex space-x-6">
        <LanguageSwitcher />
        {isLoggedIn && !isCheckoutPage && (
          <div className="relative">
            <div
              className="cursor-pointer flex items-center"
              onClick={handleAccountDropdown}
            >
              <img
                src={user?.profilePicture}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
            {showAccountDropdown && (
              <div
                ref={accountDropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
              >
                <ul className="py-2">
                  <li>
                    <span
                      onClick={handleProfileClick}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {t("navbar.profile")}
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={handleOrdersClick}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {t("navbar.orders")}
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={handleLogoutClick}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {t("navbar.logout")}
                    </span>
                  </li>
                </ul>
              </div>
            )}
            {showLogoutConfirm && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <p className="p-2">{t("navbar.confirmLogout")}</p>
                <div className="flex justify-between px-4 py-2">
                  <button
                    onClick={handleConfirmLogout}
                    className="text-red-500 hover:underline"
                  >
                    {t("navbar.logout")}
                  </button>
                  <button
                    onClick={handleCancelLogout}
                    className="text-gray-500 hover:underline"
                  >
                    {t("navbar.cancel")}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoggedIn && !isCheckoutPage && (
          <>
            <RouterLink to="/login" className="text-blue-950 font-semibold">
              {t("navbar.login")}
            </RouterLink>
            <RouterLink to="/createAccount" className="text-blue-950 font-semibold">
              {t("navbar.register")}
            </RouterLink>
          </>
        )}

        {!isCheckoutPage && (
          <div className="relative">
            <img
              className="w-10 cursor-pointer"
              src={Cart1}
              alt="Cart"
              onClick={handleCartClick}
            />
            <span className="absolute -top-2 right-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {cartItems.length}
            </span>
          </div>
        )}
      </div> */}

<div className="hidden md:flex md:items-center md:gap-5">
        <LanguageSwitcher />
        {isLoggedIn ? (
          <>
            <img
              className="h-12 w-12 cursor-pointer rounded-full border border-gray-300"
              src={user.profilePic[0].url}
              alt="Account"
              onClick={handleAccountDropdown}
            />

            {showAccountDropdown && (
              <ul
                ref={accountDropdownRef}
                className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <li className="px-4 py-2">
                  <p className="font-semibold">
                    {t("navbar.hi")}, {user.name ? user.name : "Guest"}!
                  </p>
                </li>
                <li>
                  <RouterLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={handleProfileClick}
                  >
                    {t("navbar.profile")}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/myorders"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={handleOrdersClick}
                  >
                    My Orders
                  </RouterLink>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={handleLogoutClick}
                  >
                    {t("navbar.logout")}
                  </button>
                </li>
              </ul>
            )}
            <button
              onClick={handleCartClick}
              className="relative border-blue-950 border-2 p-1 rounded-2xl flex flex-row items-center"
            >
              <img className="w-5 h-5" src={Cart1} alt="Cart" />
              <span className="ml-2">{t("navbar.cart")}</span>
              {cartItems.length > 0 && (
                <span className="absolute top-5 right-14 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </>
        ) : (
          <>
            <RouterLink to="/login" className="md:cursor-pointer">
              {t("navbar.login")}
            </RouterLink>
            |
            <RouterLink to="/createAccount" className="md:cursor-pointer">
              {t("navbar.register")}
            </RouterLink>
          </>
        )}
      </div>



      <div onClick={handleNav} className="block md:hidden">
        {!nav ? (
          <AiOutlineMenu size={30} className="text-blue-950" />
        ) : (
          <AiOutlineClose size={30} className="text-blue-950" />
        )}
      </div>

  {/* Menu bar */}
      {/* Menu bar */}
    {/* Mobile Navigation */}
    <ul
        className={`${
          nav ? "fixed" : "hidden"
        } left-0 top-0 w-60 h-full bg-blue-950 font-normal text-white p-4 text-xs transition-transform transform ${nav ? "translate-x-0" : "-translate-x-full"} `}
      >
        <img
          className="w-28 mb-4"
          src={Logo1}
          alt="Logo"
          onClick={handleHomeClick}
        />
        <li>
          <RouterLink
            to="/"
            className="block py-2 border-b border-white hover:text-gray-300"
            onClick={handleNav}
          >
            {t("navbar.home")}
          </RouterLink>
        </li>
        {!isLoginOrRegisterPage && (
          <>
            <li>
              <ScrollLink
                to="service"
                smooth={true}
                duration={500}
                className="block py-2 border-b border-white hover:text-gray-300"
                onClick={handleNav}
              >
                {t("navbar.services")}
              </ScrollLink>
            </li>
            
            <li className="border-b-2 border-white w-full relative">
          <span
            className="block text-white py-2 cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          >
            {t("navbar.products")}
          </span>
          {dropdown && (
            <ul className="ml-4 bg-blue-950 text-white text-xs">
              <li className="border-b-2 border-blue-950 w-full ">
                <RouterLink
                  to="/infopage"
                  className="block px-4 py-2 hover:bg-blue-950"
                  onClick={() => setNav(false)}
                >
                  {t("navbar.it")}
                </RouterLink>
              </li>
              <li className="border-b-2 border-blue-950 w-full ">
                <RouterLink
                  to="/Food"
                  className="block px-4 py-2 hover:bg-blue-900"
                  onClick={() => setNav(false)}
                >
                  {t("navbar.food")}
                </RouterLink>
              </li>
            </ul>
          )}
        </li>

            <li>
              <RouterLink
                to="/aboutus"
                className="block py-2 border-b border-white hover:text-gray-300"
                onClick={handleNav}
              >
                {t("navbar.about")}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/contactus"
                className="block py-2 border-b border-white hover:text-gray-300"
                onClick={handleNav}
              >
                {t("navbar.contact")}
              </RouterLink>
            </li>
          </>
        )}
        {isLoggedIn ? (
          <>
           <div className="flex flex-row justify-center">
                <RouterLink
                  to="/profile"
                  className="block text-white p-4 mt-2"
                  onClick={() => setNav(false)}
                >
                  <img src={acount} className="w-5 mb-2  " />

                  {t("navbar.profile")}
                </RouterLink>
                <RouterLink
                  to="/myorders"
                  className="block text-white p-4 mt-2"
                  onClick={() => setNav(false)}

                >
                  <img src={myorder} className="w-5 mb-2 " />
                  MyOrders
                </RouterLink>
                <button
                  className="block text-white p-4 mt-2 text-left"
                  onClick={handleLogoutClick}
                > <img src={logot} className="w-5 mb-2 " />
                  {t("navbar.logout")}
                </button>

              </div>
            <li>
            <button
                onClick={handleCartClick}
                className="relative border-white border-2 p-1 rounded-2xl flex flex-row items-center mt-1 mr-7 pr-6"
              >
                <img className="w-5 h-5" src={Cart} alt="Cart" />
                <span className="ml-2">{t("navbar.cart")}</span>
                {cartItems.length > 0 && (
                  <span className="absolute top-5 right-14 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
              <li className="mt-4">
                <LanguageSwitcher />
              </li>
            </li>
          </>
        ) : (
          <>
          <div className=" flex flex-row space-x-4 py-3">
                <button className="border border-white p-0 bg-transparent">
                  <RouterLink
                    to="/login"
                    className="block text-white p-2"
                    onClick={() => setNav(false)}
                  >
                    {t("navbar.login")}
                  </RouterLink>
                </button>

               <button className="border border-white p-0 bg-transparent" >
               <RouterLink
                  to="/createAccount"
                  className="block text-white p-2  "
                  onClick={() => setNav(false)}
                >
                  {t("navbar.register")}
                </RouterLink>

               </button>
                </div>
          </>
        )}
      </ul>




      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">
              {t("navbar.logoutConfirm")}
            </p>
            <div className="flex justify-center gap-10">
              <button
                className="bg-blue-950 hover:bg-blue-900 text-white py-2 px-4 rounded"
                onClick={handleConfirmLogout}
              >
                {t("Logout")}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                onClick={handleCancelLogout}
              >
                {t("navbar.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}



      
    </div>
  );
};

export default Navbar;
