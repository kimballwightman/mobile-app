# NutriTech Mobile App

A comprehensive nutrition and fitness tracking mobile application focused on helping users achieve their health and performance goals through precise nutrition planning, meal management, and performance tracking.

## Database Setup

This project uses Supabase for database management. Follow these steps to set up your local development environment:

### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Docker installed and running

### Setup Instructions

1. Clone this repository:
   ```
   git clone <repository-url>
   cd mobile-app
   ```

2. Run the database setup script:
   ```
   ./setup_supabase_db.sh
   ```
   
   This script will:
   - Create the UUID extension
   - Set up all database tables
   - Start Supabase locally

3. Access Supabase Studio at [http://localhost:54323](http://localhost:54323)

### Database Structure

The database includes tables for:

- User Management: `users`, `user_preferences`, `user_settings`, `user_integrations`
- Performance Tracking: `user_metrics`, `meal_log`, `workout_log`, `meal_reviews`
- Nutrition Planning: `recipes`, `foods`, `recipe_foods`, `tags`, `recipe_tags`, `user_favorites`, `user_meal_plan`
- Shopping & Inventory: `pantry_items`, `shopping_cart`, `shopping_cart_items`, `cart_windows`, `orders`, `order_items`

Each table includes:
- Primary keys (UUIDs)
- Foreign key relationships
- Timestamps for creation and updates
- Row-Level Security (RLS) policies

### Migrations

To create new migrations:

```bash
supabase migration new <migration_name>
```

Edit the generated file in `supabase/migrations/` and apply changes:

```bash
supabase db reset
```

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

API endpoints are available at [http://localhost:54321](http://localhost:54321) once Supabase is running locally.

To run the simulator:

1) Run Metro
  - cd /Users/kimballwightman/Repos/mobile-app/frontend
  - npx react-native start --port=8082
2) Run the backend docker container
  - cd /Users/kimballwightman/Repos/mobile-app/backend  -  new terminal window
  - docker start backend-backend-1
3) Run the app
  - cd ..
  - npx react-native run-ios   # iOS  
  - npx react-native run-android  # Android

Probably create an automated task from task manager to spin these up all at once
