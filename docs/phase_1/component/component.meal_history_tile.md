---
type: component
id: component.meal_history_tile
title: Meal History Tile
component_type: card
description: |
  Card component displaying a previously consumed meal, including image, name, and macro summary. Used in meal logging and history browsing.

properties:
  - name: meal
    type: object
    description: "Meal data object (image, name, macros, etc.)."
  - name: onSelect
    type: function
    description: "Callback when the tile is selected."

states:
  - state.default

related:
  feature:
    - feature.dashboard
    - feature.meal_reviews
  event:
    - event.log_meal
  screen:
    - screen.dashboard

design_system_reference: [design_system]
---
