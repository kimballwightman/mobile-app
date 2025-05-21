---
type: table
id: table.meal_log
title: Meal Log
description: |
  Stores records of meals logged by users, including meal details, time, and nutritional breakdown.

fields:
  - id: id
    type: uuid
    description: Unique identifier for the meal log.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [not null, foreign key]
  - id: meal_id
    type: uuid
    description: Reference to the meal.
    constraints: [not null, foreign key]
  - id: logged_at
    type: timestamp
    description: Timestamp when the meal was logged.
    constraints: [not null]
  - id: calories
    type: int
    description: Calories in the meal.
    constraints: [not null]
  - id: protein
    type: int
    description: Protein in the meal (grams).
    constraints: [not null]
  - id: carbs
    type: int
    description: Carbohydrates in the meal (grams).
    constraints: [not null]
  - id: fats
    type: int
    description: Fats in the meal (grams).
    constraints: [not null]

related:
  feature:
    - feature.dashboard
  event:
    - event.log_meal
    - event.change_dashboard_date
  screen:
    - screen.dashboard
  component:
    - component.meal_history_tile
  api_endpoint:
    - endpoint.dashboard_data.GET
  db:
    graph:
      - node.user_activity
--- 