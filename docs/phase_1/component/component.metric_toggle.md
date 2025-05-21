---
type: component
id: component.metric_toggle
title: Metric Toggle
component_type: custom
description: |
  A toggle switch for changing between different metric types (e.g., calories, macros) in the dashboard graphs.

properties:
  - name: value
    type: string
    description: "Current metric type."
  - name: options
    type: array
    description: "Available metric types."
  - name: onChange
    type: function
    description: "Callback when the metric type changes."

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
