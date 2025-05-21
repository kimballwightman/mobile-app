---
type: event
id: event.google_login
feature_id: feature.authentication
title: User Initiates Google Login
description: |
  This event is triggered when the user taps the "Continue with Google" button on the login screen. The app initiates the Google OAuth flow, receives an ID token, and sends it to the backend for authentication. The backend validates the token, logs in the user or creates a new user, and returns a session token.

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
  endpoint: api.auth_oauth_google.POST
  method: POST
  url: /api/auth/oauth/google

db_interactions:
  relational:
    - table.users:
        actions:
          - "Look up user by email from Google token."
          - "If not found, create new user with onboarding_status: incomplete."
  graph: []

state_changes:
  components:
    - component.submit_button:
        state: state.loading
        description: "Google login button shows loading state during OAuth flow."
    - component.input_field:
        state: state.disabled
        description: "Input fields are disabled during OAuth flow."
  screens:
    - screen.login:
        state: state.submitting
        description: "Login screen enters submitting state during Google OAuth."
    - screen.login:
        state: state.error
        description: "Login screen shows error message if Google sign-in fails."
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
  - On success, store JWT/session token and update global auth state.
  - Navigate to onboarding if incomplete, or to main app if complete.
  - On failure, show error message to user.
---
