---
type: event
id: event.remove_food_from_plan
feature_id: feature.meal_plan_calendar
title: User Removes Food or Meal from Plan
description: |
  This event is triggered when the user removes a food item or meal from a slot in the meal plan calendar. The app updates the calendar, macro bar, and may update pantry or cart data if relevant.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
  components:
    - component.meal_calendar_grid: state.loaded
    - component.meal_plan_slot: state.filled

trigger:
  trigger_type: user_action
  component: component.meal_plan_slot
  screen: screen.meal_planning_tab

api_request:
  method: DELETE
  endpoint: /api/user-meal-plan/:id
  body: {}
  description: Deletes the specified meal or food entry from the user's meal plan.

db_interactions:
  relational:
    - action: delete
      table: user_meal_plan
      description: Remove the meal/food entry from the user's meal plan.
    - action: update
      table: pantry_items
      description: Optionally return ingredients to pantry if user chooses to undo.
    - action: update
      table: cart_items
      description: Optionally update cart if meal was linked to a cart window.
  graph: []

state_changes:
  components:
    - component.meal_calendar_grid:
        state: state.updated
        description: "Meal/food is removed from the calendar grid."
    - component.macro_bar:
        state: state.updated
        description: "Macro and calorie bars update to reflect removal."
    - component.cart_icon:
        state: state.updated
        description: "Cart icon updates if cart contents change."
  screens:
    - screen.meal_planning_tab:
        state: state.rendered
        description: "Meal plan calendar reflects the removal."

navigation: []

next_possible_events:
  - event.add_favorite_meal_to_plan
  - event.add_from_pantry
  - event.drag_and_drop_meal

responses:
  - Removes meal/food from calendar and updates UI.
  - Optionally shows undo snackbar or toast.
---
