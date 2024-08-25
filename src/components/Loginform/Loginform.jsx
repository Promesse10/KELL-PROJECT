import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../../slices/authSlice';
import image from '../images/image.jpg';
import visible from '../images/visible.png';
import unvisible from '../images/Unvisible.png';
import './Loginform.css';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Spinner = () => (
    <svg
      className="w-5 h-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 12a8 8 0 118 8V4a8 8 0 00-8 8z"
      />
    </svg>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({}); // Clear previous errors
    try {
      await dispatch(login(formData)).unwrap();
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      if (err.response && err.response.data) {
        setFormErrors(err.response.data.errors || { general: t('login.failed') });
      } else {
        setFormErrors({ general: t('login.failed') });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full h-full max-w-4xl p-10 bg-white rounded-lg shadow-md flex-grow mt-44 mb-44">
        <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-center">
          {formErrors.general && (
            <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
              {formErrors.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-4xl font-semibold text-center text-600">{t('login.title')}</h1>
            <div>
              <input
                type="text"
                name="email"
                placeholder={t('login.emailPlaceholder')}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
              />
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </div>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder={t('login.passwordPlaceholder')}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {passwordVisible ? (
                  <img src={visible} className="w-7" alt={t('login.visibleAlt')} />
                ) : (
                  <img src={unvisible} className="w-7" alt={t('login.invisibleAlt')} />
                )}
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-40 p-3 text-white bg-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              >
                {loading ? <Spinner /> : t('login.button')}
              </button>
            </div>
            {error && <p className="text-red-500 text-center">{t(`login.errors.${error.message}`)}</p>}
          </form>
          <p className="text-center text-gray-400">
            <a href="/ForgotPassword" className="text-600 hover:underline">{t('login.forgotPassword')}</a>
          </p>
          <p className="text-center text-gray-400">
            {t('login.newUser')} <a href="/CreateAccount" className="text-600 hover:underline">{t('login.createAccount')}</a>
          </p>
        </div>
        <div className="hidden md:flex justify-center items-center w-1/2">
          <img src={image} alt={t('login.imageAlt')} className="w-52 h-72" />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
