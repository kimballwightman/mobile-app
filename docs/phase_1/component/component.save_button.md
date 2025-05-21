---
type: component
id: component.save_button
title: Save Button
component_type: button
description: |
  Button for saving changes or submitting forms, such as saving food swaps or profile edits. Can show loading or disabled states.

properties:
  - name: label
    type: string
    description: "Button text label."
  - name: onClick
    type: function
    description: "Handler called when the button is pressed."
  - name: loading
    type: boolean
    description: "Whether the button shows a loading spinner."
  - name: disabled
    type: boolean
    description: "Whether the button is disabled."

states:
  - state.enabled
  - state.disabled
  - state.loading
  - state.visible
  - state.hidden

related:
  feature:
    - feature.expanded_meal_view
    - feature.settings_management
  event:
    - event.swap_save
    - event.change_profile_picture
  screen:
    - screen.explore_grid
    - screen.profile_account

design_system_reference: [design_system]
---
