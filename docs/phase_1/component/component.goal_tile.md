---
type: component
id: component.goal_tile
title: Goal Tile
component_type: card
description: |
  Tile component displaying a specific goal metric (e.g., calories, protein, carbs, fats) and its current status for the day.

properties:
  - name: metric
    type: string
    description: "Goal metric type (calories, protein, carbs, fats)."
  - name: value
    type: number
    description: "Current value for the metric."
  - name: goal
    type: number
    description: "Goal value for the metric."
  - name: status
    type: string
    description: "Status indicator (in_goal, out_of_goal)."

states:
  - state.in_goal
  - state.out_of_goal

related:
  feature:
    - feature.dashboard
  event:
    - event.tap_summary_tile
  screen:
    - screen.dashboard

design_system_reference: [design_system]
---
