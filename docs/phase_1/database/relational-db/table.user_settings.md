---
type: table
id: table.user_settings
title: User Settings
description: |
  Stores user-specific settings and preferences, such as notification options and theme.

fields:
  - id: id
    type: uuid
    description: Unique identifier for the settings record.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [not null, foreign key]
  - id: notifications
    type: boolean
    description: Whether notifications are enabled.
    constraints: [not null]
  - id: theme
    type: string
    description: User's selected theme (e.g., light, dark).
    constraints: [not null]
  - id: created_at
    type: timestamp
    description: Record creation timestamp.
    constraints: [not null]
  - id: updated_at
    type: timestamp
    description: Record last update timestamp.
    constraints: [not null]

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
    graph:
      - node.user_settings
--- 