---
type: screen
id: screen.connect_to_apple_health
title: Connect to Apple Health
description: |
  Screen in the onboarding flow where the user can connect and sync with Apple Health. When synced, this data is used to autofill user info (gender, height, weight) and workout information in subsequent screens.
route: /onboarding/connect-to-apple-health

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