---
type: endpoint
id: endpoint.log_workout.POST
protocol: REST
description: |
  Logs a new workout for the authenticated user, including workout details and calories burned.

request:
  headers:
    - name: Authorization
      value: Bearer <token>
    - name: Content-Type
      value: application/json

rest:
  path: /api/log_workout
  method: POST
  params: []
  body:
    - name: workout_id
      type: uuid
      required: true
      example: 123e4567-e89b-12d3-a456-426614174000
      description: Reference to the workout being logged.
    - name: logged_at
      type: timestamp
      required: true
      example: 2024-06-01T12:00:00Z
      description: Timestamp when the workout was logged.
    - name: type
      type: string
      required: true
      example: "Cardio"
      description: Type of workout.
    - name: duration
      type: int
      required: true
      example: 45
      description: Duration in minutes.
    - name: calories_burned
      type: int
      required: true
      example: 400
      description: Calories burned during the workout.

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 201
    description: Workout successfully logged.
    body:
      - name: workout_log_id
        type: uuid
        example: 789e4567-e89b-12d3-a456-426614174000
        description: ID of the created workout log.
  - status: 400
    description: Invalid request data.
    body: []
  - status: 401
    description: Unauthorized. User is not authenticated.
    body: []

related:
  feature:
    - feature.dashboard
  event:
    - event.log_workout
  screen:
    - screen.dashboard
  component:
    - component.meal_workout_tile
  api_endpoint:
    - endpoint.dashboard_data.GET
  db:
    relational:
      - table.workout_log
    graph:
      - node.workout_event
      - node.user_activity
--- 