import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ttgdnauuqevxwqmdgvfo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
export const db = createClient(supabaseUrl, supabaseKey);
