---
type: endpoint
id: endpoint.api.foods_swaps.GET
protocol: REST
description: |
  Retrieves a list of possible food swaps for the user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/foods/swaps
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
    description: Food swaps fetched successfully.
    body:
      - name: swaps
        type: array
        example: [{"food_id": "food_1", "swaps": ["food_2", "food_3"]}]
  - status: 404
    description: No swaps found.
    body:
      - name: error
        type: string
        example: "No swaps found."

related:
  feature:
    - feature.meal_discovery
  event:
    - event.fetch_food_swaps
  screen:
    - screen.explore
  component:
    - component.food_list_item_tile
  api_endpoint: []
  db:
    relational:
      - table.food_swaps
    graph: []
---
