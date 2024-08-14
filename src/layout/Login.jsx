import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import visible from '../assets/visible.png';
import unvisible from '../assets/Unvisible.png';
import { useAuth } from '../context/authContext';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email: username, password });
      navigate('/admin/dashboard'); // Redirect to admin dashboard on successful login
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error.message || 'Login failed');
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
        <button type="submit" className="w-full p-2 bg-blue-950 text-white rounded">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginAdmin;
