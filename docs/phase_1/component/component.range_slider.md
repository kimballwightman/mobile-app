---
type: component
id: component.range_slider
title: Range Slider
component_type: input
description: |
  Slider input allowing users to select a numeric range, such as budget or calorie range. Used in onboarding and filtering.

properties:
  - name: min
    type: number
    description: "Minimum value of the range."
  - name: max
    type: number
    description: "Maximum value of the range."
  - name: value
    type: array
    description: "Current selected range as [min, max]."
  - name: onChange
    type: function
    description: "Handler called when the range changes."
  - name: step
    type: number
    description: "Step increment for the slider."

states:
  - state.idle
  - state.updated
  - state.disabled

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_budget
  screen:
    - screen.cooking_shopping

design_system_reference: [design_system]
---
