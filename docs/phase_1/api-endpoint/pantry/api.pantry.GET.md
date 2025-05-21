---
type: endpoint
id: endpoint.api.pantry.GET
protocol: REST
description: |
  Retrieves the list of pantry items for the authenticated user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/pantry
  method: GET
  params: []
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Pantry items fetched successfully.
    body:
      - name: pantry_items
        type: array
        example: [{"food_id": "food_1", "name": "Eggs", "quantity": 12}]
  - status: 404
    description: Pantry not found.
    body:
      - name: error
        type: string
        example: "Pantry not found."

related:
  feature:
    - feature.pantry_management
  event:
    - event.fetch_pantry_items
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
