---
type: event
id: event.sort_meal_reviews
feature_id: feature.meal_reviews
title: Sort Meal Reviews
description: |
  Triggered when the user applies sorting options to meal reviews in the History tab of the Meal Reviews Center. Allows sorting by date (newest/oldest) or rating (highest/lowest).

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
    - name: sort
      description: Sort order (date_asc, date_desc, rating_asc, rating_desc).
  description: Fetches meal reviews sorted by the selected criteria.

db_interactions:
  relational:
    - table.meal_reviews:
        actions:
          - "Query reviews with the specified sort order."
  graph: []

state_changes:
  components:
    - component.review_card_list:
        state: state.loading
        description: "Review list shows loading state while fetching sorted data."
    - component.filter_sort_bar:
        state: state.sorted
        description: "Sort option is visually highlighted to show active sort."

navigation: []

next_possible_events:
  - event.filter_meal_reviews
  - event.clear_sort

responses:
  - Reorders the review list based on selected sort criteria.
  - Visual indicator shows active sort option.
  - Preserves sort selection for the session.
--- 