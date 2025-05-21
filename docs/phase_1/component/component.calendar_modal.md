---
type: component
id: component.calendar_modal
title: Calendar Modal
component_type: modal
description: |
  Modal component that displays a calendar for selecting dates, used in the dashboard and plan tabs.

properties:
  - name: isOpen
    type: boolean
    description: "Whether the modal is open."
  - name: selectedDate
    type: string
    description: "Currently selected date."
  - name: onSelect
    type: function
    description: "Callback when a date is selected."
  - name: onClose
    type: function
    description: "Callback to close the modal."

states:
  - state.open
  - state.closed

related:
  feature:
    - feature.dashboard
    - feature.meal_plan_calendar
  event:
    - event.open_calendar_modal
  screen:
    - screen.dashboard
    - screen.meal_planning_tab

design_system_reference: [design_system]
---
