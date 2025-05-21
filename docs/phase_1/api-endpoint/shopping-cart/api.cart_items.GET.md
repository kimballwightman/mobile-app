---
type: endpoint
id: endpoint.api.cart_items.GET
protocol: REST
description: |
  Fetches the list of cart items and summary for the selected plan window. Used when the user expands the shopping cart bar to view all cart items.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/cart/items
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
    description: Cart items fetched successfully.
    body:
      - name: items
        type: array
        example: []
      - name: summary
        type: object
        example: {}
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
    - component.shopping_cart_bar
    - component.cart_item_list
    - component.cart_summary
  api_endpoint: []
  db:
    relational:
      - table.cart_items
    graph: []
---
