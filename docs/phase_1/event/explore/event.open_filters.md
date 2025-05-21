---
type: event
id: event.open_filters
title: Open Filters
description: |
  Triggered when a user opens the filter modal to refine meal search results in the explore grid. The modal provides comprehensive filtering options including meal type selection, calorie range sliders, macro ratio inputs, prep/cook time ranges, and ingredient inclusion/exclusion inputs.

actor: user
trigger: Tap on the filter button in the explore grid.
preconditions:
  - Explore grid is loaded.
  - Filter button is visible.
postconditions:
  - Filter modal is displayed with the following sections:
    - Meal type (multi-select button group for Breakfast, Lunch, Dinner, Snack, etc.)
    - Calories (slider or range input)
    - Macro ranges (separate inputs for carbs, fat, protein percentages or grams)
    - Prep time / Cook time (range inputs)
    - Ingredients to include or exclude (tag input fields)
  - Apply and Clear buttons are shown at the bottom of the modal.
  - If filters were previously applied, their values are pre-populated.

related:
  feature:
    - feature.meal_discovery
  screen:
    - screen.explore_grid
  component:
    - component.filter_button
  event:
    - event.apply_filters
    - event.clear_filters
  api_endpoint: []
  db: {}
--- 