---
type: endpoint
id: endpoint.api.user-meal-plan_manual-entry.POST
protocol: REST
description: |
  Adds a manual meal entry to the user's meal plan.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/user-meal-plan/manual-entry
  method: POST
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: meal_entry
      type: object
      required: true
      example: {"date": "2024-06-01", "meal": "Custom Salad"}

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 201
    description: Manual meal entry added successfully.
    body:
      - name: meal_entry_id
        type: string
        example: "entry_789"
      - name: meal_entry
        type: object
        example: {"date": "2024-06-01", "meal": "Custom Salad"}
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
    - event.add_manual_meal_entry
  screen:
    - screen.meal_plan
  component:
    - component.meal_calendar_grid
  api_endpoint: []
  db:
    relational:
      - table.meal_plan_entries
    graph: []
---
