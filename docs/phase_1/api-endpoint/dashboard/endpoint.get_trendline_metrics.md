---
type: endpoint
id: endpoint.get_trendline_metrics
protocol: GraphQL
description: |
  Fetches long-term trendline metrics for the dashboard, returning week-by-week averages for the specified number of weeks back.

request:
  headers:
    - name: Authorization
      value: Bearer <token>

graphql:
  operationType: query
  operationName: GetTrendlineMetrics
  query: |
    query GetTrendlineMetrics($weeksBack: Int!) {
      trendlineMetrics(weeksBack: $weeksBack) {
        week
        avgCalories
        avgProtein
        avgCarbs
        avgFat
      }
    }
  variables:
    - name: weeksBack
      type: int
      required: true
      example: 12

rest:
  path: null
  method: null
  params: []
  body: []

responses:
  - status: 200
    description: Trendline metrics data returned successfully.
    body:
      - name: trendlineMetrics
        type: array
        example: [{"week": "2024-W01", "avgCalories": 1800, "avgProtein": 120, "avgCarbs": 200, "avgFat": 60}]

related:
  feature:
    - feature.dashboard
  event:
    - event.toggle_metric_type
  screen:
    - screen.dashboard
  component:
    - component.trend_graph
  api_endpoint: []
  db:
    graph:
      - node.trendlineMetrics
    relational: []
---
