---
type: event
id: event.submit_order
feature_id: feature.shopping_cart
title: User Submits Order
description: |
  This event is triggered when the user taps the "Place Order" button for a store group on the checkout summary screen, submitting the order to the store and updating the pantry.

preconditions:
  screens:
    - screen.checkout_summary: state.rendered
  components:
    - component.place_order_button: state.enabled
    - component.checkout_group: state.loaded

trigger:
  trigger_type: user_action
  component: component.place_order_button
  screen: screen.checkout_summary

api_request:
  method: POST
  endpoint: /api/order/submit
  body:
    user_id: <user_id>
    store: <store>
    plan_window_id: <plan_window_id>
    fulfillment_method: <fulfillment_method>
    payment_method: <payment_method>
    items: <order_items>
  description: Submits the order to the store and updates the user's pantry with the ordered items.

db_interactions:
  relational:
    - action: insert
      table: orders
      description: Insert new order record for the user and store.
    - action: update
      table: pantry_items
      description: Add ordered items to the user's pantry, merging with existing quantities if needed.
  graph: []

state_changes:
  components:
    - component.checkout_group:
        state: state.updated
        description: "Checkout group visually updates to reflect order status."
    - component.pantry_list:
        state: state.updated
        description: "Pantry list updates to include newly ordered items."
  screens:
    - screen.order_confirmation:
        state: state.rendered
        description: "Order confirmation screen/modal is displayed."

navigation: []

next_possible_events:
  - event.expand_shopping_cart
  - event.submit_order

responses:
  - Shows order confirmation and pickup/delivery details.
  - Updates pantry inventory with ordered items.
  - Handles error states if order fails.
---
