import React, { useState, useRef, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from "../assets/Logo.png";
import Logo1 from "../assets/Logo1.png";
import { logout } from "../slices/authSlice";
import Cart1 from "../assets/Cart1.png";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../assets/Cart.png";
import { removeFromCart } from "../slices/cartSlice";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

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
                <ScrollLink
                  to="aboutus"
                  smooth={true}
                  duration={500}
                  className="hover:border-b-4 hover:border-blue-950"
                >
                  {t("navbar.about")}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="contactus"
                  smooth={true}
                  duration={500}
                  className="hover:border-b-4 hover:border-blue-950"
                >
                  {t("navbar.contact")}
                </ScrollLink>
              </li>
            </>
          )}
        </ul>
      )}

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
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>


     {/* Menu bar */}
      <ul
        className={`${
          nav ? "fixed" : "hidden"
        } left-0 top-0 w-60 h-full bg-blue-950 text-white ease-in-out duration-500 md:hidden z-10 px-4 text-xs`}
      >
        <li className="flex justify-between items-center border-b-2 border-blue-950 w-full">
          <img className="w-20 cursor-pointer" src={Logo1} alt="Logo" />
        
        </li>

        <li className="border-b-2 border-white w-full mt-2">
          <span
            onClick={handleHomeClick}
            className="block text-white p-4 cursor-pointer"
          >
            {t("navbar.home")}
          </span>
        </li>
        <li className="border-b-2 border-white w-full mt-2">
          <ScrollLink
            to="services"
            smooth={true}
            duration={500}
            className="block text-white p-4 cursor-pointer"
            onClick={() => setNav(false)}
          >
            {t("navbar.services")}
          </ScrollLink>
        </li>
        <li className="border-b-2 border-white w-full mt-2 relative">
          <span
            className="block text-white p-4 cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          >
            {t("navbar.products")}
          </span>
          {dropdown && (
            <ul className="ml-4 bg-blue-950 text-white text-sm">
              <li className="border-b-2 border-blue-950 w-full mt-2">
                <RouterLink
                  to="/infopage"
                  className="block px-4 py-2 hover:bg-blue-950"
                  onClick={() => setNav(false)}
                >
                  {t("navbar.it")}
                </RouterLink>
              </li>
              {/* <li className="border-b-2 border-blue-950 w-full mt-2">
                <RouterLink
                  to="/Construction"
                  className="block px-4 py-2 hover:bg-blue-950"
                  onClick={() => setNav(false)}
                >
                  {t("navbar.civil")}
                </RouterLink>
              </li> */}
              <li className="border-b-2 border-blue-950 w-full mt-2">
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
        <li className="border-b-2 border-white w-full mt-2">
          <ScrollLink
            to="aboutus"
            smooth={true}
            duration={500}
            className="block text-white p-4 cursor-pointer"
            onClick={() => setNav(false)}
          >
            {t("navbar.about")}
          </ScrollLink>
        </li>
        <li className="border-b-2 border-white w-full mt-2">
          <ScrollLink
            to="contactus"
            smooth={true}
            duration={500}
            className="block text-white p-4 cursor-pointer"
            onClick={() => setNav(false)}
          >
            {t("navbar.contact")}
          </ScrollLink>
        </li>
        <li className="border-b-2 border-blue-950 w-full mt-2">
          <LanguageSwitcher />
        </li>
        
</ul>



      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">
              {t("navbar.logoutConfirm")}
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                onClick={handleConfirmLogout}
              >
                {t("navbar.confirmLogout")}
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
