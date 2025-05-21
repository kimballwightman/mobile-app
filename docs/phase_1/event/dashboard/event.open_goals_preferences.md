---
type: event
id: event.open_goals_preferences
feature_id: feature.dashboard
title: Open Goals & Preferences Section
description: |
  Triggered when the user selects the Goals & Preferences option from the dashboard side drawer. Navigates to the onboarding flow to allow the user to update their goals and preferences. This event triggers the restart_onboarding_flow event.

preconditions:
  screens:
    - screen.dashboard: state.dashboard_default
  components:
    - component.side_drawer: state.open

trigger:
  trigger_type: user_action
  component: component.side_drawer
  screen: screen.dashboard

api_request:
  endpoint: api.users_preferences_goal.PUT
  method: PUT
  url: /api/users/preferences/goal

db_interactions:
  relational:
    - table.user_profile:
        actions:
          - "Fetch and update user goals and preferences."
  graph:
    - node.user:
        actions:
          - "Read and update goal relationships."

state_changes:
  components:
    - component.side_drawer:
        state: state.closed
        description: "Side drawer closes after selection."
  screens:
    - screen.onboarding_flow:
        state: state.onboarding_restart
        description: "Onboarding flow is restarted for goal/preference update."

navigation:
  - screen.onboarding_flow

next_possible_events:
  - event.restart_onboarding_flow

responses:
  - "User is taken to onboarding flow to update goals and preferences."
  - "The restart_onboarding_flow event is triggered to begin the goals and preferences update process."
---
