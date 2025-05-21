---
type: component
id: component.text_container
title: Text Container
component_type: custom
description: |
  Container for displaying text content, such as instructions, labels, or descriptions. Used throughout the app for consistent text presentation.

properties:
  - name: text
    type: string
    description: "Text content to display."
  - name: style
    type: object
    description: "Optional style overrides."
  - name: align
    type: string
    description: "Text alignment (e.g., left, center, right)."

states:
  - state.visible
  - state.hidden

related:
  feature:
    - feature.onboarding_flow
    - feature.authentication
  event:
    - event.show_instructions
  screen:
    - screen.login
    - screen.create_account
    - screen.user_info
    - screen.tracking_goals

design_system_reference: [design_system]
---
