---
type: event
id: event.go_to_previous_page
feature_id: feature.onboarding_flow
title: User Navigates to Previous Onboarding Page
description: |
  This event is triggered when the user taps the "Back" button during the onboarding flow. The app navigates to the previous onboarding screen, restoring any previously entered input for that screen.

preconditions:
  screens:
    - screen.user_info: state.rendered
    - screen.tracking_goals: state.rendered
    - screen.dietary_preferences: state.rendered
    - screen.cooking_shopping: state.rendered
    - screen.complete_onboarding: state.rendered
  components:
    - component.go_back_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.go_back_button
  screen: screen.user_info

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.go_back_button:
        state: state.loading
        description: "Back button shows loading state while processing."
    - component.input_field:
        state: state.restored
        description: "Restores previously entered input for the previous screen."
  screens:
    - screen.user_info:
        state: state.rendered
        description: "Previous onboarding screen is rendered."
    - screen.tracking_goals:
        state: state.rendered
        description: "Previous onboarding screen is rendered."
    - screen.dietary_preferences:
        state: state.rendered
        description: "Previous onboarding screen is rendered."
    - screen.cooking_shopping:
        state: state.rendered
        description: "Previous onboarding screen is rendered."
    - screen.define_goal:
        state: state.rendered
        description: "Previous onboarding screen is rendered."

navigation:
  - screen.define_goal
  - screen.user_info
  - screen.tracking_goals
  - screen.dietary_preferences
  - screen.cooking_shopping

next_possible_events:
  - event.go_to_next_page
  - event.go_to_previous_page
  - event.complete_onboarding

responses:
  - Navigates to the previous onboarding screen.
  - Restores any previously entered input for that screen.
  - Shows loading state on Back button while processing.
---
