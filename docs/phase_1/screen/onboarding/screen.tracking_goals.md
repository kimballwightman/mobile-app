---
type: screen
id: screen.tracking_goals
title: Tracking Goals
description: |
  Onboarding screen where the user sets calorie and macro goals (carbs, fat, protein) for nutrition tracking.
route: /onboarding/tracking-goals

states:
  - state.rendered
  - state.calorie_goal_set
  - state.macro_goals_set
  - state.error

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.set_calorie_goal
    - event.set_macro_goals
    - event.go_to_next_page
    - event.go_to_previous_page
  component:
    - component.input_field
    - component.wheel_picker
    - component.next_screen_button

design_system_reference: [design_system]
---
