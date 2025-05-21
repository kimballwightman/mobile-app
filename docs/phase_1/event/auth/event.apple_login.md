---
type: event
id: event.apple_login
feature_id: feature.authentication
title: Apple Login
description: |
  This event is triggered when the user taps the "Sign in with Apple" button on the login screen. The app initiates an Apple OAuth flow, sending the received credentials to the backend for verification and processing.

preconditions:
  screens:
    - screen.login: state.rendered
  components:
    - component.submit_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.submit_button
  screen: screen.login

api_request:
  endpoint: api.auth_oauth_apple.POST
  method: POST
  url: /api/auth/oauth/apple

db_interactions:
  relational:
    - table.users:
        actions:
          - "Look up existing user by Apple user ID."
          - "Create new user if Apple ID not found."
          - "Generate auth token/session."
          - "Optionally update last_login_at."
  graph: []

state_changes:
  components:
    - component.submit_button:
        state: state.loading
        description: "Apple login button shows loading state while OAuth flow is in progress."
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