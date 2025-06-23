import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logoW02.png';
import { useAuth } from '../Contexts/AuthContext';

const NavBar: React.FC = () => {
  // ✅ Hooks must live here, inside the component body
  const { user, signOut } = useAuth();

  return (
      <nav className="bg-[#AB2724] text-white shadow-md font-mono text-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img className="h-10" src={logo} alt="logo" />
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

            {user ? (
                <>
                  <Link to="/profile" className="hover:text-[#781B19] transition">
                    Profile
                  </Link>
                  <button onClick={signOut} className="hover:text-[#781B19] transition">
                    Logout
                  </button>
                </>
            ) : (
                <Link to="/login" className="hover:text-[#781B19] transition">
                  Login
                </Link>
            )}
          </div>
        </div>
      </nav>
  );
};

export default NavBar;