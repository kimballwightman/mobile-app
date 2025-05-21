---
type: component
id: component.meal_totals_section
title: Meal Totals Section
component_type: custom
description: |
  Section displaying total macros and calories for a meal, day, or plan. Used in meal planning and review screens.

properties:
  - name: calories
    type: number
    description: "Total calories."
  - name: macros
    type: object
    description: "Macro breakdown (carbs, fat, protein)."
  - name: label
    type: string
    description: "Label for the section (e.g., 'Daily Total')."

states:
  - state.visible
  - state.updated

related:
  feature:
    - feature.meal_plan_calendar
    - feature.expanded_meal_view
  event:
    - event.add_favorite_meal_to_plan
    - event.swap_save
  screen:
    - screen.meal_planning_tab
    - screen.explore_grid

design_system_reference: [design_system]
---
