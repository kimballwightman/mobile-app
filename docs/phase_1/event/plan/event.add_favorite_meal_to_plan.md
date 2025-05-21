---
type: event
id: event.add_favorite_meal_to_plan
feature_id: feature.meal_plan_calendar
title: User Adds Favorite Meal to Plan
description: |
  This event is triggered when the user selects a favorite meal to add to a specific slot in the meal plan calendar. The app sends a request to the backend to add the meal to the user's plan and updates the UI to reflect the new meal in the calendar.

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
  endpoint: api.user-meal-plan.POST
  method: POST
  url: /api/user-meal-plan

db_interactions:
  relational:
    - table.user_meal_plan:
        actions:
          - "Insert new meal plan entry for the selected favorite meal."
    - table.shopping_cart_items:
        actions:
          - "Update cart items based on ingredients of added meal."
    - table.pantry_items:
        actions:
          - "Mark relevant pantry items as planned to use."
  graph:
    - node.user:
        actions:
          - "Create :PLANNED edge to meal node with date metadata."

state_changes:
  components:
    - component.meal_calendar_grid:
        state: state.updated
        description: "Calendar grid updates to show the new meal."
    - component.macro_bar:
        state: state.updated
        description: "Day's macro and calorie bar updates."
  screens:
    - screen.meal_planning_tab:
        state: state.rendered
        description: "Meal plan calendar reflects the new meal."

navigation: []

next_possible_events:
  - event.remove_food_from_plan
  - event.drag_and_drop_meal
  - event.add_to_meal_review_queue

responses:
  - Adds favorite meal to the selected calendar slot.
  - Updates macro and calorie bar for the day.
  - Optionally animates or highlights the new meal in the calendar.
---
