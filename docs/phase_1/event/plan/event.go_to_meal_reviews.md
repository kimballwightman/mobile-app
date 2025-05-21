---
type: event
id: event.go_to_meal_reviews
feature_id: feature.meal_plan_calendar
title: Navigate to Meal Reviews
description: |
  Triggered when the user navigates to the meal reviews screen from the plan calendar or review queue to view all submitted meal reviews.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
    - screen.meal_review_queue: state.rendered
  components:
    - component.floating_action_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.floating_action_button
  screen: screen.meal_planning_tab

api_request:
  endpoint: endpoint.api.meal-review_pending.GET
  method: GET
  url: /api/meal-review/pending

db_interactions:
  relational:
    - table.meal_reviews:
        actions:
          - "Query all reviews submitted by the user."
  graph: []

state_changes:
  screens:
    - screen.meal_reviews:
        state: state.rendered
        description: "Meal reviews screen is displayed."

navigation:
  - screen.meal_reviews

next_possible_events:
  - event.submit_meal_review

responses:
  - Navigates to meal reviews screen.
  - Displays list of all submitted meal reviews.
---
