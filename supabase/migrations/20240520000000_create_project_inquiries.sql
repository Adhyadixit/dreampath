-- Create project_inquiries table
CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  service TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public insert access" ON public.project_inquiries
  FOR INSERT WITH CHECK (true);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_project_inquiries_updated_at
BEFORE UPDATE ON public.project_inquiries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add comments
COMMENT ON TABLE public.project_inquiries IS 'Stores project inquiry submissions from the website.';
COMMENT ON COLUMN public.project_inquiries.status IS 'Status of the inquiry: new, in_progress, completed, etc.';
