---
type: table
id: table.user_meal_plan
title: User Meal Plan
description: |
  Stores planned meals for each user, including date, meal type, and associated recipe or food.

fields:
  - id: meal_plan_id
    type: uuid
    description: Unique identifier for the meal plan entry.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [foreign key, not null]
  - id: date
    type: date
    description: Date for the planned meal.
    constraints: [not null]
  - id: meal_type
    type: string
    description: Type of meal (breakfast, lunch, dinner, snack).
    constraints: [not null]
  - id: recipe_id
    type: uuid
    description: Reference to the recipe (nullable if food only).
    constraints: []
  - id: food_id
    type: uuid
    description: Reference to the food item (nullable if recipe only).
    constraints: []
  - id: portion
    type: float
    description: Planned portion size.
    constraints: []

related:
  feature:
    - feature.meal_plan_calendar
  event:
    - event.drag_and_drop_meal
  screen:
    - screen.meal_planning_tab
  component:
    - component.meal_plan_slot
  api_endpoint:
    - endpoint.meal_plan.GET
  db:
    graph:
      - node.user
      - node.recipe
      - node.food
---
