import { createClient } from '@supabase/supabase-js';
import type { RSVPEntry } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient<{ rsvp_guests: RSVPEntry }>(supabaseUrl, supabaseAnonKey)
  : null;

export const RSVP_TABLE = 'rsvp_guests';
