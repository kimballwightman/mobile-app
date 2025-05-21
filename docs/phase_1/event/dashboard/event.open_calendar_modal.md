---
type: event
id: event.open_calendar_modal
feature_id: feature.dashboard
title: Open Calendar Modal
description: |
  Triggered when the user taps the date in the dashboard top bar. Opens the calendar modal for selecting a different date to view dashboard data.

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
    - component.calendar_modal:
        state: state.open
        description: "Calendar modal opens for date selection."
  screens:
    - screen.dashboard:
        state: state.dashboard_default
        description: "Dashboard remains open."

navigation:
  - screen.dashboard

next_possible_events:
  - event.change_dashboard_date

responses:
  - "Calendar modal is visible."
  - "User can select a new date."
---
