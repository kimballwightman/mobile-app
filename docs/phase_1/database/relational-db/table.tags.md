---
type: table
id: table.tags
title: Tags
description: |
  Stores tags for categorizing meals and foods (e.g., vegan, high-protein, gluten-free) to support advanced filtering and search in meal discovery.

fields:
  - id: id
    type: uuid
    description: Unique identifier for the tag.
    constraints: [primary key, not null]
  - id: name
    type: string
    description: Name of the tag (e.g., "vegan").
    constraints: [not null, unique]
  - id: description
    type: string
    description: Description of the tag.
    constraints: []
  - id: created_at
    type: timestamp
    description: Record creation timestamp.
    constraints: [not null]
  - id: updated_at
    type: timestamp
    description: Record last update timestamp.
    constraints: [not null]

related:
  feature:
    - feature.meal_discovery
  event:
    - event.apply_filters
    - event.filter_meals
  screen:
    - screen.explore_grid
  component:
    - component.filter_button
  api_endpoint:
    - endpoint.api.recipes_search_query.GET
  db:
    graph:
      - node.tag
--- 