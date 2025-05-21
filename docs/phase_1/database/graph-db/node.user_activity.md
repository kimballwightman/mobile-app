---
type: node
id: node.user_activity
title: User Activity
description: |
  Represents a user's activity, including meals and workouts logged, and their relationships to other entities.

properties:
  - id: user_id
    type: uuid
    description: Reference to the user.
  - id: activity_type
    type: string
    description: Type of activity (meal, workout).
  - id: activity_id
    type: uuid
    description: Reference to the meal or workout log.
  - id: timestamp
    type: timestamp
    description: When the activity occurred.

edges:
  - type: LOGGED
    to_node: node.user
    direction: outbound
    description: Links activity to the user.
  - type: ASSOCIATED_WITH
    to_node: node.meal
    direction: outbound
    description: Associates activity with a meal (if applicable).
  - type: ASSOCIATED_WITH
    to_node: node.workout
    direction: outbound
    description: Associates activity with a workout (if applicable).

related:
  feature:
    - feature.dashboard
  event:
    - event.log_meal
    - event.log_workout
    - event.change_dashboard_date
  screen:
    - screen.dashboard
  component:
    - component.meal_workout_tile
  api_endpoint:
    - endpoint.dashboard_data.GET
  db:
    relational:
      - table.meal_log
      - table.workout_log
--- 