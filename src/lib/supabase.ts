import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '').trim();

if (import.meta.env.DEV) {
  console.log('Vortyx Debug - Supabase Config:', {
    urlLength: supabaseUrl.length,
    keyLength: supabaseAnonKey.length,
    urlValue: supabaseUrl ? `${supabaseUrl.substring(0, 10)}...` : 'NONE',
    allViteEnv: Object.keys(import.meta.env).filter(k => k.startsWith('VITE_'))
  });
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;
