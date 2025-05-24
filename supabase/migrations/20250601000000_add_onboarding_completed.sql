-- Add onboarding_completed field to user_preferences table
ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS workouts_per_week INTEGER,
ADD COLUMN IF NOT EXISTS body_fat_percentage FLOAT,
ADD COLUMN IF NOT EXISTS body_fat_category TEXT;

-- Update existing records to have onboarding_completed = true if they have all required fields
UPDATE user_preferences
SET onboarding_completed = TRUE
WHERE goal IS NOT NULL
  AND calorie_target IS NOT NULL
  AND protein_target IS NOT NULL
  AND carb_target IS NOT NULL
  AND fat_target IS NOT NULL;

-- Create an index on onboarding_completed for faster queries
CREATE INDEX IF NOT EXISTS idx_user_preferences_onboarding_completed ON user_preferences(onboarding_completed); 