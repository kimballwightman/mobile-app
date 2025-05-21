---
type: node
id: node.user_integration
title: User Integration
description: |
  Represents an integration connected to a user's account in the graph database.

properties:
  - id: user_id
    type: uuid
    description: Reference to the user.
  - id: integration_id
    type: string
    description: Identifier for the integration (e.g., fitbit, apple_health).
  - id: connected
    type: boolean
    description: Whether the integration is currently connected.

edges:
  - type: CONNECTED_TO
    to_node: node.user
    direction: outbound
    description: Links user integration to the user.

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
    relational:
      - table.user_integrations
--- 