---
type: component
id: component.image_container
title: Image Container
component_type: custom
description: |
  Container for displaying images such as meal photos, profile pictures, or ingredient images. Supports loading, error, and placeholder states.

properties:
  - name: src
    type: string
    description: "Image source URL."
  - name: alt
    type: string
    description: "Alternative text for accessibility."
  - name: size
    type: string
    description: "Image size (e.g., 'small', 'medium', 'large')."
  - name: onClick
    type: function
    description: "Optional click handler."

states:
  - state.loading
  - state.loaded
  - state.error
  - state.placeholder

related:
  feature:
    - feature.expanded_meal_view
    - feature.onboarding_flow
  event:
    - event.expand_meal_card
    - event.change_profile_picture
  screen:
    - screen.explore_grid
    - screen.profile_account

design_system_reference: [design_system]
---
