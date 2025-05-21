---
type: table
id: table.workout_log
title: Workout Log
description: |
  Stores records of workouts logged by users, including workout type, duration, and calories burned.

fields:
  - id: id
    type: uuid
    description: Unique identifier for the workout log.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [not null, foreign key]
  - id: workout_id
    type: uuid
    description: Reference to the workout.
    constraints: [not null, foreign key]
  - id: logged_at
    type: timestamp
    description: Timestamp when the workout was logged.
    constraints: [not null]
  - id: type
    type: string
    description: Type of workout (e.g., cardio, strength).
    constraints: [not null]
  - id: duration
    type: int
    description: Duration in minutes.
    constraints: [not null]
  - id: calories_burned
    type: int
    description: Calories burned during the workout.
    constraints: [not null]

related:
  feature:
    - feature.dashboard
  event:
    - event.log_workout
    - event.change_dashboard_date
  screen:
    - screen.dashboard
  component:
    - component.meal_workout_tile
  api_endpoint:
    - endpoint.dashboard_data.GET
  db:
    graph:
      - node.user_activity
--- 