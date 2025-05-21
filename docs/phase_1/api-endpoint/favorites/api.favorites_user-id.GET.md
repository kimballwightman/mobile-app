---
type: endpoint
id: endpoint.api.favorites_user-id.GET
protocol: REST
description: |
  Retrieves the list of favorite items for a specific user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/favorites/{user-id}
  method: GET
  params:
    - name: user-id
      type: string
      required: true
      example: "user_123"
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Favorites fetched successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: favorites
        type: array
        example: ["meal_1", "meal_2"]
  - status: 404
    description: User not found.
    body:
      - name: error
        type: string
        example: "User not found."

related:
  feature:
    - feature.meal_discovery
    - feature.meal_reviews
  event:
    - event.add_favorite
    - event.remove_favorite
  screen:
    - screen.favorites
  component:
    - component.meal_card
  api_endpoint: []
  db:
    relational:
      - table.users
      - table.favorites
    graph: []
---
