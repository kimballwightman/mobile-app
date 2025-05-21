---
type: event
id: event.set_calorie_goal
feature_id: feature.onboarding_flow
title: User Sets Calorie Goal on Onboarding
description: |
  This event is triggered when the user enters or adjusts their calorie goal on the Tracking Goals onboarding screen. The app updates the local onboarding state with the entered calorie value and validates that it is a positive number. Inline errors are shown for missing or invalid values.

preconditions:
  screens:
    - screen.tracking_goals: state.rendered
  components:
    - component.input_field: state.idle

trigger:
  trigger_type: user_action
  component: component.input_field
  screen: screen.tracking_goals

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.input_field:
        state: state.updated
        description: "Updates local state with entered calorie goal."
    - component.input_field:
        state: state.validated
        description: "Validates that calorie goal is a positive number."
    - component.input_field:
        state: state.error
        description: "Shows inline error if value is missing or invalid."
    - component.next_screen_button:
        state: state.enabled
        description: "Enables Next button if all required fields are valid."
  screens:
    - screen.tracking_goals:
        state: state.calorie_goal_set
        description: "Screen reflects the user's entered calorie goal."

navigation: []

next_possible_events:
  - event.go_to_next_page
  - event.set_calorie_goal

responses:
  - Updates onboarding state with entered calorie goal.
  - Validates input and shows errors for missing or invalid values.
  - Enables Next button if all required fields are valid.
---
