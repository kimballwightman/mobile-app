---
type: endpoint
id: endpoint.api.recipes_search_query.GET
protocol: REST
description: |
  Searches for recipes matching the given query string.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/recipes/search/{query}
  method: GET
  params:
    - name: query
      type: string
      required: true
      example: "omelette"
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Recipes matching the query fetched successfully.
    body:
      - name: recipes
        type: array
        example: [{"recipe_id": "recipe_1", "name": "Omelette"}]
  - status: 404
    description: No recipes found for the query.
    body:
      - name: error
        type: string
        example: "No recipes found."

related:
  feature:
    - feature.meal_discovery
  event:
    - event.search_recipes
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
