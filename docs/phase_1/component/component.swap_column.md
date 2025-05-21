---
type: component
id: component.swap_column
title: Swap Column
component_type: list
description: |
  Column displaying food swap options for a selected food item, allowing users to browse and select alternatives. Used in expanded meal view and swap mode.

properties:
  - name: options
    type: array
    description: "Array of swap option items."
  - name: selectedOption
    type: object
    description: "Currently selected swap option."
  - name: onSelect
    type: function
    description: "Handler called when a swap option is selected."

states:
  - state.visible
  - state.updated

related:
  feature:
    - feature.expanded_meal_view
  event:
    - event.select_food_swap
    - event.swap_save
  screen:
    - screen.explore_grid

design_system_reference: [design_system]
---
