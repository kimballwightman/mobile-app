---
type: event
id: event.expand_meal_card
feature_id: feature.expanded_meal_view
title: User Expands Meal Card for Details
description: |
  This event is triggered when the user taps on a meal card in the Explore grid or Plan tab. The app fetches detailed recipe information from the backend and displays an expanded meal view in a modal or full-screen overlay, showing ingredients, recipe instructions, nutrition, and shopping status.

preconditions:
  screens:
    - screen.explore_grid: state.grid_loaded
    - screen.meal_planning_tab: state.grid_loaded
  components:
    - component.meal_card: state.idle

trigger:
  trigger_type: user_action
  component: component.meal_card
  screen: screen.explore_grid

api_request:
  endpoint: api.recipes_id.GET
  method: GET
  url: /api/recipes/:id

db_interactions:
  relational:
    - table.recipes:
        actions:
          - "Query for recipe details by ID."
    - table.recipe_foods:
        actions:
          - "Join to get foods/ingredients for the recipe."
    - table.foods:
        actions:
          - "Get food item details and nutrition."
    - table.user_meal_plan:
        actions:
          - "Optionally personalize view based on meal plan context."
    - table.pantry_items:
        actions:
          - "Determine ingredient shopping status."
  graph:
    - node.recipe:
        actions:
          - "Return recipe node and related ingredient/food nodes."

state_changes:
  components:
    - component.meal_card:
        state: state.expanded
        description: "Displays expanded meal view with details."
    - component.toggle_bar:
        state: state.visible
        description: "Toggle between Ingredients and Recipe tabs."
    - component.food_list_item_tile:
        state: state.colored
        description: "Ingredients list shows color-coded shopping status."
  screens:
    - screen.explore_grid:
        state: state.expanded_modal
        description: "Explore screen displays expanded meal modal."
    - screen.meal_planning_tab:
        state: state.expanded_modal
        description: "Plan tab displays expanded meal modal."

navigation: []

next_possible_events:
  - event.select_food_item
  - event.select_food_swap
  - event.add_to_favorites
  - event.toggle_recipe_detail

responses:
  - Fetches and displays detailed recipe information in an expanded view.
  - Shows ingredients, recipe instructions, nutrition, and shopping status.
  - Allows toggling between Ingredients and Recipe tabs.
  - Modal can be dismissed to return to previous screen.
---
