---
type: endpoint
id: endpoint.get_dashboard_summary
protocol: GraphQL
description: |
  Fetches the dashboard summary for a given date, including top nutrient bars, macro/calorie progress vs goals, and daily breakdown with in-range booleans.

request:
  headers:
    - name: Authorization
      value: Bearer <token>

graphql:
  operationType: query
  operationName: GetDashboardSummary
  query: |
    query GetDashboardSummary($date: String!) {
      dashboardSummary(date: $date) {
        date
        calories {
          value
          goal
          inRange
        }
        macros {
          protein { value goal inRange }
          carbs { value goal inRange }
          fat { value goal inRange }
        }
        topNutrients {
          name
          value
          goal
          inRange
        }
      }
    }
  variables:
    - name: date
      type: string
      required: true
      example: "2024-06-01"

rest:
  path: null
  method: null
  params: []
  body: []

responses:
  - status: 200
    description: Dashboard summary data returned successfully.
    body:
      - name: dashboardSummary
        type: object
        example: {"date": "2024-06-01", "calories": {"value": 1800, "goal": 2000, "inRange": true}, "macros": {"protein": {"value": 120, "goal": 130, "inRange": true}, "carbs": {"value": 200, "goal": 220, "inRange": true}, "fat": {"value": 60, "goal": 70, "inRange": true}}, "topNutrients": [{"name": "Fiber", "value": 30, "goal": 28, "inRange": true}]}

related:
  feature:
    - feature.dashboard
  event:
    - event.toggle_metric_type
    - event.change_dashboard_date
  screen:
    - screen.dashboard
  component:
    - component.nutrient_bar
    - component.metric_toggle
  api_endpoint: []
  db:
    graph:
      - node.dashboardSummary
    relational: []
--- 