---
type: event
id: event.create_account_submit
feature_id: feature.authentication
title: User Submits Sign Up Form
description: |
  This event is triggered when the user taps the "Sign Up" button after entering their email, password, and confirm password. The app sends a registration request to the backend, which creates a new user if validation passes, or returns an error if not.

preconditions:
  screens:
    - screen.create_account: state.email_password_confirm_entered
  components:
    - component.input_field: state.updated
    - component.submit_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.submit_button
  screen: screen.create_account

api_request:
  endpoint: api.auth_signup.POST
  method: POST
  url: /api/auth/register

db_interactions:
  relational:
    - table.users:
        actions:
          - "Check if email already exists."
          - "Hash password."
          - "Insert new user row with onboarding_status: incomplete."
  graph: []

state_changes:
  components:
    - component.submit_button:
        state: state.loading
        description: "Sign Up button shows loading state while request is in progress."
    - component.input_field:
        state: state.disabled
        description: "Input fields are disabled to prevent changes during submission."
  screens:
    - screen.create_account:
        state: state.submitting
        description: "Sign Up screen enters submitting state."
    - screen.create_account:
        state: state.error
        description: "Sign Up screen shows error message if registration fails."
    - screen.login:
        state: state.rendered
        description: "Login screen is rendered if registration is successful."

navigation:
  - screen.login

next_possible_events:
  - event.login_input_email
  - event.login_input_password
  - event.create_account_back_to_login

responses:
  - On success, show confirmation message and navigate to Login screen (optionally pre-fill email).
  - On failure, show inline error message near relevant input fields.
  - Handles validation errors such as email in use, weak password, or mismatched passwords.
---
