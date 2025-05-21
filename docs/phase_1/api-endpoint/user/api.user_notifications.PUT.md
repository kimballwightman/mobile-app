---
type: endpoint
id: endpoint.api.user_notifications.PUT
protocol: REST
description: |
  Updates the user's notification preferences (e.g., email, push notifications).

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/user/notifications
  method: PUT
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: preferences
      type: object
      required: true
      example: {"email": true, "push": false}
      description: "Notification preferences to update."

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Notification preferences updated successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: preferences
        type: object
        example: {"email": true, "push": false}
  - status: 400
    description: Invalid request or missing parameters.
    body:
      - name: error
        type: string
        example: "Missing user_id."

related:
  feature:
    - feature.settings_management
  event:
    - event.manage_notifications
  screen:
    - screen.notification_settings
  component: []
  api_endpoint: []
  db:
    relational:
      - table.users
    graph: []
---
