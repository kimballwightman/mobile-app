---
type: event
id: event.proceed_to_checkout
feature_id: feature.shopping_cart
title: User Proceeds to Checkout
description: |
  This event is triggered when the user taps the "Proceed to Checkout" button in the expanded shopping cart view, finalizing the cart and transitioning to the checkout summary screen.

preconditions:
  screens:
    - screen.shopping_cart_modal: state.rendered
  components:
    - component.proceed_to_checkout_button: state.enabled
    - component.cart_item_list: state.loaded

trigger:
  trigger_type: user_action
  component: component.proceed_to_checkout_button
  screen: screen.shopping_cart_modal

api_request:
  method: POST
  endpoint: /api/cart/checkout/initiate
  body:
    user_id: <user_id>
    plan_window_id: <plan_window_id>
    items: <cart_items>
  description: Finalizes the cart and groups items by store for checkout, returning checkout groups and cost summaries.

db_interactions:
  relational:
    - action: update
      table: cart_items
      description: Lock cart items for checkout and group by store.
  graph: []

state_changes:
  navigation:
    - from: screen.shopping_cart_modal
      to: screen.checkout_summary
      description: "Navigates to the checkout summary screen."
  screens:
    - screen.checkout_summary:
        state: state.rendered
        description: "Checkout summary screen is displayed, organized by store."

next_possible_events:
  - event.submit_order
  - event.expand_shopping_cart

responses:
  - Navigates to checkout summary screen.
  - Displays grouped items, fees, and payment options per store.
---
