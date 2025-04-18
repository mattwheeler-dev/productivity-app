import { createClient } from "@supabase/supabase-js";

// Make sure to replace these with your actual Supabase URL and public anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
