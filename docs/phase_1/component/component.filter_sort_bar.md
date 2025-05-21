---
type: component
id: component.filter_sort_bar
title: Filter & Sort Bar
component_type: control
description: |
  A control bar that allows users to filter and sort meal reviews in the History tab of the Meal Reviews Center. Provides options to filter by date, sentiment, and rating, and to sort by date or rating.

properties:
  - name: onFilterChange
    type: function
    description: "Handler called when filter options change."
  - name: onSortChange
    type: function
    description: "Handler called when sort option changes."
  - name: filters
    type: object
    description: "Current filter selections (date range, sentiment, rating)."
  - name: sortOption
    type: string
    description: "Current sort selection (date_asc, date_desc, rating_asc, rating_desc)."
  - name: onClearFilters
    type: function
    description: "Handler called when clear filters button is pressed."
  - name: resultsCount
    type: number
    description: "Number of results after applying filters/sort."

states:
  - state.default
  - state.applied
  - state.sorted
  - state.expanded
  - state.collapsed

related:
  feature:
    - feature.meal_reviews
  event:
    - event.filter_meal_reviews
    - event.sort_meal_reviews
  screen:
    - screen.meal_reviews_center
  component:
    - component.review_card_list
    - component.date_picker
    - component.dropdown_select

design_system_reference: [design_system]
--- 