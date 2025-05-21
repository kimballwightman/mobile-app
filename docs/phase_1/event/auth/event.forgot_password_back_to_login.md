---
type: event
id: event.forgot_password_back_to_login
feature_id: feature.authentication
title: User Navigates Back to Login from Forgot Password
description: |
  This event is triggered when the user taps the "Back" button on the Forgot Password screen. The app navigates back to the Login screen, clearing any local state from the Forgot Password form. No backend interaction occurs at this stage.

preconditions:
  screens:
    - screen.forgot_password: state.rendered
  components:
    - component.go_back_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.go_back_button
  screen: screen.forgot_password

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.input_field:
        state: state.cleared
        description: "Forgot Password form fields and errors are cleared."
    - component.input_field:
        state: state.idle
        description: "Input fields are reset to idle state."
  screens:
    - screen.forgot_password:
        state: state.inactive
        description: "Forgot Password screen is no longer active after navigation."
    - screen.login:
        state: state.rendered
        description: "Login screen is rendered and ready for user input."

navigation:
  - screen.login

next_possible_events:
  - event.login_input_email
  - event.login_input_password
  - event.forgot_password_link

responses:
  - Navigates back to Login screen.
  - Clears local state from Forgot Password form.
  - Restores login screen UI, possibly with cached email/password if available.
---
