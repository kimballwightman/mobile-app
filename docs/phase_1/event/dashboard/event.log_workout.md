---
type: event
id: event.log_workout
feature_id: feature.dashboard
title: Log Workout
description: |
  Triggered when the user logs a workout from the dashboard (e.g., by tapping a workout tile or confirming a wearable sync). Updates the workout log and dashboard metrics.

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
  endpoint: api.log_workout.POST
  method: POST
  url: /api/workout/log

db_interactions:
  relational:
    - table.workout_log:
        actions:
          - "Insert new workout log entry."
  graph:
    - node.workout_event:
        actions:
          - "Create workout event node."

state_changes:
  components:
    - component.meal_workout_tile:
        state: state.logged
        description: "Workout tile updates to logged state."
  screens:
    - screen.dashboard:
        state: state.dashboard_default
        description: "Dashboard metrics update."

navigation:
  - screen.dashboard

next_possible_events:
  - event.log_meal
  - event.change_dashboard_date

responses:
  - "Workout logged and dashboard updated."
  - "User sees updated workout status."
---
