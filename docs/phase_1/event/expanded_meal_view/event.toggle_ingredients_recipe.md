---
type: event
id: event.toggle_ingredients_recipe
title: Toggle Ingredients/Recipe
description: |
  Triggered when a user toggles between viewing ingredients and recipe instructions in the expanded meal view.

actor: user
trigger: Tap on the toggle bar or button in the expanded meal view.
preconditions:
  - Expanded meal view is open.
  - Toggle bar or button is visible.
postconditions:
  - View switches between ingredients and recipe instructions.

related:
  feature:
    - feature.meal_discovery
    - feature.expanded_meal_view
  screen:
    - screen.explore_grid
  component:
    - component.toggle_bar
    - component.recipe_content
  event:
    - event.expand_meal_card
  api_endpoint:
    - endpoint.api.recipes_id.GET
  db: {}
--- 