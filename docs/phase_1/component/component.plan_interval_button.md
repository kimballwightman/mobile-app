---
type: component
id: component.plan_interval_button
title: Plan Interval Button
component_type: button
description: |
  Button for selecting a planning interval (e.g., day, week, custom) in meal planning or calendar views.

properties:
  - name: label
    type: string
    description: "Text label for the interval."
  - name: selected
    type: boolean
    description: "Whether this interval is currently selected."
  - name: onClick
    type: function
    description: "Handler called when the button is pressed."

states:
  - state.enabled
  - state.selected
  - state.disabled

related:
  feature:
    - feature.meal_plan_calendar
  event:
    - event.calendar_view_toggle
  screen:
    - screen.meal_planning_tab

design_system_reference: [design_system]
---
