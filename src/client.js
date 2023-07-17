import { createClient } from '@supabase/supabase-js';

const API_KEY = process.env.API_KEY
const URL = process.env.URL

export const supabase = createClient(URL, API_KEY);
