---
type: component
id: component.choose_interval_calendar
title: Choose Interval Calendar
component_type: custom
description: |
  Calendar picker component allowing users to select a date interval (start and end date) for meal planning or shopping windows.

properties:
  - name: startDate
    type: string
    description: "Selected start date."
  - name: endDate
    type: string
    description: "Selected end date."
  - name: onChange
    type: function
    description: "Handler called when the interval selection changes."
  - name: minDate
    type: string
    description: "Minimum selectable date."
  - name: maxDate
    type: string
    description: "Maximum selectable date."

states:
  - state.idle
  - state.selecting
  - state.selected

related:
  feature:
    - feature.meal_plan_calendar
  event:
    - event.create_cart_window
  screen:
    - screen.meal_planning_tab

design_system_reference: [design_system]
---
