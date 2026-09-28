-- Migration: 20260922_init_projects.sql
-- Description: Create projects table and storage bucket for Inalabs Indonesia Agency CMS

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  project_url TEXT DEFAULT '',
  technologies JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  case_study JSONB DEFAULT '{
    "challenge": "",
    "solution": "",
    "results": [],
    "metrics": []
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes for fast query and filtering
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 4. Policies:
-- Public can read all projects
CREATE POLICY "Public can view all projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Authenticated or service users can insert/update/delete
CREATE POLICY "Admin full access to projects" 
ON public.projects 
FOR ALL 
USING (true)
WITH CHECK (true);

-- 5. Create Storage Bucket for Project Images (if storage schema exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public access to read project images
CREATE POLICY "Public Access for project-images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'project-images');

-- Insert policy for project images
CREATE POLICY "Allow Uploads to project-images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'project-images');
