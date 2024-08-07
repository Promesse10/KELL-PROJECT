import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import visible from '../assets/visible.png'; // Update with the correct path to your visible icon
import unvisible from '../assets/Unvisible.png'; // Update with the correct path to your unvisible icon

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual authentication logic
    if (username === 'Kelia' && password === '123') {
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onLogin(true);
    } else {
      toast.error('Username or Password incorrect', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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

export default Login;
