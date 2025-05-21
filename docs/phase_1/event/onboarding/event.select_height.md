---
type: event
id: event.select_height
feature_id: feature.onboarding_flow
title: User Selects Height on Onboarding
description: |
  This event is triggered when the user selects their height using a wheel picker on the User Info onboarding screen. The app updates the local onboarding state with the selected height and enables the Next button if all required fields are filled.

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
        description: "Updates local state with selected height."
    - component.next_screen_button:
        state: state.enabled
        description: "Enables Next button if all required fields are filled."
  screens:
    - screen.user_info:
        state: state.height_selected
        description: "Screen reflects the user's selected height."

navigation: []

next_possible_events:
  - event.go_to_next_page
  - event.select_height

responses:
  - Updates onboarding state with selected height.
  - Enables Next button if all required fields are filled.
---
