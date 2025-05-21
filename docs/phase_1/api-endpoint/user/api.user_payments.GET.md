---
type: endpoint
id: endpoint.api.user_payments.GET
protocol: REST
description: |
  Fetches the user's saved payment methods.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/user/payments
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
    description: Payment methods fetched successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: payments
        type: array
        example: [{"type": "credit_card", "last4": "1234", "isDefault": true}]
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
