---
type: endpoint
id: endpoint.api.meal-review_pending.GET
protocol: REST
description: |
  Retrieves a list of pending meal reviews for the authenticated user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/meal-review/pending
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
    description: Pending meal reviews fetched successfully.
    body:
      - name: pending_reviews
        type: array
        example: [{"meal_id": "meal_1", "date": "2024-06-01"}]
  - status: 404
    description: No pending reviews found.
    body:
      - name: error
        type: string
        example: "No pending reviews found."

related:
  feature:
    - feature.meal_reviews
  event:
    - event.fetch_pending_reviews
  screen:
    - screen.meal_reviews
  component:
    - component.meal_reviews_button
  api_endpoint: []
  db:
    relational:
      - table.meal_reviews
    graph: []
---
