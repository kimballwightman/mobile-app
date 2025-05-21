---
type: node
id: node.meal_event
title: Meal Event
description: |
  Represents a meal logging event, including references to the user and meal log.

properties:
  - id: user_id
    type: uuid
    description: Reference to the user.
  - id: meal_log_id
    type: uuid
    description: Reference to the meal log.
  - id: timestamp
    type: timestamp
    description: When the meal was logged.

edges:
  - type: LOGGED
    to_node: node.user
    direction: outbound
    description: Links meal event to the user.
  - type: LOGS
    to_node: node.meal_log
    direction: outbound
    description: Connects meal event to the meal log.

related:
  feature:
    - feature.dashboard
  event:
    - event.log_meal
  screen:
    - screen.dashboard
  component:
    - component.meal_history_tile
  api_endpoint:
    - endpoint.log_meal.POST
  db:
    relational:
      - table.meal_log
--- 