-- Add user info fields to user_preferences table if they don't exist
ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS height INTEGER,
ADD COLUMN IF NOT EXISTS weight INTEGER,
ADD COLUMN IF NOT EXISTS bmr INTEGER; 