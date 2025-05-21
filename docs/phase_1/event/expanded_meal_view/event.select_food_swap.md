---
type: event
id: event.select_food_swap
feature_id: feature.expanded_meal_view
title: User Selects Food Swap in Expanded Meal View
description: |
  This event is triggered when the user taps a swap tile for a food item in swap mode in the expanded meal view. The app updates the local state to preview the meal with the selected swap, recalculating nutrition, price, and macros, but does not persist the change until saved.

preconditions:
  screens:
    - screen.explore_grid: state.swap_mode
    - screen.meal_planning_tab: state.swap_mode
  components:
    - component.swap_grid: state.visible

trigger:
  trigger_type: user_action
  component: component.swap_grid
  screen: screen.explore_grid

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.swap_grid:
        state: state.selected
        description: "Selected swap is promoted to the main ingredient slot."
    - component.food_list_item_tile:
        state: state.swapped
        description: "Ingredient list shows swapped food with badge/styling."
    - component.macro_bar:
        state: state.updated
        description: "Updates before/after summary for meal macros, calories, and price."
    - component.save_button:
        state: state.visible
        description: "Save button appears to persist the swap."
    - component.clear_button:
        state: state.visible
        description: "Clear button appears to undo the swap."
  screens:
    - screen.explore_grid:
        state: state.swap_mode
        description: "Explore screen displays updated swap preview."
    - screen.meal_planning_tab:
        state: state.swap_mode
        description: "Plan tab displays updated swap preview."

navigation: []

next_possible_events:
  - event.select_food_swap
  - event.select_swap_level
  - event.expand_meal_card

responses:
  - Updates local state to preview the meal with the selected swap.
  - Recalculates and displays before/after summary for meal macros, calories, and price.
  - Shows Save and Clear buttons for user action.
---
