---
type: event
id: event.switch_calendar_view
feature_id: feature.meal_plan_calendar
title: Switch Calendar View
description: |
  Triggered when the user toggles between day and 3-day view on the meal plan calendar. Updates the calendar grid to reflect the selected view.

preconditions:
  screens:
    - screen.meal_planning_tab: state.default
  components:
    - component.segmented_control: state.enabled

trigger:
  trigger_type: user_action
  component: component.segmented_control
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
    - component.meal_calendar_grid:
        state: state.view_switched
        description: "Calendar grid updates to show the selected view."
  screens:
    - screen.meal_planning_tab:
        state: state.calendar_view_switched
        description: "Screen reflects the new calendar view."

navigation:
  - screen.meal_planning_tab

next_possible_events:
  - event.swipe_to_different_day
  - event.open_calendar_modal

responses:
  - Calendar view is updated to the selected mode.
--- 