import os
import requests
from typing import Dict, List, Optional, Any
from dotenv import load_dotenv
import json
from pydantic import BaseModel
from datetime import datetime

# Load environment variables
load_dotenv()

# Get API key from environment
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY", "")
BASE_URL = "https://api.spoonacular.com"

# Pydantic models for typed responses
class FoodNutrient(BaseModel):
    name: str
    amount: float
    unit: str

class Food(BaseModel):
    id: int
    name: str
    calories: float
    protein: float
    carbs: float
    fat: float
    image: Optional[str] = None
    
class Recipe(BaseModel):
    id: int
    title: str
    image: Optional[str] = None
    imageType: Optional[str] = None
    servings: int
    readyInMinutes: int
    calories: Optional[float] = None
    protein: Optional[float] = None
    carbs: Optional[float] = None
    fat: Optional[float] = None
    sourceUrl: Optional[str] = None
    summary: Optional[str] = None
    
class SearchResults(BaseModel):
    results: List[Recipe]
    offset: int
    number: int
    totalResults: int

async def search_recipes(
    query: str = "", 
    diet: Optional[str] = None,
    intolerances: Optional[str] = None,
    cuisine: Optional[str] = None,
    max_calories: Optional[int] = None,
    min_protein: Optional[int] = None,
    max_carbs: Optional[int] = None,
    max_fat: Optional[int] = None,
    offset: int = 0,
    number: int = 20
) -> Dict[str, Any]:
    """
    Search for recipes with optional filters
    """
    if not SPOONACULAR_API_KEY:
        raise Exception("Missing Spoonacular API key")
    
    params = {
        "apiKey": SPOONACULAR_API_KEY,
        "query": query,
        "offset": offset,
        "number": number,
        "addRecipeNutrition": True,
        "sort": "popularity"
    }
    
    # Add optional filters if provided
    if diet:
        params["diet"] = diet
    if intolerances:
        params["intolerances"] = intolerances
    if cuisine:
        params["cuisine"] = cuisine
    if max_calories:
        params["maxCalories"] = max_calories
    if min_protein:
        params["minProtein"] = min_protein
    if max_carbs:
        params["maxCarbs"] = max_carbs
    if max_fat:
        params["maxFat"] = max_fat
    
    try:
        response = requests.get(f"{BASE_URL}/recipes/complexSearch", params=params)
        response.raise_for_status()
        
        data = response.json()
        
        # Process the nutrition data for each recipe
        for recipe in data.get("results", []):
            if "nutrition" in recipe:
                nutrients = recipe["nutrition"]["nutrients"]
                for nutrient in nutrients:
                    if nutrient["name"] == "Calories":
                        recipe["calories"] = nutrient["amount"]
                    elif nutrient["name"] == "Protein":
                        recipe["protein"] = nutrient["amount"]
                    elif nutrient["name"] == "Carbohydrates":
                        recipe["carbs"] = nutrient["amount"]
                    elif nutrient["name"] == "Fat":
                        recipe["fat"] = nutrient["amount"]
        
        return data
    except requests.RequestException as e:
        raise Exception(f"Error searching recipes: {str(e)}")

async def get_recipe_by_id(recipe_id: int) -> Dict[str, Any]:
    """
    Get detailed information about a specific recipe
    """
    if not SPOONACULAR_API_KEY:
        raise Exception("Missing Spoonacular API key")
    
    try:
        response = requests.get(
            f"{BASE_URL}/recipes/{recipe_id}/information",
            params={
                "apiKey": SPOONACULAR_API_KEY,
                "includeNutrition": True
            }
        )
        response.raise_for_status()
        
        recipe = response.json()
        
        # Process nutrition data
        if "nutrition" in recipe:
            nutrients = recipe["nutrition"]["nutrients"]
            for nutrient in nutrients:
                if nutrient["name"] == "Calories":
                    recipe["calories"] = nutrient["amount"]
                elif nutrient["name"] == "Protein":
                    recipe["protein"] = nutrient["amount"]
                elif nutrient["name"] == "Carbohydrates":
                    recipe["carbs"] = nutrient["amount"]
                elif nutrient["name"] == "Fat":
                    recipe["fat"] = nutrient["amount"]
        
        return recipe
    except requests.RequestException as e:
        raise Exception(f"Error getting recipe details: {str(e)}")

async def search_food_ingredients(query: str, offset: int = 0, number: int = 20) -> Dict[str, Any]:
    """
    Search for food ingredients
    """
    if not SPOONACULAR_API_KEY:
        raise Exception("Missing Spoonacular API key")
    
    try:
        response = requests.get(
            f"{BASE_URL}/food/ingredients/search",
            params={
                "apiKey": SPOONACULAR_API_KEY,
                "query": query,
                "offset": offset,
                "number": number,
                "sort": "calories",
                "sortDirection": "desc"
            }
        )
        response.raise_for_status()
        
        return response.json()
    except requests.RequestException as e:
        raise Exception(f"Error searching food ingredients: {str(e)}")

async def get_food_ingredient_info(ingredient_id: int, amount: float = 100, unit: str = "g") -> Dict[str, Any]:
    """
    Get detailed information about a specific food ingredient
    """
    if not SPOONACULAR_API_KEY:
        raise Exception("Missing Spoonacular API key")
    
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
        
        return response.json()
    except requests.RequestException as e:
        raise Exception(f"Error getting ingredient details: {str(e)}")

async def save_recipe_to_database(recipe_data: Dict[str, Any]) -> str:
    """
    Save recipe metadata to the database after fetching from Spoonacular
    Only stores necessary data to comply with Spoonacular's terms of service
    Returns the UUID of the created recipe
    """
    from supabase import create_client
    
    # Initialize Supabase client
    supabase_url = os.getenv("SUPABASE_URL", "")
    supabase_key = os.getenv("SUPABASE_KEY", "")
    supabase = create_client(supabase_url, supabase_key)
    
    # Calculate nutritional ratios
    calories = float(recipe_data.get("calories", 0))
    protein = float(recipe_data.get("protein", 0))
    carbs = float(recipe_data.get("carbs", 0))
    fat = float(recipe_data.get("fat", 0))
    
    # Calculate macro ratios
    protein_calories = protein * 4  # 4 calories per gram of protein
    carb_calories = carbs * 4  # 4 calories per gram of carbs
    fat_calories = fat * 9  # 9 calories per gram of fat
    
    protein_ratio = round(protein_calories / calories, 3) if calories > 0 else 0
    carb_ratio = round(carb_calories / calories, 3) if calories > 0 else 0
    fat_ratio = round(fat_calories / calories, 3) if calories > 0 else 0
    protein_per_calorie = round(protein / calories, 4) if calories > 0 else 0
    
    # Extract only minimal recipe details
    recipe = {
        "name": recipe_data.get("title", ""),  # Basic identifier
        "calories": int(recipe_data.get("calories", 0)),
        "protein": int(recipe_data.get("protein", 0)),
        "carbs": int(recipe_data.get("carbs", 0)),
        "fats": int(recipe_data.get("fat", 0)),
        "protein_ratio": protein_ratio,
        "carb_ratio": carb_ratio,
        "fat_ratio": fat_ratio,
        "protein_per_calorie": protein_per_calorie,
        "servings": recipe_data.get("servings", 1),
        "external_id": str(recipe_data.get("id", "")),
        "last_fetched_at": datetime.now().isoformat(),
        "data_source": "spoonacular"
    }
    
    # Save recipe to database
    response = supabase.table("recipes").insert(recipe).execute()
    
    if not response.data:
        raise Exception("Failed to save recipe to database")
        
    return response.data[0]["recipe_id"] 