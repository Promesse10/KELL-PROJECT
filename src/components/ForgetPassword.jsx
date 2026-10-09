import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiMail, FiShield, FiX } from 'react-icons/fi';
import { resetPassword } from '../slices/authSlice';
import '../styles/auth-pages.css';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !loadingRef.current) navigate('/login');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      await dispatch(resetPassword({ email, answer, newPassword })).unwrap();
      setFeedback({ type: 'success', message: 'Password reset successful. You can now sign in.' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: typeof error === 'string' ? error : error?.message || 'Unable to reset your password. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="kk-forgot-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) navigate('/login');
      }}
    >
      <section
        className="kk-forgot-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
      >
        <Link className="kk-forgot-close" to="/login" aria-label="Close password reset">
          <FiX aria-hidden="true" />
        </Link>

        <div className="kk-forgot-icon" aria-hidden="true">
          <FiShield />
        </div>
        <span className="kk-forgot-eyebrow">Account security</span>
        <h1 id="forgot-password-title">Reset your password</h1>
        <p className="kk-forgot-intro">Enter your account details to choose a new password.</p>

        {feedback && (
          <div className={`kk-auth-alert kk-forgot-feedback kk-forgot-feedback--${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
            {feedback.message}
          </div>
        )}

        <form className="kk-auth-form kk-forgot-form" onSubmit={handleSubmit}>
          <div className="kk-auth-field">
            <label htmlFor="forgot-email">Email</label>
            <div className="kk-auth-input">
              <FiMail aria-hidden="true" />
              <input
                type="email"
                id="forgot-email"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="kk-auth-field">
            <label htmlFor="forgot-answer">Security answer</label>
            <div className="kk-auth-input">
              <FiShield aria-hidden="true" />
              <input
                type="text"
                id="forgot-answer"
                name="answer"
                placeholder="Enter your security answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="kk-auth-field">
            <label htmlFor="forgot-new-password">New password</label>
            <div className="kk-auth-input">
              <FiLock aria-hidden="true" />
              <input
                type="password"
                id="forgot-new-password"
                name="newPassword"
                autoComplete="new-password"
                placeholder="Choose a new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                minLength={6}
                required
              />
            </div>
          </div>

          <button className="kk-auth-submit" type="submit" disabled={loading}>
            {loading ? <><span className="kk-auth-spinner" /> Resetting password…</> : 'Reset password'}
          </button>
        </form>

        <Link className="kk-forgot-back" to="/login">
          <FiArrowLeft aria-hidden="true" /> Back to sign in
        </Link>
      </section>
    </div>
  );
}

export default ForgotPasswordForm;
