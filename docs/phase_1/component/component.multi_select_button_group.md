---
type: component
id: component.multi_select_button_group
title: Multi Select Button Group
component_type: input
description: |
  Group of buttons allowing users to select multiple options, such as dietary preferences or meal types. Supports toggling and visual feedback.

properties:
  - name: options
    type: array
    description: "Array of selectable options."
  - name: selectedValues
    type: array
    description: "Currently selected values."
  - name: onChange
    type: function
    description: "Handler called when the selection changes."
  - name: disabled
    type: boolean
    description: "Whether the group is disabled."

states:
  - state.enabled
  - state.disabled
  - state.updated

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_dietary_preferences
  screen:
    - screen.dietary_preferences

design_system_reference: [design_system]
---
