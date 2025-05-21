---
type: endpoint
id: endpoint.api.recipes_feed.GET
protocol: REST
description: |
  Retrieves a feed of recommended recipes for the user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/recipes/feed
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
    description: Recipes feed fetched successfully.
    body:
      - name: recipes
        type: array
        example: [{"recipe_id": "recipe_1", "name": "Omelette"}]
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
