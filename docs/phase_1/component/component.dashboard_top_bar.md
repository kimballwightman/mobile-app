---
type: component
id: component.dashboard_top_bar
title: Dashboard Top Bar
component_type: navigation
description: |
  The top navigation bar for the Dashboard tab, displaying the active date with arrows to navigate between days, a calendar modal button, and access to the Meal Reviews Center.

properties:
  - name: activeDate
    type: date
    description: "The currently displayed date."
  - name: onDateChange
    type: function
    description: "Handler called when date is changed."
  - name: onCalendarPress
    type: function
    description: "Handler called when calendar button is pressed."
  - name: onMealReviewsPress
    type: function
    description: "Handler called when meal reviews button is pressed."
  - name: pendingReviewsCount
    type: number
    description: "Number of pending meal reviews (for badge on meal reviews button)."
  - name: onProfilePress
    type: function
    description: "Handler called when profile picture is pressed."
  - name: profilePicUrl
    type: string
    description: "URL to user's profile picture."

states:
  - state.default
  - state.loading
  - state.rendered

related:
  feature:
    - feature.dashboard
    - feature.meal_reviews
  event:
    - event.change_dashboard_date
    - event.open_calendar_modal
    - event.open_meal_reviews_center
  screen:
    - screen.dashboard
    - screen.meal_reviews_center
  component:
    - component.meal_reviews_button
    - component.profile_picture

design_system_reference: [design_system]
---
