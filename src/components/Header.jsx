// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/">
        <img src="/path/to/your/logo.png" alt="Logo" className="h-8" />
      </Link>
      <Link to="/cart">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <span className="mr-2">Cart</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l1 5h10l1-5h2M6 14a2 2 0 100 4 2 2 0 000-4zM18 14a2 2 0 100 4 2 2 0 000-4zM6 6l1 5h10l1-5H6zM4 6H2v14h14v-2H4V6z" />
          </svg>
        </button>
      </Link>
    </header>
  );
}

export default Header;
