---
type: event
id: event.swipe_to_different_day
feature_id: feature.meal_plan_calendar
title: User Swipes to Different Day in Plan Calendar
description: |
  This event is triggered when the user swipes left or right on the calendar view to navigate to a different day or 3-day group. The app updates the calendar view, day headers, and macro/nutrition info for the new visible days.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
  components:
    - component.meal_calendar_grid: state.loaded

trigger:
  trigger_type: user_action
  component: component.meal_calendar_grid
  screen: screen.meal_planning_tab

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.meal_calendar_grid:
        state: state.updated
        description: "Calendar grid updates to show new day(s)."
    - component.macro_bar:
        state: state.updated
        description: "Macro and calorie bars update for new visible days."
    - component.top_section:
        state: state.updated
        description: "Day headers and date info update for new visible days."
  screens:
    - screen.meal_planning_tab:
        state: state.rendered
        description: "Meal plan calendar reflects the new day or group."

navigation: []

next_possible_events:
  - event.swipe_to_different_day
  - event.calendar_view_toggle

responses:
  - Updates calendar view to show new day(s) and updates macro/nutrition info.
  - Animates swipe transition and updates day headers.
---
