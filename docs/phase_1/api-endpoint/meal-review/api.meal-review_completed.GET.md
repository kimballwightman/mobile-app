---
type: api-endpoint
id: endpoint.api.meal-review_completed.GET
title: Get Completed Meal Reviews
description: Retrieves a list of completed meal reviews for the authenticated user with filtering and pagination options.
url: /api/meal-review/completed
method: GET

request:
  parameters:
    - name: limit
      in: query
      type: integer
      description: Maximum number of reviews to return (default 20, max 100).
      required: false
    - name: offset
      in: query
      type: integer
      description: Number of reviews to skip (for pagination).
      required: false
    - name: sort
      in: query
      type: string
      enum: [date_asc, date_desc, rating_asc, rating_desc]
      description: Sort order for the reviews.
      required: false
    - name: date_from
      in: query
      type: string
      format: date
      description: Start date for filtering reviews.
      required: false
    - name: date_to
      in: query
      type: string
      format: date
      description: End date for filtering reviews.
      required: false
    - name: sentiment
      in: query
      type: string
      enum: [positive, neutral, negative]
      description: Filter by feedback sentiment.
      required: false

response:
  success:
    code: 200
    type: application/json
    schema:
      type: object
      properties:
        total:
          type: integer
          description: Total number of reviews matching the criteria.
        reviews:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                description: UUID of the meal review.
              meal_plan_id:
                type: string
                description: Reference to the meal plan.
              meal_name:
                type: string
                description: Name of the meal that was reviewed.
              meal_image:
                type: string
                description: URL to the meal image.
              status:
                type: string
                description: Status of the review.
              consumed:
                type: boolean
                description: Whether the meal was consumed.
              feedback_sentiment:
                type: string
                description: Overall sentiment.
              rating:
                type: integer
                description: Rating (1-5).
              feedback_detail:
                type: string
                description: Detailed feedback.
              portion_consumed:
                type: number
                description: Portion consumed (0-1).
              completed_at:
                type: string
                format: date-time
                description: When the review was completed.
  
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
    - event.filter_meal_reviews
    - event.sort_meal_reviews
  screen:
    - screen.meal_reviews_center
  component:
    - component.meal_reviews_button
    - component.review_card_list
    - component.filter_sort_bar
  database:
    - table.meal_reviews
    - table.user_meal_plan

design_system_reference: [design_system]
--- 