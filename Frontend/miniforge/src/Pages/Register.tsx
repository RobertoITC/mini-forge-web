// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { supabase } from '../Lib/supabaseClient';

const Register: React.FC = () => {
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm]   = useState('');
    const [error, setError]       = useState<string | null>(null);
    const [sent, setSent]         = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirm) {
            return setError('Passwords do not match');
        }

        try {
            // 1) Create user in Supabase Auth
            await signUp(email, password);

            // 2) Build a default one-letter avatar URL
            const initial = username.trim().charAt(0).toUpperCase() || 'U';
            const avatarUrl = `https://ui-avatars.com/api/?name=${initial}&background=AB2724&color=F7E9E9`;

            // 3) Get the newly created user's ID
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();
            if (userError || !user) throw userError ?? new Error('User not found');

            // 4) Upsert profile row with username + avatar
            const { error: upsertError } = await supabase
                .from('profiles')
                .upsert({ id: user.id, username, avatar_url: avatarUrl });
            if (upsertError) throw upsertError;

            // 5) Show confirmation message
            setSent(true);
        } catch (e: any) {
            console.error(e);
            setError(e.message);
        }
    };

    if (sent) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#F7E9E9]">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm">
                    <h2 className="text-2xl font-bold text-[#561412] mb-4">Check your email</h2>
                    <p className="text-[#561412]">
                        A confirmation link has been sent to <strong>{email}</strong>. Click it to activate your account.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-6 text-[#AB2724] underline"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F7E9E9]">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 space-y-4 w-80"
            >
                <h1 className="text-xl font-bold text-center text-[#561412]">Create Account</h1>
                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full p-3 border rounded focus:ring-[#AB2724]"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-3 border rounded focus:ring-[#AB2724]"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-3 border rounded focus:ring-[#AB2724]"
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    className="w-full p-3 border rounded focus:ring-[#AB2724]"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-[#AB2724] text-white py-2 rounded hover:bg-[#781B19] transition"
                >
                    Register
                </button>

                <p className="text-center text-sm">
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-[#AB2724] underline"
                    >
                        Sign In
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Register;