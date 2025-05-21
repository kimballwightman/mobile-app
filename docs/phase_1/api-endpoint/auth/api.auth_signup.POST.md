---
type: endpoint
id: endpoint.api.auth_signup.POST
protocol: REST
description: |
  Registers a new user and returns a session token.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/auth/signup
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
    - name: name
      type: string
      required: true
      example: "Jane Doe"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 201
    description: Signup successful.
    body:
      - name: token
        type: string
        example: "jwt_token_here"
      - name: user_id
        type: string
        example: "user_123"
  - status: 400
    description: Invalid request or missing parameters.
    body:
      - name: error
        type: string
        example: "Missing email."

related:
  feature:
    - feature.authentication
  event:
    - event.signup
  screen:
    - screen.signup
  component:
    - component.input_field
    - component.submit_button
  api_endpoint: []
  db:
    relational:
      - table.users
    graph: []
---
