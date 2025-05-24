#!/usr/bin/env python3
"""
Script to check if test data exists in the database.
This will display:
- Recipe ID: 716429 (Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs)
- Ingredient ID: 11297 (Parsley)
- Product ID: 12345 (Test product)
- Menu Item ID: 779721 (Test menu item)

Usage: python check_data.py
"""

import os
from supabase import create_client
from dotenv import load_dotenv

# Load environment variables from root directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL", "")
supabase_key = os.getenv("SUPABASE_KEY", "")
supabase = create_client(supabase_url, supabase_key)

def main():
    """Check if test data exists in the database"""
    print("Checking for test data in the database...\n")
    
    # Check recipes
    print("RECIPES:")
    recipes = supabase.table("recipes").select("*").eq("external_id", "716429").execute()
    if recipes.data:
        recipe = recipes.data[0]
        print(f"✓ Recipe found: {recipe['name']} (ID: {recipe['recipe_id']})")
        print(f"  - Calories: {recipe['calories']}")
        print(f"  - Protein: {recipe['protein']}g")
        print(f"  - Carbs: {recipe['carbs']}g")
        print(f"  - Fats: {recipe['fats']}g")
        print(f"  - Protein ratio: {recipe['protein_ratio']}")
        print(f"  - External ID: {recipe['external_id']}")
    else:
        print("✗ Test recipe (ID: 716429) not found")
    
    # Check ingredients
    print("\nINGREDIENTS:")
    ingredients = supabase.table("ingredients").select("*").eq("external_id", "11297").execute()
    if ingredients.data:
        ingredient = ingredients.data[0]
        print(f"✓ Ingredient found: {ingredient['name']} (ID: {ingredient['food_id']})")
        print(f"  - Calories: {ingredient['calories']}")
        print(f"  - Protein: {ingredient['protein']}g")
        print(f"  - Carbs: {ingredient['carbs']}g")
        print(f"  - Fats: {ingredient['fats']}g")
        print(f"  - External ID: {ingredient['external_id']}")
    else:
        print("✗ Test ingredient (ID: 11297) not found")
    
    # Check products
    print("\nPRODUCTS:")
    products = supabase.table("products").select("*").eq("external_id", "12345").execute()
    if products.data:
        product = products.data[0]
        print(f"✓ Product found: {product['name']} (ID: {product['product_id']})")
        print(f"  - Calories: {product['calories']}")
        print(f"  - Protein: {product['protein']}g")
        print(f"  - Carbs: {product['carbs']}g")
        print(f"  - Fats: {product['fats']}g")
        print(f"  - External ID: {product['external_id']}")
    else:
        print("✗ Test product (ID: 12345) not found")
    
    # Check menu items
    print("\nMENU ITEMS:")
    menu_items = supabase.table("menu_items").select("*").eq("external_id", "779721").execute()
    if menu_items.data:
        menu_item = menu_items.data[0]
        print(f"✓ Menu item found: {menu_item['name']} (ID: {menu_item['menu_item_id']})")
        print(f"  - Calories: {menu_item['calories']}")
        print(f"  - Protein: {menu_item['protein']}g")
        print(f"  - Carbs: {menu_item['carbs']}g")
        print(f"  - Fats: {menu_item['fats']}g")
        print(f"  - External ID: {menu_item['external_id']}")
    else:
        print("✗ Test menu item (ID: 779721) not found")
    
    # Check recipe-ingredient relationships
    print("\nRECIPE-INGREDIENT RELATIONSHIPS:")
    if recipes.data and recipes.data[0]['recipe_id']:
        recipe_id = recipes.data[0]['recipe_id']
        relationships = supabase.table("recipe_ingredients").select("*").eq("recipe_id", recipe_id).execute()
        if relationships.data:
            print(f"✓ Found {len(relationships.data)} ingredients for recipe")
            for i, rel in enumerate(relationships.data[:5]):  # Show up to 5 ingredients
                print(f"  {i+1}. Ingredient ID: {rel['ingredient_id']}, Quantity: {rel['quantity']} {rel['unit']}")
            if len(relationships.data) > 5:
                print(f"  ... and {len(relationships.data) - 5} more")
        else:
            print("✗ No recipe-ingredient relationships found")
    else:
        print("✗ Cannot check relationships (recipe not found)")
    
    print("\nCheck completed!")

if __name__ == "__main__":
    main() 