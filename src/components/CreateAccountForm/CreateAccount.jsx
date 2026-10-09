import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { register } from '../../slices/authSlice';
import image from '../images/image.jpg';
import visible from '../images/visible.png';
import unvisible from '../images/Unvisible.png';
import Logo from '../../assets/Logo1.png';
import '../../styles/auth-pages.css';

const Spinner = () => (
  <svg
    className="kk-auth-spinner"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 12a8 8 0 118 8V4a8 8 0 00-8 8z"
    />
  </svg>
);

function CreateAccount() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    agreeToTerms: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true); // Set loading to true when the request starts

    if (!formData.agreeToTerms) {
      setNotification(t('createAccount.agreeToTermsAlert'));
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('address', formData.address);
    data.append('phone', formData.phone);

    try {
      const resultAction = await dispatch(register(data)).unwrap();
      setNotification(resultAction.message); 
      navigate('/check-email');
    } catch (err) {
      // Display the error message from the backend response if available
      if (err.response && err.response.data && err.response.data.message) {
        setNotification(err.response.data.message);
      } else {
        setNotification(err.toString());
      }
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <main className="kk-auth-page kk-auth-page--register">
      <section className="kk-auth-card" aria-labelledby="register-title">
        <aside className="kk-auth-art">
          <img className="kk-auth-art__logo" src={Logo} alt="" />
          <div className="kk-auth-art__image">
            <img src={image} alt={t('createAccount.imageAlt')} />
          </div>
          <span className="kk-auth-art__spark kk-auth-art__spark--one" aria-hidden="true" />
          <span className="kk-auth-art__spark kk-auth-art__spark--two" aria-hidden="true" />
        </aside>

        <div className="kk-auth-content">
          <header className="kk-auth-heading">
            <span className="kk-auth-heading__eyebrow">{t('createAccount.title')}</span>
            <h1 id="register-title">{t('createAccount.title')}</h1>
          </header>

          {notification && (
            <div className="kk-auth-alert" role="alert">
              {notification}
            </div>
          )}

          <form className="kk-auth-form kk-auth-form--register" onSubmit={handleSubmit}>
            <div className="kk-auth-field">
              <label htmlFor="register-name">{t('createAccount.namePlaceholder')}</label>
              <input
                type="text"
                name="name"
                id="register-name"
                autoComplete="name"
                placeholder={t('createAccount.namePlaceholder')}
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>

            <div className="kk-auth-field">
              <label htmlFor="register-email">{t('createAccount.emailPlaceholder')}</label>
              <input
                type="email"
                name="email"
                id="register-email"
                autoComplete="email"
                placeholder={t('createAccount.emailPlaceholder')}
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            <div className="kk-auth-field">
              <label htmlFor="register-password">{t('createAccount.passwordPlaceholder')}</label>
              <div className="kk-auth-password">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  id="register-password"
                  autoComplete="new-password"
                  placeholder={t('createAccount.passwordPlaceholder')}
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
                <button
                  type="button"
                  className="kk-auth-password__toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={passwordVisible ? t('createAccount.visibleAlt') : t('createAccount.unvisibleAlt')}
                >
                  <img src={passwordVisible ? visible : unvisible} alt="" />
                </button>
              </div>
            </div>

            <div className="kk-auth-field">
              <label htmlFor="register-phone">{t('createAccount.phonePlaceholder')}</label>
              <input
                type="tel"
                name="phone"
                id="register-phone"
                autoComplete="tel"
                placeholder={t('createAccount.phonePlaceholder')}
                onChange={handleChange}
                value={formData.phone}
                required
              />
            </div>

            <div className="kk-auth-field kk-auth-field--wide">
              <label htmlFor="register-address">{t('createAccount.addressPlaceholder')}</label>
              <input
                type="text"
                name="address"
                id="register-address"
                autoComplete="street-address"
                placeholder={t('createAccount.addressPlaceholder')}
                onChange={handleChange}
                value={formData.address}
                required
              />
            </div>

            <div className="kk-auth-terms kk-auth-field--wide">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeToTerms">
                {t('createAccount.agreeToTermsLabel')}{' '}
                <Link to="/terms">{t('createAccount.termsOfService')}</Link>.
              </label>
            </div>

            <button className="kk-auth-submit kk-auth-field--wide" type="submit" disabled={loading}>
              {loading ? <Spinner /> : t('createAccount.registerButton')}
            </button>
          </form>

          <p className="kk-auth-switch">
            {t('createAccount.alreadyHaveAccount')}{' '}
            <Link to="/login">{t('createAccount.loginNow')}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default CreateAccount;
