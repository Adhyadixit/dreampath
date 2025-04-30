/**
 * Type definitions for the application
 */

// Projects/Portfolio types
export interface Project {
  id: string; // UUID in the database
  title: string;
  category: string; // 'web', 'mobile', or 'desktop'
  description: string;
  image: string; // URL to image
  link: string; // Project URL
  technologies: string[];
  created_at: string;
  updated_at: string;
}

// Hero content type
export interface HeroContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  video_url: string | null;
  image_url: string | null;
  cta_text: string;
  cta_url: string;
  created_at: string;
}

// Contact information type
export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  address: string;
  social_media: SocialMedia;
  created_at: string;
}

export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

// For compatibility with existing code
export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
  created_at: string;
}

// User profile type
export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  created_at: string;
}
