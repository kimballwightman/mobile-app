---
type: component
id: component.filter_button
title: Filter Button
component_type: button
description: |
  Button component that opens the filters modal in the Explore tab for meal discovery. When tapped, opens a comprehensive filter interface allowing users to filter meals by various criteria.

properties:
  - name: onClick
    type: function
    description: "Callback when the button is clicked."
  - name: active
    type: boolean
    description: "Whether any filters are currently active."
  - name: filterOptions
    type: object
    description: "Configuration for filter types and their UI elements."
    fields:
      - mealType: object (multi-select button group)
      - calories: object (slider or range input)
      - macros: object (range inputs for carbs, fat, protein)
      - prepTime: object (range input)
      - cookTime: object (range input)
      - includeIngredients: array (tag inputs)
      - excludeIngredients: array (tag inputs)

states:
  - state.default
  - state.active
  - state.modal_open

related:
  feature:
    - feature.meal_discovery
  event:
    - event.open_filters
    - event.apply_filters
    - event.clear_filters
  screen:
    - screen.explore_grid

design_system_reference: [design_system]
---
