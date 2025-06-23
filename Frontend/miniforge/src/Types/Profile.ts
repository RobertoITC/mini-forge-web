// src/Types/Profile.ts

/**
 * A user profile row in Supabase.
 *
 * id          — UUID primary key, ties to auth.users.id
 * username    — optional display name
 * avatar_url  — optional link to a hosted avatar image
 * updated_at  — timestamp of last update
 */
export interface ProfileRow {
    id: string;
    username: string | null;
    avatar_url: string | null;
    updated_at: string | null;
}