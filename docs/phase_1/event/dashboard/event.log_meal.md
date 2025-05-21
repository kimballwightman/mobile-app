---
type: event
id: event.log_meal
feature_id: feature.dashboard
title: Log Meal
description: |
  Triggered when the user logs a meal from the dashboard by tapping a meal tile and selecting the "Log" option. Opens a confirmation modal allowing users to adjust actual portions consumed, which updates the meal log, dashboard metrics, and nutrient bar segments from hollow to filled.

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
  endpoint: api.log_meal.POST
  method: POST
  url: /api/meal/log

db_interactions:
  relational:
    - table.meal_log:
        actions:
          - "Insert new meal log entry with actual consumed portions."
    - table.user_metrics:
        actions:
          - "Update daily metrics with actual consumed values."
  graph:
    - node.meal_event:
        actions:
          - "Create meal event node with actual consumed data."
    - node.user_performance:
        actions:
          - "Update user performance metrics."

state_changes:
  components:
    - component.meal_workout_tile:
        state: state.logged
        description: "Meal tile updates to logged state."
    - component.nutrient_bar:
        state: state.default
        description: "Nutrient bar segments for this meal change from hollow to filled with actual consumed values."
    - component.goal_tile:
        state: state.default
        description: "Goal tiles update with new calculated metrics."
    - component.weekly_summary_tile:
        state: state.default
        description: "Weekly summary tiles recalculate if current date is within their 7-day window."
  screens:
    - screen.dashboard:
        state: state.dashboard_default
        description: "Dashboard metrics update."

navigation:
  - screen.dashboard

next_possible_events:
  - event.log_workout
  - event.change_dashboard_date
  - event.log_meal_review
  - event.swap_meal

responses:
  - "Meal logged and dashboard updated with actual consumed quantities."
  - "User sees nutrient bar segments fill in, reflecting logged meal."
  - "Goal tiles update to show progress toward daily targets."
---
