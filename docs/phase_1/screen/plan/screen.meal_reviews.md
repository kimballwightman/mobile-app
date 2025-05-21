---
type: screen
id: screen.meal_reviews
title: Meal Reviews
description: |
  The screen where users review meals, swipe cards, and submit feedback. Shows pending and completed reviews, and updates metrics.
route: /plan/meal-reviews

states:
  - state.rendered

related:
  feature:
    - feature.meal_reviews
  event:
    - event.meal_review_swipe
    - event.submit_detailed_feedback
  component:
    - component.meal_review_card_deck
    - component.meal_review_card
    - component.feedback_popup
    - component.metrics_bar

design_system_reference: [design_system]
---
