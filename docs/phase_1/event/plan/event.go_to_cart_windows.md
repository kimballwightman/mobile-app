---
type: event
id: event.go_to_cart_windows
feature_id: feature.meal_plan_calendar
title: Navigate to Cart Windows
description: |
  Triggered when the user taps the cart icon in the Plan tab header, opening the cart window selection modal to select an existing cart window or create a new one.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
  components:
    - component.cart_icon: state.default

trigger:
  trigger_type: user_action
  component: component.cart_icon
  screen: screen.meal_planning_tab

api_request:
  method: GET
  url: /api/cart-windows
  description: Fetches the list of cart windows available to the user.

db_interactions:
  relational:
    - table.cart_windows:
        actions:
          - "Fetch all cart windows belonging to the user."
  graph: []

state_changes:
  components:
    - component.cart_window_selection_modal:
        state: state.default
        description: "Cart window selection modal is displayed with the list of available windows."
  screens:
    - screen.meal_planning_tab:
        state: state.rendered
        description: "Meal planning tab remains visible with the modal overlay."

navigation: []

next_possible_events:
  - event.select_cart_window
  - event.create_cart_window

responses:
  - Opens the cart window selection modal
  - Displays a list of available cart windows
  - Provides options to select an existing window or create a new one
---
