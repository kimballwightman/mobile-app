---
type: endpoint
id: endpoint.api.users_onboarding-status.PUT
protocol: REST
description: |
  Updates the user's onboarding completion status. Used at the end of onboarding to mark the user as fully onboarded.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/users/onboarding-status
  method: PUT
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: onboarding_completed
      type: boolean
      required: true
      example: true
    - name: completed_at
      type: string
      required: false
      example: "2024-06-01T12:00:00Z"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Onboarding status updated successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: onboarding_completed
        type: boolean
        example: true
      - name: completed_at
        type: string
        example: "2024-06-01T12:00:00Z"
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
  component:
    - component.next_screen_button
  api_endpoint: []
  db:
    relational:
      - table.users
    graph:
      - node.user
---
