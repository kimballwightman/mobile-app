---
type: endpoint
id: endpoint.dashboard_update-metric-preferences.graphql
protocol: GraphQL
description: |
  Updates the dashboard metric preferences for the user, such as toggling UI metric types.

request:
  headers:
    - name: Authorization
      value: Bearer <token>

graphql:
  operationType: mutation
  operationName: UpdateDashboardMetricPreferences
  query: |
    mutation UpdateDashboardMetricPreferences($input: MetricPreferencesInput!) {
      updateDashboardMetricPreferences(input: $input) {
        userId
        preferences {
          metricType
          showCalories
          showMacros
        }
      }
    }
  variables:
    - name: input
      type: MetricPreferencesInput
      required: true
      example: {"metricType": "calories", "showCalories": true, "showMacros": false}

rest:
  path: null
  method: null
  params: []
  body: []

responses:
  - status: 200
    description: Metric preferences updated successfully.
    body:
      - name: updateDashboardMetricPreferences
        type: object
        example: {"userId": "user_123", "preferences": {"metricType": "calories", "showCalories": true, "showMacros": false}}

related:
  feature:
    - feature.dashboard
  event:
    - event.toggle_metric_type
  screen:
    - screen.dashboard
  component:
    - component.metric_toggle
  api_endpoint: []
  db:
    graph:
      - node.metricPreferences
    relational: []
--- 