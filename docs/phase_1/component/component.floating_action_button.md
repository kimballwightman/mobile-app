---
type: component
id: component.floating_action_button
title: Floating Action Button
component_type: button
description: |
  Prominent circular button floating above the UI, used for primary actions such as adding a meal, planning a week, or accessing quick actions.

properties:
  - name: icon
    type: string
    description: "Icon displayed in the button."
  - name: onClick
    type: function
    description: "Handler called when the button is pressed."
  - name: label
    type: string
    description: "Optional label for accessibility or extended FABs."
  - name: disabled
    type: boolean
    description: "Whether the button is disabled."

states:
  - state.enabled
  - state.disabled
  - state.loading

related:
  feature:
    - feature.meal_plan_calendar
    - feature.meal_discovery
  event:
    - event.add_favorite_meal_to_plan
    - event.add_from_pantry
    - event.browse_meal_history
  screen:
    - screen.meal_planning_tab
    - screen.explore_grid

design_system_reference: [design_system]
---
