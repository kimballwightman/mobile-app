---
type: table
id: table.user_favorites
title: User Favorites
description: |
  Stores a user's favorite recipes or foods for quick access and planning.

fields:
  - id: favorite_id
    type: uuid
    description: Unique identifier for the favorite entry.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [foreign key, not null]
  - id: recipe_id
    type: uuid
    description: Reference to the recipe (nullable if food only).
    constraints: []
  - id: food_id
    type: uuid
    description: Reference to the food item (nullable if recipe only).
    constraints: []
  - id: created_at
    type: timestamp
    description: When the favorite was added.
    constraints: [not null]

related:
  feature:
    - feature.meal_discovery
  event:
    - event.add_to_favorites
  screen:
    - screen.explore_grid
  component:
    - component.meal_card
  api_endpoint:
    - endpoint.favorites_user-id.GET
  db:
    graph:
      - node.user
      - node.recipe
      - node.food
---
