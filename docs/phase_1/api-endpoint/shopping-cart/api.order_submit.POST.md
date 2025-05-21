---
type: endpoint
id: endpoint.api.order_submit.POST
protocol: REST
description: |
  Submits the order to the store and updates the user's pantry with the ordered items. Used when the user places an order from the checkout summary screen.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/order/submit
  method: POST
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: store
      type: string
      required: true
      example: "Store A"
    - name: plan_window_id
      type: string
      required: true
      example: "window_456"
    - name: fulfillment_method
      type: string
      required: true
      example: "pickup"
    - name: payment_method
      type: string
      required: true
      example: "credit_card"
    - name: items
      type: array
      required: true
      example: []
      description: "Order items to be submitted."

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 201
    description: Order submitted successfully. Pantry is updated.
    body:
      - name: order_id
        type: string
        example: "order_789"
      - name: status
        type: string
        example: "confirmed"
      - name: pantry_update
        type: array
        example: []
        description: "List of pantry items updated."
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
    - event.submit_order
  screen:
    - screen.checkout_summary
    - screen.order_confirmation
  component:
    - component.place_order_button
    - component.checkout_group
  api_endpoint: []
  db:
    relational:
      - table.orders
      - table.pantry_items
    graph: []
---
