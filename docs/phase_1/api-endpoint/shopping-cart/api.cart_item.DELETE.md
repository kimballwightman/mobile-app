---
type: endpoint
id: endpoint.api.cart_item.DELETE
protocol: REST
description: |
  Removes an item from the user's shopping cart. Used when the user deletes an item from their cart in the shopping cart modal.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/cart/item
  method: DELETE
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: item_id
      type: string
      required: true
      example: "item_456"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Item removed from cart successfully.
    body:
      - name: cart_id
        type: string
        example: "cart_789"
      - name: items
        type: array
        example: []
  - status: 404
    description: Item or cart not found.
    body:
      - name: error
        type: string
        example: "Item not found."

related:
  feature:
    - feature.shopping_cart
  event:
    - event.remove_cart_item
  screen:
    - screen.shopping_cart_modal
  component:
    - component.cart_item_list
    - component.cart_summary
  api_endpoint: []
  db:
    relational:
      - table.cart_items
    graph: []
---
