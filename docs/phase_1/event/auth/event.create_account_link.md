---
type: event
id: event.create_account_link
feature_id: feature.authentication
title: User Clicks "Sign Up" Link
description: |
  This event is triggered when the user taps the "Sign Up" link on the login screen. The app navigates to the Sign Up screen, initializing or resetting the form state. No backend interaction occurs at this stage.

preconditions:
  screens:
    - screen.login: state.rendered
  components:
    - component.text_container: state.enabled

trigger:
  trigger_type: user_action
  component: component.text_container
  screen: screen.login

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.input_field:
        state: state.cleared
        description: "Sign Up form fields are initialized or reset."
    - component.input_field:
        state: state.idle
        description: "Input fields are ready for user input."
  screens:
    - screen.login:
        state: state.inactive
        description: "Login screen is no longer active after navigation."
    - screen.create_account:
        state: state.rendered
        description: "Sign Up screen is rendered and ready for user input."

navigation:
  - screen.create_account

next_possible_events:
  - event.create_account_input_email
  - event.create_account_input_password
  - event.create_account_confirm_password
  - event.create_account_submit
  - event.create_account_back_to_login

responses:
  - Navigates to Sign Up screen.
  - Initializes or resets form state for account creation.
  - Optionally preloads email field if previously entered on login screen.
---
