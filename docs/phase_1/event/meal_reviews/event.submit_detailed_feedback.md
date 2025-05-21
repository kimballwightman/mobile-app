---
type: event
id: event.submit_detailed_feedback
feature_id: feature.meal_review
title: User Submits Detailed Meal Feedback
description: |
  This event is triggered when the user submits detailed feedback after swiping a meal review card (left or right) on the Meal Review screen. The feedback is sent to the backend, and the UI updates to remove the reviewed meal from the deck.

preconditions:
  screens:
    - screen.meal_review: state.rendered
  components:
    - component.feedback_popup: state.rendered
    - component.meal_review_card: state.swiped

trigger:
  trigger_type: user_action
  component: component.feedback_submit_button
  screen: screen.meal_review

api_request:
  method: PATCH
  endpoint: /api/meal-reviews/{review_id}
  body:
    status: completed
    consumed: <true_or_false>
    feedback_sentiment: <positive_or_negative>
    feedback_detail: <feedback_detail>
  description: Updates the meal review with completion status, sentiment, and feedback detail.

db_interactions:
  relational:
    - action: update
      table: meal_reviews
      description: Set status = completed, consumed, feedback_sentiment, feedback_detail, completed_at.
    - action: update
      table: user_meal_plan
      description: Set feedback_given = true, store feedback_sentiment & feedback_detail.
    - action: update
      table: pantry_items
      description: If consumed = true, decrement quantity and update status.
  graph:
    - action: update
      node: user
      edge: meal_review
      description: Update edge with rating and sentiment; adjust food affinity edges for ingredients.
    - action: insert
      node: review_event
      description: Log review event for future recommendations.

state_changes:
  components:
    - component.meal_review_card_deck:
        state: state.updated
        description: "Removes reviewed meal card from the deck."
    - component.feedback_popup:
        state: state.reset
        description: "Feedback popup/modal is cleared or closed."
    - component.metrics_bar:
        state: state.updated
        description: "Updates in-view metrics (e.g., reviews remaining)."
  screens:
    - screen.meal_review:
        state: state.rendered
        description: "Meal review deck updates to reflect completed review."

navigation: []

next_possible_events:
  - event.meal_review_swipe
  - event.submit_detailed_feedback

responses:
  - Shows toast/snackbar: "Review submitted."
  - Updates UI to remove completed review and update metrics.
  - Handles error states if submission fails.
---
