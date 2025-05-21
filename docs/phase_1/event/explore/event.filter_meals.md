---
type: event
id: event.filter_meals
feature_id: feature.meal_discovery
title: User Filters Meals by Search Query
description: |
  This event is triggered when the user types a search query in the Explore tab search bar and presses "Enter" (or taps a query suggestion). The app exits search mode and displays filtered results in the grid, fetching matching recipes from the backend.

preconditions:
  screens:
    - screen.explore_grid: state.search_mode
  components:
    - component.search_bar: state.focused

trigger:
  trigger_type: user_action
  component: component.search_bar
  screen: screen.explore_grid

api_request:
  endpoint: api.recipes_search_query.GET
  method: GET
  url: /api/recipes/search?q=<query>

db_interactions:
  relational:
    - table.recipes:
        actions:
          - "Query for recipes matching the search query."
    - table.foods:
        actions:
          - "Optionally match ingredients to search query."
    - table.tags:
        actions:
          - "Optionally match tags to search query."
  graph:
    - node.recipe:
        actions:
          - "Return recipe nodes matching the search query."

state_changes:
  components:
    - component.search_bar:
        state: state.idle
        description: "Search bar returns to idle state after search is submitted."
    - component.infinite_scroll_grid:
        state: state.loaded
        description: "Grid displays filtered meal cards matching the search query."
  screens:
    - screen.explore_grid:
        state: state.grid_loaded
        description: "Explore screen displays the filtered grid of meal cards."

navigation: []

next_possible_events:
  - event.grid_scroll
  - event.filter_meals
  - event.search_bar

responses:
  - Fetches and displays filtered meal cards matching the search query.
  - Exits search mode and restores scrollable Explore grid.
  - Shows placeholder if no results are found.
---
