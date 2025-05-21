---
type: event
id: event.browse_meal_history
feature_id: feature.meal_plan_calendar
title: User Browses Meal History
description: |
  This event is triggered when the user taps the "History" icon or menu item to view a list of past meals or recipes they've logged. The app fetches historical meal data from the backend and displays it in a list or grid, with options to filter, expand, or re-plan meals.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
  components:
    - component.floating_action_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.floating_action_button
  screen: screen.meal_planning_tab

api_request:
  endpoint: api.user-meal-history.GET
  method: GET
  url: /api/user-meal-history?user_id=<user_id>&start=<start>&end=<end>

db_interactions:
  relational:
    - table.user_meal_plan:
        actions:
          - "Query for user's historical meal data over a given date range."
    - table.recipes:
        actions:
          - "Join with recipes for metadata."
    - table.tags:
        actions:
          - "Filter by tags if provided."
  graph:
    - node.user:
        actions:
          - "Traverse :LOGGED edges to Recipe nodes."

state_changes:
  components:
    - component.meal_history_list:
        state: state.loaded
        description: "Displays list or grid of past meals."
  screens:
    - screen.meal_planning_tab:
        state: state.history_view
        description: "Meal plan tab displays meal history view."

navigation: []

next_possible_events:
  - event.add_favorite_meal_to_plan
  - event.add_from_pantry

responses:
  - Fetches and displays user's meal history.
  - Allows filtering, expanding, or re-planning meals from history.
---
