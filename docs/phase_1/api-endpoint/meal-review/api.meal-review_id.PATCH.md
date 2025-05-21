---
type: endpoint
id: endpoint.api.meal-review_id.PATCH
protocol: REST
description: |
  Updates a specific meal review (e.g., submit or edit a review for a meal).

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/meal-review/{id}
  method: PATCH
  params:
    - name: id
      type: string
      required: true
      example: "review_123"
  body:
    - name: rating
      type: integer
      required: false
      example: 5
    - name: comment
      type: string
      required: false
      example: "Delicious meal!"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Meal review updated successfully.
    body:
      - name: review_id
        type: string
        example: "review_123"
      - name: rating
        type: integer
        example: 5
      - name: comment
        type: string
        example: "Delicious meal!"
  - status: 404
    description: Meal review not found.
    body:
      - name: error
        type: string
        example: "Meal review not found."

related:
  feature:
    - feature.meal_reviews
  event:
    - event.submit_meal_review
  screen:
    - screen.meal_reviews
  component:
    - component.review_swipe_tile
  api_endpoint: []
  db:
    relational:
      - table.meal_reviews
    graph: []
---
