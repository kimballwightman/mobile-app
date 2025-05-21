---
type: endpoint
id: endpoint.api.users_preferences_goal.PUT
protocol: REST
description: |
  Updates the user's primary goal(s) as part of onboarding or settings management.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/users/preferences/goal
  method: PUT
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: goals
      type: array
      required: true
      example: ["Gain Muscle", "Lose Weight"]
      description: "List of user goals."

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Goals updated successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: goals
        type: array
        example: ["Gain Muscle", "Lose Weight"]
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
    - screen.define_goal
  component:
    - component.next_screen_button
    - component.multi_select_button_group
  api_endpoint: []
  db:
    relational:
      - table.users
      - table.user_preferences
    graph:
      - node.user
---
