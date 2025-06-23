

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logoW02.png'; // Adjust the path as necessary

const NavBar: React.FC = () => (
  <nav className="bg-[#AB2724] text-white shadow-md font-mono text-lg">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      {/* Logo */}

      <Link to="/" className="text-2xl font-bold flex flex-row'">

        <img className="h-15" src={logo} alt="logo" />


      </Link>
      <div className="space-x-6">
        <Link to="/" className="hover:text-[#781B19] transition">
          Home
        </Link>
        <Link to="/products" className="hover:text-[#781B19] transition">
          Products
        </Link>
        <Link to="/about" className="hover:text-[#781B19] transition">
          About
        </Link>
        <Link to="/contact" className="hover:text-[#781B19] transition">
          Contact
        </Link>
      </div>
    </div>
  </nav>
);

export default NavBar;