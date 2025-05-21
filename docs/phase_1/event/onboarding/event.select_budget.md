---
type: event
id: event.select_budget
feature_id: feature.onboarding_flow
title: User Selects Budget Range on Onboarding
description: |
  This event is triggered when the user selects a budget range using a horizontal slider on the Cooking & Shopping onboarding screen. The app updates the local onboarding state with the selected budget range and enables the Next button if a valid range is selected.

preconditions:
  screens:
    - screen.cooking_shopping: state.rendered
  components:
    - component.range_slider: state.idle

trigger:
  trigger_type: user_action
  component: component.range_slider
  screen: screen.cooking_shopping

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.range_slider:
        state: state.updated
        description: "Updates local state with selected budget range."
    - component.next_screen_button:
        state: state.enabled
        description: "Enables Next button if a valid budget range is selected."
  screens:
    - screen.cooking_shopping:
        state: state.budget_selected
        description: "Screen reflects the user's selected budget range."

navigation: []

next_possible_events:
  - event.go_to_next_page
  - event.select_budget

responses:
  - Updates onboarding state with selected budget range.
  - Enables Next button if a valid budget range is selected.
---
