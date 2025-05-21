---
type: screen
id: screen.user_info
title: User Info
description: |
  Onboarding screen where the user enters demographic and physical information (gender, age, height, weight, activity level).
route: /onboarding/user-info

states:
  - state.rendered
  - state.gender_selected
  - state.age_selected
  - state.height_selected
  - state.weight_selected
  - state.activity_level_selected

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_gender
    - event.select_age
    - event.select_height
    - event.select_weight
    - event.go_to_next_page
    - event.go_to_previous_page
  component:
    - component.multi_select_button_group
    - component.wheel_picker
    - component.next_screen_button

design_system_reference: [design_system]
---
