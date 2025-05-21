---
type: screen
id: screen.workouts_per_week
title: Workouts Per Week Selection
description: |
  Screen in the onboarding flow where the user selects how many workouts they do per week. Used to personalize macro and calorie recommendations.
route: /onboarding/workouts-per-week

states:
  - state.awaiting_workouts_per_week_selection
  - state.workouts_per_week_selected

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_workouts_per_week
  component:
    - component.multi_select_button_group

design_system_reference: [design_system]
---
