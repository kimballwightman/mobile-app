---
type: event
id: event.forgot_password_link
feature_id: feature.authentication
title: User Clicks "Forgot Password" Link
description: |
  This event is triggered when the user taps the "Forgot Password" link on the login screen. The app navigates to the Forgot Password screen, resetting any previous form state or errors. No backend interaction occurs at this stage.

preconditions:
  screens:
    - screen.login: state.rendered
  components:
    - component.input_field: state.idle
    - component.submit_button: state.enabled

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
        description: "Email and password input fields are cleared."
    - component.input_field:
        state: state.idle
        description: "Input fields are reset to idle state."
    - component.submit_button:
        state: state.enabled
        description: "Submit button is enabled for new input."
  screens:
    - screen.login:
        state: state.inactive
        description: "Login screen is no longer active after navigation."
    - screen.forgot_password:
        state: state.rendered
        description: "Forgot Password screen is rendered and ready for user input."

navigation:
  - screen.forgot_password

next_possible_events:
  - event.forgot_password_input_email
  - event.forgot_password_submit
  - event.forgot_password_back_to_login

responses:
  - Navigates to Forgot Password screen.
  - Clears previous form state and errors from login screen.
  - Renders email input and reset password button for user.
---
