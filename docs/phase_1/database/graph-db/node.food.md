---
type: node
id: node.food
title: Food
description: |
  Represents a food item in the graph database, with nutritional info and relationships to recipes, pantry, and shopping cart.

properties:
  - id: food_id
    type: uuid
    description: Unique identifier for the food item.
  - id: name
    type: string
    description: Name of the food item.
  - id: brand
    type: string
    description: Brand of the food item.
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
  - type: INGREDIENT_IN
    to_node: node.recipe
    direction: inbound
    description: Food is an ingredient in recipes.
  - type: IN_PANTRY
    to_node: node.pantry_items
    direction: outbound
    description: Food is present in user's pantry.
  - type: IN_CART
    to_node: node.shopping_cart
    direction: outbound
    description: Food is present in user's shopping cart.

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
    relational:
      - table.foods
---
