---
type: component
id: component.segmented_control
title: Segmented Control
component_type: custom
description: |
  A segmented control for toggling between different metrics or views (e.g., calories, macros) in the dashboard or plan tab.

properties:
  - name: options
    type: array
    description: "Array of segment options."
  - name: value
    type: string
    description: "Currently selected segment."
  - name: onChange
    type: function
    description: "Callback when the selected segment changes."

states:
  - state.default

related:
  feature:
    - feature.dashboard
  event:
    - event.toggle_metric_type
  screen:
    - screen.dashboard

design_system_reference: [design_system]
---
