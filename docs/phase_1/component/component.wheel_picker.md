---
type: component
id: component.wheel_picker
title: Wheel Picker
component_type: input
description: |
  Scrollable picker for selecting a value from a list, such as time, quantity, or category. Used in onboarding and settings.

properties:
  - name: options
    type: array
    description: "Array of selectable options."
  - name: value
    type: string
    description: "Currently selected value."
  - name: onChange
    type: function
    description: "Handler called when the value changes."
  - name: disabled
    type: boolean
    description: "Whether the picker is disabled."

states:
  - state.enabled
  - state.disabled
  - state.updated

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_goal
  screen:
    - screen.define_goal

design_system_reference: [design_system]
---
