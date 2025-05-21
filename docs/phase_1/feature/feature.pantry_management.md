---
type: feature
id: feature.pantry_management
title: Pantry Management
description: |
  Enables users to track, view, search, sort, and update pantry items, including quantities, expiration dates, and status. Integrates with meal reviews, meal planning, and shopping flows for real-time inventory management and pantry status updates.

sections:
  - name: Pantry Inventory & Status
    description: |
      Loads and displays the user's pantry items, including categories, quantities, expiration dates, and color-coded status indicators (Fresh, Expiring, Out of Stock, On the Way).
    events:
      - event.load_pantry_items
      - event.update_pantry_status
      - event.mark_item_as_consumed
      - event.mark_item_as_expiring
      - event.mark_item_as_out_of_stock
      - event.mark_item_as_on_the_way
    screens:
      - screen.pantry_tab
    components:
      - component.pantry_item
      - component.pantry_status_chip
      - component.status_indicator
    api_endpoint:
      - endpoint.api.pantry.GET
    db:
      relational:
        - table.pantry_items
      graph: []

  - name: Search & Sort Pantry Items
    description: |
      Allows users to search and sort pantry items by various criteria (name, category, expiration, etc.).
    events:
      - event.search_pantry_items
      - event.pantry_items_sort
    screens:
      - screen.pantry_tab
    components:
      - component.search_bar
      - component.pantry_sort_by
      - component.pantry_item
    api_endpoint:
      - endpoint.api.pantry.GET
    db:
      relational:
        - table.pantry_items
      graph: []

  - name: Pantry Item Details & Logging
    description: |
      Users can view detailed information for a pantry item, log changes (add, remove, update), and update inventory in real time. Pantry is updated after meal reviews and shopping.
    events:
      - event.view_pantry_item
      - event.log_pantry_item_change
    screens:
      - screen.pantry_tab
    components:
      - component.pantry_item
      - component.pantry_status_chip
    api_endpoint:
      - endpoint.api.pantry_food-id.PUT
    db:
      relational:
        - table.pantry_items
        - table.pantry_item_change_log
      graph: []

design_system_reference: [design_system]
---
