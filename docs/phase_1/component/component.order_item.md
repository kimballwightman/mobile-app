---
type: component
id: component.order_item
title: Order Item
component_type: list
description: |
  List item representing a single order in the shopping cart or order history, showing item details, quantity, price, and status.

properties:
  - name: item
    type: object
    description: "Order item details (name, image, etc.)."
  - name: quantity
    type: number
    description: "Quantity of the item."
  - name: price
    type: number
    description: "Price of the item."
  - name: status
    type: string
    description: "Order status (e.g., pending, purchased, delivered)."
  - name: onClick
    type: function
    description: "Handler for viewing or editing the order item."

states:
  - state.default
  - state.selected
  - state.updated

related:
  feature:
    - feature.shopping_cart
  event:
    - event.add_to_cart
    - event.remove_from_cart
    - event.update_cart_item
  screen:
    - screen.shopping_cart

design_system_reference: [design_system]
---
