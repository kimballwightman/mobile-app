---
type: component
id: component.macro_bar
title: Macro Bar
component_type: custom
description: |
  Visual bar displaying macro nutrient ratios (carbs, fat, protein), total calories, and price for a meal, day, or plan. Used in meal cards, calendar, and expanded views.

properties:
  - name: carbs
    type: number
    description: "Grams of carbohydrates."
  - name: fat
    type: number
    description: "Grams of fat."
  - name: protein
    type: number
    description: "Grams of protein."
  - name: calories
    type: number
    description: "Total calories."
  - name: price
    type: number
    description: "Total price of the meal or food item."
  - name: showLabels
    type: boolean
    description: "Whether to display labels for each macro."

states:
  - state.updated
  - state.visible
  - state.hidden

related:
  feature:
    - feature.meal_discovery
    - feature.meal_plan_calendar
    - feature.expanded_meal_view
  event:
    - event.expand_meal_card
    - event.load_meal_grid
    - event.add_favorite_meal_to_plan
    - event.swap_save
  screen:
    - screen.explore_grid
    - screen.meal_planning_tab

design_system_reference: [design_system]
---
