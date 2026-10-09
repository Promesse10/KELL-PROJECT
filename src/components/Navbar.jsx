import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/Logo.png';
import Logo1 from '../assets/Logo1.png';
import LanguageSwitcher from './LanguageSwitcher';
import { logout } from '../slices/authSlice';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../slices/cartSlice';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const accountRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items) || [];
  const profileImage = typeof user?.profilePic === 'string'
    ? user.profilePic
    : user?.profilePic?.[0]?.url || user?.profilePic?.url;
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const isCheckoutPage = location.pathname === '/checkout';

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
    setIsCartOpen(false);
    setIsAccountOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen && !isCartOpen && !showLogoutConfirm) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsCartOpen(false);
        setShowLogoutConfirm(false);
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobileMenuOpen, isCartOpen, showLogoutConfirm]);

  useEffect(() => {
    const closeAccountOnOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', closeAccountOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeAccountOnOutsideClick);
  }, []);

  const handleSectionClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/', { state: { scrollTo: sectionId } });
  };

  const goHome = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/', { state: { scrollTo: 'hero' } });
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setShowLogoutConfirm(false);
    setIsAccountOpen(false);
    closeMenus();
    navigate('/');
  };

  const productLinks = [
    { label: t('navbar.it'), to: '/infopage' },
    { label: t('navbar.food'), to: '/food' },
    { label: t('navbar.cars'), to: '/cars' },
  ];

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout', { state: { cart: cartItems } });
  };

  return (
    <>
      <header className={`kk-navigation${isScrolled ? ' is-scrolled' : ''}`}>
        <button type="button" className="kk-navigation__brand" onClick={goHome} aria-label={t('navbar.home')}>
          <img src={Logo} alt="KarKelly" />
        </button>

        {!isCheckoutPage && (
          <nav className="kk-navigation__desktop" aria-label={t('navbar.mainNavigation')}>
            <button type="button" className="kk-navigation__link" onClick={goHome}>{t('navbar.home')}</button>
            <button type="button" className="kk-navigation__link" onClick={() => handleSectionClick('services')}>{t('navbar.services')}</button>
            <div className="kk-navigation__products">
              <button
                type="button"
                className="kk-navigation__link"
                aria-expanded={isProductsOpen}
                onClick={() => setIsProductsOpen((open) => !open)}
                onMouseEnter={() => setIsProductsOpen(true)}
              >
                {t('navbar.products')} <span className="kk-navigation__chevron" aria-hidden="true">⌄</span>
              </button>
              {isProductsOpen && (
                <div className="kk-navigation__dropdown" onMouseLeave={() => setIsProductsOpen(false)}>
                  {productLinks.map((item) => (
                    <RouterLink className="kk-navigation__dropdown-link" to={item.to} key={item.to} onClick={closeMenus}>
                      {item.label}<FiArrowRight aria-hidden="true" />
                    </RouterLink>
                  ))}
                </div>
              )}
            </div>
            <button type="button" className="kk-navigation__link" onClick={() => handleSectionClick('aboutus')}>{t('navbar.about')}</button>
            <button type="button" className="kk-navigation__link" onClick={() => handleSectionClick('contactus')}>{t('navbar.contact')}</button>
          </nav>
        )}

        <div className="kk-navigation__actions">
          <LanguageSwitcher />
          {!isCheckoutPage && (
            <button
              type="button"
              className="kk-navigation__cart-button"
              onClick={() => setIsCartOpen(true)}
              aria-label={t('navbar.cartWithCount', { count: cartCount })}
            >
              <FiShoppingBag aria-hidden="true" />
              <span>{t('navbar.cart')}</span>
              <span className="kk-navigation__cart-count">{cartCount}</span>
            </button>
          )}
          {isLoggedIn ? (
            <div className="kk-navigation__account" ref={accountRef}>
              <button
                type="button"
                className="kk-navigation__profile"
                aria-label={t('navbar.accountMenu')}
                aria-expanded={isAccountOpen}
                onClick={() => setIsAccountOpen((open) => !open)}
              >
                {profileImage ? <img src={profileImage} alt="" /> : <FiUser aria-hidden="true" />}
              </button>
              {isAccountOpen && (
                <div className="kk-navigation__account-menu">
                  <strong>{t('navbar.hi')}, {user?.name || 'Guest'}</strong>
                  <RouterLink to="/profile" onClick={() => setIsAccountOpen(false)}>{t('navbar.profile')}</RouterLink>
                  <RouterLink to="/myorders" onClick={() => setIsAccountOpen(false)}>{t('navbar.myOrders')}</RouterLink>
                  <button type="button" onClick={() => setShowLogoutConfirm(true)}>{t('navbar.logout')}</button>
                </div>
              )}
            </div>
          ) : (
            <div className="kk-navigation__auth">
              <RouterLink to="/login">{t('navbar.login')}</RouterLink>
              <RouterLink to="/createAccount">{t('navbar.register')}</RouterLink>
            </div>
          )}
          <button
            type="button"
            className="kk-navigation__menu-toggle"
            aria-label={isMobileMenuOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="kk-navigation__mobile-layer">
          <button
            type="button"
            className="kk-navigation__backdrop"
            aria-label={t('navbar.closeMenu')}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="kk-navigation__mobile-panel" aria-label={t('navbar.mainNavigation')}>
            <div className="kk-navigation__mobile-heading">
              <img src={Logo1} alt="KarKelly" />
              <LanguageSwitcher />
            </div>
            <button type="button" className="kk-navigation__mobile-link" onClick={goHome}>{t('navbar.home')}</button>
            <button type="button" className="kk-navigation__mobile-link" onClick={() => handleSectionClick('services')}>{t('navbar.services')}</button>
            <button
              type="button"
              className="kk-navigation__mobile-link"
              aria-expanded={isProductsOpen}
              onClick={() => setIsProductsOpen((open) => !open)}
            >
              {t('navbar.products')} <span aria-hidden="true">{isProductsOpen ? '−' : '+'}</span>
            </button>
            {isProductsOpen && (
              <div className="kk-navigation__mobile-products">
                {productLinks.map((item) => (
                  <RouterLink to={item.to} key={item.to} onClick={closeMenus}>{item.label}</RouterLink>
                ))}
              </div>
            )}
            <button type="button" className="kk-navigation__mobile-link" onClick={() => handleSectionClick('aboutus')}>{t('navbar.about')}</button>
            <button type="button" className="kk-navigation__mobile-link" onClick={() => handleSectionClick('contactus')}>{t('navbar.contact')}</button>
            {!isLoggedIn && (
              <div className="kk-navigation__mobile-auth">
                <RouterLink to="/login" onClick={closeMenus}>{t('navbar.login')}</RouterLink>
                <RouterLink to="/createAccount" onClick={closeMenus}>{t('navbar.register')}</RouterLink>
              </div>
            )}
            {isLoggedIn && (
              <div className="kk-navigation__mobile-auth">
                <RouterLink to="/profile" onClick={closeMenus}>{t('navbar.profile')}</RouterLink>
                <RouterLink to="/myorders" onClick={closeMenus}>{t('navbar.myOrders')}</RouterLink>
                <button type="button" onClick={() => setShowLogoutConfirm(true)}>{t('navbar.logout')}</button>
              </div>
            )}
          </nav>
        </div>
      )}

      {isCartOpen && (
        <div className="kk-cart-layer">
          <button
            type="button"
            className="kk-cart-layer__backdrop"
            aria-label={t('cart.closeCart')}
            onClick={() => setIsCartOpen(false)}
          />
          <aside className="kk-cart-drawer" role="dialog" aria-modal="true" aria-labelledby="kk-cart-title">
            <div className="kk-cart-drawer__heading">
              <div>
                <span className="kk-eyebrow">{t('cart.yourSelection')}</span>
                <h2 id="kk-cart-title">{t('cart.shoppingCart')} <span>({cartCount})</span></h2>
              </div>
              <button type="button" onClick={() => setIsCartOpen(false)} aria-label={t('cart.closeCart')}>
                <FiX />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="kk-cart-drawer__empty">
                    <FiShoppingBag aria-hidden="true" />
                <p>{t('cart.empty')}</p>
                <button type="button" className="kk-button kk-button--primary" onClick={() => { setIsCartOpen(false); navigate('/food'); }}>
                  {t('cart.continueShopping')} <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            ) : (
              <>
                <div className="kk-cart-drawer__items">
                  {cartItems.map((item) => (
                    <article className="kk-cart-item" key={item._id}>
                      <img src={item.images?.[0]?.url || item.image || Logo} alt={item.name} />
                      <div className="kk-cart-item__details">
                        <h3>{item.name}</h3>
                        <p>{Number(item.price || 0).toLocaleString()} {t('cart.currency')}</p>
                        <div className="kk-cart-item__controls">
                          <button type="button" aria-label={t('cart.decreaseQuantity', { name: item.name })} onClick={() => dispatch(decreaseQuantity(item._id))}><FiMinus /></button>
                          <span>{item.quantity}</span>
                          <button type="button" aria-label={t('cart.increaseQuantity', { name: item.name })} onClick={() => dispatch(increaseQuantity(item._id))}><FiPlus /></button>
                          <button type="button" className="kk-cart-item__remove" aria-label={t('cart.removeItem', { name: item.name })} onClick={() => dispatch(removeFromCart(item._id))}><FiTrash2 /></button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="kk-cart-drawer__footer">
                  <div className="kk-cart-drawer__subtotal">
                    <span>{t('cart.total')}</span>
                    <strong>{cartTotal.toLocaleString()} {t('cart.currency')}</strong>
                  </div>
                  <button type="button" className="kk-button kk-button--primary" onClick={handleCheckout}>
                    {t('cart.checkout')} <FiArrowRight aria-hidden="true" />
                  </button>
                  <button type="button" className="kk-cart-drawer__view-full" onClick={() => { setIsCartOpen(false); navigate('/cart'); }}>
                    {t('cart.viewFullCart')}
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="kk-confirm-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowLogoutConfirm(false); }}>
          <section className="kk-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="kk-logout-title">
            <h2 id="kk-logout-title">{t('navbar.logoutConfirm')}</h2>
            <div>
              <button type="button" className="kk-button kk-button--outline" onClick={() => setShowLogoutConfirm(false)}>{t('navbar.cancel')}</button>
              <button type="button" className="kk-button kk-button--primary" onClick={handleConfirmLogout}>{t('navbar.logout')}</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Navbar;
