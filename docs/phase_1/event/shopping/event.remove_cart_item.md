---
type: event
id: event.remove_cart_item
feature_id: feature.shopping_cart
title: User Removes Item from Shopping Cart
description: |
  This event is triggered when the user taps the remove/delete icon next to a cart item in the expanded shopping cart view, removing it from the cart and updating the UI and backend.

preconditions:
  screens:
    - screen.shopping_cart_modal: state.rendered
  components:
    - component.cart_item_list: state.loaded
    - component.cart_item_remove_icon: state.enabled

trigger:
  trigger_type: user_action
  component: component.cart_item_remove_icon
  screen: screen.shopping_cart_modal

api_request:
  method: DELETE
  endpoint: /api/cart/item
  body:
    user_id: <user_id>
    plan_window_id: <plan_window_id>
    item_id: <item_id>
  description: Removes the specified item from the user's cart for the selected plan window.

db_interactions:
  relational:
    - action: delete
      table: cart_items
      description: Remove the item from the user's cart in the database.
  graph: []

state_changes:
  components:
    - component.cart_item_list:
        state: state.updated
        description: "Cart item is removed from the list."
    - component.cart_summary:
        state: state.updated
        description: "Summary section updates with new totals and status breakdown."
  screens:
    - screen.shopping_cart_modal:
        state: state.rendered
        description: "Expanded shopping cart modal reflects the removed item."

navigation: []

next_possible_events:
  - event.add_cart_item_manually
  - event.expand_shopping_cart
  - event.proceed_to_checkout

responses:
  - Removes item from cart and updates UI.
  - Optionally shows undo snackbar or toast.
---
