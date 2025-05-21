---
type: table
id: table.cart_windows
title: Cart Windows
description: |
  Represents a planning window for meal plans with an associated shopping cart. Users can have multiple cart windows for different planning periods.

fields:
  - id: window_id
    type: uuid
    description: Unique identifier for the cart window.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user who owns this cart window.
    constraints: [foreign key, not null]
  - id: cart_id
    type: uuid
    description: Reference to the associated shopping cart.
    constraints: [foreign key, not null]
  - id: name
    type: string
    description: Optional user-defined name for the cart window.
    constraints: []
  - id: start_date
    type: date
    description: Start date of the planning window.
    constraints: [not null]
  - id: end_date
    type: date
    description: End date of the planning window.
    constraints: [not null]
  - id: status
    type: string
    description: Status of the cart window (active, completed, archived).
    constraints: [not null]
  - id: created_at
    type: timestamp
    description: When this cart window was created.
    constraints: [not null]

related:
  feature:
    - feature.meal_plan_calendar
    - feature.shopping_cart
  event:
    - event.create_cart_window
    - event.select_cart_window
    - event.go_to_cart_windows
  screen:
    - screen.meal_planning_tab
  component:
    - component.cart_window_selection_modal
  api_endpoint:
    - endpoint.api.cart.POST
  db:
    relational:
      - table.shopping_cart
      - table.user_meal_plan
    graph:
      - node.user
--- 