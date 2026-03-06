-- Complete fix for media_items RLS issues
-- Run this in Supabase SQL Editor

-- Option 1: Disable RLS entirely (simplest for CMS development)
ALTER TABLE media_items DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS, use this instead:
/*
-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON media_items;
DROP POLICY IF EXISTS "Allow select for authenticated users" ON media_items;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON media_items;
DROP POLICY IF EXISTS "Allow delete for authenticated users" ON media_items;
DROP POLICY IF EXISTS "Allow public read" ON media_items;

-- Enable RLS
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Allow anon (public) full access for development
CREATE POLICY "Allow all for anon" ON media_items
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Also allow authenticated
CREATE POLICY "Allow all for authenticated" ON media_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
*/
