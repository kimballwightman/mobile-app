---
type: component
id: component.meal_plan_slot
title: Meal Plan Slot
component_type: custom
description: |
  Slot in the meal calendar grid representing a specific meal (e.g., breakfast, lunch, dinner, snack) for a given day. Supports drag-and-drop and meal assignment.

properties:
  - name: slotType
    type: string
    description: "Type of meal slot (e.g., breakfast, lunch, dinner, snack)."
  - name: meal
    type: object
    description: "Meal assigned to this slot."
  - name: onDrop
    type: function
    description: "Handler for dropping a meal into the slot."
  - name: onRemove
    type: function
    description: "Handler for removing a meal from the slot."

states:
  - state.empty
  - state.filled
  - state.drag_over

related:
  feature:
    - feature.meal_plan_calendar
  event:
    - event.drag_and_drop_meal
    - event.remove_food_from_plan
  screen:
    - screen.meal_planning_tab

design_system_reference: [design_system]
---
