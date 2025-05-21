---
type: component
id: component.search_bar
title: Search Bar
component_type: input
description: |
  Text input for searching or filtering lists or grids, such as meals, foods, or pantry items. Supports suggestions and search mode. Tapping the search bar expands into a full search window.

properties:
  - name: value
    type: string
    description: "Current search query."
  - name: placeholder
    type: string
    description: "Placeholder text."
  - name: onChange
    type: function
    description: "Handler called when the search query changes."
  - name: onFocus
    type: function
    description: "Handler called when the search bar is focused."
  - name: suggestions
    type: array
    description: "Array of search suggestions."
  - name: onExpand
    type: function
    description: "Handler called when the search bar expands into search window."
  - name: onCollapse
    type: function
    description: "Handler called when the search window collapses back to search bar."

states:
  - state.idle
  - state.focused
  - state.expanded
  - state.suggestions
  - state.search_mode

related:
  feature:
    - feature.meal_discovery
    - feature.pantry_management
  event:
    - event.search_bar
    - event.filter_meals
    - event.search_pantry_items
  screen:
    - screen.explore_grid
    - screen.pantry_tab

design_system_reference: [design_system]
---
