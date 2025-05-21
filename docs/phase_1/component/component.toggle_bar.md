---
type: component
id: component.toggle_bar
title: Toggle Bar
component_type: input
description: |
  Segmented control or toggle bar for switching between views or modes, such as enabling/disabling Apple Health connection, list/grid view, meal types, or calendar modes.

properties:
  - name: options
    type: array
    description: "Array of toggle options."
  - name: value
    type: string
    description: "Currently selected value."
  - name: onChange
    type: function
    description: "Handler called when the toggle value changes."
  - name: disabled
    type: boolean
    description: "Whether the toggle bar is disabled."
  - name: isAppleHealthSync
    type: boolean
    description: "Indicates if this toggle is for Apple Health sync functionality."

states:
  - state.enabled
  - state.disabled
  - state.updated
  - state.syncing
  - state.synced

related:
  feature:
    - feature.onboarding_flow
    - feature.meal_plan_calendar
    - feature.meal_discovery
  event:
    - event.sync_health_data
    - event.calendar_view_toggle
    - event.filter_meals
  screen:
    - screen.connect_to_apple_health
    - screen.meal_planning_tab
    - screen.explore_grid

design_system_reference: [design_system]
---
