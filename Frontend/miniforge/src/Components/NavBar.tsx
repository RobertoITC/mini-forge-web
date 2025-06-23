import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logoW02.png';
import { useAuth } from '../Contexts/AuthContext';
import { supabase } from '../Lib/supabaseClient';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../Contexts/CartContext';


const NavBar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initial, setInitial] = useState<string>('');
  const { items } = useCart();
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    if (!user) return;
    // Fetch profile data
    const fetchProfile = async () => {
      const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .maybeSingle();
      if (error) {
        console.error('Error loading profile in NavBar:', error);
        return;
      }
      if (data) {
        setAvatarUrl(data.avatar_url);
        const name = data.username || '';
        setInitial(name.trim().charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase());
      }
    };

    fetchProfile();
  }, [user]);

  return (
      <nav className="bg-[#AB2724] text-white shadow-md font-mono text-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img className="h-10" src={logo} alt="logo" />
            <span className="text-2xl font-bold">MiniForge</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-[#781B19] transition">Home</Link>
            <Link to="/products" className="hover:text-[#781B19] transition">Products</Link>
            <Link to="/about" className="hover:text-[#781B19] transition">About</Link>
            <Link to="/contact" className="hover:text-[#781B19] transition">Contact</Link>

            {user ? (
                <>
                  <button
                      onClick={() => navigate('/profile')}
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none"
                  >
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#561412] flex items-center justify-center text-white font-bold">
                          {initial}
                        </div>

                    )}
                  </button>
                  <Link to="/cart" className="relative">
                    <ShoppingCart className="w-6 h-6 hover:text-[#781B19] transition" />
                    {totalQty > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#781B19] text-white text-xs px-1.5 rounded-full">
                        {totalQty}
                        </span>
                    )}
                  </Link>
                  <button
                      onClick={signOut}
                      className="hover:text-[#781B19] transition"
                  >
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