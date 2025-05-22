-- Enable Row Level Security for tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow authenticated users to read all users
CREATE POLICY "Users can view all profiles"
ON users FOR SELECT
USING (true);

-- Allow users to insert their own record during signup
CREATE POLICY "Users can insert their own profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own record
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = user_id);

-- Let service role bypass RLS
ALTER TABLE users FORCE ROW LEVEL SECURITY; 