---
type: event
id: event.open_notifications
feature_id: feature.dashboard
title: Open Notifications Section
description: |
  Triggered when the user selects the Notifications option from the dashboard side drawer. Navigates to the notification settings screen for managing meal reminders, pantry alerts, and other notifications.

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
  endpoint: api.user_notifications.GET
  method: GET
  url: /api/user/notifications

db_interactions:
  relational:
    - table.user_notifications:
        actions:
          - "Fetch user notification settings."
  graph:
    - node.user:
        actions:
          - "Read notification relationships."

state_changes:
  components:
    - component.side_drawer:
        state: state.closed
        description: "Side drawer closes after selection."
  screens:
    - screen.notification_settings:
        state: state.notification_settings_open
        description: "Notification settings screen is displayed."

navigation:
  - screen.notification_settings

next_possible_events:
  - event.manage_notifications

responses:
  - "Notification settings loaded."
  - "User can manage notification preferences."
---
