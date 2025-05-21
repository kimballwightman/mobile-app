---
type: event
id: event.apply_filters
title: Apply Filters
description: |
  Triggered when a user applies selected filters to update the meal grid in the explore tab. Filters are not applied in real-time but require explicit user confirmation via an "Apply" button to update results.

actor: user
trigger: Tap on the apply button in the filter modal.
preconditions:
  - Filter modal is open.
  - At least one filter is selected.
postconditions:
  - Meal grid is updated to reflect the selected filters.
  - Filter modal is closed.
  - Filter button indicates active filters are applied.

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
    - event.clear_filters
  api_endpoint:
    - endpoint.api.recipes_search_query.GET
  db: {}
--- 