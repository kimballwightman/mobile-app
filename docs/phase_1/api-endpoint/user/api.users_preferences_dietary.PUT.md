---
type: endpoint
id: endpoint.api.users_preferences_dietary.PUT
protocol: REST
description: |
  Updates the user's dietary preferences, such as diet type and allergies, as part of onboarding or settings management.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/users/preferences/dietary
  method: PUT
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: diet_type
      type: string
      required: true
      example: "vegetarian"
    - name: allergies
      type: array
      required: false
      example: ["peanuts", "gluten"]
      description: "List of user allergies."

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Dietary preferences updated successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: diet_type
        type: string
        example: "vegetarian"
      - name: allergies
        type: array
        example: ["peanuts", "gluten"]
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
    - screen.dietary_preferences
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
      - node.tag
---
