---
type: table
id: table.order_items
title: Order Items
description: |
  Items included in a user's grocery order, with quantities and price.

fields:
  - id: order_item_id
    type: uuid
    description: Unique identifier for the order item.
    constraints: [primary key, not null]
  - id: order_id
    type: uuid
    description: Reference to the order.
    constraints: [foreign key, not null]
  - id: food_id
    type: uuid
    description: Reference to the food item.
    constraints: [foreign key, not null]
  - id: quantity
    type: int
    description: Quantity of the item in the order.
    constraints: [not null]
  - id: price
    type: float
    description: Price of the item at time of order.
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
      - node.food
---
