---
type: endpoint
id: endpoint.api.recipes_feed_offset.GET
protocol: REST
description: |
  Retrieves a paginated feed of recommended recipes for the user, starting from a given offset.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/recipes/feed/offset
  method: GET
  params:
    - name: offset
      type: integer
      required: false
      example: 10
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Paginated recipes feed fetched successfully.
    body:
      - name: recipes
        type: array
        example: [{"recipe_id": "recipe_11", "name": "Pancakes"}]
      - name: next_offset
        type: integer
        example: 20
  - status: 404
    description: No recipes found.
    body:
      - name: error
        type: string
        example: "No recipes found."

related:
  feature:
    - feature.meal_discovery
  event:
    - event.fetch_recipes_feed
  screen:
    - screen.explore
  component:
    - component.recipe_content
  api_endpoint: []
  db:
    relational:
      - table.recipes
    graph: []
---
