---
type: event
id: event.search_bar
feature_id: feature.meal_discovery
title: User Taps Search Bar on Explore Tab
description: |
  This event is triggered when the user taps the search bar at the top of the Explore tab. The app expands the search bar into a full search window, activates the search input field, displays an overlay, and shows search suggestions or a placeholder panel. No backend request is made until the user types a query.

preconditions:
  screens:
    - screen.explore_grid: state.grid_loaded
  components:
    - component.search_bar: state.idle

trigger:
  trigger_type: user_action
  component: component.search_bar
  screen: screen.explore_grid

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.search_bar:
        state: state.focused
        description: "Search input field is focused and ready for user input."
    - component.search_bar:
        state: state.expanded
        description: "Search bar expands into a full search window."
    - component.search_bar:
        state: state.suggestions
        description: "Displays search suggestions or placeholder panel."
    - component.infinite_scroll_grid:
        state: state.overlay
        description: "Grid is grayed out with overlay while in search mode."
  screens:
    - screen.explore_grid:
        state: state.search_mode
        description: "Explore screen enters search mode."

navigation: []

next_possible_events:
  - event.filter_meals
  - event.search_bar

responses:
  - Activates search input field and displays overlay.
  - Expands search bar into full search window.
  - Shows search suggestions or placeholder panel.
  - No backend request is made until user types a query.
---
