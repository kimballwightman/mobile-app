---
type: event
id: event.mark_item_as_expiring
feature_id: feature.pantry_management
title: Mark Pantry Item as Expiring
description: |
  This event is triggered automatically by the system when a pantry item's expiration date is approaching within a user-defined threshold (default 3 days), or manually by a user changing an item's status. It updates the status of the pantry item to "Expiring" and may trigger notifications.

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
    status: "expiring"
    is_automated: <true|false>
  description: Updates the pantry item status to "expiring" and records if it was an automated or manual change.

db_interactions:
  relational:
    - action: update
      table: pantry_items
      description: Update the pantry item status to "expiring".
    - action: insert
      table: pantry_item_change_log
      description: Log the status change event for audit/history purposes.
    - action: insert
      table: notification
      description: Create a notification for the user about expiring food (if automated).
  graph: []

state_changes:
  components:
    - component.pantry_item_list:
        state: state.updated
        description: "Pantry item list updates to reflect expiring status."
    - component.pantry_status_indicators:
        state: state.updated
        description: "Status indicators update to show increased number of expiring items."
    - component.pantry_item:
        state: state.expiring
        description: "The specific pantry item's UI changes to highlight its expiring status."
  screens:
    - screen.pantry_tab:
        state: state.rendered
        description: "Pantry tab displays updated pantry items with expiring status."

navigation: []

next_possible_events:
  - event.load_pantry_items
  - event.mark_item_as_consumed
  - event.view_pantry_item
  - event.add_from_pantry

responses:
  - Updates UI to show expiring status with warning color.
  - May show a notification about expiring foods.
  - Prompts user to use expiring foods soon in meal planning.
--- 