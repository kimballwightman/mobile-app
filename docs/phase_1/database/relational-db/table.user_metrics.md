---
type: table
id: table.user_metrics
title: User Metrics
description: |
  Stores daily and historical metrics for each user, such as calories, protein, carbs, fats, and other tracked values.

fields:
  - id: id
    type: uuid
    description: Unique identifier for the metrics record.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [not null, foreign key]
  - id: date
    type: date
    description: Date for which metrics are recorded.
    constraints: [not null]
  - id: calories
    type: int
    description: Total calories consumed.
    constraints: [not null]
  - id: protein
    type: int
    description: Total protein consumed (grams).
    constraints: [not null]
  - id: carbs
    type: int
    description: Total carbohydrates consumed (grams).
    constraints: [not null]
  - id: fats
    type: int
    description: Total fats consumed (grams).
    constraints: [not null]
  - id: created_at
    type: timestamp
    description: Record creation timestamp.
    constraints: [not null]
  - id: updated_at
    type: timestamp
    description: Record last update timestamp.
    constraints: [not null]

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
    - component.weekly_summary_tile
  api_endpoint:
    - endpoint.dashboard_data.GET
  db:
    graph:
      - node.user_performance
--- 