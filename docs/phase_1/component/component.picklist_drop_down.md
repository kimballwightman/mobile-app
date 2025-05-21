---
type: component
id: component.picklist_drop_down
title: Picklist Drop Down
component_type: picklist
description: |
  Dropdown selector component allowing users to pick from a list of options. Used for sorting, filtering, or selecting categories.

properties:
  - name: value
    type: string
    description: "Current selected value."
  - name: options
    type: array
    description: "Available options to select from."
  - name: onChange
    type: function
    description: "Handler called when the selection changes."
  - name: disabled
    type: boolean
    description: "Whether the dropdown is disabled."

states:
  - state.enabled
  - state.disabled
  - state.open
  - state.closed

related:
  feature:
    - feature.pantry_management
    - feature.meal_discovery
  event:
    - event.pantry_items_sort
    - event.filter_meals
  screen:
    - screen.pantry_tab
    - screen.explore_grid

design_system_reference: [design_system]
---
