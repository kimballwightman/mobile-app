---
type: event
id: event.select_activity_level
feature_id: feature.onboarding_flow
title: User Selects Activity Level on Onboarding
description: This event is triggered when the user selects their activity level (e.g., Not at All, Lightly Active, Moderately Active, Very Active, Extremely Active) using a multi-select button group on the User Info onboarding screen. The app updates the local onboarding state with the selected activity level and enables the Next button if a selection is made.
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
        description: Updates local state with selected activity level.
    - component.next_screen_button:
        state: state.enabled
        description: Enables Next button if an activity level is selected.
  screens:
    - screen.user_info:
        state: state.activity_level_selected
        description: Screen reflects the user's selected activity level.
navigation: 
next_possible_events:
  - event.go_to_next_page
  - event.select_activity_level
responses:
  - Updates onboarding state with selected activity level.
  - Enables Next button if an activity level is selected.
---
