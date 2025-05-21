---
type: event
id: event.search_pantry_items
feature_id: feature.pantry
title: Search Pantry Items
description: |
  This event is triggered when the user enters a search query in the search bar at the top of the Pantry tab, filtering the displayed pantry items by name, category, or other metadata.

preconditions:
  screens:
    - screen.pantry_tab: state.rendered
  components:
    - component.pantry_item_list: state.loaded
    - component.pantry_search_bar: state.enabled

trigger:
  trigger_type: user_action
  component: component.pantry_search_bar
  screen: screen.pantry_tab

api_request:
  method: GET
  endpoint: /api/pantry/items/search
  body:
    user_id: <user_id>
    query: <search_query>
  description: Fetches pantry items matching the search query for the user.

db_interactions:
  relational:
    - action: query
      table: pantry_items
      description: Search pantry items for the user by name, category, or metadata.
  graph: []

state_changes:
  components:
    - component.pantry_item_list:
        state: state.filtered
        description: "Pantry item list is filtered to show only matching items."
  screens:
    - screen.pantry_tab:
        state: state.rendered
        description: "Pantry tab displays filtered pantry items."

navigation: []

next_possible_events:
  - event.pantry_items_sort
  - event.view_pantry_item

responses:
  - Updates pantry item list to show search results.
  - Optionally shows empty state if no items match.
---
