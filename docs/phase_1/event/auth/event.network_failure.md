---
type: event
id: event.network_failure
feature_id: feature.authentication
title: Network Failure During Auth Flow
description: |
  This event is triggered when a network failure occurs during an authentication-related action (e.g., login, password reset, sign up, or OAuth). The app notifies the user of the connectivity issue and allows them to retry the action.

preconditions:
  screens:
    - screen.login: state.submitting
    - screen.forgot_password: state.submitting
    - screen.create_account: state.submitting
  components:
    - component.submit_button: state.loading

trigger:
  trigger_type: system_event
  component: component.app
  screen: screen.login

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.submit_button:
        state: state.enabled
        description: "Submit button is re-enabled to allow retry."
    - component.input_field:
        state: state.enabled
        description: "Input fields are re-enabled for user input."
  screens:
    - screen.login:
        state: state.error
        description: "Login screen shows network error message."
    - screen.forgot_password:
        state: state.error
        description: "Forgot Password screen shows network error message."
    - screen.create_account:
        state: state.error
        description: "Sign Up screen shows network error message."

navigation: []

next_possible_events:
  - event.login_submit
  - event.forgot_password_submit
  - event.create_account_submit

responses:
  - Shows error message: "Network error. Please check your connection and try again."
  - Re-enables form fields and submit button for retry.
---
