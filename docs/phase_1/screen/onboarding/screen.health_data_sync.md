---
type: screen
id: screen.health_data_sync
title: Health Data Sync
description: |
  Screen in the onboarding flow where the user can connect and sync health data from Apple Health or other wearables. Used to autofill user info and personalize recommendations.
route: /onboarding/health-data-sync

states:
  - state.awaiting_health_data_sync
  - state.health_data_synced

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.sync_health_data
  component:
    - component.toggle_bar

design_system_reference: [design_system]
---
