---
type: event
id: event.open_settings_section
feature_id: feature.dashboard
title: Open Account Settings Section
description: |
  Triggered when the user selects the Account option from the dashboard side drawer. Navigates to the account settings screen for managing profile and account details.

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
  endpoint: api.user_profile.GET
  method: GET
  url: /api/user/profile

db_interactions:
  relational:
    - table.user_profile:
        actions:
          - "Fetch user profile details."
  graph:
    - node.user:
        actions:
          - "Read profile relationships."

state_changes:
  components:
    - component.side_drawer:
        state: state.closed
        description: "Side drawer closes after selection."
  screens:
    - screen.profile_account:
        state: state.profile_account_open
        description: "Profile/account settings screen is displayed."

navigation:
  - screen.profile_account

next_possible_events:
  - event.manage_profile

responses:
  - "Profile/account settings loaded."
  - "User can manage account details."
---
