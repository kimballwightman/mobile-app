---
type: event
id: event.open_side_drawer
feature_id: feature.dashboard
title: Open Side Drawer
description: |
  Triggered when the user taps the profile picture in the top-left of the dashboard screen. Opens the side drawer for navigation to account, integrations, goals, notifications, and payments.

preconditions:
  screens:
    - screen.dashboard: state.dashboard_default
  components:
    - component.dashboard_top_bar: state.default

trigger:
  trigger_type: user_action
  component: component.dashboard_top_bar
  screen: screen.dashboard

api_request:
  endpoint: null
  method: null
  url: null

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.side_drawer:
        state: state.open
        description: "Side drawer opens for navigation."
  screens:
    - screen.dashboard:
        state: state.dashboard_default
        description: "Dashboard remains open."

navigation:
  - screen.dashboard

next_possible_events:
  - event.open_settings_section
  - event.open_integrations
  - event.open_goals_preferences
  - event.open_notifications
  - event.open_payments

responses:
  - "Side drawer is visible."
  - "User can select navigation options."
---
