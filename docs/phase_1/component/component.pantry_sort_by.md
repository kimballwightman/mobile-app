---
type: component
id: component.pantry_sort_by
title: Pantry Sort By
component_type: picklist
description: |
  Dropdown or picklist component allowing users to select a sort method for pantry items (e.g., by expiration, category, name, quantity).

properties:
  - name: value
    type: string
    description: "Current selected sort method."
  - name: options
    type: array
    description: "Available sort options."
  - name: onChange
    type: function
    description: "Handler called when the sort method changes."

states:
  - state.enabled
  - state.disabled
  - state.updated

related:
  feature:
    - feature.pantry_management
  event:
    - event.pantry_items_sort
  screen:
    - screen.pantry_tab

design_system_reference: [design_system]
---
