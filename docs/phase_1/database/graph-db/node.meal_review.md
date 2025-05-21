---
type: node
id: node.meal_review
title: Meal Review
description: |
  Represents a meal review in the graph database, with relationships to users and meals.

properties:
  - id: meal_review_id
    type: uuid
    description: Unique identifier for the meal review.
  - id: user_id
    type: uuid
    description: Reference to the user who submitted the review.
  - id: meal_id
    type: uuid
    description: Reference to the reviewed meal.
  - id: rating
    type: int
    description: User's rating for the meal.
  - id: sentiment
    type: string
    description: Sentiment (good, bad, neutral).
  - id: comments
    type: string
    description: Optional user comments.
  - id: created_at
    type: timestamp
    description: When the review was submitted.

edges:
  - type: REVIEWED_BY
    to_node: node.user
    direction: inbound
    description: Review was submitted by a user.
  - type: REVIEWS
    to_node: node.food
    direction: outbound
    description: Review is for a food/meal.

related:
  feature:
    - feature.meal_reviews
  event:
    - event.submit_detailed_feedback
  screen:
    - screen.meal_reviews
  component:
    - component.review_swipe_tile
  api_endpoint:
    - endpoint.meal-review_pending.GET
  db:
    relational:
      - table.user_meal_plan
---
