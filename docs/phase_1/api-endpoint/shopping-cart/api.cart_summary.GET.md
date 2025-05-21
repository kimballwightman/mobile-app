---
type: endpoint
id: endpoint.api.cart_summary.GET
protocol: REST
description: |
  Fetches a summary of the cart, including total items, price, and status breakdown. Used for displaying cart summary in the UI.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/cart/summary
  method: GET
  params:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: plan_window_id
      type: string
      required: true
      example: "window_456"
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Cart summary fetched successfully.
    body:
      - name: total_items
        type: number
        example: 5
      - name: total_price
        type: number
        example: 99.99
      - name: status_breakdown
        type: object
        example: {"pending": 2, "purchased": 3}
  - status: 404
    description: Cart not found.
    body:
      - name: error
        type: string
        example: "Cart not found."

related:
  feature:
    - feature.shopping_cart
  event:
    - event.expand_shopping_cart
  screen:
    - screen.plan_tab
    - screen.shopping_cart_modal
  component:
    - component.cart_summary
  api_endpoint: []
  db:
    relational:
      - table.cart_items
    graph: []
---
