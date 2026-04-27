import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the URL is valid (not a placeholder and is a valid URL format)
const isValidUrl = (url: string) => {
  try {
    return url && url.startsWith('http') && !url.includes('YOUR_SUPABASE_URL');
  } catch {
    return false;
  }
};

if (!isValidUrl(supabaseUrl) || !supabaseAnonKey || supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY')) {
  console.warn('Supabase credentials missing or invalid. Dashboard functionality will be disabled.');
}

// Initialize with placeholders if missing to prevent crash, but won't work for real requests
export const supabase = createClient(
  isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co',
  supabaseAnonKey && !supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY') ? supabaseAnonKey : 'placeholder'
);
