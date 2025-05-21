---
type: component
id: component.macro_input_group
title: Macro Input Group
component_type: form
description: |
  Input group for entering macro values (carbs, fats, protein) and their percentages during onboarding or goal setting.

properties:
  - name: carbs
    type: number
    description: "Grams of carbohydrates."
  - name: fats
    type: number
    description: "Grams of fats."
  - name: protein
    type: number
    description: "Grams of protein."
  - name: carbsPercent
    type: number
    description: "Percentage of carbs."
  - name: fatsPercent
    type: number
    description: "Percentage of fats."
  - name: proteinPercent
    type: number
    description: "Percentage of protein."
  - name: onChange
    type: function
    description: "Callback when any macro value changes."

states:
  - state.default

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.set_macro_goals
  screen:
    - screen.tracking_goals

design_system_reference: [design_system]
---
