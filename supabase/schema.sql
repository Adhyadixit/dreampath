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

-- User Requirements Table (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS user_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT NOT NULL CHECK (phone ~* '^\+?[0-9\-\s()]{10,15}$'),
  company TEXT,
  service_interested TEXT NOT NULL,
  budget_range TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for user_requirements
ALTER TABLE user_requirements ENABLE ROW LEVEL SECURITY;

-- Policies for user_requirements
CREATE POLICY "User requirements can be inserted by anyone"
  ON user_requirements FOR INSERT WITH CHECK (true);
  
CREATE POLICY "User requirements are viewable by authenticated users only"
  ON user_requirements FOR SELECT USING (auth.role() = 'authenticated');
  
CREATE POLICY "User requirements can be updated by authenticated users only"
  ON user_requirements FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "User requirements can be deleted by authenticated users only"
  ON user_requirements FOR DELETE USING (auth.role() = 'authenticated');

-- Chat Sessions Table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  visitor_name TEXT NOT NULL,
  visitor_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  unread_admin INTEGER NOT NULL DEFAULT 0,
  unread_visitor INTEGER NOT NULL DEFAULT 0,
  last_message TEXT,
  last_message_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  has_new_message BOOLEAN NOT NULL DEFAULT false,
  last_activity_time TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('visitor', 'admin')),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  should_notify BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for chat tables
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for chat_sessions
CREATE POLICY "Chat sessions are viewable by everyone"
  ON chat_sessions FOR SELECT USING (true);
  
CREATE POLICY "Chat sessions can be inserted by anyone"
  ON chat_sessions FOR INSERT WITH CHECK (true);
  
CREATE POLICY "Chat sessions can be updated by anyone"
  ON chat_sessions FOR UPDATE USING (true);

-- Policies for chat_messages
CREATE POLICY "Chat messages are viewable by everyone"
  ON chat_messages FOR SELECT USING (true);
  
CREATE POLICY "Chat messages can be inserted by anyone"
  ON chat_messages FOR INSERT WITH CHECK (true);
  
CREATE POLICY "Chat messages can be updated by anyone"
  ON chat_messages FOR UPDATE USING (true);

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

CREATE TRIGGER update_user_requirements_updated_at
BEFORE UPDATE ON user_requirements
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at
BEFORE UPDATE ON chat_sessions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT GENERATED ALWAYS AS (
    regexp_replace(lower(trim(title)), '[^a-z0-9]+', '-', 'g')
  ) STORED,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL CHECK (author_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policies
-- Anyone can insert a blog (submission)
CREATE POLICY "Blogs can be submitted by anyone"
  ON blogs FOR INSERT WITH CHECK (true);

-- Public can read only approved blogs
CREATE POLICY "Public can read approved blogs"
  ON blogs FOR SELECT USING (status = 'approved');

-- Admin (authenticated) can read all blogs
CREATE POLICY "Admins can read all blogs"
  ON blogs FOR SELECT USING (auth.role() = 'authenticated');

-- Admin (authenticated) can update status and other fields
CREATE POLICY "Admins can update blogs"
  ON blogs FOR UPDATE USING (auth.role() = 'authenticated');

-- Admin (authenticated) can delete blogs
CREATE POLICY "Admins can delete blogs"
  ON blogs FOR DELETE USING (auth.role() = 'authenticated');

-- Trigger for updated_at on blogs
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new chat messages and send notifications
CREATE OR REPLACE FUNCTION handle_new_chat_message()
RETURNS TRIGGER AS $$
DECLARE
  session_record RECORD;
  visitor_email TEXT;
  visitor_name TEXT;
  admin_email TEXT := 'info@dreampathsolutions.com'; -- Default admin email
BEGIN
  -- Get the session details
  SELECT * INTO session_record FROM chat_sessions WHERE id = NEW.session_id;
  
  IF FOUND THEN
    visitor_email := session_record.visitor_email;
    visitor_name := session_record.visitor_name;
    
    -- If message is from visitor, send email notification to admin
    IF NEW.sender_type = 'visitor' THEN
      -- Send email notification to admin
      PERFORM http_post(
        'https://api.sendgrid.com/v3/mail/send',
        '{"personalizations":[{"to":[{"email":"' || admin_email || '"}]}],"from":{"email":"notifications@dreampathsolutions.com","name":"DreamPath Chat"},"subject":"New Chat Message from ' || visitor_name || '","content":[{"type":"text/plain","value":"You have received a new chat message from ' || visitor_name || ' (' || visitor_email || '):\n\n' || NEW.message || '\n\nPlease log in to the admin dashboard to respond."}]}',
        '{"Content-Type":"application/json","Authorization":"Bearer ' || current_setting('app.sendgrid_key', true) || '"}'
      );
    END IF;
    
    -- If message is from admin and should trigger a notification, update the session
    IF NEW.sender_type = 'admin' AND NEW.should_notify = true THEN
      -- Update the session to indicate a notification should be sent
      UPDATE chat_sessions 
      SET has_new_message = true,
          unread_visitor = COALESCE(unread_visitor, 0) + 1,
          updated_at = NOW()
      WHERE id = NEW.session_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to handle new chat messages
DROP TRIGGER IF EXISTS on_new_chat_message ON chat_messages;
CREATE TRIGGER on_new_chat_message
  AFTER INSERT ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_chat_message();

-- Function to keep sessions active
CREATE OR REPLACE FUNCTION update_session_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the session's last_activity_time
  NEW.last_activity_time := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update session activity
DROP TRIGGER IF EXISTS on_session_activity ON chat_sessions;
CREATE TRIGGER on_session_activity
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_session_activity();
