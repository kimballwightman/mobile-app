---
type: event
id: event.update_pantry_status
feature_id: feature.pantry_management
title: Update Pantry Status
description: |
  This event is triggered by a scheduled system job or when a user opens the Pantry tab after a period of inactivity. It runs a comprehensive check of all pantry items, updating their statuses based on expiration dates, quantities, and order status. This ensures all item statuses are accurate and up-to-date.

preconditions:
  screens:
    - screen.pantry_tab: state.initial
  components:
    - component.pantry_item_list: state.unloaded

trigger:
  trigger_type: system_event
  component: component.pantry_tab
  screen: screen.navigation_bar

api_request:
  method: POST
  endpoint: /api/pantry/status/update
  body:
    user_id: <user_id>
  description: Initiates a comprehensive status update for all pantry items, checking expiration dates, quantities, and order status.

db_interactions:
  relational:
    - action: query
      table: pantry_items
      description: Get all pantry items to evaluate their status.
    - action: query
      table: orders
      description: Check current order status for items marked as "on_the_way".
    - action: update
      table: pantry_items
      description: Batch update statuses based on current data (fresh, expiring, out_of_stock, on_the_way).
    - action: insert
      table: pantry_item_change_log
      description: Log all status changes for audit/history purposes.
    - action: insert
      table: notification
      description: Create notifications for newly expiring items.
  graph: []

state_changes:
  components:
    - component.pantry_item_list:
        state: state.updated
        description: "Pantry item list is updated with current statuses."
    - component.pantry_status_indicators:
        state: state.updated
        description: "Status indicators show current counts of items in each status."
  screens:
    - screen.pantry_tab:
        state: state.rendered
        description: "Pantry tab displays the up-to-date pantry items with accurate statuses."

navigation: []

next_possible_events:
  - event.load_pantry_items
  - event.pantry_items_sort
  - event.search_pantry_items
  - event.view_pantry_item

responses:
  - Updates all pantry item statuses based on current data.
  - May display notifications for newly expiring items.
  - May suggest adding out of stock items to shopping list.
--- 