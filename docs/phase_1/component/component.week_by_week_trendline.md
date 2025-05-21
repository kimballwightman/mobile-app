---
type: component
id: component.week_by_week_trendline
title: Week by Week Trendline
component_type: custom
description: |
  A long-term trend graph displaying weekly averages for calorie differences, macro percentages, weight, workout logs, and consistency streaks over multiple weeks to months.

properties:
  - name: data
    type: array
    description: "Array of weekly data points, each containing averages for calories, macros, weight, etc."
  - name: metric
    type: string
    description: "Current metric type being displayed (calorie_diff, macro_protein, macro_carbs, macro_fat, weight, workout_frequency, streak)."
  - name: timeRange
    type: string
    description: "Time range for the graph (1m, 3m, 6m, 1y)."
  - name: showGoalReference
    type: boolean
    description: "Whether to display a reference line for the goal value."
  - name: goalValue
    type: number
    description: "Goal value for the selected metric."
  - name: onTimeRangeChange
    type: function
    description: "Callback when the time range is changed."
  - name: onMetricChange
    type: function
    description: "Callback when the displayed metric is changed."
  - name: onWeekSelect
    type: function
    description: "Callback when a specific week is selected."
  - name: trendGraphId
    type: string
    description: "ID of the connected 7-day trend graph component for coordinated updates."

states:
  - state.default
  - state.loading
  - state.empty

related:
  feature:
    - feature.dashboard
  event:
    - event.toggle_graph_metric
    - event.change_graph_timeframe
  screen:
    - screen.dashboard
  component:
    - component.trend_graph
    - component.weekly_summary_tile

design_system_reference: [design_system]
--- 