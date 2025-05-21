---
type: table
id: table.shopping_cart_items
title: Shopping Cart Items
description: |
  Items included in a user's shopping cart, with quantities and status.

fields:
  - id: cart_item_id
    type: uuid
    description: Unique identifier for the cart item.
    constraints: [primary key, not null]
  - id: cart_id
    type: uuid
    description: Reference to the shopping cart.
    constraints: [foreign key, not null]
  - id: food_id
    type: uuid
    description: Reference to the food item.
    constraints: [foreign key, not null]
  - id: quantity
    type: int
    description: Quantity of the item in the cart.
    constraints: [not null]
  - id: status
    type: string
    description: Status of the item (available, out_of_stock, in_pantry, on_the_way).
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
    - endpoint.cart_items.GET
  db:
    graph:
      - node.food
---
