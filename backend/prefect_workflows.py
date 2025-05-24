import asyncio
import logging
from prefect import flow, task
from typing import List, Dict, Any, Optional
import os
from dotenv import load_dotenv
from supabase import create_client
from datetime import datetime, timedelta

from services.spoonacular_service import (
    fetch_recipe_data, 
    fetch_ingredient_data, 
    fetch_product_data, 
    fetch_menu_item_data,
    save_recipe_to_database, 
    save_ingredient_to_database, 
    save_product_to_database, 
    save_menu_item_to_database
)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("prefect_workflows")

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL", "")
supabase_key = os.getenv("SUPABASE_KEY", "")
supabase = create_client(supabase_url, supabase_key)

@task
async def get_pending_items_from_queue(limit: int = 10) -> List[Dict[str, Any]]:
    """
    Get pending items from the food fetch queue
    """
    logger.info(f"Getting up to {limit} pending items from queue")
    
    try:
        response = supabase.table("food_fetch_queue") \
            .select("*") \
            .eq("status", "pending") \
            .order("priority", desc=True) \
            .order("created_at", asc=True) \
            .limit(limit) \
            .execute()
        
        items = response.data
        
        logger.info(f"Found {len(items)} pending items in queue")
        return items
    except Exception as e:
        logger.error(f"Error getting pending items from queue: {str(e)}")
        return []

@task
async def update_queue_item_status(queue_id: str, status: str) -> None:
    """
    Update the status of a queue item
    """
    logger.info(f"Updating queue item {queue_id} status to {status}")
    
    try:
        supabase.table("food_fetch_queue") \
            .update({"status": status, "processed_at": datetime.now().isoformat()}) \
            .eq("queue_id", queue_id) \
            .execute()
    except Exception as e:
        logger.error(f"Error updating queue item status: {str(e)}")

@task
async def process_recipe(recipe_id: str) -> Optional[str]:
    """
    Process a recipe by fetching data and saving to database
    """
    logger.info(f"Processing recipe: {recipe_id}")
    
    try:
        recipe_data = await fetch_recipe_data(int(recipe_id))
        db_id = await save_recipe_to_database(recipe_data)
        return db_id
    except Exception as e:
        logger.error(f"Error processing recipe {recipe_id}: {str(e)}")
        return None

@task
async def process_ingredient(ingredient_id: str) -> Optional[str]:
    """
    Process an ingredient by fetching data and saving to database
    """
    logger.info(f"Processing ingredient: {ingredient_id}")
    
    try:
        ingredient_data = await fetch_ingredient_data(int(ingredient_id))
        db_id = await save_ingredient_to_database(ingredient_data)
        return db_id
    except Exception as e:
        logger.error(f"Error processing ingredient {ingredient_id}: {str(e)}")
        return None

@task
async def process_product(product_id: str) -> Optional[str]:
    """
    Process a product by fetching data and saving to database
    """
    logger.info(f"Processing product: {product_id}")
    
    try:
        product_data = await fetch_product_data(int(product_id))
        db_id = await save_product_to_database(product_data)
        return db_id
    except Exception as e:
        logger.error(f"Error processing product {product_id}: {str(e)}")
        return None

@task
async def process_menu_item(menu_item_id: str) -> Optional[str]:
    """
    Process a menu item by fetching data and saving to database
    """
    logger.info(f"Processing menu item: {menu_item_id}")
    
    try:
        menu_item_data = await fetch_menu_item_data(int(menu_item_id))
        db_id = await save_menu_item_to_database(menu_item_data)
        return db_id
    except Exception as e:
        logger.error(f"Error processing menu item {menu_item_id}: {str(e)}")
        return None

@task
async def add_example_ids_to_queue() -> None:
    """
    Add example IDs to the queue for testing
    """
    logger.info("Adding example IDs to queue")
    
    try:
        # Check if items already exist
        recipe_check = supabase.table("food_fetch_queue").select("queue_id").eq("external_id", "716429").eq("entity_type", "recipe").execute()
        ingredient_check = supabase.table("food_fetch_queue").select("queue_id").eq("external_id", "11297").eq("entity_type", "ingredient").execute()
        product_check = supabase.table("food_fetch_queue").select("queue_id").eq("external_id", "12345").eq("entity_type", "product").execute()
        menu_item_check = supabase.table("food_fetch_queue").select("queue_id").eq("external_id", "779721").eq("entity_type", "menu_item").execute()
        
        # Insert if not already in queue
        items_to_insert = []
        
        if not recipe_check.data:
            items_to_insert.append({
                "external_id": "716429",
                "entity_type": "recipe",
                "priority": 1,
                "status": "pending"
            })
        
        if not ingredient_check.data:
            items_to_insert.append({
                "external_id": "11297",
                "entity_type": "ingredient",
                "priority": 1,
                "status": "pending"
            })
        
        if not product_check.data:
            items_to_insert.append({
                "external_id": "12345",
                "entity_type": "product",
                "priority": 1,
                "status": "pending"
            })
        
        if not menu_item_check.data:
            items_to_insert.append({
                "external_id": "779721",
                "entity_type": "menu_item",
                "priority": 1,
                "status": "pending"
            })
        
        if items_to_insert:
            supabase.table("food_fetch_queue").insert(items_to_insert).execute()
            logger.info(f"Added {len(items_to_insert)} example IDs to queue")
        else:
            logger.info("All example IDs already in queue")
            
    except Exception as e:
        logger.error(f"Error adding example IDs to queue: {str(e)}")

@flow(name="Process Food Data Queue")
async def process_food_data_queue(batch_size: int = 10):
    """
    Process items in the food data queue
    """
    logger.info("Starting food data queue processing")
    
    # Get pending items from queue
    pending_items = await get_pending_items_from_queue(batch_size)
    
    if not pending_items:
        logger.info("No pending items in queue")
        return
    
    for item in pending_items:
        queue_id = item["queue_id"]
        external_id = item["external_id"]
        entity_type = item["entity_type"]
        
        # Update status to processing
        await update_queue_item_status(queue_id, "processing")
        
        # Process based on entity type
        result = None
        try:
            if entity_type == "recipe":
                result = await process_recipe(external_id)
            elif entity_type == "ingredient":
                result = await process_ingredient(external_id)
            elif entity_type == "product":
                result = await process_product(external_id)
            elif entity_type == "menu_item":
                result = await process_menu_item(external_id)
            else:
                logger.warning(f"Unknown entity type: {entity_type}")
                await update_queue_item_status(queue_id, "error")
                continue
            
            # Update status based on result
            if result:
                await update_queue_item_status(queue_id, "completed")
            else:
                await update_queue_item_status(queue_id, "error")
        except Exception as e:
            logger.error(f"Error processing {entity_type} {external_id}: {str(e)}")
            await update_queue_item_status(queue_id, "error")

@flow(name="Load Example Data")
async def load_example_data():
    """
    Load example data into the database for testing
    """
    logger.info("Starting example data loading")
    
    # Add example IDs to queue
    await add_example_ids_to_queue()
    
    # Process queue
    await process_food_data_queue()
    
    logger.info("Example data loading completed")

# Run this directly for testing
if __name__ == "__main__":
    asyncio.run(load_example_data()) 