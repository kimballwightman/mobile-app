---
type: endpoint
id: endpoint.api.user_notifications.GET
protocol: REST
description: |
  Fetches the user's notification preferences and current notification settings.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/user/notifications
  method: GET
  params:
    - name: user_id
      type: string
      required: true
      example: "user_123"
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Notification preferences fetched successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: preferences
        type: object
        example: {"email": true, "push": false}
  - status: 404
    description: User not found.
    body:
      - name: error
        type: string
        example: "User not found."

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
