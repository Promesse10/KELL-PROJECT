import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../../slices/authSlice';
import image from '../images/image.jpg';
import visible from '../images/visible.png';
import unvisible from '../images/Unvisible.png';
import Logo from '../../assets/Logo1.png';
import '../../styles/auth-pages.css';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotification('');
    setLoading(true);

    try {
      await dispatch(login(formData)).unwrap();
      navigate('/');
    } catch (error) {
      setNotification(error?.message || error?.toString() || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="kk-auth-page kk-auth-page--login">
      <section className="kk-auth-card" aria-labelledby="login-title">
        <aside className="kk-auth-art">
          <img className="kk-auth-art__logo" src={Logo} alt="" />
          <div className="kk-auth-art__image">
            <img src={image} alt={t('login.imageAlt')} />
          </div>
          <span className="kk-auth-art__spark kk-auth-art__spark--one" aria-hidden="true" />
          <span className="kk-auth-art__spark kk-auth-art__spark--two" aria-hidden="true" />
        </aside>

        <div className="kk-auth-content">
          <header className="kk-auth-heading">
            <span className="kk-auth-heading__eyebrow">{t('login.title')}</span>
            <h1 id="login-title">{t('login.title')}</h1>
          </header>

          {notification && (
            <div className="kk-auth-alert" role="alert">
              {notification}
            </div>
          )}

          <form className="kk-auth-form kk-auth-form--login" onSubmit={handleSubmit}>
            <div className="kk-auth-field">
              <label htmlFor="login-email">{t('login.emailPlaceholder')}</label>
              <input
                type="email"
                name="email"
                id="login-email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('login.emailPlaceholder')}
                required
              />
            </div>

            <div className="kk-auth-field">
              <label htmlFor="login-password">{t('login.passwordPlaceholder')}</label>
              <div className="kk-auth-password">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  id="login-password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t('login.passwordPlaceholder')}
                  required
                />
                <button
                  type="button"
                  className="kk-auth-password__toggle"
                  onClick={() => setPasswordVisible((current) => !current)}
                  aria-label={passwordVisible ? t('login.visibleAlt') : t('login.invisibleAlt')}
                >
                  <img src={passwordVisible ? visible : unvisible} alt="" />
                </button>
              </div>
            </div>

            <div className="kk-auth-form__options">
              <Link to="/ForgotPassword">{t('login.forgotPassword')}</Link>
            </div>

            <button className="kk-auth-submit" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="kk-auth-spinner" aria-hidden="true" />
                  {t('login.button')}
                </>
              ) : t('login.button')}
            </button>
          </form>

          <p className="kk-auth-switch">
            {t('login.newUser')}{' '}
            <Link to="/createAccount">{t('login.createAccount')}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginForm;
