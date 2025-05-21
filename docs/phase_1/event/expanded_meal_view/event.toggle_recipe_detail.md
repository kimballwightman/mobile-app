---
type: event
id: event.toggle_recipe_detail
feature_id: feature.expanded_meal_view
title: User Toggles Between Ingredients and Recipe in Expanded Meal View
description: |
  This event is triggered when the user taps the toggle at the top of the bottom section in the expanded meal view modal, switching between the Ingredients and Recipe views. The app updates the modal to display the selected view.

preconditions:
  screens:
    - screen.explore_grid: state.expanded_modal
    - screen.meal_planning_tab: state.expanded_modal
  components:
    - component.toggle_bar: state.visible

trigger:
  trigger_type: user_action
  component: component.toggle_bar
  screen: screen.explore_grid

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.toggle_bar:
        state: state.toggled
        description: "Toggle bar reflects the selected view (Ingredients or Recipe)."
    - component.recipe_content:
        state: state.visible
        description: "Recipe instructions are displayed if Recipe view is selected."
    - component.food_list_item_tile:
        state: state.visible
        description: "Ingredients list is displayed if Ingredients view is selected."
  screens:
    - screen.explore_grid:
        state: state.expanded_modal
        description: "Expanded meal modal remains open."
    - screen.meal_planning_tab:
        state: state.expanded_modal
        description: "Expanded meal modal remains open."

navigation: []

next_possible_events:
  - event.toggle_recipe_detail
  - event.expand_meal_card

responses:
  - Updates the expanded meal modal to display the selected view (Ingredients or Recipe).
  - Keeps the modal open and updates the content accordingly.
---
