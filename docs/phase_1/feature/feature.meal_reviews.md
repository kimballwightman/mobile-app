---
type: feature
id: feature.meal_reviews
title: Meal Reviews
description: |
  Allows users to log and review meals after consumption, provide feedback, and update pantry and meal plan data. Integrates with the Dashboard for post-meal logging, supports swipe-based review, detailed feedback, and performance metrics tracking. The Meal Reviews Center provides a dedicated space to manage all pending and completed reviews.

sections:
  - name: Dashboard Meal Review
    description: |
      Daily meal tiles in the Dashboard tab can be logged directly after consumption. Each tile has options to log as consumed, skipped, or provide detailed feedback, updating nutrition metrics in real-time.
    events:
      - event.log_meal
      - event.submit_detailed_feedback
      - event.skip_meal
    screens:
      - screen.dashboard
    components:
      - component.meal_workout_tile
      - component.feedback_popup
      - component.dashboard_top_bar
    api_endpoint:
      - endpoint.api.meal-review.POST
      - endpoint.api.meal-review_id.PATCH
    db:
      relational:
        - table.meal_reviews
        - table.user_meal_plan
        - table.pantry_items
      graph:
        - node.user
        - node.review_event

  - name: Meal Reviews Center
    description: |
      Accessed via a button in the Dashboard's top bar, this dedicated screen shows all pending meal reviews that need attention and a history of completed reviews. Helps users catch up on logging meals they may have missed during the day.
    events:
      - event.open_meal_reviews_center
      - event.filter_meal_reviews
      - event.sort_meal_reviews
    screens:
      - screen.dashboard
      - screen.meal_reviews_center
    components:
      - component.meal_reviews_button
      - component.review_card_list
      - component.filter_sort_bar
      - component.empty_state
    api_endpoint:
      - endpoint.api.meal-review_pending.GET
      - endpoint.api.meal-review_completed.GET
    db:
      relational:
        - table.meal_reviews
        - table.user_meal_plan
      graph:
        - node.user
        - node.review_event

  - name: Swipe Meal Review
    description: |
      Users swipe meal tiles (right = consumed, left = skipped/negative) to log meal outcomes and trigger feedback flow. Integrated into both the Dashboard and the Meal Reviews Center.
    events:
      - event.meal_review_swipe
      - event.log_meal
    screens:
      - screen.dashboard
      - screen.meal_reviews_center
    components:
      - component.review_swipe_tile
      - component.meal_workout_tile
    api_endpoint:
      - endpoint.api.meal-review_pending.GET
    db:
      relational:
        - table.meal_reviews
        - table.user_meal_plan
      graph:
        - node.user
        - node.review_event

  - name: Detailed Feedback Submission
    description: |
      After swiping or tapping a meal tile, users can submit detailed feedback (sentiment, notes, adjustments) which updates meal review, meal plan, and pantry data.
    events:
      - event.submit_detailed_feedback
    screens:
      - screen.dashboard
      - screen.meal_reviews_center
    components:
      - component.review_swipe_tile
      - component.feedback_popup 
      - component.input_field
      - component.save_button
      - component.rating_picker
    api_endpoint:
      - endpoint.api.meal-review_id.PATCH
    db:
      relational:
        - table.meal_reviews
        - table.user_meal_plan
        - table.pantry_items
      graph:
        - node.user
        - node.review_event
        - node.meal_review

design_system_reference: [design_system]
---
