---
type: endpoint
id: endpoint.api.foods_search.GET
protocol: REST
description: |
  Searches for foods matching the given query string.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/foods/search
  method: GET
  params:
    - name: query
      type: string
      required: true
      example: "egg"
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Foods matching the query fetched successfully.
    body:
      - name: foods
        type: array
        example: [{"food_id": "food_1", "name": "Egg"}]
  - status: 404
    description: No foods found for the query.
    body:
      - name: error
        type: string
        example: "No foods found."

related:
  feature:
    - feature.pantry_management
  event:
    - event.search_foods
  screen:
    - screen.pantry
  component:
    - component.pantry_item
  api_endpoint: []
  db:
    relational:
      - table.foods
    graph: []
---
