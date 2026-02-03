/* 
  TECHSPRINT UPDATE: ADD T-SHIRT SIZE COLUMN
  Run this script in the Supabase SQL Editor to add the new column.
*/

DO $$ 
BEGIN
    -- Add tshirt_size column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'users' 
        AND column_name = 'tshirt_size'
    ) THEN
        ALTER TABLE public.users ADD COLUMN tshirt_size text;
    END IF;
END $$;
