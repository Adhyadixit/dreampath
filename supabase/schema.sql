-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('web', 'mobile', 'desktop')),
  image TEXT NOT NULL,
  link TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Public projects are viewable by everyone"
  ON projects FOR SELECT USING (true);
  
CREATE POLICY "Projects can be inserted by authenticated users only"
  ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Projects can be updated by authenticated users only"
  ON projects FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Projects can be deleted by authenticated users only"
  ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Contact Information Table
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  map_embed_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for contact_info
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Policies for contact_info
CREATE POLICY "Contact info is viewable by everyone"
  ON contact_info FOR SELECT USING (true);
  
CREATE POLICY "Contact info can be inserted by authenticated users only"
  ON contact_info FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Contact info can be updated by authenticated users only"
  ON contact_info FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Contact info can be deleted by authenticated users only"
  ON contact_info FOR DELETE USING (auth.role() = 'authenticated');

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for social_links
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Policies for social_links
CREATE POLICY "Social links are viewable by everyone"
  ON social_links FOR SELECT USING (true);
  
CREATE POLICY "Social links can be inserted by authenticated users only"
  ON social_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Social links can be updated by authenticated users only"
  ON social_links FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Social links can be deleted by authenticated users only"
  ON social_links FOR DELETE USING (auth.role() = 'authenticated');

-- Hero Content Table
CREATE TABLE IF NOT EXISTS hero_content (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  show_cta BOOLEAN NOT NULL DEFAULT true,
  cta_text TEXT,
  cta_link TEXT,
  background_type TEXT NOT NULL CHECK (background_type IN ('none', 'image', 'file', 'youtube')),
  video_url TEXT,
  youtube_video_id TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for hero_content
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;

-- Policies for hero_content
CREATE POLICY "Hero content is viewable by everyone"
  ON hero_content FOR SELECT USING (true);
  
CREATE POLICY "Hero content can be inserted by authenticated users only"
  ON hero_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Hero content can be updated by authenticated users only"
  ON hero_content FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Hero content can be deleted by authenticated users only"
  ON hero_content FOR DELETE USING (auth.role() = 'authenticated');

-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update the updated_at column whenever a row is updated
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
BEFORE UPDATE ON contact_info
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
BEFORE UPDATE ON social_links
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_content_updated_at
BEFORE UPDATE ON hero_content
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
