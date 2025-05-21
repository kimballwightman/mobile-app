---
type: event
id: event.app_launch
feature_id: feature.authentication
title: App Launch
description: |
  This event is triggered when the user opens the mobile application. The app checks for an existing authentication token or session. If a valid session exists, the user is navigated to the main app (e.g., Explore or Plan tab). If not, the user is directed to the Login or Onboarding flow.

preconditions:
  screens:
    - screen.login: state.initial
  components: []

trigger:
  trigger_type: system_event
  component: component.app
  screen: screen.login

api_request:
  endpoint: api.auth_login.POST
  method: POST
  url: /auth/login

db_interactions:
  relational:
    - table.users:
        actions:
          - "Check for existing user session or auth token"
  graph:
    - node.user:
        actions:
          - "Validate user session node for authentication"

state_changes:
  components: []
  screens:
    - screen.login:
        state: state.rendered
        description: "Login screen is rendered if no valid session exists"
    - screen.onboarding:
        state: state.rendered
        description: "Onboarding screen is rendered if user is new or onboarding is incomplete"
    - screen.explore_grid:
        state: state.rendered
        description: "Main app screen is rendered if user is authenticated"

navigation:
  - screen.login
  - screen.onboarding
  - screen.explore_grid

next_possible_events:
  - event.login_input_email
  - event.login_input_password
  - event.create_account
  - event.forgot_password_link
  - event.google_login

responses:
  - If no valid session, navigate to Login screen.
  - If valid session and onboarding complete, navigate to Explore tab.
  - If valid session but onboarding incomplete, navigate to Onboarding flow.
---
