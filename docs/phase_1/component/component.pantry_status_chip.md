---
type: component
id: component.pantry_status_chip
title: Pantry Status Chip
component_type: custom
description: |
  Displays a small chip indicating the status of a pantry item (e.g., Fresh, Expiring, Out of Stock, On the Way).

properties:
  - name: status
    type: string
    description: "The status to display (Fresh, Expiring, Out of Stock, On the Way)."

states:
  - state.default
  - state.status_fresh
  - state.status_expiring
  - state.status_out_of_stock
  - state.status_on_the_way

related:
  feature:
    - feature.pantry_management
  event:
    - event.log_pantry_item_change
  screen:
    - screen.pantry_tab

design_system_reference: [design_system]
---
