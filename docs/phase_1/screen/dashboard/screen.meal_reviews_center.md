---
type: screen
id: screen.meal_reviews_center
title: Meal Reviews Center
description: |
  A centralized hub for managing all meal reviews. Shows pending reviews that need attention at the top and a searchable history of completed reviews below. Provides options to filter, sort, and search through reviews.
route: /dashboard/meal-reviews

states:
  - state.loading
  - state.rendered
  - state.empty_pending
  - state.empty_completed
  - state.error

related:
  feature:
    - feature.meal_reviews
    - feature.dashboard
  event:
    - event.open_meal_reviews_center
    - event.meal_review_swipe
    - event.submit_detailed_feedback
    - event.filter_meal_reviews
    - event.sort_meal_reviews
  component:
    - component.dashboard_top_bar
    - component.meal_reviews_button
    - component.review_swipe_tile
    - component.review_card_list
    - component.filter_sort_bar
    - component.tabs
    - component.empty_state
    - component.feedback_popup
    - component.rating_picker

layout:
  sections:
    - name: Top Bar
      description: |
        Shows title "Meal Reviews" with back button to return to Dashboard.
      components:
        - component.dashboard_top_bar
    
    - name: Tabs Section
      description: |
        Tabbed navigation between "Pending" and "History" views.
      components:
        - component.tabs
    
    - name: Pending Reviews Section
      description: |
        Shows all pending meal reviews that need action, with swipeable cards similar to the Dashboard review mechanism.
      components:
        - component.review_swipe_tile
        - component.empty_state
    
    - name: History Section
      description: |
        Shows completed meal reviews with filtering and sorting options.
      components:
        - component.filter_sort_bar
        - component.review_card_list
        - component.empty_state

design_system_reference: [design_system]
--- 