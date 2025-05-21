---
type: component
id: component.rating_picker
title: Rating Picker
component_type: input
description: |
  A star rating picker component that allows users to select a 1-5 star rating for meals during review submission. Shows interactive, tappable stars with optional half-star support.

properties:
  - name: initialRating
    type: number
    description: "Initial rating value (1-5)."
  - name: onRatingChange
    type: function
    description: "Handler called when rating changes."
  - name: size
    type: string
    description: "Size of the stars (small, medium, large)."
  - name: allowHalfStars
    type: boolean
    description: "Whether half-star ratings are allowed."
  - name: disabled
    type: boolean
    description: "Whether the rating picker is disabled."
  - name: starColor
    type: string
    description: "Color of the filled stars."
  - name: emptyStarColor
    type: string
    description: "Color of the unfilled stars."
  - name: style
    type: object
    description: "Custom styles for the rating picker container."

states:
  - state.default
  - state.selected
  - state.disabled

related:
  feature:
    - feature.meal_reviews
  event:
    - event.submit_detailed_feedback
  screen:
    - screen.meal_reviews_center
    - screen.dashboard
  component:
    - component.feedback_popup

design_system_reference: [design_system]
--- 