---
type: endpoint
id: endpoint.api.user_payments_id.PATCH
protocol: REST
description: |
  Updates an existing payment method for the user (e.g., set as default, update details).

request:
  headers:
    - name: Content-Type
      value: application/json

rest:
  path: /api/user/payments/{id}
  method: PATCH
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
    - name: payment_method
      type: object
      required: true
      example: {"isDefault": true}
      description: "Fields to update for the payment method."

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Payment method updated successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: payment_method
        type: object
        example: {"isDefault": true}
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
