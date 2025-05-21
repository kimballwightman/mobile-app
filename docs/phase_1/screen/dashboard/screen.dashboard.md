---
type: screen
id: screen.dashboard
title: Dashboard
description: |
  The main dashboard screen, displaying daily/weekly performance metrics, nutrient bars, meal/workout tiles, summary tiles, and trend graphs. Central hub for logging, tracking, and accessing settings/integrations.
route: /dashboard

states:
  - state.dashboard_default
  - state.dashboard_loading
  - state.dashboard_error

related:
  feature:
    - feature.dashboard
  event:
    - event.change_dashboard_date
    - event.toggle_metric_type
    - event.tap_summary_tile
    - event.log_meal
    - event.log_workout
    - event.open_side_drawer
  component:
    - component.nutrient_bar
    - component.goal_tile
    - component.dashboard_top_bar
    - component.trend_graph
    - component.meal_workout_tile
    - component.side_drawer

design_system_reference: [design_system]
---
