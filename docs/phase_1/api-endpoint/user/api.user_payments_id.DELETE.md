---
type: endpoint
id: endpoint.api.user_payments_id.DELETE
protocol: REST
description: |
  Deletes a payment method for the user.

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/user/payments/{id}
  method: DELETE
  params:
    - name: id
      type: string
      required: true
      example: "payment_456"
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Payment method deleted successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: deleted_payment_id
        type: string
        example: "payment_456"
  - status: 404
    description: Payment method not found.
    body:
      - name: error
        type: string
        example: "Payment method not found."

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
