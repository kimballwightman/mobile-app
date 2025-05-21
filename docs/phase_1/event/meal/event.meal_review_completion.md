---
type: event
id: event.meal_review_completion
feature_id: feature.meal_review
title: Meal Review Completion
description: |
  This event is triggered when a user completes a review of a consumed meal, including rating, feedback, and confirmation of consumption. It updates nutritional data, meal history, and importantly, automatically updates the pantry inventory by reducing quantities of consumed ingredients.

preconditions:
  screens:
    - screen.meal_review: state.in_progress
  components:
    - component.meal_rating: state.selected
    - component.meal_feedback: state.filled
    - component.consumption_confirmation: state.checked

trigger:
  trigger_type: user_action
  component: component.submit_review_button
  screen: screen.meal_review

api_request:
  method: POST
  endpoint: /api/meal/review
  body:
    user_id: <user_id>
    meal_id: <meal_id>
    meal_plan_id: <meal_plan_id>
    rating: <rating>
    feedback: <feedback>
    was_consumed: <true|false>
    consumed_at: <timestamp>
    modifications: <modifications>
  description: Submits the meal review and triggers pantry inventory updates.

db_interactions:
  relational:
    - action: insert
      table: meal_reviews
      description: Store the meal review data including rating and feedback.
    - action: update
      table: pantry_items
      description: Reduce quantities of pantry items used in the meal if the meal was consumed.
    - action: insert
      table: pantry_item_change_log
      description: Log pantry changes resulting from the meal consumption.
    - action: update
      table: user_nutrition_log
      description: Update the user's nutrition log with consumed calories and macros.
  graph:
    - node.user:
        actions:
          - "Create :CONSUMED edge to meal with review data."

state_changes:
  components:
    - component.meal_review_form:
        state: state.submitted
        description: "Review form shows submitted confirmation."
    - component.pantry_item_list:
        state: state.updated
        description: "If Pantry tab is visible, pantry item list updates to reflect reduced quantities from meal consumption."
    - component.dashboard_nutrition_bars:
        state: state.updated
        description: "Dashboard nutrition bars update to reflect consumed calories and macros."
  screens:
    - screen.meal_review:
        state: state.completed
        description: "Meal review screen shows completion confirmation or navigates away."

navigation:
  - screen.dashboard

next_possible_events:
  - event.load_dashboard_data
  - event.mark_item_as_out_of_stock
  - event.load_pantry_items

responses:
  - Shows confirmation of submitted review.
  - Updates dashboard nutrition data.
  - Reduces pantry quantities of consumed ingredients.
  - May trigger low inventory notifications or shopping suggestions.
--- 