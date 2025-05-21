---
type: component
id: component.top_section
title: Top Section
component_type: custom
description: |
  Top-of-screen section for displaying titles, navigation controls, or summary information. Used in most screens for consistent layout and context.

properties:
  - name: title
    type: string
    description: "Title text to display."
  - name: subtitle
    type: string
    description: "Optional subtitle or description."
  - name: leftAction
    type: function
    description: "Handler for left-side action (e.g., back button)."
  - name: rightAction
    type: function
    description: "Handler for right-side action (e.g., settings, add)."

states:
  - state.visible
  - state.hidden

related:
  feature:
    - feature.onboarding_flow
    - feature.meal_plan_calendar
    - feature.settings_management
  event:
    - event.go_to_previous_page
    - event.open_settings
  screen:
    - screen.meal_planning_tab
    - screen.user_info
    - screen.tracking_goals

design_system_reference: [design_system]
---
