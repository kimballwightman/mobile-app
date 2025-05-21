---
type: event
id: event.swap_save
feature_id: feature.expanded_meal_view
title: User Saves Food Swaps in Expanded Meal View
description: |
  This event is triggered when the user taps the "Save" button after selecting one or more food swaps in the expanded meal view. The app sends a PATCH request to the backend to persist the swaps for the meal, updates the UI to reflect the saved state, refreshes the summary info (macros, calories, price), and updates the shopping cart items accordingly.

preconditions:
  screens:
    - screen.explore_grid: state.swap_mode
    - screen.meal_planning_tab: state.swap_mode
  components:
    - component.save_button: state.visible
    - component.swap_grid: state.selected

trigger:
  trigger_type: user_action
  component: component.save_button
  screen: screen.explore_grid

api_request:
  endpoint: api.user-meal-plan_id.PATCH
  method: PATCH
  url: /api/meal-plans/{meal_plan_id}/foods

  # Payload: { "swaps": [ { "original_food_id": "123", "new_food_id": "456" }, ... ] }

db_interactions:
  relational:
    - table.user_meal_plan:
        actions:
          - "Update meal plan with swapped foods for the given meal."
    - table.order_items:
        actions:
          - "Remove original food items from the order/cart if no longer needed."
          - "Add new swapped food items to the order/cart if not already present."
    - table.shopping_cart:
        actions:
          - "Update shopping cart total price and item count."
    - table.shopping_cart_items:
        actions:
          - "Update shopping cart items to reflect food swaps."
  graph:
    - node.user:
        actions:
          - "Update affinity score for swapped-in food."
    - node.food:
        actions:
          - "Update SIMILAR_TO edges if applicable."
    - node.user:
        actions:
          - "Log swap in user activity history."

state_changes:
  components:
    - component.swap_grid:
        state: state.saved
        description: "Swap grid reflects saved swaps."
    - component.save_button:
        state: state.hidden
        description: "Save button disappears after saving."
    - component.clear_button:
        state: state.hidden
        description: "Clear button disappears after saving."
    - component.food_list_item_tile:
        state: state.updated
        description: "Ingredient list updates to show swapped foods."
    - component.macro_bar:
        state: state.updated
        description: "Summary info (macros, calories, price) reflects saved state."
    - component.shopping_cart_indicator:
        state: state.updated
        description: "Shopping cart icon/badge updates to reflect changes in cart items."
  screens:
    - screen.explore_grid:
        state: state.expanded_modal
        description: "Expanded meal modal remains open with updated info."
    - screen.meal_planning_tab:
        state: state.expanded_modal
        description: "Expanded meal modal remains open with updated info."

navigation: []

next_possible_events:
  - event.expand_meal_card
  - event.select_food_item
  - event.view_shopping_cart

responses:
  - Persists food swaps for the meal in the backend.
  - Updates UI to show new ingredients and summary info.
  - Updates shopping cart with new ingredients, removing replaced items.
  - Hides Save and Clear buttons.
  - Shows a toast: "Changes saved to meal and shopping cart".
  - Updates shopping cart indicator with new item count.
--- 