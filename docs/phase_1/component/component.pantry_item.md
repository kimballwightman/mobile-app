---
type: component
id: component.pantry_item
title: Pantry Item
component_type: list
description: |
  List item representing a single pantry item, displaying name, quantity, expiration date, and status indicator. Used in the pantry item list.

properties:
  - name: name
    type: string
    description: "Name of the pantry item."
  - name: quantity
    type: number
    description: "Current quantity of the item in the pantry."
  - name: expirationDate
    type: string
    description: "Expiration date of the item."
  - name: status
    type: string
    description: "Status indicator (e.g., Fresh, Expiring, Out of Stock, On the Way)."
  - name: onClick
    type: function
    description: "Handler for viewing item details."

states:
  - state.default
  - state.selected
  - state.expiring
  - state.out_of_stock

related:
  feature:
    - feature.pantry_management
  event:
    - event.load_pantry_items
    - event.view_pantry_item
    - event.log_pantry_item_change
  screen:
    - screen.pantry_tab

design_system_reference: [design_system]
---
