import { createClient } from "@supabase/supabase-js";

let SUPABASE_URL = process.env.SUPABASE_URL;
let SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    try {
        const dotenv = require("dotenv");
        dotenv.config({
            path: '.env.local'
        });
        
        SUPABASE_URL = process.env.SUPABASE_URL;
        SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    } catch (error) {
        console.warn("Could not load .env.local file. Will use EAS Variables.");
    }
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

