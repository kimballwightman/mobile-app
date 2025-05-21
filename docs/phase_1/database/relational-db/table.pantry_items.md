---
type: table
id: table.pantry_items
title: Pantry Items
description: |
  Tracks items in the user's pantry, their quantities, and expiration dates.

fields:
  - id: pantry_item_id
    type: uuid
    description: Unique identifier for the pantry item.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [foreign key, not null]
  - id: food_id
    type: uuid
    description: Reference to the food item.
    constraints: [foreign key, not null]
  - id: category
    type: string
    description: Food category (Produce, Grains, Dairy, Meat&Seafood, etc.).
    constraints: [not null]
  - id: quantity
    type: int
    description: Quantity of the item in the pantry.
    constraints: [not null]
  - id: status
    type: string
    description: Status of the item (fresh, expiring, out_of_stock, on_the_way).
    constraints: [not null]
  - id: expiration_date
    type: date
    description: Expiration date of the item.
    constraints: []

related:
  feature:
    - feature.pantry_management
  event:
    - event.log_pantry_item_change
  screen:
    - screen.pantry_tab
  component:
    - component.pantry_status_chip
  api_endpoint:
    - endpoint.pantry_items.GET
  db:
    graph:
      - node.food
---
