// Neo4j Graph Database Setup for NutriTech Mobile App
// This script creates all node labels, constraints, and relationships

// Create constraints for node uniqueness
CREATE CONSTRAINT user_id IF NOT EXISTS FOR (u:User) REQUIRE u.user_id IS UNIQUE;
CREATE CONSTRAINT recipe_id IF NOT EXISTS FOR (r:Recipe) REQUIRE r.recipe_id IS UNIQUE;
CREATE CONSTRAINT food_id IF NOT EXISTS FOR (f:Food) REQUIRE f.food_id IS UNIQUE;
CREATE CONSTRAINT tag_id IF NOT EXISTS FOR (t:Tag) REQUIRE t.tag_id IS UNIQUE;
CREATE CONSTRAINT meal_review_id IF NOT EXISTS FOR (mr:MealReview) REQUIRE mr.meal_review_id IS UNIQUE;
CREATE CONSTRAINT meal_event_id IF NOT EXISTS FOR (me:MealEvent) REQUIRE me.meal_event_id IS UNIQUE;
CREATE CONSTRAINT workout_event_id IF NOT EXISTS FOR (we:WorkoutEvent) REQUIRE we.workout_event_id IS UNIQUE;
CREATE CONSTRAINT user_settings_id IF NOT EXISTS FOR (us:UserSettings) REQUIRE us.settings_id IS UNIQUE;
CREATE CONSTRAINT user_integration_id IF NOT EXISTS FOR (ui:UserIntegration) REQUIRE ui.integration_id IS UNIQUE;
CREATE CONSTRAINT user_activity_id IF NOT EXISTS FOR (ua:UserActivity) REQUIRE ua.activity_id IS UNIQUE;
CREATE CONSTRAINT shopping_cart_id IF NOT EXISTS FOR (sc:ShoppingCart) REQUIRE sc.cart_id IS UNIQUE;

// Create indexes for performance
CREATE INDEX user_email_idx IF NOT EXISTS FOR (u:User) ON (u.email);
CREATE INDEX recipe_name_idx IF NOT EXISTS FOR (r:Recipe) ON (r.name);
CREATE INDEX food_name_idx IF NOT EXISTS FOR (f:Food) ON (f.name);
CREATE INDEX tag_name_idx IF NOT EXISTS FOR (t:Tag) ON (t.name);
CREATE INDEX meal_review_user_idx IF NOT EXISTS FOR (mr:MealReview) ON (mr.user_id);
CREATE INDEX meal_event_date_idx IF NOT EXISTS FOR (me:MealEvent) ON (me.date);
CREATE INDEX workout_event_date_idx IF NOT EXISTS FOR (we:WorkoutEvent) ON (we.date);
CREATE INDEX user_performance_date_idx IF NOT EXISTS FOR (up:UserPerformance) ON (up.date);

// Create sample data for key entities

// User nodes
MERGE (u1:User {
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'user1@example.com',
  name: 'John Doe',
  profile_picture: 'https://example.com/profiles/johndoe.jpg'
});

MERGE (u2:User {
  user_id: '223e4567-e89b-12d3-a456-426614174001',
  email: 'user2@example.com',
  name: 'Jane Smith',
  profile_picture: 'https://example.com/profiles/janesmith.jpg'
});

// User Settings nodes
MERGE (us1:UserSettings {
  settings_id: '323e4567-e89b-12d3-a456-426614174002',
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  theme: 'light',
  notification_preferences: 'all'
});

MERGE (us2:UserSettings {
  settings_id: '423e4567-e89b-12d3-a456-426614174003',
  user_id: '223e4567-e89b-12d3-a456-426614174001',
  theme: 'dark',
  notification_preferences: 'essential'
});

// User Performance nodes
MERGE (up1:UserPerformance {
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  metric_type: 'calories',
  value: 2100,
  date: date('2023-10-01')
});

MERGE (up2:UserPerformance {
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  metric_type: 'protein',
  value: 150,
  date: date('2023-10-01')
});

// Food nodes
MERGE (f1:Food {
  food_id: '523e4567-e89b-12d3-a456-426614174004',
  name: 'Chicken Breast',
  brand: 'Organic Farms',
  calories: 165,
  protein: 31,
  carbs: 0,
  fats: 3
});

MERGE (f2:Food {
  food_id: '623e4567-e89b-12d3-a456-426614174005',
  name: 'Brown Rice',
  brand: 'Whole Foods',
  calories: 215,
  protein: 5,
  carbs: 45,
  fats: 2
});

MERGE (f3:Food {
  food_id: '723e4567-e89b-12d3-a456-426614174006',
  name: 'Avocado',
  brand: 'Nature\'s Best',
  calories: 240,
  protein: 3,
  carbs: 12,
  fats: 22
});

// Recipe nodes
MERGE (r1:Recipe {
  recipe_id: '823e4567-e89b-12d3-a456-426614174007',
  name: 'Chicken and Rice Bowl',
  description: 'A simple, healthy bowl with chicken and rice',
  calories: 450,
  protein: 40,
  carbs: 50,
  fats: 10
});

MERGE (r2:Recipe {
  recipe_id: '923e4567-e89b-12d3-a456-426614174008',
  name: 'Avocado Chicken Salad',
  description: 'Fresh salad with chicken and avocado',
  calories: 400,
  protein: 35,
  carbs: 15,
  fats: 25
});

// Tag nodes
MERGE (t1:Tag {
  tag_id: 'a23e4567-e89b-12d3-a456-426614174009',
  name: 'High Protein',
  category: 'Nutrition'
});

MERGE (t2:Tag {
  tag_id: 'b23e4567-e89b-12d3-a456-426614174010',
  name: 'Low Carb',
  category: 'Diet'
});

MERGE (t3:Tag {
  tag_id: 'c23e4567-e89b-12d3-a456-426614174011',
  name: 'Quick Prep',
  category: 'Preparation'
});

// Meal Review nodes
MERGE (mr1:MealReview {
  meal_review_id: 'd23e4567-e89b-12d3-a456-426614174012',
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  meal_id: '823e4567-e89b-12d3-a456-426614174007',
  rating: 4,
  sentiment: 'positive',
  comments: 'Loved the simplicity and flavor!',
  created_at: datetime('2023-10-02T18:00:00')
});

// Meal Event nodes
MERGE (me1:MealEvent {
  meal_event_id: 'e23e4567-e89b-12d3-a456-426614174013',
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  recipe_id: '823e4567-e89b-12d3-a456-426614174007',
  meal_type: 'lunch',
  date: datetime('2023-10-02T12:30:00'),
  calories: 450,
  protein: 40,
  carbs: 50,
  fats: 10
});

// Workout Event nodes
MERGE (we1:WorkoutEvent {
  workout_event_id: 'f23e4567-e89b-12d3-a456-426614174014',
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  workout_type: 'strength',
  duration: 45,
  calories_burned: 320,
  date: datetime('2023-10-02T17:00:00')
});

// Shopping Cart nodes
MERGE (sc1:ShoppingCart {
  cart_id: 'g23e4567-e89b-12d3-a456-426614174015',
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  total_items: 5,
  created_at: datetime('2023-10-01T09:00:00')
});

// Create relationships between nodes

// User to UserSettings
MATCH (u:User {user_id: '123e4567-e89b-12d3-a456-426614174000'})
MATCH (us:UserSettings {user_id: '123e4567-e89b-12d3-a456-426614174000'})
MERGE (u)-[:HAS_SETTINGS]->(us);

MATCH (u:User {user_id: '223e4567-e89b-12d3-a456-426614174001'})
MATCH (us:UserSettings {user_id: '223e4567-e89b-12d3-a456-426614174001'})
MERGE (u)-[:HAS_SETTINGS]->(us);

// User to UserPerformance
MATCH (u:User {user_id: '123e4567-e89b-12d3-a456-426614174000'})
MATCH (up:UserPerformance {user_id: '123e4567-e89b-12d3-a456-426614174000'})
MERGE (up)-[:TRACKS]->(u);

// Recipe to Food (ingredients)
MATCH (r:Recipe {recipe_id: '823e4567-e89b-12d3-a456-426614174007'})
MATCH (f1:Food {food_id: '523e4567-e89b-12d3-a456-426614174004'})
MATCH (f2:Food {food_id: '623e4567-e89b-12d3-a456-426614174005'})
MERGE (r)-[:HAS_INGREDIENT {quantity: 150, unit: 'g'}]->(f1)
MERGE (r)-[:HAS_INGREDIENT {quantity: 100, unit: 'g'}]->(f2);

MATCH (r:Recipe {recipe_id: '923e4567-e89b-12d3-a456-426614174008'})
MATCH (f1:Food {food_id: '523e4567-e89b-12d3-a456-426614174004'})
MATCH (f3:Food {food_id: '723e4567-e89b-12d3-a456-426614174006'})
MERGE (r)-[:HAS_INGREDIENT {quantity: 120, unit: 'g'}]->(f1)
MERGE (r)-[:HAS_INGREDIENT {quantity: 50, unit: 'g'}]->(f3);

// Recipe to Tag
MATCH (r:Recipe {recipe_id: '823e4567-e89b-12d3-a456-426614174007'})
MATCH (t1:Tag {tag_id: 'a23e4567-e89b-12d3-a456-426614174009'})
MATCH (t3:Tag {tag_id: 'c23e4567-e89b-12d3-a456-426614174011'})
MERGE (r)-[:TAGGED_WITH]->(t1)
MERGE (r)-[:TAGGED_WITH]->(t3);

MATCH (r:Recipe {recipe_id: '923e4567-e89b-12d3-a456-426614174008'})
MATCH (t1:Tag {tag_id: 'a23e4567-e89b-12d3-a456-426614174009'})
MATCH (t2:Tag {tag_id: 'b23e4567-e89b-12d3-a456-426614174010'})
MERGE (r)-[:TAGGED_WITH]->(t1)
MERGE (r)-[:TAGGED_WITH]->(t2);

// User to Recipe (favorites)
MATCH (u:User {user_id: '123e4567-e89b-12d3-a456-426614174000'})
MATCH (r:Recipe {recipe_id: '823e4567-e89b-12d3-a456-426614174007'})
MERGE (u)-[:HAS_FAVORITE {date_added: date('2023-09-15')}]->(r);

// User to Recipe (meal reviews)
MATCH (u:User {user_id: '123e4567-e89b-12d3-a456-426614174000'})
MATCH (mr:MealReview {meal_review_id: 'd23e4567-e89b-12d3-a456-426614174012'})
MATCH (r:Recipe {recipe_id: '823e4567-e89b-12d3-a456-426614174007'})
MERGE (u)-[:SUBMITTED_REVIEW]->(mr)
MERGE (mr)-[:REVIEWS]->(r);

// User to MealEvent
MATCH (u:User {user_id: '123e4567-e89b-12d3-a456-426614174000'})
MATCH (me:MealEvent {meal_event_id: 'e23e4567-e89b-12d3-a456-426614174013'})
MATCH (r:Recipe {recipe_id: '823e4567-e89b-12d3-a456-426614174007'})
MERGE (u)-[:LOGGED_MEAL]->(me)
MERGE (me)-[:OF_RECIPE]->(r);

// User to WorkoutEvent
MATCH (u:User {user_id: '123e4567-e89b-12d3-a456-426614174000'})
MATCH (we:WorkoutEvent {workout_event_id: 'f23e4567-e89b-12d3-a456-426614174014'})
MERGE (u)-[:LOGGED_WORKOUT]->(we);

// User to ShoppingCart
MATCH (u:User {user_id: '123e4567-e89b-12d3-a456-426614174000'})
MATCH (sc:ShoppingCart {cart_id: 'g23e4567-e89b-12d3-a456-426614174015'})
MERGE (u)-[:HAS_SHOPPING_CART]->(sc);

// ShoppingCart to Food
MATCH (sc:ShoppingCart {cart_id: 'g23e4567-e89b-12d3-a456-426614174015'})
MATCH (f1:Food {food_id: '523e4567-e89b-12d3-a456-426614174004'})
MATCH (f2:Food {food_id: '623e4567-e89b-12d3-a456-426614174005'})
MERGE (sc)-[:CONTAINS_ITEM {quantity: 300, unit: 'g'}]->(f1)
MERGE (sc)-[:CONTAINS_ITEM {quantity: 200, unit: 'g'}]->(f2);

// Sample query to check if everything is connected
MATCH path = (u:User {email: 'user1@example.com'})-[*1..2]-(n)
RETURN path LIMIT 10; 