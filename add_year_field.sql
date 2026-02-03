-- Add 'year' column to users table
ALTER TABLE users ADD COLUMN year text;

-- Optional: Update existing users to have a default value if needed, or leave null
-- UPDATE users SET year = 'N/A' WHERE year IS NULL;
