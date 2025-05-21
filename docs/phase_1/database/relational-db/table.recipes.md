---
type: table
id: table.recipes
title: Recipes
description: |
  Stores recipes, their instructions, and nutritional information.

fields:
  - id: recipe_id
    type: uuid
    description: Unique identifier for the recipe.
    constraints: [primary key, not null]
  - id: name
    type: string
    description: Name of the recipe.
    constraints: [not null]
  - id: description
    type: string
    description: Short description of the recipe.
    constraints: []
  - id: instructions
    type: string
    description: Step-by-step instructions.
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
  - id: servings
    type: int
    description: Number of servings the recipe makes.
    constraints: [not null]

related:
  feature:
    - feature.meal_discovery
    - feature.expanded_meal_view
  event:
    - event.expand_meal_card
  screen:
    - screen.explore_grid
  component:
    - component.recipe_content
  api_endpoint:
    - endpoint.recipes-foods.GET
  db:
    graph:
      - node.recipe
---
