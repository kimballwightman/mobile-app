---
type: feature
id: feature.meal_discovery
title: Meal Discovery
description: |
  Enables users to discover, search, and filter macro-optimized meals in the Explore tab. Supports infinite scroll, advanced filtering (macros, calories, meal type, prep time, ingredients), and a grid layout focused on performance nutrition. Search bar expands into a full search window and filters are applied via a comprehensive modal with explicit Apply button.

sections:
  - name: Meal Grid & Infinite Scroll
    description: |
      Loads a grid of meal cards with infinite scroll. Each card displays image, title, calories, and macro split. Tapping a card opens the expanded meal view.
    events:
      - event.load_meal_grid
      - event.grid_scroll
      - event.tap_meal_card
    screens:
      - screen.explore_grid
    components:
      - component.infinite_scroll_grid
      - component.meal_card
      - component.macro_bar
    api_endpoint:
      - endpoint.api.recipes_feed.GET
      - endpoint.api.recipes_feed_offset.GET
    db:
      relational:
        - table.recipes
        - table.user_preferences
      graph:
        - node.recipe

  - name: Search & Advanced Filters
    description: |
      Users can search for meals by tapping the search bar, which expands into a full search window. Advanced filters are accessed via the filter button, opening a modal with comprehensive options (meal type, calories slider, macro ranges, prep/cook time, ingredients). Filters are applied via explicit Apply button, not in real-time.
    events:
      - event.search_bar
      - event.open_filters
      - event.apply_filters
      - event.clear_filters
      - event.filter_meals
    screens:
      - screen.explore_grid
    components:
      - component.search_bar
      - component.filter_button
      - component.infinite_scroll_grid
    api_endpoint:
      - endpoint.api.recipes_search_query.GET
    db:
      relational:
        - table.recipes
        - table.foods
        - table.tags
      graph:
        - node.recipe

  - name: Expanded Meal View Navigation
    description: |
      Tapping a meal card opens the expanded meal view, where users can view details, ingredients, swap foods, and favorite meals.
    events:
      - event.expand_meal_card
      - event.toggle_ingredients_recipe
      - event.add_to_favorites
    screens:
      - screen.explore_grid
    components:
      - component.meal_card
      - component.recipe_content
      - component.food_list_item_tile
      - component.toggle_bar
      - component.save_button
    api_endpoint:
      - endpoint.api.recipes_id.GET
      - endpoint.api.favorites_user-id.GET
    db:
      relational:
        - table.recipes
        - table.user_favorites
      graph:
        - node.recipe
        - node.user

design_system_reference: [design_system]
---
