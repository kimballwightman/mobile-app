---
type: endpoint
id: endpoint.api.auth_oauth_apple.POST
protocol: REST
description: |
  Authenticates a user via Apple OAuth and returns a session token.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/auth/oauth/apple
  method: POST
  params: []
  body:
    - name: id_token
      type: string
      required: true
      example: "apple_id_token_here"
    - name: nonce
      type: string
      required: false
      example: "random_nonce_for_verification"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Login successful.
    body:
      - name: token
        type: string
        example: "jwt_token_here"
      - name: user_id
        type: string
        example: "user_123"
      - name: is_new_user
        type: boolean
        example: false
  - status: 401
    description: Invalid Apple token.
    body:
      - name: error
        type: string
        example: "Invalid Apple authentication."

related:
  feature:
    - feature.authentication
  event:
    - event.apple_login
  screen:
    - screen.login
  component:
    - component.submit_button
  api_endpoint: []
  db:
    relational:
      - table.users
    graph: []
--- 