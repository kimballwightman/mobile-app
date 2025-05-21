---
type: table
id: table.user_integrations
title: User Integrations
description: |
  Stores records of integrations connected to each user's account.

fields:
  - id: id
    type: uuid
    description: Unique identifier for the integration record.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [not null, foreign key]
  - id: integration_id
    type: string
    description: Identifier for the integration (e.g., fitbit, apple_health).
    constraints: [not null]
  - id: connected
    type: boolean
    description: Whether the integration is currently connected.
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
    - event.open_integrations
  screen:
    - screen.dashboard
  component:
    - component.integration_tile
  api_endpoint:
    - endpoint.user_integrations.GET
  db:
    graph:
      - node.user_integration
--- 