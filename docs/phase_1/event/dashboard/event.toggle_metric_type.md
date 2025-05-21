---
type: event
id: event.toggle_metric_type
feature_id: feature.dashboard
title: Toggle Metric Type
description: |
  Triggered when the user toggles between different metric types (e.g., calories, macros) in the dashboard trend graph. Updates the graph to display the selected metric.

preconditions:
  screens:
    - screen.dashboard: state.dashboard_default
  components:
    - component.metric_toggle: state.default

trigger:
  trigger_type: user_action
  component: component.metric_toggle
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
        description: "Trend graph updates to show toggled metric."
  screens:
    - screen.dashboard:
        state: state.dashboard_default
        description: "Dashboard remains open."

navigation:
  - screen.dashboard

next_possible_events:
  - event.tap_summary_tile

responses:
  - "Trend graph updated to toggled metric."
---
