---
type: event
id: event.mark_item_as_consumed
feature_id: feature.pantry_management
title: Mark Pantry Item as Consumed
description: |
  This event is triggered when a user confirms consumption of a meal/food that includes pantry items, or when manually marking pantry items as consumed. It updates inventory quantities and potentially status of affected pantry items.

preconditions:
  screens:
    - screen.pantry_tab: state.rendered
    - screen.meal_review: state.completed
  components:
    - component.pantry_item_list: state.loaded
    - component.meal_consumption_confirmation: state.confirmed

trigger:
  trigger_type: system_or_user_action
  component: component.pantry_item
  screen: screen.pantry_tab

api_request:
  method: PATCH
  endpoint: /api/pantry/item/{item_id}/consume
  body:
    user_id: <user_id>
    item_id: <item_id>
    quantity: <quantity_consumed>
    meal_id: <meal_id>
  description: Updates the pantry item record to reduce quantity after consumption.

db_interactions:
  relational:
    - action: update
      table: pantry_items
      description: Reduce the pantry item quantity and update status if needed.
    - action: insert
      table: pantry_item_change_log
      description: Log the consumption event for audit/history purposes.
    - action: insert
      table: meal_consumption_log
      description: Record which pantry items were consumed in a meal (if applicable).
  graph: []

state_changes:
  components:
    - component.pantry_item_list:
        state: state.updated
        description: "Pantry item list updates to reflect reduced quantity."
    - component.pantry_status_indicators:
        state: state.updated
        description: "Status indicators update if item status changes (e.g., to Out of Stock if quantity reaches zero)."
  screens:
    - screen.pantry_tab:
        state: state.rendered
        description: "Pantry tab displays updated pantry items."

navigation: []

next_possible_events:
  - event.load_pantry_items
  - event.mark_item_as_out_of_stock
  - event.view_pantry_item

responses:
  - Updates UI to show reduced quantity in pantry.
  - Changes status to "Out of Stock" if quantity becomes zero.
  - Optionally suggests adding the item to shopping list if below threshold.
--- 