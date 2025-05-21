---
type: event
id: event.select_gender
feature_id: feature.onboarding_flow
title: User Selects Gender on Onboarding
description: |
  This event is triggered when the user selects a gender (e.g., Male, Female, Other) on the User Info onboarding screen. The app updates the local onboarding state with the selected gender and enables the Next button if a selection is made.

preconditions:
  screens:
    - screen.user_info: state.rendered
  components:
    - component.multi_select_button_group: state.idle

trigger:
  trigger_type: user_action
  component: component.multi_select_button_group
  screen: screen.user_info

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.multi_select_button_group:
        state: state.updated
        description: "Updates local state with selected gender."
    - component.next_screen_button:
        state: state.enabled
        description: "Enables Next button if a gender is selected."
  screens:
    - screen.user_info:
        state: state.gender_selected
        description: "Screen reflects the user's selected gender."

navigation: []

next_possible_events:
  - event.go_to_next_page
  - event.select_gender

responses:
  - Updates onboarding state with selected gender.
  - Enables Next button if a gender is selected.
---
