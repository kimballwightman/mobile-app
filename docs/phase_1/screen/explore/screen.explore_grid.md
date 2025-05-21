---
type: screen
id: screen.explore_grid
title: Explore Grid
description: |
  The main meal discovery screen displaying a grid of meal cards, search bar, and infinite scroll. Users can search, filter, and expand meals for details.
route: /explore

states:
  - state.grid_loaded
  - state.search_mode
  - state.expanded_modal
  - state.swap_mode

related:
  feature:
    - feature.meal_discovery
    - feature.expanded_meal_view
  event:
    - event.load_meal_grid
    - event.search_bar
    - event.filter_meals
    - event.grid_scroll
    - event.expand_meal_card
    - event.toggle_recipe_detail
    - event.select_food_item
    - event.select_food_swap
    - event.select_swap_level
    - event.swap_save
    - event.add_to_favorites
  component:
    - component.infinite_scroll_grid
    - component.search_bar
    - component.meal_card
    - component.toggle_bar
    - component.food_list_item_tile
    - component.recipe_content
    - component.swap_grid
    - component.filter_pill
    - component.macro_bar
    - component.save_button
    - component.clear_button

design_system_reference: [design_system]
---
