---
type: endpoint
id: endpoint.api.foods_id_swaps.GET
protocol: REST
description: |
  Retrieves possible swaps for a specific food item by its ID.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/foods/{id}/swaps
  method: GET
  params:
    - name: id
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
    description: Food swaps for the item fetched successfully.
    body:
      - name: food_id
        type: string
        example: "food_1"
      - name: swaps
        type: array
        example: ["food_2", "food_3"]
  - status: 404
    description: No swaps found for the food item.
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
