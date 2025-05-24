#!/usr/bin/env python3
"""
Test script for Spoonacular API integration
This will fetch and print details for:
- Recipe ID: 716429
- Ingredient ID: 11297
"""

import asyncio
import os
import json
import requests
from dotenv import load_dotenv
from services.spoonacular_service import (
    fetch_recipe_data, 
    fetch_ingredient_data
)

# Load environment variables from root directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

# Spoonacular API configuration
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY", "")
BASE_URL = "https://api.spoonacular.com"

async def test_spoonacular_api():
    print("Testing Spoonacular API Integration...")
    
    # Get API key
    if not SPOONACULAR_API_KEY or SPOONACULAR_API_KEY == "your_spoonacular_api_key_here":
        print("ERROR: You need to set a valid Spoonacular API key in the .env file")
        print("Get a key from https://spoonacular.com/food-api")
        return
    
    # Test fetching recipe data
    recipe_id = 716429  # Pasta with garlic, scallions, cauliflower
    print(f"\nFetching recipe data for ID: {recipe_id}")
    try:
        recipe_data = await fetch_recipe_data(recipe_id)
        print(f"Recipe Name: {recipe_data.get('title')}")
        print(f"Calories: {recipe_data.get('calories')}")
        print(f"Protein: {recipe_data.get('protein')}g")
        print(f"Carbs: {recipe_data.get('carbs')}g")
        print(f"Fat: {recipe_data.get('fat')}g")
        print(f"Instructions: {recipe_data.get('instructions', '')[:100]}...")
        
        # Print number of ingredients
        ingredients = recipe_data.get('extendedIngredients', [])
        print(f"Number of ingredients: {len(ingredients)}")
        for i, ingredient in enumerate(ingredients[:3]):  # Show first 3 ingredients
            print(f"  {i+1}. {ingredient.get('name')} - {ingredient.get('amount')} {ingredient.get('unit')}")
        if len(ingredients) > 3:
            print(f"  ...and {len(ingredients) - 3} more")
    except Exception as e:
        print(f"Error fetching recipe: {str(e)}")
    
    # Test fetching ingredient data
    ingredient_id = 11297  # Fresh parsley
    print(f"\nFetching ingredient data for ID: {ingredient_id}")
    try:
        ingredient_data = await fetch_ingredient_data(ingredient_id)
        print(f"Ingredient Name: {ingredient_data.get('name')}")
        print(f"Calories: {ingredient_data.get('calories', 0)}")
        print(f"Protein: {ingredient_data.get('protein', 0)}g")
        print(f"Carbs: {ingredient_data.get('carbs', 0)}g")
        print(f"Fat: {ingredient_data.get('fat', 0)}g")
        
        # Print nutrition information
        if 'nutrition' in ingredient_data and 'nutrients' in ingredient_data['nutrition']:
            print("\nNutrition details:")
            nutrients = ingredient_data['nutrition']['nutrients']
            for nutrient in nutrients[:5]:  # Show first 5 nutrients
                print(f"  {nutrient.get('name')}: {nutrient.get('amount')} {nutrient.get('unit')}")
    except Exception as e:
        print(f"Error fetching ingredient: {str(e)}")
    
    print("\nTest completed successfully.")

if __name__ == "__main__":
    asyncio.run(test_spoonacular_api()) 