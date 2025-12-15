-- Create the early_users table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS early_users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_early_users_email ON early_users(email);

-- Enable Row Level Security (RLS)
ALTER TABLE early_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON early_users;
DROP POLICY IF EXISTS "Allow authenticated reads" ON early_users;

-- Create a policy to allow ANYONE (including anonymous) to insert
CREATE POLICY "Allow public inserts" ON early_users
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create a policy to allow authenticated users to read all records
CREATE POLICY "Allow authenticated reads" ON early_users
    FOR SELECT
    TO authenticated
    USING (true);

-- Optional: Allow anonymous users to read (if you want to show signup count publicly)
-- CREATE POLICY "Allow public reads" ON early_users
--     FOR SELECT
--     TO anon
--     USING (true);
