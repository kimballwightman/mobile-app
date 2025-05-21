---
type: endpoint
id: endpoint.api.users_preferences_cooking-shopping.PUT
protocol: REST
description: |
  Updates the user's cooking and shopping preferences, such as appliances, budget, and skill level, as part of onboarding or settings management.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/users/preferences/cooking-shopping
  method: PUT
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: appliances
      type: array
      required: false
      example: ["oven", "microwave"]
    - name: budget_min
      type: number
      required: false
      example: 50
    - name: budget_max
      type: number
      required: false
      example: 200
    - name: cooking_skill_level
      type: string
      required: false
      example: "intermediate"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Cooking and shopping preferences updated successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: appliances
        type: array
        example: ["oven", "microwave"]
      - name: budget_min
        type: number
        example: 50
      - name: budget_max
        type: number
        example: 200
      - name: cooking_skill_level
        type: string
        example: "intermediate"
  - status: 400
    description: Invalid request or missing parameters.
    body:
      - name: error
        type: string
        example: "Missing user_id."

related:
  feature:
    - feature.onboarding_flow
    - feature.settings_management
  event:
    - event.complete_onboarding
  screen:
    - screen.complete_onboarding
    - screen.cooking_shopping
  component:
    - component.next_screen_button
    - component.multi_select_button_group
    - component.range_slider
  api_endpoint: []
  db:
    relational:
      - table.users
      - table.user_preferences
    graph:
      - node.user
      - node.appliance
---
