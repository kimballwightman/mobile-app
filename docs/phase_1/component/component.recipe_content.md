---
type: component
id: component.recipe_content
title: Recipe Content
component_type: custom
description: |
  Section or modal displaying recipe instructions, prep/cook time, servings, portions per person, and other details in the expanded meal view.

properties:
  - name: instructions
    type: string
    description: "Recipe instructions text."
  - name: prepTime
    type: string
    description: "Preparation time."
  - name: cookTime
    type: string
    description: "Cooking time."
  - name: servings
    type: number
    description: "Number of servings the recipe makes."
  - name: portionsPerPerson
    type: number
    description: "Number of portions per person (for meal planning)."
  - name: servingLabel
    type: string
    description: "Formatted text showing 'Serves X people, Makes Y per person'."
  - name: onToggle
    type: function
    description: "Handler for toggling between Ingredients and Recipe views."

states:
  - state.visible
  - state.hidden

related:
  feature:
    - feature.expanded_meal_view
  event:
    - event.toggle_recipe_detail
    - event.toggle_ingredients_recipe
  screen:
    - screen.explore_grid
    - screen.meal_planning_tab

design_system_reference: [design_system]
---
