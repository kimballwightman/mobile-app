---
type: endpoint
id: endpoint.api.auth_forgot_password.POST
protocol: REST
description: |
  Initiates a password reset process for the user by sending a reset email.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/auth/forgot-password
  method: POST
  params: []
  body:
    - name: email
      type: string
      required: true
      example: "user@example.com"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Password reset email sent successfully.
    body:
      - name: message
        type: string
        example: "Password reset email sent."
  - status: 404
    description: Email not found.
    body:
      - name: error
        type: string
        example: "Email not found."

related:
  feature:
    - feature.authentication
  event:
    - event.forgot_password
  screen:
    - screen.forgot_password
  component:
    - component.input_field
    - component.submit_button
  api_endpoint: []
  db:
    relational:
      - table.users
    graph: []
---
