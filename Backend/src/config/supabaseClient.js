import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // NOT the anon key

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
});