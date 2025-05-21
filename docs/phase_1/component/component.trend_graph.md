---
type: component
id: component.trend_graph
title: Trend Graph
component_type: custom
description: |
  An interactive 7-day rolling trends graph for displaying daily metrics (calories consumed vs. burned, macros) with toggle functionality to switch between different metric types. Supports horizontal swiping to view different metrics and tapping on specific days to update the dashboard.

properties:
  - name: data
    type: array
    description: "Data points for the 7-day period, with each day containing consumed and burned values for calories, or gram values for macros."
  - name: metric
    type: string
    description: "Current metric type being displayed (calories, protein, carbs, fat)."
  - name: displayMode
    type: string
    description: "Mode of display (raw values or percentages for macros, consumed vs. burned or difference for calories)."
  - name: selectedDay
    type: date
    description: "Currently selected day in the graph."
  - name: onMetricToggle
    type: function
    description: "Callback when the user toggles between display modes (raw/percentage or consumed-burned/difference)."
  - name: onSwipe
    type: function
    description: "Callback when user swipes horizontally to change metrics."
  - name: onDaySelect
    type: function
    description: "Callback when a specific day is tapped, updates the entire dashboard to that day."
  - name: weekByWeekTrendlineId
    type: string
    description: "ID of the connected week-by-week trendline component for coordinated updates."

states:
  - state.default
  - state.loading
  - state.empty

related:
  feature:
    - feature.dashboard
  event:
    - event.toggle_graph_metric
    - event.swipe_trend_graph
    - event.tap_graph_day
    - event.change_dashboard_date
  screen:
    - screen.dashboard
  component:
    - component.week_by_week_trendline
    - component.weekly_summary_tile

design_system_reference: [design_system]
---
