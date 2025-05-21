---
type: endpoint
id: endpoint.api.user_payments.POST
protocol: REST
description: |
  Adds a new payment method for the user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/user/payments
  method: POST
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
    - name: payment_method
      type: object
      required: true
      example: {"type": "credit_card", "last4": "1234", "isDefault": false}
      description: "Payment method details."

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 201
    description: Payment method added successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: payment_method
        type: object
        example: {"type": "credit_card", "last4": "1234", "isDefault": false}
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
    - event.manage_payments
  screen:
    - screen.payment_settings
  component: []
  api_endpoint: []
  db:
    relational:
      - table.users
    graph: []
---
