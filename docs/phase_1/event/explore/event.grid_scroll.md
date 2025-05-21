---
type: event
id: event.grid_scroll
feature_id: feature.meal_discovery
title: User Scrolls Meal Grid (Pagination)
description: |
  This event is triggered when the user scrolls near the bottom of the meal grid on the Explore tab. The app fetches the next page of meal cards from the backend and appends them to the grid, supporting infinite scroll.

preconditions:
  screens:
    - screen.explore_grid: state.grid_loaded
  components:
    - component.infinite_scroll_grid: state.loaded

trigger:
  trigger_type: user_action
  component: component.infinite_scroll_grid
  screen: screen.explore_grid

api_request:
  endpoint: api.recipes_feed.GET
  method: GET
  url: /api/recipes/feed?limit=20&offset=<next_offset>&user_id=<user_id>

db_interactions:
  relational:
    - table.recipes:
        actions:
          - "Query for next page of recipes for infinite scroll."
    - table.user_preferences:
        actions:
          - "Optionally personalize feed based on user preferences."
    - table.user_meal_plan:
        actions:
          - "Optionally exclude previously disliked meals."
  graph:
    - node.recipe:
        actions:
          - "Return next set of recipe nodes for grid display."

state_changes:
  components:
    - component.infinite_scroll_grid:
        state: state.loading
        description: "Grid shows loading state while fetching more recipes."
    - component.infinite_scroll_grid:
        state: state.loaded
        description: "Grid appends new meal cards to the existing list."
  screens:
    - screen.explore_grid:
        state: state.grid_loaded
        description: "Explore screen displays the updated grid of meal cards."

navigation: []

next_possible_events:
  - event.grid_scroll
  - event.filter_meals
  - event.search_bar

responses:
  - Fetches and appends additional meal cards to the grid from the backend.
  - Shows loading state while fetching more recipes.
  - Supports infinite scroll for additional meal cards.
---
