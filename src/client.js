import { createClient } from '@supabase/supabase-js';

const URL = 'https://lntdyingwevvpwmuyccb.supabase.co'
const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudGR5aW5nd2V2dnB3bXV5Y2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1NjI0MDgsImV4cCI6MjAwNTEzODQwOH0.aRQnYGohoKEl8awjtQGKgQxdst3FUKQr0g7m_QThyJk"

export const supabase = createClient(URL, API_KEY);