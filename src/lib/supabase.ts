import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tjkgelzkuapqebqiguve.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqa2dlbHprdWFwcWVicWlndXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMzI4MjYsImV4cCI6MjA5MjkwODgyNn0.1dT_CTQvfZC5wTVHK9cEV3W65omWcjzwe9WlrBR-yz8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
  },
});

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
};
