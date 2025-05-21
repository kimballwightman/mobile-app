---
type: component
id: component.budget_slider
title: Budget Slider
component_type: custom
description: |
  A horizontal range slider with two nodes for selecting the user's weekly grocery budget range during onboarding.

properties:
  - name: min
    type: number
    description: "Minimum budget value."
  - name: max
    type: number
    description: "Maximum budget value."
  - name: value
    type: array
    description: "Current selected budget range [min, max]."
  - name: onChange
    type: function
    description: "Callback when the slider value changes."

states:
  - state.default

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_budget
  screen:
    - screen.budget

design_system_reference: [design_system]
---
