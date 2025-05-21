---
type: event
id: event.login_submit
feature_id: feature.authentication
title: User Submits Login Form
description: |
  This event is triggered when the user taps the "Login" button after entering their email and password. The app sends a login request to the backend, verifies credentials, and updates authentication state based on the response.

preconditions:
  screens:
    - screen.login: state.email_and_password_entered
  components:
    - component.input_field: state.updated
    - component.submit_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.submit_button
  screen: screen.login

api_request:
  endpoint: api.auth_login.POST
  method: POST
  url: /api/auth/login

db_interactions:
  relational:
    - table.users:
        actions:
          - "Look up user by email."
          - "Verify password hash."
          - "If valid, generate auth token/session."
          - "Optionally update last_login_at."
  graph: []

state_changes:
  components:
    - component.submit_button:
        state: state.loading
        description: "Login button shows loading state while request is in progress."
    - component.input_field:
        state: state.disabled
        description: "Input fields are disabled to prevent changes during submission."
  screens:
    - screen.login:
        state: state.submitting
        description: "Login screen enters submitting state."
    - screen.login:
        state: state.error
        description: "Login screen shows error message if login fails."
    - screen.explore_grid:
        state: state.rendered
        description: "Main app screen is rendered if login is successful and onboarding is complete."
    - screen.onboarding:
        state: state.rendered
        description: "Onboarding screen is rendered if onboarding is incomplete."

navigation:
  - screen.explore_grid
  - screen.onboarding

next_possible_events:
  - event.login_success
  - event.login_error
  - event.forgot_password_link
  - event.create_account

responses:
  - On success, store auth token and update global auth state.
  - Navigate to onboarding if incomplete, or to main app if complete.
  - On failure, show error message to user.
---
