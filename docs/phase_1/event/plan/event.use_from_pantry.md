---
type: event
id: event.use_from_pantry
feature_id: feature.meal_plan_calendar
title: Use From Pantry
description: |
  Triggered when the user selects "Use from Pantry" from the FAB menu. Allows the user to add foods from their pantry to a meal slot in the calendar.

preconditions:
  screens:
    - screen.meal_planning_tab: state.fab_menu_open
  components:
    - component.fab_plan_my_week: state.menu_open

trigger:
  trigger_type: user_action
  component: component.fab_plan_my_week
  screen: screen.meal_planning_tab

api_request:
  endpoint: api.pantry.GET
  method: GET
  url: /api/pantry

db_interactions:
  relational:
    - table.pantry_items:
        actions:
          - "Fetch user's pantry items"
  graph: []

state_changes:
  components:
    - component.searchable_drop_down:
        state: state.visible
        description: "Dropdown for selecting pantry item is shown."
  screens:
    - screen.meal_planning_tab:
        state: state.adding_from_pantry
        description: "Screen overlays pantry item picker."

navigation:
  - screen.meal_planning_tab

next_possible_events:
  - event.add_from_pantry

responses:
  - User can select a pantry item to add to the plan.
--- 