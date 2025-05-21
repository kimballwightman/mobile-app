---
type: endpoint
id: endpoint.api.user-meal-plan.POST
protocol: REST
description: |
  Creates a new meal plan for the user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/user-meal-plan
  method: POST
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: plan_details
      type: object
      required: true
      example: {"start_date": "2024-06-01", "meals": ["meal_1", "meal_2"]}

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 201
    description: Meal plan created successfully.
    body:
      - name: meal_plan_id
        type: string
        example: "plan_456"
      - name: plan_details
        type: object
        example: {"start_date": "2024-06-01", "meals": ["meal_1", "meal_2"]}
  - status: 400
    description: Invalid request or missing parameters.
    body:
      - name: error
        type: string
        example: "Missing user_id."

related:
  feature:
    - feature.meal_plan_calendar
  event:
    - event.create_meal_plan
  screen:
    - screen.meal_plan
  component:
    - component.meal_calendar_grid
  api_endpoint: []
  db:
    relational:
      - table.meal_plans
    graph: []
---
