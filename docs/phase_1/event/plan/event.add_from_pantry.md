---
type: event
id: event.add_from_pantry
feature_id: feature.meal_plan_calendar
title: User Adds Pantry Item to Plan
description: |
  This event is triggered when the user selects a pantry item to add as a standalone food to a specific slot in the meal plan calendar. The app sends a request to the backend to add the pantry item to the user's plan and updates the UI accordingly.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
  components:
    - component.floating_action_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.floating_action_button
  screen: screen.meal_planning_tab

api_request:
  endpoint: api.user-meal-plan_manual-entry.POST
  method: POST
  url: /api/user-meal-plan/manual-entry

db_interactions:
  relational:
    - table.user_meal_plan:
        actions:
          - "Insert manual meal entry for the selected pantry item."
    - table.pantry_items:
        actions:
          - "Deduct quantity from pantry if applicable."
  graph:
    - node.user:
        actions:
          - "Create :PLANNED edge to food item node with date metadata."

state_changes:
  components:
    - component.meal_calendar_grid:
        state: state.updated
        description: "Calendar grid updates to show the new pantry item."
    - component.macro_bar:
        state: state.updated
        description: "Day's macro and calorie bar updates."
  screens:
    - screen.meal_planning_tab:
        state: state.rendered
        description: "Meal plan calendar reflects the new pantry item."

navigation: []

next_possible_events:
  - event.remove_food_from_plan
  - event.drag_and_drop_meal

responses:
  - Adds pantry item to the selected calendar slot.
  - Optionally deducts quantity from pantry and shows warning if low.
  - Updates macro and calorie bar for the day.
---
