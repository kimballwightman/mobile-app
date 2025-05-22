-- Create database tables for the NutriTech mobile app

-- Users table
CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User Preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  preference_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  goal TEXT NOT NULL,
  calorie_target INTEGER NOT NULL,
  protein_target INTEGER NOT NULL,
  carb_target INTEGER NOT NULL,
  fat_target INTEGER NOT NULL,
  adherence_percent INTEGER NOT NULL,
  allergies TEXT,
  budget_min INTEGER,
  budget_max INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User Settings table
CREATE TABLE IF NOT EXISTS user_settings (
  settings_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  notification_preferences JSONB,
  theme TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User Integrations table
CREATE TABLE IF NOT EXISTS user_integrations (
  integration_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_user_id TEXT,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User Metrics table
CREATE TABLE IF NOT EXISTS user_metrics (
  metric_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  date DATE NOT NULL,
  calories_consumed INTEGER,
  calories_burned INTEGER,
  protein_consumed INTEGER,
  carbs_consumed INTEGER,
  fats_consumed INTEGER,
  water_consumed INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
  recipe_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  calories INTEGER NOT NULL,
  protein INTEGER NOT NULL,
  carbs INTEGER NOT NULL,
  fats INTEGER NOT NULL,
  servings INTEGER NOT NULL,
  image_url TEXT,
  prep_time INTEGER,
  cook_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Foods table
CREATE TABLE IF NOT EXISTS foods (
  food_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  calories INTEGER NOT NULL,
  protein INTEGER NOT NULL,
  carbs INTEGER NOT NULL,
  fats INTEGER NOT NULL,
  serving_size TEXT NOT NULL,
  serving_unit TEXT NOT NULL,
  barcode TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Recipe Foods table (junction table)
CREATE TABLE IF NOT EXISTS recipe_foods (
  recipe_food_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID NOT NULL REFERENCES recipes(recipe_id) ON DELETE CASCADE,
  food_id UUID NOT NULL REFERENCES foods(food_id) ON DELETE CASCADE,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  tag_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Recipe Tags junction table
CREATE TABLE IF NOT EXISTS recipe_tags (
  recipe_id UUID NOT NULL REFERENCES recipes(recipe_id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
  PRIMARY KEY (recipe_id, tag_id)
);

-- User Favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  favorite_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(recipe_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- User Meal Plan table
CREATE TABLE IF NOT EXISTS user_meal_plan (
  meal_plan_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL,
  recipe_id UUID REFERENCES recipes(recipe_id) ON DELETE SET NULL,
  food_id UUID REFERENCES foods(food_id) ON DELETE SET NULL,
  custom_name TEXT,
  custom_calories INTEGER,
  custom_protein INTEGER,
  custom_carbs INTEGER,
  custom_fats INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Meal Log table
CREATE TABLE IF NOT EXISTS meal_log (
  log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  meal_plan_id UUID REFERENCES user_meal_plan(meal_plan_id) ON DELETE SET NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  meal_type TEXT NOT NULL,
  recipe_id UUID REFERENCES recipes(recipe_id) ON DELETE SET NULL,
  food_id UUID REFERENCES foods(food_id) ON DELETE SET NULL,
  custom_name TEXT,
  custom_calories INTEGER,
  custom_protein INTEGER,
  custom_carbs INTEGER,
  custom_fats INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Workout Log table
CREATE TABLE IF NOT EXISTS workout_log (
  log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  workout_type TEXT NOT NULL,
  duration INTEGER,
  calories_burned INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Meal Reviews table
CREATE TABLE IF NOT EXISTS meal_reviews (
  review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  meal_plan_id UUID REFERENCES user_meal_plan(meal_plan_id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(recipe_id) ON DELETE SET NULL,
  rating INTEGER,
  feedback TEXT,
  consumed BOOLEAN NOT NULL DEFAULT true,
  review_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Pantry Items table
CREATE TABLE IF NOT EXISTS pantry_items (
  pantry_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  food_id UUID REFERENCES foods(food_id) ON DELETE CASCADE,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  status TEXT NOT NULL,
  expiration_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Shopping Cart table
CREATE TABLE IF NOT EXISTS shopping_cart (
  cart_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Shopping Cart Items table
CREATE TABLE IF NOT EXISTS shopping_cart_items (
  cart_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES shopping_cart(cart_id) ON DELETE CASCADE,
  food_id UUID REFERENCES foods(food_id) ON DELETE CASCADE,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Cart Windows table
CREATE TABLE IF NOT EXISTS cart_windows (
  window_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  delivery_date DATE NOT NULL,
  delivery_time_start TIME NOT NULL,
  delivery_time_end TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  window_id UUID REFERENCES cart_windows(window_id) ON DELETE SET NULL,
  total_amount DECIMAL NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Order Items table
CREATE TABLE IF NOT EXISTS order_items (
  order_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  food_id UUID REFERENCES foods(food_id) ON DELETE SET NULL,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  price DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create functions and triggers for updating updated_at timestamps
CREATE OR REPLACE FUNCTION update_timestamp() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update_timestamp trigger to all tables with updated_at column
CREATE TRIGGER update_users_timestamp BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_preferences_timestamp BEFORE UPDATE ON user_preferences
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_settings_timestamp BEFORE UPDATE ON user_settings
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_integrations_timestamp BEFORE UPDATE ON user_integrations
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_metrics_timestamp BEFORE UPDATE ON user_metrics
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_recipes_timestamp BEFORE UPDATE ON recipes
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_foods_timestamp BEFORE UPDATE ON foods
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_recipe_foods_timestamp BEFORE UPDATE ON recipe_foods
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_meal_plan_timestamp BEFORE UPDATE ON user_meal_plan
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_meal_reviews_timestamp BEFORE UPDATE ON meal_reviews
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_pantry_items_timestamp BEFORE UPDATE ON pantry_items
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_shopping_cart_timestamp BEFORE UPDATE ON shopping_cart
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_cart_windows_timestamp BEFORE UPDATE ON cart_windows
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_orders_timestamp BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Set up Row Level Security (RLS) for tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_meal_plan ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE pantry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = user_id);

-- Create similar policies for other user-specific tables
CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Basic public access to recipes for exploration
CREATE POLICY "Everyone can view recipes" ON recipes
  FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX idx_user_meal_plan_user_id ON user_meal_plan(user_id);
CREATE INDEX idx_user_meal_plan_date ON user_meal_plan(date);
CREATE INDEX idx_meal_log_user_id ON meal_log(user_id);
CREATE INDEX idx_meal_log_date ON meal_log(date);
CREATE INDEX idx_workout_log_user_id ON workout_log(user_id);
CREATE INDEX idx_workout_log_date ON workout_log(date);
CREATE INDEX idx_meal_reviews_user_id ON meal_reviews(user_id);
CREATE INDEX idx_pantry_items_user_id ON pantry_items(user_id);
CREATE INDEX idx_recipe_foods_recipe_id ON recipe_foods(recipe_id); 