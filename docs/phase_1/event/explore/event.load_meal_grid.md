---
type: event
id: event.load_meal_grid
feature_id: feature.meal_discovery
title: Load Meal Grid on Explore Tab
description: |
  This event is triggered when the user navigates to the Explore tab (either initially or via bottom navigation). The app loads a default grid of meal cards by fetching a curated or personalized list of recipes from the backend.

preconditions:
  screens:
    - screen.explore_grid: state.rendered
  components:
    - component.infinite_scroll_grid: state.idle

trigger:
  trigger_type: user_action
  component: component.infinite_scroll_grid
  screen: screen.explore_grid

api_request:
  endpoint: api.recipes_feed.GET
  method: GET
  url: /api/recipes/feed?limit=20&offset=0&user_id=<user_id>

db_interactions:
  relational:
    - table.recipes:
        actions:
          - "Query for base recipe info (name, image, calories, etc.)."
    - table.user_preferences:
        actions:
          - "Optionally personalize feed based on user preferences."
    - table.user_meal_plan:
        actions:
          - "Optionally exclude previously disliked meals."
  graph:
    - node.recipe:
        actions:
          - "Return recipe nodes for grid display."

state_changes:
  components:
    - component.infinite_scroll_grid:
        state: state.loading
        description: "Grid shows loading state while fetching recipes."
    - component.infinite_scroll_grid:
        state: state.loaded
        description: "Grid displays fetched meal cards."
  screens:
    - screen.explore_grid:
        state: state.grid_loaded
        description: "Explore screen displays the loaded grid of meal cards."

navigation: []

next_possible_events:
  - event.grid_scroll
  - event.filter_meals
  - event.search_bar

responses:
  - Fetches and displays a grid of meal cards from the backend.
  - Shows loading state while fetching.
  - Supports infinite scroll for additional meal cards.
---
