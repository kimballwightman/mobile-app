---
type: node
id: node.tag
title: Tag
description: |
  Represents a tag or label for categorizing recipes or foods in the graph database.

properties:
  - id: tag_id
    type: uuid
    description: Unique identifier for the tag.
  - id: name
    type: string
    description: Name of the tag (e.g., high-protein, vegan).

edges:
  - type: TAGS
    to_node: node.recipe
    direction: inbound
    description: Tag is applied to recipes.
  - type: TAGS
    to_node: node.food
    direction: inbound
    description: Tag is applied to foods.

related:
  feature:
    - feature.meal_discovery
  event:
    - event.filter_meals
  screen:
    - screen.explore_grid
  component:
    - component.filter_pill
  api_endpoint:
    - endpoint.recipes-foods.GET
  db:
    relational:
      - table.recipes
---
