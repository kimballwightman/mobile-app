---
type: component
id: component.nutrient_bar
title: Nutrient Bar
component_type: custom
description: |
  A horizontal bar component visualizing nutrient consumption (calories, protein, carbs, fats) for the day, segmented by meal/snack. Each segment appears hollow until the corresponding meal is logged, then fills in. For calories, shows both consumed and burned bars for comparison.

properties:
  - name: type
    type: string
    description: "Nutrient type (calories, protein, carbs, fats)."
  - name: value
    type: number
    description: "Current value for the nutrient."
  - name: goal
    type: number
    description: "Goal value for the nutrient."
  - name: segments
    type: array
    description: "Segments representing each meal/snack in chronological order."
  - name: isCalorieBurnBar
    type: boolean
    description: "Whether this bar represents calories burned (only for calorie type)."
  - name: segmentStatus
    type: array
    description: "Array of segment status objects, each with 'logged' boolean and 'value' number."
  - name: goalAchieved
    type: boolean
    description: "Whether the nutrient value is within the goal range."
  - name: onSegmentClick
    type: function
    description: "Callback when a segment is clicked, provides segment index."

states:
  - state.default
  - state.goal_achieved
  - state.goal_not_achieved

related:
  feature:
    - feature.dashboard
  event:
    - event.tap_summary_tile
    - event.log_meal
  screen:
    - screen.dashboard

design_system_reference: [design_system]
---
