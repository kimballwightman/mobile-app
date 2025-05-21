---
type: event
id: event.select_cart_window
feature_id: feature.meal_plan_calendar
title: Select Cart Window
description: |
  Triggered when the user selects a specific cart window to view or manage its contents.

preconditions:
  screens:
    - screen.shopping_cart_modal: state.rendered
  components:
    - component.shopping_cart_modal: state.loaded

trigger:
  trigger_type: user_action
  component: component.shopping_cart_modal
  screen: screen.shopping_cart_modal

api_request:
  endpoint: endpoint.api.cart_checkout_initiate.POST
  method: POST
  url: /api/cart-windows/:id

db_interactions:
  relational:
    - table.cart_windows:
        actions:
          - "Fetch cart window details and associated items."
  graph: []

state_changes:
  screens:
    - screen.shopping_cart_modal:
        state: state.rendered
        description: "Cart modal displays selected cart window details."

navigation: []

next_possible_events:
  - event.create_cart_window

responses:
  - Navigates to cart window detail view.
  - Displays cart window contents and options for management.
---
