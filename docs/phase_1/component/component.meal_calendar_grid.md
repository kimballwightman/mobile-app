---
type: component
id: component.meal_calendar_grid
title: Meal Calendar Grid
component_type: table
description: |
  Calendar grid displaying meal plans by day and slot (breakfast, lunch, dinner, snacks). Supports drag-and-drop, swiping, and history view.

properties:
  - name: days
    type: array
    description: "Array of days to display in the grid."
  - name: slots
    type: array
    description: "Meal slots per day (e.g., breakfast, lunch, dinner, snacks)."
  - name: meals
    type: array
    description: "Meal data for each slot."
  - name: onDrag
    type: function
    description: "Handler for drag-and-drop of meals."
  - name: onSwipe
    type: function
    description: "Handler for swiping between days."

states:
  - state.loaded
  - state.updated
  - state.history_view

related:
  feature:
    - feature.meal_plan_calendar
  event:
    - event.drag_and_drop_meal
    - event.swipe_to_different_day
    - event.browse_meal_history
  screen:
    - screen.meal_planning_tab

design_system_reference: [design_system]
---
