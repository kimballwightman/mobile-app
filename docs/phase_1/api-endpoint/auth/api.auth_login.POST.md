---
type: endpoint
id: endpoint.api.auth_login.POST
protocol: REST
description: |
  Authenticates a user and returns a session token.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/auth/login
  method: POST
  params: []
  body:
    - name: email
      type: string
      required: true
      example: "user@example.com"
    - name: password
      type: string
      required: true
      example: "password123"

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
  - status: 401
    description: Invalid credentials.
    body:
      - name: error
        type: string
        example: "Invalid email or password."

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
