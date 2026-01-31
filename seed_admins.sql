/* 
  TECHSPRINT FINAL SECURITY FIX 
  Run this entire script in your Supabase SQL Editor.
  It opens all necessary permissions for the Hackathon.
*/

-- 1. Table RLS Fixes (Enable broad access for Hackathon use)
DO $$ 
BEGIN
    -- Users Table (Public Join, Admin Managed)
    ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users All Pass" ON public.users;
    CREATE POLICY "Users All Pass" ON public.users FOR ALL USING (true) WITH CHECK (true);

    -- QR Codes Table
    ALTER TABLE public.qr_codes DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "QR All Pass" ON public.qr_codes;
    CREATE POLICY "QR All Pass" ON public.qr_codes FOR ALL USING (true) WITH CHECK (true);

    -- Admins Table
    ALTER TABLE public.admins DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins All Pass" ON public.admins;
    CREATE POLICY "Admins All Pass" ON public.admins FOR ALL USING (true) WITH CHECK (true);

    -- Email Accounts Table
    ALTER TABLE public.email_accounts DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.email_accounts ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Emails All Pass" ON public.email_accounts;
    CREATE POLICY "Emails All Pass" ON public.email_accounts FOR ALL USING (true) WITH CHECK (true);

    -- Group Links Table
    ALTER TABLE public.group_links DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.group_links ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Groups All Pass" ON public.group_links;
    CREATE POLICY "Groups All Pass" ON public.group_links FOR ALL USING (true) WITH CHECK (true);

    -- Action Logs Table
    ALTER TABLE public.action_logs DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.action_logs ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Logs All Pass" ON public.action_logs;
    CREATE POLICY "Logs All Pass" ON public.action_logs FOR ALL USING (true) WITH CHECK (true);
END $$;

-- 2. Storage Bucket & Policies (Crucial for Screenshots)
-- Ensure the screenshots bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('screenshots', 'screenshots', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Full public access to the screenshots bucket
DROP POLICY IF EXISTS "Public Screenshot Access" ON storage.objects;
CREATE POLICY "Public Screenshot Access" ON storage.objects FOR ALL USING (bucket_id = 'screenshots') WITH CHECK (bucket_id = 'screenshots');


-- 3. Initial Data (Skip if exists)
INSERT INTO qr_codes (upi_id, qr_image_url, daily_limit, active)
VALUES ('dheerajgowd777@okicici', 'https://bbda8097-5b5e-4e25-b08e-5f91dc40fee0.antigravity.run/C:/Users/dheer/.gemini/antigravity/brain/bbda8097-5b5e-4e25-b08e-5f91dc40fee0/uploaded_media_1769878135189.png', 100, true)
ON CONFLICT DO NOTHING;

INSERT INTO admins (username, password_hash, role) VALUES
('main_admin1', 'ripple2026_main1', 'MAIN'),
('sub_admin1', 'sub_pass1', 'SUB')
ON CONFLICT (username) DO NOTHING;
