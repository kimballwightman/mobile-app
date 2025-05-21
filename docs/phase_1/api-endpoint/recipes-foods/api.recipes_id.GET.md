---
type: endpoint
id: endpoint.api.recipes_id.GET
protocol: REST
description: |
  Retrieves the details of a specific recipe by its ID.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/recipes/{id}
  method: GET
  params:
    - name: id
      type: string
      required: true
      example: "recipe_1"
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Recipe details fetched successfully.
    body:
      - name: recipe_id
        type: string
        example: "recipe_1"
      - name: name
        type: string
        example: "Omelette"
      - name: ingredients
        type: array
        example: ["Eggs", "Salt", "Pepper"]
      - name: instructions
        type: string
        example: "Beat eggs and cook in a pan."
  - status: 404
    description: Recipe not found.
    body:
      - name: error
        type: string
        example: "Recipe not found."

related:
  feature:
    - feature.meal_discovery
  event:
    - event.view_recipe
  screen:
    - screen.recipe_details
  component:
    - component.recipe_content
  api_endpoint: []
  db:
    relational:
      - table.recipes
    graph: []
---
