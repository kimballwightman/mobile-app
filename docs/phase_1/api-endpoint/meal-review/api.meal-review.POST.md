---
type: api-endpoint
id: endpoint.api.meal-review.POST
title: Create Meal Review
description: Creates a new meal review, either when a meal is planned or when a user logs a meal after consumption.
url: /api/meal-review
method: POST

request:
  type: application/json
  schema:
    type: object
    properties:
      user_id:
        type: string
        description: UUID of the user.
        required: true
      meal_plan_id:
        type: string
        description: UUID of the meal plan being reviewed.
        required: true
      status:
        type: string
        enum: [pending, completed, skipped]
        description: Status of the review.
        required: true
      consumed:
        type: boolean
        description: Whether the meal was consumed.
        required: false
      feedback_sentiment:
        type: string
        enum: [positive, neutral, negative]
        description: Overall sentiment of the feedback.
        required: false
      rating:
        type: integer
        minimum: 1
        maximum: 5
        description: Rating from 1-5 stars.
        required: false
      feedback_detail:
        type: string
        description: Detailed feedback text.
        required: false
      portion_consumed:
        type: number
        minimum: 0
        maximum: 1
        description: Portion of meal consumed (0-1).
        required: false

response:
  success:
    code: 201
    type: application/json
    schema:
      type: object
      properties:
        id:
          type: string
          description: UUID of the created meal review.
        message:
          type: string
          description: Success message.
  error:
    codes: [400, 401, 403, 500]
    type: application/json
    schema:
      type: object
      properties:
        error:
          type: string
          description: Error message.
        status:
          type: integer
          description: HTTP status code.

related:
  feature:
    - feature.meal_reviews
    - feature.dashboard
  event:
    - event.log_meal
    - event.submit_detailed_feedback
  screen:
    - screen.dashboard
    - screen.meal_reviews_center
  component:
    - component.meal_workout_tile 
    - component.feedback_popup
  database:
    - table.meal_reviews
    - table.user_meal_plan

design_system_reference: [design_system]
--- 