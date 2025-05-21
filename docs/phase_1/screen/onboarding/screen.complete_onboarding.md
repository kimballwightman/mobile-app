---
type: screen
id: screen.complete_onboarding
title: Onboarding Completion
description: |
  The final onboarding screen where the user confirms their preferences and completes the onboarding flow. Displays a confirmation message and a button to enter the main app.
route: /onboarding/complete

states:
  - state.rendered
  - state.completed

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.complete_onboarding
  component:
    - component.next_screen_button

design_system_reference: [design_system]
---
