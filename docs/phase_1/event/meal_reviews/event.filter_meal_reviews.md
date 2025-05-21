---
type: event
id: event.filter_meal_reviews
feature_id: feature.meal_reviews
title: Filter Meal Reviews
description: |
  Triggered when the user applies filters to the meal reviews displayed in the History tab of the Meal Reviews Center. Allows filtering by date range, meal type, sentiment, or rating.

preconditions:
  screens:
    - screen.meal_reviews_center: state.rendered
  components:
    - component.filter_sort_bar: state.rendered
    - component.review_card_list: state.rendered

trigger:
  trigger_type: user_action
  component: component.filter_sort_bar
  screen: screen.meal_reviews_center

api_request:
  endpoint: endpoint.api.meal-review_completed.GET
  method: GET
  url: /api/meal-review/completed
  parameters:
    - name: date_from
      description: Start date for filtering.
    - name: date_to
      description: End date for filtering.
    - name: sentiment
      description: Filter by sentiment (positive, neutral, negative).
    - name: rating
      description: Filter by minimum rating (1-5).
  description: Fetches filtered meal reviews based on user selections.

db_interactions:
  relational:
    - table.meal_reviews:
        actions:
          - "Query filtered reviews based on user selections."
  graph: []

state_changes:
  components:
    - component.review_card_list:
        state: state.loading
        description: "Review list shows loading state while fetching filtered data."
    - component.filter_sort_bar:
        state: state.applied
        description: "Filter bar shows active filters that have been applied."

navigation: []

next_possible_events:
  - event.sort_meal_reviews
  - event.clear_filters

responses:
  - Updates the review list with filtered results.
  - Shows the count of filtered results.
  - Displays empty state if no reviews match the filters.
  - Preserves filter selections for the session.
--- 