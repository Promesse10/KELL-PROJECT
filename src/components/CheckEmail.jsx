import React from 'react';
import { useNavigate } from 'react-router-dom';
import sent from "../assets/sent.svg"

const CheckEmail = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center mt-10 items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <img
          src={sent}
          alt="Email Sent"
          className="w-24 mx-auto mb-6"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Check your email!
        </h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email. Please verify your email to complete the registration.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        >
          Go to Login
        </button>
        <p className="mt-6 text-sm text-gray-500">
          Didn't receive the email? <a href="/resend-verification" className="text-blue-900 hover:underline">Resend verification email</a>.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
