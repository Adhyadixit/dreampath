import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
// In a real app, these would be stored in .env files and not committed to the repo
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TypeScript types for database tables
export type Project = {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'desktop';
  image: string;
  link: string;
  description: string;
  technologies: string[];
  created_at?: string;
  updated_at?: string;
}

export type ContactInfo = {
  id: number;
  email: string;
  phone: string;
  address: string;
  map_embed_url: string;
  created_at?: string;
  updated_at?: string;
}

export type SocialLink = {
  id: number;
  platform: string;
  url: string;
  created_at?: string;
  updated_at?: string;
}

export type HeroContent = {
  id: number;
  title: string;
  subtitle: string;
  show_cta: boolean;
  cta_text: string;
  cta_link: string;
  background_type: 'none' | 'image' | 'file' | 'youtube';
  video_url?: string;
  youtube_video_id?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export type User = {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at?: string;
}
