import { createClient } from "@supabase/supabase-js";

let SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
let SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("Could not load .env.local file. Will use EAS Variables.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

