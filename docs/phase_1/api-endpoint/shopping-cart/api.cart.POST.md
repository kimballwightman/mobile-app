---
type: endpoint
id: endpoint.api.cart.POST
protocol: REST
description: |
  Creates a new shopping cart for the user, initializing it with items or an empty state. Used when a user starts a new shopping session or plan window.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/cart
  method: POST
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
      description: "ID of the user creating the cart."
    - name: plan_window_id
      type: string
      required: false
      example: "window_456"
      description: "Optional plan window to associate with the cart."
    - name: items
      type: array
      required: false
      example: []
      description: "Initial items to add to the cart."

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 201
    description: Cart created successfully.
    body:
      - name: cart_id
        type: string
        example: "cart_789"
      - name: items
        type: array
        example: []
      - name: status
        type: string
        example: "active"
  - status: 400
    description: Invalid request or missing parameters.
    body:
      - name: error
        type: string
        example: "Missing user_id."

related:
  feature:
    - feature.shopping_cart
  event:
    - event.expand_shopping_cart
  screen:
    - screen.plan_tab
    - screen.shopping_cart_modal
  component:
    - component.shopping_cart_bar
    - component.cart_item_list
    - component.cart_summary
  api_endpoint: []
  db:
    relational:
      - table.cart_items
    graph: []
---
