---
type: screen
id: screen.meal_planning_tab
title: Meal Planning Tab
description: |
  The main calendar-based meal planning screen. Users can add, remove, and rearrange meals, manage cart windows, browse meal history, and access the meal review queue.
route: /plan

states:
  - state.rendered
  - state.history_view

related:
  feature:
    - feature.meal_plan_calendar
  event:
    - event.add_favorite_meal_to_plan
    - event.add_from_pantry
    - event.remove_food_from_plan
    - event.drag_and_drop_meal
    - event.go_to_cart_windows
    - event.browse_meal_history
    - event.add_to_meal_review_queue
    - event.swipe_to_different_day
    - event.calendar_view_toggle
  component:
    - component.floating_action_button
    - component.meal_calendar_grid
    - component.meal_plan_slot
    - component.macro_bar
    - component.cart_icon
    - component.meal_history_list
    - component.calendar_view_toggle
    - component.top_section

design_system_reference: [design_system]
---
