import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const { signUp } = useAuth();
    const nav = useNavigate();

    const [email, setEmail]   = useState('');
    const [pw, setPw]         = useState('');
    const [pw2, setPw2]       = useState('');
    const [err, setErr]       = useState<string | null>(null);
    const [sent, setSent]     = useState(false);

    const handle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pw !== pw2) return setErr('Passwords do not match');
        try {
            await signUp(email, pw);
            setSent(true);
        } catch (e: any) {
            setErr(e.message);
        }
    };

    if (sent) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#F7E9E9]">
                <div className="bg-white shadow rounded-lg p-8 text-center max-w-sm">
                    <h1 className="text-2xl font-bold text-[#561412] mb-4">Check your email</h1>
                    <p className="text-[#561412]">
                        We’ve sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
                    </p>
                    <button onClick={() => nav('/login')} className="mt-6 text-[#AB2724] underline">
                        Back to login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F7E9E9]">
            <form onSubmit={handle} className="bg-white shadow rounded-lg p-8 space-y-6 w-80">
                <h1 className="text-xl font-bold text-center text-[#561412]">Create Account</h1>
                {err && <p className="text-red-600 text-sm">{err}</p>}
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
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                    className="w-full p-3 border rounded focus:ring-[#AB2724]"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={pw2}
                    onChange={e => setPw2(e.target.value)}
                    className="w-full p-3 border rounded focus:ring-[#AB2724]"
                    required
                />
                <button className="w-full bg-[#AB2724] text-white py-2 rounded hover:bg-[#781B19] transition">
                    Register
                </button>
                <p className="text-center text-sm">
                    Already have an account?{' '}
                    <button type="button" onClick={() => nav('/login')} className="text-[#AB2724] underline">
                        Sign in
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Register;