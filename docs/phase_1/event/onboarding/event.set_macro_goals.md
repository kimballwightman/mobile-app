---
type: event
id: event.set_macro_goals
feature_id: feature.onboarding_flow
title: User Sets Macro Goals on Onboarding
description: |
  This event is triggered when the user enters or adjusts their macro goals (carbs, fat, protein) on the Tracking Goals onboarding screen. The app updates the local onboarding state with the entered macro values and validates that all are positive numbers. Inline errors are shown for missing or invalid values.

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
        description: "Updates local state with entered macro goals."
    - component.input_field:
        state: state.validated
        description: "Validates that all macro goals are positive numbers."
    - component.input_field:
        state: state.error
        description: "Shows inline error if any value is missing or invalid."
    - component.next_screen_button:
        state: state.enabled
        description: "Enables Next button if all required fields are valid."
  screens:
    - screen.tracking_goals:
        state: state.macro_goals_set
        description: "Screen reflects the user's entered macro goals."

navigation: []

next_possible_events:
  - event.go_to_next_page
  - event.set_macro_goals

responses:
  - Updates onboarding state with entered macro goals.
  - Validates input and shows errors for missing or invalid values.
  - Enables Next button if all required fields are valid.
---
