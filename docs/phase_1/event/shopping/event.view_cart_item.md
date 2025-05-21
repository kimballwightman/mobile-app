---
type: event
id: event.view_cart_item
feature_id: feature.shopping_cart
title: User Views Cart Item Details
description: |
  This event is triggered when the user taps on a cart item in the expanded shopping cart view to see more details, such as price, store, shopping status, and additional options.

preconditions:
  screens:
    - screen.shopping_cart_modal: state.rendered
  components:
    - component.cart_item_list: state.loaded

trigger:
  trigger_type: user_action
  component: component.cart_item_list_item
  screen: screen.shopping_cart_modal

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.cart_item_detail_modal:
        state: state.rendered
        description: "Cart item detail modal or bottom sheet is displayed with item info."
  screens:
    - screen.cart_item_detail:
        state: state.rendered
        description: "Cart item detail screen/modal is shown."

navigation: []

next_possible_events:
  - event.remove_cart_item
  - event.add_cart_item_manually
  - event.expand_shopping_cart

responses:
  - Shows cart item details in a modal or bottom sheet.
  - Provides options for editing or removing the item.
---
