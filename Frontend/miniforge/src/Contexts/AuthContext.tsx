import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../Lib/supabaseClient';

interface AuthCtx {
    user: any | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const Context = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
           const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
            setLoading(false);
            })();
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
            setUser(session?.user ?? null)
        );
        return () => listener.subscription.unsubscribe();
    }, []);

    const value: AuthCtx = {
        user,
        loading,
        signIn: async (e, p) => {
            const { error } = await supabase.auth.signInWithPassword({ email: e, password: p });
            if (error) throw error;
        },
        signUp: async (e, p) => {
            const { error } = await supabase.auth.signUp({ email: e, password: p });
            if (error) throw error;
        },
        signOut: async () => {
            await supabase.auth.signOut();
        }
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(Context);
    if (!ctx) throw new Error('useAuth must be inside AuthProvider');
    return ctx;
};