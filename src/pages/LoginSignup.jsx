import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUser,
} from 'react-icons/fi';
import { login, register } from '../slices/authSlice';
import illustration from '../components/images/image.jpg';
import '../styles/auth-pages.css';

function LoginSignup() {
  const location = useLocation();
  const [mode, setMode] = useState(() => (
    location.pathname.toLowerCase() === '/createaccount' ? 'register' : 'login'
  ));
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    agreeToTerms: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isRegistering = mode === 'register';

  useEffect(() => {
    setMode(location.pathname.toLowerCase() === '/createaccount' ? 'register' : 'login');
  }, [location.pathname]);

  const switchMode = (nextMode) => {
    if (loading || nextMode === mode) return;
    setNotification('');
    setPasswordVisible(false);
    setMode(nextMode);
    navigate(nextMode === 'register' ? '/createAccount' : '/login');
  };

  const handleLoginChange = (event) => {
    setLoginData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setRegisterData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setNotification('');
    setLoading(true);

    try {
      await dispatch(login(loginData)).unwrap();
      navigate('/');
    } catch (error) {
      setNotification(error?.message || error?.toString() || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setNotification('');

    if (!registerData.agreeToTerms) {
      setNotification(t('createAccount.agreeToTermsAlert'));
      return;
    }

    const data = new FormData();
    data.append('name', registerData.name);
    data.append('email', registerData.email);
    data.append('password', registerData.password);
    data.append('address', registerData.address);
    data.append('phone', registerData.phone);

    setLoading(true);
    try {
      await dispatch(register(data)).unwrap();
      navigate('/check-email');
    } catch (error) {
      setNotification(error?.message || error?.toString() || 'Unable to create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`kk-auth-page ${isRegistering ? 'kk-auth-page--register' : 'kk-auth-page--login'}`}>
      <section className="kk-auth-card" aria-label={isRegistering ? t('createAccount.title') : t('login.title')}>
        <div className="kk-auth-visual" aria-hidden="true">
          <div className="kk-auth-visual__rings" />
          <div className="kk-auth-visual__frame">
            <img src={illustration} alt="" />
          </div>
          <span className="kk-auth-visual__spark">
            <FiCheck />
          </span>
          <p className="kk-auth-visual__caption">Karkelly Company Ltd</p>
        </div>

        <div className="kk-auth-content">
          <div className="kk-auth-content__inner" key={mode}>
            <header className="kk-auth-heading">
              <span className="kk-auth-heading__eyebrow">
                <FiShield aria-hidden="true" />
                {isRegistering ? t('createAccount.title') : t('login.title')}
              </span>
              <h1>{isRegistering ? t('createAccount.title') : t('login.title')}</h1>
              <p>{isRegistering ? t('createAccount.intro') : t('login.intro')}</p>
            </header>

            {notification && (
              <div className="kk-auth-alert" role="alert">
                {notification}
              </div>
            )}

            {isRegistering ? (
              <form className="kk-auth-form kk-auth-form--register" onSubmit={handleRegisterSubmit}>
                <div className="kk-auth-field">
                  <label htmlFor="register-name">{t('createAccount.namePlaceholder')}</label>
                  <div className="kk-auth-input">
                    <FiUser aria-hidden="true" />
                    <input
                      type="text"
                      name="name"
                      id="register-name"
                      autoComplete="name"
                      placeholder={t('createAccount.namePlaceholder')}
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>

                <div className="kk-auth-field">
                  <label htmlFor="register-email">{t('createAccount.emailPlaceholder')}</label>
                  <div className="kk-auth-input">
                    <FiMail aria-hidden="true" />
                    <input
                      type="email"
                      name="email"
                      id="register-email"
                      autoComplete="email"
                      placeholder={t('createAccount.emailPlaceholder')}
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>

                <div className="kk-auth-field">
                  <label htmlFor="register-password">{t('createAccount.passwordPlaceholder')}</label>
                  <div className="kk-auth-input">
                    <FiLock aria-hidden="true" />
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      id="register-password"
                      autoComplete="new-password"
                      placeholder={t('createAccount.passwordPlaceholder')}
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                    />
                    <button
                      type="button"
                      className="kk-auth-password-toggle"
                      onClick={() => setPasswordVisible((current) => !current)}
                      aria-label={passwordVisible ? t('createAccount.visibleAlt') : t('createAccount.unvisibleAlt')}
                    >
                      {passwordVisible ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                <div className="kk-auth-field">
                  <label htmlFor="register-phone">{t('createAccount.phonePlaceholder')}</label>
                  <div className="kk-auth-input">
                    <FiPhone aria-hidden="true" />
                    <input
                      type="tel"
                      name="phone"
                      id="register-phone"
                      autoComplete="tel"
                      placeholder={t('createAccount.phonePlaceholder')}
                      value={registerData.phone}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>

                <div className="kk-auth-field kk-auth-field--wide">
                  <label htmlFor="register-address">{t('createAccount.addressPlaceholder')}</label>
                  <div className="kk-auth-input">
                    <FiMapPin aria-hidden="true" />
                    <input
                      type="text"
                      name="address"
                      id="register-address"
                      autoComplete="street-address"
                      placeholder={t('createAccount.addressPlaceholder')}
                      value={registerData.address}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>

                <div className="kk-auth-terms kk-auth-field--wide">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    id="register-terms"
                    checked={registerData.agreeToTerms}
                    onChange={handleRegisterChange}
                  />
                  <label htmlFor="register-terms">
                    {t('createAccount.agreeToTermsLabel')}{' '}
                    <Link to="/terms">{t('createAccount.termsOfService')}</Link>.
                  </label>
                </div>

                <button className="kk-auth-submit kk-auth-field--wide" type="submit" disabled={loading}>
                  {loading ? <><span className="kk-auth-spinner" /> {t('createAccount.registerButton')}</> : <>{t('createAccount.registerButton')} <FiArrowRight aria-hidden="true" /></>}
                </button>
              </form>
            ) : (
              <form className="kk-auth-form kk-auth-form--login" onSubmit={handleLoginSubmit}>
                <div className="kk-auth-field">
                  <label htmlFor="login-email">{t('login.emailPlaceholder')}</label>
                  <div className="kk-auth-input">
                    <FiUser aria-hidden="true" />
                    <input
                      type="text"
                      name="email"
                      id="login-email"
                      autoComplete="username"
                      placeholder={t('login.emailPlaceholder')}
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                </div>

                <div className="kk-auth-field">
                  <label htmlFor="login-password">{t('login.passwordPlaceholder')}</label>
                  <div className="kk-auth-input">
                    <FiLock aria-hidden="true" />
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      id="login-password"
                      autoComplete="current-password"
                      placeholder={t('login.passwordPlaceholder')}
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                    <button
                      type="button"
                      className="kk-auth-password-toggle"
                      onClick={() => setPasswordVisible((current) => !current)}
                      aria-label={passwordVisible ? t('login.visibleAlt') : t('login.invisibleAlt')}
                    >
                      {passwordVisible ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                <div className="kk-auth-form__options">
                  <Link to="/ForgotPassword">{t('login.forgotPassword')}</Link>
                </div>

                <button className="kk-auth-submit" type="submit" disabled={loading}>
                  {loading ? <><span className="kk-auth-spinner" /> {t('login.button')}</> : <>{t('login.button')} <FiArrowRight aria-hidden="true" /></>}
                </button>
              </form>
            )}

            <p className="kk-auth-switch">
              {isRegistering ? t('createAccount.alreadyHaveAccount') : t('login.newUser')}{' '}
              <button type="button" onClick={() => switchMode(isRegistering ? 'login' : 'register')} disabled={loading}>
                {isRegistering ? t('createAccount.loginNow') : t('login.createAccount')}
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginSignup;
