import { createClient } from '@supabase/supabase-js';

// Publishable key browserda ishlash uchun mo‘ljallangan. RLS barcha user ma’lumotlarini himoya qiladi.
export const supabase = createClient(
  'https://uwgqlnvneqzcgzeroabm.supabase.co',
  'sb_publishable__Yt-7wbq8c2EXgZkwdeQUg_16vy_cNf',
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);
