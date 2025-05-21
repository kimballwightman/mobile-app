---
type: endpoint
id: endpoint.user_integrations.GET
protocol: REST
description: |
  Retrieves the list of integrations connected to the authenticated user's account.

request:
  headers:
    - name: Authorization
      value: Bearer <token>

rest:
  path: /api/user/integrations
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
    description: User integrations successfully retrieved.
    body:
      - name: integrations
        type: array
        example: [ { "integration_id": "fitbit", "connected": true } ]
        description: List of user integrations.
  - status: 401
    description: Unauthorized. User is not authenticated.
    body: []

related:
  feature:
    - feature.dashboard
  event:
    - event.open_integrations
  screen:
    - screen.dashboard
  component:
    - component.integration_tile
  api_endpoint: []
  db:
    relational:
      - table.user_integrations
    graph:
      - node.user_integration
--- 