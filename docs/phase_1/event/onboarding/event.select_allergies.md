---
type: event
id: event.select_allergies
feature_id: feature.onboarding_flow
title: User Selects Allergies on Onboarding
description: |
  This event is triggered when the user selects one or more allergies (e.g., nuts, gluten, dairy) using a multi-select button group on the Dietary Preferences onboarding screen. The app updates the local onboarding state with the selected allergies and enables the Next button if at least one is selected.

preconditions:
  screens:
    - screen.dietary_preferences: state.rendered
  components:
    - component.multi_select_button_group: state.idle

trigger:
  trigger_type: user_action
  component: component.multi_select_button_group
  screen: screen.dietary_preferences

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.multi_select_button_group:
        state: state.updated
        description: "Updates local state with selected allergies."
    - component.next_screen_button:
        state: state.enabled
        description: "Enables Next button if at least one allergy is selected."
  screens:
    - screen.dietary_preferences:
        state: state.allergies_selected
        description: "Screen reflects the user's selected allergies."

navigation: []

next_possible_events:
  - event.go_to_next_page
  - event.select_allergies

responses:
  - Updates onboarding state with selected allergies.
  - Enables Next button if at least one allergy is selected.
---
