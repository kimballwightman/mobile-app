---
type: component
id: component.confirmation_message
title: Confirmation Message
component_type: custom
description: |
  Displays a confirmation message to the user after completing an action, such as finishing onboarding or placing an order.

properties:
  - name: message
    type: string
    description: "The confirmation message to display."
  - name: type
    type: string
    description: "Type of confirmation (success, error, info)."

states:
  - state.visible
  - state.hidden

related:
  feature:
    - feature.onboarding_flow
    - feature.shopping_cart
  event:
    - event.complete_onboarding
    - event.submit_order
  screen:
    - screen.complete_onboarding


design_system_reference: [design_system]
---
