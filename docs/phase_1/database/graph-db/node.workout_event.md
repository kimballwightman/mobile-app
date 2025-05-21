---
type: node
id: node.workout_event
title: Workout Event
description: |
  Represents a workout logging event, including references to the user and workout log.

properties:
  - id: user_id
    type: uuid
    description: Reference to the user.
  - id: workout_log_id
    type: uuid
    description: Reference to the workout log.
  - id: timestamp
    type: timestamp
    description: When the workout was logged.

edges:
  - type: LOGGED
    to_node: node.user
    direction: outbound
    description: Links workout event to the user.
  - type: LOGS
    to_node: node.workout_log
    direction: outbound
    description: Connects workout event to the workout log.

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
    - endpoint.log_workout.POST
  db:
    relational:
      - table.workout_log
--- 