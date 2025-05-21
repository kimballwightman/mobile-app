---
type: endpoint
id: endpoint.log_meal.POST
protocol: REST
description: |
  Logs a new meal for the authenticated user, including meal details and nutritional information.

request:
  headers:
    - name: Authorization
      value: Bearer <token>
    - name: Content-Type
      value: application/json

rest:
  path: /api/log_meal
  method: POST
  params: []
  body:
    - name: meal_id
      type: uuid
      required: true
      example: 123e4567-e89b-12d3-a456-426614174000
      description: Reference to the meal being logged.
    - name: logged_at
      type: timestamp
      required: true
      example: 2024-06-01T12:00:00Z
      description: Timestamp when the meal was logged.
    - name: calories
      type: int
      required: true
      example: 500
      description: Calories in the meal.
    - name: protein
      type: int
      required: true
      example: 30
      description: Protein in the meal (grams).
    - name: carbs
      type: int
      required: true
      example: 60
      description: Carbohydrates in the meal (grams).
    - name: fats
      type: int
      required: true
      example: 20
      description: Fats in the meal (grams).

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 201
    description: Meal successfully logged.
    body:
      - name: meal_log_id
        type: uuid
        example: 789e4567-e89b-12d3-a456-426614174000
        description: ID of the created meal log.
  - status: 400
    description: Invalid request data.
    body: []
  - status: 401
    description: Unauthorized. User is not authenticated.
    body: []

related:
  feature:
    - feature.dashboard
  event:
    - event.log_meal
  screen:
    - screen.dashboard
  component:
    - component.meal_history_tile
  api_endpoint:
    - endpoint.dashboard_data.GET
  db:
    relational:
      - table.meal_log
    graph:
      - node.meal_event
      - node.user_activity
--- 