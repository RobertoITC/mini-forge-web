import React, { useEffect, useState, type ChangeEvent } from 'react';
import { supabase } from '../Lib/supabaseClient';
import { useAuth } from '../Contexts/AuthContext';
import type { ProfileRow } from '../Types/Profile';
import { Camera, User } from 'lucide-react';

const Profile: React.FC = () => {
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState<ProfileRow | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, setUploading] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (!user) return;
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .maybeSingle();
                if (error) throw error;
                if (data) setProfile(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [user]);

    const saveProfile = async () => {
        if (!user || !profile) return;
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ username: profile.username, avatar_url: profile.avatar_url })
                .eq('id', user.id);
            if (error) throw error;
            alert('Profile updated');
        } catch (e: any) {
            setError(e.message);
        }
    };

    const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !user) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            // upload to bucket 'avatars'
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });
            if (uploadError) throw uploadError;

            // get public URL
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            // @ts-ignore
            setProfile({ ...profile, avatar_url: data.publicUrl });
        } catch (e: any) {
            setError(e.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading profile...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
    if (!profile) return <div className="p-8 text-center">No profile found.</div>;

    return (
        <div className="min-h-screen bg-[#F7E9E9]">
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} alt="Avatar" className="object-cover w-full h-full" />
                            ) : (
                                <User className="w-12 h-12 text-gray-400" />
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                            <Camera className="w-5 h-5 text-[#AB2724]" />
                            <input type="file" accept="image/*" onChange={uploadAvatar} className="hidden" />
                        </label>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[#561412]">{profile.username || user.email}</h2>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                </div>

                {/* Editable username */}
                <div>
                    <label className="block text-gray-700 mb-2">Display Name</label>
                    <input
                        type="text"
                        value={profile.username || ''}
                        onChange={e => setProfile({ ...profile, username: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-[#AB2724]"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={saveProfile}
                        className="bg-[#AB2724] text-white px-6 py-2 rounded hover:bg-[#781B19] transition"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={signOut}
                        className="text-[#AB2724] underline hover:text-[#781B19] transition"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;