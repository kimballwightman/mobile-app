---
type: node
id: node.recipe
title: Recipe
description: |
  Represents a recipe in the graph database, with relationships to foods, users, and tags.

properties:
  - id: recipe_id
    type: uuid
    description: Unique identifier for the recipe.
  - id: name
    type: string
    description: Name of the recipe.
  - id: description
    type: string
    description: Short description of the recipe.
  - id: calories
    type: int
    description: Calories per serving.
  - id: protein
    type: int
    description: Protein grams per serving.
  - id: carbs
    type: int
    description: Carbohydrate grams per serving.
  - id: fats
    type: int
    description: Fat grams per serving.

edges:
  - type: HAS_INGREDIENT
    to_node: node.food
    direction: outbound
    description: Recipe has food ingredients.
  - type: FAVORITED_BY
    to_node: node.user
    direction: inbound
    description: Recipe is favorited by users.
  - type: TAGGED_WITH
    to_node: node.tag
    direction: outbound
    description: Recipe is tagged with labels.

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
    relational:
      - table.recipes
---
