---
type: component
id: component.input_field
title: Input Field
component_type: input
description: |
  Text input field for forms, used for entering values such as email, password, search queries, or numeric data. Supports validation and error display.

properties:
  - name: type
    type: string
    description: "HTML input type (e.g., text, email, password, number)."
  - name: value
    type: string
    description: "Current value of the input."
  - name: placeholder
    type: string
    description: "Placeholder text."
  - name: onChange
    type: function
    description: "Handler called when the input value changes."
  - name: onBlur
    type: function
    description: "Handler called when the input loses focus."
  - name: error
    type: string
    description: "Error message to display."
  - name: disabled
    type: boolean
    description: "Whether the input is disabled."

states:
  - state.idle
  - state.focused
  - state.updated
  - state.disabled
  - state.error
  - state.cleared

related:
  feature:
    - feature.authentication
    - feature.onboarding_flow
  event:
    - event.login_input_email
    - event.login_input_password
    - event.create_account_input_email
    - event.create_account_input_password
    - event.set_calorie_goal
    - event.set_macro_goals
    - event.forgot_password_input_email
  screen:
    - screen.login
    - screen.create_account
    - screen.forgot_password
    - screen.tracking_goals
    - screen.user_info

design_system_reference: [design_system]
---
