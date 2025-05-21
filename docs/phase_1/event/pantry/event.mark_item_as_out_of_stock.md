---
type: event
id: event.mark_item_as_out_of_stock
feature_id: feature.pantry_management
title: Mark Pantry Item as Out of Stock
description: |
  This event is triggered when a pantry item's quantity reaches zero due to consumption, or when a user manually marks an item as out of stock. It updates the status of the pantry item and can optionally add the item to the user's shopping list.

preconditions:
  screens:
    - screen.pantry_tab: state.rendered
  components:
    - component.pantry_item_list: state.loaded

trigger:
  trigger_type: system_or_user_action
  component: component.pantry_item
  screen: screen.pantry_tab

api_request:
  method: PATCH
  endpoint: /api/pantry/item/{item_id}/status
  body:
    user_id: <user_id>
    item_id: <item_id>
    status: "out_of_stock"
    add_to_shopping: <true|false>
  description: Updates the pantry item status to "out_of_stock" and optionally adds to shopping list.

db_interactions:
  relational:
    - action: update
      table: pantry_items
      description: Update the pantry item status to "out_of_stock" and possibly set quantity to 0.
    - action: insert
      table: pantry_item_change_log
      description: Log the status change event for audit/history purposes.
    - action: insert
      table: shopping_list_items
      description: Optionally add the item to the user's shopping list.
  graph: []

state_changes:
  components:
    - component.pantry_item_list:
        state: state.updated
        description: "Pantry item list updates to reflect out of stock status."
    - component.pantry_status_indicators:
        state: state.updated
        description: "Status indicators update to show increased number of out of stock items."
    - component.pantry_item:
        state: state.out_of_stock
        description: "The specific pantry item's UI changes to indicate out of stock status."
    - component.shopping_cart_badge:
        state: state.updated
        description: "Shopping cart badge may update if item was added to shopping list."
  screens:
    - screen.pantry_tab:
        state: state.rendered
        description: "Pantry tab displays updated pantry items with out of stock status."

navigation: []

next_possible_events:
  - event.load_pantry_items
  - event.view_pantry_item
  - event.expand_shopping_cart

responses:
  - Updates UI to show out of stock status.
  - Offers option to add item to shopping list.
  - May update shopping cart indicator if item added to shopping list.
--- 