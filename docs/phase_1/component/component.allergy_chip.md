---
type: component
id: component.allergy_chip
title: Allergy Chip
component_type: custom
description: |
  Displays a selectable chip for a specific allergy (e.g., nuts, gluten) during onboarding or meal planning.

properties:
  - name: label
    type: string
    description: "The allergy name to display."
  - name: selected
    type: boolean
    description: "Whether the chip is selected."
  - name: onClick
    type: function
    description: "Callback when the chip is clicked."

states:
  - state.selected
  - state.unselected

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_allergies
  screen:
    - screen.allergies

design_system_reference: [design_system]
---
