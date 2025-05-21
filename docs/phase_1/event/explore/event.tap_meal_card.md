---
type: event
id: event.tap_meal_card
title: Tap Meal Card
description: |
  Triggered when a user taps on a meal card in the meal discovery grid. Navigates to the expanded meal view for the selected meal.

actor: user
trigger: Tap on a meal card in the explore grid.
preconditions:
  - Meal grid is loaded and visible.
  - At least one meal card is present.
postconditions:
  - Expanded meal view is opened for the selected meal.
  - Meal details, ingredients, and actions are displayed.

related:
  feature:
    - feature.meal_discovery
  screen:
    - screen.explore_grid
  component:
    - component.meal_card
    - component.recipe_content
  event:
    - event.expand_meal_card
  api_endpoint:
    - endpoint.api.recipes_id.GET
  db:
    relational:
      - table.recipes
    graph:
      - node.recipe
--- 