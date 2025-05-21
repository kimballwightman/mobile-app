---
type: event
id: event.tap_summary_tile
feature_id: feature.dashboard
title: Tap Summary Tile
description: |
  Triggered when the user taps a weekly summary tile in the dashboard trends section. Updates the trend graph to focus on the selected metric.

preconditions:
  screens:
    - screen.dashboard: state.dashboard_default
  components:
    - component.weekly_summary_tile: state.in_goal
    - component.weekly_summary_tile: state.out_of_goal

trigger:
  trigger_type: user_action
  component: component.weekly_summary_tile
  screen: screen.dashboard

api_request:
  endpoint: null
  method: null
  url: null

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.trend_graph:
        state: state.default
        description: "Trend graph updates to show selected metric."
  screens:
    - screen.dashboard:
        state: state.dashboard_default
        description: "Dashboard remains open."

navigation:
  - screen.dashboard

next_possible_events:
  - event.toggle_metric_type

responses:
  - "Trend graph updated to selected metric."
---
