-- Update database schema to align with Spoonacular terminology and add required fields

-- Rename "foods" table to "ingredients" and add required fields
ALTER TABLE foods RENAME TO ingredients;

-- Update the ingredients table with new fields
ALTER TABLE ingredients
ADD COLUMN external_id TEXT,
ADD COLUMN protein_ratio DECIMAL,
ADD COLUMN carb_ratio DECIMAL,
ADD COLUMN fat_ratio DECIMAL,
ADD COLUMN protein_per_calorie DECIMAL,
ADD COLUMN last_fetched_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN data_source TEXT DEFAULT 'manual';

-- Update recipes table with new fields
ALTER TABLE recipes
ADD COLUMN external_id TEXT,
ADD COLUMN protein_ratio DECIMAL,
ADD COLUMN carb_ratio DECIMAL,
ADD COLUMN fat_ratio DECIMAL,
ADD COLUMN protein_per_calorie DECIMAL,
ADD COLUMN last_fetched_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN complexity_score INTEGER,
ADD COLUMN popularity_score INTEGER,
ADD COLUMN data_source TEXT DEFAULT 'manual';

-- Rename recipe_foods table
ALTER TABLE recipe_foods RENAME TO recipe_ingredients;

-- Rename column recipe_food_id in recipe_ingredients
ALTER TABLE recipe_ingredients RENAME COLUMN recipe_food_id TO recipe_ingredient_id;

-- Rename column food_id in recipe_ingredients
ALTER TABLE recipe_ingredients RENAME COLUMN food_id TO ingredient_id;

-- Update references in recipe_ingredients
ALTER TABLE recipe_ingredients
DROP CONSTRAINT recipe_foods_food_id_fkey;

ALTER TABLE recipe_ingredients
ADD CONSTRAINT recipe_ingredients_ingredient_id_fkey 
FOREIGN KEY (ingredient_id) REFERENCES ingredients(food_id) ON DELETE CASCADE;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ingredient_id UUID REFERENCES ingredients(food_id),
  brand TEXT,
  name TEXT NOT NULL,
  external_id TEXT,
  calories INTEGER NOT NULL,
  protein INTEGER NOT NULL,
  carbs INTEGER NOT NULL,
  fats INTEGER NOT NULL,
  protein_ratio DECIMAL,
  carb_ratio DECIMAL,
  fat_ratio DECIMAL,
  protein_per_calorie DECIMAL,
  serving_size TEXT NOT NULL,
  serving_unit TEXT NOT NULL,
  barcode TEXT,
  last_fetched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  menu_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_chain TEXT,
  name TEXT NOT NULL,
  external_id TEXT,
  calories INTEGER NOT NULL,
  protein INTEGER NOT NULL,
  carbs INTEGER NOT NULL,
  fats INTEGER NOT NULL,
  protein_ratio DECIMAL,
  carb_ratio DECIMAL,
  fat_ratio DECIMAL,
  protein_per_calorie DECIMAL,
  serving_size TEXT,
  serving_unit TEXT,
  last_fetched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create a food fetch queue table
CREATE TABLE IF NOT EXISTS food_fetch_queue (
  queue_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  external_id TEXT NOT NULL,
  entity_type TEXT NOT NULL, -- 'recipe', 'ingredient', 'product', or 'menu_item'
  priority INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(external_id, entity_type)
);

-- Update foreign key references in other tables
-- Pantry items
ALTER TABLE pantry_items RENAME COLUMN food_id TO ingredient_id;

ALTER TABLE pantry_items
DROP CONSTRAINT pantry_items_food_id_fkey;

ALTER TABLE pantry_items
ADD CONSTRAINT pantry_items_ingredient_id_fkey 
FOREIGN KEY (ingredient_id) REFERENCES ingredients(food_id) ON DELETE CASCADE;

-- Shopping cart items
ALTER TABLE shopping_cart_items RENAME COLUMN food_id TO ingredient_id;

ALTER TABLE shopping_cart_items
DROP CONSTRAINT shopping_cart_items_food_id_fkey;

ALTER TABLE shopping_cart_items
ADD CONSTRAINT shopping_cart_items_ingredient_id_fkey 
FOREIGN KEY (ingredient_id) REFERENCES ingredients(food_id) ON DELETE CASCADE;

-- User meal plan
ALTER TABLE user_meal_plan
ADD COLUMN product_id UUID REFERENCES products(product_id) ON DELETE SET NULL,
ADD COLUMN menu_item_id UUID REFERENCES menu_items(menu_item_id) ON DELETE SET NULL;

ALTER TABLE user_meal_plan RENAME COLUMN food_id TO ingredient_id;

ALTER TABLE user_meal_plan
DROP CONSTRAINT user_meal_plan_food_id_fkey;

ALTER TABLE user_meal_plan
ADD CONSTRAINT user_meal_plan_ingredient_id_fkey 
FOREIGN KEY (ingredient_id) REFERENCES ingredients(food_id) ON DELETE SET NULL;

-- Meal log
ALTER TABLE meal_log
ADD COLUMN product_id UUID REFERENCES products(product_id) ON DELETE SET NULL,
ADD COLUMN menu_item_id UUID REFERENCES menu_items(menu_item_id) ON DELETE SET NULL;

ALTER TABLE meal_log RENAME COLUMN food_id TO ingredient_id;

ALTER TABLE meal_log
DROP CONSTRAINT meal_log_food_id_fkey;

ALTER TABLE meal_log
ADD CONSTRAINT meal_log_ingredient_id_fkey 
FOREIGN KEY (ingredient_id) REFERENCES ingredients(food_id) ON DELETE SET NULL;

-- Add triggers for timestamp updates
CREATE TRIGGER update_products_timestamp BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_menu_items_timestamp BEFORE UPDATE ON menu_items
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Add indices for performance
CREATE INDEX idx_ingredients_external_id ON ingredients(external_id);
CREATE INDEX idx_recipes_external_id ON recipes(external_id);
CREATE INDEX idx_products_external_id ON products(external_id);
CREATE INDEX idx_menu_items_external_id ON menu_items(external_id);
CREATE INDEX idx_recipe_ingredients_ingredient_id ON recipe_ingredients(ingredient_id);
CREATE INDEX idx_food_fetch_queue_status ON food_fetch_queue(status);
CREATE INDEX idx_food_fetch_queue_priority ON food_fetch_queue(priority); 