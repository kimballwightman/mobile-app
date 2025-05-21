---
type: endpoint
id: endpoint.api.user-meal-plan_id.DELETE
protocol: REST
description: |
  Deletes a specific meal plan for the user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/user-meal-plan/{id}
  method: DELETE
  params:
    - name: id
      type: string
      required: true
      example: "plan_456"
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Meal plan deleted successfully.
    body:
      - name: meal_plan_id
        type: string
        example: "plan_456"
  - status: 404
    description: Meal plan not found.
    body:
      - name: error
        type: string
        example: "Meal plan not found."

related:
  feature:
    - feature.meal_plan_calendar
  event:
    - event.delete_meal_plan
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
