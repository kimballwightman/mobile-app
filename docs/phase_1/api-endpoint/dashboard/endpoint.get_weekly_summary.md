---
type: endpoint
id: endpoint.get_weekly_summary
protocol: GraphQL
description: |
  Fetches the weekly summary for the dashboard, including aggregate and per-day trend data for the given date range.

request:
  headers:
    - name: Authorization
      value: Bearer <token>

graphql:
  operationType: query
  operationName: GetWeeklySummary
  query: |
    query GetWeeklySummary($startDate: String!, $endDate: String!) {
      weeklySummary(startDate: $startDate, endDate: $endDate) {
        startDate
        endDate
        days {
          date
          calories { value goal inRange }
          macros {
            protein { value goal inRange }
            carbs { value goal inRange }
            fat { value goal inRange }
          }
        }
        aggregate {
          avgCalories
          avgProtein
          avgCarbs
          avgFat
        }
      }
    }
  variables:
    - name: startDate
      type: string
      required: true
      example: "2024-06-01"
    - name: endDate
      type: string
      required: true
      example: "2024-06-07"

rest:
  path: null
  method: null
  params: []
  body: []

responses:
  - status: 200
    description: Weekly summary data returned successfully.
    body:
      - name: weeklySummary
        type: object
        example: {"startDate": "2024-06-01", "endDate": "2024-06-07", "days": [{"date": "2024-06-01", "calories": {"value": 1800, "goal": 2000, "inRange": true}, "macros": {"protein": {"value": 120, "goal": 130, "inRange": true}, "carbs": {"value": 200, "goal": 220, "inRange": true}, "fat": {"value": 60, "goal": 70, "inRange": true}}], "aggregate": {"avgCalories": 1850, "avgProtein": 125, "avgCarbs": 210, "avgFat": 65}}

related:
  feature:
    - feature.dashboard
  event:
    - event.change_dashboard_date
    - event.toggle_metric_type
  screen:
    - screen.dashboard
  component:
    - component.trend_graph
    - component.weekly_summary_tile
  api_endpoint: []
  db:
    graph:
      - node.weeklySummary
    relational: []
---