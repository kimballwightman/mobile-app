---
type: event
id: event.expand_shopping_cart_modal
feature_id: feature.meal_plan_calendar
title: Expand Shopping Cart Modal
description: |
  Triggered when the user taps the shopping cart bar at the bottom of the meal planning screen. Expands the shopping cart into a full modal view for reviewing and managing cart items.

preconditions:
  screens:
    - screen.meal_planning_tab: state.default
  components:
    - component.shopping_cart: state.collapsed

trigger:
  trigger_type: user_action
  component: component.shopping_cart
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
    - component.shopping_cart_modal:
        state: state.visible
        description: "Shopping cart modal is displayed."
  screens:
    - screen.shopping_cart_modal:
        state: state.open
        description: "Shopping cart modal screen is shown."

navigation:
  - screen.shopping_cart_modal

next_possible_events:
  - event.proceed_to_checkout
  - event.submit_order

responses:
  - Shopping cart modal is expanded and visible to the user.
--- 