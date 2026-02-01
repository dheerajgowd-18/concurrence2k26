/* 
  TECHSPRINT EMERGENCY FIX (v6): ADD BRANCH COLUMN & REALTIME
  Run this entire script in your Supabase SQL Editor.
  It ensures all tables exist, fixes constraints, and adds the new 'branch' column.
*/

-- 0. Enable Realtime for users table
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'users'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
    END IF;
END $$;

-- 1. Create Tables if they don't exist
CREATE TABLE IF NOT EXISTS public.email_accounts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_address text UNIQUE NOT NULL,
    app_password text NOT NULL,
    smtp_host text DEFAULT 'smtp.gmail.com',
    smtp_port integer DEFAULT 465,
    active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.group_links (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    college text NOT NULL,
    whatsapp_link text NOT NULL,
    active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Ensure Columns Exist in Users
ALTER TABLE IF EXISTS public.users ADD COLUMN IF NOT EXISTS verified_by uuid REFERENCES public.admins(id);
ALTER TABLE IF EXISTS public.users ADD COLUMN IF NOT EXISTS assigned_qr_id uuid REFERENCES public.qr_codes(id);
ALTER TABLE IF EXISTS public.users ADD COLUMN IF NOT EXISTS branch text;

-- 3. FIX DELETION CONSTRAINT (Allow deleting users even if they have logs)
DO $$ 
BEGIN
    -- Drop existing constraint if it exists
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'action_logs_user_id_fkey') THEN
        ALTER TABLE public.action_logs DROP CONSTRAINT action_logs_user_id_fkey;
    END IF;
    
    -- Re-add with CASCADE
    ALTER TABLE public.action_logs 
    ADD CONSTRAINT action_logs_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
END $$;

-- 4. Table RLS Fixes (Completely Unlocks Tables)
ALTER TABLE IF EXISTS public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.qr_codes DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.email_accounts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.group_links DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.action_logs DISABLE ROW LEVEL SECURITY;

-- 5. Grant access
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;

-- 6. Storage Bucket Policy
INSERT INTO storage.buckets (id, name, public) 
VALUES ('screenshots', 'screenshots', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Screenshots All Pass" ON storage.objects;
CREATE POLICY "Screenshots All Pass" ON storage.objects 
FOR ALL USING (bucket_id = 'screenshots') 
WITH CHECK (bucket_id = 'screenshots');

-- 7. Seed Initial Data
INSERT INTO public.admins (username, password_hash, role) VALUES
('main_admin1', 'ripple2026_main1', 'MAIN'),
('sub_admin1', 'sub_pass1', 'SUB')
ON CONFLICT (username) DO NOTHING;
