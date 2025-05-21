---
type: event
id: event.clear_filters
title: Clear Filters
description: |
  Triggered when a user clears all selected filters in the filter modal or panel, resetting the meal grid to its default state.

actor: user
trigger: Tap on the clear/reset button in the filter modal or panel.
preconditions:
  - Filter modal or panel is open.
  - At least one filter is selected.
postconditions:
  - All filters are cleared.
  - Meal grid is reset to show unfiltered results.

related:
  feature:
    - feature.meal_discovery
  screen:
    - screen.explore_grid
  component:
    - component.filter_button
    - component.infinite_scroll_grid
  event:
    - event.open_filters
    - event.apply_filters
  api_endpoint:
    - endpoint.api.recipes_feed.GET
  db: {}
--- 