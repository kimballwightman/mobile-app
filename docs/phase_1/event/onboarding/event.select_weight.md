---
type: event
id: event.select_weight
feature_id: feature.onboarding_flow
title: Select Weight
description: |
  User selects their weight during onboarding. This event is triggered when the user interacts with the weight picker and confirms their selection. It updates the onboarding state and may autofill related fields if health data is synced.

preconditions:
  screens:
    - screen.user_info: state.awaiting_weight
  components:
    - component.wheel_picker: state.active

trigger:
  trigger_type: user_action
  component: component.wheel_picker
  screen: screen.user_info

api_request:
  endpoint: api.users_preferences_user-info.PUT
  method: PUT
  url: /api/users/preferences/user-info

db_interactions:
  relational:
    - table.user_profile:
        actions:
          - "Update user weight field"
  graph:
    - node.user:
        actions:
          - "Set weight property"

state_changes:
  components:
    - component.wheel_picker:
        state: state.weight_selected
        description: "Wheel picker updates to show selected weight."
  screens:
    - screen.user_info:
        state: state.weight_selected
        description: "User info screen updates to reflect selected weight."

navigation:
  - screen.user_info
  - screen.workouts_per_week

next_possible_events:
  - event.go_to_next_page

responses:
  - "Weight value saved to user profile."
  - "Onboarding flow advances to next step."
---
