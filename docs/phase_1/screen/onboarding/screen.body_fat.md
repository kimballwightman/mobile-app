---
type: screen
id: screen.body_fat
title: Body Fat % Selection
description: |
  Screen in the onboarding flow where the user selects their body fat percentage from a set of options. Used to personalize macro and calorie recommendations.
route: /onboarding/body-fat

states:
  - state.awaiting_body_fat_selection
  - state.body_fat_selected

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_body_fat
  component:
    - component.multi_select_button_group

design_system_reference: [design_system]
---
