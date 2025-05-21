---
type: component
id: component.weekly_summary_tile
title: Weekly Summary Tile
component_type: card
description: |
  Displays aggregated weekly metrics such as average daily calorie difference and macro splits over a 7-day window. Color-coded borders indicate whether values are within goal range.

properties:
  - name: type
    type: string
    description: "Type of summary (avg_calorie_diff, avg_macro_split_protein, avg_macro_split_carbs, avg_macro_split_fat)."
  - name: value
    type: number
    description: "Calculated value for the summary metric."
  - name: goalMin
    type: number
    description: "Minimum target value for this metric to be in goal range."
  - name: goalMax
    type: number
    description: "Maximum target value for this metric to be in goal range."
  - name: isWithinGoal
    type: boolean
    description: "Whether the value is within goal range, determines border color (green if within range, red if outside)."
  - name: unit
    type: string
    description: "Unit for the value (calories, percentage, etc.)."
  - name: label
    type: string
    description: "Display label for the metric."
  - name: startDate
    type: date
    description: "Start date of the 7-day window for calculation."
  - name: endDate
    type: date
    description: "End date of the 7-day window for calculation."
  - name: calculationMethod
    type: string
    description: "Method used to calculate the value (e.g., 'avg_calorie_diff' calculates (total calories consumed - total calories burned) / 7; 'avg_macro_split' calculates total macro grams / sum of all macro grams as percentage)."
  - name: onSelect
    type: function
    description: "Callback when tile is selected."

states:
  - state.default
  - state.within_goal
  - state.outside_goal
  - state.loading

related:
  feature:
    - feature.dashboard
  event:
    - event.tap_summary_tile
  screen:
    - screen.dashboard
  component:
    - component.trend_graph
    - component.week_by_week_trendline

design_system_reference: [design_system]
---
