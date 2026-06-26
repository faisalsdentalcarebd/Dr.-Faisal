-- ============================================================
-- Faisal's Dental Care — Supabase Schema
-- Run this entire file in the Supabase SQL Editor
-- ============================================================

-- 1. Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  filename TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Prices table
CREATE TABLE IF NOT EXISTS prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  unit TEXT NOT NULL,
  min INTEGER NOT NULL,
  max INTEGER NOT NULL,
  note TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;

-- Public can INSERT bookings and contact forms
CREATE POLICY "Allow public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Public can read published blog posts and gallery
CREATE POLICY "Allow public read published posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read prices" ON prices FOR SELECT USING (true);

-- Service role bypasses RLS — no extra policies needed for admin operations

-- ============================================================
-- Seed default prices (run only once)
-- ============================================================
INSERT INTO prices (service_id, label, unit, min, max, note, sort_order) VALUES
  ('crown',      'Crown & Bridge Restoration',    'unit',      15000,  40000,  'Per tooth/unit',               1),
  ('implant',    'Dental Implant',                'implant',   80000, 150000,  'Per implant (titanium)',        2),
  ('ortho',      'Fixed Orthodontics (Braces)',   'treatment', 40000, 100000,  'Full treatment, both arches',  3),
  ('rct',        'Root Canal Treatment',          'tooth',      8000,  20000,  'Per tooth',                    4),
  ('scaling',    'Dental Scaling & Cleaning',     'session',    3000,   6000,  'Per session',                  5),
  ('extraction', 'Tooth Extraction',              'tooth',      3000,   8000,  'Per tooth',                    6),
  ('filling',    'Tooth-Coloured Filling',        'tooth',      2000,   8000,  'Per tooth (composite)',         7)
ON CONFLICT (service_id) DO NOTHING;

-- ============================================================
-- Storage bucket for gallery
-- Run this in the Supabase Dashboard > Storage > New Bucket
-- OR via SQL:
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true)
-- ON CONFLICT DO NOTHING;
