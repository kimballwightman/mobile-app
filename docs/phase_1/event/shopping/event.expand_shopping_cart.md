---
type: event
id: event.expand_shopping_cart
feature_id: feature.shopping_cart
title: User Expands Shopping Cart
description: |
  This event is triggered when the user taps the shopping cart in its collapsed state at the bottom of the screen, expanding it to show the full shopping cart details, including item list, prices, stores, and shopping status icons.

preconditions:
  screens:
    - screen.plan_tab: state.rendered
  components:
    - component.shopping_cart: state.collapsed

trigger:
  trigger_type: user_action
  component: component.shopping_cart
  screen: screen.plan_tab

api_request:
  method: GET
  endpoint: /api/cart/items
  body:
    user_id: <user_id>
    cart_window_id: <cart_window_id>
  description: Fetches the list of cart items and summary for the selected cart window.

db_interactions:
  relational:
    - action: query
      table: cart_items
      description: Fetch all cart items for the user and cart window.
    - action: query
      table: cart_windows
      description: Fetch details about the current cart window.
  graph: []

state_changes:
  components:
    - component.shopping_cart:
        state: state.expanded
        description: "Shopping cart expands from bar to full modal view."
    - component.cart_item_list:
        state: state.loaded
        description: "Cart item list is populated with fetched items."
    - component.order_summary:
        state: state.updated
        description: "Summary section updates with total items, price, and status breakdown."
  screens:
    - screen.shopping_cart_modal:
        state: state.rendered
        description: "Expanded shopping cart modal is displayed."

navigation: []

next_possible_events:
  - event.remove_cart_item
  - event.add_cart_item_manually
  - event.proceed_to_checkout

responses:
  - Expands shopping cart from bar to full modal view
  - Updates UI with fetched cart items and summary information
  - Shows checkout options and item management controls
---
