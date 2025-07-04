import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Lib/supabaseClient';



const Login: React.FC = () => {
    const { signIn } = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [err, setErr] = useState<string | null>(null);

    const loginWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
    };

    const handle = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, pw);
            nav('/profile');
        } catch (e: any) {
            setErr(e.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F7E9E9]">
            <form onSubmit={handle} className="bg-white rounded-lg shadow p-8 space-y-6 w-80">
                <h1 className="text-xl font-bold text-center text-[#561412]">Sign In</h1>
                {err && <p className="text-red-600 text-sm">{err}</p>}
                <input
                    className="w-full p-3 border rounded focus:ring-[#AB2724]"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="w-full p-3 border rounded focus:ring-[#AB2724]"
                    type="password"
                    placeholder="Password"
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                />
                <button className="w-full bg-[#AB2724] text-white py-2 rounded hover:bg-[#781B19] transition">
                    Login
                </button>
                <div className="mt-4 text-center">
                    <p className="text-[#561412]">
                        Don't have an account?{' '}
                        <button
                            onClick={() => nav('/register')}
                            className="text-[#AB2724] hover:underline"
                        >
                            Register
                        </button>
                    </p>
                </div>
                <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="G" className="w-5 h-5" />
                    Continue with Google
                </button>
            </form>


        </div>
    );
};

export default Login;