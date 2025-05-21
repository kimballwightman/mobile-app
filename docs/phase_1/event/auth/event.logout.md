---
type: event
id: event.logout
feature_id: feature.authentication
title: User Logs Out
description: |
  This event is triggered when the user taps the "Logout" button or link in the app. The app clears the user's session, removes authentication tokens, and navigates to the login screen. No backend interaction is required unless you want to invalidate the session server-side.

preconditions:
  screens:
    - screen.profile_account: state.rendered
    - screen.explore_grid: state.rendered
    - screen.meal_planning_tab: state.rendered
  components:
    - component.settings_tile: state.enabled
    - component.submit_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.settings_tile
  screen: screen.profile_account

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
    - screen.profile_account:
        state: state.inactive
        description: "Profile/account screen is deactivated after logout."
    - screen.explore_grid:
        state: state.inactive
        description: "Main app screen is deactivated after logout."
    - screen.meal_planning_tab:
        state: state.inactive
        description: "Meal planning screen is deactivated after logout."
    - screen.login:
        state: state.rendered
        description: "Login screen is rendered and ready for user input."

navigation:
  - screen.login

next_possible_events:
  - event.login_input_email
  - event.login_input_password
  - event.google_login
  - event.forgot_password_link

responses:
  - Clears user session and sensitive data.
  - Navigates to login screen.
  - Optionally shows a message: "You have been logged out."
---
