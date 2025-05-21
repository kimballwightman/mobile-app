---
type: component
id: component.adherence_slider
title: Adherence Slider
component_type: custom
description: |
  A slider component for selecting the user's adherence percentage to their macro/calorie goals during onboarding or goal setting.

properties:
  - name: value
    type: number
    description: "Current adherence percentage."
  - name: onChange
    type: function
    description: "Callback when the slider value changes."

states:
  - state.default

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.set_macro_goals
  screen:
    - screen.tracking_goals

design_system_reference: [design_system]
---
