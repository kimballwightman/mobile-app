#!/usr/bin/env python3
"""
Script to fetch and store specific test data in the database.
This will fetch and store:
- Recipe ID: 716429 (Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs)
- Ingredient ID: 11297 (Parsley)
- Product ID: 12345 (Test product)
- Menu Item ID: 779721 (Test menu item)

Usage: python store_test_data.py
"""

import asyncio
import logging
import json
from dotenv import load_dotenv
from supabase import create_client
import os
from datetime import datetime
from services.spoonacular_service import (
    fetch_recipe_data,
    fetch_ingredient_data,
    fetch_product_data,
    fetch_menu_item_data,
    calculate_nutrient_ratios,
    save_ingredient_to_database,
    save_product_to_database,
    save_menu_item_to_database
)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("store_test_data")

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL", "")
supabase_key = os.getenv("SUPABASE_KEY", "")
supabase = create_client(supabase_url, supabase_key)

async def save_recipe_directly(recipe_data):
    """
    Directly save recipe to database, avoiding potential issues with the service function
    """
    logger.info(f"Saving recipe metadata to database manually: {recipe_data.get('id', 'Unknown ID')}")
    
    # Check if recipe already exists
    recipe_id = str(recipe_data.get("id", ""))
    existing_recipe = supabase.table("recipes").select("recipe_id").eq("external_id", recipe_id).execute()
    
    # Extract only nutritional information
    calories = float(recipe_data.get("calories", 0))
    protein = float(recipe_data.get("protein", 0))
    carbs = float(recipe_data.get("carbs", 0))
    fat = float(recipe_data.get("fat", 0))
    
    # Calculate ratios
    ratios = calculate_nutrient_ratios(calories, protein, carbs, fat)
    
    # Store only minimal metadata and calculated fields
    # Ensure all integer fields are properly converted from floats
    recipe = {
        "name": recipe_data.get("title", ""),  # Basic identifier
        "calories": int(round(calories)),
        "protein": int(round(protein)),
        "carbs": int(round(carbs)),
        "fats": int(round(fat)),
        "protein_ratio": ratios["protein_ratio"],
        "carb_ratio": ratios["carb_ratio"],
        "fat_ratio": ratios["fat_ratio"],
        "protein_per_calorie": ratios["protein_per_calorie"],
        "servings": int(round(recipe_data.get("servings", 1))),
        "external_id": recipe_id,  # Store Spoonacular ID for later lookups
        "last_fetched_at": datetime.now().isoformat(),
        "complexity_score": int(round(recipe_data.get("healthScore", 50))),  # Using healthScore as a proxy for complexity
        "popularity_score": int(round(recipe_data.get("aggregateLikes", 0))),
        "data_source": "spoonacular"
    }
    
    try:
        if existing_recipe.data:
            # Update existing recipe
            db_recipe_id = existing_recipe.data[0]["recipe_id"]
            response = supabase.table("recipes").update(recipe).eq("recipe_id", db_recipe_id).execute()
        else:
            # Create new recipe
            response = supabase.table("recipes").insert(recipe).execute()
        
        if not response.data:
            raise Exception("Failed to save recipe to database")
        
        db_recipe_id = response.data[0]["recipe_id"]
        
        # Save ingredient mappings if available
        if "extendedIngredients" in recipe_data:
            for ingredient in recipe_data["extendedIngredients"]:
                ingredient_name = ingredient.get("name", "")
                ingredient_external_id = str(ingredient.get("id", ""))
                
                if not ingredient_external_id:
                    continue  # Skip ingredients without an ID
                
                # Check if this ingredient exists
                ingredient_query = supabase.table("ingredients").select("food_id").eq("external_id", ingredient_external_id).execute()
                
                ingredient_id = None
                if ingredient_query.data:
                    ingredient_id = ingredient_query.data[0]["food_id"]
                else:
                    # Create new ingredient with minimal info and queue for future processing
                    ing_data = {
                        "name": ingredient_name,
                        "external_id": ingredient_external_id,
                        "data_source": "spoonacular",
                        # Add required fields that can't be null
                        "calories": 0,
                        "protein": 0,
                        "carbs": 0,
                        "fats": 0,
                        "serving_size": "100",
                        "serving_unit": "g"
                    }
                    
                    ingredient_response = supabase.table("ingredients").insert(ing_data).execute()
                    if ingredient_response.data:
                        ingredient_id = ingredient_response.data[0]["food_id"]
                        
                        # Queue for detailed fetching
                        queue_data = {
                            "external_id": ingredient_external_id,
                            "entity_type": "ingredient",
                            "priority": 2,  # Medium priority
                            "status": "pending"
                        }
                        supabase.table("food_fetch_queue").insert(queue_data).execute()
                
                if ingredient_id:
                    # Store only the recipe-ingredient relationship mapping
                    rel_query = supabase.table("recipe_ingredients") \
                        .select("recipe_ingredient_id") \
                        .eq("recipe_id", db_recipe_id) \
                        .eq("ingredient_id", ingredient_id) \
                        .execute()
                    
                    if not rel_query.data:
                        # Create recipe-ingredient relationship
                        recipe_ingredient = {
                            "recipe_id": db_recipe_id,
                            "ingredient_id": ingredient_id,
                            "quantity": float(ingredient.get("amount", 0)),
                            "unit": ingredient.get("unit", "g")
                        }
                        supabase.table("recipe_ingredients").insert(recipe_ingredient).execute()
        
        return db_recipe_id
    except Exception as e:
        logger.error(f"Error in save_recipe_directly: {str(e)}")
        raise e

async def store_test_data():
    """
    Fetch and store test data directly in the database
    """
    logger.info("Starting to fetch and store test data")
    
    # Recipe ID: 716429 (Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs)
    logger.info("Fetching and storing test recipe (ID: 716429)")
    try:
        recipe_data = await fetch_recipe_data(716429)
        # Use direct save function instead of the service function
        recipe_id = await save_recipe_directly(recipe_data)
        logger.info(f"Recipe stored with database ID: {recipe_id}")
    except Exception as e:
        logger.error(f"Failed to store recipe: {str(e)}")
    
    # Ingredient ID: 11297 (Parsley)
    logger.info("Fetching and storing test ingredient (ID: 11297)")
    try:
        ingredient_data = await fetch_ingredient_data(11297)
        ingredient_id = await save_ingredient_to_database(ingredient_data)
        logger.info(f"Ingredient stored with database ID: {ingredient_id}")
    except Exception as e:
        logger.error(f"Failed to store ingredient: {str(e)}")
    
    # Product ID: 12345 (Test product)
    logger.info("Fetching and storing test product (ID: 12345)")
    try:
        product_data = await fetch_product_data(12345)
        product_id = await save_product_to_database(product_data)
        logger.info(f"Product stored with database ID: {product_id}")
    except Exception as e:
        logger.error(f"Failed to store product: {str(e)}")
    
    # Menu Item ID: 779721 (Test menu item)
    logger.info("Fetching and storing test menu item (ID: 779721)")
    try:
        menu_item_data = await fetch_menu_item_data(779721)
        menu_item_id = await save_menu_item_to_database(menu_item_data)
        logger.info(f"Menu item stored with database ID: {menu_item_id}")
    except Exception as e:
        logger.error(f"Failed to store menu item: {str(e)}")
    
    logger.info("Test data storage completed")

if __name__ == "__main__":
    asyncio.run(store_test_data()) 