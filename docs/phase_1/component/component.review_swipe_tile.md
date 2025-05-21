---
type: component
id: component.review_swipe_tile
title: Review Swipe Tile
component_type: card
description: |
  Swipeable tile for reviewing meals, allowing users to swipe left or right to indicate feedback (e.g., good/bad, consumed/skipped).

properties:
  - name: meal
    type: object
    description: "Meal data displayed in the tile."
  - name: onSwipe
    type: function
    description: "Handler called when the tile is swiped."
  - name: feedbackOptions
    type: array
    description: "Available feedback options for the review."

states:
  - state.active
  - state.swiped
  - state.reset

related:
  feature:
    - feature.meal_reviews
  event:
    - event.meal_review_swipe
    - event.submit_detailed_feedback
  screen:
    - screen.meal_reviews

design_system_reference: [design_system]
---
