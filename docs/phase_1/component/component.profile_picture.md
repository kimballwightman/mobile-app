---
type: component
id: component.profile_picture
title: Profile Picture
component_type: custom
description: |
  Displays the user's profile picture and allows for updating or editing the image.

properties:
  - name: src
    type: string
    description: "URL of the profile picture."
  - name: onEdit
    type: function
    description: "Callback to trigger editing the profile picture."

states:
  - state.default
  - state.editing

related:
  feature:
    - feature.dashboard
  event:
    - event.select_profile_picture
  screen:
    - screen.dashboard

design_system_reference: [design_system]
---
