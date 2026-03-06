-- Fix Storage Policies for CMS Images Bucket
-- Run this in Supabase SQL Editor to enable image uploads

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('cms-images', 'cms-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT 
USING (bucket_id = 'cms-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'cms-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated Update" ON storage.objects
FOR UPDATE 
USING (bucket_id = 'cms-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated Delete" ON storage.objects
FOR DELETE 
USING (bucket_id = 'cms-images' AND auth.role() = 'authenticated');

-- Allow anon users to upload (for public uploads)
CREATE POLICY "Anon Upload" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'cms-images' AND auth.role() = 'anon');
