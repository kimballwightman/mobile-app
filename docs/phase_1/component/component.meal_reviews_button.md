---
type: component
id: component.meal_reviews_button
title: Meal Reviews Button
component_type: button
description: |
  Button to access the meal reviews screen or queue, often shown as a floating action button or icon in the navigation bar.

properties:
  - name: onClick
    type: function
    description: "Handler called when the button is pressed."
  - name: label
    type: string
    description: "Button label or icon description."
  - name: count
    type: number
    description: "Number of pending reviews (optional badge)."
  - name: disabled
    type: boolean
    description: "Whether the button is disabled."

states:
  - state.enabled
  - state.disabled
  - state.loading

related:
  feature:
    - feature.meal_reviews
  event:
    - event.open_meal_reviews
  screen:
    - screen.meal_reviews

design_system_reference: [design_system]
---
