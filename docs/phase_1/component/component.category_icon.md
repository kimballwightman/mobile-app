---
type: component
id: component.category_icon
title: Category Icon
component_type: custom
description: |
  Visual icon representing a food or meal category (e.g., Produce, Grains, Dairy, etc.) used throughout the app for quick identification.

properties:
  - name: category
    type: string
    description: "The category this icon represents (e.g., 'Produce', 'Dairy')."
  - name: color
    type: string
    description: "The color associated with the category."
  - name: size
    type: string
    description: "Icon size (e.g., 'small', 'medium', 'large')."
  - name: onClick
    type: function
    description: "Optional click handler for interactive use."

states:
  - state.default
  - state.selected
  - state.disabled

related:
  feature:
    - feature.pantry_management
    - feature.meal_discovery
  event:
    - event.load_pantry_items
    - event.expand_meal_card
  screen:
    - screen.pantry_tab
    - screen.explore_grid

design_system_reference: [design_system]
---
