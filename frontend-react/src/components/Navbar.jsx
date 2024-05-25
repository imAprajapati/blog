import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">My Blog</Link>
        <div>
          <Link to="/" className="text-white mr-4 hover:underline">Home</Link>
          <Link to="/blogs" className="text-white hover:underline">Blog</Link>
          <Link to="/create" className="text-white ml-4 hover:underline">Create Blog</Link>
          <Link to="/login" className="text-white ml-4 hover:underline">Login</Link>
          <Link to="/signup" className="text-white ml-4 hover:underline">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
