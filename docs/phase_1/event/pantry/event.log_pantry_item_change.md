---
type: event
id: event.log_pantry_item_change
feature_id: feature.pantry
title: Log Pantry Item Change
description: |
  This event is triggered when a pantry item is added, removed, or updated (e.g., quantity, status) due to user action or as a result of another event (such as meal review completion or manual adjustment).

preconditions:
  screens:
    - screen.pantry_tab: state.rendered
  components:
    - component.pantry_item_list: state.loaded

trigger:
  trigger_type: system_or_user_action
  component: component.pantry_item_list
  screen: screen.pantry_tab

api_request:
  method: PATCH
  endpoint: /api/pantry/item/{item_id}
  body:
    user_id: <user_id>
    item_id: <item_id>
    change_type: <add_remove_update>
    quantity: <quantity>
    status: <status>
    source_event: <source_event_id>
  description: Updates the pantry item record to reflect the change (addition, removal, or update).

db_interactions:
  relational:
    - action: update
      table: pantry_items
      description: Update the pantry item record with new quantity, status, and change log.
    - action: insert
      table: pantry_item_change_log
      description: Log the change event for audit/history purposes.
  graph: []

state_changes:
  components:
    - component.pantry_item_list:
        state: state.updated
        description: "Pantry item list updates to reflect the change."
    - component.pantry_status_indicators:
        state: state.updated
        description: "Status indicators update if item status changes."
  screens:
    - screen.pantry_tab:
        state: state.rendered
        description: "Pantry tab displays updated pantry items."

navigation: []

next_possible_events:
  - event.load_pantry_items
  - event.pantry_items_sort
  - event.search_pantry_items
  - event.view_pantry_item

responses:
  - Updates UI to reflect pantry item change.
  - Optionally shows confirmation or error message.
---
