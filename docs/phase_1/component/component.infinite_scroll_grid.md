---
type: component
id: component.infinite_scroll_grid
title: Infinite Scroll Grid
component_type: list
description: |
  Grid layout for displaying cards (e.g., meals) with support for infinite scroll and dynamic loading as the user scrolls.

properties:
  - name: items
    type: array
    description: "Array of items to display in the grid."
  - name: onScroll
    type: function
    description: "Handler called when the user scrolls near the end of the grid."
  - name: loading
    type: boolean
    description: "Whether the grid is currently loading more items."
  - name: columns
    type: number
    description: "Number of columns in the grid."

states:
  - state.idle
  - state.loading
  - state.loaded
  - state.overlay

related:
  feature:
    - feature.meal_discovery
    - feature.expanded_meal_view
  event:
    - event.load_meal_grid
    - event.grid_scroll
    - event.expand_meal_card
  screen:
    - screen.explore_grid

design_system_reference: [design_system]
---
