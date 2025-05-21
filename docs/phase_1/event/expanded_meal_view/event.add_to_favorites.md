---
type: event
id: event.add_to_favorites
feature_id: feature.expanded_meal_view
title: User Favorites a Meal in Expanded View
description: |
  This event is triggered when the user taps the heart icon in the expanded meal view modal. The app sends a request to the backend to add the meal to the user's favorites and updates the UI to reflect the favorited state.

preconditions:
  screens:
    - screen.explore_grid: state.expanded_modal
    - screen.meal_planning_tab: state.expanded_modal
  components:
    - component.meal_card: state.expanded

trigger:
  trigger_type: user_action
  component: component.meal_card
  screen: screen.explore_grid

api_request:
  endpoint: api.favorites_user-id.GET
  method: GET
  url: /api/favorites/<user_id>

  # If favoriting is a POST, use POST /api/favorites

db_interactions:
  relational:
    - table.user_favorites:
        actions:
          - "Add meal to user's favorites."
  graph:
    - node.user:
        actions:
          - "Create/Update :FAVORITES relationship to recipe node."

state_changes:
  components:
    - component.meal_card:
        state: state.favorited
        description: "Heart icon is filled and meal is marked as favorited."
  screens:
    - screen.explore_grid:
        state: state.expanded_modal
        description: "Expanded meal modal remains open."
    - screen.meal_planning_tab:
        state: state.expanded_modal
        description: "Expanded meal modal remains open."

navigation: []

next_possible_events:
  - event.add_to_favorites
  - event.expand_meal_card

responses:
  - Adds meal to user's favorites in backend.
  - Updates UI to show favorited state.
---
