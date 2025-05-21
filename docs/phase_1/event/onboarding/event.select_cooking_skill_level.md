---
type: event
id: event.select_cooking_skill_level
feature_id: feature.onboarding_flow
title: User Selects Cooking Skill Level on Onboarding
description: |
  This event is triggered when the user selects their cooking skill level (e.g., Beginner, Intermediate, Advanced) using a multi-select button group on the Cooking & Shopping onboarding screen. The app updates the local onboarding state with the selected skill level and enables the Next button if a selection is made.

preconditions:
  screens:
    - screen.cooking_shopping: state.rendered
  components:
    - component.multi_select_button_group: state.idle

trigger:
  trigger_type: user_action
  component: component.multi_select_button_group
  screen: screen.cooking_shopping

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.multi_select_button_group:
        state: state.updated
        description: "Updates local state with selected cooking skill level."
    - component.next_screen_button:
        state: state.enabled
        description: "Enables Next button if a skill level is selected."
  screens:
    - screen.cooking_shopping:
        state: state.cooking_skill_level_selected
        description: "Screen reflects the user's selected cooking skill level."

navigation: []

next_possible_events:
  - event.go_to_next_page
  - event.select_cooking_skill_level

responses:
  - Updates onboarding state with selected cooking skill level.
  - Enables Next button if a skill level is selected.
---
