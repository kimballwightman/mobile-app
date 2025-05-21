---
type: component
id: component.meal_workout_tile
title: Meal Workout Tile
component_type: card
description: |
  Tile component representing a planned meal or workout for a specific day, showing image, name, calories, and macro ratio percentages. Supports drag and drop reordering and provides multiple interaction options when tapped (Cook, Log, Swap, Skip for meals; Log for workouts).

properties:
  - name: type
    type: string
    description: "Type of tile (meal or workout)."
  - name: data
    type: object
    description: "Meal or workout data object (includes image, name, calories, macro ratios for meals)."
  - name: onSelect
    type: function
    description: "Callback when the tile is selected."
  - name: onCook
    type: function
    description: "Callback when the cook option is selected (meals only)."
  - name: onLog
    type: function
    description: "Callback when the log option is selected, allows editing/adjusting portions."
  - name: onSwap
    type: function
    description: "Callback when the swap option is selected to replace meal (meals only)."
  - name: onSkip
    type: function
    description: "Callback when meal is skipped (meals only)."
  - name: isDraggable
    type: boolean
    description: "Whether the tile can be dragged for reordering."
  - name: onDragStart
    type: function
    description: "Callback when drag starts."
  - name: onDragEnd
    type: function
    description: "Callback when drag ends with new position."

states:
  - state.default
  - state.logged
  - state.dragging
  - state.expanded

related:
  feature:
    - feature.dashboard
    - feature.meal_plan_calendar
  event:
    - event.log_meal
    - event.log_workout
    - event.drag_meal_workout_tile
    - event.cook_meal
    - event.swap_meal
    - event.skip_meal
  screen:
    - screen.dashboard
    - screen.meal_planning_tab

design_system_reference: [design_system]
---
