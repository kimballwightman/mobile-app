---
type: event
id: event.auth_token_expires
feature_id: feature.authentication
title: Auth Token Expires
description: |
  This event is triggered when the user's authentication token or session expires (e.g., due to timeout, logout from another device, or token invalidation). The app clears the user's session, navigates to the login screen, and prompts the user to log in again.

preconditions:
  screens:
    - screen.explore_grid: state.rendered
    - screen.onboarding: state.rendered
    - screen.meal_planning_tab: state.rendered
  components: []

trigger:
  trigger_type: system_event
  component: component.app
  screen: screen.explore_grid

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.input_field:
        state: state.cleared
        description: "Clears any sensitive or user-specific data from input fields."
  screens:
    - screen.explore_grid:
        state: state.inactive
        description: "Main app screen is deactivated due to expired session."
    - screen.onboarding:
        state: state.inactive
        description: "Onboarding screen is deactivated due to expired session."
    - screen.meal_planning_tab:
        state: state.inactive
        description: "Meal planning screen is deactivated due to expired session."
    - screen.login:
        state: state.rendered
        description: "Login screen is rendered and prompts user to log in again."

navigation:
  - screen.login

next_possible_events:
  - event.login_input_email
  - event.login_input_password
  - event.google_login
  - event.forgot_password_link

responses:
  - Clears user session and sensitive data.
  - Navigates to login screen and prompts user to log in again.
  - Optionally shows a message: "Session expired. Please log in again."
---
