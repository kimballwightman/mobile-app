---
type: endpoint
id: endpoint.api.pantry_food-id.PUT
protocol: REST
description: |
  Updates the quantity of a specific pantry item for the user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/pantry/{food-id}
  method: PUT
  params:
    - name: food-id
      type: string
      required: true
      example: "food_1"
  body:
    - name: quantity
      type: number
      required: true
      example: 5

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Pantry item updated successfully.
    body:
      - name: food_id
        type: string
        example: "food_1"
      - name: quantity
        type: number
        example: 5
  - status: 404
    description: Pantry item not found.
    body:
      - name: error
        type: string
        example: "Pantry item not found."

related:
  feature:
    - feature.pantry_management
  event:
    - event.update_pantry_item
  screen:
    - screen.pantry
  component:
    - component.pantry_item
  api_endpoint: []
  db:
    relational:
      - table.pantry
    graph: []
---
