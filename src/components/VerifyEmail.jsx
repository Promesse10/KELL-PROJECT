import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyEmail } from '../slices/authSlice';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();  // Get the query string from the location
  const [message, setMessage] = useState('');

  const { loading, error } = useSelector((state) => state.auth);

  // Extract the token from the query parameters
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token))
        .unwrap()
        .then(() => {
          setMessage('Email verification successful! Redirecting...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        })
        .catch((err) => {
          setMessage(err || 'Email verification failed!');
        });
    } else {
      setMessage('Invalid verification link!');
    }
  }, [token, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 max-w-md bg-white rounded-lg shadow-md">
        {loading ? (
          <p className="text-center text-lg">Verifying your email, please wait...</p>
        ) : (
          <p className="text-center text-lg">{error ? error : message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
