---
type: event
id: event.complete_onboarding
feature_id: feature.onboarding_flow
title: User Completes Onboarding
description: |
  This event is triggered when the user taps the "Let's Get Started" button on the Completion onboarding screen. The app writes all onboarding preferences to the backend and navigates the user into the main app (Dashboard tab).

preconditions:
  screens:
    - screen.complete_onboarding: state.rendered
  components:
    - component.next_screen_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.next_screen_button
  screen: screen.complete_onboarding

api_request:
  - endpoint: api.users_preferences_dietary.PUT
    method: PUT
    url: /api/users/preferences/dietary
  - endpoint: api.users_preferences_user-info.PUT
    method: PUT
    url: /api/users/preferences/user-info
  - endpoint: api.users_preferences_tracking-goals.PUT
    method: PUT
    url: /api/users/preferences/tracking-goals
  - endpoint: api.users_preferences_cooking-shopping.PUT
    method: PUT
    url: /api/users/preferences/cooking-shopping
  - endpoint: api.users_onboarding-status.PUT
    method: PUT
    url: /api/users/onboarding-status

db_interactions:
  relational:
    - table.users:
        actions:
          - "Update onboarding_completed flag and timestamp."
          - "Update gender, age, height_cm, weight_kg, activity_level."
          - "Update diet_type and allergies."
    - table.user_preferences:
        actions:
          - "Update calories_target, carbs_grams, fat_grams, protein_grams."
          - "Update appliances, budget_min, budget_max, cooking_skill_level."
  graph:
    - node.user:
        actions:
          - "Update onboarding flag or :COMPLETED_ONBOARDING relationship."
          - "Create/Update relationships to Tag, Ingredient, Appliance nodes."

state_changes:
  components:
    - component.next_screen_button:
        state: state.loading
        description: "Shows loading state while preferences are being saved."
  screens:
    - screen.complete_onboarding:
        state: state.completed
        description: "Onboarding is marked as completed."
    - screen.dashboard_tab:
        state: state.rendered
        description: "Main app Dashboard tab is rendered."

navigation:
  - screen.dashboard_tab

next_possible_events:
  - event.dashboard_tab_loaded

responses:
  - Writes all onboarding preferences to the backend.
  - Updates onboarding_completed flag and timestamp.
  - Navigates user into the main app (Dashboard tab).
  - Shows loading state on button while processing.
---
