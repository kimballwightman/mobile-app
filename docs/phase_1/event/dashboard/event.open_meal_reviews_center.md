---
type: event
id: event.open_meal_reviews_center
feature_id: feature.meal_reviews
title: Open Meal Reviews Center
description: |
  Triggered when the user taps the Meal Reviews button in the Dashboard top bar to access the meal reviews center. Navigates to the dedicated screen for managing all meal reviews.

preconditions:
  screens:
    - screen.dashboard: state.rendered
  components:
    - component.meal_reviews_button: state.enabled
    - component.dashboard_top_bar: state.rendered

trigger:
  trigger_type: user_action
  component: component.meal_reviews_button
  screen: screen.dashboard

api_request:
  endpoint: endpoint.api.meal-review_pending.GET
  method: GET
  url: /api/meal-review/pending
  description: Fetches pending meal reviews that need attention.

db_interactions:
  relational:
    - table.meal_reviews:
        actions:
          - "Query pending reviews for the authenticated user."
  graph:
    - node.user:
        actions:
          - "Query user meal review data."

state_changes:
  screens:
    - screen.meal_reviews_center:
        state: state.loading
        description: "Meal reviews center screen is displayed in loading state."
    - screen.dashboard:
        state: state.hidden
        description: "Dashboard screen is hidden from view but preserved in navigation stack."

navigation:
  - screen.meal_reviews_center

next_possible_events:
  - event.meal_review_swipe
  - event.submit_detailed_feedback
  - event.filter_meal_reviews
  - event.sort_meal_reviews

responses:
  - Navigates to the meal reviews center screen.
  - Displays pending reviews at the top and completed reviews below.
  - Shows loading state while fetching data.
  - Handles empty states if no reviews are pending or completed.
--- 