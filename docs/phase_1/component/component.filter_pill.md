---
type: component
id: component.filter_pill
title: Filter Pill
component_type: custom
description: |
  Selectable pill or chip used for filtering lists or grids by category, type, or other criteria. Commonly used in swap mode and search/filter UIs.

properties:
  - name: label
    type: string
    description: "Text label for the filter."
  - name: selected
    type: boolean
    description: "Whether the pill is currently selected."
  - name: onClick
    type: function
    description: "Handler called when the pill is clicked."

states:
  - state.idle
  - state.selected
  - state.disabled

related:
  feature:
    - feature.expanded_meal_view
    - feature.meal_discovery
  event:
    - event.select_swap_level
    - event.filter_meals
  screen:
    - screen.explore_grid


design_system_reference: [design_system]
---
