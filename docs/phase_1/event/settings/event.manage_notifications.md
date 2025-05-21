---
type: event
id: event.manage_notifications
feature_id: feature.settings_management
title: Manage Notification Preferences
description: |
  This event is triggered when the user selects the Notifications option from the side drawer and interacts with the Notification Settings screen to configure which notifications they want to receive.

preconditions:
  screens:
    - screen.notification_settings: state.rendered
  components:
    - component.notification_toggle_list: state.loaded

trigger:
  trigger_type: user_action
  component: component.notification_toggle
  screen: screen.notification_settings

api_request:
  endpoint: endpoint.api.notification_preferences.PATCH
  method: PATCH
  url: /api/notification-preferences

db_interactions:
  relational:
    - table.user_preferences:
        actions:
          - "Update user notification preferences."
  graph: []

state_changes:
  components:
    - component.notification_toggle:
        state: state.toggled
        description: "Notification toggle is updated."
  screens:
    - screen.notification_settings:
        state: state.preferences_updated
        description: "Notification Settings screen reflects updated preferences."

navigation: []

next_possible_events:
  - event.update_notification_preferences

responses:
  - "Notification preferences updated successfully."
  - "User will receive notifications based on their preferences."
---
