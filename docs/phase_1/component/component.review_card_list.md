---
type: component
id: component.review_card_list
title: Review Card List
component_type: list
description: |
  A scrollable list of meal review cards in the Meal Reviews Center, showing completed reviews with meal images, ratings, and feedback. Supports filtering and sorting.

properties:
  - name: reviews
    type: array
    description: "Array of review objects to display in the list."
  - name: loading
    type: boolean
    description: "Whether the list is in a loading state."
  - name: onCardPress
    type: function
    description: "Handler called when a review card is pressed."
  - name: emptyState
    type: object
    description: "Configuration for the empty state when no reviews match filters."
  - name: sortOrder
    type: string
    description: "Current sort order applied to the list."
  - name: filters
    type: object
    description: "Currently applied filters."

states:
  - state.loading
  - state.rendered
  - state.empty
  - state.error

related:
  feature:
    - feature.meal_reviews
  event:
    - event.filter_meal_reviews
    - event.sort_meal_reviews
  screen:
    - screen.meal_reviews_center
  component:
    - component.filter_sort_bar
    - component.empty_state

design_system_reference: [design_system]
--- 