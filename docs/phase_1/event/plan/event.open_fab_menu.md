---
type: event
id: event.open_fab_menu
feature_id: feature.meal_plan_calendar
title: Open FAB Menu
description: |
  Triggered when the user taps the Floating Action Button (FAB) on the meal plan calendar screen. Opens the menu for quick actions like Plan My Week, Add from Favorites, Browse Meal History, and Use from Pantry.

preconditions:
  screens:
    - screen.meal_planning_tab: state.default
  components:
    - component.floating_action_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.floating_action_button
  screen: screen.meal_planning_tab

api_request:
  endpoint: null
  method: null
  url: null

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.fab_plan_my_week:
        state: state.visible
        description: "FAB menu becomes visible with available actions."
  screens:
    - screen.meal_planning_tab:
        state: state.fab_menu_open
        description: "FAB menu overlay is shown."

navigation:
  - screen.meal_planning_tab

next_possible_events:
  - event.plan_my_week
  - event.add_from_favorites
  - event.browse_meal_history
  - event.use_from_pantry

responses:
  - FAB menu is displayed with available actions.
--- 