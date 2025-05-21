---
type: feature
id: feature.expanded_meal_view
title: Expanded Meal View
description: |
  Provides a detailed, interactive view of a meal, including image, nutrition, ingredients, recipe instructions, shopping status, food swapping, and favoriting. Accessible from Explore and Plan tabs, and supports contextual food swaps and macro/price preview.

sections:
  - name: Meal Detail & Nutrition
    description: |
      User expands a meal card to view detailed recipe information, ingredients, nutrition, and shopping status. Macro bar and price are shown at the top. Toggle between Ingredients and Recipe views.
    events:
      - event.expand_meal_card
      - event.toggle_ingredients_recipe
    screens:
      - screen.explore_grid
      - screen.meal_planning_tab
    components:
      - component.meal_card
      - component.toggle_bar
      - component.food_list_item_tile
      - component.recipe_content
      - component.macro_bar
      - component.save_button
    api_endpoint:
      - endpoint.api.recipes_id.GET
    db:
      relational:
        - table.recipes
        - table.recipe_foods
        - table.foods
        - table.user_meal_plan
        - table.pantry_items
      graph:
        - node.recipe

  - name: Food Swapping
    description: |
      User can swap foods/ingredients for alternatives, previewing nutrition and price changes before saving. The explicit Save button appears after selection, allowing users to confirm and persist their swaps. Once saved, swaps update the meal plan and shopping cart automatically.
    events:
      - event.select_food_item
      - event.select_food_swap
      - event.select_swap_level
      - event.swap_save
    screens:
      - screen.explore_grid
      - screen.meal_planning_tab
    components:
      - component.food_list_item_tile
      - component.swap_column
      - component.filter_pill
      - component.macro_bar
      - component.save_button
      - component.clear_button
      - component.shopping_cart_indicator
    api_endpoint:
      - endpoint.api.foods_id_swaps.GET
      - endpoint.api.user-meal-plan_id.PATCH
    db:
      relational:
        - table.foods
        - table.user_preferences
        - table.pantry_items
        - table.user_meal_plan
        - table.order_items
        - table.shopping_cart
        - table.shopping_cart_items
      graph:
        - node.food
        - node.user

  - name: Favorites
    description: |
      User can favorite a meal from the expanded view, adding it to their favorites list for quick access in planning and discovery.
    events:
      - event.add_to_favorites
    screens:
      - screen.explore_grid
      - screen.meal_planning_tab
    components:
      - component.meal_card
      - component.save_button
    api_endpoint:
      - endpoint.api.favorites_user-id.GET
    db:
      relational:
        - table.user_favorites
      graph:
        - node.user

design_system_reference: [design_system]
---
