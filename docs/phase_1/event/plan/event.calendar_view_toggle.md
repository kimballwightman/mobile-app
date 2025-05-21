---
type: event
id: event.calendar_view_toggle
feature_id: feature.meal_plan_calendar
title: Toggle Calendar View
description: |
  Triggered when the user toggles between different calendar views (day, 3-day) in the meal plan calendar. Updates the calendar grid and macro bar for the selected view.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
  components:
    - component.segmented_control: state.enabled
    - component.meal_calendar_grid: state.loaded

trigger:
  trigger_type: user_action
  component: component.segmented_control
  screen: screen.meal_planning_tab

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.meal_calendar_grid:
        state: state.updated
        description: "Calendar grid updates to show the selected view."
    - component.macro_bar:
        state: state.updated
        description: "Macro and calorie bars update for the new view."
  screens:
    - screen.meal_planning_tab:
        state: state.rendered
        description: "Meal plan calendar reflects the selected view."

navigation: []

next_possible_events:
  - event.swipe_to_different_day
  - event.calendar_view_toggle

responses:
  - Updates calendar grid and macro bar for the selected view.
  - Animates transition between views.
---
