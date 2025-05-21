---
type: screen
id: screen.define_goal
title: Define Your Goal
description: |
  Onboarding screen where the user selects a goal (e.g., Cut, Maintain, Bulk) as the first step in onboarding.
route: /onboarding/define-goal

states:
  - state.rendered
  - state.goal_selected

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_goal
    - event.go_to_next_page
    - event.go_to_previous_page
  component:
    - component.multi_select_button_group
    - component.next_screen_button

design_system_reference: [design_system]
---
