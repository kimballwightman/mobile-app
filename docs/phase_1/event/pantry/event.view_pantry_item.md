---
type: event
id: event.view_pantry_item
feature_id: feature.pantry
title: View Pantry Item Details
description: |
  This event is triggered when the user taps a pantry item in the list to view its details, including breakdown by order, purchase date, quantity, and status (e.g., multiple batches of the same item with different expirations).

preconditions:
  screens:
    - screen.pantry_tab: state.rendered
  components:
    - component.pantry_item_list: state.loaded

trigger:
  trigger_type: user_action
  component: component.pantry_item_list_item
  screen: screen.pantry_tab

api_request:
  method: GET
  endpoint: /api/pantry/item/{item_id}/details
  body:
    user_id: <user_id>
    item_id: <item_id>
  description: Fetches detailed information for the selected pantry item, including all orders, purchase dates, stores, prices, and status.

db_interactions:
  relational:
    - action: query
      table: pantry_items
      description: Fetch the pantry item's base information.
    - action: query
      table: orders
      description: Fetch orders that include this pantry item.
    - action: query
      table: order_items
      description: Fetch details of the specific food item in each order, including purchase date, price, and store.
  graph: []

state_changes:
  components:
    - component.pantry_item_detail_modal:
        state: state.rendered
        description: "Displays detailed breakdown of the pantry item, showing each order separately with their specific expiration dates, stores, prices, and quantities."
  screens:
    - screen.pantry_item_detail:
        state: state.rendered
        description: "Pantry item detail screen/modal is shown."

navigation: []

next_possible_events:
  - event.log_pantry_item_change
  - event.load_pantry_items

responses:
  - Shows pantry item details, including breakdown by separate orders and their metadata (purchase date, store, price).
  - Provides options for editing or logging changes to the item.
---
