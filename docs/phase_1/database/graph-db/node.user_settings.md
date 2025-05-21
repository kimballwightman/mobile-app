---
type: node
id: node.user_settings
title: User Settings
description: |
  Represents a user's settings and preferences in the graph database.

properties:
  - id: user_id
    type: uuid
    description: Reference to the user.
  - id: notifications
    type: boolean
    description: Whether notifications are enabled.
  - id: theme
    type: string
    description: User's selected theme (e.g., light, dark).

edges:
  - type: HAS_SETTINGS
    to_node: node.user
    direction: outbound
    description: Links user settings to the user.

related:
  feature:
    - feature.dashboard
  event:
    - event.open_settings_section
  screen:
    - screen.dashboard
  component:
    - component.dashboard_top_bar
  api_endpoint:
    - endpoint.user_settings.GET
  db:
    relational:
      - table.user_settings
--- 