---
type: event
id: event.submit_meal_review
feature_id: feature.meal_plan_calendar
title: Submit Meal Review
description: |
  Triggered when the user submits a review or rating for a meal from the meal review queue, providing feedback on the meal.

preconditions:
  screens:
    - screen.meal_reviews: state.rendered
  components:
    - component.review_swipe_tile: state.active

trigger:
  trigger_type: user_action
  component: component.review_swipe_tile
  screen: screen.meal_reviews

api_request:
  endpoint: endpoint.api.meal-review_id.PATCH
  method: PATCH
  url: /api/meal-review/{id}

db_interactions:
  relational:
    - table.meal_reviews:
        actions:
          - "Update the user's review and rating for the meal."
    - table.user_meal_plan:
        actions:
          - "Update meal plan review status."
    - table.pantry_items:
        actions:
          - "Update pantry inventory if meal was consumed."
  graph: []

state_changes:
  components:
    - component.review_swipe_tile:
        state: state.reset
        description: "Review tile is cleared/reset after submission."
  screens:
    - screen.meal_reviews:
        state: state.rendered
        description: "Review queue updates to reflect submission."

navigation: []

next_possible_events:
  - event.go_to_meal_reviews

responses:
  - Shows confirmation of review submission.
  - Updates UI to remove meal from review queue.
---
