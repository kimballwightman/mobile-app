---
type: component
id: component.feedback_popup
title: Feedback Popup
component_type: modal
description: |
  A popup modal that appears after meal swipe or direct logging to collect detailed feedback. Includes rating, sentiment selection, portion consumed slider, and optional comments.

properties:
  - name: mealData
    type: object
    description: "Data about the meal being reviewed."
  - name: isVisible
    type: boolean
    description: "Whether the popup is visible."
  - name: initialSentiment
    type: string
    description: "Pre-selected sentiment (positive, neutral, negative)."
  - name: onClose
    type: function
    description: "Handler called when popup is closed."
  - name: onSubmit
    type: function
    description: "Handler called when feedback is submitted."
  - name: enablePortionSlider
    type: boolean
    description: "Whether to show the portion consumed slider."
  - name: animationType
    type: string
    description: "Animation for popup appearance (fade, slide, none)."

states:
  - state.hidden
  - state.rendered
  - state.submitting
  - state.submitted
  - state.error
  - state.reset

related:
  feature:
    - feature.meal_reviews
  event:
    - event.submit_detailed_feedback
    - event.log_meal
  screen:
    - screen.meal_reviews_center
    - screen.dashboard
  component:
    - component.rating_picker
    - component.input_field
    - component.save_button
    - component.meal_workout_tile

design_system_reference: [design_system]
--- 