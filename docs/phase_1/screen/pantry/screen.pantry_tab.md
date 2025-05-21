---
type: screen
id: screen.pantry_tab
title: Pantry Tab
description: |
  The main pantry management screen. Users can view, search, sort, and update pantry items, and see status indicators for freshness and stock.
route: /pantry

states:
  - state.initial
  - state.rendered
  - state.loaded
  - state.filtered
  - state.sorted
  - state.updated

related:
  feature:
    - feature.pantry_management
  event:
    - event.load_pantry_items
    - event.search_pantry_items
    - event.pantry_items_sort
    - event.view_pantry_item
    - event.log_pantry_item_change
  component:
    - component.pantry_item_list
    - component.pantry_status_indicators
    - component.pantry_search_bar
    - component.pantry_sort_dropdown

design_system_reference: [design_system]
---
