import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useAuth } from '../context/authContext';
import Logo1 from '../assets/Logo1.png';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setNotification('');

    try {
      await loginUser({ email: email.trim(), password });
      navigate('/admin/dashboard');
    } catch (error) {
      setNotification(error.response?.data?.message || error.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="kk-admin-login">
      <div className="kk-admin-login__decor kk-admin-login__decor--one" aria-hidden="true" />
      <div className="kk-admin-login__decor kk-admin-login__decor--two" aria-hidden="true" />
      <Link className="kk-admin-login__back" to="/">
        <FiArrowLeft aria-hidden="true" /> Back to website
      </Link>

      <section className="kk-admin-login__panel">
        <div className="kk-admin-login__brand">
          <img src={Logo1} alt="KarKelly" />
          <span>MANAGEMENT PORTAL</span>
        </div>
        <div className="kk-admin-login__intro">
          <span className="kk-admin-login__eyebrow">Welcome back</span>
          <h1>Sign in to your<br />workspace.</h1>
          <p>Manage products, orders and customers from your KarKelly dashboard.</p>
        </div>

        <form className="kk-admin-login__form" onSubmit={handleSubmit}>
          {notification && <div className="kk-admin-login__error" role="alert">{notification}</div>}
          <label htmlFor="admin-email">Username or email</label>
          <div className="kk-admin-login__input">
            <FiMail aria-hidden="true" />
            <input
              id="admin-email"
              type="text"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter username or email"
              required
            />
          </div>

          <div className="kk-admin-login__password-label">
            <label htmlFor="admin-password">Password</label>
          </div>
          <div className="kk-admin-login__input">
            <FiLock aria-hidden="true" />
            <input
              id="admin-password"
              type={passwordVisible ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="kk-admin-login__password-toggle"
              onClick={() => setPasswordVisible((visible) => !visible)}
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            >
              {passwordVisible ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
            </button>
          </div>

          <button className="kk-admin-login__submit" type="submit" disabled={loading}>
            {loading ? <><span className="kk-admin-login__spinner" /> Signing in…</> : 'Sign in securely'}
          </button>
          <p className="kk-admin-login__security"><FiLock aria-hidden="true" /> Protected access for authorized administrators</p>
        </form>
      </section>
      <footer className="kk-admin-login__footer">© {new Date().getFullYear()} KarKelly · Good service. Better tomorrows.</footer>
    </main>
  );
};

export default LoginAdmin;
