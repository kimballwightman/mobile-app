---
type: node
id: node.user_performance
title: User Performance
description: |
  Represents a user's performance metrics and trends over time, including progress toward goals and adherence to plans.

properties:
  - id: user_id
    type: uuid
    description: Reference to the user.
  - id: metric_type
    type: string
    description: Type of metric (e.g., calories, protein).
  - id: value
    type: int
    description: Value of the metric.
  - id: date
    type: date
    description: Date for the metric value.

edges:
  - type: TRACKS
    to_node: node.user
    direction: outbound
    description: Links performance metrics to the user.
  - type: RELATES_TO
    to_node: node.goal
    direction: outbound
    description: Connects performance metrics to user goals.

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
    - component.goal_tile
  api_endpoint:
    - endpoint.dashboard_data.GET
  db:
    relational:
      - table.user_metrics
--- 