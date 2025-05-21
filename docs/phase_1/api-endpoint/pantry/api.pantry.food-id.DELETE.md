---
type: endpoint
id: endpoint.api.pantry.food-id.DELETE
protocol: REST
description: |
  Removes a specific item from the user's pantry.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/pantry/{food-id}
  method: DELETE
  params:
    - name: food-id
      type: string
      required: true
      example: "food_1"
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Pantry item deleted successfully.
    body:
      - name: food_id
        type: string
        example: "food_1"
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
    - event.remove_pantry_item
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
