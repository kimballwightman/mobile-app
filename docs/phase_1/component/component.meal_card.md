---
type: component
id: component.meal_card
title: Meal Card
component_type: card
description: |
  Card displaying a meal's image, title, calorie/macro bar, and favorite button. Used in explore grid, expanded meal view, and plan calendar.

properties:
  - name: image
    type: string
    description: "URL of the meal image."
  - name: title
    type: string
    description: "Meal title."
  - name: calories
    type: number
    description: "Total calories."
  - name: macros
    type: object
    description: "Macro breakdown (carbs, fat, protein)."
  - name: isFavorite
    type: boolean
    description: "Whether the meal is favorited."
  - name: onClick
    type: function
    description: "Handler for expanding the meal card."
  - name: onFavorite
    type: function
    description: "Handler for toggling favorite state."

states:
  - state.idle
  - state.expanded
  - state.favorited

related:
  feature:
    - feature.meal_discovery
    - feature.expanded_meal_view
  event:
    - event.expand_meal_card
    - event.add_to_favorites
  screen:
    - screen.explore_grid

design_system_reference: [design_system]
---
