---
type: screen
id: screen.integrations
title: Integrations
description: |
  Screen where users can manage connections with wearables, health data services, and grocery store accounts.
route: /settings/integrations

states:
  - state.rendered
  - state.loading
  - state.error

related:
  feature:
    - feature.settings_management
  event:
    - event.open_integrations
  component:
    - component.settings_list
    - component.integration_tile
    - component.toggle_switch

design_system_reference: [design_system]
---
