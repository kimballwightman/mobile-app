---
type: component
id: component.next_screen_button
title: Next Screen Button
component_type: button
description: |
  Button to proceed to the next screen in a flow, such as onboarding or multi-step forms. Can be disabled or show loading state.

properties:
  - name: onClick
    type: function
    description: "Handler called when the button is pressed."
  - name: label
    type: string
    description: "Button text label."
  - name: disabled
    type: boolean
    description: "Whether the button is disabled."
  - name: loading
    type: boolean
    description: "Whether the button shows a loading spinner."

states:
  - state.enabled
  - state.disabled
  - state.loading

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.next_onboarding_screen
  screen:
    - screen.user_info
    - screen.tracking_goals
    - screen.dietary_preferences
    - screen.cooking_shopping

design_system_reference: [design_system]
---
