---
type: event
id: event.select_swap_level
feature_id: feature.expanded_meal_view
title: User Drills Down Swap Levels in Expanded Meal View
description: |
  This event is triggered when the user taps filter pills above the food swap table in swap mode, drilling down through categories, types, brands, and stores to compare swap options. The app updates the swap grid to reflect the selected filter level and shows relevant swap candidates.

preconditions:
  screens:
    - screen.explore_grid: state.swap_mode
    - screen.meal_planning_tab: state.swap_mode
  components:
    - component.swap_grid: state.visible
    - component.filter_pill: state.idle

trigger:
  trigger_type: user_action
  component: component.filter_pill
  screen: screen.explore_grid

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.filter_pill:
        state: state.selected
        description: "Selected filter pill is highlighted."
    - component.swap_grid:
        state: state.filtered
        description: "Swap grid updates to show candidates for the selected filter level."
  screens:
    - screen.explore_grid:
        state: state.swap_mode
        description: "Explore screen displays updated swap grid."
    - screen.meal_planning_tab:
        state: state.swap_mode
        description: "Plan tab displays updated swap grid."

navigation: []

next_possible_events:
  - event.select_food_swap
  - event.select_swap_level
  - event.expand_meal_card

responses:
  - Updates swap grid to show candidates for the selected filter level.
  - Highlights selected filter pill.
---
