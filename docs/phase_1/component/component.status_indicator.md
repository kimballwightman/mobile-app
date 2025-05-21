---
type: component
id: component.status_indicator
title: Status Indicator
component_type: custom
description: |
  A small indicator component to show status (e.g., success, warning, error, info) for various UI elements.

properties:
  - name: status
    type: string
    description: "Status type (success, warning, error, info)."

states:
  - state.success
  - state.warning
  - state.error
  - state.info

related:
  feature:
    - feature.dashboard
    - feature.pantry_management
  event:
    - event.log_pantry_item_change
  screen:
    - screen.dashboard
    - screen.pantry_tab

design_system_reference: [design_system]
---
