---
type: event
id: event.drag_and_drop_meal
feature_id: feature.meal_plan_calendar
title: User Drags and Drops Meal in Plan Calendar
description: |
  This event is triggered when the user drags a meal from one slot in the meal plan calendar and drops it into another slot (e.g., from Tuesday Lunch to Wednesday Dinner). The app updates the meal's date and slot in the backend and updates the UI accordingly.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
  components:
    - component.meal_plan_slot: state.filled

trigger:
  trigger_type: user_action
  component: component.meal_plan_slot
  screen: screen.meal_planning_tab

api_request:
  endpoint: api.user-meal-plan_id.PATCH
  method: PATCH
  url: /api/user-meal-plan/:id

db_interactions:
  relational:
    - table.user_meal_plan:
        actions:
          - "Update date and meal_type fields for the dragged meal."
    - table.shopping_cart_items:
        actions:
          - "Recalculate cart items if needed."
    - table.pantry_items:
        actions:
          - "Reschedule planned usage if needed."
  graph:
    - node.user:
        actions:
          - "Update :PLANNED edge to meal node with new date metadata."

state_changes:
  components:
    - component.meal_plan_slot:
        state: state.updated
        description: "Meal visually animates to the new slot."
    - component.macro_bar:
        state: state.updated
        description: "Macro and calorie bars update for affected days."
  screens:
    - screen.meal_planning_tab:
        state: state.rendered
        description: "Meal plan calendar reflects the new meal arrangement."

navigation: []

next_possible_events:
  - event.remove_food_from_plan
  - event.drag_and_drop_meal

responses:
  - Updates meal's date and slot in the backend.
  - Animates meal card to new slot and updates macro bars.
---
