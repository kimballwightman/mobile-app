# NutriTech Mobile App

A comprehensive nutrition and fitness tracking mobile application focused on helping users achieve their health and performance goals through precise nutrition planning, meal management, and performance tracking.

## Database Setup

This project uses a dual-database approach:
1. **Supabase (PostgreSQL)** - For relational data storage
2. **Neo4j** - For graph data representation and traversal

### Relational Database Setup (Supabase)

#### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Docker installed and running

#### Setup Instructions

1. Ensure you have the Supabase migration files in place:
   ```
   /supabase/migrations/20230101000000_create_tables.sql
   ```

2. Start Supabase locally:
   ```bash
   supabase start
   ```

3. Run the migration to create all tables:
   ```bash
   supabase db reset
   ```

4. Access Supabase Studio at [http://localhost:54323](http://localhost:54323)

### Graph Database Setup (Neo4j)

#### Prerequisites

- [Neo4j Aura](https://neo4j.com/cloud/aura/) account with a free instance
- [cypher-shell](https://neo4j.com/docs/operations-manual/current/tools/cypher-shell/) installed locally

#### Setup Instructions

1. Find your Neo4j Aura connection details (URI, username, password)

2. Run the setup script:
   ```bash
   ./setup_neo4j_graph.sh
   ```
   
   This script will:
   - Prompt for your Neo4j credentials
   - Connect to your Neo4j Aura instance
   - Create all node types (User, Recipe, Food, etc.)
   - Create relationships between nodes
   - Set up constraints and indexes for performance
   - Load sample data

3. Access your Neo4j Browser through [Neo4j Aura Console](https://console.neo4j.io/)

### Understanding the Dual Database Approach

- **Relational Database (PostgreSQL/Supabase)**: Stores structured data with fixed schemas, handles transactions, and provides ACID guarantees. Used for:
  - User accounts and authentication
  - Meal and workout logging
  - Shopping cart and orders
  - Structured nutritional data

- **Graph Database (Neo4j)**: Models and traverses complex relationships efficiently. Used for:
  - Personalized meal recommendations
  - Food ingredient networks
  - User performance tracking
  - Complex relationship queries

## Database Structure

### Relational Tables

- User Management: `users`, `user_preferences`, `user_settings`, `user_integrations`
- Performance Tracking: `user_metrics`, `meal_log`, `workout_log`, `meal_reviews`
- Nutrition Planning: `recipes`, `foods`, `recipe_foods`, `tags`, `recipe_tags`, `user_favorites`, `user_meal_plan`
- Shopping & Inventory: `pantry_items`, `shopping_cart`, `shopping_cart_items`, `cart_windows`, `orders`, `order_items`

### Graph Nodes & Relationships

- User Nodes: `User`, `UserSettings`, `UserPerformance`
- Content Nodes: `Recipe`, `Food`, `Tag`
- Activity Nodes: `MealEvent`, `WorkoutEvent`, `MealReview`
- Shopping Nodes: `ShoppingCart`

## Features

- **Authentication**: Login/signup with email/password, OAuth (Google, Apple)
- **Onboarding Flow**: User setup with goals, health data, preferences
- **Dashboard**: Performance tracking, meal/workout management
- **Meal Discovery**: Searchable/filterable meals optimized for performance
- **Meal Planning Calendar**: Weekly meal planning with drag-and-drop
- **Expanded Meal View**: Detailed meal information with macros
- **Food Swapping**: Swap ingredients with alternatives
- **Pantry Management**: Track food inventory
- **Shopping Cart**: Automated grocery list generation
- **Meal Reviews**: Post-meal feedback system

## API Endpoints

- Supabase API: [http://localhost:54321](http://localhost:54321)
- Neo4j API: Accessible through your Neo4j Aura instance

## Sample Queries

### Relational Queries (SQL)

```sql
-- Get user meals for a day with nutritional data
SELECT u.name, mp.meal_type, r.name as recipe_name, 
       mp.custom_calories, r.calories, mp.custom_protein, r.protein 
FROM user_meal_plan mp
JOIN users u ON mp.user_id = u.user_id
LEFT JOIN recipes r ON mp.recipe_id = r.recipe_id
WHERE mp.date = '2023-10-02' AND u.user_id = '123e4567-e89b-12d3-a456-426614174000';
```

### Graph Queries (Cypher)

```cypher
// Get recipes similar to user favorites
MATCH (u:User {user_id: "123e4567-e89b-12d3-a456-426614174000"})-[:HAS_FAVORITE]->(fav:Recipe)
MATCH (fav)-[:TAGGED_WITH]->(t:Tag)<-[:TAGGED_WITH]-(similar:Recipe)
WHERE NOT (u)-[:HAS_FAVORITE]->(similar)
RETURN similar.name, count(t) as shared_tags
ORDER BY shared_tags DESC LIMIT 5;
``` 