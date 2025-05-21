---
type: event
id: event.restart_onboarding_flow
feature_id: feature.settings_management
title: Restart Onboarding Flow (Goals & Preferences)
description: |
  This event is triggered after the user selects the Goals & Preferences option from the side drawer (via event.open_goals_preferences). It launches the onboarding flow with the user's current data pre-filled, allowing them to update dietary preferences, user info, tracking goals, and cooking/shopping habits.

preconditions:
  screens:
    - screen.dashboard: state.dashboard_default
  components:
    - component.side_drawer: state.closed

trigger:
  trigger_type: system_event
  component: null
  screen: screen.dashboard

api_request:
  endpoint: api.user_preferences.GET
  method: GET
  url: /api/user/preferences

db_interactions:
  relational:
    - table.user_profile:
        actions:
          - "Fetch current user preferences and goals for pre-filling."
  graph:
    - node.user:
        actions:
          - "Read user goal relationships."

state_changes:
  components: []
  screens:
    - screen.onboarding:
        state: state.onboarding_restart
        description: "Onboarding flow is launched, pre-filled with current user data."

navigation:
  - screen.onboarding

next_possible_events:
  - event.complete_onboarding

responses:
  - "Onboarding flow launched with pre-filled user data."
  - "User can update their goals and preferences."
---
