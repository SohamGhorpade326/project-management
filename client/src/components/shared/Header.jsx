import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-black font-bold text-xl ">PixelForge Nexus</Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 hidden sm:block">Welcome, {user.username} <span className="text-gray-400">({user.role})</span></span>
              <Link to="/account" className="text-gray-300 hover:text-blue-400 transition">Account</Link>
              <button onClick={handleLogout} className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-blue-400">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;