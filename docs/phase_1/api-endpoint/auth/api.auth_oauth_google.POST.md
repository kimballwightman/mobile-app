---
type: endpoint
id: endpoint.api.auth_oauth_google.POST
protocol: REST
description: |
  Authenticates a user via Google OAuth and returns a session token.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/auth/oauth/google
  method: POST
  params: []
  body:
    - name: oauth_token
      type: string
      required: true
      example: "google_oauth_token_here"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Google OAuth login successful.
    body:
      - name: token
        type: string
        example: "jwt_token_here"
      - name: user_id
        type: string
        example: "user_123"
  - status: 401
    description: Invalid OAuth token.
    body:
      - name: error
        type: string
        example: "Invalid OAuth token."

related:
  feature:
    - feature.authentication
  event:
    - event.login
  screen:
    - screen.login
  component:
    - component.input_field
    - component.submit_button
  api_endpoint: []
  db:
    relational:
      - table.users
    graph: []
---
