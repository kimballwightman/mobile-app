---
type: event
id: event.drag_meal_workout_tile
feature_id: feature.dashboard
title: Drag Meal/Workout Tile
description: |
  Triggered when the user drags a meal or workout tile to reorder or move it to a different time slot in the dashboard or plan calendar.

preconditions:
  screens:
    - screen.dashboard: state.dashboard_default
  components:
    - component.meal_workout_tile: state.default

trigger:
  trigger_type: user_action
  component: component.meal_workout_tile
  screen: screen.dashboard

api_request:
  endpoint: api.meal_plan_reorder.PUT
  method: PUT
  url: /api/meal-plan/reorder

db_interactions:
  relational:
    - table.meal_plan:
        actions:
          - "Update meal/workout order in plan."
  graph:
    - node.meal_event:
        actions:
          - "Update meal event order."
    - node.workout_event:
        actions:
          - "Update workout event order."

state_changes:
  components:
    - component.meal_workout_tile:
        state: state.default
        description: "Tile is repositioned in the UI."
  screens:
    - screen.dashboard:
        state: state.dashboard_default
        description: "Dashboard reflects new order."

navigation:
  - screen.dashboard

next_possible_events:
  - event.log_meal
  - event.log_workout

responses:
  - "Tile order updated."
  - "Dashboard reflects new meal/workout order."
---
