---
type: event
id: event.go_to_next_page
feature_id: feature.onboarding_flow
title: User Advances to Next Onboarding Page
description: |
  This event is triggered when the user taps the "Next" button during the onboarding flow. The app validates the current screen's input (if required), updates onboarding progress, and navigates to the next onboarding screen.

preconditions:
  screens:
    - screen.define_goal: state.rendered
    - screen.user_info: state.rendered
    - screen.tracking_goals: state.rendered
    - screen.dietary_preferences: state.rendered
    - screen.cooking_shopping: state.rendered
    - screen.complete_onboarding: state.rendered
  components:
    - component.next_screen_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.next_screen_button
  screen: screen.define_goal

api_request: {}

db_interactions:
  relational:
    - table.users:
        actions:
          - "Update onboarding progress for user."
  graph: []

state_changes:
  components:
    - component.next_screen_button:
        state: state.loading
        description: "Next button shows loading state while processing."
    - component.input_field:
        state: state.validated
        description: "Current screen's input is validated before advancing."
  screens:
    - screen.define_goal:
        state: state.completed
        description: "Current onboarding screen is marked as completed."
    - screen.user_info:
        state: state.rendered
        description: "Next onboarding screen is rendered."
    - screen.tracking_goals:
        state: state.rendered
        description: "Next onboarding screen is rendered."
    - screen.dietary_preferences:
        state: state.rendered
        description: "Next onboarding screen is rendered."
    - screen.cooking_shopping:
        state: state.rendered
        description: "Next onboarding screen is rendered."
    - screen.complete_onboarding:
        state: state.rendered
        description: "Next onboarding screen is rendered."

navigation:
  - screen.user_info
  - screen.tracking_goals
  - screen.dietary_preferences
  - screen.cooking_shopping
  - screen.complete_onboarding

next_possible_events:
  - event.go_to_next_page
  - event.go_to_previous_page
  - event.complete_onboarding

responses:
  - Validates current screen's input (if required).
  - Updates onboarding progress for the user.
  - Navigates to the next onboarding screen.
  - Shows loading state on Next button while processing.
---
