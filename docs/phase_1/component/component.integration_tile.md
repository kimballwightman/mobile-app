---
type: component
id: component.integration_tile
title: Integration Tile
component_type: custom
description: |
  Tile component for displaying and managing integrations with external services (e.g., Apple Health, grocery stores, wearables).

properties:
  - name: serviceName
    type: string
    description: "Name of the integration service."
  - name: connected
    type: boolean
    description: "Whether the integration is currently connected."
  - name: onConnect
    type: function
    description: "Callback to connect the integration."
  - name: onDisconnect
    type: function
    description: "Callback to disconnect the integration."

states:
  - state.connected
  - state.disconnected

related:
  feature:
    - feature.dashboard
  event:
    - event.open_integrations
  screen:
    - screen.integrations

design_system_reference: [design_system]
---
