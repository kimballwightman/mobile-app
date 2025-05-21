---
type: component
id: component.go_back_button
title: Go Back Button
component_type: button
description: |
  Navigation button allowing the user to return to the previous screen. Commonly used in forms, onboarding, and authentication flows.

properties:
  - name: onClick
    type: function
    description: "Handler called when the button is pressed."
  - name: label
    type: string
    description: "Optional text label for accessibility."
  - name: disabled
    type: boolean
    description: "Whether the button is disabled."

states:
  - state.enabled
  - state.disabled

related:
  feature:
    - feature.authentication
    - feature.onboarding_flow
  event:
    - event.go_to_previous_page
    - event.forgot_password_back_to_login
    - event.create_account_back_to_login
  screen:
    - screen.forgot_password
    - screen.create_account
    - screen.user_info
    - screen.tracking_goals
    - screen.dietary_preferences
    - screen.cooking_shopping

design_system_reference: [design_system]
---
