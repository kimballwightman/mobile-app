---
type: event
id: event.create_account_input_email
feature_id: feature.authentication
title: User Enters Email on Sign Up Screen
description: |
  This event is triggered when the user taps the email input field on the Sign Up screen and begins typing. The email input value is stored in local component state for later validation and submission. No backend interaction occurs at this stage.

preconditions:
  screens:
    - screen.create_account: state.rendered
  components:
    - component.input_field: state.idle

trigger:
  trigger_type: user_action
  component: component.input_field
  screen: screen.create_account

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.input_field:
        state: state.focused
        description: "Email input field is focused and ready for user input."
    - component.input_field:
        state: state.updated
        description: "Local state is updated with the user's email input as they type."
  screens:
    - screen.create_account:
        state: state.email_input_updated
        description: "Sign Up screen now has the entered email stored in state for later use in account creation."

navigation: []

next_possible_events:
  - event.create_account_input_password
  - event.create_account_confirm_password
  - event.create_account_submit

responses:
  - Email input field becomes focused and keyboard appears.
  - As the user types, the email value is stored in local state.
---
