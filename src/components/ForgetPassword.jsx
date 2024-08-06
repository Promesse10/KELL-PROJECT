


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../slices/authSlice';

import { useNavigate } from 'react-router-dom';



function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [answer, setAnswer] = useState(''); // Define `answer` if needed
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ email, newPassword })).unwrap();
      alert('Password reset successful, please login.');
      navigate("/login");
    } catch (err) {
      // Handle any errors if needed
      alert('Error resetting password: ' + (err.message || 'An unexpected error occurred.'));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength="6" // Adjust as needed
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <input
              type="text"
              name="answer"
              placeholder="Security Answer" // Adjust placeholder if needed
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required // If applicable
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 text-white bg-blue-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
