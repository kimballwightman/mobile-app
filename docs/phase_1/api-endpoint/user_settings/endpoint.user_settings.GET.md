---
type: endpoint
id: endpoint.user_settings.GET
protocol: REST
description: |
  Retrieves the settings for the authenticated user, such as preferences and notification options.

request:
  headers:
    - name: Authorization
      value: Bearer <token>

rest:
  path: /api/user/settings
  method: GET
  params: []
  body: []

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: User settings successfully retrieved.
    body:
      - name: settings
        type: object
        example: { "notifications": true, "theme": "dark" }
        description: User's settings object.
  - status: 401
    description: Unauthorized. User is not authenticated.
    body: []

related:
  feature:
    - feature.dashboard
  event:
    - event.open_settings_section
  screen:
    - screen.dashboard
  component:
    - component.dashboard_top_bar
  api_endpoint: []
  db:
    relational:
      - table.user_settings
    graph:
      - node.user_settings
--- 