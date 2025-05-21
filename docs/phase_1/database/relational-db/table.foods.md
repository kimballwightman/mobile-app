---
type: table
id: table.foods
title: Foods
description: |
  Stores individual food items, their nutritional information, and labels.

fields:
  - id: food_id
    type: uuid
    description: Unique identifier for the food item.
    constraints: [primary key, not null]
  - id: name
    type: string
    description: Name of the food item.
    constraints: [not null]
  - id: brand
    type: string
    description: Brand of the food item (if applicable).
    constraints: []
  - id: calories
    type: int
    description: Calories per serving.
    constraints: [not null]
  - id: protein
    type: int
    description: Protein grams per serving.
    constraints: [not null]
  - id: carbs
    type: int
    description: Carbohydrate grams per serving.
    constraints: [not null]
  - id: fats
    type: int
    description: Fat grams per serving.
    constraints: [not null]
  - id: serving_size
    type: string
    description: Serving size description.
    constraints: []
  - id: ingredients
    type: string
    description: Comma-separated list of ingredients.
    constraints: []

related:
  feature:
    - feature.meal_discovery
    - feature.pantry_management
  event:
    - event.select_food_item
  screen:
    - screen.explore_grid
  component:
    - component.food_list_item_tile
  api_endpoint:
    - endpoint.recipes-foods.GET
  db:
    graph:
      - node.food
---
