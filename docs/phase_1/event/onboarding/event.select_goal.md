---
type: event
id: event.select_goal
feature_id: feature.onboarding_flow
title: User Selects Goal on Onboarding
description: |
  This event is triggered when the user selects one or more goals (e.g., Lose Weight, Gain Muscle, Save Money) on the Define Goal onboarding screen. The app updates the local onboarding state with the selected goals and enables the Next button if at least one goal is selected.

preconditions:
  screens:
    - screen.define_goal: state.rendered
  components:
    - component.multi_select_button_group: state.idle

trigger:
  trigger_type: user_action
  component: component.multi_select_button_group
  screen: screen.define_goal

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.multi_select_button_group:
        state: state.updated
        description: "Updates local state with selected goals."
    - component.next_screen_button:
        state: state.enabled
        description: "Enables Next button if at least one goal is selected."
  screens:
    - screen.define_goal:
        state: state.goal_selected
        description: "Screen reflects the user's selected goals."

navigation: []

next_possible_events:
  - event.go_to_next_page
  - event.select_goal

responses:
  - Updates onboarding state with selected goals.
  - Enables Next button if at least one goal is selected.
---
