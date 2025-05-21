---
type: event
id: event.select_age
feature_id: feature.onboarding_flow
title: User Selects Age on Onboarding
description: |
  This event is triggered when the user selects their age using a wheel picker on the User Info onboarding screen. The app updates the local onboarding state with the selected age and enables the Next button if all required fields are filled.

preconditions:
  screens:
    - screen.user_info: state.rendered
  components:
    - component.wheel_picker: state.idle

trigger:
  trigger_type: user_action
  component: component.wheel_picker
  screen: screen.user_info

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.wheel_picker:
        state: state.updated
        description: "Updates local state with selected age."
    - component.next_screen_button:
        state: state.enabled
        description: "Enables Next button if all required fields are filled."
  screens:
    - screen.user_info:
        state: state.age_selected
        description: "Screen reflects the user's selected age."

navigation: []

next_possible_events:
  - event.go_to_next_page
  - event.select_age

responses:
  - Updates onboarding state with selected age.
  - Enables Next button if all required fields are filled.
---
