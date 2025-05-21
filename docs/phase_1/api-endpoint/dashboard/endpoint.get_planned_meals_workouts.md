---
type: endpoint
id: endpoint.dashboard_get-planned-meals-workouts.graphql
protocol: GraphQL
description: |
  Fetches planned meals and workouts for a given date, returning structured plan data for dashboard tiles and actions.

request:
  headers:
    - name: Authorization
      value: Bearer <token>

graphql:
  operationType: query
  operationName: GetPlannedMealsAndWorkouts
  query: |
    query GetPlannedMealsAndWorkouts($date: String!) {
      plannedMealsAndWorkouts(date: $date) {
        date
        meals {
          id
          name
          time
          status
        }
        workouts {
          id
          name
          time
          status
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
    description: Planned meals and workouts data returned successfully.
    body:
      - name: plannedMealsAndWorkouts
        type: object
        example: {"date": "2024-06-01", "meals": [{"id": "meal_1", "name": "Breakfast", "time": "08:00", "status": "completed"}], "workouts": [{"id": "workout_1", "name": "Cardio", "time": "18:00", "status": "pending"}]}

related:
  feature:
    - feature.dashboard
  event:
    - event.log_meal
    - event.log_workout
  screen:
    - screen.dashboard
  component:
    - component.meal_workout_tile
  api_endpoint: []
  db:
    graph:
      - node.plannedMealsAndWorkouts
    relational: []
---
