---
type: event
id: event.change_dashboard_date
feature_id: feature.dashboard
title: Change Dashboard Date
description: |
  Triggered when the user selects a new date from the calendar modal or uses the navigation arrows in the dashboard top bar. Updates the dashboard to show data for the selected date.

preconditions:
  screens:
    - screen.dashboard: state.dashboard_default
  components:
    - component.dashboard_top_bar: state.default
    - component.calendar_modal: state.open

trigger:
  trigger_type: user_action
  component: component.dashboard_top_bar
  screen: screen.dashboard

api_request:
  endpoint: api.dashboard_data.GET
  method: GET
  url: /api/dashboard/data?date={selectedDate}

db_interactions:
  relational:
    - table.user_metrics:
        actions:
          - "Fetch metrics for selected date."
    - table.meal_log:
        actions:
          - "Fetch meal logs for selected date."
    - table.workout_log:
        actions:
          - "Fetch workout logs for selected date."
  graph:
    - node.user_performance:
        actions:
          - "Read performance data for selected date."

state_changes:
  components:
    - component.nutrient_bar:
        state: state.default
        description: "Nutrient bars update to show selected date's data."
    - component.goal_tile:
        state: state.default
        description: "Goal tiles update to show selected date's data."
    - component.trend_graph:
        state: state.default
        description: "Trend graph updates to selected date."
  screens:
    - screen.dashboard:
        state: state.dashboard_default
        description: "Dashboard updates to selected date."

navigation:
  - screen.dashboard

next_possible_events:
  - event.open_calendar_modal
  - event.log_meal
  - event.log_workout

responses:
  - "Dashboard data updated for selected date."
  - "User sees new metrics and logs."
---
