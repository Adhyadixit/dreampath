import { supabase } from './supabase';
import type { Project, HeroContent, ContactInfo, SocialLink, Blog } from './types';

// ================= Projects API =================
export const projectsApi = {
  // Get all projects
  getAll: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get projects by category
  getByCategory: async (category: string): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching ${category} projects:`, error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get project by ID
  getById: async (id: string): Promise<Project | null> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Create a new project
  create: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update an existing project
  update: async (id: string, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>): Promise<Project> => {
    // Enhanced debugging
    console.log('API update called with ID:', id);
    console.log('API update project data:', project);
    
    try {
      // Ensure we're working with a properly formatted UUID
      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id) // ID should be a string UUID
        .select()
        .single();
      
      if (error) {
        console.error(`Error updating project with ID ${id}:`, error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        throw error;
      }
      
      console.log('Update successful, returning data:', data);
      return data;
    } catch (e) {
      console.error('Exception in update function:', e);
      throw e;
    }
  },
  
  // Delete a project
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting project with ID ${id}:`, error);
      throw error;
    }
  }
};

// Contact Info API
export const contactInfoApi = {
  // Get contact info (usually only one record)
  get: async (): Promise<ContactInfo | null> => {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
      console.error('Error fetching contact info:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update contact info
  update: async (id: number, contactInfo: Partial<Omit<ContactInfo, 'id' | 'created_at' | 'updated_at'>>): Promise<ContactInfo> => {
    const { data, error } = await supabase
      .from('contact_info')
      .update(contactInfo)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating contact info with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};

// Social Links API
export const socialLinksApi = {
  // Get all social links
  getAll: async (): Promise<SocialLink[]> => {
    const { data, error } = await supabase
      .from('social_links')
      .select('*');
    
    if (error) {
      console.error('Error fetching social links:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Update a social link
  update: async (id: number, socialLink: Partial<Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>>): Promise<SocialLink> => {
    const { data, error } = await supabase
      .from('social_links')
      .update(socialLink)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating social link with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};

// Hero content API
export const heroContentApi = {
  // Get hero content
  get: async (): Promise<HeroContent> => {
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .limit(1)
      .single();

    if (error) throw error;
    return data as HeroContent;
  },

  // Update hero content
  update: async (id: number, content: Partial<HeroContent>): Promise<HeroContent> => {
    const { data, error } = await supabase
      .from('hero_content')
      .update(content)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as HeroContent;
  }
};

// Direct exports for these functions to match import in HeroManager
export async function getHeroContent(): Promise<HeroContent> {
  return heroContentApi.get();
}

export async function updateHeroContent(content: HeroContent): Promise<HeroContent> {
  return heroContentApi.update(content.id, content);
}

// ================= News API =================
// IMPORTANT: Using env vars so keys aren't hardcoded in source.
// Note: MediaStack free tier uses HTTP only; on an HTTPS site this will be blocked by the browser (mixed content).
// RSS and some APIs may be blocked by CORS in the browser. For production, proxy via a serverless function.
const MEDIASTACK_API_KEY = import.meta.env.VITE_MEDIASTACK_KEY as string | undefined;
const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_KEY as string | undefined;
const NEWSDATA_API_KEY = import.meta.env.VITE_NEWSDATA_KEY as string | undefined;
const NEWS_FUNCTION_URL = import.meta.env.VITE_NEWS_FUNCTION_URL as string | undefined;

type UnifiedArticle = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  source: string;
  published_at: string; // ISO string
};

async function fetchMediaStack(): Promise<UnifiedArticle[]> {
  try {
    const keywords = ['tech', 'AI', 'machine learning', 'jobs', 'freelance', 'politics'].join(',');
    const countries = ['us', 'gb', 'de'].join(',');
    const key = MEDIASTACK_API_KEY ?? '';
    if (!key) return [];
    const url = `http://api.mediastack.com/v1/news?access_key=${key}&keywords=${encodeURIComponent(keywords)}&countries=${countries}&languages=en&limit=30`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`MediaStack ${res.status}`);
    const json = await res.json();
    const items = (json?.data ?? []) as any[];
    return items.map((n) => ({
      title: n.title,
      description: n.description ?? '',
      url: n.url,
      image: n.image ?? null,
      source: n.source ?? 'MediaStack',
      published_at: n.published_at ?? n.publishedAt ?? new Date().toISOString(),
    }));
  } catch (e) {
    console.warn('MediaStack fetch skipped/failed:', e);
    return [];
  }
}

async function fetchGNews(): Promise<UnifiedArticle[]> {
  try {
    const key = GNEWS_API_KEY ?? '';
    if (!key) return [];
    const query = encodeURIComponent('(tech OR "AI tools" OR AI OR "machine learning" OR IT OR jobs OR freelance OR politics)');
    const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=20&apikey=${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GNews ${res.status}`);
    const json = await res.json();
    const items = (json?.articles ?? []) as any[];
    return items.map((a) => ({
      title: a.title,
      description: a.description ?? '',
      url: a.url,
      image: a.image ?? null,
      source: a.source?.name ?? 'GNews',
      published_at: a.publishedAt ?? new Date().toISOString(),
    }));
  } catch (e) {
    console.warn('GNews fetch failed:', e);
    return [];
  }
}

async function fetchNewsData(): Promise<UnifiedArticle[]> {
  try {
    const key = NEWSDATA_API_KEY ?? '';
    if (!key) return [];
    const to = new Date();
    const from = new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    const q = encodeURIComponent('tech OR AI OR "machine learning" OR IT OR jobs OR freelancers OR politics');
    const url = `https://newsdata.io/api/1/archive?apikey=${key}&q=${q}&language=en&from_date=${fmt(from)}&to_date=${fmt(to)}&size=20`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`NewsData ${res.status}`);
    const json = await res.json();
    const items = (json?.results ?? []) as any[];
    return items.map((r) => ({
      title: r.title,
      description: r.description ?? r.content ?? '',
      url: r.link ?? r.url,
      image: r.image_url ?? null,
      source: r.source_id ?? 'NewsData',
      published_at: r.pubDate ? new Date(r.pubDate).toISOString() : new Date().toISOString(),
    }));
  } catch (e) {
    console.warn('NewsData fetch failed:', e);
    return [];
  }
}

async function fetchGoogleNewsRSS(): Promise<UnifiedArticle[]> {
  try {
    // Google News RSS search feed
    const q = encodeURIComponent('tech OR AI OR "machine learning" OR IT OR jobs OR freelancers OR politics');
    const url = `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google RSS ${res.status}`);
    const text = await res.text();
    // Parse RSS with DOMParser (may be blocked by CORS in browsers)
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const items = Array.from(xml.querySelectorAll('item'));
    return items.slice(0, 20).map((el) => {
      const title = el.querySelector('title')?.textContent || '';
      const link = el.querySelector('link')?.textContent || '';
      const desc = el.querySelector('description')?.textContent || '';
      const pub = el.querySelector('pubDate')?.textContent || '';
      return {
        title,
        description: desc,
        url: link,
        image: null,
        source: 'Google News',
        published_at: pub ? new Date(pub).toISOString() : new Date().toISOString(),
      } as UnifiedArticle;
    });
  } catch (e) {
    console.warn('Google News RSS fetch failed (likely CORS):', e);
    return [];
  }
}

export const newsApi = {
  // Existing single-source function (kept for compatibility)
  getTechAndAINews: async (): Promise<UnifiedArticle[]> => {
    return fetchMediaStack();
  },

  // New: aggregate from multiple sources and filter
  getAggregatedNews: async (): Promise<UnifiedArticle[]> => {
    try {
      // Always use the Vercel API route
      const baseUrl = import.meta.env.DEV 
        ? 'http://localhost:3000' 
        : window.location.origin;
      
      const res = await fetch(`${baseUrl}/api/news-aggregate`, { 
        headers: { 
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const json = await res.json();
      return Array.isArray(json?.data) ? json.data : [];
      
    } catch (error) {
      console.error('Failed to fetch news:', error);
      return [];
    }
  },
};

// ================= Blogs API =================
export const blogsApi = {
  // Public: get approved blogs
  getApproved: async (): Promise<Blog[]> => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'approved')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as Blog[]) || [];
  },

  // Public: submit blog (status defaults to pending)
  submit: async (payload: Pick<Blog,'title'|'content'|'cover_image'|'author_name'|'author_email'> & { tags?: string[] }): Promise<Blog> => {
    const insert = {
      title: payload.title,
      content: payload.content,
      cover_image: payload.cover_image ?? null,
      tags: payload.tags ?? [],
      author_name: payload.author_name,
      author_email: payload.author_email,
      // status defaults to pending via DB
    } as any;
    const { data, error } = await supabase
      .from('blogs')
      .insert([insert])
      .select()
      .single();
    if (error) throw error;
    return data as Blog;
  },

  // Admin: list all blogs (requires authenticated policies)
  listAll: async (): Promise<Blog[]> => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as Blog[]) || [];
  },

  // Admin: approve blog
  approve: async (id: string): Promise<Blog> => {
    const { data, error } = await supabase
      .from('blogs')
      .update({ status: 'approved', published_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Blog;
  },

  // Admin: reject blog
  reject: async (id: string): Promise<Blog> => {
    const { data, error } = await supabase
      .from('blogs')
      .update({ status: 'rejected' })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Blog;
  }
};
