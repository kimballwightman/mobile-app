---
type: table
id: table.meal_reviews
title: Meal Reviews
description: |
  Stores user meal consumption and review data, including status (pending, completed), sentiment, feedback, and timestamps.

data_structure:
  columns:
    - name: id
      type: uuid
      constraints: primary key
      description: Unique identifier for each meal review.

    - name: user_id
      type: uuid
      constraints: foreign key references users(id)
      description: Reference to the user who logged the review.

    - name: meal_plan_id
      type: uuid
      constraints: foreign key references user_meal_plan(id)
      description: Reference to the original meal plan that's being reviewed.

    - name: status
      type: enum
      constraints: not null
      options: [pending, completed, skipped]
      description: Current status of the review.

    - name: consumed
      type: boolean
      description: Whether the meal was consumed (true) or skipped (false).

    - name: feedback_sentiment
      type: enum
      options: [positive, neutral, negative]
      description: Overall sentiment of the meal experience.

    - name: rating
      type: integer
      constraints: check (rating between 1 and 5)
      description: Numeric rating from 1-5 stars.

    - name: feedback_detail
      type: text
      description: Detailed text feedback about the meal.

    - name: portion_consumed
      type: float
      constraints: check (portion_consumed between 0 and 1)
      description: Portion of the meal actually consumed (0-1).

    - name: created_at
      type: timestamp
      constraints: not null, default now()
      description: When the review was created (typically when meal was planned).

    - name: completed_at
      type: timestamp
      description: When the review was completed by the user.

    - name: updated_at
      type: timestamp
      constraints: not null, default now()
      description: Last time the review was updated.

related:
  feature: 
    - feature.meal_reviews
    - feature.meal_plan_calendar
    - feature.dashboard
  screen:
    - screen.meal_reviews_center
    - screen.dashboard
  api_endpoints:
    - endpoint.api.meal-review_pending.GET
    - endpoint.api.meal-review_completed.GET
    - endpoint.api.meal-review.POST
    - endpoint.api.meal-review_id.PATCH

design_system_reference: [design_system]
--- 