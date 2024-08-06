

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from './Loginform/Loginform'; // Adjust the import path if necessary
import CreateAccount from './CreateAccountForm/CreateAccount'; // Adjust the import path if necessary

function AuthPopup() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const { t } = useTranslation();

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowCreateAccount(false); // Hide Create Account popup if it's open
  };

  const toggleCreateAccount = () => {
    setShowCreateAccount(!showCreateAccount);
    setShowLogin(false); // Hide Login popup if it's open
  };

  return (
    <div>
      <button onClick={toggleLogin} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        {t('auth.logIn')}
      </button>
      <button onClick={toggleCreateAccount} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
        {t('auth.createAccount')}
      </button>

      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
            <LoginForm />
            <button
              onClick={toggleLogin}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {showCreateAccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
            <CreateAccount />
            <button
              onClick={toggleCreateAccount}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthPopup;
