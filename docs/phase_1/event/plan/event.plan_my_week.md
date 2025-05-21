---
type: event
id: event.plan_my_week
feature_id: feature.meal_plan_calendar
title: Plan My Week
description: |
  Triggered when the user selects "Plan My Week" from the FAB menu. Automatically generates a meal plan for the week based on user preferences and available pantry items.

preconditions:
  screens:
    - screen.meal_planning_tab: state.fab_menu_open
  components:
    - component.fab_plan_my_week: state.selected

trigger:
  trigger_type: user_action
  component: component.fab_plan_my_week
  screen: screen.meal_planning_tab

api_request:
  endpoint: api.user-meal-plan_auto_generate
  method: POST
  url: /api/user-meal-plan/auto-generate

db_interactions:
  relational:
    - table.user_meal_plan:
        actions:
          - "Insert or update meal plan for the week"
  graph:
    - node.user:
        actions:
          - "Reference user preferences and pantry items"

state_changes:
  components:
    - component.meal_calendar_grid:
        state: state.updated
        description: "Meal calendar grid is populated with the new plan."
  screens:
    - screen.meal_planning_tab:
        state: state.plan_generated
        description: "Screen reflects the new meal plan."

navigation:
  - screen.meal_planning_tab

next_possible_events:
  - event.add_from_favorites
  - event.browse_meal_history
  - event.use_from_pantry

responses:
  - Meal plan is auto-generated and displayed on the calendar.
--- 