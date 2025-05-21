---
type: event
id: event.mark_item_as_on_the_way
feature_id: feature.pantry_management
title: Mark Pantry Item as On the Way
description: |
  This event is triggered automatically when a user purchases a food item that's in their pantry through the app's shopping interface, or when a shopping order containing pantry items is placed. It updates the status of the pantry item to "On the Way" until the order is delivered.

preconditions:
  screens:
    - screen.shopping_cart: state.order_placed
    - screen.pantry_tab: state.rendered
  components:
    - component.pantry_item_list: state.loaded
    - component.order_confirmation: state.visible

trigger:
  trigger_type: system_event
  component: component.checkout_confirmation
  screen: screen.shopping_cart

api_request:
  method: PATCH
  endpoint: /api/pantry/items/status/bulk
  body:
    user_id: <user_id>
    order_id: <order_id>
    item_ids: [<food_id_1>, <food_id_2>, ...]
    status: "on_the_way"
  description: Updates multiple pantry items to "on_the_way" status after a shopping order is placed.

db_interactions:
  relational:
    - action: update
      table: pantry_items
      description: Update the pantry items' status to "on_the_way" for items in the order.
    - action: insert
      table: pantry_item_change_log
      description: Log the status change events for audit/history purposes.
    - action: update
      table: orders
      description: Link the order to the affected pantry items.
  graph: []

state_changes:
  components:
    - component.pantry_item_list:
        state: state.updated
        description: "Pantry item list updates to reflect on the way status for ordered items."
    - component.pantry_status_indicators:
        state: state.updated
        description: "Status indicators update to show increased number of on the way items."
    - component.shopping_cart_badge:
        state: state.updated
        description: "Shopping cart badge updates to reflect ordered items."
  screens:
    - screen.pantry_tab:
        state: state.rendered
        description: "If visible, pantry tab displays updated pantry items with on the way status."

navigation: []

next_possible_events:
  - event.load_pantry_items
  - event.view_pantry_item
  - event.update_order_status

responses:
  - Updates pantry items in UI to show "On the Way" status for ordered items.
  - Shows estimated delivery date from order information.
  - May display tracking information if available from store/delivery service.
--- 