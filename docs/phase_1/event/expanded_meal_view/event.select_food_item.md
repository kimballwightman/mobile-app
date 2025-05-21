---
type: event
id: event.select_food_item
feature_id: feature.expanded_meal_view
title: User Selects Food Item for Swap in Expanded Meal View
description: |
  This event is triggered when the user taps a food item in the Ingredients list of the expanded meal view modal. The app fetches recommended food swaps for the selected food from the backend and displays swap options, along with a before/after summary for the meal.

preconditions:
  screens:
    - screen.explore_grid: state.expanded_modal
    - screen.meal_planning_tab: state.expanded_modal
  components:
    - component.food_list_item_tile: state.idle

trigger:
  trigger_type: user_action
  component: component.food_list_item_tile
  screen: screen.explore_grid

api_request:
  endpoint: api.foods_id_swaps.GET
  method: GET
  url: /api/foods/:id/swaps

  # Optionally, batch: /api/foods/swaps?food_ids=91,103,187

db_interactions:
  relational:
    - table.foods:
        actions:
          - "Query for swap candidates for the selected food."
    - table.user_preferences:
        actions:
          - "Optionally personalize swaps based on user preferences."
    - table.pantry_items:
        actions:
          - "Optionally filter swaps by pantry availability."
  graph:
    - node.food:
        actions:
          - "Return food nodes with SIMILAR_TO edges for swap recommendations."

state_changes:
  components:
    - component.food_list_item_tile:
        state: state.selected
        description: "Selected food item is highlighted."
    - component.swap_grid:
        state: state.visible
        description: "Displays recommended food swaps for the selected food."
    - component.macro_bar:
        state: state.updated
        description: "Updates before/after summary for meal macros, calories, and price."
  screens:
    - screen.explore_grid:
        state: state.swap_mode
        description: "Explore screen displays swap mode for the selected food."
    - screen.meal_planning_tab:
        state: state.swap_mode
        description: "Plan tab displays swap mode for the selected food."

navigation: []

next_possible_events:
  - event.select_food_swap
  - event.select_swap_level
  - event.expand_meal_card

responses:
  - Fetches and displays recommended food swaps for the selected food.
  - Shows before/after summary for meal macros, calories, and price.
  - Highlights selected food item and enters swap mode.
---
