---
type: component
id: component.submit_button
title: Submit Button
component_type: button
description: |
  Button for submitting forms or actions, such as login, sign up, or feedback. Can show loading or disabled states.

properties:
  - name: onClick
    type: function
    description: "Handler called when the button is pressed."
  - name: label
    type: string
    description: "Button text label."
  - name: loading
    type: boolean
    description: "Whether the button shows a loading spinner."
  - name: disabled
    type: boolean
    description: "Whether the button is disabled."

states:
  - state.enabled
  - state.disabled
  - state.loading

related:
  feature:
    - feature.authentication
    - feature.meal_reviews
  event:
    - event.login_submit
    - event.create_account_submit
    - event.submit_detailed_feedback
  screen:
    - screen.login
    - screen.create_account
    - screen.meal_reviews

design_system_reference: [design_system]
---
