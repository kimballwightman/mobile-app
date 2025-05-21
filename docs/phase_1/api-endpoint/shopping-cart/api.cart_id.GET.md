---
type: endpoint
id: endpoint.api.cart_id.GET
protocol: REST
description: |
  Fetches the details of a specific cart by its ID, including items, status, and summary. Used for direct cart lookups or when resuming a session.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/cart/{id}
  method: GET
  params:
    - name: id
      type: string
      required: true
      example: "cart_789"
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Cart details fetched successfully.
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
  event: []
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
