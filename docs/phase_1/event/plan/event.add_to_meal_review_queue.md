---
type: event
id: event.add_to_meal_review_queue
feature_id: feature.meal_plan_calendar
title: User Adds Meal to Meal Review Queue
description: |
  This event is triggered when the user selects a meal from the plan calendar and chooses to add it to the meal review queue for later feedback or rating.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
  components:
    - component.meal_calendar_grid: state.loaded
    - component.meal_plan_slot: state.filled

trigger:
  trigger_type: user_action
  component: component.meal_plan_slot
  screen: screen.meal_planning_tab

api_request:
  method: POST
  endpoint: /api/meal-review-queue
  body:
    meal_plan_id: <meal_plan_id>
    user_id: <user_id>
  description: Adds the selected meal to the user's meal review queue.

db_interactions:
  relational:
    - action: insert
      table: meal_review_queue
      description: Add meal to the user's meal review queue for later review.
  graph: []

state_changes:
  components:
    - component.meal_plan_slot:
        state: state.updated
        description: "Meal slot shows indicator that meal is in review queue."
    - component.meal_calendar_grid:
        state: state.updated
        description: "Calendar grid updates to reflect review queue status."
  screens:
    - screen.meal_planning_tab:
        state: state.rendered
        description: "Meal plan calendar reflects review queue status."

navigation: []

next_possible_events:
  - event.submit_meal_review
  - event.remove_food_from_plan

responses:
  - Shows confirmation that meal was added to review queue.
  - Updates UI to indicate review status.
---
