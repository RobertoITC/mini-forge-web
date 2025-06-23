import React, { useEffect, useState } from 'react';
import { supabase } from '../Lib/supabaseClient';
import { useAuth } from '../Contexts/AuthContext';

interface ProfileRow {
    id: string;
    username: string | null;
    avatar_url: string | null;
}

const Profile: React.FC = () => {
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState<ProfileRow | null>(null);

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user!.id)
                .single();
            setProfile(data as ProfileRow | null);
        };
        load();
    }, [user]);

    if (!profile) return <div className="p-8">Loading...</div>;

    const save = async () => {
        await supabase.from('profiles').upsert({ id: user!.id, username: profile.username });
        alert('Saved!');
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-[#561412] mb-6">My Profile</h1>

            <div className="space-y-4 max-w-sm">
                <label className="block">
                    <span className="text-[#561412]">Username</span>
                    <input
                        className="w-full p-3 border rounded focus:ring-[#AB2724]"
                        value={profile.username ?? ''}
                        onChange={e => setProfile({ ...profile, username: e.target.value })}
                    />
                </label>
                <button
                    onClick={save}
                    className="bg-[#AB2724] text-white px-4 py-2 rounded hover:bg-[#781B19] transition"
                >
                    Save
                </button>
            </div>

            <button onClick={signOut} className="mt-10 text-[#AB2724] underline">
                Sign out
            </button>
        </div>
    );
};

export default Profile;