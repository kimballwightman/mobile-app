---
type: endpoint
id: endpoint.api.pantry.POST
protocol: REST
description: |
  Adds a new item to the user's pantry.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/pantry
  method: POST
  params: []
  body:
    - name: food_id
      type: string
      required: true
      example: "food_1"
    - name: quantity
      type: number
      required: true
      example: 2

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 201
    description: Pantry item added successfully.
    body:
      - name: food_id
        type: string
        example: "food_1"
      - name: quantity
        type: number
        example: 2
  - status: 400
    description: Invalid request or missing parameters.
    body:
      - name: error
        type: string
        example: "Missing food_id."

related:
  feature:
    - feature.pantry_management
  event:
    - event.add_pantry_item
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
