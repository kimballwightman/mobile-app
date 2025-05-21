---
type: node
id: node.shopping_cart
title: Shopping Cart
description: |
  Represents a shopping cart in the graph database, with relationships to users and foods.

properties:
  - id: cart_id
    type: uuid
    description: Unique identifier for the shopping cart.
  - id: start_date
    type: date
    description: Start date of the cart's planning window.
  - id: end_date
    type: date
    description: End date of the cart's planning window.
  - id: status
    type: string
    description: Status of the cart (open, checked_out, cancelled).

edges:
  - type: BELONGS_TO
    to_node: node.user
    direction: inbound
    description: Shopping cart belongs to a user.
  - type: CONTAINS
    to_node: node.food
    direction: outbound
    description: Shopping cart contains food items.

related:
  feature:
    - feature.shopping_cart
  event:
    - event.expand_shopping_cart
  screen:
    - screen.meal_planning_tab
  component:
    - component.shopping_cart_modal
  api_endpoint:
    - endpoint.cart_summary.GET
  db:
    relational:
      - table.shopping_cart
---
