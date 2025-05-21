---
type: component
id: component.meal_plan_day_header
title: Meal Plan Day Header
component_type: custom
description: |
  Displays the header for a day in the meal plan calendar, showing the date and summary info for that day.

properties:
  - name: date
    type: string
    description: "The date this header represents."
  - name: summary
    type: object
    description: "Summary of meals/macros for the day."

states:
  - state.default

related:
  feature:
    - feature.meal_plan_calendar
  event:
    - event.swipe_to_different_day
  screen:
    - screen.meal_planning_tab

design_system_reference: [design_system]
---
