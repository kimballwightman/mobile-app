import os
import requests
import logging
from typing import Dict, List, Optional, Any, Tuple
from dotenv import load_dotenv
import json
from datetime import datetime
from supabase import create_client
import math

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("spoonacular_service")

# Load environment variables from root directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

# Get API key from environment
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY", "")
BASE_URL = "https://api.spoonacular.com"

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL", "")
supabase_key = os.getenv("SUPABASE_KEY", "")
supabase = create_client(supabase_url, supabase_key)

def calculate_nutrient_ratios(calories: float, protein: float, carbs: float, fat: float) -> Dict[str, float]:
    """
    Calculate macronutrient ratios based on calorie and macronutrient values
    """
    if not calories or calories == 0:
        return {
            "protein_ratio": 0,
            "carb_ratio": 0,
            "fat_ratio": 0,
            "protein_per_calorie": 0
        }
    
    # Calculate percentages of calories from each macro
    protein_calories = protein * 4  # 4 calories per gram of protein
    carb_calories = carbs * 4  # 4 calories per gram of carbs
    fat_calories = fat * 9  # 9 calories per gram of fat
    
    protein_ratio = round(protein_calories / calories, 3) if calories > 0 else 0
    carb_ratio = round(carb_calories / calories, 3) if calories > 0 else 0
    fat_ratio = round(fat_calories / calories, 3) if calories > 0 else 0
    protein_per_calorie = round(protein / calories, 4) if calories > 0 else 0
    
    return {
        "protein_ratio": protein_ratio,
        "carb_ratio": carb_ratio,
        "fat_ratio": fat_ratio,
        "protein_per_calorie": protein_per_calorie
    }

async def fetch_recipe_data(recipe_id: int) -> Dict[str, Any]:
    """
    Fetch detailed recipe data from Spoonacular
    """
    if not SPOONACULAR_API_KEY:
        raise Exception("Missing Spoonacular API key")
    
    logger.info(f"Fetching recipe data for ID: {recipe_id}")
    
    try:
        response = requests.get(
            f"{BASE_URL}/recipes/{recipe_id}/information",
            params={
                "apiKey": SPOONACULAR_API_KEY,
                "includeNutrition": True
            }
        )
        response.raise_for_status()
        
        recipe_data = response.json()
        
        # Process nutrition data
        if "nutrition" in recipe_data:
            nutrients = recipe_data["nutrition"]["nutrients"]
            for nutrient in nutrients:
                if nutrient["name"] == "Calories":
                    recipe_data["calories"] = nutrient["amount"]
                elif nutrient["name"] == "Protein":
                    recipe_data["protein"] = nutrient["amount"]
                elif nutrient["name"] == "Carbohydrates":
                    recipe_data["carbs"] = nutrient["amount"]
                elif nutrient["name"] == "Fat":
                    recipe_data["fat"] = nutrient["amount"]
        
        # Calculate and add nutritional ratios
        ratios = calculate_nutrient_ratios(recipe_data["calories"], recipe_data["protein"], recipe_data["carbs"], recipe_data["fat"])
        recipe_data.update(ratios)
        
        return recipe_data
    except requests.RequestException as e:
        logger.error(f"Error fetching recipe data: {str(e)}")
        raise Exception(f"Error fetching recipe data: {str(e)}")

async def fetch_ingredient_data(ingredient_id: int, amount: float = 100, unit: str = "g") -> Dict[str, Any]:
    """
    Fetch detailed ingredient data from Spoonacular
    """
    if not SPOONACULAR_API_KEY:
        raise Exception("Missing Spoonacular API key")
    
    logger.info(f"Fetching ingredient data for ID: {ingredient_id}")
    
    try:
        response = requests.get(
            f"{BASE_URL}/food/ingredients/{ingredient_id}/information",
            params={
                "apiKey": SPOONACULAR_API_KEY,
                "amount": amount,
                "unit": unit
            }
        )
        response.raise_for_status()
        
        ingredient_data = response.json()
        
        # Process nutrition data
        calories = 0
        protein = 0
        carbs = 0
        fat = 0
        
        if "nutrition" in ingredient_data and "nutrients" in ingredient_data["nutrition"]:
            nutrients = ingredient_data["nutrition"]["nutrients"]
            for nutrient in nutrients:
                if nutrient["name"] == "Calories":
                    calories = nutrient["amount"]
                    ingredient_data["calories"] = calories
                elif nutrient["name"] == "Protein":
                    protein = nutrient["amount"]
                    ingredient_data["protein"] = protein
                elif nutrient["name"] == "Carbohydrates":
                    carbs = nutrient["amount"]
                    ingredient_data["carbs"] = carbs
                elif nutrient["name"] == "Fat":
                    fat = nutrient["amount"]
                    ingredient_data["fat"] = fat
        
        # Calculate and add nutritional ratios
        ratios = calculate_nutrient_ratios(calories, protein, carbs, fat)
        ingredient_data.update(ratios)
        
        return ingredient_data
    except requests.RequestException as e:
        logger.error(f"Error fetching ingredient data: {str(e)}")
        raise Exception(f"Error fetching ingredient data: {str(e)}")

async def fetch_product_data(product_id: int) -> Dict[str, Any]:
    """
    Fetch detailed product data from Spoonacular
    """
    if not SPOONACULAR_API_KEY:
        raise Exception("Missing Spoonacular API key")
    
    logger.info(f"Fetching product data for ID: {product_id}")
    
    try:
        response = requests.get(
            f"{BASE_URL}/food/products/{product_id}",
            params={
                "apiKey": SPOONACULAR_API_KEY
            }
        )
        response.raise_for_status()
        
        product_data = response.json()
        
        # Process nutrition data
        calories = 0
        protein = 0
        carbs = 0
        fat = 0
        
        if "nutrition" in product_data:
            nutrients = product_data["nutrition"]["nutrients"]
            for nutrient in nutrients:
                if nutrient["name"] == "Calories":
                    calories = nutrient["amount"]
                    product_data["calories"] = calories
                elif nutrient["name"] == "Protein":
                    protein = nutrient["amount"]
                    product_data["protein"] = protein
                elif nutrient["name"] == "Carbohydrates":
                    carbs = nutrient["amount"]
                    product_data["carbs"] = carbs
                elif nutrient["name"] == "Fat":
                    fat = nutrient["amount"]
                    product_data["fat"] = fat
        
        # Calculate and add nutritional ratios
        ratios = calculate_nutrient_ratios(calories, protein, carbs, fat)
        product_data.update(ratios)
        
        return product_data
    except requests.RequestException as e:
        logger.error(f"Error fetching product data: {str(e)}")
        raise Exception(f"Error fetching product data: {str(e)}")

async def fetch_menu_item_data(menu_item_id: int) -> Dict[str, Any]:
    """
    Fetch detailed menu item data from Spoonacular
    """
    if not SPOONACULAR_API_KEY:
        raise Exception("Missing Spoonacular API key")
    
    logger.info(f"Fetching menu item data for ID: {menu_item_id}")
    
    try:
        response = requests.get(
            f"{BASE_URL}/food/menuItems/{menu_item_id}",
            params={
                "apiKey": SPOONACULAR_API_KEY
            }
        )
        response.raise_for_status()
        
        menu_item_data = response.json()
        
        # Process nutrition data
        calories = 0
        protein = 0
        carbs = 0
        fat = 0
        
        if "nutrition" in menu_item_data:
            nutrients = menu_item_data["nutrition"]["nutrients"]
            for nutrient in nutrients:
                if nutrient["name"] == "Calories":
                    calories = nutrient["amount"]
                    menu_item_data["calories"] = calories
                elif nutrient["name"] == "Protein":
                    protein = nutrient["amount"]
                    menu_item_data["protein"] = protein
                elif nutrient["name"] == "Carbohydrates":
                    carbs = nutrient["amount"]
                    menu_item_data["carbs"] = carbs
                elif nutrient["name"] == "Fat":
                    fat = nutrient["amount"]
                    menu_item_data["fat"] = fat
        
        # Calculate and add nutritional ratios
        ratios = calculate_nutrient_ratios(calories, protein, carbs, fat)
        menu_item_data.update(ratios)
        
        return menu_item_data
    except requests.RequestException as e:
        logger.error(f"Error fetching menu item data: {str(e)}")
        raise Exception(f"Error fetching menu item data: {str(e)}")

async def save_recipe_to_database(recipe_data: Dict[str, Any]) -> str:
    """
    Save recipe metadata to the database
    Only stores IDs, mappings, and calculated nutritional metrics to comply with Spoonacular TOS
    Returns the UUID of the created/updated recipe
    """
    logger.info(f"Saving recipe metadata to database: {recipe_data.get('id', 'Unknown ID')}")
    
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
    recipe = {
        "name": recipe_data.get("title", ""),  # Basic identifier
        "calories": int(calories),
        "protein": int(protein),
        "carbs": int(carbs),
        "fats": int(fat),
        "protein_ratio": ratios["protein_ratio"],
        "carb_ratio": ratios["carb_ratio"],
        "fat_ratio": ratios["fat_ratio"],
        "protein_per_calorie": ratios["protein_per_calorie"],
        "servings": recipe_data.get("servings", 1),
        "external_id": recipe_id,  # Store Spoonacular ID for later lookups
        "last_fetched_at": datetime.now().isoformat(),
        "complexity_score": recipe_data.get("healthScore", 50),  # Using healthScore as a proxy for complexity
        "popularity_score": recipe_data.get("aggregateLikes", 0),
        "data_source": "spoonacular"
    }
    
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
                    "data_source": "spoonacular"
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
                        "quantity": ingredient.get("amount", 0),
                        "unit": ingredient.get("unit", "g")
                    }
                    supabase.table("recipe_ingredients").insert(recipe_ingredient).execute()
    
    return db_recipe_id

async def save_ingredient_to_database(ingredient_data: Dict[str, Any]) -> str:
    """
    Save ingredient metadata to the database
    Only stores IDs and calculated nutritional metrics to comply with Spoonacular TOS
    Returns the UUID of the created/updated ingredient
    """
    logger.info(f"Saving ingredient metadata to database: {ingredient_data.get('id', 'Unknown ID')}")
    
    # Check if ingredient already exists
    ingredient_id = str(ingredient_data.get("id", ""))
    existing_ingredient = supabase.table("ingredients").select("food_id").eq("external_id", ingredient_id).execute()
    
    # Extract nutritional information
    calories = float(ingredient_data.get("calories", 0))
    protein = float(ingredient_data.get("protein", 0))
    carbs = float(ingredient_data.get("carbs", 0))
    fat = float(ingredient_data.get("fat", 0))
    
    # Get serving info
    amount = ingredient_data.get("amount", 100)
    unit = ingredient_data.get("unit", "g")
    
    # Calculate ratios
    ratios = calculate_nutrient_ratios(calories, protein, carbs, fat)
    
    # Store only minimal nutritional data and calculated ratios
    ingredient = {
        "name": ingredient_data.get("name", ""),  # Basic identifier
        "calories": int(calories),
        "protein": int(protein),
        "carbs": int(carbs),
        "fats": int(fat),
        "protein_ratio": ratios["protein_ratio"],
        "carb_ratio": ratios["carb_ratio"],
        "fat_ratio": ratios["fat_ratio"],
        "protein_per_calorie": ratios["protein_per_calorie"],
        "serving_size": str(amount),
        "serving_unit": unit,
        "external_id": ingredient_id,  # Store Spoonacular ID for later lookups
        "last_fetched_at": datetime.now().isoformat(),
        "data_source": "spoonacular"
    }
    
    if existing_ingredient.data:
        # Update existing ingredient
        db_ingredient_id = existing_ingredient.data[0]["food_id"]
        response = supabase.table("ingredients").update(ingredient).eq("food_id", db_ingredient_id).execute()
    else:
        # Create new ingredient
        response = supabase.table("ingredients").insert(ingredient).execute()
    
    if not response.data:
        raise Exception("Failed to save ingredient to database")
    
    return response.data[0]["food_id"]

async def save_product_to_database(product_data: Dict[str, Any]) -> str:
    """
    Save product metadata to the database
    Only stores IDs and calculated nutritional metrics to comply with Spoonacular TOS
    Returns the UUID of the created/updated product
    """
    logger.info(f"Saving product metadata to database: {product_data.get('id', 'Unknown ID')}")
    
    # Check if product already exists
    product_id = str(product_data.get("id", ""))
    existing_product = supabase.table("products").select("product_id").eq("external_id", product_id).execute()
    
    # Extract nutritional information
    calories = float(product_data.get("calories", 0))
    protein = float(product_data.get("protein", 0))
    carbs = float(product_data.get("carbs", 0))
    fat = float(product_data.get("fat", 0))
    
    # Calculate ratios
    ratios = calculate_nutrient_ratios(calories, protein, carbs, fat)
    
    # Get serving info
    serving_size = product_data.get("serving_size", "100")
    serving_unit = product_data.get("serving_unit", "g")
    
    # Store only minimal product data and calculated ratios
    product = {
        "name": product_data.get("title", ""),  # Basic identifier
        "brand": product_data.get("brand", ""),  # Brand is important for product identification
        "calories": int(calories),
        "protein": int(protein),
        "carbs": int(carbs),
        "fats": int(fat),
        "protein_ratio": ratios["protein_ratio"],
        "carb_ratio": ratios["carb_ratio"],
        "fat_ratio": ratios["fat_ratio"],
        "protein_per_calorie": ratios["protein_per_calorie"],
        "serving_size": serving_size,
        "serving_unit": serving_unit,
        "external_id": product_id,  # Store Spoonacular ID for later lookups
        "last_fetched_at": datetime.now().isoformat(),
        "barcode": product_data.get("upc", "")  # Barcode helps with product identification
    }
    
    # Store ingredient relationship if applicable
    if "ingredient_id" in product_data and product_data["ingredient_id"]:
        ingredient_query = supabase.table("ingredients").select("food_id").eq("external_id", str(product_data["ingredient_id"])).execute()
        if ingredient_query.data:
            product["ingredient_id"] = ingredient_query.data[0]["food_id"]
    
    if existing_product.data:
        # Update existing product
        db_product_id = existing_product.data[0]["product_id"]
        response = supabase.table("products").update(product).eq("product_id", db_product_id).execute()
    else:
        # Create new product
        response = supabase.table("products").insert(product).execute()
    
    if not response.data:
        raise Exception("Failed to save product to database")
    
    return response.data[0]["product_id"]

async def save_menu_item_to_database(menu_item_data: Dict[str, Any]) -> str:
    """
    Save menu item data to the database
    Returns the UUID of the created/updated menu item
    """
    logger.info(f"Saving menu item to database: {menu_item_data.get('id', 'Unknown ID')}")
    
    # Check if menu item already exists
    menu_item_id = str(menu_item_data.get("id", ""))
    existing_menu_item = supabase.table("menu_items").select("menu_item_id").eq("external_id", menu_item_id).execute()
    
    # Extract nutritional information
    calories = float(menu_item_data.get("calories", 0))
    protein = float(menu_item_data.get("protein", 0))
    carbs = float(menu_item_data.get("carbs", 0))
    fat = float(menu_item_data.get("fat", 0))
    
    # Calculate ratios
    ratios = calculate_nutrient_ratios(calories, protein, carbs, fat)
    
    # Get serving info
    serving_size = menu_item_data.get("serving_size", "1")
    serving_unit = menu_item_data.get("serving_unit", "serving")
    
    menu_item = {
        "name": menu_item_data.get("title", ""),
        "restaurant_chain": menu_item_data.get("restaurantChain", ""),
        "calories": int(calories),
        "protein": int(protein),
        "carbs": int(carbs),
        "fats": int(fat),
        "protein_ratio": ratios["protein_ratio"],
        "carb_ratio": ratios["carb_ratio"],
        "fat_ratio": ratios["fat_ratio"],
        "protein_per_calorie": ratios["protein_per_calorie"],
        "serving_size": serving_size,
        "serving_unit": serving_unit,
        "external_id": menu_item_id,
        "last_fetched_at": datetime.now().isoformat()
    }
    
    if existing_menu_item.data:
        # Update existing menu item
        db_menu_item_id = existing_menu_item.data[0]["menu_item_id"]
        response = supabase.table("menu_items").update(menu_item).eq("menu_item_id", db_menu_item_id).execute()
    else:
        # Create new menu item
        response = supabase.table("menu_items").insert(menu_item).execute()
    
    if not response.data:
        raise Exception("Failed to save menu item to database")
    
    return response.data[0]["menu_item_id"] 