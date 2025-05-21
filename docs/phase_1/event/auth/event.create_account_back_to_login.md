---
type: event
id: event.create_account_back_to_login
feature_id: feature.authentication
title: User Navigates Back to Login from Sign Up
description: |
  This event is triggered when the user taps the "Back" button on the Sign Up screen. The app navigates back to the Login screen, clearing any local state from the Sign Up form. No backend interaction occurs at this stage.

preconditions:
  screens:
    - screen.create_account: state.rendered
  components:
    - component.go_back_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.go_back_button
  screen: screen.create_account

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.input_field:
        state: state.cleared
        description: "Sign Up form fields and errors are cleared."
    - component.input_field:
        state: state.idle
        description: "Input fields are reset to idle state."
  screens:
    - screen.create_account:
        state: state.inactive
        description: "Sign Up screen is no longer active after navigation."
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
  - Clears local state from Sign Up form.
  - Restores login screen UI, possibly with cached email/password if available.
---
