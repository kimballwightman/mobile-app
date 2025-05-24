# Mobile App Backend

This is the backend server for the mobile nutrition and fitness app.

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Set up environment variables by creating a `.env` file in the root directory with the following content:
   ```
   SUPABASE_URL=http://localhost:54321
   SUPABASE_KEY=your_supabase_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

3. Start the local Supabase instance:
   ```
   cd /path/to/mobile-app
   supabase start
   ```

4. Run database migrations:
   ```
   cd /path/to/mobile-app
   supabase db reset
   ```

5. Start the backend server:
   ```
   cd /path/to/mobile-app/backend
   uvicorn main:app --reload
   ```

## Spoonacular API Integration

The application integrates with the Spoonacular API to provide food and recipe data. 

### Setup Spoonacular API

1. Sign up for a free account at [Spoonacular Food API](https://spoonacular.com/food-api/console#Dashboard)
2. Navigate to Profile > API Key to get your API key
3. Add your API key to the `.env` file:
   ```
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

### Testing the API Integration

You can test the Spoonacular API integration by running:

```
python test_spoonacular.py
```

This script will:
- Fetch recipe data for a sample recipe
- Fetch ingredient data for a sample ingredient
- Display the nutritional information

### API Features

The integration includes the following features:

1. **Recipe Search**: Search for recipes with various filters
   - Filter by diet (vegetarian, vegan, etc.)
   - Filter by nutrition values (calories, protein, etc.)
   - Filter by ingredients to include/exclude

2. **Recipe Details**: Get detailed information about recipes
   - Ingredients list with quantities
   - Step-by-step instructions
   - Nutritional information
   - Images and cooking times

3. **Food Ingredient Search**: Search for basic ingredients
   - Nutritional information
   - Common serving sizes

4. **Product Data**: Information about packaged food products
   - Brand information
   - Nutritional information
   - UPC/barcode data

5. **Menu Items**: Information about restaurant menu items
   - Restaurant chain data
   - Nutritional information

## Database Schema and Spoonacular Terms of Service Compliance

To comply with Spoonacular's terms of service (which prohibits storing their content for more than an hour), our database only stores:

1. **Minimal metadata**: IDs, names, and timestamps
2. **Nutritional information**: Calories, macronutrients, and serving sizes
3. **Calculated ratios**: Protein-to-calorie ratios and macronutrient distribution
4. **Relationship mappings**: Links between recipes and ingredients

We do NOT store:
- Full recipe instructions
- Recipe descriptions or summaries
- Detailed ingredient information
- Images or other copyrighted content

This approach allows us to:
1. Filter foods and recipes based on nutritional ratios
2. Minimize API calls by using stored IDs to fetch fresh content
3. Respect Spoonacular's terms of service

The integration uses the following database tables:

- `ingredients`: Basic ingredient data and nutritional metrics
- `recipes`: Recipe metadata and nutritional metrics 
- `recipe_ingredients`: Junction table linking recipes to ingredients
- `products`: Packaged food products data
- `menu_items`: Restaurant menu items data
- `food_fetch_queue`: Queue for fetching data from Spoonacular API

## Architecture

The integration follows a service-oriented architecture:

1. `spoonacular_service.py`: Core service for API interaction
2. `food_service.py`: High-level service for the application
3. API routes: Endpoints exposed to the frontend
4. Prefect workflows: Scheduled tasks for data synchronization

## Scheduled Data Collection

The application uses Prefect to schedule data collection jobs that:

1. Fetch new foods/recipes up to the daily API limit
2. Store nutritional information and calculated ratios
3. Build an index of available foods for efficient filtering
4. Prioritize foods/recipes based on popularity and relevance

## Notes

- The free Spoonacular API tier allows 150 API calls per day.
- When users view recipes or foods, we fetch the latest data from Spoonacular using the stored IDs.
- We calculate and store nutritional ratios that aren't directly available from Spoonacular's API to optimize for protein-focused nutrition. 