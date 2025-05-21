---
type: table
id: table.shopping_cart
title: Shopping Cart
description: |
  Represents a user's shopping cart for a given planning window.

fields:
  - id: cart_id
    type: uuid
    description: Unique identifier for the shopping cart.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [foreign key, not null]
  - id: start_date
    type: date
    description: Start date of the cart's planning window.
    constraints: [not null]
  - id: end_date
    type: date
    description: End date of the cart's planning window.
    constraints: [not null]
  - id: status
    type: string
    description: Status of the cart (open, checked_out, cancelled).
    constraints: [not null]

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
    graph:
      - node.shopping_cart
---
