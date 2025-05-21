---
type: table
id: table.recipe_foods
title: Recipe Foods
description: |
  Join table linking recipes to their food ingredients and quantities.

fields:
  - id: recipe_food_id
    type: uuid
    description: Unique identifier for the recipe-food entry.
    constraints: [primary key, not null]
  - id: recipe_id
    type: uuid
    description: Reference to the recipe.
    constraints: [foreign key, not null]
  - id: food_id
    type: uuid
    description: Reference to the food item.
    constraints: [foreign key, not null]
  - id: quantity
    type: float
    description: Quantity of the food item in the recipe.
    constraints: [not null]
  - id: unit
    type: string
    description: Unit of measurement (g, oz, cup, etc.).
    constraints: [not null]

related:
  feature:
    - feature.expanded_meal_view
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
      - node.recipe
      - node.food
---
