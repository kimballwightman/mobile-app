---
type: event
id: event.loading_spinner_timeout
feature_id: feature.authentication
title: Loading Spinner Timeout During Auth Flow
description: |
  This event is triggered when a loading spinner times out during an authentication-related action (e.g., login, password reset, sign up, or OAuth). The app notifies the user that the operation took too long and allows them to retry or cancel the action.

preconditions:
  screens:
    - screen.login: state.submitting
    - screen.forgot_password: state.submitting
    - screen.create_account: state.submitting
  components:
    - component.submit_button: state.loading
    - component.loading_spinner: state.visible

trigger:
  trigger_type: system_event
  component: component.loading_spinner
  screen: screen.login

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.loading_spinner:
        state: state.hidden
        description: "Loading spinner is hidden after timeout."
    - component.submit_button:
        state: state.enabled
        description: "Submit button is re-enabled to allow retry."
    - component.input_field:
        state: state.enabled
        description: "Input fields are re-enabled for user input."
  screens:
    - screen.login:
        state: state.error
        description: "Login screen shows timeout error message."
    - screen.forgot_password:
        state: state.error
        description: "Forgot Password screen shows timeout error message."
    - screen.create_account:
        state: state.error
        description: "Sign Up screen shows timeout error message."

navigation: []

next_possible_events:
  - event.login_submit
  - event.forgot_password_submit
  - event.create_account_submit
  - event.network_failure

responses:
  - Shows error message: "Request timed out. Please try again."
  - Hides loading spinner and re-enables form fields and submit button for retry.
---
