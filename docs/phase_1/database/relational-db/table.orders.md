---
type: table
id: table.orders
title: Orders
description: |
  Stores grocery orders placed by users, including status and total price.

fields:
  - id: order_id
    type: uuid
    description: Unique identifier for the order.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [foreign key, not null]
  - id: cart_id
    type: uuid
    description: Reference to the shopping cart.
    constraints: [foreign key, not null]
  - id: status
    type: string
    description: Status of the order (pending, completed, cancelled).
    constraints: [not null]
  - id: total_price
    type: float
    description: Total price of the order.
    constraints: [not null]
  - id: created_at
    type: timestamp
    description: When the order was placed.
    constraints: [not null]

related:
  feature:
    - feature.shopping_cart
  event:
    - event.submit_order
  screen:
    - screen.meal_planning_tab
  component:
    - component.order_summary
  api_endpoint:
    - endpoint.order_submit.POST
  db:
    graph:
      - node.shopping_cart
---
