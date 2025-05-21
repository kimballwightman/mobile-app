---
type: event
id: event.add_cart_item_manually
feature_id: feature.shopping_cart
title: User Adds Cart Item Manually
description: |
  This event is triggered when the user manually adds a new item to the shopping cart from the expanded cart view, specifying details such as name, quantity, price, and store.

preconditions:
  screens:
    - screen.shopping_cart_modal: state.rendered
  components:
    - component.add_cart_item_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.add_cart_item_button
  screen: screen.shopping_cart_modal

api_request:
  method: POST
  endpoint: /api/cart/item
  body:
    user_id: <user_id>
    plan_window_id: <plan_window_id>
    name: <item_name>
    quantity: <quantity>
    price: <price>
    store: <store>
  description: Adds a new item to the user's cart for the selected plan window.

db_interactions:
  relational:
    - action: insert
      table: cart_items
      description: Insert the new item into the user's cart in the database.
  graph: []

state_changes:
  components:
    - component.cart_item_list:
        state: state.updated
        description: "Cart item list updates to include the new item."
    - component.cart_summary:
        state: state.updated
        description: "Summary section updates with new totals and status breakdown."
  screens:
    - screen.shopping_cart_modal:
        state: state.rendered
        description: "Expanded shopping cart modal reflects the new item."

navigation: []

next_possible_events:
  - event.remove_cart_item
  - event.expand_shopping_cart
  - event.proceed_to_checkout

responses:
  - Adds new item to cart and updates UI.
  - Optionally shows confirmation or toast.
---
