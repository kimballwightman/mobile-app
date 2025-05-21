---
type: event
id: event.load_pantry_items
feature_id: feature.pantry
title: Load Pantry Items
description: |
  This event is triggered when the user navigates to the Pantry tab, causing the app to fetch and display the user's pantry items, including their categories, quantities, expiration dates, and status indicators.

preconditions:
  screens:
    - screen.pantry_tab: state.initial
  components:
    - component.pantry_item_list: state.unloaded

trigger:
  trigger_type: user_action
  component: component.pantry_tab
  screen: screen.navigation_bar

api_request:
  method: GET
  endpoint: /api/pantry/items
  body:
    user_id: <user_id>
  description: Fetches all pantry items for the user, including metadata (category, expiration, quantity, status).

db_interactions:
  relational:
    - action: query
      table: pantry_items
      description: Fetch all pantry items for the user, including category, expiration, quantity, and status.
  graph: []

state_changes:
  components:
    - component.pantry_item_list:
        state: state.loaded
        description: "Pantry item list is populated with fetched items."
    - component.pantry_status_indicators:
        state: state.updated
        description: "Status indicators (Fresh, Expiring, Out of Stock, On the Way) are updated."
  screens:
    - screen.pantry_tab:
        state: state.rendered
        description: "Pantry tab displays the up-to-date list of pantry items."

navigation: []

next_possible_events:
  - event.pantry_items_sort
  - event.search_pantry_items
  - event.view_pantry_item

responses:
  - Displays pantry items with categories, quantities, expiration, and status.
  - Updates UI to reflect current pantry inventory.
---
