---
type: endpoint
id: endpoint.api.cart_item_item-id.PATCH
protocol: REST
description: |
  Updates the quantity or details of a specific item in the user's shopping cart. Used when the user edits an item in their cart.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/cart/item/{item_id}
  method: PATCH
  params:
    - name: item_id
      type: string
      required: true
      example: "item_456"
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: quantity
      type: integer
      required: false
      example: 2
      description: "New quantity for the item."
    - name: details
      type: object
      required: false
      example: {}
      description: "Other editable details for the item."

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Item updated successfully.
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
    - event.update_cart_item
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
