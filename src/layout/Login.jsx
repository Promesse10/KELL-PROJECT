import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import visible from '../assets/visible.png';
import unvisible from '../assets/Unvisible.png';
import { useAuth } from '../context/authContext';

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

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const [notification, setNotification] = useState(''); // State for notifications
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setNotification(''); // Clear previous notifications
    try {
      await loginUser({ email: username, password });
      navigate('/admin/dashboard'); // Redirect to admin dashboard on successful login
      toast.success('Login successful!');
    } catch (err) {
      // Display the error message from the backend response if available
      if (err.response && err.response.data && err.response.data.message) {
        setNotification(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setNotification(err.toString());
        toast.error(err.toString());
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      <form onSubmit={handleSubmit} className="p-10 bg-white shadow-md rounded relative">
        <h2 className="mb-4 text-xl font-bold">Admin ~ Login</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-2 text-sm">Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {passwordVisible ? (
              <img src={visible} className="w-7 mt-7" alt="Show password" />
            ) : (
              <img src={unvisible} className="w-7 mt-7" alt="Hide password" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-950 text-white rounded flex items-center justify-center"
          disabled={loading} 
        >
          {loading ? <Spinner /> : 'Login'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginAdmin;
