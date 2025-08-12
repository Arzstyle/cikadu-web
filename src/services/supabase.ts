import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are not provided
let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Using mock client for development.');
  // Create a mock client that returns empty data
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }),
      insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      update: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      delete: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    }),
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export type TourismSpot = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  lat: number;
  lng: number;
  category: string;
  created_at: string;
};

export type Business = {
  id: string;
  name: string;
  description: string;
  contact: string;
  location: string;
  image_url: string;
  created_at: string;
};

export type Feedback = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};