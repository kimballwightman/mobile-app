---
type: event
id: event.add_from_favorites
feature_id: feature.meal_plan_calendar
title: Add From Favorites
description: |
  Triggered when the user selects "Add from Favorites" from the FAB menu. Allows the user to pick a favorite meal to add to a specific slot in the meal plan calendar.

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
  endpoint: api.favorites_user-id.GET
  method: GET
  url: /api/favorites/{user-id}

db_interactions:
  relational:
    - table.user_favorites:
        actions:
          - "Fetch user's favorite meals"
  graph:
    - node.user:
        actions:
          - "Reference user favorites"

state_changes:
  components:
    - component.searchable_drop_down:
        state: state.visible
        description: "Dropdown for selecting favorite meal is shown."
  screens:
    - screen.meal_planning_tab:
        state: state.adding_favorite
        description: "Screen overlays favorite meal picker."

navigation:
  - screen.meal_planning_tab

next_possible_events:
  - event.add_favorite_meal_to_plan

responses:
  - User can select a favorite meal to add to the plan.
--- 