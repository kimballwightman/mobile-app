---
type: event
id: event.pantry_items_sort
feature_id: feature.pantry
title: Sort Pantry Items
description: |
  This event is triggered when the user selects a new sort method from the sort dropdown menu in the Pantry tab, reordering the displayed pantry items by the chosen criterion (e.g., expiration date, category, name, quantity, recently added).

preconditions:
  screens:
    - screen.pantry_tab: state.rendered
  components:
    - component.pantry_item_list: state.loaded
    - component.pantry_sort_dropdown: state.enabled

trigger:
  trigger_type: user_action
  component: component.pantry_sort_dropdown
  screen: screen.pantry_tab

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.pantry_item_list:
        state: state.sorted
        description: "Pantry item list is re-sorted and re-rendered according to the selected method."
    - component.pantry_sort_dropdown:
        state: state.updated
        description: "Sort dropdown label updates to reflect the active sort method."
  screens:
    - screen.pantry_tab:
        state: state.rendered
        description: "Pantry tab displays pantry items in the new order."

navigation: []

next_possible_events:
  - event.search_pantry_items
  - event.view_pantry_item

responses:
  - Updates pantry item list order and UI label.
  - Animates or fades list for visual clarity.
---
