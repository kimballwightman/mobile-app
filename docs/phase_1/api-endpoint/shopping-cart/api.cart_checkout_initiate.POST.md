---
type: endpoint
id: endpoint.api.cart_checkout_initiate.POST
protocol: REST
description: |
  Finalizes the cart and groups items by store for checkout, returning checkout groups and cost summaries. Used when the user proceeds to checkout from the shopping cart.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/cart/checkout/initiate
  method: POST
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: plan_window_id
      type: string
      required: true
      example: "window_456"
    - name: items
      type: array
      required: true
      example: []
      description: "Cart items to be checked out."

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Checkout initiated successfully. Returns grouped items and cost summaries.
    body:
      - name: checkout_groups
        type: array
        example: []
      - name: total_cost
        type: number
        example: 99.99
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
    - event.proceed_to_checkout
  screen:
    - screen.shopping_cart_modal
    - screen.checkout_summary
  component:
    - component.proceed_to_checkout_button
    - component.cart_item_list
    - component.cart_summary
  api_endpoint: []
  db:
    relational:
      - table.cart_items
    graph: []
---
