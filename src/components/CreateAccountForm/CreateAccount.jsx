

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { register } from '../../slices/authSlice';
import image from '../images/image.jpg';
import visible from '../images/visible.png';
import unvisible from '../images/Unvisible.png';
import './CreateAccount.css';

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
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
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
    if (!formData.agreeToTerms) {
      alert(t('createAccount.agreeToTermsAlert'));
      return;
    }
    try {
      const resultAction = await dispatch(register(formData)).unwrap();
      setNotification(resultAction.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setNotification(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center px-4 sm:px-6 lg:px-8 mt-16 p-24">
        <div className="flex flex-col md:flex-row w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
          <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
            <img src={image} alt={t('createAccount.imageAlt')} className="w-52 h-72" />
          </div>
          <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-center">
            {notification && (
              <div className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg" role="alert">
                {notification}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-4xl font-semibold text-center text-custom-blue">{t('createAccount.title')}</h1>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder={t('createAccount.namePlaceholder')}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder={t('createAccount.emailPlaceholder')}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder={t('createAccount.passwordPlaceholder')}
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
                    <img src={visible} className="w-7" alt={t('createAccount.visibleAlt')} />
                  ) : (
                    <img src={unvisible} className="w-7" alt={t('createAccount.unvisibleAlt')} />
                  )}
                </button>
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder={t('createAccount.addressPlaceholder')}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="phone"
                  placeholder={t('createAccount.phonePlaceholder')}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor="agreeToTerms" className="text-gray-500 text-sm">
                  {t('createAccount.agreeToTermsLabel')}{' '}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    {t('createAccount.termsOfService')}
                  </a>.
                </label>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-40 p-3 text-white bg-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                >
                  {t('createAccount.registerButton')}
                </button>
              </div>
              <p className="text-center text-gray-400">
                {t('createAccount.alreadyHaveAccount')}{' '}
                <a href="/login" className="text-600 hover:underline">
                  {t('createAccount.loginNow')}
                </a>
              </p>
              {error && <p className="text-red-500 text-center">{error.message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
