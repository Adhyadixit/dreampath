import { supabase } from './supabase';
import type { Project, HeroContent, ContactInfo, SocialLink } from './types';

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
